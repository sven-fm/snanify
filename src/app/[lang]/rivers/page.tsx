import type { Metadata } from "next";
import { RiversIndex } from "@/components/pages/RiversIndex";
import { riversIndexContent } from "@/content/rivers";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`, and
 * never a hand-written "/hi/..." — localePath owns that so a route rename
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
      languages: { en: PATHS.en, hi: PATHS.hi },
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
  return <RiversIndex lang={lang} />;
}
