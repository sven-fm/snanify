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
import { LANGS, type Lang } from "@/lib/locales";
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
  return LANGS.map((lang) => ({ lang }));
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
