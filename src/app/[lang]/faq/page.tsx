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
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { navLabel } from "@/lib/nav";
import { faqContent } from "@/content/trust";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/faq";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = faqContent[lang];

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.meta.title,
    description: t.meta.description,
    ogType: "article",
  });
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
