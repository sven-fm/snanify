import type { Metadata } from "next";
import { SnanIntro } from "@/components/pages/SnanIntro";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  publicUrl,
  sourceDataset,
  webPage,
  website,
} from "@/components/StructuredData";
import { snanContent } from "@/content/snan";
import { LANGS, type Lang } from "@/lib/locales";
import { SOURCES } from "@/lib/riverdata";
import { pageMetadata } from "@/lib/seo";
import { currencyForLang, PRICE } from "@/content/prices";
import { PACKS } from "@/lib/packs";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. */
const ROUTE = "/snan";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
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
     The offers below were deliberately absent until there was a checkout to
     point them at. There is one now, at /begin, so each pack is declared with
     the figure the page prints and the currency this edition prints it in.
     Still no aggregateRating, no review and no invented counts: nothing is
     asserted to a crawler that is not asserted to a reader. */
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
        "@id": `${publicUrl(lang, ROUTE)}#snan`,
        name: lang === "hi" ? "स्नान" : "The snan",
        alternateName: lang === "hi" ? "The snan" : "स्नान",
        description: t.meta.description,
        inLanguage: lang,
        publisher: organizationRef(),
        creator: organizationRef(),
        /* The one externally checkable fact on the page, named where a machine
           reads it, exactly as it is named where a person does: modelled
           discharge, daily, the same Dataset /live emits. */
        /* Offers hang off the work being sold rather than off the page, which
           is where schema.org puts them and what a crawler reads. The figure
           is the one this edition prints: rupees on the Hindi page, US dollars
           elsewhere, out of currencyForLang. */
        offers: PACKS.map((pack) => ({
          "@type": "Offer",
          name: t.tariff.rows.find((row) => row.key === pack.tier)?.name ?? pack.tier,
          price: PRICE[pack.tier][currencyForLang(lang)].replace(/[^0-9.]/g, ""),
          priceCurrency: currencyForLang(lang),
          availability: "https://schema.org/InStock",
          url: publicUrl(lang, "/begin"),
        })),
        isBasedOn: sourceDataset({
          name: SOURCES.discharge.model,
          url: SOURCES.discharge.modelHref,
          served: SOURCES.discharge.served,
        }),
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
