import type { Metadata } from "next";
import { SnanIntro } from "@/components/pages/SnanIntro";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  publicUrl,
  webPage,
  website,
} from "@/components/StructuredData";
import { snanContent } from "@/content/snan";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. */
const ROUTE = "/snan";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = snanContent[lang].meta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title,
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = snanContent[lang];

  /* The page is about a practice with a stated price, so it is typed as a
     HowTo-free plain WebPage `about` the digital snan itself.
     Deliberately absent, and this is the same rule the rest of the graph is
     written under: no Product, no Offer and no availability. The tariff is
     printed on the page and is true there, but an Offer node asserts a
     purchasable, in-stock item at a checkout, and there is no checkout route
     to point one at yet. Add offers the day the payment route ships, not
     before. No aggregateRating, no review, no invented counts. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      name: t.meta.title,
      description: t.meta.description,
      about: {
        "@type": "CreativeWork",
        "@id": `${publicUrl(lang, ROUTE)}#jal-sankalp`,
        name: lang === "hi" ? "जल संकल्प" : "Jal Sankalp",
        alternateName: lang === "hi" ? "Jal Sankalp" : "जल संकल्प",
        description: t.meta.description,
        inLanguage: lang,
        publisher: organizationRef(),
        creator: organizationRef(),
        /* The one externally checkable fact on the page, named where a machine
           reads it, exactly as it is named where a person does. */
        isBasedOn: {
          "@type": "Dataset",
          name: "River Water Level (Telemetry, Hourly), Central Water Commission",
          url: "https://nwdp.nwic.gov.in/dataset/river-water-level-telemetry-hourly-central-water-commission-cwc",
        },
      },
      breadcrumb: breadcrumbList(lang, [
        { name: t.crumbs.home, path: "/" },
        { name: t.crumbs.here, path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <SnanIntro lang={lang} />
    </>
  );
}
