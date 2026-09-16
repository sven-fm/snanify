import type { GhatId, Occasion } from "@/content/muhurat";
import type { Ghat } from "@/content/rivers";
import type { Lang } from "@/lib/locales";


/* ---------------------------------------------------------------------------
   Proper nouns, read in the locale the reader is in.

   The names live upstream in rivers.ts and muhurat.ts, and these three readers
   are a straight lookup. They are kept rather than inlined at every call site
   so a third locale has exactly three signatures to fill.
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
export function windowName(_id: string, name: Record<Lang, string>, lang: Lang): string {
  return name[lang];
}

export type { GhatId };
