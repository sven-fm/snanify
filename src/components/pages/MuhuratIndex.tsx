import Link from "next/link";

import { content, type Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
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
  muhuratContent,
  type MuhuratWindow,
  type Occasion,
} from "@/content/muhurat";

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

/**
 * The label that has to appear beside every date and every time on the site.
 * It is a component rather than a string so that adding a timing surface
 * without its provenance is a conspicuous omission rather than a silent one.
 */
export function ProvisionalBadge({ lang, short = false }: { lang: Lang; short?: boolean }) {
  const c = muhuratContent[lang].provenance;
  return (
    <span className="inscription inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.07] px-3 py-1 text-[0.58rem] text-gold">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-gold/70" />
      {short ? c.badgeShort : c.badge}
    </span>
  );
}

/* --- the day diagram ------------------------------------------------------
   A day drawn as an arc, with the four windows marked where they fall. The
   geometry is the same arithmetic the window records carry, laid out from an
   assumed 06:00 sunrise and 18:00 sunset; it is a picture of the rule, not of
   any date. Hidden below `sm`, the full definition list below carries every
   fact it shows.                                                           */

const T0 = 4; // the diagram spans 04:00 to 20:00
const SPAN = 16;
const x = (hours: number) => 40 + ((hours - T0) / SPAN) * 920;

const BANDS = [
  { id: "brahma", from: 4.4, to: 5.2, tone: "var(--gold)" },
  { id: "pratah", from: 6, to: 7.6, tone: "var(--teal)" },
  { id: "abhijit", from: 11.6, to: 12.4, tone: "var(--gold)" },
  { id: "godhuli", from: 17.6, to: 18.4, tone: "var(--teal)" },
] as const;

function DayDiagram({ lang }: { lang: Lang }) {
  const c = muhuratContent[lang].windows;
  const byId = Object.fromEntries(WINDOWS.map((w) => [w.id, w])) as Record<string, MuhuratWindow>;

  return (
    <figure className="mt-14 hidden sm:block">
      <svg
        viewBox="0 0 1000 236"
        className="w-full text-ink2"
        role="img"
        aria-label={c.diagramLabel}
      >
        {/* Daylight, washed warm. Drawn as light-on-dark rather than
            night-as-a-shadow so the picture reads the same way in both themes:
            tinting the night with --ink makes it *lighter* than the page in
            dark mode, which is exactly backwards. */}
        <rect
          x={x(6)}
          y="24"
          width={x(18) - x(6)}
          height="146"
          fill="var(--sun)"
          opacity="0.07"
        />

        {/* the sun's path */}
        <path
          d={`M${x(6)},170 Q${x(12)},-30 ${x(18)},170`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx={x(12)} cy="70" r="5" fill="var(--sun)" />

        {/* the four windows */}
        {BANDS.map((b) => (
          <g key={b.id}>
            <rect
              x={x(b.from)}
              y="24"
              width={x(b.to) - x(b.from)}
              height="146"
              fill={b.tone}
              opacity="0.16"
            />
            <rect x={x(b.from)} y="24" width="1" height="146" fill={b.tone} opacity="0.6" />
            <rect x={x(b.to)} y="24" width="1" height="146" fill={b.tone} opacity="0.6" />
            <text
              x={(x(b.from) + x(b.to)) / 2}
              y="192"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
            >
              {byId[b.id]?.name[lang]}
            </text>
          </g>
        ))}

        {/* horizon */}
        <line x1="0" y1="170" x2="1000" y2="170" stroke="var(--line)" strokeWidth="1" />

        {/* anchors */}
        {(
          [
            [6, c.diagram.sunrise],
            [12, c.diagram.noon],
            [18, c.diagram.sunset],
          ] as const
        ).map(([h, label]) => (
          <g key={label}>
            <line x1={x(h)} y1="164" x2={x(h)} y2="176" stroke="var(--ink-2)" strokeWidth="1" />
            <text x={x(h)} y="222" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.75">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* --- one occasion row in the spine ---------------------------------------- */

function OccasionRow({ occasion, lang }: { occasion: Occasion; lang: Lang }) {
  const t = muhuratContent[lang];
  const waters = occasion.ghats.length;

  return (
    <li>
      <Link
        href={localePath(lang, `/muhurat/${occasion.slug}`)}
        className="group block border-b border-line/50 py-6 transition-colors hover:bg-bg3/40"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {/* h4: the month above it is the h3 of this group. */}
          <h4 className="display text-2xl transition-colors group-hover:text-gold sm:text-[1.7rem]">
            {occasion.name[lang]}
          </h4>
          <p className="text-sm text-ink2">{occasion.line[lang]}</p>
        </div>

        <p className="mt-2 text-sm text-teal">{occasion.occurrence.label[lang]}</p>

        <p className="inscription mt-3 text-[0.6rem] text-ink2/80">{occasion.rule.label[lang]}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ProvisionalBadge lang={lang} />
          <span className="text-xs text-ink2">
            {t.spine.observedAt} {t.spine.waters(waters)}
          </span>
          <span className="text-xs text-ink2/70">{t.tiers[occasion.tier]}</span>
        </div>
      </Link>
    </li>
  );
}

/* --- page ----------------------------------------------------------------- */

export function MuhuratIndex({ lang }: { lang: Lang }) {
  const t = muhuratContent[lang];
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
    lang,
  });

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/muhurat" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="relative overflow-hidden border-b border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-24">
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            <h1 className="display mt-6 max-w-3xl text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink2">{t.hero.lede}</p>

            {/* The provenance line is part of the masthead, not a footnote. */}
            <div className="mt-12 max-w-3xl rounded-2xl border border-gold/35 bg-gold/[0.05] p-6 sm:p-8">
              <h2 className="inscription text-[0.62rem] text-gold">{t.provenance.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink2">{t.provenance.line}</p>

              <dl className="mt-6 grid gap-4 border-t border-gold/25 pt-5 text-xs sm:grid-cols-3">
                <div>
                  <dt className="inscription text-[0.55rem] text-ink2/70">
                    {t.provenance.sourceLabel}
                  </dt>
                  <dd className="mt-1.5 text-ink">{MUHURAT.provider.displayName[lang]}</dd>
                </div>
                <div>
                  <dt className="inscription text-[0.55rem] text-ink2/70">
                    {t.provenance.ayanamsaLabel}
                  </dt>
                  <dd className="mt-1.5 text-ink">{MUHURAT.provider.ayanamsa ?? t.provenance.notSet}</dd>
                </div>
                <div>
                  <dt className="inscription text-[0.55rem] text-ink2/70">
                    {t.provenance.coordinatesLabel}
                  </dt>
                  <dd className="mt-1.5 text-ink">{t.provenance.coordinatesPending}</dd>
                </div>
              </dl>
            </div>

            <p className="inscription mt-6 text-[0.6rem] text-ink2/70">{t.hero.asOf}</p>
          </div>
        </section>

        {/* ---------------- how to read this ---------------- */}
        <Section>
          <SectionHeader eyebrow={t.reading.eyebrow} title={t.reading.title} />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.reading.items.map((item) => (
              <li key={item.n} className="relative md:pt-9">
                <span className="rule-fade absolute inset-x-0 top-0 hidden md:block" />
                <span className="display block text-4xl text-gold/35">{item.n}</span>
                <h3 className="display mt-4 text-2xl">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{item.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------------- the monthly rhythm ---------------- */}
        <Section tinted>
          <SectionHeader eyebrow={t.rhythm.eyebrow} title={t.rhythm.title} lede={t.rhythm.lede} />

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2 lg:grid-cols-4">
            {RECURRING_OCCASIONS.map((o) => (
              <li key={o.slug} className="bg-bg">
                <Link
                  href={localePath(lang, `/muhurat/${o.slug}`)}
                  className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-bg3"
                >
                  <h3 className="display text-2xl transition-colors group-hover:text-gold">
                    {o.name[lang]}
                  </h3>
                  <p className="mt-2 text-sm text-ink2">{o.line[lang]}</p>
                  <p className="inscription mt-auto pt-6 text-[0.58rem] text-teal">
                    {o.occurrence.label[lang]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------- the almanac spine ----------------
            Deliberately not a card grid: an almanac reads down a column, month
            by month, and shows the empty months too. Nothing is featured at the
            top, the nearest occasion here is Pitru Paksha, and putting a
            bereavement season in a hero slot is the exact pressure this
            product refuses to apply. */}
        <Section id="spine">
          <SectionHeader eyebrow={t.spine.eyebrow} title={t.spine.title} />

          <div className="mt-14 border-t border-line">
            {months.map((m) => {
              const { name, year } = monthLabel(m.month, lang);
              return (
                <div
                  key={m.month}
                  className="grid gap-4 border-b border-line/60 py-8 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-10"
                >
                  <div className="sm:sticky sm:top-24 sm:self-start">
                    {/* A real heading: the month is how this list is navigated. */}
                    <h3 className="display text-2xl text-ink">
                      {name}{" "}
                      <span className="inscription block pt-1.5 text-[0.6rem] text-ink2/70">
                        {year}
                      </span>
                    </h3>
                  </div>

                  {m.occasions.length === 0 ? (
                    <p className="self-center text-sm text-ink2/60 italic">{t.spine.empty}</p>
                  ) : (
                    <ul className="border-t border-line/50 sm:border-t-0">
                      {m.occasions.map((o) => (
                        <OccasionRow key={o.slug} occasion={o} lang={lang} />
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ---------------- daily windows ---------------- */}
        <Section tinted>
          <SectionHeader
            eyebrow={t.windows.eyebrow}
            title={t.windows.title}
            lede={t.windows.lede}
          />

          <DayDiagram lang={lang} />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 lg:grid-cols-2">
            {WINDOWS.map((w) => (
              <li key={w.id} className="bg-bg p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl">{w.name[lang]}</h3>
                  <p className="inscription text-[0.58rem] text-teal">
                    {t.windows.minutes(w.durationMin)}
                  </p>
                </div>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="inscription text-[0.55rem] text-ink2/70">
                      {t.windows.formulaLabel}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink">{w.formula[lang]}</dd>
                  </div>
                  <div>
                    <dt className="inscription text-[0.55rem] text-ink2/70">
                      {t.windows.basisLabel}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink2">{w.basis[lang]}</dd>
                  </div>
                </dl>

                <p className="mt-6 border-t border-line/60 pt-5 text-xs leading-relaxed text-ink2/85">
                  {w.note[lang]}
                </p>
                <p className="inscription mt-4 text-[0.55rem] text-ink2/60">{t.anchors[w.anchor]}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 border-t border-line/60 pt-10 md:grid-cols-2">
            {MUHURAT.displayedNotActedOn.map((n) => (
              <div key={n.id}>
                <h3 className="inscription text-[0.62rem] text-ink">{n.name[lang]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{n.text[lang]}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- reading the clock ---------------- */}
        <Section id="clock">
          <SectionHeader eyebrow={t.clock.eyebrow} title={t.clock.title} lede={t.clock.lede} />

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
            {/* the ghat clock, primary, never a parenthetical */}
            <div className="rounded-2xl border border-gold/45 bg-bg2 p-7 shadow-[0_30px_80px_-50px_var(--gold)]">
              <h3 className="inscription text-[0.58rem] text-gold">{t.clock.atTheGhat}</h3>
              <p className="display mt-5 text-3xl text-ink">
                {ghatReading.ghat.weekday} · {ghatReading.ghat.date}
              </p>
              <p className="display mt-1 text-4xl text-gold">{ghatReading.ghat.time}</p>
              <p className="mt-2 text-xs text-ink2">Asia/Kolkata · IST</p>

              <dl className="mt-7 space-y-3 border-t border-line/60 pt-5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink2">{t.clock.window}</dt>
                  <dd className="text-ink">{exampleWindow?.name[lang]}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink2">{t.clock.assumed}</dt>
                  <dd className="text-ink">{example.assumedSunriseIst} IST</dd>
                </div>
              </dl>

              <div className="mt-6">
                <ProvisionalBadge lang={lang} short />
              </div>
            </div>

            {/* the same instant, elsewhere */}
            <div>
              <h3 className="inscription text-[0.58rem] text-ink2">{t.clock.elsewhere}</h3>
              <ul className="mt-5 border-t border-line/60">
                {example.zones.map((z) => {
                  const clock = formatDualClock({
                    instant: exampleInstant,
                    viewerZone: z.zone,
                    viewerLabel: z.label[lang],
                    ghatLabel: "IST",
                    lang,
                  });
                  return (
                    <li
                      key={z.zone}
                      className="grid gap-1 border-b border-line/60 py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
                    >
                      <p className="text-sm text-ink">{z.label[lang]}</p>
                      <div>
                        <p className="text-sm text-ink2">
                          <span className="text-ink">{clock.viewer.time}</span> ·{" "}
                          {clock.viewer.weekday} {clock.viewer.date}
                        </p>
                        <p
                          className={`mt-1 text-xs ${
                            clock.dateShift === 0 ? "text-ink2/70" : "text-sindoor"
                          }`}
                        >
                          {clock.shiftNote}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-ink2/80 italic">
                {t.clock.illustration}
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------- what is not here ---------------- */}
        <Section tinted>
          <SectionHeader
            eyebrow={t.notPublished.eyebrow}
            title={t.notPublished.title}
            lede={t.notPublished.lede}
          />

          <ul className="mt-12 border-t border-line/60">
            {MUHURAT.notPublished.map((n, i) => (
              <li
                key={n.id}
                className="grid gap-3 border-b border-line/60 py-7 sm:grid-cols-[3rem_1fr_2fr] sm:gap-8"
              >
                <span className="inscription text-[0.6rem] text-ink2/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display text-xl text-ink">{n.name[lang]}</h3>
                <p className="text-sm leading-relaxed text-ink2">{n.text[lang]}</p>
              </li>
            ))}
          </ul>

          {refusals.length > 0 && (
            <div className="mt-16">
              <Eyebrow>{t.refusals.eyebrow}</Eyebrow>
              <h3 className="display mt-5 text-3xl">{t.refusals.title}</h3>
              <ul className="mt-8 space-y-6">
                {refusals.map((g) => (
                  <li key={g.id} className="max-w-2xl border-l-2 border-sindoor/50 pl-6">
                    <p className="inscription text-[0.58rem] text-ink2">{ghatLabel(g, lang)}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink2">{g.refusal?.[lang]}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="relative overflow-hidden border-t border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <h2 className="display mt-9 text-4xl leading-[1.08] sm:text-5xl">{t.cta.title}</h2>
            <p className="mx-auto mt-5 max-w-lg text-ink2">{t.cta.lede}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={localePath(lang, "/rivers")}>
                <CTA>{t.cta.primary}</CTA>
              </Link>
              <a href="#spine">
                <CTA variant="ghost">{t.cta.secondary}</CTA>
              </a>
            </div>

            {/* The provenance sentence closes the page as well as opening it. */}
            <p className="mx-auto mt-14 max-w-2xl border-t border-line/60 pt-8 text-xs leading-relaxed text-ink2/75">
              {MUHURAT.provider.note[lang]}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
