"use client";

import { useState } from "react";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";
import { Price } from "@/components/ui";
import { TrackedSubmit } from "@/components/site/TrackedSubmit";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The three packs alone, for somebody who has come to buy: the menu's
   "Buy mornings", or a returning buyer at zero.

   One form. Each pack is a native radio inside a press-choice block, so the
   arrows, the tab stop and the submitted value come from the browser, and the
   chosen block sinks into sindoor through `.press-choice:has(input:checked)`
   with or without script. Eleven arrives chosen. The one press under them
   names the chosen pack's price, in the reader's currency.
   --------------------------------------------------------------------------- */

const TIERS: TierKey[] = ["one", "eleven", "sixty"];
const W700 = { fontWeight: 700 } as const;

export function PackPicker({
  action,
  lang,
  pack,
  names,
  blurbs,
  perLabel,
  cta,
  opening,
  legend,
}: {
  /** startCheckout, bound to the edition on the server: a bind made here
      would differ between the server render and hydration. */
  action: (formData: FormData) => Promise<void>;
  lang: Lang;
  /** The pack that arrives chosen. */
  pack: TierKey;
  names: Record<TierKey, string>;
  blurbs: Record<TierKey, string>;
  perLabel: string;
  /** "Pay {price}". */
  cta: string;
  opening: string;
  /** The group's name for a screen reader. */
  legend: string;
}) {
  const [tier, setTier] = useState<TierKey>(pack);
  const [before, after] = cta.split("{price}");
  const stop = lang === "hi" ? "। " : ". ";

  return (
    <form action={action} className="mt-6">
      <fieldset>
        <legend className="sr-only">{legend}</legend>
        <div className="flex flex-col gap-3">
          {TIERS.map((key) => (
            <label
              key={key}
              data-pack={key}
              className="press-choice w-full items-start justify-between gap-4 py-3.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-sindoor"
            >
              <input
                type="radio"
                name="tier"
                value={key}
                checked={tier === key}
                onChange={() => setTier(key)}
                className="sr-only"
              />
              <span className="min-w-0">
                <span className="display block text-[1.375rem] leading-[1.15]" style={W700}>
                  {names[key]}
                </span>
                <span className="mt-1 block text-sm leading-[1.5]">
                  <Price prices={PER_SNAN[key]} /> {perLabel}
                  {stop}
                  {blurbs[key]}
                </span>
              </span>
              <span className="display shrink-0 tabular-nums text-[1.375rem] leading-[1.15]" style={W700}>
                <Price prices={PRICE[key]} />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <TrackedSubmit
        className="mt-6 w-full"
        variant="solid"
        event="checkout_start"
        props={{ pack: tier, lang }}
        pending={opening}
      >
        {before}
        <Price prices={PRICE[tier]} />
        {after}
      </TrackedSubmit>
    </form>
  );
}
