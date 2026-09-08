import type { Lang } from "@/lib/locales";
import { en, type MuhuratIndexCopy } from "./en";
import { hi } from "./hi";

export type { MuhuratIndexCopy };

/**
 * The muhurat calendar in every locale the site serves, plus the keys the
 * detail route shares with it. See the header of ./en.ts.
 */
export const muhuratIndexContent = {
  en,
  hi,
} satisfies Record<Lang, MuhuratIndexCopy>;
