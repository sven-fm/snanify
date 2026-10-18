import type { Lang } from "@/lib/locales";
import { windowName } from "@/content/names";
import { WINDOW_BY_ID } from "@/content/muhurat";
import { fill, liveContent } from "@/content/live";
import { PICTURES } from "@/content/live/pictures";
import { CreditsLink } from "@/components/live/CreditsLink";
import { InView } from "@/components/live/InView";
import { cumecs, longDate } from "@/components/live/Reading";
import {
  ARCHIVE,
  SOURCES,
  weatherId,
  type Discharge,
  type Sky,
  type WaterState,
  type WindowSlot,
} from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   One water this morning, in full: everything about it that is not the gauge.

   This was the long block for each river on /live. Since /live became the six
   at a glance (the owner's ruling of 18 October 2026), it lives on the
   river's own page, /rivers/[river], under the reading and the press:

   · the landmark printed as ink, with the way to its credit;
   · the trend, the reach the grid cell covers, the usual range for this week
     and the last eleven model days in a fold;
   · sunrise and sunset at the ghat;
   · the register in a fold: the muhurat window, the weather, the grid cell
     and the ghat's coordinates, and the feed's status.

   The rule that outranks the rest: a number appears here only with its
   provenance and its date beside it. The `Discharge` union is what makes
   that structural rather than a matter of care, see `riverdata.ts`.
   --------------------------------------------------------------------------- */

const locale = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");

function decimal(value: number, lang: Lang, digits = 1): string {
  return new Intl.NumberFormat(locale(lang), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function whole(value: number, lang: Lang): string {
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 0 }).format(value);
}

/** "05:42" out of an IST wall clock or an IST instant. Never converted. */
export function clock(value: string): string {
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
 * A two-item flex row rather than a grid with a fixed first column, so it
 * holds its shape from 320px upward.
 */
function Entry({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
      {/* The term is capped at just under half the row so a long Hindi label
          cannot push the figure off a 390px screen. */}
      <dt className="label max-w-[46%] shrink-0 text-ink2">{term}</dt>
      <dd className="tabular min-w-0 text-right text-[0.95rem] leading-snug break-words text-ink">
        {children}
      </dd>
    </div>
  );
}

/**
 * Eleven model days as eleven ink rules, measured from zero so the bar heights
 * are the values themselves rather than a flattering crop of them.
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
            className="grow"
            style={{ ["--i" as string]: i }}
            x={(i * slot + (slot - barWidth) / 2).toFixed(2)}
            y={(34 - height).toFixed(2)}
            width={barWidth.toFixed(2)}
            height={height.toFixed(2)}
            fill="currentColor"
            opacity={i === series.length - 1 ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

/* --- the flow panel ------------------------------------------------------- */

function FlowPanel({ discharge, lang }: { discharge: Discharge; lang: Lang }) {
  const t = liveContent[lang];
  const normal = discharge.normal;

  return (
    <div>
      {discharge.kind === "normal" && (
        <p className="text-[0.95rem] leading-[1.7] text-ink">{t.feed.normalNote}</p>
      )}

      <p className="mt-4 text-sm text-ink2">{t.flow.normalLabel}</p>
      <p className="mt-1 text-[0.95rem] leading-[1.7] text-ink">
        {fill(t.flow.normalBody, {
          p10: cumecs(normal.p10, lang),
          p90: cumecs(normal.p90, lang),
          median: cumecs(normal.median, lang),
          unit: t.flow.unit,
        })}
      </p>

      {discharge.kind === "modelled" && discharge.series.length > 1 && (
        <details className="group mt-6">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-ink active:text-sindoor [&::-webkit-details-marker]:hidden">
            {t.flow.seriesLabel}
            <span aria-hidden="true" className="text-ink2 group-open:hidden">+</span>
            <span aria-hidden="true" className="hidden text-ink2 group-open:inline">−</span>
          </summary>
          <div className="settle-panel">
            <ElevenDays series={discharge.series} />
            <p className="mt-2 flex justify-between gap-4 text-xs text-ink2">
              <span>{longDate(discharge.series[0].date, lang)}</span>
              <span>{longDate(discharge.series[discharge.series.length - 1].date, lang)}</span>
            </p>
            <p className="mt-2 text-[0.9rem] leading-snug text-ink2">{t.flow.seriesNote}</p>
          </div>
        </details>
      )}
    </div>
  );
}

/* --- the sky panel -------------------------------------------------------- */

function SkyPanel({ sky, lang }: { sky: Sky; lang: Lang }) {
  const t = liveContent[lang];

  return (
    <div>
      <p className="text-sm text-ink2">{t.sky.label}</p>

      {/* Two cells, never four: two hold their shape at every width from
          320px up. Air and rain live in the register below. */}
      <div className="mt-3 grid grid-cols-2">
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
          ? `${fill(t.sky.readAt, { time: clock(sky.readAt) })} ${sky.isDay ? t.sky.day : t.sky.night}`
          : t.sky.computed}
      </p>
    </div>
  );
}

/* --- muhurat and trend ---------------------------------------------------- */

function windowLine(slot: WindowSlot, lang: Lang): string {
  const t = liveContent[lang];
  const w = WINDOW_BY_ID[slot.id];
  const name = w ? windowName(slot.id, w.name, lang) : slot.id;
  const when = `${clock(slot.startsAt)} IST`;
  if (slot.open) return `${name}, ${fill(t.windows.until, { time: clock(slot.endsAt) })}`;
  return `${name}, ${when}${slot.onNextDay ? ` ${t.windows.tomorrow}` : ""}`;
}

function trendLine(read: Extract<Discharge, { kind: "modelled" }>, lang: Lang): string {
  const t = liveContent[lang];
  return read.deltaPct === null
    ? t.trendPlain[read.trend]
    : fill(t.trends[read.trend], { pct: whole(Math.abs(read.deltaPct), lang), since: t.flow.trendSince });
}

/** The trend under the gauge: a caret in sindoor and one short line. */
export function TrendLine({ water, lang, className = "" }: { water: WaterState; lang: Lang; className?: string }) {
  const read = water.discharge.kind === "modelled" ? water.discharge : null;
  if (!read) return null;
  return (
    <p className={`flex items-center gap-2.5 text-sm text-ink2 ${className}`}>
      <span aria-hidden="true" className="text-[0.8rem] leading-none text-sindoor">
        {CARET[read.trend]}
      </span>
      {trendLine(read, lang)}
    </p>
  );
}

/* --- the landmark ---------------------------------------------------------- */

/**
 * The landmark printed as ink, and under it the way to its credit on /terms.
 * The licences ask for the credit where the work is used or on a page a
 * reader can reach from it; the link is that reach.
 */
export function WaterPlate({ water, lang }: { water: WaterState; lang: Lang }) {
  const pic = PICTURES[water.slug];
  return (
    <figure>
      <div className="plate relative aspect-[3/2] w-full">
        <div
          role="img"
          aria-label={pic.alt[lang]}
          className="ink-picture-lazy absolute inset-0"
          style={{ ["--picture" as string]: `url(${pic.src})` }}
        />
      </div>
      <figcaption>
        <CreditsLink lang={lang} />
      </figcaption>
    </figure>
  );
}

/* --- one water, in full ---------------------------------------------------- */

export function WaterDetail({ water, lang }: { water: WaterState; lang: Lang }) {
  const t = liveContent[lang];
  const { discharge, sky, gauge } = water;
  const slot = water.current ?? water.next;

  /* Trend and feed age exist only on a real reading. Reading them off the
     narrowed value keeps that structural: a seasonal normal carries no claim
     about what the river is doing today. */
  const read = discharge.kind === "modelled" ? discharge : null;

  return (
    /* InView marks the block on arrival: the picture is fetched then and the
       eleven bars rise from their baseline (globals.css, `.grow`). */
    <InView className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="min-w-0">
        <WaterPlate water={water} lang={lang} />

        <p className="mt-5 text-[0.95rem] leading-[1.7] text-ink2">{t.reaches[water.slug]}</p>
        {water.slug === "kaveri-talakaveri" && (
          <p className="mt-3 text-[0.95rem] leading-[1.7] text-ink2">{t.talakaveri}</p>
        )}

        <div className="mt-6">
          <FlowPanel discharge={discharge} lang={lang} />
        </div>
      </div>

      <div className="min-w-0">
        <SkyPanel sky={sky} lang={lang} />

        {/* The register, folded: the rest is one tap away. */}
        <details className="group mt-8">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-ink active:text-sindoor [&::-webkit-details-marker]:hidden">
            {t.more}
            <span aria-hidden="true" className="text-ink2 group-open:hidden">+</span>
            <span aria-hidden="true" className="hidden text-ink2 group-open:inline">−</span>
          </summary>
          <dl className="settle-panel mt-2">
            {slot && (
              <Entry term={slot.open ? t.windows.openNow : t.windows.next}>{windowLine(slot, lang)}</Entry>
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
              {read.stale ? fill(t.feed.staleNote, { days: whole(read.ageDays, lang) }) : t.feed.liveNote}
            </p>
          )}

          <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink2">{t.windows.basis}</p>
          <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink2">{t.sky.noWater}</p>
          <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink2">
            {fill(t.flow.archiveLine, {
              samples: whole(ARCHIVE.samplesPerWeek, lang),
              from: ARCHIVE.firstYear,
              to: ARCHIVE.lastYear,
            })}
          </p>
        </details>
      </div>
    </InView>
  );
}
