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
import { LANGS, type Lang } from "@/lib/locales";
import { otherLang } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { MuhuratDetail } from "@/components/pages/MuhuratDetail";
import {
  GHAT_ZONE,
  OCCASIONS,
  occasionBySlug,
  type Occasion,
} from "@/content/muhurat";
import { RIVERS } from "@/content/rivers";
import { pageMetadata } from "@/lib/seo";
import { muhuratIndexContent, occasionDescription, occasionTitle } from "@/content/muhurat-index";
import { occasionName } from "@/content/names";
import { horizonFrom, resolveOccasion, sayResolved } from "@/lib/occasions";
import { localeDef } from "@/lib/locales";

/** Every (lang, occasion) pair, the slug is identical in both locales. */
/* The dates are computed from today; the page is remade once a day so the
   twelve-month horizon rolls forward by itself. */
export const revalidate = 86400;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => OCCASIONS.map((o) => ({ lang, occasion: o.slug })));
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

  /* The year the occasion next falls in, from the same resolver the page
     prints its dates with, so the title says "Kartik Purnima 2026" rather
     than a name alone. A rule with no dated instance keeps the plain title. */
  const { from, to } = horizonFrom(new Date());
  const next = resolveOccasion(occasion, from, to)[0];
  const year = next?.date?.slice(0, 4);
  const title = occasionTitle(lang, occasion, year);
  const description = occasionDescription(lang, occasion, next ? sayResolved(next, lang) : undefined);

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
  const t = muhuratIndexContent[lang];

  /* "When is Kartik Purnima in 2026?", answered with the computed date, as
     the FAQ node a search engine or an answer engine reads. Only where a
     date exists; a rule alone gets no question it cannot answer. */
  const { from, to } = horizonFrom(new Date());
  const resolved = resolveOccasion(occasion, from, to);
  const first = resolved[0];
  const description = occasionDescription(lang, occasion, first ? sayResolved(first, lang) : undefined);
  const year = first?.date?.slice(0, 4);
  const when =
    first && year
      ? [
          {
            "@type": "Question",
            "@id": `${publicUrl(lang, route)}#when`,
            name: t.meta.whenQuestion.replace("{name}", occasion.name[lang]).replace("{year}", year),
            inLanguage: localeDef(lang).tag,
            answerCount: 1,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${sayResolved(first, lang)}. ${t.provenance.badge}`,
              inLanguage: localeDef(lang).tag,
            },
          },
        ]
      : [];

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
      name: occasionName(occasion, lang),
      description,
      mainEntity: { "@id": `${publicUrl(lang, route)}#occasion` },
      mentions: [...ghats, ...when],
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
      alternateName: [occasion.name[alt], ...(occasion.aka ? [occasion.aka[lang], occasion.aka[alt]] : [])],
      description,
      /* The provenance label verbatim, so the date's status travels with the
         date wherever the node is read. */
      provenance: muhuratIndexContent[lang].provenance.badge,
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
