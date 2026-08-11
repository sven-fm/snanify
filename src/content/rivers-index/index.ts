import type { Lang } from "@/lib/locales";
import { en, type RiversIndexCopy } from "./en";
import { hi } from "./hi";

export type { RiversIndexCopy };

/**
 * The waters index in every locale the site serves. See the header of ./en.ts
 * for the rules the copy is written under.
 */
export const riversIndexContent = {
  en,
  hi,
} satisfies Partial<Record<Lang, RiversIndexCopy>>;
