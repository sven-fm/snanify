import { describe, expect, it } from "vitest";
/* The catalogue script is plain JS on purpose: it must run with bare node and
   no build step, so it can be run against production Stripe from a shell. */
import { CATALOGUE } from "../../scripts/stripe-catalogue.mjs";
import { PACKS, packForTier } from "@/lib/packs";
import { PRICE, type TierKey } from "@/content/prices";
import { CURRENCIES } from "@/lib/currency";

type Item = { lookupKey: string; credits: number; amounts: Record<string, number> };

/** "$11" or "₹2,100" as the site prints it, back to minor units. */
function minorUnits(printed: string): number {
  const digits = printed.replace(/[^0-9.]/g, "");
  return Math.round(Number(digits) * 100);
}

describe("the Stripe catalogue and the printed price", () => {
  it("charges exactly what the site prints, in every currency", () => {
    for (const tier of Object.keys(PRICE) as TierKey[]) {
      const item = (CATALOGUE as Item[]).find((c) => c.lookupKey === packForTier(tier).lookupKey);
      expect(item, `no Stripe entry for ${tier}`).toBeDefined();

      for (const currency of CURRENCIES) {
        const printed = minorUnits(PRICE[tier][currency]);
        expect(
          item!.amounts[currency.toLowerCase()],
          `${tier} in ${currency}: the site prints ${PRICE[tier][currency]}`,
        ).toBe(printed);
      }
    }
  });

  it("sells the number of mornings the pack is named for", () => {
    for (const pack of PACKS) {
      const item = (CATALOGUE as Item[]).find((c) => c.lookupKey === pack.lookupKey);
      expect(item!.credits).toBe(pack.credits);
    }
  });

  it("covers every tier the site offers, and nothing else", () => {
    expect((CATALOGUE as Item[]).map((c) => c.lookupKey).sort()).toEqual(
      PACKS.map((p) => p.lookupKey).sort(),
    );
  });

  it("gives eleven mornings for eleven of the unit, which is the whole hook", () => {
    const eleven = (CATALOGUE as Item[]).find((c) => c.lookupKey === "snan_eleven")!;
    expect(eleven.amounts.usd).toBe(1100);
    expect(eleven.amounts.eur).toBe(1100);
    expect(eleven.amounts.cad).toBe(1100);
    expect(eleven.credits).toBe(11);
  });
});
