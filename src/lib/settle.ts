import "server-only";
import type Stripe from "stripe";
import { db } from "@/db";
import { fulfilSession, type Fulfilment } from "@/lib/fulfil";
import { sendReceipt } from "@/lib/email";
import { sendPurchase } from "@/lib/meta-capi";
import { localeUrl } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   A paid session, booked and announced.

   Two doors lead here: Stripe's webhook and /begin/done, the page Stripe sends
   the buyer back to. Whichever arrives first books the mornings; the other
   finds them booked and does nothing. src/lib/fulfil.ts holds the guarantee.

   THE RECEIPT AND META'S PURCHASE GO OUT ONCE, from the caller whose write
   actually landed, which is the one `fulfilSession` answers "booked". A failed
   email is still a kept sale: its errors are logged and swallowed.
   --------------------------------------------------------------------------- */

export async function settle(session: Stripe.Checkout.Session): Promise<Fulfilment> {
  const result = await fulfilSession(db, session);
  if (result.outcome !== "booked" || !result.email) return result;

  const m = session.metadata ?? {};
  const lang = m.lang === "hi" ? "hi" : "en";

  try {
    await sendReceipt({
      to: result.email,
      lang,
      tier: result.tier,
      credits: result.credits,
      amountMinor: session.amount_total ?? 0,
      currency: (session.currency ?? "usd").toUpperCase(),
    });
  } catch (error) {
    console.error("settle: receipt not sent", session.id, error);
  }

  /* Meta hears about the sale only where it may measure the buyer, which the
     checkout recorded as `ads`; see src/lib/meta-capi.ts. Never throws. */
  if (m.ads === "1") {
    await sendPurchase({
      sessionId: session.id,
      email: result.email,
      userId: result.userId,
      amountMinor: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      sourceUrl: localeUrl(lang, "/begin"),
      fbp: m.fbp,
      fbc: m.fbc,
      ip: m.ip,
      ua: m.ua,
      at: session.created,
    });
  }

  return result;
}
