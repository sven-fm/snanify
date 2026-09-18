import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import type { Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { Section } from "@/components/ui";
import { ProvisionalBadge } from "@/components/pages/MuhuratIndex";
import { MUHURAT, ghatLabel, occasionBySlug } from "@/content/muhurat";
import { muhuratIndexContent } from "@/content/muhurat-index";
import { muhuratContent } from "@/content/muhurat";
import {
  GHAT_SCHEMES,
  HUB_CITY_SLUGS,
  MASA_PAIRS,
  SHRADDHA_LADDER,
  SHRADDHA_OCCASION_SLUGS,
  panchangContent,
} from "@/content/panchang";
import { cityBySlug } from "@/content/cities";
import { RIVERS } from "@/content/rivers";

/* ---------------------------------------------------------------------------
   /panchang/shraddha: the guide. The sixteen days of Pitru Paksha as a ladder
   of tithis, why the date moves, amanta and purnimanta, why two households
   differ, how to find a tithi from a date, and where the timings come from.
   Around it, the ways out: the tithi this morning in the hub cities, the
   occasions a shraddha family keeps, and the six waters.
   --------------------------------------------------------------------------- */

const DEVA = "०१२३४५६७८९";

function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

function LinkRow({ href, lang, title, sub }: { href: string; lang: Lang; title: string; sub?: string }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={localePath(lang, href)}
        className="impress flex min-h-[48px] items-baseline justify-between gap-3 py-3 text-ink active:text-spot"
      >
        <span className="display text-[1.1rem]">{title}</span>
        {sub && <span className="text-right text-sm text-ink2">{sub}</span>}
      </Link>
    </li>
  );
}

export function Shraddha({ lang }: { lang: Lang }) {
  const t = panchangContent[lang];
  const g = t.shraddha;
  /* Shared keys from content/muhurat-index, detail-only keys from muhurat.ts. */
  const m = { ...muhuratIndexContent[lang], ...muhuratContent[lang] };
  const hubs = HUB_CITY_SLUGS.map(cityBySlug).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const occasions = SHRADDHA_OCCASION_SLUGS.map(occasionBySlug).filter((o): o is NonNullable<typeof o> => Boolean(o));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/panchang" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24">
            <p className="label text-ink2">{g.kicker}</p>
            <h1
              className="ink-in display mt-4 max-w-3xl text-[2.6rem] leading-[1] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {g.hero.title}
            </h1>

            <div className="rule-double mt-8 max-w-3xl" />
            <WaterBand seed="shraddha" className="mt-5 h-14 w-full max-w-3xl sm:h-16" />

            <p
              className="ink-in mt-6 max-w-3xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {g.hero.lede}
            </p>
          </div>
        </section>

        {/* ---------------- Pitru Paksha, as a ladder of tithis ---------------- */}
        <Section id="pitru-paksha">
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.pitru.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{t.pitru.lede}</p>
            </div>

            <div className="boxed mt-10 bg-paper p-6 sm:p-7 [&>*]:max-w-3xl">
              <h3 className="display text-xl">{t.pitru.datesHeading}</h3>
              <p className="mt-3 text-sm leading-[1.75] text-ink2">{t.pitru.dates}</p>
              <div className="mt-6">
                <ProvisionalBadge lang={lang} short />
              </div>
            </div>

            <div className="mt-12 overflow-x-auto" tabIndex={0}>
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">{t.pitru.cols.n}</th>
                    <th className="label py-3 pr-4 text-ink2">{t.pitru.cols.tithi}</th>
                    <th className="label py-3 text-ink2">{t.pitru.cols.kept}</th>
                  </tr>
                </thead>
                <tbody>
                  {SHRADDHA_LADDER.map((d) => (
                    <tr key={d.n} className="border-b border-rule align-top">
                      <td className="display py-5 pr-4 text-xl text-spot">
                        {numeral(d.n, lang)}
                      </td>
                      <th scope="row" className="py-5 pr-4 text-left font-normal">
                        <span className="display block text-xl text-ink">{d.tithi[lang]}</span>
                        {d.alsoCalled && (
                          <span className="mt-1.5 block text-xs text-ink2">
                            {d.alsoCalled[lang]}
                          </span>
                        )}
                      </th>
                      <td className="max-w-2xl py-5 text-sm leading-[1.75] text-ink2">
                        {d.kept ? d.kept[lang] : t.pitru.defaultKept}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid gap-10 border-t-2 border-rulestrong pt-10 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="display text-xl">{t.pitru.conventionHeading}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.pitru.convention}</p>
              </div>
              <div>
                <h3 className="display text-xl">{t.pitru.unknownHeading}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.pitru.unknown}</p>
              </div>
            </div>
        </Section>


        {/* ---------------- where the timings come from ----------------
            The same words the calendar carries, not a softened restatement,
            placed after the calendar rather than before it: a reader wants
            the date first and the method second. */}
        <Section id="how">
            <div className="boxed bg-paper p-6 sm:p-8 [&>*]:max-w-3xl">
              <h2 className="display text-2xl">{t.provenance.heading}</h2>
              <p className="mt-4 text-sm leading-[1.75] text-ink2">
                {m.provenance.line}
              </p>
              <p className="mt-4 text-sm leading-[1.75] text-ink2">
                {t.provenance.extra}
              </p>

              <dl className="mt-7 border-t-2 border-rulestrong sm:grid sm:grid-cols-3">
                <div className="border-b border-rule py-3 sm:border-r sm:border-b-0 sm:pr-5">
                  <dt className="label text-ink2">{m.provenance.sourceLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">{MUHURAT.provider.displayName[lang]}</dd>
                </div>
                <div className="border-b border-rule py-3 sm:border-r sm:border-b-0 sm:px-5">
                  <dt className="label text-ink2">{m.provenance.ayanamsaLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">
                    {MUHURAT.provider.ayanamsa ?? m.provenance.notSet}
                  </dd>
                </div>
                <div className="py-3 sm:pl-5">
                  <dt className="label text-ink2">{m.provenance.coordinatesLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">{m.provenance.coordinatesPending}</dd>
                </div>
              </dl>

              <div className="mt-7">
                <ProvisionalBadge lang={lang} />
              </div>
            </div>
        </Section>

        {/* ---------------- why the date moves ---------------- */}
        <Section tinted>
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.drift.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{t.drift.lede}</p>
            </div>

            <ul className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.drift.points.map((p) => (
                <li key={p.t} className="bg-paper p-7">
                  <h3 className="display text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{p.d}</p>
                </li>
              ))}
            </ul>
        </Section>

        {/* ---------------- amanta and purnimanta ----------------
            The reason this page exists. Two panels, one worked table, and the
            six ghats labelled with the reckoning that names their month. */}
        <Section id="reckoning">
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.reckoning.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{t.reckoning.lede}</p>
            </div>

            <div className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              {(
                [
                  ["amanta", t.reckoning.amanta],
                  ["purnimanta", t.reckoning.purnimanta],
                ] as const
              ).map(([id, panel]) => (
                <div key={id} className="tint p-7">
                  <h3 className="display text-3xl text-ink">{panel.name}</h3>
                  <div className="rule-thin mt-4" />
                  <p className="mt-4 text-sm leading-[1.75] text-ink">{panel.cut}</p>
                  <p className="mt-4 text-sm leading-[1.75] text-ink2">{panel.where}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-10 border-t-2 border-rulestrong pt-10 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="display text-xl">{t.reckoning.agreeHeading}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.reckoning.agree}</p>
              </div>
              <div>
                <h3 className="display text-xl">{t.reckoning.differHeading}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.reckoning.differ}</p>
              </div>
            </div>

            {/* the worked pairs */}
            <h3 className="display mt-16 text-2xl">{t.reckoning.pairsHeading}</h3>
            <div className="mt-6 overflow-x-auto" tabIndex={0}>
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">{t.reckoning.pairsCols.occasion}</th>
                    <th className="label py-3 pr-4 text-ink2">
                      {t.reckoning.pairsCols.purnimanta}
                    </th>
                    <th className="label py-3 pr-4 text-ink2">{t.reckoning.pairsCols.amanta}</th>
                  </tr>
                </thead>
                <tbody>
                  {MASA_PAIRS.map((p) => (
                    <tr key={p.id} className="border-b border-rule align-top">
                      <th scope="row" className="py-5 pr-4 text-left font-normal">
                        <span className="display block text-xl text-ink">{p.occasion[lang]}</span>
                        <span className="mt-2 block max-w-md text-xs leading-[1.7] text-ink2">
                          {p.note[lang]}
                        </span>
                      </th>
                      <td className="py-5 pr-4 text-sm text-ink">{p.purnimanta[lang]}</td>
                      <td className="py-5 pr-4 text-sm text-ink">{p.amanta[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* which reckoning names the month at each ghat */}
            <h3 className="display mt-16 text-2xl">{t.reckoning.ghatsHeading}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-[1.75] text-ink2">
              {t.reckoning.ghatsLede}
            </p>
            <ul className="mt-6 border-t-2 border-rulestrong">
              {GHAT_SCHEMES.map((g) => (
                <li
                  key={g.id}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_12rem] sm:items-baseline"
                >
                  <span className="text-sm text-ink">{ghatLabel(g, lang)}</span>
                  <span className="text-sm text-ink2 sm:text-right">
                    {t.reckoning.schemes[g.masaScheme]}
                  </span>
                </li>
              ))}
            </ul>
        </Section>

        {/* ---------------- four reasons households differ ---------------- */}
        <Section tinted>
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.divergence.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{t.divergence.lede}</p>
            </div>

            <ul className="mt-12 border-t-2 border-rulestrong">
              {t.divergence.items.map((item) => (
                <li
                  key={item.t}
                  className="grid gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[16rem_1fr]"
                >
                  <h3 className="display text-xl text-ink">{item.t}</h3>
                  <p className="max-w-3xl text-sm leading-[1.75] text-ink2">{item.d}</p>
                </li>
              ))}
            </ul>
        </Section>

        {/* ---------------- working out a tithi from a date ---------------- */}
        <Section>
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.finding.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{t.finding.lede}</p>
            </div>

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              {t.finding.steps.map((s) => (
                <li key={s.n} className="bg-paper p-7">
                  <span className="display block text-2xl text-spot">{s.n}</span>
                  <h3 className="display mt-3 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-3xl text-sm leading-[1.75] text-ink2">{t.finding.closing}</p>
        </Section>


        {/* ---------------- this morning, in the hub cities ---------------- */}
        <Section id="cities" tinted>
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{g.cityTitle}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{g.cityLede}</p>
            </div>
            <ul className="mt-10 border-t-2 border-rulestrong sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
              {hubs.map((c) => (
                <LinkRow key={c.slug} href={`/panchang/${c.slug}`} lang={lang} title={c.name[lang]} sub={c.country[lang]} />
              ))}
            </ul>
            <Link
              href={localePath(lang, "/panchang#cities")}
              className="impress mt-8 inline-flex min-h-[44px] items-center text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot"
            >
              {g.cityAll}
            </Link>
        </Section>

        {/* ---------------- the occasions a shraddha family keeps ---------------- */}
        <Section id="occasions">
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{g.occasionsTitle}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{g.occasionsLede}</p>
            </div>
            <ul className="mt-10 border-t-2 border-rulestrong">
              {occasions.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={localePath(lang, `/muhurat/${o.slug}`)}
                    className="group grid gap-x-8 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[16rem_1fr]"
                  >
                    <span className="display text-xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                      {o.name[lang]}
                    </span>
                    <span className="text-sm leading-[1.7] text-ink2">{o.line[lang]}</span>
                  </Link>
                </li>
              ))}
            </ul>
        </Section>

        {/* ---------------- the waters kept for the ancestors ---------------- */}
        <Section id="waters" tinted>
            <div className="max-w-3xl">
              <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{g.watersTitle}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink2">{g.watersLede}</p>
            </div>
            <ul className="mt-10 border-t-2 border-rulestrong sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
              {RIVERS.map((r) => (
                <LinkRow key={r.slug} href={`/rivers/${r.slug}`} lang={lang} title={r.river[lang]} sub={`${r.city[lang]}, ${r.state[lang]}`} />
              ))}
            </ul>
        </Section>

        {/* ---------------- onward ---------------- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <Mark className="mx-auto h-12 w-12 text-ink" />
              <div className="rule-double mt-8" />
              <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3rem]">{g.close.title}</h2>
            </div>

            <ul className="mt-12 border-t-2 border-rulestrong">
              {g.close.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(lang, l.href)}
                    className="group grid gap-x-8 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[14rem_1fr]"
                  >
                    <span className="display text-xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                      {l.label}
                    </span>
                    <span className="text-sm leading-[1.7] text-ink2">{l.note}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-xs leading-[1.75] text-ink2">{g.close.note}</p>

            <p className="mx-auto mt-14 max-w-2xl border-t border-rule pt-8 text-center text-xs leading-[1.75] text-ink2">
              {MUHURAT.provider.note[lang]}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
