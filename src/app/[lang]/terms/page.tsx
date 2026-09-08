import type { Metadata } from "next";
import { Legal } from "@/components/pages/Legal";
import { legalContent } from "@/content/legal";
import { fullLangParams, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/terms";

export function generateStaticParams() {
  return fullLangParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = legalContent[lang].terms.meta;

  return pageMetadata({ lang, path: ROUTE, title: t.title, description: t.description });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Legal lang={lang} which="terms" />;
}
