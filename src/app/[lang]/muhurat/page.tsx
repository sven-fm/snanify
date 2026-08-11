import type { Metadata } from "next";

import {
  StructuredData,
  breadcrumbList,
  itemList,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { MuhuratIndex } from "@/components/pages/MuhuratIndex";
import { OCCASIONS, muhuratContent } from "@/content/muhurat";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never "/en/...", and
 * never a hand-written "/hi/...", localePath owns that shape so a route
 * rename cannot strand one locale.
 */
const ROUTE = "/muhurat";
const PUBLIC_PATH = { en: localePath("en", ROUTE), hi: localePath("hi", ROUTE) } as const;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = muhuratContent[lang].meta;

  return {
    title: t.indexTitle,
    description: t.indexDescription,
    alternates: {
      canonical: PUBLIC_PATH[lang],
      // x-default points at the English edition: it is the wider of the two
      // audiences and the one an unmatched locale should land on.
      languages: {
        en: PUBLIC_PATH.en,
        hi: PUBLIC_PATH.hi,
        "x-default": PUBLIC_PATH.en,
      },
    },
    openGraph: {
      type: "website",
      url: PUBLIC_PATH[lang],
      title: t.indexTitle,
      description: t.indexDescription,
      locale: lang === "en" ? "en_IN" : "hi_IN",
    },
  };
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
