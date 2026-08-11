import { content } from "@/lib/content";
import { servesPath, type Lang } from "@/lib/locales";
import { navItem, navLabel, type NavKey } from "@/lib/nav";
import { Mark } from "@/components/Logo";

/**
 * The column headings and the inert legal labels come from `t.footer.cols`,
 * which every locale carries, rather than from a second en/hi table that would
 * have to be kept in step with it. The indices are the three columns as they
 * are written in src/content/landing/en.ts: service, company, legal.
 */
const SERVICE = 0;
const COMPANY = 1;
const LEGAL = 2;

const COLUMNS: { at: number; keys: NavKey[] }[] = [
  { at: SERVICE, keys: ["snan", "live", "rivers", "muhurat", "patra"] },
  { at: COMPANY, keys: ["how", "ethics", "faq", "panchang"] },
];

/** Where a nav key actually points, so the footer never offers a 404. */
const ROUTE_OF: Record<NavKey, string> = {
  rivers: "/rivers",
  snan: "/snan",
  muhurat: "/muhurat",
  patra: "/patra",
  how: "/how-it-works",
  ethics: "/ethics",
  faq: "/faq",
  live: "/live",
  panchang: "/panchang",
  verify: "/verify",
};

/** The imprint: everything the almanac prints at the back. */
export function Footer({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <footer className="border-t-2 border-rulestrong tint">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-9 w-9 text-ink" />
              <span className="wordmark text-lg text-ink">Snanify</span>
            </div>
            <div className="rule-thin mt-5" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink2">{t.footer.tagline}</p>
          </div>

          {COLUMNS.map((col) => {
            /* A locale is only offered the routes it actually serves. Without
               this a Tamil footer links to /snan, which exists in English and
               Hindi only, and every one of those links is a 404 for the reader
               and a broken internal link for a crawler. */
            const keys = col.keys.filter((k) => servesPath(lang, ROUTE_OF[k]));
            if (keys.length === 0) return null;

            return (
              <div key={col.at}>
                <h3 className="label text-spot">{t.footer.cols[col.at].h}</h3>
                <div className="rule-thin mt-3" />
                <ul className="mt-4 space-y-2.5">
                  {keys.map((key) => {
                    const item = navItem(lang, key);
                    return (
                      <li key={key}>
                        <a
                          href={item.href}
                          className="text-sm text-ink2 underline decoration-rule decoration-1 transition-colors hover:text-spot hover:decoration-spot"
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
            <h3 className="label text-spot">{t.footer.cols[LEGAL].h}</h3>
            <div className="rule-thin mt-3" />
            <ul className="mt-4 space-y-2.5">
              {/* Routes that do not exist yet. Set as plain text rather than
                  links: a footer full of href="#" is a worse signal than an
                  honestly inert label. */}
              {t.footer.cols[LEGAL].links.map((label) => (
                <li key={label} className="text-sm text-ink2/60">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-double mt-12" />

        <div className="flex flex-col gap-2 pt-5 text-xs text-ink2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
