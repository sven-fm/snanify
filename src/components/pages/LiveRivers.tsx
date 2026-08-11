import Link from "next/link";
import { content } from "@/lib/content";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, StatusBadge } from "@/components/ui";
import { getGhat } from "@/content/rivers";
import { WINDOW_BY_ID } from "@/content/muhurat";
import { fill, liveContent } from "@/content/live";
import {
  ARCHIVE,
  SOURCES,
  istWallClock,
  weatherId,
  type Discharge,
  type LiveSnapshot,
  type Sky,
  type WaterState,
  type WindowSlot,
} from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /live, the free page.

   Built for a 390px viewport first and widened from there, because this is a
   page people open at six in the morning on a phone. Consequences, all of them
   deliberate:

   · One water per screen block. No table, no horizontal scroller, nothing that
     needs two thumbs. The one dense grid is the sky panel, which is two columns
     at 390px and four above 640.
   · The flow figure is set at 3rem so it is readable at arm's length, and the
     ruled label rows sit at 0.95rem, never at the 0.66rem `label` size, which
     is for column headings and not for data a reader has to take in.
   · Every interactive element is at least 44px in the vertical, and the primary
     action sits in a fixed bar at the bottom of the viewport where a thumb is,
     not in the masthead where it is not.
   · No `RiverFlow`, no canvas, no requestAnimationFrame. This whole page is
     server-rendered markup and about seventy SVG rects, so it costs a mid-range
     Android nothing after paint. The only motion is `ink-in` on the front
     matter, which is a stepped opacity and stops.

   And the rule that outranks all of the above: a number appears here only with
   its provenance and its date beside it. The `Discharge` union is what makes
   that structural rather than a matter of care, see `riverdata.ts`.
   --------------------------------------------------------------------------- */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(value: string, lang: Lang): string {
  return lang === "hi" ? [...value].map((d) => DEVA[Number(d)] ?? d).join("") : value;
}

const locale = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");

/**
 * Discharge spans four orders of magnitude across the six, from the Kaveri at
 * a fifth of a cubic metre to the Ganga at thirty thousand, so precision is
 * chosen from the magnitude rather than fixed. Two decimals on a trickle, none
 * on a flood.
 */
function cumecs(value: number, lang: Lang): string {
  const digits = value < 10 ? 2 : value < 100 ? 1 : 0;
  return new Intl.NumberFormat(locale(lang), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function decimal(value: number, lang: Lang, digits = 1): string {
  return new Intl.NumberFormat(locale(lang), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function whole(value: number, lang: Lang): string {
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(value);
}

/** "11 Aug 2026". The civil date is a date, so it is formatted in UTC. */
function longDate(date: string, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

/** "05:42" out of an IST wall clock or an IST instant. Never converted. */
function clock(value: string): string {
  return value.slice(11, 16);
}

/** Coordinates as a printed almanac sets them, to the precision we hold. */
function coords(pair: readonly [number, number], places: number): string {
  const [lat, lon] = pair;
  return `${Math.abs(lat).toFixed(places)} ${lat < 0 ? "S" : "N"}, ${Math.abs(lon).toFixed(places)} ${lon < 0 ? "W" : "E"}`;
}

const CARET: Record<"rising" | "steady" | "falling", string> = {
  rising: "▲",
  steady: "▬",
  falling: "▼",
};

/* --- small primitives ---------------------------------------------------- */

/**
 * One ruled entry: term at the left, figure at the right, hairline under.
 * This is the stacked-row form the brief asks for in place of a table, and it
 * holds its shape from 320px upward because it is a two-item flex row and not
 * a grid with a fixed first column.
 */
function Entry({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
      {/* The term is capped at just under half the row so a long Hindi label
          cannot push the figure off a 390px screen, and the figure is allowed
          to shrink and wrap rather than to overflow. */}
      <dt className="label max-w-[46%] shrink-0 text-ink2">{term}</dt>
      <dd className="tabular min-w-0 text-right text-[0.95rem] leading-snug break-words text-ink">
        {children}
      </dd>
    </div>
  );
}

/**
 * The percentile, set as a ruled scale. Hairline ticks at the four band
 * boundaries, one solid vermillion rule at the value. No fill, no gradient,
 * no rounding: it is an engraved gauge, which is the only kind this design
 * system has.
 */
function Scale({ value, label }: { value: number; label: string }) {
  return (
    <div className="mt-5">
      <div className="relative h-7 border border-rulestrong tint" role="img" aria-label={label}>
        {[10, 30, 70, 90].map((tick) => (
          <span
            key={tick}
            className="absolute top-0 h-full w-px bg-rule"
            style={{ left: `${tick}%` }}
            aria-hidden="true"
          />
        ))}
        <span
          className="absolute top-0 h-full w-[3px] bg-spot"
          style={{ left: `calc(${value}% - 1.5px)` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/**
 * Eleven model days as eleven ink rules, measured from zero so the bar heights
 * are the values themselves rather than a flattering crop of them. A river that
 * has not moved in eleven days looks like eleven rules of the same height, and
 * that is the correct picture.
 */
function ElevenDays({ series }: { series: readonly { date: string; cumecs: number }[] }) {
  const max = Math.max(...series.map((d) => d.cumecs));
  if (!Number.isFinite(max) || max <= 0) return null;

  const slot = 100 / series.length;
  const barWidth = slot * 0.52;

  return (
    <svg
      viewBox="0 0 100 34"
      preserveAspectRatio="none"
      className="mt-4 h-16 w-full text-ink sm:h-20"
      aria-hidden="true"
      focusable={false}
    >
      {series.map((day, i) => {
        const height = Math.max(0.6, (day.cumecs / max) * 34);
        return (
          <rect
            key={day.date}
            x={i * slot + (slot - barWidth) / 2}
            y={34 - height}
            width={barWidth}
            height={height}
            fill="currentColor"
            opacity={i === series.length - 1 ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

/* --- the flow panel ------------------------------------------------------- */

function FlowPanel({
  discharge,
  lang,
}: {
  discharge: Discharge;
  lang: Lang;
}) {
  const t = liveContent[lang];
  const normal = discharge.normal;

  return (
    <div className="mt-8">
      {discharge.kind === "normal" && (
        <div className="mb-6 border-2 border-spot">
          <h3 className="label bg-spot px-4 py-2.5 text-paper">{t.feed.normalHeading}</h3>
          <p className="px-4 py-4 text-[0.95rem] leading-[1.7] text-ink">{t.feed.normalNote}</p>
        </div>
      )}

      <div className="border-y-2 border-rulestrong py-6">
        <p className="label text-ink2">
          {discharge.kind === "modelled" ? t.flow.label : t.feed.normalHeading}
        </p>

        <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="display tabular text-[3rem] leading-[0.95] sm:text-[4.5rem]">
            {cumecs(discharge.cumecs, lang)}
          </span>
          <span className="label text-ink2">{t.flow.unit}</span>
        </p>

        <p className="mt-4 text-[0.95rem] leading-snug text-ink2">
          {discharge.kind === "modelled"
            ? fill(t.flow.modelledFor, { date: longDate(discharge.modelledFor, lang) })
            : fill(t.flow.modelledFor, { date: longDate(discharge.forDate, lang) })}
        </p>
      </div>

      {discharge.kind === "modelled" && (
        <div className="mt-7">
          <p className="label text-ink2">{t.flow.rankLabel}</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="display tabular text-[2.2rem] leading-none sm:text-[2.8rem]">
              {whole(discharge.percentile.value, lang)}
            </span>
            <span className="label text-ink2">/ 100</span>
          </p>
          <p className="mt-2 text-[0.95rem] leading-snug text-ink2">
            {discharge.percentile.capped === "below"
              ? t.flow.cappedBelow
              : discharge.percentile.capped === "above"
                ? t.flow.cappedAbove
                : t.flow.rankSuffix}
          </p>
          <Scale value={discharge.percentile.value} label={t.flow.scaleLabel} />
          <p className="label mt-2 flex justify-between text-ink2">
            <span>{numeral("0", lang)}</span>
            <span>{numeral("100", lang)}</span>
          </p>
        </div>
      )}

      <div className="mt-7 tint boxed p-5">
        <p className="label text-ink2">{t.flow.normalLabel}</p>
        <p className="mt-2 text-[0.95rem] leading-[1.7] text-ink">
          {fill(t.flow.normalBody, {
            p10: cumecs(normal.p10, lang),
            p90: cumecs(normal.p90, lang),
            median: cumecs(normal.median, lang),
            unit: t.flow.unit,
          })}
        </p>
      </div>

      {discharge.kind === "modelled" && discharge.series.length > 1 && (
        <div className="mt-7">
          <p className="label text-ink2">{t.flow.seriesLabel}</p>
          <ElevenDays series={discharge.series} />
          <p className="mt-2 flex justify-between gap-4 text-xs text-ink2">
            <span>{longDate(discharge.series[0].date, lang)}</span>
            <span>{longDate(discharge.series[discharge.series.length - 1].date, lang)}</span>
          </p>
          <p className="mt-2 text-[0.9rem] leading-snug text-ink2">{t.flow.seriesNote}</p>
        </div>
      )}
    </div>
  );
}

/* --- the sky panel -------------------------------------------------------- */

function SkyPanel({ sky, lang }: { sky: Sky; lang: Lang }) {
  const t = liveContent[lang];

  return (
    <div className="mt-8">
      <p className="label text-ink2">{t.sky.label}</p>

      {/* Two cells, never four. A four-up grid reflows into two rows on a phone
          and the row-two cells lose their alignment with the page edge; two
          cells hold their shape at every width from 320px up. Air and rain live
          in the ruled register below, where a long value can wrap. */}
      <div className="mt-3 grid grid-cols-2 border-y-2 border-rulestrong">
        <div className="border-r border-rule py-4 pr-4">
          <p className="label text-ink2">{t.sky.sunrise}</p>
          <p className="display tabular mt-1.5 text-[1.7rem] leading-none">{clock(sky.sunrise)}</p>
        </div>
        <div className="py-4 pl-4">
          <p className="label text-ink2">{t.sky.sunset}</p>
          <p className="display tabular mt-1.5 text-[1.7rem] leading-none">{clock(sky.sunset)}</p>
        </div>
      </div>

      <p className="mt-3 text-[0.9rem] leading-snug text-ink2">
        {sky.kind === "observed"
          ? `${fill(t.sky.readAt, { time: clock(sky.readAt) })} · ${sky.isDay ? t.sky.day : t.sky.night}`
          : t.sky.computed}
      </p>
    </div>
  );
}

/* --- muhurat -------------------------------------------------------------- */

function windowLine(slot: WindowSlot, lang: Lang): string {
  const t = liveContent[lang];
  const name = WINDOW_BY_ID[slot.id]?.name[lang] ?? slot.id;
  const when = `${clock(slot.startsAt)} IST`;
  if (slot.open) return `${name}, ${fill(t.windows.until, { time: clock(slot.endsAt) })}`;
  return `${name}, ${when}${slot.onNextDay ? ` ${t.windows.tomorrow}` : ""}`;
}

/* --- one water ------------------------------------------------------------ */

function Water({ water, lang }: { water: WaterState; lang: Lang }) {
  const t = liveContent[lang];
  const ghat = getGhat(water.slug);
  if (!ghat) return null;

  const { discharge, sky, gauge } = water;
  const subject = t.subjects[water.slug];
  const slot = water.current ?? water.next;

  /* Band and trend exist only on a real reading. Reading them off the narrowed
     value rather than off the state keeps that structural: there is no way to
     render a band sentence for a seasonal normal, which would be a claim about
     what the river is doing today that we did not measure. */
  const read = discharge.kind === "modelled" ? discharge : null;

  return (
    <section id={water.slug} className="scroll-mt-20 border-t-2 border-rulestrong">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* ------------------------------------------------------- head --- */}
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="display text-[2rem] leading-none text-spot sm:text-[3.4rem]">
            {numeral(ghat.numeral, lang)}
          </span>
          <div className="min-w-0">
            <h2 className="display text-[1.7rem] leading-tight sm:text-[2.6rem]">
              {ghat.river[lang]}
            </h2>
            <p className="label mt-1.5 text-ink2">
              {ghat.ghat[lang]} · {ghat.city[lang]}, {ghat.state[lang]}
            </p>
          </div>
        </div>

        <div className="rule-thin mt-6" />

        {/* --------------------------------------------- the sentence --- */}
        {read && (
          <p className="display mt-6 max-w-3xl text-[1.4rem] leading-[1.3] sm:text-[2rem]">
            {fill(t.bands[read.percentile.band], { river: subject })}
          </p>
        )}

        {read && (
          <p className="label mt-4 flex items-center gap-2.5 text-ink2">
            <span aria-hidden="true" className="text-[0.9rem] leading-none text-spot">
              {CARET[read.trend]}
            </span>
            {read.deltaPct === null
              ? t.trendPlain[read.trend]
              : fill(t.trends[read.trend], {
                  pct: whole(Math.abs(read.deltaPct), lang),
                  since: t.flow.trendSince,
                })}
          </p>
        )}

        <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-ink2">
          {t.reaches[water.slug]}
        </p>

        {water.slug === "kaveri-talakaveri" && (
          <div className="mt-6 max-w-2xl border-l-2 border-spot pl-4">
            <p className="label text-spot">{t.talakaveri.label}</p>
            <p className="mt-2 text-[0.95rem] leading-[1.7] text-ink2">{t.talakaveri.body}</p>
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <FlowPanel discharge={discharge} lang={lang} />
          </div>

          <div>
            <SkyPanel sky={sky} lang={lang} />

            {/* ------------------------------------------ the register --- */}
            <dl className="mt-8 border-t-2 border-rulestrong">
              {slot && (
                <Entry term={slot.open ? t.windows.openNow : t.windows.next}>
                  {windowLine(slot, lang)}
                </Entry>
              )}

              {sky.kind === "observed" && (
                <>
                  <Entry term={t.sky.condition}>{t.weather[weatherId(sky.weatherCode)]}</Entry>
                  <Entry term={t.sky.air}>
                    {decimal(sky.airTempC, lang)} {t.units.celsius}
                  </Entry>
                  <Entry term={t.sky.humidity}>{whole(sky.humidityPct, lang)}%</Entry>
                  <Entry term={t.sky.rainHour}>
                    {decimal(sky.precipMm, lang)} {t.units.mm}
                  </Entry>
                  <Entry term={t.sky.rainToday}>
                    {decimal(sky.precipTodayMm, lang)} {t.units.mm}
                  </Entry>
                  <Entry term={t.sky.cloud}>{whole(sky.cloudPct, lang)}%</Entry>
                  <Entry term={t.sky.wind}>
                    {decimal(sky.windKph, lang)} {t.units.kmh}
                  </Entry>
                </>
              )}

              <Entry term={t.section.cellLabel}>
                {coords(gauge.cell, 3)}
                <span className="block text-ink2">
                  {fill(t.section.cellNote, { km: decimal(gauge.cellOffsetKm, lang) })}
                </span>
              </Entry>

              <Entry term={t.section.ghatLabel}>{coords(gauge.ghat, 4)}</Entry>

              <Entry
                term={
                  read === null
                    ? t.feed.normalLabel
                    : read.stale
                      ? fill(t.feed.staleLabel, { days: whole(read.ageDays, lang) })
                      : t.feed.liveLabel
                }
              >
                {SOURCES.discharge.shortName}
              </Entry>
            </dl>

            {read && (
              <p className="mt-5 text-[0.9rem] leading-[1.7] text-ink2">
                {read.stale
                  ? fill(t.feed.staleNote, { days: whole(read.ageDays, lang) })
                  : t.feed.liveNote}
              </p>
            )}

            <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink2">{t.windows.basis}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- the page ------------------------------------------------------------- */

export function LiveRivers({ lang, snapshot }: { lang: Lang; snapshot: LiveSnapshot }) {
  const t = liveContent[lang];
  const site = content[lang];
  const cta = ctaHref(lang);

  /* Our own clock, labelled as ours. It is not a reading time and the copy
     beside it does not pretend it is. */
  const assembledAt = clock(istWallClock(new Date(snapshot.generatedAt)));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/live" />

      {/* The fixed bar at the foot of the viewport overlaps the last 6rem of
          the page on a phone, so the document ends above it rather than under
          it. Above lg the bar is gone and so is the padding. */}
      <main className="pb-28 lg:pb-0">
        {/* ---------------------------------------------- front matter --- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-12 pb-12 sm:px-8 sm:pt-16 sm:pb-16">
            {/* The badge names the rung the page is actually on. The spot
                square fills only when the feed is genuinely live, which is the
                one thing that square is for. */}
            <div className="ink-in">
              <StatusBadge live={snapshot.source === "live"}>
                {t.badges[snapshot.source]}
              </StatusBadge>
            </div>

            <h1
              className="ink-in display mt-7 max-w-4xl text-[2.4rem] leading-[1.05] sm:text-[3.6rem] lg:text-[4.4rem]"
              style={{ animationDelay: "80ms" }}
            >
              {t.title}
            </h1>

            <div className="rule-double mt-7 max-w-xl" />

            <p
              className="ink-in mt-6 max-w-2xl text-[1.02rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {t.standfirst}
            </p>

            <p
              className="ink-in mt-6 max-w-2xl border-l-2 border-spot pl-4 text-[0.95rem] leading-[1.75] text-ink"
              style={{ animationDelay: "240ms" }}
            >
              {t.subline}
            </p>

            <p className="label mt-8 text-ink2">
              {fill(t.assembled, { time: assembledAt })} · {t.modelledEvery}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------- the index --- */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
            <Eyebrow>{t.index.label}</Eyebrow>

            <ul className="mt-6 border-t-2 border-rulestrong">
              {snapshot.waters.map((water) => {
                const ghat = getGhat(water.slug);
                if (!ghat) return null;
                const band =
                  water.discharge.kind === "modelled" ? water.discharge.percentile.band : null;
                const trend =
                  water.discharge.kind === "modelled" ? water.discharge.trend : null;

                return (
                  <li key={water.slug} className="border-b border-rule">
                    {/* 56px minimum, so every row is a comfortable tap target
                        and the six of them are a usable index on a phone. */}
                    <a
                      href={`#${water.slug}`}
                      className="flex min-h-[56px] items-center gap-4 py-3 transition-colors hover:text-spot"
                    >
                      <span className="display w-8 shrink-0 text-[1.15rem] text-spot">
                        {numeral(ghat.numeral, lang)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[1rem] leading-tight text-ink">
                          {ghat.river[lang]}
                        </span>
                        <span className="label block text-ink2">{ghat.city[lang]}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-right">
                        <span className="label text-ink">
                          {band ? t.bandWords[band] : t.feed.normalLabel}
                        </span>
                        {trend && (
                          <span aria-hidden="true" className="text-[0.8rem] leading-none text-spot">
                            {CARET[trend]}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-ink2">{t.index.note}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the waters --- */}
        {snapshot.waters.map((water) => (
          <Water key={water.slug} water={water} lang={lang} />
        ))}

        {/* -------------------------------------------- how we know it --- */}
        <section className="tint border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <Eyebrow>{t.provenance.heading}</Eyebrow>

            <div className="rule-heavy mt-6" />

            <div className="mt-7 max-w-3xl space-y-5">
              {t.provenance.paras.map((para) => (
                <p key={para.slice(0, 24)} className="text-[0.98rem] leading-[1.8] text-ink2">
                  {para}
                </p>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-[0.95rem] leading-[1.7] text-ink2">
              {t.sky.noWater}
            </p>

            <div className="rule-thin mt-9 max-w-3xl" />

            <p className="label mt-6 text-spot">{t.provenance.attributionLabel}</p>
            <ul className="mt-3 max-w-3xl space-y-2">
              {t.provenance.attribution.map((line) => (
                <li key={line.slice(0, 24)} className="text-[0.9rem] leading-[1.7] text-ink2">
                  {line}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a
                  href={SOURCES.discharge.modelHref}
                  rel="noopener noreferrer external"
                  className="label inline-flex min-h-[44px] items-center text-ink underline decoration-spot decoration-2 hover:text-spot"
                >
                  Copernicus EMS
                </a>
              </li>
              <li>
                <a
                  href={SOURCES.discharge.href}
                  rel="noopener noreferrer external"
                  className="label inline-flex min-h-[44px] items-center text-ink underline decoration-spot decoration-2 hover:text-spot"
                >
                  Open-Meteo
                </a>
              </li>
              <li>
                <a
                  href={SOURCES.registry.href}
                  rel="noopener noreferrer external"
                  className="label inline-flex min-h-[44px] items-center text-ink underline decoration-spot decoration-2 hover:text-spot"
                >
                  {SOURCES.registry.shortName}
                </a>
              </li>
            </ul>

            <p className="label mt-8 text-ink2">
              {fill(t.flow.archiveLine, {
                samples: whole(ARCHIVE.samplesPerWeek, lang),
                from: ARCHIVE.firstYear,
                to: ARCHIVE.lastYear,
              })}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- close --- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <Eyebrow>{t.close.eyebrow}</Eyebrow>
            <h2 className="display mt-5 max-w-3xl text-[1.9rem] sm:text-[2.7rem]">
              {t.close.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[1rem] leading-[1.75] text-ink2">{t.close.body}</p>

            <ul className="mt-9 border-t-2 border-rulestrong">
              {(
                [
                  ["/rivers", t.close.links.rivers],
                  ["/muhurat", t.close.links.muhurat],
                  ["/panchang", t.close.links.panchang],
                ] as const
              ).map(([path, label]) => (
                <li key={path} className="border-b border-rule">
                  <Link
                    href={localePath(lang, path)}
                    className="label flex min-h-[56px] items-center justify-between gap-4 py-3 text-ink transition-colors hover:text-spot"
                  >
                    {label}
                    <span aria-hidden="true" className="text-spot">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* The primary action, put where a thumb reaches on a 390px screen.
          Hidden above lg, where the masthead's own button is in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-rulestrong bg-paper px-5 py-3 lg:hidden">
        <a
          href={cta}
          className="label flex min-h-[48px] items-center justify-center bg-spot px-6 text-paper transition-colors hover:bg-ink"
        >
          {site.nav.cta}
        </a>
      </div>
    </>
  );
}
