import type { Metadata } from "next";

import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { Panchang } from "@/components/pages/Panchang";
import { panchangContent } from "@/content/panchang";

/**
 * Public URL shape: English unprefixed, Hindi under /hi. Never "/en/...", and
 * never a hand-written "/hi/...", localePath owns that shape so a route
 * rename cannot strand one locale.
 */
const ROUTE = "/panchang";
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
  const t = panchangContent[lang].meta;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: PUBLIC_PATH[lang],
      languages: { en: PUBLIC_PATH.en, hi: PUBLIC_PATH.hi },
    },
    openGraph: {
      type: "article",
      url: PUBLIC_PATH[lang],
      title: t.title,
      description: t.description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Panchang lang={lang} />;
}
