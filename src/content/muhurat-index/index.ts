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
  const twin = OCCASIONS.some((x) => x !== o && x.occasionId === o.occasionId && firstYear(x) === year);
  const when = twin && o.occurrence.months.length === 1 ? o.occurrence.label[lang] : year;
  /* The second name goes in brackets. In English it is the day's other name;
     in Hindi it is a Latin name, the other name where there is one, because
     the Hindi edition is searched in Latin script as often as in Devanagari.
     When room is short the brand goes first, then what the page answers,
     and the second name last. */
  const other = lang === "en" ? o.aka?.en : o.aka?.en ?? o.name.en;
  if (!year) {
    const bare = other ? `${name} (${other})` : name;
    return fitTitle([`${bare}, ${m.detailSuffix}`, bare]);
  }
  const named = (n: string) => m.detailTitle.replace("{name}", n).replace("{year}", when);
  const unbranded = (t: string) => t.replace(/ \| Snanify$/, "");
  const answer = (t: string) => t.replace(/: .*$/, `: ${m.detailAnswerShort}`);
  const full = named(name);
  const withOther = other ? named(`${name} (${other})`) : undefined;
  return fitTitle(
    withOther
      ? [withOther, unbranded(withOther), answer(withOther), full, unbranded(full)]
      : [full, unbranded(full)],
  );
}
