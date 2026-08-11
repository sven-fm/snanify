import type { Metadata } from "next";
import { Ethics } from "@/components/pages/Ethics";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  webPage,
  website,
} from "@/components/StructuredData";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { ethicsContent } from "@/content/trust";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/ethics";
const PATHS = { en: localePath("en", ROUTE), hi: localePath("hi", ROUTE) } as const;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = ethicsContent[lang];

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: PATHS[lang],
      // x-default points at the English edition: it is the wider of the two
      // audiences and the one an unmatched locale should land on.
      languages: { en: PATHS.en, hi: PATHS.hi, "x-default": PATHS.en },
    },
    openGraph: {
      type: "article",
      url: PATHS[lang],
      siteName: "Snanify",
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
      alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = ethicsContent[lang];

  /* This is the page the Organization node points its ethicsPolicy and
     publishingPrinciples at, so the organisation is the page's main entity
     rather than a publisher sitting off to one side. AboutPage rather than
     WebPage: it is the statement of what the company is and is not. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      type: "AboutPage",
      name: t.title,
      description: t.meta.description,
      mainEntity: organizationRef(),
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "ethics"), path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <Ethics lang={lang} />
    </>
  );
}
