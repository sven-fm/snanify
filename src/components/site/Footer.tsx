import { content } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { navItem, type NavKey } from "@/lib/nav";
import { Mark } from "@/components/Logo";

const HEADINGS = {
  service: { en: "Service", hi: "सेवा" },
  company: { en: "Company", hi: "कंपनी" },
  legal: { en: "Legal", hi: "कानूनी" },
} as const;

const COLUMNS: { heading: keyof typeof HEADINGS; keys: NavKey[] }[] = [
  { heading: "service", keys: ["snan", "live", "rivers", "muhurat", "patra"] },
  { heading: "company", keys: ["how", "ethics", "faq", "panchang"] },
];

/* Routes that do not exist yet. Set as plain text rather than links -
   a footer full of href="#" is a worse signal than an honestly inert label. */
const PENDING = {
  en: ["Privacy", "Terms", "Refunds"],
  hi: ["गोपनीयता", "शर्तें", "वापसी"],
} as const;

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

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="label text-spot">{HEADINGS[col.heading][lang]}</h3>
              <div className="rule-thin mt-3" />
              <ul className="mt-4 space-y-2.5">
                {col.keys.map((key) => {
                  const item = navItem(lang, key);
                  return (
                    <li key={key}>
                      <a
                        href={item.href}
                        className="text-sm text-ink2 underline decoration-rule decoration-1 transition-colors hover:text-spot hover:decoration-spot"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="label text-spot">{HEADINGS.legal[lang]}</h3>
            <div className="rule-thin mt-3" />
            <ul className="mt-4 space-y-2.5">
              {PENDING[lang].map((label) => (
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
