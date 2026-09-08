/* ---------------------------------------------------------------------------
   Deliver a real, signed Stripe webhook to a running local server.

     set -a; . ./.env.local; set +a; node scripts/deliver-webhook.mjs <session_id>

   Stripe cannot reach localhost, so a checkout completed against a dev server
   never books its credits. This takes a session that really was paid, wraps it
   in the event Stripe would send, signs it with STRIPE_WEBHOOK_SECRET and
   posts it twice: once to fulfil, once to prove the redelivery buys nothing.

   It is how the neon-http transaction bug was found. Run it after any change to
   the ledger, the webhook or the database driver.
   --------------------------------------------------------------------------- */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const secret = process.env.STRIPE_WEBHOOK_SECRET;
const sessionId = process.argv[2];

const session = await stripe.checkout.sessions.retrieve(sessionId);
const body = JSON.stringify({
  id: "evt_local_1",
  object: "event",
  type: "checkout.session.completed",
  data: { object: session },
});
const header = Stripe.webhooks.generateTestHeaderString({ payload: body, secret });

for (const attempt of [1, 2]) {
  const res = await fetch("http://localhost:3000/api/stripe/webhook", {
    method: "POST",
    headers: { "stripe-signature": header, "content-type": "application/json" },
    body,
  });
  console.log(`delivery ${attempt}:`, res.status, await res.text());
}
