import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/RootShell";
import { content, LANGS, type Lang } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

function parseLang(value: string): Lang {
  if ((LANGS as string[]).includes(value)) return value as Lang;
  notFound();
}

/**
 * `/hi/...` is the public Hindi URL; English is unprefixed and reaches
 * `[lang]=en` through the rewrite in src/proxy.ts. Canonicals below are written
 * in the public shape, never the internal `/en/...` one.
 */
function publicPath(lang: Lang, path = "/"): string {
  const p = path === "/" ? "" : path;
  return lang === "en" ? p || "/" : `/hi${p}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  const t = content[lang];

  return {
    metadataBase: new URL("https://www.snanify.com"),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Snanify",
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
    alternates: {
      canonical: publicPath(lang),
      languages: { en: "/", hi: "/hi" },
    },
    openGraph: {
      type: "website",
      url: publicPath(lang),
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = parseLang((await params).lang);
  return <RootShell lang={lang}>{children}</RootShell>;
}
