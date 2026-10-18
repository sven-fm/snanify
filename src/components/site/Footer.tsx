import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/locales";
import { navItem, navLabel, type NavKey } from "@/lib/nav";
import { Mark, Wordmark } from "@/components/Logo";
import { RiverHorizon } from "@/components/kit";

/**
 * The column headings and the inert legal labels come from `t.footer.cols`,
 * which every locale carries, rather than from a second en/hi table that would
 * have to be kept in step with it. The indices are the three columns as they
 * are written in src/content/landing/en.ts: service, company, legal.
 */
/* In the order `t.footer.cols[LEGAL].links` sets them: privacy, terms, refunds. */
const LEGAL_ROUTES = ["/privacy", "/terms", "/terms#refunds"];

const PRACTICE = 0;
const REFERENCE = 1;
const LEGAL = 2;

const COLUMNS: { at: number; keys: NavKey[] }[] = [
  { at: PRACTICE, keys: ["begin", "snan", "about"] },
  { at: REFERENCE, keys: ["panchang", "live", "rivers", "muhurat", "faq"] },
];

/**
 * The imprint: everything the almanac prints at the back. Every page closes on
 * the full river (spec 5.6), the sun sitting on its horizon, and the imprint
 * opens under the water.
 */
export function Footer({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <footer className="tint">
      <div className="bg-paper">
        <RiverHorizon height={120} />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Mark className="h-9 w-9 shrink-0 text-ink" />
              <Wordmark className="text-[26px] text-ink" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink2">{t.footer.tagline}</p>
          </div>

          {COLUMNS.map((col) => {
            return (
              <div key={col.at}>
                <h2 className="label text-ink">{t.footer.cols[col.at].h}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.keys.map((key) => {
                    const item = navItem(lang, key);
                    return (
                      <li key={key}>
                        <a
                          href={item.href}
                          className="text-sm text-ink2 underline decoration-rule decoration-1 hover:text-sindoor hover:decoration-sindoor active:text-sindoor"
                        >
                          {navLabel(lang, key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div>
            <h2 className="label text-ink">{t.footer.cols[LEGAL].h}</h2>
            {/* Privacy and terms are real pages now. Refunds is answered
                inside the terms rather than on a page of its own, so it points
                at that section instead of at a route that does not exist. */}
            <ul className="mt-4 space-y-2.5">
              {t.footer.cols[LEGAL].links.map((label, i) => (
                <li key={label}>
                  <Link
                    href={localePath(lang, LEGAL_ROUTES[i] ?? "/terms")}
                    className="text-sm text-ink2 underline decoration-rule decoration-1 underline-offset-4 hover:text-sindoor active:text-sindoor"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-xs text-ink2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
