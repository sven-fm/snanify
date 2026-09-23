import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/RootShell";
import { content } from "@/lib/content";
import { langParams, parseLang } from "@/lib/locales";
import { pageMetadata, siteMetadata } from "@/lib/seo";

/* No `dynamicParams = false` here, on purpose. That setting turns any path
   not generated at build into a routing-level 404 served by Next's bare
   default page, with no layout and no copy of ours, and it is inherited by
   every segment below, catch-all included. Instead `requireLang` below throws
   notFound() for a stray locale, which renders this segment's not-found page
   inside the shell. The locales that exist are still prerendered. */

/** Every locale is prerendered at this level. */
/* Every page under this layout is remade at least once a day, so the year in
   a title, the Samvat in the masthead and the calendar horizon roll over
   without a deploy. Pages that set a shorter interval keep it. */
export const revalidate = 86400;

export function generateStaticParams() {
  return langParams();
}

/* The browser's own chrome takes the paper's colour, day and night. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ead9" },
    { media: "(prefers-color-scheme: dark)", color: "#12110e" },
  ],
  viewportFit: "cover",
};

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
