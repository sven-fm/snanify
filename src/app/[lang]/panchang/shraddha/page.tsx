import type { Metadata } from "next";

import { LANGS, type Lang } from "@/lib/locales";
import { Shraddha } from "@/components/pages/Shraddha";
import { panchangContent } from "@/content/panchang";
import { pageMetadata } from "@/lib/seo";
import { navLabel } from "@/lib/nav";
import { StructuredData, breadcrumbList, organization, webPage, website } from "@/components/StructuredData";

/* The shraddha guide. A static sibling of /panchang/[city], which Next
   resolves ahead of the dynamic segment. */

const ROUTE = "/panchang/shraddha";

const year = () => String(new Date().getFullYear());

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = panchangContent[lang].shraddha.meta;
  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title.replace("{year}", year()),
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = panchangContent[lang].shraddha;
  return (
    <>
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path: ROUTE,
            name: t.meta.title.replace("{year}", year()),
            description: t.meta.description,
            breadcrumb: breadcrumbList(lang, [
              { name: "Snanify", path: "/" },
              { name: navLabel(lang, "panchang"), path: "/panchang" },
              { name: t.kicker, path: ROUTE },
            ]),
          }),
        ]}
      />
      <Shraddha lang={lang} />
    </>
  );
}
