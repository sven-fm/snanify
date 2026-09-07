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

   2. THE LEDGER IS WRITTEN FIRST, KEYED TO THE SESSION. Stripe redelivers by
      design; the unique index on (reason, ref_id) makes the second delivery a
      no-op. Everything after the booking is skipped on a redelivery, so no
      duplicate purchase row and no second receipt.

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

export async function fulfilSession(
  db: Db,
  session: Stripe.Checkout.Session,
): Promise<Fulfilment> {
  const userId = session.client_reference_id ?? session.metadata?.userId ?? null;
  const pack = packOf(session);

  if (!userId) return { outcome: "ignored", why: "no user on the session" };
  if (!pack) return { outcome: "ignored", why: "no known pack on the session" };
  if (session.payment_status !== "paid") {
    return { outcome: "ignored", why: `payment_status is ${session.payment_status}` };
  }

  const { booked } = await book(db, {
    userId,
    delta: pack.credits,
    reason: "purchase",
    refId: session.id,
  });

  if (!booked) return { outcome: "already" };

  await db
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

  return {
    outcome: "booked",
    userId,
    tier: pack.tier,
    credits: pack.credits,
    email: session.customer_details?.email ?? session.customer_email ?? null,
  };
}
