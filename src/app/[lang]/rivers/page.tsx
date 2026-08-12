import type { Metadata } from "next";
import { RiversIndex } from "@/components/pages/RiversIndex";
import {
  StructuredData,
  breadcrumbList,
  itemList,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import { RIVERS } from "@/content/rivers";
import { riversIndexContent } from "@/content/rivers-index";
import { allLangParams, pickDeep, type Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import { navLabel } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/rivers";

export function generateStaticParams() {
  return allLangParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = riversIndexContent[lang];

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = riversIndexContent[lang];

  /* A CollectionPage whose main entity is the ordered list of six waters, in
     the order the page itself sets them. Each entry is a link and a name; the
     Place node with its address lives on the water's own page, which is where
     a crawler should be sent for it. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      type: "CollectionPage",
      name: t.title,
      description: t.meta.description,
      mainEntity: itemList(
        lang,
        ROUTE,
        RIVERS.map((ghat) => ({
          name: `${waterName(ghat, "river", lang)}, ${waterName(ghat, "ghat", lang)}, ${waterName(ghat, "city", lang)}`,
          path: `/rivers/${ghat.slug}`,
          description: pickDeep(ghat.epithet, lang),
        })),
      ),
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "rivers"), path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <RiversIndex lang={lang} />
    </>
  );
}
