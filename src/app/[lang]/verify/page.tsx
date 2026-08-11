import type { Metadata } from "next";
import { Verify } from "@/components/pages/Verify";
import { verifyContent } from "@/content/verify";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/verify";

/** Without this the route would inherit the layout's twelve locales and
 *  prerender ten pages whose copy does not exist. */
export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = verifyContent[lang];
  return pageMetadata({
    lang,
    path: ROUTE,
    title: `${t.title}, Snanify`,
    description: t.lede,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Verify lang={lang} />;
}
