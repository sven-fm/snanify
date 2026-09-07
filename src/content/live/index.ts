import type { Lang } from "@/lib/locales";
import { en, type LiveCopy } from "./en";
import { hi } from "./hi";

export type { LiveCopy };
export { fill } from "./en";

/**
 * The live river page in every locale the site serves. See the header of
 * ./en.ts for the rules the copy is written under, in particular that the
 * {braces} and the units are identical in all twelve.
 */
export const liveContent = {
  en,
  hi,
} satisfies Record<Lang, LiveCopy>;
