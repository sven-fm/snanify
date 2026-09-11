import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/RootShell";
import { content } from "@/lib/content";
import { allLangParams, parseLang } from "@/lib/locales";
import { pageMetadata, siteMetadata } from "@/lib/seo";

/* No `dynamicParams = false` here, on purpose. That setting turns any path
   not generated at build into a routing-level 404 served by Next's bare
   default page, with no layout and no copy of ours, and it is inherited by
   every segment below, catch-all included. Instead `requireLang` below throws
   notFound() for a stray locale, which renders this segment's not-found page
   inside the shell. The locales that exist are still prerendered. */

/**
 * Every locale is prerendered at this level. Routes that only English and
 * Hindi serve narrow it again with their own `generateStaticParams`; see
 * `fullLangParams` in src/lib/locales.ts.
 */
export function generateStaticParams() {
  return allLangParams();
}

function requireLang(value: string) {
  const lang = parseLang(value);
  if (!lang) notFound();
  return lang;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = requireLang((await params).lang);
  const t = content[lang];

  return {
    ...siteMetadata,
    ...pageMetadata({
      lang,
      path: "/",
      title: t.meta.title,
      description: t.meta.description,
    }),
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = requireLang((await params).lang);
  return <RootShell lang={lang}>{children}</RootShell>;
}
