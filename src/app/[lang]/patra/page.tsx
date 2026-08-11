import type { Metadata } from "next";
import { PatraExplainer } from "@/components/pages/PatraExplainer";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  publicUrl,
  webPage,
  website,
} from "@/components/StructuredData";
import { patraContent } from "@/content/patra";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. */
const ROUTE = "/patra";
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
  const t = patraContent[lang].meta;

  return {
    title: t.title,
    description: t.description,
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
      title: t.title,
      description: t.description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
      alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = patraContent[lang];

  /* The page is about a document type, so the document is described as a
     CreativeWork and the page is `about` it. Nothing here says any patra has
     been issued, because none has: no dateCreated, no identifier, no example. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      name: t.hero.title,
      description: t.meta.description,
      about: {
        "@type": "CreativeWork",
        "@id": `${publicUrl(lang, ROUTE)}#sankalp-patra`,
        name: lang === "hi" ? "संकल्प पत्र" : "Sankalp Patra",
        alternateName: lang === "hi" ? "Sankalp Patra" : "संकल्प पत्र",
        description: t.meta.description,
        inLanguage: lang,
        publisher: organizationRef(),
        creator: organizationRef(),
      },
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "patra"), path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <PatraExplainer lang={lang} />
    </>
  );
}
