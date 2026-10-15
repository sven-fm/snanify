import type Stripe from "stripe";
import { purchases } from "@/db/schema";
import { book, type Db } from "@/lib/credits";
import { newId } from "@/lib/ids";
import { isTier, packForTier } from "@/lib/packs";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   Turning a paid Stripe session into mornings.

   Kept out of the route handler so it can be tested against a real database
   with a real redelivery, rather than only through an HTTP request that needs
   a signature and a network.

   THREE RULES.

   1. THE CREDITS COME FROM THE SESSION, NOT FROM TODAY'S CODE. The number was
      written into the session's metadata when it was created, so repricing or
      renaming a pack tomorrow cannot change what somebody paid for yesterday.

   2. THE LEDGER ROW AND THE PURCHASE ROW ARE ONE TRANSACTION, KEYED TO THE
      SESSION. Two callers book the same session: Stripe's webhook, which
      redelivers by design, and /begin/done, which books on the buyer's return
      so nobody waits on the webhook. `book` locks the person's row, so the
      second caller waits for the first to commit, then meets the unique index
      on (reason, ref_id) and inserts nothing. Exactly one caller sees
      "booked", and only that one sends the receipt and tells Meta.

   3. NOTHING HERE SENDS EMAIL. The caller does that, after this returns, and
      swallows its errors. Somebody who paid keeps their mornings whether or
      not the mailer was reachable.
   --------------------------------------------------------------------------- */

export type Fulfilment =
  | { outcome: "booked"; userId: string; tier: TierKey; credits: number; email: string | null }
  | { outcome: "already" }
  | { outcome: "ignored"; why: string };

function packOf(session: Stripe.Checkout.Session): { tier: TierKey; credits: number } | null {
  const tier = session.metadata?.pack;
  if (!tier || !isTier(tier)) return null;

  const written = Number(session.metadata?.credits);
  const credits = Number.isInteger(written) && written > 0 ? written : packForTier(tier).credits;

  return { tier, credits };
}

/**
 * Whether the money is in. "no_payment_required" is a session a promotion
 * code took to zero: nothing to collect, and the mornings are still owed.
 */
export function isPaid(session: Stripe.Checkout.Session): boolean {
  if (session.payment_status === "paid") return true;
  /* Only once the session is complete: a zero total on a session still open
     is a buyer who applied a code and walked away. */
  return session.payment_status === "no_payment_required" && session.status === "complete";
}

export async function fulfilSession(
  db: Db,
  session: Stripe.Checkout.Session,
): Promise<Fulfilment> {
  const userId = session.client_reference_id ?? session.metadata?.userId ?? null;
  const pack = packOf(session);

  if (!userId) return { outcome: "ignored", why: "no user on the session" };
  if (!pack) return { outcome: "ignored", why: "no known pack on the session" };
  if (!isPaid(session)) {
    return { outcome: "ignored", why: `payment_status is ${session.payment_status}` };
  }

  const booked = await db.transaction(async (tx) => {
    const ledger = await book(tx, {
      userId,
      delta: pack.credits,
      reason: "purchase",
      refId: session.id,
    });

    /* Written on both paths. On a redelivery it conflicts and does nothing;
       after a ledger row written before the two shared a transaction, it
       fills in the purchase row that write left behind. */
    await tx
      .insert(purchases)
      .values({
        id: newId(),
        userId,
        stripeSessionId: session.id,
        stripePaymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? null),
        pack: pack.tier,
        currency: (session.currency ?? "usd").toUpperCase(),
        amountMinor: session.amount_total ?? 0,
        credits: pack.credits,
      })
      .onConflictDoNothing();

    return ledger.booked;
  });

  if (!booked) return { outcome: "already" };

  return {
    outcome: "booked",
    userId,
    tier: pack.tier,
    credits: pack.credits,
    email: session.customer_details?.email ?? session.customer_email ?? null,
  };
}
