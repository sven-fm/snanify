import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, otherLangPath, type Lang } from "@/lib/i18n";
import { ctaHref, primaryNav } from "@/lib/nav";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export type NavLink = { href: string; label: string };

/* The almanac's edition line. Vikram Samvat runs ~57 years ahead of CE. */
const EDITION = { en: "Samvat 2083 · 2026", hi: "सं. २०८३ · २०२६" } as const;

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
}: {
  lang: Lang;
  links?: NavLink[];
  currentPath?: string;
  ctaTo?: string;
}) {
  const t = content[lang];
  const navLinks = links ?? primaryNav(lang);
  const cta = ctaTo ?? ctaHref(lang);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* masthead row */}
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href={localePath(lang, "/")} aria-label="Snanify">
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            <span className="label hidden text-ink2 lg:inline">{EDITION[lang]}</span>

            <Link
              href={otherLangPath(lang, currentPath)}
              hrefLang={lang === "en" ? "hi" : "en"}
              className="label border border-rulestrong px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {t.switchLabel}
            </Link>

            <ThemeToggle label={t.themeLabel} />

            <a
              href={cta}
              className="label hidden bg-spot px-4 py-2.5 text-paper transition-colors hover:bg-ink sm:inline-block"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>

      {/* heavy-over-hairline, as an almanac sets its masthead */}
      <div className="rule-masthead" />

      {/* section row */}
      <nav className="hidden border-b border-rulestrong bg-paper lg:block">
        <ul className="mx-auto flex max-w-6xl divide-x divide-rule px-5 sm:px-8">
          {navLinks.map((l) => (
            <li key={l.href} className="first:pl-0">
              <a
                href={l.href}
                className="label block px-5 py-2.5 text-ink2 transition-colors hover:bg-ink hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
