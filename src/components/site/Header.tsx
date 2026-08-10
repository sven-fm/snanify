import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, otherLangPath, type Lang } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CTA } from "@/components/ui";

export type NavLink = { href: string; label: string };

/**
 * `currentPath` is the locale-independent route ("/" or "/rituals"), so the
 * language switch lands on the same page rather than dumping you at home.
 */
export function Header({
  lang,
  links,
  currentPath = "/",
}: {
  lang: Lang;
  links: NavLink[];
  currentPath?: string;
}) {
  const t = content[lang];

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={localePath(lang, "/")} aria-label="Snanify">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 text-sm text-ink2 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={otherLangPath(lang, currentPath)}
            hrefLang={lang === "en" ? "hi" : "en"}
            className="rounded-full border border-line/70 px-3 py-1.5 text-xs text-ink2 transition-colors hover:border-gold hover:text-gold"
          >
            {t.switchLabel}
          </Link>
          <ThemeToggle label={t.themeLabel} />
          <a href="#sankalp" className="hidden sm:block">
            <CTA className="!px-5 !py-2">{t.nav.cta}</CTA>
          </a>
        </div>
      </nav>
    </header>
  );
}
