import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { ctaHref, primaryNav } from "@/lib/nav";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangSwitch } from "@/components/site/LangSwitch";
import { MobileCta, ProfileMenu, ProfileRows } from "@/components/site/HeaderCta";

export type NavLink = { href: string; label: string };

/**
 * A printed masthead rather than an app bar: wordmark and edition line over a
 * heavy rule, with the sections set as a ruled row beneath.
 *
 * `currentPath` is the locale-independent route, so the language switch lands
 * on the same page instead of dumping you at home.
 */
export function Header({
  lang,
  links,
  currentPath = "/",
  ctaTo,
  ctaAfterHero = false,
}: {
  lang: Lang;
  links?: NavLink[];
  currentPath?: string;
  /** An in-page anchor for the action instead of the pack picker. */
  ctaTo?: string;
  /**
   * On a page whose hero carries its own Begin, the masthead's waits until
   * that one has scrolled off: see PastHero and `[data-until-scrolled]`.
   */
  ctaAfterHero?: boolean;
}) {
  const t = content[lang];
  const navLinks = links ?? primaryNav(lang);

  /* Everybody sees "Begin". Somebody signed in also gets the silhouette
     beside it, with their account under it. Whether it exists is decided in
     the browser, so this page can stay prerendered: see HeaderCta.tsx. */
  const profileRows = [
    { href: localePath(lang, "/account"), label: t.nav.account },
    { href: localePath(lang, "/setup"), label: t.nav.snanSettings },
    { href: localePath(lang, "/begin"), label: t.nav.buy },
    { href: localePath(lang, "/sign-out"), label: t.nav.signOut },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* masthead row */}
        <div className="flex h-14 items-center justify-between gap-3 sm:gap-4">
          <Link href={localePath(lang, "/")} className="shrink-0">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* The almanac's edition line. Vikram Samvat runs ~57 years ahead
                of CE; each locale sets it in its own numerals. */}
            <span className="label hidden text-ink2 lg:inline">{t.edition}</span>

            <LangSwitch lang={lang} currentPath={currentPath} label={t.langLabel} />

            {/* On a phone the theme switch lives in the menu; the bar keeps
                the language, the action and the menu button. */}
            <div className="hidden sm:block">
              <ThemeToggle label={t.themeLabel} />
            </div>

            <ProfileMenu label={t.nav.profile} rows={profileRows} />

            <MobileCta
              begin={ctaTo ?? ctaHref(lang)}
              account={localePath(lang, "/account")}
              beginLabel={t.nav.cta}
              accountLabel={t.nav.accountShort}
              afterHero={ctaAfterHero}
            />

            {/* The menu, phones and tablets. A <details> so it needs no
                script and closes itself when the page changes. The panel is
                a ruled register of the same section links the wide masthead
                shows in its row, with the one action underneath. */}
            {navLinks.length > 0 && (
              <details className="group lg:hidden">
                <summary className="impress flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center border border-rulestrong px-3 text-ink hover:bg-ink hover:text-paper active:bg-ink active:text-paper group-open:bg-ink group-open:text-paper [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="flex flex-col gap-[5px] group-open:hidden">
                    <span className="block h-[2px] w-5 bg-current" />
                    <span className="block h-[2px] w-5 bg-current" />
                    <span className="block h-[2px] w-5 bg-current" />
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="hidden h-5 w-5 group-open:block">
                    <path d="M3 3 L17 17 M17 3 L3 17" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="sr-only">{t.nav.menu}</span>
                </summary>
                {/* Positioned against the sticky header, so it spans the
                    page and hangs under the masthead rule. */}
                <div className="settle-panel absolute inset-x-0 top-full z-50 max-h-[80svh] overflow-y-auto border-b-2 border-rulestrong bg-paper">
                  <ul className="mx-auto max-w-6xl px-5 sm:px-8">
                    {navLinks.map((l) => (
                      <li key={l.href} className="border-b border-rule">
                        <a
                          href={l.href}
                          className="display impress flex min-h-[56px] items-center text-[1.25rem] text-ink active:text-spot"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                    <ProfileRows rows={profileRows} />
                    <li className="flex min-h-[56px] items-center gap-3 border-b border-rule text-[1rem] text-ink2 sm:hidden">
                      <ThemeToggle label={t.themeLabel} />
                      <span>{t.themeLabel}</span>
                    </li>
                  </ul>
                  <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
                    <a
                      href={ctaTo ?? ctaHref(lang)}
                      className="label impress flex min-h-[48px] items-center justify-center bg-spot text-paper hover:bg-ink active:bg-ink"
                    >
                      {t.nav.cta}
                    </a>
                    <p className="label mt-4 text-ink2">{t.edition}</p>
                  </div>
                </div>
              </details>
            )}

            <a
              href={ctaTo ?? ctaHref(lang)}
              data-until-scrolled={ctaAfterHero ? "" : undefined}
              className="label impress hidden min-h-[44px] items-center bg-spot px-4 text-paper hover:bg-ink active:bg-ink sm:inline-flex"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>

      {/* heavy-over-hairline, as an almanac sets its masthead */}
      <div className="rule-masthead" />

      {/* Section row. A locale that serves none of these sections gets no rule
          and no empty <nav> at all, rather than an eight-pixel grey line under
          the masthead. */}
      {navLinks.length > 0 && (
        <nav className="hidden border-b border-rulestrong bg-paper lg:block">
          <ul className="mx-auto flex max-w-6xl divide-x divide-rule px-5 sm:px-8">
            {navLinks.map((l) => (
              <li key={l.href} className="first:pl-0">
                <a
                  href={l.href}
                  className="label impress block px-5 py-2.5 text-ink2 hover:bg-ink hover:text-paper active:bg-ink active:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
