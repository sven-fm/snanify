import type { Metadata } from "next";

import { Kumbh } from "@/components/pages/Kumbh";
import { KUMBH_ROUTE, kumbhContent } from "@/content/kumbh";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/**
 * Public URL shape (English unprefixed at /kumbh, Hindi at /hi/kumbh), the
 * canonical, the hreflang set and the OG locales all come out of
 * `pageMetadata`, which derives them from the locale registry. Nothing here
 * writes a "/hi/..." by hand, so renaming the route cannot strand a locale.
 */
const ROUTE = KUMBH_ROUTE;

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
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
  return <Kumbh lang={lang} />;
}
