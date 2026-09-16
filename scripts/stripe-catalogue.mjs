/* ---------------------------------------------------------------------------
   Create or update the Stripe catalogue, from src/content/prices.ts.

   Run it with the environment loaded:

     set -a; . ./.env.local; set +a; node scripts/stripe-catalogue.mjs

   IDEMPOTENT, AND SAFE TO RUN AGAIN. Products are found by metadata, prices by
   lookup key. A price in Stripe is immutable, so changing a figure means
   creating a new price and moving the lookup key onto it; that is exactly what
   this does, and the old price stays in the account for the receipts that
   already reference it.

   ONE PRICE OBJECT PER PACK, NOT FOUR. Stripe's `currency_options` carries the
   figure for every currency on a single price, so Checkout is handed one
   lookup key and the currency the reader is in. Fifteen price ids in fifteen
   environment variables was the alternative, and it is fifteen things to get
   wrong on the day a figure changes.

   THE FIGURES COME FROM src/content/prices.ts and are written here in minor
   units. If the two ever disagree, the test in tests/unit/stripe-prices.test.ts
   fails, because the site would then print one number and charge another.
   --------------------------------------------------------------------------- */

import Stripe from "stripe";

/* Built inside run(), not at module load, so importing this file for its
   CATALOGUE (as tests/unit/stripe-catalogue.test.ts does) needs no API key. */
let stripe;

/** Minor units. Kept in step with src/content/prices.ts by a unit test. */
export const CATALOGUE = [
  {
    lookupKey: "snan_one",
    name: "One morning",
    description: "One morning with a real river, and the Sankalp Patra it leaves.",
    credits: 1,
    amounts: { usd: 200, eur: 200, gbp: 200, cad: 300, inr: 10100 },
  },
  {
    lookupKey: "snan_eleven",
    name: "Eleven mornings",
    description: "Eleven mornings, one for each. Spend them as the year runs.",
    credits: 11,
    amounts: { usd: 1100, eur: 1100, gbp: 1100, cad: 1100, inr: 50100 },
  },
  {
    lookupKey: "snan_sixty",
    name: "Sixty mornings",
    description: "Sixty mornings, five a month for a year.",
    credits: 60,
    amounts: { usd: 4800, eur: 4500, gbp: 4200, cad: 4800, inr: 210000 },
  },
];

const BASE = "usd";

/**
 * Tax, per currency. Every price outside the United States is inclusive: the
 * figure printed is the figure charged, and Stripe as merchant of record
 * remits the VAT or GST from inside it. US dollars are exclusive, which is
 * how a US reader reads a price. src/lib/currency.ts states the same rule
 * for the pages; <TaxNote> prints it.
 */
const TAX_BEHAVIOUR = { usd: "exclusive", eur: "inclusive", gbp: "inclusive", cad: "inclusive", inr: "inclusive" };

/**
 * Stripe product tax code. Stripe's own registry: "Software as a service (SaaS),
 * personal use", which is what a web-delivered, fully automated sitting is.
 * Managed Payments refuses a Checkout line whose product carries no code, and
 * Stripe Tax uses the same code to pick a rate, so it belongs on the product
 * in either mode.
 */
const TAX_CODE = "txcd_10103000";

/**
 * Find the product for a pack.
 *
 * NOT `products.search`: Stripe's search index is eventually consistent and
 * takes up to a minute to see a write, so a second run of this script within
 * that window found nothing and created a duplicate product for every pack.
 * `prices.list` by lookup key is strongly consistent and the price already
 * points at its product, so the price is the way in. `products.list` is the
 * fallback for the case where a product exists but its price was deleted.
 */
async function findProduct(lookupKey) {
  const byPrice = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  const price = byPrice.data[0];
  if (price) {
    const id = typeof price.product === "string" ? price.product : price.product.id;
    return stripe.products.retrieve(id);
  }

  for await (const product of stripe.products.list({ limit: 100 })) {
    if (product.metadata?.snanify_pack === lookupKey && product.active) return product;
  }
  return null;
}

async function run() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is missing");
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  for (const item of CATALOGUE) {
    let product = await findProduct(item.lookupKey);

    if (product) {
      await stripe.products.update(product.id, {
        name: item.name,
        description: item.description,
        tax_code: TAX_CODE,
      });
      console.log(`product ${item.lookupKey}: kept ${product.id}`);
    } else {
      product = await stripe.products.create({
        name: item.name,
        description: item.description,
        tax_code: TAX_CODE,
        metadata: { snanify_pack: item.lookupKey, credits: String(item.credits) },
      });
      console.log(`product ${item.lookupKey}: created ${product.id}`);
    }

    const currencyOptions = {};
    for (const [currency, amount] of Object.entries(item.amounts)) {
      if (currency === BASE) continue;
      currencyOptions[currency] = { unit_amount: amount, tax_behavior: TAX_BEHAVIOUR[currency] };
    }

    /* `currency_options` is not returned unless it is expanded, and without it
       every run decided the figures had changed and made a new price. */
    const existing = await stripe.prices.list({
      lookup_keys: [item.lookupKey],
      limit: 1,
      expand: ["data.currency_options"],
    });
    const current = existing.data[0];

    const sameBase = current?.unit_amount === item.amounts[BASE];
    const sameOthers =
      current &&
      Object.entries(currencyOptions).every(
        ([c, o]) =>
          current.currency_options?.[c]?.unit_amount === o.unit_amount &&
          current.currency_options?.[c]?.tax_behavior === o.tax_behavior,
      );

    const sameTax = current?.tax_behavior === TAX_BEHAVIOUR[BASE];
    if (current && sameBase && sameOthers && sameTax) {
      console.log(`  price ${item.lookupKey}: unchanged ${current.id}`);
      continue;
    }

    /* A price is immutable, so a changed figure means a new price object and
       the lookup key transferred onto it. */
    const price = await stripe.prices.create({
      product: product.id,
      currency: BASE,
      unit_amount: item.amounts[BASE],
      tax_behavior: TAX_BEHAVIOUR[BASE],
      currency_options: currencyOptions,
      lookup_key: item.lookupKey,
      transfer_lookup_key: true,
      metadata: { snanify_pack: item.lookupKey, credits: String(item.credits) },
    });
    console.log(`  price ${item.lookupKey}: created ${price.id}`);
  }
}

/* Only when run directly, never on import. */
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop())) {
  run().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
