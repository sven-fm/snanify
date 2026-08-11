import type { Metadata } from "next";
import { Verify } from "@/components/pages/Verify";
import { verifyContent } from "@/content/verify";
import type { Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = verifyContent[lang];
  return {
    title: `${t.title}, Snanify`,
    description: t.lede,
    alternates: {
      canonical: lang === "en" ? "/verify" : "/hi/verify",
      languages: { en: "/verify", hi: "/hi/verify" },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Verify lang={lang} />;
}
