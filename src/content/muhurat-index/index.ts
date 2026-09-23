import type { Lang } from "@/lib/locales";
import { fitTitle } from "@/lib/seo";
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

/**
 * An occasion page's title: the name and the year it next falls in, or the
 * name and the calendar when no dated day lies ahead. The brand goes when a
 * long name needs the room.
 */
export function occasionTitle(lang: Lang, name: string, year: string | undefined): string {
  const m = muhuratIndexContent[lang].meta;
  if (!year) return fitTitle([`${name}, ${m.detailSuffix}`, name]);
  const full = m.detailTitle.replace("{name}", name).replace("{year}", year);
  return fitTitle([full, full.replace(/ \| Snanify$/, "")]);
}
