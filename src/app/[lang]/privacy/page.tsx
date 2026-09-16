import type { Metadata } from "next";
import { Legal } from "@/components/pages/Legal";
import { legalContent } from "@/content/legal";
import { langParams, type Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/privacy";

export function generateStaticParams() {
  return langParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = legalContent[lang].privacy.meta;

  return pageMetadata({ lang, path: ROUTE, title: t.title, description: t.description });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Legal lang={lang} which="privacy" />;
}
