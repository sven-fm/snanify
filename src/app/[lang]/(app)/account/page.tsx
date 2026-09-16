import type { Metadata } from "next";
import { Account } from "@/components/pages/Account";
import { accountContent } from "@/content/account";
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* Behind a sign-in, so it renders per request and is never prerendered with
   one person's register baked into it. */
const ROUTE = "/account";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = accountContent[lang].account.meta;

  return {
    ...(await pageMetadata({ lang, path: ROUTE, title: t.title, description: t.description })),
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ confirm?: string; reminders?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  return (
    <Account lang={lang} misstyped={query.confirm === "1"} remindersOff={query.reminders === "off"} />
  );
}
