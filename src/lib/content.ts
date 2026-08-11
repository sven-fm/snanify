/* ---------------------------------------------------------------------------
   The landing copy, assembled from src/content/landing/<locale>.ts.

   English is the source edition and defines `LandingCopy`; every other file in
   that directory closes with `satisfies LandingCopy`, so a key added to en.ts
   without its eleven translations is eleven compile errors rather than eleven
   silent English strings on a Tamil page.

   The two rules that govern every string, restated because this is the file a
   future edit is most likely to start from:

   1. Nothing claims that a rite was performed. Nobody stands at a ghat, nobody
      recites a name, nothing is recorded and nothing is proved to have
      happened, because none of it does.
   2. Nothing promises an outcome. No punya, no dosha, no sins washed, no tier
      that works better than a cheaper tier.

   See the header of src/content/landing/en.ts for the figures and the price
   arithmetic, and src/lib/locales.ts for the locale registry itself.
   --------------------------------------------------------------------------- */

import { en, type LandingCopy } from "@/content/landing/en";
import { hi } from "@/content/landing/hi";
import { bn } from "@/content/landing/bn";
import { mr } from "@/content/landing/mr";
import { te } from "@/content/landing/te";
import { ta } from "@/content/landing/ta";
import { gu } from "@/content/landing/gu";
import { kn } from "@/content/landing/kn";
import { ml } from "@/content/landing/ml";
import { or } from "@/content/landing/or";
import { pa } from "@/content/landing/pa";
import { as } from "@/content/landing/as";
import type { Lang } from "@/lib/locales";

export type { Lang, FullLang } from "@/lib/locales";
export { LANGS, FULL_LANGS } from "@/lib/locales";

/** The landing edition in every locale the site serves. */
export const content = {
  en,
  hi,
  bn,
  mr,
  te,
  ta,
  gu,
  kn,
  ml,
  or,
  pa,
  as,
} satisfies Record<Lang, LandingCopy>;

export type Content = LandingCopy;
