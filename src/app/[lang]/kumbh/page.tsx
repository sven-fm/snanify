import type { Metadata } from "next";

import { Kumbh } from "@/components/pages/Kumbh";
import { KUMBH_ROUTE, kumbhContent } from "@/content/kumbh";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";

/**
 * Public URL shape: English unprefixed at /kumbh, Hindi at /hi/kumbh. Never
 * "/en/...", and never a hand-written "/hi/...", localePath owns that shape so
 * renaming the route cannot strand one locale.
 */
const PUBLIC_PATH = {
  en: localePath("en", KUMBH_ROUTE),
  hi: localePath("hi", KUMBH_ROUTE),
} as const;

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
      siteName: "Snanify",
      title: t.title,
      description: t.description,
      locale: lang === "en" ? "en_IN" : "hi_IN",
      alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return <Kumbh lang={lang} />;
}
