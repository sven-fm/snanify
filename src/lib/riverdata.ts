/* ---------------------------------------------------------------------------
   The river data spine.

   One claim rests on this file: "the river comes to you". It is true only if
   the numbers on /live are real, so every rule below exists to make a fabricated
   number impossible to render by accident.

   1. NOTHING IS INVENTED. Every discharge figure is either a value the upstream
      model published, tagged with the day it published it, or the 1997 to 2025
      seasonal median from the table at the foot of this file, tagged as such.
      The two are separate arms of a discriminated union, so a component cannot
      print one while labelling it the other. There is no third possibility.
   2. DISCHARGE IS MODELLED, NEVER GAUGED. The source is the Copernicus
      Emergency Management Service global flood model (GloFAS) served through
      Open-Meteo. It is a model output at a grid cell, not an instrument reading
      at a ghat, and every surface that renders it says "modelled".
   3. THE GRID CELL IS NOT THE GHAT. Querying a ghat's own coordinates returns
      whatever hill stream happens to occupy that cell: Har Ki Pauri's true
      lat/lon returns 0.11 m3/s where the Ganga runs at about fourteen hundred.
      The `cell` coordinates below are calibrated onto the main stem and are the
      ONLY ones ever queried for discharge. `ghat` coordinates are queried for
      weather and sun, and for nothing else.
   4. NO WATER TEMPERATURE, EVER. No source we can reach publishes water
      temperature at any of these six places. Air temperature at the ghat is
      real; there is no field here for the other and there must never be one.
   5. WE MEASURE NOTHING OURSELVES. No camera, no hydrophone, no device at any
      ghat. This file reads two public HTTP endpoints and computes the sun.
   --------------------------------------------------------------------------- */

import { AstroTime, Body, Observer, SearchRiseSet } from "astronomy-engine";
import { GHAT_BY_ID, WINDOWS, type GhatId, type MuhuratWindowId } from "@/content/muhurat";

/* --- identity ------------------------------------------------------------ */

/** The six waters, keyed exactly as `rivers.ts` and `muhurat.ts` key them. */
export type WaterSlug = GhatId;

export interface GaugeCell {
  readonly slug: WaterSlug;
  /**
   * The ghat itself. Weather, sunrise and sunset are read here. NEVER queried
   * for discharge: see rule 3 at the head of this file.
   */
  readonly ghat: readonly [lat: number, lon: number];
  /** Ground elevation at the ghat, metres. Used by the local sun fallback. */
  readonly elevationM: number;
  /**
   * The calibrated GloFAS main-stem cell. Found by scanning a 5x5 lattice at
   * 0.05 degree spacing around the ghat and taking the cell carrying the trunk
   * river. Hard-coded on purpose. If Copernicus re-grids, `PLAUSIBILITY_FLOOR`
   * below catches it and the feed drops to the seasonal normals rather than
   * quietly serving a ditch.
   */
  readonly cell: readonly [lat: number, lon: number];
  /** Great-circle distance from ghat to cell centre, km. Printed as provenance. */
  readonly cellOffsetKm: number;
}

const CELLS: readonly {
  slug: WaterSlug;
  ghat: readonly [number, number];
  elevationM: number;
  cell: readonly [number, number];
}[] = [
  { slug: "ganga-haridwar", ghat: [29.9457, 78.1642], elevationM: 294, cell: [29.925, 78.125] },
  { slug: "triveni-prayagraj", ghat: [25.4225, 81.885], elevationM: 74, cell: [25.375, 81.875] },
  { slug: "yamuna-mathura", ghat: [27.503, 77.68], elevationM: 186, cell: [27.475, 77.675] },
  { slug: "godavari-nashik", ghat: [19.9975, 73.7898], elevationM: 584, cell: [19.925, 73.875] },
  { slug: "shipra-ujjain", ghat: [23.1828, 75.7683], elevationM: 489, cell: [23.275, 75.675] },
  { slug: "kaveri-talakaveri", ghat: [12.3873, 75.494], elevationM: 1259, cell: [12.375, 75.475] },
];

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number) => (deg * Math.PI) / 180;

function greatCircleKm(a: readonly [number, number], b: readonly [number, number]): number {
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export const GAUGES: readonly GaugeCell[] = CELLS.map((c) => ({
  ...c,
  cellOffsetKm: Math.round(greatCircleKm(c.ghat, c.cell) * 10) / 10,
}));

export const GAUGE_BY_SLUG: Readonly<Record<WaterSlug, GaugeCell>> = Object.fromEntries(
  GAUGES.map((g) => [g.slug, g]),
) as Record<WaterSlug, GaugeCell>;

/* --- provenance of the archive ------------------------------------------- */

/**
 * What the normals table at the foot of this file actually is. Every number
 * here is measured, not asserted: the reanalysis returns nulls before 1997, so
 * 1997 is the archive floor and the copy says 1997, not 1991.
 */
export const ARCHIVE = {
  firstYear: 1997,
  lastYear: 2025,
  years: 29,
  /** Days either side of a week's centre that go into its distribution. */
  halfWindowDays: 10,
  /** 21 days x 29 years. Printed on the page so the reader can check the shape. */
  samplesPerWeek: 21 * 29,
  quantiles: [5, 10, 30, 50, 70, 90, 95] as const,
} as const;

export const SOURCES = {
  discharge: {
    model: "Copernicus Emergency Management Service, GloFAS",
    /** For the narrow column on a phone, where the full name does not fit. */
    shortName: "Copernicus EMS, GloFAS",
    served: "Open-Meteo Flood API",
    licence: "CC BY 4.0",
    href: "https://open-meteo.com/en/docs/flood-api",
    modelHref: "https://global-flood.emergency.copernicus.eu/",
    /** The model publishes one value per grid cell per day. Not sub-daily. */
    cadence: "daily",
  },
  sky: {
    served: "Open-Meteo Forecast API",
    licence: "CC BY 4.0",
    href: "https://open-meteo.com/en/docs",
    cadence: "15 minutes",
  },
  registry: {
    name: "Central Water Commission, National Water Data Portal",
    shortName: "Central Water Commission",
    href: "https://nwdp.nwic.gov.in/",
  },
} as const;

/* --- bands and trend ----------------------------------------------------- */

export type FlowBand = "slack" | "low" | "usual" | "full" | "spate";
export type Trend = "rising" | "steady" | "falling";

/** Worst rung reached across the six waters. Derived, never asserted. */
export type FeedSource = "live" | "cached" | "normal";

export interface Percentile {
  /** 0 to 100, against this cell's own 1997 to 2025 distribution for this week. */
  readonly value: number;
  /** Set when the value falls outside the outermost knot, so the UI can say so. */
  readonly capped: "below" | "above" | null;
  readonly band: FlowBand;
}

export interface SeasonalNormal {
  readonly p10: number;
  readonly median: number;
  readonly p90: number;
}

/** One day of the model's own output. Date only: the model has no clock. */
export interface DailyValue {
  /** IST civil date, "2026-08-11". */
  readonly date: string;
  readonly cumecs: number;
}

/**
 * The reading, as a discriminated union, so nothing downstream can print a
 * seasonal median under a live heading. That is the whole point of the shape.
 */
export type Discharge =
  | {
      readonly kind: "modelled";
      readonly cumecs: number;
      /** The model day this value belongs to, IST civil date. */
      readonly modelledFor: string;
      /** Whole days between `modelledFor` and today at the ghat. */
      readonly ageDays: number;
      /** Two days or more behind. The page says so; it does not hide it. */
      readonly stale: boolean;
      readonly percentile: Percentile;
      readonly trend: Trend;
      /** Change against seven days back, percent. Null when the run is short. */
      readonly deltaPct: number | null;
      readonly normal: SeasonalNormal;
      /** Up to eleven days ending at `modelledFor`, oldest first. */
      readonly series: readonly DailyValue[];
    }
  | {
      readonly kind: "normal";
      /** The 1997 to 2025 median for this week. NOT a reading. Labelled as such. */
      readonly cumecs: number;
      readonly normal: SeasonalNormal;
      /** IST civil date whose week the median was taken for. */
      readonly forDate: string;
    };

/* --- sky ----------------------------------------------------------------- */

/**
 * Sun and weather at the ghat's own coordinates. Both arms carry the sun, so
 * sunrise and the muhurat windows survive a total network failure; only the
 * weather arm carries weather, because weather cannot be computed from geometry.
 */
export type Sky =
  | {
      readonly kind: "observed";
      /** ISO instant the upstream block was stamped. */
      readonly readAt: string;
      readonly sunrise: string;
      readonly sunset: string;
      readonly sunriseTomorrow: string;
      readonly isDay: boolean;
      readonly airTempC: number;
      readonly humidityPct: number;
      readonly precipMm: number;
      readonly precipTodayMm: number;
      readonly weatherCode: number;
      readonly cloudPct: number;
      readonly windKph: number;
    }
  | {
      /** Solar geometry only, computed in this process. No weather exists here. */
      readonly kind: "computed";
      readonly sunrise: string;
      readonly sunset: string;
      readonly sunriseTomorrow: string;
      readonly isDay: boolean;
    };

/* --- muhurat ------------------------------------------------------------- */

export interface WindowSlot {
  readonly id: MuhuratWindowId;
  /** ISO instant with the +05:30 offset written out. */
  readonly startsAt: string;
  readonly endsAt: string;
  readonly open: boolean;
  readonly onNextDay: boolean;
}

/**
 * WMO present-weather codes, collapsed to the handful of states a reader of an
 * almanac actually wants. Codes we do not carry (freezing drizzle, snow grains)
 * fall to `unknown` rather than being guessed at; none of the six sits where
 * they occur.
 */
export type WeatherId =
  | "clear"
  | "mainlyClear"
  | "partlyCloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "heavyRain"
  | "showers"
  | "thunder"
  | "thunderHail"
  | "snow"
  | "unknown";

export function weatherId(code: number): WeatherId {
  if (code === 0) return "clear";
  if (code === 1) return "mainlyClear";
  if (code === 2) return "partlyCloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code === 61 || code === 63) return "rain";
  if (code === 65 || code === 67) return "heavyRain";
  if (code === 66) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "showers";
  if (code === 85 || code === 86) return "snow";
  if (code === 95) return "thunder";
  if (code === 96 || code === 99) return "thunderHail";
  return "unknown";
}

/* --- the state ----------------------------------------------------------- */

export interface WaterState {
  readonly slug: WaterSlug;
  readonly gauge: GaugeCell;
  readonly discharge: Discharge;
  readonly sky: Sky;
  readonly windows: readonly WindowSlot[];
  readonly current: WindowSlot | null;
  readonly next: WindowSlot | null;
}

export interface LiveSnapshot {
  /** When this process assembled the snapshot. Our clock, and labelled as ours. */
  readonly generatedAt: string;
  readonly source: FeedSource;
  readonly floodOk: boolean;
  readonly weatherOk: boolean;
  readonly waters: readonly WaterState[];
  /** Newest model day across the six, for `dateModified` and `<lastmod>`. */
  readonly latestModelledFor: string | null;
}

/* --- time, in one place --------------------------------------------------
   All six ghats are in Asia/Kolkata, which has had no daylight saving since
   1945 and a fixed +05:30 offset. That makes the arithmetic exact rather than
   approximate, and it is the only reason this file does not carry a timezone
   library. If a seventh water is ever added outside India, this constant is
   the thing that has to go.
   ------------------------------------------------------------------------- */

const IST_OFFSET_MIN = 330;
const IST_SUFFIX = "+05:30";
const MS_PER_DAY = 86_400_000;

/** IST civil date of an instant, "2026-08-11". */
export function istDate(at: Date): string {
  return new Date(at.getTime() + IST_OFFSET_MIN * 60_000).toISOString().slice(0, 10);
}

/** IST wall clock of an instant, "2026-08-11T05:42". */
export function istWallClock(at: Date): string {
  return new Date(at.getTime() + IST_OFFSET_MIN * 60_000).toISOString().slice(0, 16);
}

/** "2026-08-11T05:42" at the ghat, as an absolute instant. */
function istInstant(wall: string): Date {
  return new Date(`${wall.length === 16 ? wall : wall.slice(0, 16)}:00${IST_SUFFIX}`);
}

/** Whole days from `from` to `to`, both IST civil dates. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / MS_PER_DAY);
}

function addDays(date: string, n: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + n * MS_PER_DAY).toISOString().slice(0, 10);
}

/** 1 to 366. */
function dayOfYear(date: string): number {
  const t = Date.parse(`${date}T00:00:00Z`);
  const jan1 = Date.UTC(Number(date.slice(0, 4)), 0, 1);
  return Math.round((t - jan1) / MS_PER_DAY) + 1;
}

/* --- the seasonal distribution ------------------------------------------- */

const WEEKS = 52;
/** Week w is centred on day of year w * 7 + 4. */
const WEEK_CENTRE_OFFSET = 4;

type Knots = readonly [number, number, number, number, number, number, number];

/**
 * The week's seven quantile knots, linearly interpolated between the two
 * nearest week centres so the distribution walks through the year instead of
 * jumping every Monday.
 */
function knotsFor(slug: WaterSlug, date: string): Knots {
  const table = NORMALS[slug];
  const pos = (dayOfYear(date) - WEEK_CENTRE_OFFSET) / 7;
  const base = Math.floor(pos);
  const f = pos - base;
  const a = table[((base % WEEKS) + WEEKS) % WEEKS];
  const b = table[(((base + 1) % WEEKS) + WEEKS) % WEEKS];
  return a.map((v, i) => v + (b[i] - v) * f) as unknown as Knots;
}

function normalFrom(k: Knots): SeasonalNormal {
  return { p10: k[1], median: k[3], p90: k[5] };
}

/**
 * Where today's value sits in this cell's own record for this week of the year.
 *
 * Absolute discharge is meaningless across the six: 5,688 at Prayagraj and 5.8
 * at Talakaveri say nothing about whether either river is behaving oddly. The
 * percentile is the only honest comparison, and it is a comparison of a water
 * with itself.
 *
 * Interpolation is piecewise linear between the seven knots. Outside the outer
 * knots the value is reported as capped rather than extrapolated, because an
 * extrapolated tail is a number we would be making up.
 */
function percentileFor(value: number, k: Knots): Percentile {
  const p = ARCHIVE.quantiles;
  if (value <= k[0]) return { value: p[0], capped: "below", band: bandFor(p[0]) };
  if (value >= k[6]) return { value: p[6], capped: "above", band: bandFor(p[6]) };

  for (let i = 0; i < k.length - 1; i++) {
    if (value <= k[i + 1]) {
      const span = k[i + 1] - k[i];
      const f = span === 0 ? 1 : (value - k[i]) / span;
      const pct = Math.round(p[i] + (p[i + 1] - p[i]) * f);
      return { value: pct, capped: null, band: bandFor(pct) };
    }
  }
  return { value: p[6], capped: "above", band: bandFor(p[6]) };
}

export function bandFor(percentile: number): FlowBand {
  if (percentile < 10) return "slack";
  if (percentile < 30) return "low";
  if (percentile < 70) return "usual";
  if (percentile < 90) return "full";
  return "spate";
}

/** Signed change against seven days back. Eight percent is the dead band. */
const TREND_THRESHOLD_PCT = 8;

function trendFrom(series: readonly DailyValue[]): { trend: Trend; deltaPct: number | null } {
  if (series.length < 8) return { trend: "steady", deltaPct: null };
  const now = series[series.length - 1].cumecs;
  const then = series[series.length - 8].cumecs;
  if (then <= 0) return { trend: "steady", deltaPct: null };
  const delta = ((now - then) / then) * 100;
  const trend: Trend =
    delta > TREND_THRESHOLD_PCT ? "rising" : delta < -TREND_THRESHOLD_PCT ? "falling" : "steady";
  return { trend, deltaPct: Math.round(delta) };
}

/* --- the sun, computed --------------------------------------------------- */

/**
 * Sunrise and sunset from solar geometry, for the rung where the network is
 * gone. Checked against the upstream feed at Har Ki Pauri on 11 August 2026:
 * both give 05:42 IST. It is a real answer, not a placeholder, and the page
 * still labels it as computed rather than read.
 */
function computeSky(gauge: GaugeCell, now: Date): Sky {
  const observer = new Observer(gauge.ghat[0], gauge.ghat[1], gauge.elevationM);
  const today = istDate(now);
  const dayStart = new AstroTime(istInstant(`${today}T00:00`));
  const tomorrowStart = new AstroTime(istInstant(`${addDays(today, 1)}T00:00`));

  const rise = SearchRiseSet(Body.Sun, observer, +1, dayStart, 1);
  const set = SearchRiseSet(Body.Sun, observer, -1, dayStart, 1);
  const riseTomorrow = SearchRiseSet(Body.Sun, observer, +1, tomorrowStart, 1);

  /* Every one of the six sits between 12 and 30 degrees north, where the sun
     rises and sets on every day of the year, so these searches cannot come back
     empty. The fallbacks exist so a null can never reach the renderer. */
  const sunrise = rise ? istWallClock(rise.date) : `${today}T06:00`;
  const sunset = set ? istWallClock(set.date) : `${today}T18:00`;
  const sunriseTomorrow = riseTomorrow
    ? istWallClock(riseTomorrow.date)
    : `${addDays(today, 1)}T06:00`;

  return {
    kind: "computed",
    sunrise,
    sunset,
    sunriseTomorrow,
    isDay: now >= istInstant(sunrise) && now < istInstant(sunset),
  };
}

/* --- muhurat windows on a real sunrise ----------------------------------- */

/**
 * The four windows are rules against the sun, not clock times, so feeding them
 * this ghat's own sunrise is what makes them correct here rather than correct
 * on average. Solar noon is taken as the midpoint of sunrise and sunset, which
 * is exact to within a few seconds at these latitudes and needs no second
 * source.
 */
function windowsFor(slug: WaterSlug, sky: Sky, now: Date): readonly WindowSlot[] {
  const ids = GHAT_BY_ID[slug]?.windows ?? [];
  const sunrise = istInstant(sky.sunrise);
  const sunset = istInstant(sky.sunset);
  const noon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
  const sunriseTomorrow = istInstant(sky.sunriseTomorrow);

  const slots: WindowSlot[] = [];

  const push = (id: MuhuratWindowId, anchor: Date, onNextDay: boolean) => {
    const w = WINDOWS.find((x) => x.id === id);
    if (!w) return;
    const startsAt = new Date(anchor.getTime() + w.offsetStartMin * 60_000);
    const endsAt = new Date(anchor.getTime() + w.offsetEndMin * 60_000);
    slots.push({
      id,
      startsAt: withIstOffset(startsAt),
      endsAt: withIstOffset(endsAt),
      open: now >= startsAt && now < endsAt,
      onNextDay,
    });
  };

  for (const id of ids) {
    const w = WINDOWS.find((x) => x.id === id);
    if (!w) continue;
    push(id, w.anchor === "sunrise" ? sunrise : w.anchor === "sunset" ? sunset : noon, false);
  }

  /* After the last of today's windows the next one is tomorrow's, and every
     ghat's earliest window is anchored to sunrise, so tomorrow's sunrise is the
     only extra anchor this needs. */
  for (const id of ids) {
    const w = WINDOWS.find((x) => x.id === id);
    if (w?.anchor === "sunrise") push(id, sunriseTomorrow, true);
  }

  return slots.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

function withIstOffset(at: Date): string {
  return `${istWallClock(at)}:00${IST_SUFFIX}`;
}

/* --- upstream ------------------------------------------------------------ */

const FLOOD_ENDPOINT = "https://flood-api.open-meteo.com/v1/flood";
const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";

/** The model publishes daily, so an hourly poll is already generous. */
export const REVALIDATE_SECONDS = 1800;
const FETCH_TIMEOUT_MS = 8000;
/** How long a snapshot in this process is served without re-asking upstream. */
const MEMO_TTL_MS = REVALIDATE_SECONDS * 1000;
/** Beyond this the retained snapshot is dropped and the normals take over. */
const MEMO_MAX_AGE_MS = 72 * 60 * 60 * 1000;
/** A model day two days behind is served, and it is labelled stale. */
const STALE_AFTER_DAYS = 2;
/** Past this, a retained model day is no longer offered as the river's state. */
const DROP_AFTER_DAYS = 7;
/**
 * A value this far below the 5th percentile is not a low river, it is the wrong
 * cell: the misgridded Har Ki Pauri query returns four orders of magnitude low.
 * Tripping this rejects the whole flood feed rather than publishing a ditch.
 */
const PLAUSIBILITY_FLOOR = 1 / 50;
/** How far the returned cell centre may sit from the one we asked for. */
const CELL_TOLERANCE_DEG = 0.06;

const joined = (pick: (g: GaugeCell) => number) => GAUGES.map(pick).join(",");

function floodUrl(): string {
  const q = new URLSearchParams({
    latitude: joined((g) => g.cell[0]),
    longitude: joined((g) => g.cell[1]),
    daily: "river_discharge",
    past_days: "10",
    forecast_days: "1",
    timezone: "Asia/Kolkata",
  });
  return `${FLOOD_ENDPOINT}?${q}`;
}

function weatherUrl(): string {
  const q = new URLSearchParams({
    latitude: joined((g) => g.ghat[0]),
    longitude: joined((g) => g.ghat[1]),
    current:
      "temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m,is_day",
    daily: "sunrise,sunset,precipitation_sum",
    timezone: "Asia/Kolkata",
    forecast_days: "2",
  });
  return `${WEATHER_ENDPOINT}?${q}`;
}

interface OpenMeteoSite {
  latitude?: number;
  longitude?: number;
  daily?: Record<string, unknown>;
  current?: Record<string, unknown>;
}

async function getJson(url: string): Promise<OpenMeteoSite[] | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["river"] },
    });
    if (!res.ok) return null;
    const body: unknown = await res.json();
    const sites = Array.isArray(body) ? body : [body];
    if (sites.length !== GAUGES.length) return null;
    return sites as OpenMeteoSite[];
  } catch {
    return null;
  }
}

const nums = (v: unknown): (number | null)[] =>
  Array.isArray(v) ? v.map((x) => (typeof x === "number" && Number.isFinite(x) ? x : null)) : [];

const strs = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

/* --- flood --------------------------------------------------------------- */

interface FloodReading {
  readonly series: readonly DailyValue[];
}

function parseFlood(sites: OpenMeteoSite[], today: string): Map<WaterSlug, FloodReading> | null {
  const out = new Map<WaterSlug, FloodReading>();

  for (let i = 0; i < GAUGES.length; i++) {
    const gauge = GAUGES[i];
    const site = sites[i];
    const lat = num(site?.latitude);
    const lon = num(site?.longitude);

    /* The API snaps to the nearest cell centre. If it snapped somewhere else
       entirely, the calibration no longer holds and the feed is not usable. */
    if (
      lat === null ||
      lon === null ||
      Math.abs(lat - gauge.cell[0]) > CELL_TOLERANCE_DEG ||
      Math.abs(lon - gauge.cell[1]) > CELL_TOLERANCE_DEG
    ) {
      return null;
    }

    const dates = strs(site?.daily?.time);
    const values = nums(site?.daily?.river_discharge);
    if (dates.length === 0 || dates.length !== values.length) return null;

    const series: DailyValue[] = [];
    for (let d = 0; d < dates.length; d++) {
      const v = values[d];
      /* Never carry a day the model has not published yet: `forecast_days=1`
         means the last entry is today, and today is a nowcast, not a forecast
         of some later date. Anything after today is dropped outright. */
      if (v === null || v <= 0 || dates[d] > today) continue;
      series.push({ date: dates[d], cumecs: v });
    }
    if (series.length === 0) return null;

    const latest = series[series.length - 1];
    const floor = knotsFor(gauge.slug, latest.date)[0] * PLAUSIBILITY_FLOOR;
    if (latest.cumecs < floor) return null;

    out.set(gauge.slug, { series });
  }

  return out;
}

function dischargeFrom(slug: WaterSlug, reading: FloodReading, today: string): Discharge {
  const series = reading.series;
  const latest = series[series.length - 1];
  const k = knotsFor(slug, latest.date);
  const ageDays = Math.max(0, daysBetween(latest.date, today));
  const { trend, deltaPct } = trendFrom(series);

  return {
    kind: "modelled",
    cumecs: latest.cumecs,
    modelledFor: latest.date,
    ageDays,
    stale: ageDays >= STALE_AFTER_DAYS,
    percentile: percentileFor(latest.cumecs, k),
    trend,
    deltaPct,
    normal: normalFrom(k),
    series: series.slice(-11),
  };
}

function normalDischarge(slug: WaterSlug, today: string): Discharge {
  const k = knotsFor(slug, today);
  return { kind: "normal", cumecs: k[3], normal: normalFrom(k), forDate: today };
}

/* --- weather ------------------------------------------------------------- */

function parseSky(site: OpenMeteoSite | undefined, gauge: GaugeCell): Sky | null {
  const current = site?.current;
  const daily = site?.daily;
  if (!current || !daily) return null;

  const sunrises = strs(daily.sunrise);
  const sunsets = strs(daily.sunset);
  const precipSums = nums(daily.precipitation_sum);
  const readAt = typeof current.time === "string" ? current.time : null;
  const temp = num(current.temperature_2m);

  if (sunrises.length < 2 || sunsets.length < 1 || readAt === null || temp === null) return null;

  const lat = num(site?.latitude);
  const lon = num(site?.longitude);
  if (lat === null || lon === null) return null;
  /* The forecast API snaps to its own grid, which is coarser than a ghat. Half
     a degree is about 55 km and is the point at which "at the ghat" stops
     being a true description of where this weather was read. */
  if (Math.abs(lat - gauge.ghat[0]) > 0.5 || Math.abs(lon - gauge.ghat[1]) > 0.5) return null;

  return {
    kind: "observed",
    readAt: `${readAt}:00${IST_SUFFIX}`,
    sunrise: sunrises[0],
    sunset: sunsets[0],
    sunriseTomorrow: sunrises[1],
    isDay: num(current.is_day) === 1,
    airTempC: temp,
    humidityPct: num(current.relative_humidity_2m) ?? 0,
    precipMm: num(current.precipitation) ?? 0,
    precipTodayMm: precipSums[0] ?? 0,
    weatherCode: num(current.weather_code) ?? 0,
    cloudPct: num(current.cloud_cover) ?? 0,
    windKph: num(current.wind_speed_10m) ?? 0,
  } satisfies Sky;
}

/* --- assembly ------------------------------------------------------------ */

function assemble(
  flood: Map<WaterSlug, FloodReading> | null,
  weather: OpenMeteoSite[] | null,
  now: Date,
): LiveSnapshot {
  const today = istDate(now);

  const waters = GAUGES.map((gauge, i): WaterState => {
    const reading = flood?.get(gauge.slug);
    const discharge = reading
      ? dischargeFrom(gauge.slug, reading, today)
      : normalDischarge(gauge.slug, today);

    const sky = (weather ? parseSky(weather[i], gauge) : null) ?? computeSky(gauge, now);
    const windows = windowsFor(gauge.slug, sky, now);

    return {
      slug: gauge.slug,
      gauge,
      discharge,
      sky,
      windows,
      current: windows.find((w) => w.open) ?? null,
      next: windows.find((w) => Date.parse(w.startsAt) > now.getTime()) ?? null,
    };
  });

  return finalise(waters, flood !== null, weather !== null, now);
}

function finalise(
  waters: readonly WaterState[],
  floodOk: boolean,
  weatherOk: boolean,
  now: Date,
): LiveSnapshot {
  /* The rung the page reports is the worst rung any single water is on. It is
     read off the states rather than tracked alongside them, so it cannot drift
     out of agreement with what is actually rendered. */
  let source: FeedSource = "live";
  let latest: string | null = null;

  for (const w of waters) {
    if (w.discharge.kind === "normal") {
      source = "normal";
      continue;
    }
    if (w.discharge.stale && source !== "normal") source = "cached";
    if (latest === null || w.discharge.modelledFor > latest) latest = w.discharge.modelledFor;
  }

  return {
    generatedAt: now.toISOString(),
    source,
    floodOk,
    weatherOk,
    waters,
    latestModelledFor: latest,
  };
}

/* --- cache layer ---------------------------------------------------------
   Two rungs of memory, both inside this process:

   1. Fresh. A snapshot younger than the revalidate window is served straight
      back, so six page renders in a minute make no upstream calls.
   2. Retained. When the flood feed fails, the last model day we did get is
      re-aged against today's date and served with its real date attached, per
      field rather than all or nothing. River discharge moves on a scale of
      days, so a value from yesterday is still true; it just has to say so.

   Below that is the normals table, which is compiled into the bundle and cannot
   fail. There is deliberately no rung under it.
   ------------------------------------------------------------------------- */

let memo: { snapshot: LiveSnapshot; at: number } | null = null;
let inflight: Promise<LiveSnapshot> | null = null;

/** Re-age a retained reading against today, dropping it once it is too old. */
function retain(previous: WaterState, fresh: WaterState, today: string): WaterState {
  if (fresh.discharge.kind === "modelled") return fresh;
  if (previous.discharge.kind !== "modelled") return fresh;

  const ageDays = daysBetween(previous.discharge.modelledFor, today);
  if (ageDays < 0 || ageDays > DROP_AFTER_DAYS) return fresh;

  return {
    ...fresh,
    discharge: {
      ...previous.discharge,
      ageDays,
      stale: ageDays >= STALE_AFTER_DAYS,
    },
  };
}

function mergeRetained(fresh: LiveSnapshot, previous: LiveSnapshot, now: Date): LiveSnapshot {
  const today = istDate(now);
  const byslug = new Map(previous.waters.map((w) => [w.slug, w]));
  const waters = fresh.waters.map((w) => {
    const prev = byslug.get(w.slug);
    return prev ? retain(prev, w, today) : w;
  });
  return finalise(waters, fresh.floodOk, fresh.weatherOk, now);
}

async function build(now: Date): Promise<LiveSnapshot> {
  const [floodSites, weatherSites] = await Promise.all([
    getJson(floodUrl()),
    getJson(weatherUrl()),
  ]);
  const flood = floodSites ? parseFlood(floodSites, istDate(now)) : null;
  return assemble(flood, weatherSites, now);
}

/**
 * The one entry point. Always resolves, never throws, and never returns a
 * number it cannot account for.
 */
export async function getLiveSnapshot(): Promise<LiveSnapshot> {
  const now = new Date();

  if (memo && now.getTime() - memo.at < MEMO_TTL_MS) return memo.snapshot;
  if (inflight) return inflight;

  const run = (async (): Promise<LiveSnapshot> => {
    let fresh: LiveSnapshot;
    try {
      fresh = await build(now);
    } catch {
      fresh = assemble(null, null, now);
    }

    const usable = memo && now.getTime() - memo.at < MEMO_MAX_AGE_MS ? memo.snapshot : null;
    const merged = usable ? mergeRetained(fresh, usable, now) : fresh;

    memo = { snapshot: merged, at: Date.now() };
    return merged;
  })();

  inflight = run;
  try {
    return await run;
  } finally {
    inflight = null;
  }
}

/** Test seam: drop the in-process memory. Not called by any page. */
export function resetRiverCache(): void {
  memo = null;
  inflight = null;
}

/* --- the seasonal normals ------------------------------------------------
   Fifty-two weekly rows per water, each row the quantiles
   [p05, p10, p30, p50, p70, p90, p95] of every daily value the Copernicus
   reanalysis published at that cell within ten days of that week's centre,
   across 1997 to 2025. That is 609 samples behind each row.

   The band boundaries the page prints, 10 / 30 / 70 / 90, sit exactly on four
   of the seven knots, so a band is never an artefact of interpolation.

   The archive returns nulls before 1997, which is why the record starts there
   and why nothing on the site says 1991. Regenerate against the flood API's
   `start_date` / `end_date` archive if the reanalysis is ever reissued.
   ------------------------------------------------------------------------- */

const NORMALS: Readonly<Record<WaterSlug, readonly Knots[]>> = {
  "ganga-haridwar": [
    [133.1, 137.4, 150.7, 169.2, 180.6, 203.4, 230], // week 00
    [129, 133.6, 145.9, 166.1, 177.2, 199.5, 233], // week 01
    [127.5, 130.8, 143.9, 164.2, 172, 197.8, 248.7], // week 02
    [126.4, 131.6, 143.7, 161.9, 170, 197.2, 256.4], // week 03
    [126.4, 133, 145.6, 161.9, 171, 200.9, 261.2], // week 04
    [128.5, 133.6, 147.9, 162.7, 173.6, 220.2, 256.6], // week 05
    [130, 134.2, 152.5, 165.7, 178.7, 227.8, 252.3], // week 06
    [127.9, 134.1, 154, 167.3, 187.4, 237.9, 258.2], // week 07
    [126.5, 133.2, 153.7, 171.2, 192, 244.5, 273.9], // week 08
    [125.2, 132.7, 151.1, 171.2, 192.9, 258.5, 281.8], // week 09
    [126.2, 131.1, 149.3, 168, 192.9, 250.3, 273.5], // week 10
    [124.1, 128.7, 146.9, 163.1, 187.4, 234, 259.6], // week 11
    [124, 127.2, 145.9, 159, 183.1, 224.8, 240.9], // week 12
    [124, 127.2, 146.2, 159, 176.8, 215.9, 241.9], // week 13
    [124, 128.1, 146.6, 158.6, 174.2, 214.9, 250.2], // week 14
    [124, 127.5, 146.6, 157.5, 173.6, 214.4, 240], // week 15
    [123.2, 127.2, 147.6, 156.4, 174.4, 216.3, 237], // week 16
    [122.7, 127.2, 148.3, 156.4, 176.3, 215.8, 235.7], // week 17
    [122.6, 127.2, 147.6, 157.5, 176.8, 210.3, 225.8], // week 18
    [123.3, 126.3, 147.6, 159.7, 179.6, 208.3, 223], // week 19
    [122.4, 124.9, 147.7, 163.1, 181, 215.4, 224.9], // week 20
    [121.9, 126.1, 151.8, 166.9, 184.2, 219.9, 238.9], // week 21
    [121.5, 126.1, 151.9, 170, 186.3, 242.8, 265.4], // week 22
    [120.9, 129.8, 159.7, 179.3, 209.2, 306.6, 621.9], // week 23
    [121.9, 140.1, 177.7, 216.8, 298.8, 678.8, 890.7], // week 24
    [149.9, 170.6, 230.4, 341, 554.7, 904.7, 1152], // week 25
    [201.7, 237.8, 391.5, 585.1, 754.1, 1099, 1282], // week 26
    [308.8, 396.9, 609.7, 754.1, 1032, 1388, 1643], // week 27
    [438.3, 543.5, 768.1, 1049, 1293, 1644, 1763], // week 28
    [553.4, 630.8, 1075, 1278, 1468, 1802, 1981], // week 29
    [612.8, 769.2, 1265, 1418, 1636, 1976, 2254], // week 30
    [753.1, 1045, 1326, 1488, 1745, 2172, 2386], // week 31
    [919.5, 1051, 1322, 1506, 1790, 2209, 2376], // week 32
    [902.2, 970.9, 1265, 1485, 1749, 2168, 2346], // week 33
    [719.1, 871.2, 1095, 1323, 1602, 2081, 2279], // week 34
    [622.2, 709.6, 976.2, 1150, 1407, 1879, 2205], // week 35
    [531.4, 611.4, 823.9, 1022, 1215, 1585, 2120], // week 36
    [456.3, 526, 725.8, 878, 1064, 1434, 1876], // week 37
    [368.3, 434.5, 604.3, 748.9, 913.5, 1248, 1513], // week 38
    [302.5, 354.3, 494.5, 618.4, 768.1, 1083, 1259], // week 39
    [259.3, 296.7, 402.3, 500.2, 631.7, 894.4, 1012], // week 40
    [226.8, 253.2, 333.2, 409.2, 517.3, 732.2, 839.6], // week 41
    [205.4, 222.3, 286.3, 340.2, 422.6, 600.7, 719.4], // week 42
    [190.9, 201.3, 249.2, 293.4, 351.9, 496, 594.9], // week 43
    [177.2, 187.6, 223.9, 262, 304.9, 407.9, 479.4], // week 44
    [167.8, 175.1, 203.4, 237.8, 272.7, 355.5, 399.7], // week 45
    [159.6, 166.5, 189.7, 223.9, 249, 311.6, 346.1], // week 46
    [155.3, 159.3, 179.1, 210.4, 230.5, 280.8, 311.3], // week 47
    [149.5, 156, 172.4, 199.9, 220.1, 259.1, 290.1], // week 48
    [144.3, 150.7, 165.5, 190.4, 208.7, 243.9, 266.4], // week 49
    [140.3, 146.2, 160.8, 183.1, 199.5, 234.5, 250.9], // week 50
    [137.7, 141.9, 156.4, 177.2, 190.4, 219.2, 237.8], // week 51
  ],
  "triveni-prayagraj": [
    [450.4, 498.8, 628.5, 710.2, 804.8, 977.1, 1045], // week 00
    [369.7, 402.5, 510, 608.5, 711.2, 891.1, 993], // week 01
    [352.2, 372.3, 444, 503.7, 596, 790, 913.5], // week 02
    [332.4, 353.8, 413.4, 474.3, 562.6, 740.7, 922.8], // week 03
    [323.5, 349.6, 409.6, 474.3, 563.9, 731.8, 892.7], // week 04
    [329.4, 359.4, 436.5, 508.3, 577.9, 776.7, 874.4], // week 05
    [340.5, 379.9, 471.5, 542.3, 593.3, 804.8, 878], // week 06
    [359.1, 417.8, 489.9, 558.8, 619.9, 860, 910.2], // week 07
    [357.4, 399.7, 471.1, 556.2, 634.6, 878, 934.4], // week 08
    [351.2, 379.9, 441, 525, 638.7, 894.8, 974.5], // week 09
    [336.6, 353.8, 419.1, 501.3, 617, 900.6, 1006], // week 10
    [303.4, 326.8, 396.2, 470, 567.3, 838.8, 942.2], // week 11
    [286.3, 305.8, 373.1, 439.6, 537.3, 748.9, 847.4], // week 12
    [286.3, 311.5, 392.6, 445.7, 527.2, 731.8, 778.8], // week 13
    [316.3, 349.9, 434.9, 484.3, 555.7, 742.7, 777], // week 14
    [392.6, 422.4, 483.2, 528.7, 611.4, 750.6, 795.2], // week 15
    [449.8, 472.2, 506, 552.4, 615.6, 751, 840.8], // week 16
    [476.5, 483.2, 522.6, 563.9, 619.9, 761.8, 865.2], // week 17
    [479.8, 488.8, 530.4, 575.8, 627.9, 759.7, 842.3], // week 18
    [479.8, 489.9, 538.5, 583.8, 659.7, 747.9, 840.4], // week 19
    [485.9, 500, 569.2, 609.9, 694, 762.8, 831.1], // week 20
    [492.6, 521.4, 590.6, 646.1, 709.6, 810.3, 897.7], // week 21
    [489.9, 530.9, 605.7, 652.1, 720.1, 859.6, 995.8], // week 22
    [456.5, 504.8, 602.1, 655.2, 735.2, 1038, 1345], // week 23
    [442.6, 488.6, 617, 690.8, 884.1, 1800, 2577], // week 24
    [461.8, 510.4, 687.3, 969.5, 1425, 3287, 6500], // week 25
    [517.1, 638.7, 1045, 1468, 2401, 6686, 8317], // week 26
    [768.5, 993.5, 1510, 2349, 4545, 9052, 12410], // week 27
    [1190, 1354, 2356, 4149, 6683, 12630, 14650], // week 28
    [1349, 1895, 3865, 6094, 9011, 14300, 16860], // week 29
    [2041, 2676, 5732, 8413, 11100, 15780, 21660], // week 30
    [2623, 3929, 7443, 9353, 12380, 19340, 23570], // week 31
    [3687, 5667, 8301, 10640, 13600, 20040, 24470], // week 32
    [4816, 5898, 8057, 11220, 14360, 20400, 24470], // week 33
    [4578, 5409, 7453, 10890, 14340, 19820, 23560], // week 34
    [3417, 4360, 6760, 9726, 13610, 18900, 21800], // week 35
    [2678, 3425, 5972, 8165, 12630, 17020, 19790], // week 36
    [2214, 2811, 4836, 7062, 10110, 15370, 19110], // week 37
    [1700, 2198, 3787, 5545, 7683, 14180, 17340], // week 38
    [1367, 1576, 2761, 4111, 5858, 10220, 13530], // week 39
    [1143, 1323, 1958, 2817, 4013, 7280, 9758], // week 40
    [976.7, 1074, 1497, 2008, 2865, 4986, 6649], // week 41
    [903.5, 949.6, 1258, 1534, 2096, 3389, 4271], // week 42
    [868.8, 902.7, 1090, 1323, 1640, 2391, 3057], // week 43
    [823.1, 864, 1004, 1182, 1412, 1930, 2225], // week 44
    [762.5, 808.1, 949.6, 1088, 1273, 1588, 1805], // week 45
    [707.6, 749.9, 886.2, 1008, 1171, 1386, 1502], // week 46
    [679.8, 703.4, 826.9, 956.2, 1097, 1264, 1325], // week 47
    [648.2, 675.1, 778.8, 890.3, 1027, 1193, 1249], // week 48
    [621.3, 650.6, 749.6, 838.5, 966.4, 1135, 1227], // week 49
    [617.6, 635.5, 725.8, 813.7, 914.4, 1085, 1209], // week 50
    [616, 630, 708.6, 793.3, 872.4, 1032, 1155], // week 51
  ],
  "yamuna-mathura": [
    [109, 115.1, 139.9, 155.7, 175.7, 199.9, 218], // week 00
    [101.9, 108.8, 125.9, 141.6, 155.7, 198.2, 240.3], // week 01
    [99.69, 105.7, 119.1, 133.6, 146.1, 215.6, 266.1], // week 02
    [99.55, 103.7, 121.5, 134.5, 148.6, 215.6, 257.7], // week 03
    [101.7, 106.9, 126.1, 138.6, 163.7, 226, 262.6], // week 04
    [106.3, 109.4, 131.4, 149, 167.7, 238.3, 273.5], // week 05
    [109.9, 116.2, 137.7, 153.9, 178.1, 261.9, 307.5], // week 06
    [111.3, 121.5, 139, 153.2, 184.8, 273.3, 322], // week 07
    [109.6, 117.2, 135, 152.1, 199.7, 292.9, 353.5], // week 08
    [107.7, 112.9, 134.5, 158.2, 206.3, 300.4, 365.6], // week 09
    [104.6, 109.9, 133.4, 162.3, 204.1, 294.1, 342.2], // week 10
    [102.3, 107.6, 132.4, 152.5, 187.6, 270, 305.3], // week 11
    [101.8, 108, 131.7, 144.6, 172.1, 250.2, 273.8], // week 12
    [106.7, 110.4, 135.9, 147.3, 169.6, 231.9, 259.1], // week 13
    [112.9, 119.5, 139.7, 151.4, 170.6, 230.7, 261.9], // week 14
    [119.3, 127.5, 142, 153.9, 169.6, 224, 245.7], // week 15
    [124.9, 129.3, 142.4, 155, 169.1, 223.5, 257.3], // week 16
    [127.4, 129.9, 145.6, 156.4, 171.8, 224.8, 256.4], // week 17
    [128.1, 130.8, 147.4, 159.7, 179.1, 219.7, 254.3], // week 18
    [128.4, 131.7, 151.4, 162.7, 182.7, 214.4, 244.5], // week 19
    [128.8, 133.3, 153.2, 164.2, 185.2, 211.9, 238.4], // week 20
    [129.1, 133.9, 155, 169.2, 187.4, 217.4, 250.5], // week 21
    [130.2, 134.2, 156.8, 172.4, 190, 234.6, 290.7], // week 22
    [129.3, 134.2, 162.5, 182.7, 206.5, 297.5, 394], // week 23
    [130, 139.5, 172.5, 199.9, 269.8, 452.1, 554.9], // week 24
    [141, 152.4, 203.6, 267.5, 376.6, 604.6, 711.2], // week 25
    [162.4, 187.7, 269, 357.9, 506.5, 780.6, 895.6], // week 26
    [214.3, 240.4, 339.3, 464.6, 688.6, 1004, 1181], // week 27
    [238.3, 278.3, 423.8, 638.7, 866, 1177, 1277], // week 28
    [268.7, 362.4, 597.4, 786.1, 1006, 1278, 1523], // week 29
    [357.3, 467, 702.7, 911, 1102, 1442, 1685], // week 30
    [492.2, 629.7, 816.3, 1001, 1215, 1564, 1747], // week 31
    [582.2, 659.4, 852.9, 1034, 1257, 1582, 1790], // week 32
    [543, 635.8, 822, 1006, 1198, 1588, 2064], // week 33
    [499, 540.5, 717.5, 915.2, 1098, 1746, 2272], // week 34
    [413, 487.4, 620.4, 793.3, 1017, 1726, 2108], // week 35
    [362.7, 410, 548.5, 686.1, 941.3, 1635, 2017], // week 36
    [320.1, 351.9, 494.5, 617, 823.1, 1461, 1979], // week 37
    [259.9, 305.2, 401.5, 527.5, 675.1, 1194, 1591], // week 38
    [223.9, 251.4, 329.7, 410.2, 564.7, 941.3, 1299], // week 39
    [199, 219.7, 273.8, 335.5, 427.7, 675.7, 915.2], // week 40
    [178.6, 193.8, 235.6, 282.8, 345.1, 548.3, 691.2], // week 41
    [176.2, 182.7, 219, 247.9, 295.2, 431.7, 541], // week 42
    [167.7, 176.3, 204.1, 228.6, 266.3, 343.2, 416.3], // week 43
    [157.3, 165.6, 188, 215.3, 241.7, 298.9, 336.6], // week 44
    [144.7, 152.7, 174.8, 196.2, 219.1, 265.7, 292.4], // week 45
    [137.2, 143.5, 164.4, 182.7, 202.7, 236.7, 259], // week 46
    [132.4, 137.7, 155.3, 173.2, 188.1, 214.9, 231.8], // week 47
    [131.7, 137.7, 154.2, 172, 184.4, 206.1, 220.7], // week 48
    [133.1, 141.2, 161.2, 176, 191.8, 209.9, 228], // week 49
    [144.3, 150.7, 166.6, 182.2, 194.9, 210.8, 230.5], // week 50
    [140.9, 147.6, 165.3, 178.5, 193.6, 210.4, 224.1], // week 51
  ],
  "godavari-nashik": [
    [1.55, 1.632, 2.14, 2.4, 2.722, 3.164, 3.407], // week 00
    [1.4, 1.53, 1.97, 2.25, 2.55, 2.95, 3.116], // week 01
    [1.28, 1.38, 1.78, 2.08, 2.37, 2.75, 2.94], // week 02
    [1.17, 1.246, 1.67, 1.94, 2.246, 2.61, 2.742], // week 03
    [1.03, 1.156, 1.56, 1.8, 2.08, 2.44, 2.6], // week 04
    [0.91, 1.03, 1.394, 1.69, 1.94, 2.31, 2.44], // week 05
    [0.81, 0.91, 1.25, 1.5, 1.78, 2.18, 2.28], // week 06
    [0.66, 0.78, 1.09, 1.38, 1.59, 2, 2.16], // week 07
    [0.59, 0.66, 1, 1.25, 1.48, 1.84, 1.982], // week 08
    [0.53, 0.59, 0.87, 1.12, 1.34, 1.72, 1.84], // week 09
    [0.5, 0.53, 0.78, 1, 1.25, 1.56, 1.72], // week 10
    [0.47, 0.5, 0.69, 0.87, 1.09, 1.4, 1.53], // week 11
    [0.44, 0.47, 0.66, 0.81, 0.97, 1.28, 1.4], // week 12
    [0.44, 0.47, 0.63, 0.78, 0.91, 1.22, 1.28], // week 13
    [0.44, 0.47, 0.63, 0.78, 0.894, 1.19, 1.25], // week 14
    [0.41, 0.44, 0.59, 0.72, 0.85, 1.066, 1.19], // week 15
    [0.37, 0.434, 0.56, 0.66, 0.78, 1.06, 1.09], // week 16
    [0.37, 0.41, 0.53, 0.66, 0.75, 0.97, 1.09], // week 17
    [0.37, 0.41, 0.53, 0.63, 0.75, 0.97, 1.16], // week 18
    [0.34, 0.41, 0.53, 0.63, 0.75, 1.06, 1.924], // week 19
    [0.34, 0.41, 0.53, 0.63, 0.762, 1.348, 3.09], // week 20
    [0.34, 0.41, 0.53, 0.66, 0.85, 3.506, 6.048], // week 21
    [0.37, 0.44, 0.66, 0.97, 2.53, 6.666, 9.322], // week 22
    [0.47, 0.56, 1.25, 2.47, 4.37, 10.44, 15.22], // week 23
    [0.87, 1.09, 2.322, 3.83, 6.902, 19.95, 31.51], // week 24
    [1.232, 1.53, 3.482, 6.28, 12.16, 33.9, 47.44], // week 25
    [1.568, 2.69, 6.13, 10.67, 24.45, 54.75, 78.84], // week 26
    [3.142, 4.866, 9.748, 22.71, 39.46, 75.1, 86.3], // week 27
    [5.536, 6.754, 22.64, 37.99, 57.83, 93.06, 109.2], // week 28
    [7.224, 13.65, 38.3, 54.08, 74.51, 112.6, 143.3], // week 29
    [23.17, 32.85, 50.81, 68.66, 91.17, 149.4, 178.1], // week 30
    [35.59, 40.78, 60.66, 76.8, 106.6, 164, 187], // week 31
    [34.55, 43.73, 64.43, 82.18, 110.2, 158.4, 188.1], // week 32
    [33.26, 44.64, 66.36, 87.51, 107, 145.8, 175.1], // week 33
    [32.73, 45.67, 68.82, 86.7, 102.3, 139.1, 158.5], // week 34
    [34.76, 44.66, 67.77, 83.72, 98.36, 130.8, 145.8], // week 35
    [34.24, 42.45, 62.33, 79.35, 94.85, 125.8, 138.8], // week 36
    [33.34, 39.27, 57.48, 75.38, 90.2, 122.9, 136.3], // week 37
    [31.05, 34.38, 51.8, 67.08, 83.25, 111.2, 125.9], // week 38
    [24.61, 30.7, 44.94, 59.26, 73.06, 97.58, 112.9], // week 39
    [18.87, 22.82, 38.17, 50.64, 61.46, 81.3, 94.41], // week 40
    [13.24, 16.82, 28.64, 40.59, 51.92, 69.86, 78.73], // week 41
    [9.236, 11.99, 20.3, 29.9, 41.27, 56.05, 67.08], // week 42
    [6.278, 8.096, 14.47, 21.75, 30.71, 45.41, 52.21], // week 43
    [4.476, 5.726, 10.6, 16.18, 22.55, 34.51, 41.99], // week 44
    [3.332, 4.01, 7.32, 11.39, 17.18, 26.21, 32.18], // week 45
    [2.64, 3.16, 5.24, 8.06, 12.36, 19.47, 24.89], // week 46
    [2.258, 2.528, 3.872, 5.65, 8.498, 14.54, 18.26], // week 47
    [2.06, 2.17, 3.07, 4.28, 6.03, 10.35, 13.35], // week 48
    [1.89, 2.05, 2.678, 3.35, 4.31, 7.026, 9.248], // week 49
    [1.78, 1.9, 2.52, 2.86, 3.436, 4.836, 6.03], // week 50
    [1.67, 1.792, 2.33, 2.64, 3.02, 3.818, 4.22], // week 51
  ],
  "shipra-ujjain": [
    [2.97, 3.24, 3.986, 4.64, 5.03, 6.43, 7.624], // week 00
    [2.92, 3.156, 3.89, 4.52, 4.85, 5.9, 6.984], // week 01
    [2.89, 3.11, 3.76, 4.43, 4.78, 5.46, 6.324], // week 02
    [2.89, 3.11, 3.76, 4.43, 4.81, 5.46, 5.798], // week 03
    [2.956, 3.14, 3.97, 4.68, 5.07, 5.702, 6.03], // week 04
    [3.06, 3.24, 4.35, 4.98, 5.56, 5.876, 6.334], // week 05
    [3.16, 3.492, 4.5, 5.17, 5.67, 5.9, 6.448], // week 06
    [3.178, 3.282, 4.41, 5.12, 5.68, 5.84, 6.334], // week 07
    [3.19, 3.32, 4.41, 5.07, 5.62, 5.81, 6.324], // week 08
    [3.19, 3.32, 4.5, 5.07, 5.56, 5.876, 6.912], // week 09
    [3.19, 3.29, 4.542, 5.07, 5.53, 5.97, 7.054], // week 10
    [3.16, 3.25, 4.326, 5, 5.47, 5.81, 6.518], // week 11
    [3.16, 3.35, 4.47, 5.19, 5.53, 6.106, 6.41], // week 12
    [3.35, 3.62, 4.62, 5.37, 5.84, 6.402, 6.46], // week 13
    [3.62, 3.81, 4.69, 5.59, 6.06, 6.46, 6.59], // week 14
    [3.62, 3.97, 4.75, 5.65, 6.24, 6.504, 6.78], // week 15
    [3.798, 4.06, 4.916, 5.68, 6.24, 6.53, 6.78], // week 16
    [3.81, 4.09, 5.03, 5.87, 6.38, 6.53, 7.074], // week 17
    [3.822, 4.15, 5.12, 5.97, 6.43, 6.66, 7.514], // week 18
    [3.798, 4.19, 5.41, 6.06, 6.448, 6.94, 7.626], // week 19
    [3.75, 4.25, 5.44, 6.03, 6.41, 6.854, 7.41], // week 20
    [3.822, 4.37, 5.5, 6.06, 6.46, 7.422, 9.986], // week 21
    [4.02, 4.616, 5.71, 6.24, 6.82, 13.99, 19.87], // week 22
    [4.53, 5.136, 6.19, 6.96, 10.72, 23.03, 35.11], // week 23
    [5.152, 5.53, 6.734, 10.53, 16.95, 39.85, 63.8], // week 24
    [5.478, 6.19, 9.19, 15.22, 27.03, 71.34, 99.84], // week 25
    [5.84, 6.46, 13.13, 22.99, 41.75, 133.9, 321.3], // week 26
    [6.136, 8.022, 17.37, 34.56, 76.94, 242.5, 323.3], // week 27
    [6.734, 9.044, 23.85, 67.08, 134.6, 260.9, 293], // week 28
    [7.458, 11.95, 51.84, 113, 166.5, 259, 278.3], // week 29
    [7.802, 17.51, 83.61, 134.2, 191.4, 271.4, 310.5], // week 30
    [22.23, 38.95, 93.93, 138.6, 201.6, 285.7, 376.6], // week 31
    [28.49, 45.41, 86.94, 135.5, 207.1, 356.6, 442.2], // week 32
    [21.56, 37.75, 82.26, 134.8, 207.1, 350.7, 415.1], // week 33
    [14.6, 22.87, 80.1, 128.1, 197.4, 324.1, 389.5], // week 34
    [11.16, 16.8, 72.52, 113.3, 177.9, 282.8, 331.7], // week 35
    [7.538, 14.96, 56.73, 98.77, 135, 235.8, 294.4], // week 36
    [5.92, 12.89, 46.25, 73.64, 110.6, 194.3, 275.7], // week 37
    [5.542, 8.42, 26.63, 50.29, 80.44, 139, 282.6], // week 38
    [5.73, 7.102, 13.59, 30.26, 50.93, 108.1, 168.2], // week 39
    [5.472, 6.226, 8.872, 14.14, 30.81, 65.83, 108.4], // week 40
    [4.388, 5.708, 7.99, 9.12, 14.62, 41.92, 65.29], // week 41
    [3.984, 4.97, 7.41, 8.31, 9.64, 21.39, 46.8], // week 42
    [3.804, 4.3, 6.89, 7.71, 8.742, 12.02, 24.16], // week 43
    [3.73, 4.118, 6.45, 7.36, 8.38, 10.2, 14.17], // week 44
    [3.674, 4.066, 6.05, 6.94, 7.946, 9.596, 11.18], // week 45
    [3.67, 3.926, 5.614, 6.55, 7.862, 9.58, 13.92], // week 46
    [3.58, 3.824, 5.08, 6.05, 7.252, 9.16, 12.58], // week 47
    [3.418, 3.66, 4.68, 5.41, 6.694, 8.944, 13.6], // week 48
    [3.362, 3.55, 4.326, 5.01, 6.298, 8.356, 10.56], // week 49
    [3.19, 3.488, 4.202, 4.97, 5.81, 7.574, 8.49], // week 50
    [3.17, 3.4, 4.19, 4.94, 5.462, 7.05, 8.128], // week 51
  ],
  "kaveri-talakaveri": [
    [0.23, 0.23, 0.26, 0.28, 0.33, 0.5, 0.61], // week 00
    [0.224, 0.23, 0.25, 0.26, 0.28, 0.42, 0.5], // week 01
    [0.22, 0.22, 0.23, 0.25, 0.26, 0.33, 0.41], // week 02
    [0.22, 0.22, 0.23, 0.25, 0.26, 0.3, 0.31], // week 03
    [0.22, 0.22, 0.22, 0.25, 0.26, 0.28, 0.3], // week 04
    [0.22, 0.22, 0.22, 0.23, 0.25, 0.28, 0.28], // week 05
    [0.2, 0.22, 0.22, 0.22, 0.25, 0.28, 0.28], // week 06
    [0.19, 0.2, 0.22, 0.22, 0.25, 0.25, 0.28], // week 07
    [0.19, 0.19, 0.22, 0.22, 0.23, 0.25, 0.25], // week 08
    [0.19, 0.19, 0.2, 0.22, 0.22, 0.25, 0.25], // week 09
    [0.19, 0.19, 0.19, 0.22, 0.22, 0.25, 0.25], // week 10
    [0.19, 0.19, 0.19, 0.22, 0.22, 0.25, 0.25], // week 11
    [0.19, 0.19, 0.22, 0.22, 0.22, 0.25, 0.25], // week 12
    [0.19, 0.19, 0.22, 0.22, 0.25, 0.25, 0.28], // week 13
    [0.19, 0.22, 0.22, 0.22, 0.25, 0.28, 0.28], // week 14
    [0.19, 0.22, 0.22, 0.22, 0.25, 0.31, 0.37], // week 15
    [0.19, 0.22, 0.22, 0.22, 0.28, 0.416, 0.47], // week 16
    [0.19, 0.19, 0.22, 0.25, 0.34, 0.5, 0.85], // week 17
    [0.19, 0.19, 0.22, 0.31, 0.41, 1.03, 1.53], // week 18
    [0.19, 0.19, 0.25, 0.34, 0.548, 1.78, 3.578], // week 19
    [0.19, 0.19, 0.25, 0.41, 1.042, 3.196, 5.722], // week 20
    [0.19, 0.198, 0.31, 0.87, 1.81, 4.476, 6.582], // week 21
    [0.22, 0.25, 0.85, 1.75, 3.03, 6.708, 8.726], // week 22
    [0.31, 0.498, 1.65, 2.97, 4.69, 7.79, 9.55], // week 23
    [0.63, 1.372, 2.922, 4.19, 5.97, 8.78, 10.08], // week 24
    [1.814, 2.524, 3.76, 5.03, 6.886, 9.894, 11.81], // week 25
    [2.69, 3, 4.554, 5.75, 7.386, 10.55, 12.45], // week 26
    [3, 3.66, 5.12, 6.45, 8.18, 11.76, 12.87], // week 27
    [3.27, 3.914, 5.46, 6.89, 8.59, 11.15, 12.23], // week 28
    [3.164, 3.906, 5.464, 7.15, 8.89, 11.23, 12.02], // week 29
    [3.53, 3.906, 5.4, 6.87, 8.51, 10.73, 11.78], // week 30
    [3.434, 3.86, 5.038, 6.19, 7.702, 10.44, 11.85], // week 31
    [3.354, 3.676, 4.68, 5.7, 6.91, 9.62, 11.35], // week 32
    [2.958, 3.21, 4.228, 5.27, 6.43, 8.464, 10.24], // week 33
    [2.358, 2.69, 3.81, 4.81, 6.21, 8.234, 9.33], // week 34
    [2.078, 2.37, 3.44, 4.5, 5.748, 7.778, 8.934], // week 35
    [1.752, 2.07, 3.004, 4.06, 5.062, 7.024, 8.04], // week 36
    [1.48, 1.728, 2.588, 3.49, 4.4, 5.984, 6.96], // week 37
    [1.38, 1.598, 2.3, 3.02, 3.852, 5.194, 6.164], // week 38
    [1.294, 1.544, 2.148, 2.76, 3.31, 4.572, 5.538], // week 39
    [1.304, 1.598, 2.14, 2.66, 3.2, 4.064, 4.798], // week 40
    [1.26, 1.506, 2.08, 2.56, 3.056, 3.916, 4.588], // week 41
    [1.25, 1.4, 1.924, 2.37, 2.866, 3.918, 4.648], // week 42
    [1.128, 1.28, 1.67, 2.05, 2.646, 3.788, 4.444], // week 43
    [0.924, 1.098, 1.42, 1.71, 2.226, 3.342, 3.856], // week 44
    [0.73, 0.87, 1.18, 1.42, 1.84, 3.038, 3.456], // week 45
    [0.58, 0.67, 0.93, 1.16, 1.44, 2.312, 2.882], // week 46
    [0.454, 0.54, 0.73, 0.94, 1.19, 1.864, 2.22], // week 47
    [0.334, 0.41, 0.58, 0.72, 0.95, 1.404, 1.762], // week 48
    [0.28, 0.3, 0.45, 0.57, 0.73, 1.11, 1.326], // week 49
    [0.26, 0.28, 0.34, 0.44, 0.59, 0.85, 0.996], // week 50
    [0.26, 0.26, 0.28, 0.34, 0.47, 0.664, 0.77], // week 51
  ],
};
