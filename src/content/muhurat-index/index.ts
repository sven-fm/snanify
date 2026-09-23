import type { Lang } from "@/lib/locales";
import { fitTitle } from "@/lib/seo";
import { OCCASIONS, type Occasion } from "@/content/muhurat";
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

const firstYear = (o: Occasion) => o.occurrence.months[0]?.slice(0, 4);

/**
 * An occasion page's title: the name and when it falls, then what the page
 * answers. `resolvedYear` is the year the resolver found; a span it cannot
 * compute on its own (the Magh Mela) takes the year of its first month.
 * Where two pages of one occasion fall in the same year (Somvati Amavasya in
 * March and December 2027), each names its month, so no two titles match.
 * The brand goes when a long name needs the room.
 */
export function occasionTitle(lang: Lang, o: Occasion, resolvedYear?: string): string {
  const m = muhuratIndexContent[lang].meta;
  const name = o.name[lang];
  const year = resolvedYear ?? firstYear(o);
  if (!year) return fitTitle([`${name}, ${m.detailSuffix}`, name]);
  const twin = OCCASIONS.some((x) => x !== o && x.occasionId === o.occasionId && firstYear(x) === year);
  const when = twin && o.occurrence.months.length === 1 ? o.occurrence.label[lang] : year;
  const full = m.detailTitle.replace("{name}", name).replace("{year}", when);
  return fitTitle([full, full.replace(/ \| Snanify$/, "")]);
}
