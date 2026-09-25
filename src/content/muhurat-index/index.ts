import type { Lang } from "@/lib/locales";
import { fitDescription, fitTitle } from "@/lib/seo";
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

/* ---------------------------------------------------------------------------
   Search-result copy.

   Query-shaped rather than brand-shaped: the occasion, when it falls, the rule
   that decides the day, and how many waters keep it. Hindi is written as
   Hindi, not as a gloss of the English line. The provenance badge stays on
   the page and in the JSON-LD; in the snippet it reads as a site unsure of its
   own dates.

   Written in five lengths, fullest first, because a computed day ("Friday,
   15 January 2027, the sun crosses at 21:15 IST the evening before") and a
   second name can double the opening clause. `fitDescription` takes the first
   that lands in 120 to 155 characters.
   --------------------------------------------------------------------------- */

const seo = {
  en: {
    /** Indexed by count, so a single water is never called "one waters". */
    waters: ["no water", "one water", "two waters", "three waters", "four waters", "five waters", "six waters"],
    tithiRule: "The tithi rule",
    ingressRule: "The ingress rule",
    lengths: (name: string, when: string, rule: string, waters: string) => [
      `${name}, ${when}. ${rule}, the snan windows, and the ${waters} where it is kept. In IST and your own timezone, side by side.`,
      `${name}, ${when}. ${rule}, the snan windows, and the ${waters} where it is kept. In IST and your own timezone.`,
      `${name}, ${when}. ${rule}, the snan windows and the ${waters} where it is kept, in IST and your timezone.`,
      `${name}, ${when}. The snan windows and the ${waters} where it is kept, in IST and your timezone.`,
      `${name}, ${when}. The snan windows, in IST and your own timezone.`,
    ],
  },
  hi: {
    waters: ["कोई जल नहीं", "एक जल", "दो जल", "तीन जल", "चार जल", "पाँच जल", "छह जल"],
    tithiRule: "तिथि का नियम",
    ingressRule: "राशि-प्रवेश का नियम",
    lengths: (name: string, when: string, rule: string, waters: string) => [
      `${name}, ${when}। ${rule}, स्नान की बेलाएँ, और ${waters} जहाँ यह रखा जाता है। समय IST में और आपके समयक्षेत्र में, साथ-साथ।`,
      `${name}, ${when}। ${rule}, स्नान की बेलाएँ, और ${waters} जहाँ यह रखा जाता है। समय IST में और आपके समयक्षेत्र में।`,
      `${name}, ${when}। ${rule}, स्नान की बेलाएँ और ${waters} जहाँ यह रखा जाता है, IST में और आपके समय में।`,
      `${name}, ${when}। स्नान की बेलाएँ और ${waters} जहाँ यह रखा जाता है, IST में और आपके समय में।`,
      `${name}, ${when}। स्नान की बेलाएँ, IST में और आपके समयक्षेत्र में।`,
    ],
  },
} satisfies Record<Lang, unknown>;

/**
 * "Every lunar month" is a sentence opener in the data and a mid-sentence
 * clause here, so the recurring labels are lowercased. Dated labels are left
 * exactly as written, because "September-October 2026" is a proper noun.
 */
function occurrenceClause(lang: Lang, o: Occasion): string {
  const label = o.occurrence.label[lang];
  if (lang !== "en" || o.occurrence.basis !== "recurring") return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}

/** The description opens with the computed day where there is one (`when`,
    from sayResolved), so the snippet answers the question the search asked. */
export function occasionDescription(lang: Lang, o: Occasion, when?: string): string {
  const t = seo[lang];
  const rule = o.rule.kind === "solar-ingress" ? t.ingressRule : t.tithiRule;
  const waters = t.waters[o.ghats.length] ?? t.waters[0];
  const day = when ?? occurrenceClause(lang, o);
  const named = o.aka ? `${o.name[lang]} (${o.aka[lang]})` : o.name[lang];
  return fitDescription([
    ...t.lengths(named, day, rule, waters),
    ...(o.aka ? t.lengths(o.name[lang], day, rule, waters).slice(3) : []),
  ]);
}
