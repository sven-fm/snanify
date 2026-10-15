import { alertOwner } from "@/lib/alert";
import type Stripe from "stripe";
import { isPaid } from "@/lib/fulfil";
import { settle } from "@/lib/settle";
import { stripe } from "@/lib/stripe";

/* ---------------------------------------------------------------------------
   Stripe's webhook, the door every paid session is booked through.

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
   are booked and its errors are swallowed. /begin/done books the same session
   when the buyer returns first; src/lib/settle.ts makes the two one booking
   and one receipt.

   THE OWNER HEARS ABOUT WHAT NEEDS A PERSON: a missing secret, a signature
   that fails, a paid session with nobody or no pack on it. src/lib/alert.ts
   sends one mail per subject per quarter hour per instance, so a bot posting
   here all night costs the inbox four mails an hour at most.

   The route is under /api, which src/proxy.ts excludes from the locale
   rewrite, so Stripe reaches it unprefixed and unauthenticated.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(session: Stripe.Checkout.Session): Promise<void> {
  const result = await settle(session);

  if (result.outcome === "ignored") {
    console.warn("stripe webhook: ignored", session.id, result.why);
    /* Money taken with nowhere to book it. Somebody has to look. */
    if (isPaid(session)) {
      await alertOwner(
        `stripe webhook: paid session left unbooked (${session.id})`,
        `session ${session.id}\n${result.why}\nmetadata ${JSON.stringify(session.metadata ?? {})}`,
      );
    }
  }
}

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("stripe webhook: STRIPE_WEBHOOK_SECRET is missing");
    await alertOwner(
      "stripe webhook: STRIPE_WEBHOOK_SECRET is missing",
      "Every paid session waits unbooked until the secret is set in Vercel.",
    );
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
    await alertOwner("stripe webhook: bad signature", error);
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
