import type { Metadata } from "next";
import { Faq } from "@/components/pages/Faq";
import {
  StructuredData,
  breadcrumbList,
  faqQuestions,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { faqContent } from "@/content/trust";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/faq";
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
  const t = faqContent[lang];

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
  const t = faqContent[lang];

  /* FAQPage carrying every question on the page, answer text included in full.
     The page is the entity, so the FAQPage node IS the WebPage node rather than
     a second one sitting beside it. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      type: "FAQPage",
      name: t.title,
      description: t.meta.description,
      mainEntity: faqQuestions(lang, ROUTE, t.groups),
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "faq"), path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <Faq lang={lang} />
    </>
  );
}
