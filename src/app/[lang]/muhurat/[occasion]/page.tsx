import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  StructuredData,
  breadcrumbList,
  occasionEvent,
  organization,
  placeReference,
  publicUrl,
  webPage,
  website,
} from "@/components/StructuredData";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { otherLang } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { MuhuratDetail } from "@/components/pages/MuhuratDetail";
import {
  GHAT_ZONE,
  OCCASIONS,
  muhuratContent,
  occasionBySlug,
  type Occasion,
} from "@/content/muhurat";
import { RIVERS } from "@/content/rivers";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

/** Every (lang, occasion) pair, the slug is identical in both locales. */
export function generateStaticParams() {
  return FULL_LANGS.flatMap((lang) => OCCASIONS.map((o) => ({ lang, occasion: o.slug })));
}

/* ---------------------------------------------------------------------------
   Search-result copy.

   The description that used to ship here ended with the provenance badge,
   "Provisional, to be confirmed against the panchang". That sentence is the
   right sentence in the wrong place: on the page, printed beside the date, it
   builds trust; in the 155 characters that decide a click it reads as a site
   that does not know its own dates, against operators who assert theirs
   confidently. The badge stays on the page, in MuhuratDetail, and it also
   stays in the JSON-LD below, where a machine reads it. It comes out of the
   snippet and nothing else changes.

   The replacement is query-shaped rather than brand-shaped: the occasion, when
   it falls, the rule that decides the day, and how many waters keep it. Hindi
   is written as Hindi, not as a gloss of the English line.
   --------------------------------------------------------------------------- */

const seo = {
  en: {
    /** Indexed by count, so a single water is never called "one waters". */
    waters: [
      "no water",
      "one water",
      "two waters",
      "three waters",
      "four waters",
      "five waters",
      "six waters",
    ],
    tithiRule: "The tithi rule",
    ingressRule: "The ingress rule",
    description: (name: string, when: string, rule: string, waters: string) =>
      `${name}, ${when}. ${rule}, the snan windows, and the ${waters} where it is kept. In IST and your own timezone.`,
  },
  hi: {
    waters: ["कोई जल नहीं", "एक जल", "दो जल", "तीन जल", "चार जल", "पाँच जल", "छह जल"],
    tithiRule: "तिथि का नियम",
    ingressRule: "राशि-प्रवेश का नियम",
    description: (name: string, when: string, rule: string, waters: string) =>
      `${name}, ${when}। ${rule}, स्नान की बेलाएँ, और ${waters} जहाँ यह रखा जाता है। समय IST में और आपके समयक्षेत्र में।`,
  },
} satisfies Record<Lang, unknown>;

/**
 * "Every lunar month" is a sentence opener in the data and a mid-sentence
 * clause here, so the recurring labels are lowercased. Dated labels are left
 * exactly as written, because "September-October 2026" is a proper noun and
 * lowercasing it would be wrong.
 */
function occurrenceClause(lang: Lang, occasion: Occasion): string {
  const label = occasion.occurrence.label[lang];
  if (lang !== "en" || occasion.occurrence.basis !== "recurring") return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}

function occasionDescription(lang: Lang, occasion: Occasion): string {
  const t = seo[lang];
  const rule = occasion.rule.kind === "solar-ingress" ? t.ingressRule : t.tithiRule;
  const waters = t.waters[occasion.ghats.length] ?? t.waters[0];
  return t.description(
    occasion.name[lang],
    occurrenceClause(lang, occasion),
    rule,
    waters,
  );
}

/* --- schedule ------------------------------------------------------------- */

/**
 * An ISO 8601 repeat interval, and only where the cadence really is that
 * regular. Ekadashi falls twice in a lunar month, so it gets none rather than a
 * monthly one that is wrong by a factor of two, and a season is a stretch of
 * days rather than a repetition at all.
 */
function repeatFrequency(occasion: Occasion): string | undefined {
  if (occasion.cadence === "annual") return "P1Y";
  if (occasion.cadence === "monthly" && occasion.rule.paksha !== "both") return "P1M";
  return undefined;
}

/**
 * Dates at the coarsest precision the record can defend. `occurrence.basis` is
 * "month" or "recurring" and never "day", enforced at module load in
 * muhurat.ts, so a month is the most this can ever return. "2026-09" is a valid
 * ISO 8601 reduced-precision date; a fabricated "2026-09-26T04:24:00+05:30"
 * would not be a date at all, it would be a guess wearing a timestamp.
 */
function eventDates(occasion: Occasion): { startDate?: string; endDate?: string } {
  const months = occasion.occurrence.months;
  if (occasion.occurrence.basis !== "month" || months.length === 0) return {};
  return { startDate: months[0], endDate: months[months.length - 1] };
}

/** The Gregorian months an occasion can fall in, 1 to 12, for the Schedule. */
function byMonth(occasion: Occasion): readonly number[] | undefined {
  const months = occasion.occurrence.months;
  if (months.length === 0) return undefined;
  return months.map((m) => Number(m.slice(5, 7)));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; occasion: string }>;
}): Promise<Metadata> {
  const { lang, occasion: slug } = await params;
  const occasion = occasionBySlug(slug);
  if (!occasion) return {};

  const t = muhuratContent[lang];
  const title = `${occasion.name[lang]}, ${t.meta.detailSuffix}`;
  const description = occasionDescription(lang, occasion);

  return pageMetadata({
    lang,
    path: `/muhurat/${slug}`,
    title,
    description,
    ogType: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; occasion: string }>;
}) {
  const { lang, occasion: slug } = await params;
  const occasion = occasionBySlug(slug);
  if (!occasion) notFound();

  const route = `/muhurat/${slug}`;
  const alt = otherLang(lang);
  const description = occasionDescription(lang, occasion);

  /* The ghats that keep this occasion, named as the Place nodes that live on
     their own pages. They are `mentions` rather than `location`: attendance is
     online and only online, and listing a ghat as a location of an online event
     would say that somebody may turn up at it. */
  const ghats = occasion.ghats
    .map((g) => RIVERS.find((r) => r.slug === g.id))
    .filter((r) => r !== undefined)
    .map((r) =>
      placeReference(lang, `/rivers/${r.slug}`, `${r.ghat[lang]}, ${r.city[lang]}`),
    );

  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: route,
      name: occasion.name[lang],
      description,
      mainEntity: { "@id": `${publicUrl(lang, route)}#occasion` },
      mentions: ghats,
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "muhurat"), path: "/muhurat" },
        { name: occasion.name[lang], path: route },
      ]),
    }),
    occasionEvent({
      lang,
      path: route,
      name: occasion.name[lang],
      alternateName: occasion.name[alt],
      description,
      /* The provenance label verbatim, so the date's status travels with the
         date wherever the node is read. */
      provenance: muhuratContent[lang].provenance.badge,
      ...eventDates(occasion),
      scheduleTimezone: GHAT_ZONE,
      repeatFrequency: repeatFrequency(occasion),
      byMonth: byMonth(occasion),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <MuhuratDetail lang={lang} occasion={occasion} />
    </>
  );
}
