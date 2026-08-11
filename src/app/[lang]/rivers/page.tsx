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
import { RIVERS, riversIndexContent } from "@/content/rivers";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/...", localePath owns that so a route rename
 * cannot strand one locale.
 */
const ROUTE = "/rivers";
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
  const t = riversIndexContent[lang];

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
      type: "website",
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
          name: `${ghat.river[lang]}, ${ghat.ghat[lang]}, ${ghat.city[lang]}`,
          path: `/rivers/${ghat.slug}`,
          description: ghat.epithet[lang],
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
