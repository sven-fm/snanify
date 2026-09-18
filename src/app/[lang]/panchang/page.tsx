import type { Metadata } from "next";

import { LANGS, type Lang } from "@/lib/locales";
import { Panchang } from "@/components/pages/Panchang";
import { panchangContent } from "@/content/panchang";
import { pageMetadata } from "@/lib/seo";
import { navLabel } from "@/lib/nav";
import { CITIES } from "@/content/cities";
import {
  StructuredData,
  breadcrumbList,
  itemList,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never "/en/...", and
 * never a hand-written "/hi/...", localePath owns that shape so a route
 * rename cannot strand one locale.
 */
const ROUTE = "/panchang";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = panchangContent[lang].meta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title.replace("{year}", String(new Date().getFullYear())),
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = panchangContent[lang].meta;
  return (
    <>
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path: ROUTE,
            name: t.title.replace("{year}", String(new Date().getFullYear())),
            description: t.description,
            breadcrumb: breadcrumbList(lang, [
              { name: "Snanify", path: "/" },
              { name: navLabel(lang, "panchang"), path: ROUTE },
            ]),
          }),
          itemList(
            lang,
            ROUTE,
            CITIES.map((c) => ({
              name: c.name[lang],
              path: `/panchang/${c.slug}`,
              description: [c.region?.[lang], c.country[lang]].filter(Boolean).join(", "),
            })),
          ),
        ]}
      />
      <Panchang lang={lang} />
    </>
  );
}
