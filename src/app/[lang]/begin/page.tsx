import type { Metadata } from "next";
import { Begin } from "@/components/pages/Begin";
import { beginContent } from "@/content/begin";
import { LANGS, type Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* The pack picker. Rendered per request because it greets a signed-in reader
   with what they already have in hand. */
const ROUTE = "/begin";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = beginContent[lang].meta;

  return pageMetadata({ lang, path: ROUTE, title: t.title, description: t.description });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ pack?: string; cancelled?: string; go?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);

  return (
    <Begin
      lang={lang}
      pack={query.pack}
      go={query.go === "1"}
      cancelled={query.cancelled === "1"}
    />
  );
}
