import type { GhatId, Occasion } from "@/content/muhurat";
import type { Ghat } from "@/content/rivers";
import type { FullLang, Lang } from "@/lib/locales";

export { monthName } from "@/content/months";

/* ---------------------------------------------------------------------------
   Proper nouns, read in the locale the reader is in.

   This file once carried the six waters, the occasions and the muhurat windows
   written out in ten more scripts, because the deep content in rivers.ts and
   muhurat.ts is English and Hindi only and a Tamil landing page listing six
   waters in English tells a Tamil reader the river is not theirs. The site
   serves two locales now, so both names live upstream and these three readers
   are a straight lookup. The tables are in git, and they come back with their
   locale. See build-plan.md, decision "Locales at launch".

   The readers are kept rather than inlined at every call site, because a third
   locale puts its table back behind exactly these three signatures.
   --------------------------------------------------------------------------- */

/** The four naming fields on a water. Prose fields are not localised here. */
export type WaterField = "river" | "ghat" | "city" | "state";

/** A water's name. rivers.ts is the single source of truth for both locales. */
export function waterName(ghat: Ghat, field: WaterField, lang: Lang): string {
  return ghat[field][lang];
}

/** An occasion's name. muhurat.ts is the single source of truth. */
export function occasionName(occasion: Occasion, lang: Lang): string {
  return occasion.name[lang];
}

/**
 * A daily muhurat window's name. Takes the bilingual name so the caller keeps
 * its existing lookup, and so a third locale needs no change here.
 */
export function windowName(_id: string, name: Record<FullLang, string>, lang: Lang): string {
  return name[lang];
}

export type { GhatId };
