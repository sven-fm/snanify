import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RiverDetail } from "@/components/pages/RiverDetail";
import { getGhat, RIVERS } from "@/content/rivers";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";

export const dynamicParams = false;

/** Every (lang, river) combination, six waters × two locales. */
export function generateStaticParams() {
  return LANGS.flatMap((lang) => RIVERS.map((r) => ({ lang, river: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; river: string }>;
}): Promise<Metadata> {
  const { lang, river } = await params;
  const ghat = getGhat(river);
  if (!ghat) return {};

  /* Public URL shape, built through localePath, never a hand-written /hi. */
  const route = `/rivers/${ghat.slug}`;
  const paths = { en: localePath("en", route), hi: localePath("hi", route) } as const;
  const publicPath = paths[lang];

  /* Titles are noun lists rather than sentences, so neither locale ends up
     with a grammatically wrong interpolation. */
  const title =
    lang === "hi"
      ? `${ghat.river.hi} · ${ghat.ghat.hi}, ${ghat.city.hi} | स्नानिफ़ाई`
      : `${ghat.river.en} at ${ghat.ghat.en}, ${ghat.city.en} | Snanify`;

  const description = `${ghat.epithet[lang]}, ${ghat.standfirst[lang]}`;

  return {
    title,
    description,
    alternates: {
      canonical: publicPath,
      languages: { en: paths.en, hi: paths.hi },
    },
    openGraph: {
      type: "article",
      url: publicPath,
      siteName: "Snanify",
      title,
      description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
      alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; river: string }>;
}) {
  const { lang, river } = await params;
  const ghat = getGhat(river);
  if (!ghat) notFound();

  return <RiverDetail lang={lang} ghat={ghat} />;
}
