import type { Metadata } from "next";

import { Kumbh } from "@/components/pages/Kumbh";
import { KUMBH_ROUTE, kumbhContent } from "@/content/kumbh";
import { LANGS, type Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import {
  StructuredData,
  breadcrumbList,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";

/**
 * Public URL shape (English unprefixed at /kumbh, Hindi at /hi/kumbh), the
 * canonical, the hreflang set and the OG locales all come out of
 * `pageMetadata`, which derives them from the locale registry. Nothing here
 * writes a "/hi/..." by hand, so renaming the route cannot strand a locale.
 */
const ROUTE = KUMBH_ROUTE;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = kumbhContent[lang].meta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title,
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = kumbhContent[lang].meta;
  return (
    <>
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path: ROUTE,
            name: t.title,
            description: t.description,
            breadcrumb: breadcrumbList(lang, [
              { name: "Snanify", path: "/" },
              { name: t.title, path: ROUTE },
            ]),
          }),
        ]}
      />
      <Kumbh lang={lang} />
    </>
  );
}
