import type { Metadata } from "next";
import { PatraExplainer } from "@/components/pages/PatraExplainer";
import { patraContent } from "@/content/patra";
import { LANGS, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale. */
const ROUTE = "/patra";
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
  const t = patraContent[lang].meta;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: PATHS[lang],
      languages: { en: PATHS.en, hi: PATHS.hi },
    },
    openGraph: {
      type: "article",
      url: PATHS[lang],
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

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <PatraExplainer lang={lang} />;
}
