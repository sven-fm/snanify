import Link from "next/link";

import { content } from "@/lib/content";
import { deepLang, pickDeep, type Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { CTA, Section, SectionHeader, Eyebrow } from "@/components/ui";
import {
  GHATS,
  MUHURAT,
  RECURRING_OCCASIONS,
  WINDOWS,
  almanacMonths,
  asInstant,
  asZone,
  formatDualClock,
  ghatLabel,
  monthLabel,
  type MuhuratWindow,
  type Occasion,
} from "@/content/muhurat";
import { muhuratIndexContent } from "@/content/muhurat-index";
import { occasionName, windowName } from "@/content/names";

/* Nav is shared with the occasion pages so the two never drift. */
export function muhuratNavLinks(lang: Lang) {
  const t = content[lang];
  return [
    { href: localePath(lang, "/rivers"), label: t.nav.rivers },
    { href: localePath(lang, "/muhurat"), label: t.nav.muhurat },
    { href: localePath(lang, "/#how"), label: t.nav.how },
    { href: localePath(lang, "/#sankalp"), label: t.nav.pricing },
  ];
}

/* --- numerals -------------------------------------------------------------
   A printed panchang sets its figures in the script it is printed in. Every
   digit that is furniture rather than data goes through here.               */

const DEVA = "०१२३४५६७८९";

function deva(value: string, lang: Lang): string {
  if (lang !== "hi") return value;
  return [...value].map((ch) => (ch >= "0" && ch <= "9" ? DEVA[Number(ch)] : ch)).join("");
}

function numeral(n: number, lang: Lang): string {
  return deva(String(n).padStart(2, "0"), lang);
}

/**
 * The label that has to appear beside every date and every time on the site.
 * It is a component rather than a string so that adding a timing surface
 * without its provenance is a conspicuous omission rather than a silent one.
 *
 * The square is hollow, matching StatusBadge: it only ever fills when a thing
 * is genuinely settled, and nothing on this calendar is settled yet.
 */
export function ProvisionalBadge({ lang, short = false }: { lang: Lang; short?: boolean }) {
  const c = muhuratIndexContent[lang].provenance;
  return (
    <span className="label inline-flex items-center gap-2 border border-spot px-2.5 py-1.5 text-spot">
      <span className="h-1.5 w-1.5 shrink-0 border border-spot" aria-hidden="true" />
      {short ? c.badgeShort : c.badge}
    </span>
  );
}

/* --- the day diagram ------------------------------------------------------
   A day drawn as an arc, with the four windows marked where they fall. The
   geometry is the same arithmetic the window records carry, laid out from an
   assumed 06:00 sunrise and 18:00 sunset; it is a picture of the rule, not of
   any date. Hidden below `sm`, the ruled schedule below carries every fact it
   shows.

   Cut in two colours like the rest of the forme: tint blocks for the bands,
   hairlines for the structure, the spot colour only on the window edges.   */

const T0 = 4; // the diagram spans 04:00 to 20:00
const SPAN = 16;
const x = (hours: number) => 40 + ((hours - T0) / SPAN) * 920;

const BANDS = [
  { id: "brahma", from: 4.4, to: 5.2 },
  { id: "pratah", from: 6, to: 7.6 },
  { id: "abhijit", from: 11.6, to: 12.4 },
  { id: "godhuli", from: 17.6, to: 18.4 },
] as const;

function DayDiagram({ lang }: { lang: Lang }) {
  const c = muhuratIndexContent[lang].windows;
  const byId = Object.fromEntries(WINDOWS.map((w) => [w.id, w])) as Record<string, MuhuratWindow>;

  return (
    <figure className="mt-14 hidden border-t-2 border-rulestrong pt-8 sm:block">
      <svg
        viewBox="0 0 1000 236"
        className="w-full text-ink2"
        role="img"
        aria-label={c.diagramLabel}
      >
        {/* Daylight, laid in as a flat tint. Drawn as light-on-paper rather
            than night-as-a-shadow so the picture reads the same way in both
            editions: the tints step away from the paper in either theme. */}
        <rect x={x(6)} y="24" width={x(18) - x(6)} height="146" fill="var(--paper-2)" />

        {/* the sun's path */}
        <path
          d={`M${x(6)},170 Q${x(12)},-30 ${x(18)},170`}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
        />
        <circle cx={x(12)} cy="70" r="5" fill="var(--spot)" />

        {/* the four windows */}
        {BANDS.map((b) => (
          <g key={b.id}>
            <rect
              x={x(b.from)}
              y="24"
              width={x(b.to) - x(b.from)}
              height="146"
              fill="var(--paper-3)"
            />
            <rect x={x(b.from)} y="24" width="1.5" height="146" fill="var(--spot)" />
            <rect x={x(b.to)} y="24" width="1.5" height="146" fill="var(--spot)" />
            <text
              x={(x(b.from) + x(b.to)) / 2}
              y="192"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
            >
              {byId[b.id] ? windowName(b.id, byId[b.id]!.name, lang) : b.id}
            </text>
          </g>
        ))}

        {/* horizon */}
        <line x1="0" y1="170" x2="1000" y2="170" stroke="var(--rule-strong)" strokeWidth="1" />

        {/* anchors */}
        {(
          [
            [6, c.diagram.sunrise],
            [12, c.diagram.noon],
            [18, c.diagram.sunset],
          ] as const
        ).map(([h, label]) => (
          <g key={label}>
            <line
              x1={x(h)}
              y1="162"
              x2={x(h)}
              y2="178"
              stroke="var(--rule-strong)"
              strokeWidth="1.5"
            />
            <text x={x(h)} y="222" textAnchor="middle" fill="currentColor" fontSize="12">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* --- the calendar register ------------------------------------------------
   Column template shared by the head row and every occasion line, so the
   register stays in column the whole way down the page.                    */

const SPINE_COLS =
  "sm:grid sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1.15fr)_13rem] sm:gap-x-8";

function OccasionRow({ occasion, lang }: { occasion: Occasion; lang: Lang }) {
  const t = muhuratIndexContent[lang];
  const waters = occasion.ghats.length;

  return (
    <li>
      <Link
        href={localePath(lang, `/muhurat/${occasion.slug}`)}
        className={`group block py-6 transition-colors hover:bg-paper3 ${SPINE_COLS}`}
      >
        {/* the occasion */}
        <div>
          {/* h4: the month above it is the h3 of this group. */}
          <h4 className="display text-2xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot sm:text-[1.6rem]">
            {occasionName(occasion, lang)}
          </h4>
          <p className="mt-1.5 text-sm leading-[1.7] text-ink2">{pickDeep(occasion.line, lang)}</p>
          <p className="label mt-3 text-ink2">
            {t.spine.observedAt} {t.spine.waters(waters)} · {t.tiers[occasion.tier]}
          </p>
        </div>

        {/* the reckoning */}
        <p className="mt-3 text-sm leading-[1.7] text-ink2 sm:mt-0">
          {pickDeep(occasion.rule.label, lang)}
        </p>

        {/* the window, and its provenance, inseparably */}
        <div className="mt-3 sm:mt-0 sm:text-right">
          <p className="label text-spot">{pickDeep(occasion.occurrence.label, lang)}</p>
          <span className="mt-3 inline-block">
            <ProvisionalBadge lang={lang} short />
          </span>
        </div>
      </Link>
    </li>
  );
}

/* --- page ----------------------------------------------------------------- */

export function MuhuratIndex({ lang }: { lang: Lang }) {
  const t = muhuratIndexContent[lang];
  const hi = lang === "hi";
  const months = almanacMonths();
  const example = MUHURAT.workedExample;
  const exampleWindow = WINDOWS.find((w) => w.id === example.windowId);
  const exampleInstant = asInstant(example.instantUtc);
  const refusals = GHATS.filter((g) => g.refusal);

  const ghatReading = formatDualClock({
    instant: exampleInstant,
    viewerZone: asZone("Asia/Kolkata"),
    viewerLabel: "IST",
    ghatLabel: "IST",
    lang: deepLang(lang),
  });

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/muhurat" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24">
            <div className="ink-in">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </div>

            <h1
              className="ink-in display mt-6 max-w-3xl text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-7xl"
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

            {/* The provenance line is part of the masthead, not a footnote. */}
            <div className="ink-in boxed mt-12 max-w-3xl bg-paper p-6 sm:p-8">
              <h2 className="label text-spot">{t.provenance.heading}</h2>
              <div className="rule-thin mt-4" />
              <p className="mt-5 max-w-2xl text-sm leading-[1.75] text-ink2">
                {t.provenance.line}
              </p>

              <dl className="mt-7 border-t-2 border-rulestrong sm:grid sm:grid-cols-3">
                <div className="border-b border-rule py-3 sm:border-r sm:border-b-0 sm:pr-5">
                  <dt className="label text-ink2">{t.provenance.sourceLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">
                    {pickDeep(MUHURAT.provider.displayName, lang)}
                  </dd>
                </div>
                <div className="border-b border-rule py-3 sm:border-b-0 sm:border-r sm:px-5">
                  <dt className="label text-ink2">{t.provenance.ayanamsaLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">
                    {MUHURAT.provider.ayanamsa ?? t.provenance.notSet}
                  </dd>
                </div>
                <div className="py-3 sm:pl-5">
                  <dt className="label text-ink2">{t.provenance.coordinatesLabel}</dt>
                  <dd className="mt-2 text-sm text-ink">{t.provenance.coordinatesPending}</dd>
                </div>
              </dl>

              <div className="mt-7">
                <ProvisionalBadge lang={lang} />
              </div>
            </div>

            <p className="label mt-6 text-ink2">{deva(t.hero.asOf, lang)}</p>
          </div>
        </section>

        {/* ---------------- how to read this ---------------- */}
        <Section>
          <Reveal>
            <SectionHeader eyebrow={t.reading.eyebrow} title={t.reading.title} />

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.reading.items.map((item) => (
                <li key={item.n} className="bg-paper p-7">
                  <span className="display block text-4xl text-spot">{item.n}</span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{item.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{item.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* ---------------- the monthly rhythm ---------------- */}
        <Section tinted>
          <Reveal>
            <SectionHeader eyebrow={t.rhythm.eyebrow} title={t.rhythm.title} lede={t.rhythm.lede} />

            <ul className="mt-12 border-t-2 border-rulestrong">
              {RECURRING_OCCASIONS.map((o, i) => (
                <li key={o.slug}>
                  <Link
                    href={localePath(lang, `/muhurat/${o.slug}`)}
                    className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-1.5 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[3.5rem_14rem_1fr_11rem] sm:gap-x-8"
                  >
                    <span className="display text-xl text-spot">{numeral(i + 1, lang)}</span>
                    <h3 className="display text-2xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                      {occasionName(o, lang)}
                    </h3>
                    <span className="col-start-2 text-sm leading-[1.7] text-ink2 sm:col-start-auto">
                      {pickDeep(o.line, lang)}
                    </span>
                    <span className="label col-start-2 text-spot sm:col-start-auto sm:text-right">
                      {pickDeep(o.occurrence.label, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ---------------- the almanac spine ----------------
            Deliberately not a card grid: an almanac reads down a column, month
            by month, and shows the empty months too. Nothing is featured at the
            top, the nearest occasion here is Pitru Paksha, and putting a
            bereavement season in a hero slot is the exact pressure this
            product refuses to apply. */}
        <Section id="spine">
          <Reveal>
            <SectionHeader eyebrow={t.spine.eyebrow} title={t.spine.title} />

            <div className="mt-12">
              {/* column heads, as a printed register sets them */}
              <div className="hidden border-y-2 border-rulestrong sm:grid sm:grid-cols-[8rem_1fr] sm:gap-x-8">
                <p className="label py-3 text-ink2">{hi ? "मास" : "Month"}</p>
                <div className={SPINE_COLS}>
                  <p className="label py-3 text-ink2">{hi ? "पर्व" : "Occasion"}</p>
                  <p className="label py-3 text-ink2">{hi ? "तिथि नियम" : "Tithi reckoning"}</p>
                  <p className="label py-3 text-right text-ink2">{hi ? "काल" : "Window"}</p>
                </div>
              </div>

              <div className="border-t-2 border-rulestrong sm:border-t-0">
                {months.map((m) => {
                  const { name, year } = monthLabel(m.month, lang);
                  return (
                    <div
                      key={m.month}
                      className="grid gap-3 border-b border-rule py-7 sm:grid-cols-[8rem_1fr] sm:gap-x-8 sm:py-0"
                    >
                      <div className="sm:sticky sm:top-24 sm:self-start sm:py-7">
                        {/* A real heading: the month is how this list is navigated. */}
                        <h3 className="display text-2xl text-ink">{name}</h3>
                        <p className="label mt-1.5 text-spot">{deva(year, lang)}</p>
                      </div>

                      {m.occasions.length === 0 ? (
                        <p className="self-center text-sm text-ink2 italic sm:py-7">
                          {t.spine.empty}
                        </p>
                      ) : (
                        <ul className="divide-y divide-rule sm:py-1">
                          {m.occasions.map((o) => (
                            <OccasionRow key={o.slug} occasion={o} lang={lang} />
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- daily windows ---------------- */}
        <Section tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.windows.eyebrow}
              title={t.windows.title}
              lede={t.windows.lede}
            />

            <DayDiagram lang={lang} />

            {/* the day's schedule, ruled */}
            <ul className="mt-14 border-t-2 border-rulestrong">
              {WINDOWS.map((w, i) => (
                <li
                  key={w.id}
                  className="grid gap-x-8 gap-y-4 border-b border-rule py-8 sm:grid-cols-[3rem_15rem_1fr] sm:py-10"
                >
                  <span className="display text-3xl leading-none text-spot">
                    {numeral(i + 1, lang)}
                  </span>

                  <div>
                    <h3 className="display text-2xl">{windowName(w.id, w.name, lang)}</h3>
                    <p className="label mt-3 text-ink">{t.windows.minutes(w.durationMin)}</p>
                    <p className="label mt-1.5 text-ink2">{t.anchors[w.anchor]}</p>
                  </div>

                  <div className="max-w-2xl">
                    <dl>
                      <div className="border-t border-rule pt-3">
                        <dt className="label text-ink2">{t.windows.formulaLabel}</dt>
                        <dd className="mt-1.5 text-sm text-ink">{pickDeep(w.formula, lang)}</dd>
                      </div>
                      <div className="mt-5 border-t border-rule pt-3">
                        <dt className="label text-ink2">{t.windows.basisLabel}</dt>
                        <dd className="mt-1.5 text-sm leading-[1.75] text-ink2">
                          {pickDeep(w.basis, lang)}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-5 border-t border-rule pt-3 text-sm leading-[1.75] text-ink2">
                      {pickDeep(w.note, lang)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <ProvisionalBadge lang={lang} />
            </div>

            <div className="mt-12 grid gap-10 border-t-2 border-rulestrong pt-10 md:grid-cols-2 md:gap-16">
              {MUHURAT.displayedNotActedOn.map((n) => (
                <div key={n.id}>
                  <h3 className="label text-ink">{pickDeep(n.name, lang)}</h3>
                  <div className="rule-thin mt-3" />
                  <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-ink2">
                    {pickDeep(n.text, lang)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---------------- reading the clock ---------------- */}
        <Section id="clock">
          <Reveal>
            <SectionHeader eyebrow={t.clock.eyebrow} title={t.clock.title} lede={t.clock.lede} />

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
              {/* the ghat clock, primary, never a parenthetical */}
              <div className="boxed misregister self-start border-2 bg-paper p-7">
                <h3 className="label text-spot">{t.clock.atTheGhat}</h3>
                <div className="rule-thin mt-4" />
                <p className="display mt-5 text-3xl text-ink">
                  {ghatReading.ghat.weekday} · {ghatReading.ghat.date}
                </p>
                <p className="display mt-1 text-4xl text-spot">{ghatReading.ghat.time}</p>
                <p className="label mt-3 text-ink2">Asia/Kolkata · IST</p>

                <dl className="mt-7 border-t-2 border-rulestrong text-sm">
                  <div className="flex justify-between gap-4 border-b border-rule py-3">
                    <dt className="label text-ink2">{t.clock.window}</dt>
                    <dd className="text-right text-ink">{exampleWindow ? windowName(exampleWindow.id, exampleWindow.name, lang) : null}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="label text-ink2">{t.clock.assumed}</dt>
                    <dd className="text-right text-ink">{example.assumedSunriseIst} IST</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <ProvisionalBadge lang={lang} short />
                </div>
              </div>

              {/* the same instant, elsewhere */}
              <div>
                <h3 className="label text-ink2">{t.clock.elsewhere}</h3>
                <ul className="mt-5 border-t-2 border-rulestrong">
                  {example.zones.map((z) => {
                    const clock = formatDualClock({
                      instant: exampleInstant,
                      viewerZone: z.zone,
                      viewerLabel: pickDeep(z.label, lang),
                      ghatLabel: "IST",
                      lang: deepLang(lang),
                    });
                    return (
                      <li
                        key={z.zone}
                        className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
                      >
                        <p className="label text-ink2">{pickDeep(z.label, lang)}</p>
                        <div>
                          <p className="text-sm text-ink2">
                            <span className="text-ink">{clock.viewer.time}</span> ·{" "}
                            {clock.viewer.weekday} {clock.viewer.date}
                          </p>
                          <p
                            className={`mt-1 text-xs ${
                              clock.dateShift === 0 ? "text-ink2" : "text-spot"
                            }`}
                          >
                            {clock.shiftNote}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-6 max-w-2xl text-xs leading-[1.75] text-ink2 italic">
                  {t.clock.illustration}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- what is not here ---------------- */}
        <Section tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.notPublished.eyebrow}
              title={t.notPublished.title}
              lede={t.notPublished.lede}
            />

            <ul className="mt-12 border-t-2 border-rulestrong">
              {MUHURAT.notPublished.map((n, i) => (
                <li
                  key={n.id}
                  className="grid gap-x-8 gap-y-2 border-b border-rule py-7 sm:grid-cols-[3rem_15rem_1fr]"
                >
                  <span className="display text-2xl leading-none text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <h3 className="display text-xl text-ink">{pickDeep(n.name, lang)}</h3>
                  <p className="max-w-2xl text-sm leading-[1.75] text-ink2">{pickDeep(n.text, lang)}</p>
                </li>
              ))}
            </ul>

            {refusals.length > 0 && (
              <div className="mt-16">
                <Eyebrow>{t.refusals.eyebrow}</Eyebrow>
                <h3 className="display mt-5 text-3xl">{t.refusals.title}</h3>
                <ul className="mt-8 border-t-2 border-rulestrong">
                  {refusals.map((g) => (
                    <li
                      key={g.id}
                      className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[18rem_1fr]"
                    >
                      <p className="label text-ink">{ghatLabel(g, deepLang(lang))}</p>
                      <p className="max-w-2xl border-l-2 border-spot pl-5 text-sm leading-[1.75] text-ink2">
                        {g.refusal ? pickDeep(g.refusal, lang) : null}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-[1.75] text-ink2">{t.cta.lede}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={localePath(lang, "/rivers")}>
                <CTA>{t.cta.primary}</CTA>
              </Link>
              <a href="#spine">
                <CTA variant="ghost">{t.cta.secondary}</CTA>
              </a>
            </div>

            {/* The provenance sentence closes the page as well as opening it. */}
            <p className="mx-auto mt-14 max-w-2xl border-t border-rule pt-8 text-xs leading-[1.75] text-ink2">
              {pickDeep(MUHURAT.provider.note, lang)}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
