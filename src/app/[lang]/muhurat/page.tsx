import type { Metadata } from "next";

import {
  StructuredData,
  breadcrumbList,
  itemList,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
/* This route exists in English and Hindi only for now; see the tier note and
   the FULL_ONLY list at the top of src/lib/locales.ts, which is the single
   place that decides. `Lang` here is therefore the full-depth pair. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { navLabel } from "@/lib/nav";
import { MuhuratIndex } from "@/components/pages/MuhuratIndex";
import { OCCASIONS, muhuratContent } from "@/content/muhurat";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never "/en/...", and
 * never a hand-written "/hi/...", localePath owns that shape so a route
 * rename cannot strand one locale.
 */
const ROUTE = "/muhurat";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = muhuratContent[lang].meta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.indexTitle,
    description: t.indexDescription,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = muhuratContent[lang];

  /* The calendar as a list of occasions, in the order the almanac sets them.
     Each entry carries only a name, a line and a link. The Event node with its
     dates and its provenance label lives on the occasion's own page, which is
     the page that is entitled to state them. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      type: "CollectionPage",
      name: t.hero.title,
      description: t.meta.indexDescription,
      mainEntity: itemList(
        lang,
        ROUTE,
        OCCASIONS.map((occasion) => ({
          name: occasion.name[lang],
          path: `/muhurat/${occasion.slug}`,
          description: occasion.line[lang],
        })),
      ),
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "muhurat"), path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <MuhuratIndex lang={lang} />
    </>
  );
}
