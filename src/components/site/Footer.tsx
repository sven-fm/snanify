import { content } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

export function Footer({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink2">{t.footer.tagline}</p>
          </div>

          {t.footer.cols.map((c) => (
            <div key={c.h}>
              <h3 className="inscription text-[0.62rem] text-ink">{c.h}</h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink2 transition-colors hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line/60 pt-7 text-xs text-ink2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
