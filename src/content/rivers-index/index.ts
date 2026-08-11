import type { Lang } from "@/lib/locales";
import { en, type RiversIndexCopy } from "./en";
import { hi } from "./hi";
import { bn } from "./bn";
import { mr } from "./mr";
import { te } from "./te";
import { ta } from "./ta";
import { gu } from "./gu";
import { kn } from "./kn";
import { ml } from "./ml";
import { or } from "./or";
import { pa } from "./pa";
import { as } from "./as";

export type { RiversIndexCopy };

/**
 * The waters index in every locale the site serves. See the header of ./en.ts
 * for the rules the copy is written under.
 */
export const riversIndexContent = {
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
} satisfies Record<Lang, RiversIndexCopy>;
