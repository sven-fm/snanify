import { SignOutNow } from "@/components/SignOutNow";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";

/* /sign-out: the way out, reachable from the masthead on every page. The
   marketing pages carry no Clerk, so the masthead cannot sign anybody out
   itself; it sends them here, where Clerk is, and this page does it on
   arrival and returns them to the front page. */

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <SignOutNow to={localePath(lang, "/")} />;
}
