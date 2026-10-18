import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { ctaHref, primaryNav } from "@/lib/nav";
import { withSamvat } from "@/lib/occasions";
import { Logo } from "@/components/Logo";
import { RiverStrip } from "@/components/kit";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangSwitch } from "@/components/site/LangSwitch";
import { MobileCta, ProfileMenu, ProfileRows } from "@/components/site/HeaderCta";
import { MASTHEAD_PRESS, buttonClass } from "@/components/ui";

export type NavLink = { href: string; label: string };

/**
 * A masthead rather than an app bar: wordmark and edition line, with the
 * sections set in a row beneath on wide screens. No rules: once the page
 * scrolls, a fold appears under it and it reads as a sheet laid over the page.
 *
 * It sits on the river strip (spec 5.6), the same on every page: teal waves
 * behind the bar, fading downward into paper. The logo and the controls stand
 * on their own paper ground so no ripple reads through the type. The strip
 * runs its full 74px past the bar at the top of the page and is trimmed to the
 * bar once the page scrolls (`[data-strip]` in globals.css).
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
  hideCta = false,
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
  /**
   * On a screen that carries its own press (/begin, sign-in, /setup, /today)
   * the masthead's Begin stands down: one sindoor block per screen.
   */
  hideCta?: boolean;
}) {
  const t = content[lang];
  /* The almanac's edition line, computed so it turns over at Chaitra by itself. */
  const edition = withSamvat(t.edition, lang);
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
    <header className="sticky top-0 z-50 bg-paper" data-masthead>
      {/* Behind the bar's content and above its paper: the header is its
          own stacking context, so -z-10 paints over the header's ground and
          under everything in flow, and the menu panel keeps positioning
          against the header itself. */}
      <div data-strip className="absolute inset-x-0 top-0 -z-10 h-[74px] overflow-hidden">
        <RiverStrip />
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* masthead row */}
        <div className="flex h-14 items-center justify-between gap-3 sm:gap-4">
          <Link href={localePath(lang, "/")} className="-ml-1.5 shrink-0 bg-paper px-1.5 py-1">
            <Logo />
          </Link>

          <div className="-mr-1.5 flex items-center gap-2 bg-paper px-1.5 py-1 sm:gap-4">
            {/* The almanac's edition line. Vikram Samvat runs ~57 years ahead
                of CE; each locale sets it in its own numerals. */}
            <span className="label hidden text-ink2 lg:inline">{edition}</span>

            <LangSwitch lang={lang} currentPath={currentPath} label={t.langLabel} />

            {/* On a phone the theme switch lives in the menu; the bar keeps
                the language, the action and the menu button. */}
            <div className="hidden sm:block">
              <ThemeToggle label={t.themeLabel} />
            </div>

            <ProfileMenu label={t.nav.profile} rows={profileRows} />

            <MobileCta
              begin={ctaTo ?? ctaHref(lang)}
              beginLabel={t.nav.cta}
              accountLabel={t.nav.account}
              rows={profileRows}
              afterHero={ctaAfterHero}
              hideBegin={hideCta}
            />

            {/* The menu, phones and tablets. A <details> so it needs no
                script and closes itself when the page changes. The panel is
                a ruled register of the same section links the wide masthead
                shows in its row, with the one action underneath. */}
            {navLinks.length > 0 && (
              <details className="group lg:hidden">
                <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center border border-rulestrong px-3 text-ink hover:bg-ink hover:text-paper active:bg-ink active:text-paper group-open:bg-ink group-open:text-paper [&::-webkit-details-marker]:hidden">
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
                <div className="settle-panel absolute inset-x-0 top-full z-50 max-h-[80svh] overflow-y-auto border-b border-rule bg-paper">
                  <ul className="mx-auto max-w-6xl px-5 sm:px-8">
                    {navLinks.map((l) => (
                      <li key={l.href} className="border-b border-rule">
                        <a
                          href={l.href}
                          className="display flex min-h-[56px] items-center text-[1.25rem] text-ink active:text-sindoor"
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
                    {!hideCta && (
                      <a href={ctaTo ?? ctaHref(lang)} className={buttonClass("solid", "mb-4 min-h-[48px] w-full justify-center")}>
                        {t.nav.cta}
                      </a>
                    )}
                    <p className="label text-ink2">{edition}</p>
                  </div>
                </div>
              </details>
            )}

            {!hideCta && (
              <a
                href={ctaTo ?? ctaHref(lang)}
                data-until-scrolled={ctaAfterHero ? "" : undefined}
                className={buttonClass("solid", MASTHEAD_PRESS + " hidden sm:inline-flex")}
              >
                {t.nav.cta}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Section row, wide screens. Set in space, with no rules: the fold under
          the masthead (globals.css, Paper) is its only edge. */}
      {navLinks.length > 0 && (
        <nav className="hidden bg-paper lg:block">
          <ul className="mx-auto flex max-w-6xl px-5 sm:px-8">
            {navLinks.map((l) => (
              <li key={l.href} className="first:pl-0">
                <a
                  href={l.href}
                  className="label block px-5 py-2.5 text-ink2 hover:bg-ink hover:text-paper active:bg-ink active:text-paper"
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
