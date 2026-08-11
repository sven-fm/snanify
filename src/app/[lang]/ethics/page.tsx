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
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { navLabel } from "@/lib/nav";
import { ethicsContent } from "@/content/trust";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/ethics";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = ethicsContent[lang];

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
