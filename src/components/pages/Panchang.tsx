import Link from "next/link";

import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { CTA, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { ProvisionalBadge } from "@/components/pages/MuhuratIndex";
import {
  DATED_OCCASIONS,
  GHAT_ZONE,
  MUHURAT,
  RECURRING_OCCASIONS,
  WINDOW_BY_ID,
  formatDualClock,
  ghatLabel,
  muhuratContent,
  type IanaZone,
  type Instant,
  type Occasion,
} from "@/content/muhurat";
import {
  GHAT_SCHEMES,
  MASA_PAIRS,
  PANCHANG_ZONES,
  SHRADDHA_LADDER,
  WINDOW_SPANS,
  formatOffsetFromIst,
  offsetFromIstMinutes,
  panchangContent,
  tithiLine,
  type WindowSpan,
} from "@/content/panchang";

/* --- numerals -------------------------------------------------------------
   Same rule as the rest of the almanac: a printed panchang sets its figures in
   the script it is printed in.                                             */

const DEVA = "०१२३४५६७८९";

function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/* --- one window, read on one clock ----------------------------------------
   Both readings come out of `formatDualClock`, which refuses to convert
   silently: it hands back the ghat's clock, the reader's clock and a sentence
   naming the date shift, and this cell prints all three rather than picking
   one.                                                                     */

function windowReading(span: WindowSpan, zone: IanaZone, label: string, lang: Lang) {
  const open = formatDualClock({
    instant: span.start,
    viewerZone: zone,
    viewerLabel: label,
    ghatLabel: "IST",
    lang,
  });
  const close = formatDualClock({
    instant: span.end,
    viewerZone: zone,
    viewerLabel: label,
    ghatLabel: "IST",
    lang,
  });

  return {
    from: open.viewer.time,
    to: close.viewer.time,
    weekday: open.viewer.weekday,
    date: open.viewer.date,
    endDate: close.viewer.date === open.viewer.date ? null : close.viewer.date,
    shifted: open.dateShift !== 0,
    shiftNote: open.shiftNote,
  };
}

function WindowCell({
  span,
  zone,
  label,
  lang,
  ghat = false,
}: {
  span: WindowSpan;
  zone: IanaZone;
  label: string;
  lang: Lang;
  ghat?: boolean;
}) {
  const r = windowReading(span, zone, label, lang);

  return (
    <td className={`border-b border-rule px-3 py-4 align-top ${ghat ? "tint" : ""}`}>
      <p className={`text-sm ${r.shifted ? "text-spot" : "text-ink"}`}>
        {r.from} <span className="text-ink2">{lang === "hi" ? "से" : "to"}</span> {r.to}
      </p>
      <p className={`mt-1 text-xs ${r.shifted ? "text-spot" : "text-ink2"}`}>
        {r.weekday} {r.date}
        {r.endDate ? ` / ${r.endDate}` : ""}
      </p>
    </td>
  );
}

/* --- an occasion, as one line of the register ----------------------------- */

function OccasionRow({ occasion, lang }: { occasion: Occasion; lang: Lang }) {
  const m = muhuratContent[lang];

  return (
    <tr className="border-b border-rule align-top transition-colors hover:bg-paper3">
      <th scope="row" className="py-5 pr-4 text-left font-normal">
        <Link
          href={localePath(lang, `/muhurat/${occasion.slug}`)}
          className="display text-xl text-ink underline decoration-rule decoration-1 hover:decoration-spot"
        >
          {occasion.name[lang]}
        </Link>
        <span className="mt-1.5 block text-xs leading-[1.7] text-ink2">
          {occasion.line[lang]}
        </span>
      </th>
      <td className="py-5 pr-4 text-sm text-ink2">{tithiLine(occasion, lang)}</td>
      <td className="py-5 pr-4 text-sm text-ink2">
        {m.resolutions[occasion.rule.dayResolution]}
      </td>
      <td className="py-5 pr-4 text-sm text-ink2">
        {occasion.windows.map((w) => WINDOW_BY_ID[w]?.name[lang]).filter(Boolean).join(", ")}
      </td>
      <td className="label py-5 text-right text-spot">{occasion.occurrence.label[lang]}</td>
    </tr>
  );
}

function OccasionTable({
  occasions,
  lang,
}: {
  occasions: readonly Occasion[];
  lang: Lang;
}) {
  const t = panchangContent[lang].occasions;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[52rem] border-collapse text-left">
        <thead>
          <tr className="border-y-2 border-rulestrong">
            <th className="label py-3 pr-4 text-ink2">{t.cols.occasion}</th>
            <th className="label py-3 pr-4 text-ink2">{t.cols.tithi}</th>
            <th className="label py-3 pr-4 text-ink2">{t.cols.reckoning}</th>
            <th className="label py-3 pr-4 text-ink2">{t.cols.windows}</th>
            <th className="label py-3 text-right text-ink2">{t.cols.when}</th>
          </tr>
        </thead>
        <tbody>
          {occasions.map((o) => (
            <OccasionRow key={o.slug} occasion={o} lang={lang} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- page ----------------------------------------------------------------- */

export function Panchang({ lang }: { lang: Lang }) {
  const t = panchangContent[lang];
  const m = muhuratContent[lang];
  const hi = lang === "hi";

  /* The offsets are read on the reference instant, because four of the seven
     places below observe daylight saving and India does not. A standing
     "IST minus nine and a half" would be wrong for five months of the year. */
  const reference: Instant = WINDOW_SPANS[0].start;

  const zones = PANCHANG_ZONES.map((z) => ({
    ...z,
    offset: formatOffsetFromIst(offsetFromIstMinutes(reference, z.zone), lang),
  }));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/panchang" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24">
            <div className="ink-in">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </div>

            <h1
              className="ink-in display mt-6 max-w-3xl text-[2.6rem] leading-[1] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.title}
            </h1>

            <div className="rule-double mt-8 max-w-xl" />

            <p
              className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.lede}
            </p>

            <p
              className="ink-in mt-5 max-w-xl border-l-2 border-spot pl-5 text-sm leading-[1.75] text-ink2"
              style={{ animationDelay: "200ms" }}
            >
              {t.hero.free}
            </p>

            {/* The provenance block is the same words the calendar carries, not
                a softened restatement of them. */}
            <div className="ink-in boxed mt-12 max-w-3xl bg-paper p-6 sm:p-8">
              <h2 className="label text-spot">{t.provenance.heading}</h2>
              <div className="rule-thin mt-4" />
              <p className="mt-5 max-w-2xl text-sm leading-[1.75] text-ink2">
                {m.provenance.line}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-ink2">
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
          </div>
        </section>

        {/* ---------------- why the date moves ---------------- */}
        <Section>
          <Reveal>
            <SectionHeader eyebrow={t.drift.eyebrow} title={t.drift.title} lede={t.drift.lede} />

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.drift.points.map((p) => (
                <li key={p.n} className="bg-paper p-7">
                  <span className="display block text-4xl text-spot">{p.n}</span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{p.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* ---------------- amanta and purnimanta ----------------
            The reason this page exists. Two panels, one worked table, and the
            six ghats labelled with the reckoning that names their month. */}
        <Section id="reckoning" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.reckoning.eyebrow}
              title={t.reckoning.title}
              lede={t.reckoning.lede}
            />

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
                <h3 className="label text-ink">{t.reckoning.agreeHeading}</h3>
                <div className="rule-thin mt-3" />
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.reckoning.agree}</p>
              </div>
              <div>
                <h3 className="label text-spot">{t.reckoning.differHeading}</h3>
                <div className="rule-thin mt-3" />
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.reckoning.differ}</p>
              </div>
            </div>

            {/* the worked pairs */}
            <h3 className="display mt-16 text-2xl">{t.reckoning.pairsHeading}</h3>
            <div className="mt-6 overflow-x-auto">
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
            <p className="mt-3 max-w-2xl text-sm leading-[1.75] text-ink2">
              {t.reckoning.ghatsLede}
            </p>
            <ul className="mt-6 border-t-2 border-rulestrong">
              {GHAT_SCHEMES.map((g) => (
                <li
                  key={g.id}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_12rem] sm:items-baseline"
                >
                  <span className="text-sm text-ink">{ghatLabel(g, lang)}</span>
                  <span className="label text-spot sm:text-right">
                    {t.reckoning.schemes[g.masaScheme]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ---------------- four reasons households differ ---------------- */}
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow={t.divergence.eyebrow}
              title={t.divergence.title}
              lede={t.divergence.lede}
            />

            <ul className="mt-12 border-t-2 border-rulestrong">
              {t.divergence.items.map((item) => (
                <li
                  key={item.n}
                  className="grid gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[3rem_16rem_1fr]"
                >
                  <span className="display text-2xl leading-none text-spot">{item.n}</span>
                  <h3 className="display text-xl text-ink">{item.t}</h3>
                  <p className="max-w-2xl text-sm leading-[1.75] text-ink2">{item.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ---------------- Pitru Paksha, as a ladder of tithis ---------------- */}
        <Section id="pitru-paksha" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.pitru.eyebrow} title={t.pitru.title} lede={t.pitru.lede} />

            <div className="boxed mt-10 max-w-3xl bg-paper p-6 sm:p-7">
              <h3 className="label text-spot">{t.pitru.datesHeading}</h3>
              <div className="rule-thin mt-4" />
              <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.pitru.dates}</p>
              <div className="mt-6">
                <ProvisionalBadge lang={lang} short />
              </div>
            </div>

            <div className="mt-12 overflow-x-auto">
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
                          <span className="label mt-2 block text-ink2">
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
                <h3 className="label text-ink">{t.pitru.conventionHeading}</h3>
                <div className="rule-thin mt-3" />
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.pitru.convention}</p>
              </div>
              <div>
                <h3 className="label text-spot">{t.pitru.unknownHeading}</h3>
                <div className="rule-thin mt-3" />
                <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.pitru.unknown}</p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- working out a tithi from a date ---------------- */}
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow={t.finding.eyebrow}
              title={t.finding.title}
              lede={t.finding.lede}
            />

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              {t.finding.steps.map((s) => (
                <li key={s.n} className="bg-paper p-7">
                  <span className="display block text-4xl text-spot">{s.n}</span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-2xl border-l-2 border-spot pl-5 text-sm leading-[1.75] text-ink2">
              {t.finding.closing}
            </p>
          </Reveal>
        </Section>

        {/* ---------------- the occasion register ---------------- */}
        <Section id="occasions" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.occasions.eyebrow}
              title={t.occasions.title}
              lede={t.occasions.lede}
            />

            <h3 className="display mt-12 text-2xl">{t.occasions.datedHeading}</h3>
            <OccasionTable occasions={DATED_OCCASIONS} lang={lang} />

            <h3 className="display mt-16 text-2xl">{t.occasions.recurringHeading}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-[1.75] text-ink2">
              {t.occasions.recurringLede}
            </p>
            <OccasionTable occasions={RECURRING_OCCASIONS} lang={lang} />

            <div className="mt-8">
              <ProvisionalBadge lang={lang} />
            </div>
          </Reveal>
        </Section>

        {/* ---------------- one hour, eight clocks ---------------- */}
        <Section id="clocks">
          <Reveal>
            <SectionHeader eyebrow={t.clock.eyebrow} title={t.clock.title} lede={t.clock.lede} />

            {/* the four windows as rules, before any clock is put on them */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">{t.clock.windowCols.window}</th>
                    <th className="label py-3 pr-4 text-ink2">{t.clock.windowCols.length}</th>
                    <th className="label py-3 text-ink2">{t.clock.windowCols.rule}</th>
                  </tr>
                </thead>
                <tbody>
                  {WINDOW_SPANS.map((w) => (
                    <tr key={w.id} className="border-b border-rule align-top">
                      <th scope="row" className="py-4 pr-4 text-left font-normal">
                        <span className="display text-xl text-ink">{w.name[lang]}</span>
                      </th>
                      <td className="py-4 pr-4 text-sm text-ink2">
                        {m.windows.minutes(w.durationMin)}
                      </td>
                      <td className="max-w-xl py-4 text-sm leading-[1.7] text-ink2">
                        {w.formula[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* what the table assumes, stated before the table, not under it */}
            <div className="boxed mt-12 max-w-3xl bg-paper p-6 sm:p-7">
              <h3 className="label text-spot">{t.clock.assumptionHeading}</h3>
              <div className="rule-thin mt-4" />
              <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.clock.assumption}</p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[56rem] border-collapse text-left">
                <caption className="sr-only">{t.clock.title}</caption>
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">{t.clock.place}</th>
                    {WINDOW_SPANS.map((w) => (
                      <th key={w.id} className="label px-3 py-3 text-ink2">
                        {w.name[lang]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* the ghat's own clock, first and tinted: it is the reading,
                      the rest of the table is the translation of it */}
                  <tr className="border-b-2 border-rulestrong align-top">
                    <th scope="row" className="tint py-4 pr-4 text-left font-normal">
                      <span className="display block text-lg text-ink">{t.clock.atTheGhat}</span>
                      <span className="label mt-1.5 block text-ink2">{t.clock.ghatZone}</span>
                    </th>
                    {WINDOW_SPANS.map((w) => (
                      <WindowCell
                        key={w.id}
                        span={w}
                        zone={GHAT_ZONE}
                        label="IST"
                        lang={lang}
                        ghat
                      />
                    ))}
                  </tr>

                  {zones.map((z) => (
                    <tr key={z.zone} className="border-b border-rule align-top">
                      <th scope="row" className="py-4 pr-4 text-left font-normal">
                        <span className="display block text-lg text-ink">{z.city[lang]}</span>
                        <span className="label mt-1.5 block text-ink2">{z.region[lang]}</span>
                        <span className="mt-1.5 block text-xs text-ink2">
                          {t.clock.offsetCol}: {z.offset}
                        </span>
                      </th>
                      {WINDOW_SPANS.map((w) => (
                        <WindowCell
                          key={w.id}
                          span={w}
                          zone={z.zone}
                          label={z.city[lang]}
                          lang={lang}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-8 border-t border-rule pt-6 md:grid-cols-2 md:gap-16">
              <p className="text-xs leading-[1.75] text-ink2">{t.clock.legend}</p>
              <p className="text-xs leading-[1.75] text-ink2">{t.clock.dstNote}</p>
            </div>

            <div className="mt-8">
              <ProvisionalBadge lang={lang} short />
            </div>
          </Reveal>
        </Section>

        {/* ---------------- the quiet door ----------------
            Four ruled lines and a sentence. No offer, no price, no urgency:
            the page is worth building even for the reader who never opens
            any of them. */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <Mark className="mx-auto h-12 w-12 text-ink" />
              <div className="rule-double mt-8" />
              <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3rem]">
                {t.close.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-[1.75] text-ink2">{t.close.lede}</p>
            </div>

            <ul className="mt-12 border-t-2 border-rulestrong">
              {t.close.links.map((l) => (
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

            <p className="mt-10 text-center text-xs leading-[1.75] text-ink2">{t.close.note}</p>

            <div className="mt-10 flex justify-center">
              <Link href={localePath(lang, "/muhurat")}>
                <CTA variant="ghost">{hi ? "मुहूर्त पंचांग" : "The muhurat calendar"}</CTA>
              </Link>
            </div>

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
