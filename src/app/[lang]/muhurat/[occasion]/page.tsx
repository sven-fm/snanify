import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { MuhuratDetail } from "@/components/pages/MuhuratDetail";
import { OCCASIONS, muhuratContent, occasionBySlug } from "@/content/muhurat";

export const dynamicParams = false;

/** Every (lang, occasion) pair — the slug is identical in both locales. */
export function generateStaticParams() {
  return LANGS.flatMap((lang) => OCCASIONS.map((o) => ({ lang, occasion: o.slug })));
}

/** Public URL shape. localePath owns the "/hi" prefix — never hand-write it. */
const publicPath = (lang: Lang, slug: string) => localePath(lang, `/muhurat/${slug}`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; occasion: string }>;
}): Promise<Metadata> {
  const { lang, occasion: slug } = await params;
  const occasion = occasionBySlug(slug);
  if (!occasion) return {};

  const t = muhuratContent[lang];
  const title = `${occasion.name[lang]} — ${t.meta.detailSuffix}`;
  // The provisional label rides along into the search snippet too: a date that
  // is not confirmed should never appear anywhere without saying so.
  const description = `${occasion.line[lang]} · ${occasion.occurrence.label[lang]}. ${t.provenance.badge}`;

  return {
    title,
    description,
    alternates: {
      canonical: publicPath(lang, slug),
      languages: { en: publicPath("en", slug), hi: publicPath("hi", slug) },
    },
    openGraph: {
      type: "article",
      url: publicPath(lang, slug),
      title,
      description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; occasion: string }>;
}) {
  const { lang, occasion: slug } = await params;
  const occasion = occasionBySlug(slug);
  if (!occasion) notFound();

  return <MuhuratDetail lang={lang} occasion={occasion} />;
}
