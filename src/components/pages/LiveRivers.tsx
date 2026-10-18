import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { waterName, windowName } from "@/content/names";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StatusBadge } from "@/components/ui";
import { RiverHorizon } from "@/components/kit";
import { H2, H3, QUIET, RefClose, RefHead, W700 } from "@/components/site/Reference";
import { Reading, cumecs, longDate, readingView } from "@/components/live/Reading";
import { getGhat } from "@/content/rivers";
import { WINDOW_BY_ID } from "@/content/muhurat";
import { fill, liveContent } from "@/content/live";
import { PICTURES } from "@/content/live/pictures";
import { LiveHero, type HeroWater } from "@/components/live/LiveHero";
import { InView } from "@/components/live/InView";
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
   /live, the free page, in v3 (spec 6.6).

   Built for a 390px viewport first, because this is a page people open at
   six in the morning on a phone:

   1. The head: one capitals headline with the rivers in sindoor, one plain
      sentence, and the feed's status line.
   2. Pick a water (LiveHero): each river as its name, state word, plain
      sentence and gauge, then the exact figure and rank in one small row
      with its source line. The full river runs below it.
   3. The six at a glance, then one block per water: the same reading, the
      trend, the usual range and the eleven model days, the sky at the ghat,
      and a fold with the register for whoever wants it.
   4. Where the numbers come from, and the one press at the end.

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
            className="grow"
            style={{ ["--i" as string]: i }}
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

/* --- the flow panel -------------------------------------------------------
   Under the reading: the usual range for this week, and the last eleven
   model days in a fold for whoever wants them. The figure itself and its
   rank sit in the reading's small row (src/components/live/Reading.tsx). */

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
    <div className="mt-8">
      <p className="text-sm text-ink2">{t.sky.label}</p>

      {/* Two cells, never four. A four-up grid reflows into two rows on a phone
          and the row-two cells lose their alignment with the page edge; two
          cells hold their shape at every width from 320px up. Air and rain live
          in the register below, where a long value can wrap. */}
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

/* --- muhurat -------------------------------------------------------------- */

function windowLine(slot: WindowSlot, lang: Lang): string {
  const t = liveContent[lang];
  const w = WINDOW_BY_ID[slot.id];
  const name = w ? windowName(slot.id, w.name, lang) : slot.id;
  const when = `${clock(slot.startsAt)} IST`;
  if (slot.open) return `${name}, ${fill(t.windows.until, { time: clock(slot.endsAt) })}`;
  return `${name}, ${when}${slot.onNextDay ? ` ${t.windows.tomorrow}` : ""}`;
}

/* --- one water ------------------------------------------------------------ */

function trendLine(read: Extract<Discharge, { kind: "modelled" }>, lang: Lang): string {
  const t = liveContent[lang];
  return read.deltaPct === null
    ? t.trendPlain[read.trend]
    : fill(t.trends[read.trend], { pct: whole(Math.abs(read.deltaPct), lang), since: t.flow.trendSince });
}

function Water({ water, lang }: { water: WaterState; lang: Lang }) {
  const t = liveContent[lang];
  const ghat = getGhat(water.slug);
  if (!ghat) return null;

  const { discharge, sky, gauge } = water;
  const slot = water.current ?? water.next;

  /* Trend exists only on a real reading. Reading it off the narrowed value
     rather than off the state keeps that structural: a seasonal normal
     carries no claim about what the river is doing today. */
  const read = discharge.kind === "modelled" ? discharge : null;

  return (
    <InView as="section" className="scroll-mt-20">
      <div id={water.slug} className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16 lg:max-w-6xl">
        {/* ------------------------------------------------------- head --- */}
        <div className="grid gap-6 sm:grid-cols-[1fr_16rem] sm:items-end lg:grid-cols-[1fr_22rem]">
          <div className="reveal min-w-0">
            <h2 className="display text-[1.75rem] leading-[1.1] text-sindoor sm:text-[2.4rem]" style={{ fontWeight: 800 }}>
              {waterName(ghat, "river", lang)}
            </h2>
            <p className="mt-1.5 text-sm text-ink2">
              {waterName(ghat, "ghat", lang)}, {waterName(ghat, "city", lang)},{" "}
              {waterName(ghat, "state", lang)}
            </p>
          </div>
          {/* The landmark, printed as ink; see src/content/live/pictures.ts. */}
          <div className="reveal plate relative aspect-[3/2] w-full" style={{ ["--i" as string]: 1 }}>
            <div
              role="img"
              aria-label={PICTURES[water.slug].alt[lang]}
              className="ink-picture-lazy absolute inset-0"
              style={{ ["--picture" as string]: `url(${PICTURES[water.slug].src})` }}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            {/* ---------------------------------------- the reading --- */}
            <Reading view={readingView(water, lang)} lang={lang} />

            {read && (
              <p className="mt-4 flex items-center gap-2.5 text-sm text-ink2">
                <span aria-hidden="true" className="text-[0.8rem] leading-none text-sindoor">
                  {CARET[read.trend]}
                </span>
                {trendLine(read, lang)}
              </p>
            )}

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

            {/* ------------------------------------------ the register ---
                Folded: the page was twenty-three screens on a phone with
                every register open. The rest is one tap away. */}
            <details className="group mt-8">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-ink active:text-sindoor [&::-webkit-details-marker]:hidden">
                {t.more}
                <span aria-hidden="true" className="text-ink2 group-open:hidden">+</span>
                <span aria-hidden="true" className="hidden text-ink2 group-open:inline">−</span>
              </summary>
              <dl className="settle-panel mt-2">
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
            </details>
          </div>
        </div>
      </div>
    </InView>
  );
}

/* --- the page ------------------------------------------------------------- */

/** The six waters as the plain strings and numbers the head of the page needs. */
function heroWaters(snapshot: LiveSnapshot, lang: Lang): HeroWater[] {
  const t = liveContent[lang];
  const out: HeroWater[] = [];
  for (const water of snapshot.waters) {
    const ghat = getGhat(water.slug);
    if (!ghat) continue;
    const d = water.discharge;
    const read = d.kind === "modelled" ? d : null;
    const slot = water.current ?? water.next;
    out.push({
      slug: water.slug,
      river: waterName(ghat, "river", lang),
      place: `${waterName(ghat, "ghat", lang)}, ${waterName(ghat, "city", lang)}`,
      view: readingView(water, lang),
      trend: read ? trendLine(read, lang) : t.feed.normalNote,
      sunrise: clock(water.sky.sunrise),
      nextWindow: slot ? windowLine(slot, lang) : null,
      href: `#${water.slug}`,
    });
  }
  return out;
}

export function LiveRivers({ lang, snapshot }: { lang: Lang; snapshot: LiveSnapshot }) {
  const t = liveContent[lang];

  /* Our own clock, labelled as ours. It is not a reading time and the copy
     beside it does not pretend it is. */
  const assembledAt = clock(istWallClock(new Date(snapshot.generatedAt)));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/live" />

      <main>
        {/* ---------------------------------------------- front matter --- */}
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.head.plain}>
          {/* The bindu is sindoor only when the feed is genuinely live. */}
          <div className="mt-3">
            <StatusBadge live={snapshot.source === "live"}>{t.badges[snapshot.source]}</StatusBadge>
          </div>
        </RefHead>

        {/* --------------------------------------------- pick a water --- */}
        <LiveHero
          lang={lang}
          waters={heroWaters(snapshot, lang)}
          labels={t.hero}
          note={`${fill(t.assembled, { time: assembledAt })} ${t.modelledEvery}`}
        />

        {/* The full river, below the reading (spec 5.6). */}
        <div className="mx-auto max-w-3xl">
          <RiverHorizon height={120} />
        </div>

        {/* ------------------------------------------------- the index --- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-14">
            <h2 className={H2} style={W700}>
              {t.index.title}
            </h2>

            <InView as="ul" className="mt-6">
              {snapshot.waters.map((water, i) => {
                const ghat = getGhat(water.slug);
                if (!ghat) return null;
                const band =
                  water.discharge.kind === "modelled" ? water.discharge.percentile.band : null;
                const trend =
                  water.discharge.kind === "modelled" ? water.discharge.trend : null;

                return (
                  <li key={water.slug} className="reveal border-b border-rule" style={{ ["--i" as string]: i }}>
                    {/* 56px minimum, so every row is a comfortable tap target. */}
                    <a
                      href={`#${water.slug}`}
                      className="flex min-h-[56px] items-center gap-4 py-3 active:text-sindoor"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="display block truncate text-[1.15rem] leading-tight text-ink" style={W700}>
                          {waterName(ghat, "river", lang)}
                        </span>
                        <span className="block text-sm text-ink2">{waterName(ghat, "city", lang)}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-right">
                        <span className="text-sm text-ink">
                          {band ? t.bandWords[band] : t.feed.normalLabel}
                        </span>
                        {trend && (
                          <span aria-hidden="true" className="text-[0.8rem] leading-none text-sindoor">
                            {CARET[trend]}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </InView>

            <p className="mt-5 text-[0.95rem] leading-[1.7] text-ink2">{t.index.note}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the waters --- */}
        {snapshot.waters.map((water) => (
          <Water key={water.slug} water={water} lang={lang} />
        ))}

        {/* -------------------------------------------- how we know it --- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className={H2} style={W700}>
              {t.provenance.heading}
            </h2>

            <div className="mt-6 space-y-5">
              {t.provenance.paras.map((para) => (
                <p key={para.slice(0, 24)} className="text-[0.98rem] leading-[1.75] text-ink2">
                  {para}
                </p>
              ))}
            </div>

            <h3 className={`${H3} mt-10`} style={W700}>
              {t.pictures.heading}
            </h3>
            <ul className="mt-3 space-y-1.5 text-[0.9rem] leading-[1.6] text-ink2">
              {snapshot.waters.map((water) => {
                const pic = PICTURES[water.slug];
                return (
                  <li key={water.slug}>
                    <a href={pic.page} className="underline decoration-rule underline-offset-4 active:text-sindoor">
                      {fill(t.pictures.credit, { subject: pic.subject[lang], author: pic.author, license: pic.license })}
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-[0.95rem] leading-[1.7] text-ink2">{t.sky.noWater}</p>

            <h3 className={`${H3} mt-12`} style={W700}>
              {t.provenance.attributionLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {t.provenance.attribution.map((line) => (
                <li key={line.slice(0, 24)} className="text-[0.9rem] leading-[1.7] text-ink2">
                  {line}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={SOURCES.discharge.modelHref} rel="noopener noreferrer external" className={QUIET}>
                  Copernicus EMS
                </a>
              </li>
              <li>
                <a href={SOURCES.discharge.href} rel="noopener noreferrer external" className={QUIET}>
                  Open-Meteo
                </a>
              </li>
              <li>
                <a href={SOURCES.registry.href} rel="noopener noreferrer external" className={QUIET}>
                  {SOURCES.registry.shortName}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-sm leading-[1.7] text-ink2">
              {fill(t.flow.archiveLine, {
                samples: whole(ARCHIVE.samplesPerWeek, lang),
                from: ARCHIVE.firstYear,
                to: ARCHIVE.lastYear,
              })}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- close --- */}
        <RefClose title={t.close.title} body={t.close.body} label={t.close.cta} href={ctaHref(lang)}>
          <ul className="mt-6">
            {(
              [
                ["/rivers", t.close.links.rivers],
                ["/muhurat", t.close.links.muhurat],
                ["/panchang", t.close.links.panchang],
              ] as const
            ).map(([path, label]) => (
              <li key={path}>
                <Link href={localePath(lang, path)} className={QUIET}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </RefClose>
      </main>

      <Footer lang={lang} />
    </>
  );
}
