import { accountContent } from "@/content/account";
import { HeaderCta } from "@/components/site/HeaderCta";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { ctaHref } from "@/lib/nav";

/**
 * The masthead action for the signed-in pages: "Begin" for a visitor, "Your
 * mornings" for somebody with an account, decided in the browser by Clerk.
 *
 * It lives apart from Header on purpose. Header once imported HeaderCta
 * directly, and because a client component imported by a server component is
 * part of that route's client bundle whether it renders or not, every
 * marketing page shipped Clerk's hooks, 115 KB of it, for a button they never
 * showed. Only the (app) pages import this file, so only they carry it.
 */
export function AppHeaderCta({ lang }: { lang: Lang }) {
  const t = content[lang];
  const account = accountContent[lang as "en" | "hi"] ?? accountContent.en;
  return (
    <HeaderCta
      begin={ctaHref(lang)}
      account={localePath(lang, "/account")}
      beginLabel={t.nav.cta}
      accountLabel={account.account.eyebrow}
      className="label hidden bg-spot px-4 py-2.5 text-paper transition-colors hover:bg-ink sm:inline-block"
    />
  );
}
