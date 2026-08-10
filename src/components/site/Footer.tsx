import { content } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { navItem, type NavKey } from "@/lib/nav";
import { Logo } from "@/components/Logo";

const HEADINGS = {
  service: { en: "Service", hi: "सेवा" },
  company: { en: "Company", hi: "कंपनी" },
  legal: { en: "Legal", hi: "कानूनी" },
} as const;

const COLUMNS: { heading: keyof typeof HEADINGS; keys: NavKey[] }[] = [
  { heading: "service", keys: ["rivers", "rituals", "muhurat", "patra"] },
  { heading: "company", keys: ["how", "ethics", "faq", "refusals"] },
];

/* Routes that do not exist yet. Rendered as plain text rather than as links —
   a footer full of href="#" is a worse signal than an honestly inert label. */
const PENDING = {
  en: ["Privacy", "Terms", "Refunds"],
  hi: ["गोपनीयता", "शर्तें", "वापसी"],
} as const;

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

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="inscription text-[0.62rem] text-ink">{HEADINGS[col.heading][lang]}</h3>
              <ul className="mt-5 space-y-3">
                {col.keys.map((key) => {
                  const item = navItem(lang, key);
                  return (
                    <li key={key}>
                      <a
                        href={item.href}
                        className="text-sm text-ink2 transition-colors hover:text-gold"
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
            <h3 className="inscription text-[0.62rem] text-ink">{HEADINGS.legal[lang]}</h3>
            <ul className="mt-5 space-y-3">
              {PENDING[lang].map((label) => (
                <li key={label} className="text-sm text-ink2/50">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line/60 pt-7 text-xs text-ink2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
