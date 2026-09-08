import "server-only";
import Stripe from "stripe";
import type { Currency } from "@/lib/currency";
import { packForTier, type Pack } from "@/lib/packs";
import { localePath, type FullLang as Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   Stripe, for the one thing this product does with it: sell a pack of
   mornings, once, with no subscription anywhere.

   THE PRICE IS RESOLVED BY LOOKUP KEY, NOT BY ID. See src/lib/packs.ts for
   why. The resolution is cached for the life of the instance, because a warm
   serverless instance handles many checkouts and the answer changes only when
   somebody runs the catalogue script.

   THE CURRENCY IS THE READER'S. Every pack is one Stripe price carrying an
   amount per currency, so the session is created with the currency the site
   already decided to print in and Stripe charges the figure the reader saw.
   The two cannot disagree: a test compares the catalogue with prices.ts.

   WHAT GOES ON THE SESSION, and why each of it matters at the webhook:
     · client_reference_id  who bought, so the credits reach the right ledger
     · metadata.pack        which pack, so the webhook books the right number
     · metadata.credits     the number itself, so a renamed pack cannot change
                            what an already-paid session was worth
   --------------------------------------------------------------------------- */

let client: Stripe | null = null;

export function stripe(): Stripe {
  if (client) return client;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is missing. Run `vercel env pull .env.local`.");

  client = new Stripe(key);
  return client;
}

const priceIds = new Map<string, string>();

/** The current price id behind a pack's lookup key. */
export async function priceIdFor(pack: Pack): Promise<string> {
  const cached = priceIds.get(pack.lookupKey);
  if (cached) return cached;

  const found = await stripe().prices.list({ lookup_keys: [pack.lookupKey], limit: 1 });
  const price = found.data[0];

  if (!price) {
    throw new Error(
      `no Stripe price with lookup key ${pack.lookupKey}. ` +
        `Run: set -a; . ./.env.local; set +a; node scripts/stripe-catalogue.mjs`,
    );
  }

  priceIds.set(pack.lookupKey, price.id);
  return price.id;
}

export type CheckoutRequest = {
  userId: string;
  email: string;
  tier: TierKey;
  currency: Currency;
  lang: Lang;
  origin: string;
};

/**
 * A Checkout Session for one pack, and the URL to send the buyer to.
 *
 * `success_url` carries the session id so /begin/done can look the purchase up
 * rather than waiting on the webhook, which may not have arrived yet. The
 * webhook is still what books the credits: the return page only reads.
 */
export async function createCheckout(req: CheckoutRequest): Promise<string> {
  const pack = packForTier(req.tier);
  const price = await priceIdFor(pack);

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    currency: req.currency.toLowerCase(),
    customer_email: req.email,
    client_reference_id: req.userId,
    metadata: {
      pack: pack.tier,
      credits: String(pack.credits),
      userId: req.userId,
      lang: req.lang,
    },
    /* Clerk holds the email and Stripe holds the card. Neither needs the
       other's copy, and a saved customer object is one more place a person's
       details sit for a product that sells packs rather than subscriptions. */
    payment_intent_data: {
      metadata: { userId: req.userId, pack: pack.tier },
    },
    /* Stripe ships no Hindi bundle for Checkout, so "auto" lets it match the
       browser rather than pinning everyone to English. The figures and the
       product name are ours either way. */
    locale: "auto",
    allow_promotion_codes: true,
    success_url: `${req.origin}${localePath(req.lang, "/begin/done")}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.origin}${localePath(req.lang, "/begin")}?cancelled=1`,
  });

  if (!session.url) throw new Error(`Stripe returned no URL for session ${session.id}`);
  return session.url;
}

/** One session, for the return page and for the webhook. */
export async function getSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  try {
    return await stripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}
