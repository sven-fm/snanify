import type { Metadata } from "next";
import { LiveRivers } from "@/components/pages/LiveRivers";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  publicUrl,
  webPage,
  website,
  type JsonLdNode,
} from "@/components/StructuredData";
import { liveContent } from "@/content/live";
import { getGhat } from "@/content/rivers";
/* This route exists in English and Hindi only for now; see the tier note and
   the FULL_ONLY list at the top of src/lib/locales.ts, which is the single
   place that decides. `Lang` here is therefore the full-depth pair. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { ARCHIVE, REVALIDATE_SECONDS, SOURCES, getLiveSnapshot } from "@/lib/riverdata";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Built through
 * localePath so a rename cannot strand one locale.
 */
const ROUTE = "/live";

/**
 * The flood model publishes once a day and the weather block every quarter of
 * an hour, so half an hour is already finer than the data. Anything shorter
 * spends requests to render the same numbers.
 *
 * Next reads this at build time with a static parser and will not accept an
 * imported identifier, so the literal is written out and checked against the
 * fetch layer's own window on the line below. If the two ever drift, this
 * module throws the moment it is imported rather than silently serving a page
 * whose cache and whose data disagree.
 */
export const revalidate = 1800;

if (revalidate !== REVALIDATE_SECONDS) {
  throw new Error(
    `live/page: revalidate is ${revalidate} but riverdata caches for ${REVALIDATE_SECONDS}`,
  );
}

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = liveContent[lang];

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = liveContent[lang];
  const snapshot = await getLiveSnapshot();

  const url = publicUrl(lang, ROUTE);

  /* A Dataset, because that is what this page is: six locations, one variable,
     a stated temporal coverage and a named creator. Two rules govern it, and
     they are the rules the visible copy is written under:

     1. Nothing is asserted here that is not asserted on the page. The creator
        is Copernicus EMS, not us, because we ran no model. The licence is the
        one the upstream data actually carries.
     2. `dateModified` is the newest model day, never the build time. A crawler
        told a page changed today when the number on it did not is being lied
        to, and it is the kind that gets caught. When the feed is on the
        seasonal normals there is no model day, so the field is simply absent
        rather than filled with our own clock. */
  const dataset: JsonLdNode = {
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: t.meta.title,
    description: t.meta.description,
    url,
    inLanguage: lang,
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: SOURCES.discharge.model,
      url: SOURCES.discharge.modelHref,
    },
    publisher: organizationRef(),
    temporalCoverage: `${ARCHIVE.firstYear}-01-01/..`,
    dateModified: snapshot.latestModelledFor ?? undefined,
    variableMeasured: {
      "@type": "PropertyValue",
      name: "River discharge, modelled",
      unitText: "m3/s",
      measurementTechnique: `${SOURCES.discharge.model}, served by ${SOURCES.discharge.served}`,
    },
    /* Coordinates here are the queried grid cells, not the ghats. The ghats
       themselves carry no `geo` anywhere on this site because none has been
       surveyed; a model grid cell, by contrast, is a published coordinate and
       naming it is what lets a reader check the number. */
    spatialCoverage: snapshot.waters.map((water) => {
      const ghat = getGhat(water.slug);
      return {
        "@type": "Place",
        name: ghat ? `${ghat.river[lang]}, ${ghat.city[lang]}` : water.slug,
        description: t.reaches[water.slug],
        geo: {
          "@type": "GeoCoordinates",
          latitude: water.gauge.cell[0],
          longitude: water.gauge.cell[1],
        },
      };
    }),
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: SOURCES.discharge.href,
    },
  };

  const graph: JsonLdNode[] = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      type: "CollectionPage",
      name: t.title,
      description: t.meta.description,
      mainEntity: dataset,
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: t.eyebrow, path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <LiveRivers lang={lang} snapshot={snapshot} />
    </>
  );
}
