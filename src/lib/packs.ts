import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   The three packs, joined to Stripe.

   A pack is a tier on the page, a lookup key in Stripe, and a number of
   mornings. Those three facts live together here so nothing else has to know
   two of them at once.

   WHY A LOOKUP KEY RATHER THAN A PRICE ID. A Stripe price is immutable, so
   changing a figure means a new price object. A price id in an environment
   variable therefore has to be updated in three environments on the day a
   figure changes, and the day somebody forgets is the day the site prints one
   number and charges another. A lookup key survives the change: the catalogue
   script moves it onto the new price. See scripts/stripe-catalogue.mjs.

   The figures themselves are never here. They are in src/content/prices.ts,
   printed by <Price>, and Stripe holds its own copy, which a test keeps in
   step with the printed one.
   --------------------------------------------------------------------------- */

export type Pack = {
  tier: TierKey;
  /** The stable handle on the Stripe price. Never a price id. */
  lookupKey: string;
  /** Mornings bought. Booked to the ledger by the webhook. */
  credits: number;
};

export const PACKS: readonly Pack[] = [
  { tier: "one", lookupKey: "snan_one", credits: 1 },
  { tier: "eleven", lookupKey: "snan_eleven", credits: 11 },
  { tier: "sixty", lookupKey: "snan_sixty", credits: 60 },
];

export const PACK_BY_TIER: Readonly<Record<TierKey, Pack>> = Object.fromEntries(
  PACKS.map((p) => [p.tier, p]),
) as Record<TierKey, Pack>;

export function packForTier(tier: TierKey): Pack {
  return PACK_BY_TIER[tier];
}

/** The pack a Stripe lookup key belongs to, or null if it is not one of ours. */
export function packForLookupKey(key: string): Pack | null {
  return PACKS.find((p) => p.lookupKey === key) ?? null;
}

/** Whether a string off a query parameter names a real tier. */
export function isTier(value: string): value is TierKey {
  return PACKS.some((p) => p.tier === value);
}

/** The tier a buyer lands on when they have not chosen one. */
export const DEFAULT_TIER: TierKey = "eleven";
