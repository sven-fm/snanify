import type { Lang } from "@/lib/locales";
import { en, type MuhuratIndexCopy } from "./en";
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

export type { MuhuratIndexCopy };

/**
 * The muhurat calendar in every locale the site serves, plus the keys the
 * detail route shares with it. See the header of ./en.ts.
 */
export const muhuratIndexContent = {
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
} satisfies Record<Lang, MuhuratIndexCopy>;
