import type { Metadata } from "next";
import { Rituals } from "@/components/pages/Rituals";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { ritualsContent } from "@/content/rituals";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never `/en/...`.
 * Built through localePath so a rename of the route cannot strand one locale.
 */
const ROUTE = "/rituals";
const PATHS = { en: localePath("en", ROUTE), hi: localePath("hi", ROUTE) } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = ritualsContent[lang];

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: PATHS[lang],
      languages: { en: PATHS.en, hi: PATHS.hi },
    },
    openGraph: {
      type: "article",
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
  return <Rituals lang={lang} />;
}
