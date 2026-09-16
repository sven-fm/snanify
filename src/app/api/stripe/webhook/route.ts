import { alertOwner } from "@/lib/alert";
import type Stripe from "stripe";
import { db } from "@/db";
import { fulfilSession } from "@/lib/fulfil";
import { stripe } from "@/lib/stripe";
import { sendReceipt } from "@/lib/email";

/* ---------------------------------------------------------------------------
   Stripe's webhook. The only place credits are ever bought.

   THE SIGNATURE IS CHECKED AGAINST THE RAW BODY, ALWAYS. Anyone can POST here.
   Without the check a stranger grants themselves sixty mornings with curl. The
   body is read as text and passed unparsed, because Stripe signs exact bytes
   and a JSON round trip is not the same bytes.

   IT ANSWERS 200 TO ANYTHING IT HAS ALREADY SEEN. Stripe redelivers by design
   and retries a non-2xx for days. src/lib/fulfil.ts makes the second delivery
   a no-op, and this still answers 200.

   IT ANSWERS 500 WHEN FULFILMENT ACTUALLY FAILS, so Stripe retries: the person
   has paid and does not yet have their mornings.

   A FAILED EMAIL IS NOT A FAILED SALE. The receipt goes out after the credits
   are booked and its errors are swallowed.

   The route is under /api, which src/proxy.ts excludes from the locale
   rewrite, so Stripe reaches it unprefixed and unauthenticated.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(session: Stripe.Checkout.Session): Promise<void> {
  const result = await fulfilSession(db, session);

  if (result.outcome === "ignored") {
    console.warn("stripe webhook: ignored", session.id, result.why);
    return;
  }

  if (result.outcome !== "booked" || !result.email) return;

  try {
    await sendReceipt({
      to: result.email,
      lang: session.metadata?.lang === "hi" ? "hi" : "en",
      tier: result.tier,
      credits: result.credits,
      amountMinor: session.amount_total ?? 0,
      currency: (session.currency ?? "usd").toUpperCase(),
    });
  } catch (error) {
    console.error("stripe webhook: receipt not sent", session.id, error);
  }
}

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("stripe webhook: STRIPE_WEBHOOK_SECRET is missing");
    return new Response("not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("no signature", { status: 400 });

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe().webhooks.constructEventAsync(raw, signature, secret);
  } catch (error) {
    console.error("stripe webhook: bad signature", error);
    return new Response("bad signature", { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await handle(event.data.object);
    }
  } catch (error) {
    console.error("stripe webhook: fulfilment failed", event.id, error);
    await alertOwner("stripe webhook: fulfilment failed", `event ${event.id}\n${error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error)}`);
    return new Response("fulfilment failed", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
