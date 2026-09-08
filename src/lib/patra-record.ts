import type { SkyReading } from "@/lib/sky";
import type { Discharge, WaterState } from "@/lib/riverdata";
import { SOURCES } from "@/lib/riverdata";
import type { FlowBand } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   What a sitting freezes.

   A Sankalp Patra has to render in five years exactly as it rendered on the
   morning it was kept: after the person changed their portrait, after the
   flood model revised that day's figure, after this code was rewritten. So a
   sitting stores its own copies of the river and the sky rather than joining
   to anything at read time, and these two types are the shape of those copies.

   THEY ARE A NARROWER THING THAN WHAT THEY COME FROM. `WaterState` carries
   eleven days of series, seasonal normals and a weather block; a sheet needs
   the flow, where it sits against twenty-nine years, the day the model
   published for, and who published it. Storing less means less to migrate and
   nothing on the row that the sheet does not print.

   EVERY FIGURE KEEPS ITS PROVENANCE. `kind` says whether this is a model day
   or the seasonal median standing in for one, and the sheet prints that
   distinction rather than flattening it. A Patra that cannot say where its
   number came from is not checkable, and checkable is the whole product.
   --------------------------------------------------------------------------- */

export type RiverSlice = {
  /** "modelled" for a published model day, "normal" for the seasonal median. */
  kind: Discharge["kind"];
  /** Cubic metres per second. Two decimals, as the sheet prints it. */
  cumecs: number;
  /** The model day, IST civil date. Absent when standing on the median. */
  modelledFor: string | null;
  /** Whole days between the model day and the morning kept. */
  ageDays: number | null;
  /** Rank against this cell's own 1997 to 2025 distribution for this week. */
  percentile: number | null;
  band: FlowBand;
  /** The 1997 to 2025 median for this week, always, as the figure to read against. */
  median: number;
  /** Who published it, printed on the sheet beside the number. */
  source: string;
  /** The calibrated grid cell, so a reader can fetch the same number. */
  cell: [lat: number, lon: number];
};

export type SkySlice = {
  /** "Shukla Ekadashi", already composed. */
  tithi: string;
  paksha: string;
  tithiIndex: number;
  nakshatra: string;
  nakshatraPada: number;
  /** Whether the reading sits near a boundary, so the sheet can say so. */
  boundary: string;
  /** Percent illuminated, rounded. */
  moonPct: number;
  phase: string;
  sunrise: string | null;
  sunset: string | null;
};

/** Two decimals, the figure the seed is computed from and the sheet prints. */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function riverSlice(water: WaterState): RiverSlice {
  const d = water.discharge;

  if (d.kind === "modelled") {
    return {
      kind: "modelled",
      cumecs: round2(d.cumecs),
      modelledFor: d.modelledFor,
      ageDays: d.ageDays,
      percentile: Math.round(d.percentile.value),
      band: d.percentile.band,
      median: round2(d.normal.median),
      source: SOURCES.discharge.model,
      cell: [water.gauge.cell[0], water.gauge.cell[1]],
    };
  }

  /* The feed was quiet. The sheet stands on the twenty-nine year median for
     this week and says so, rather than on a number nobody published. */
  return {
    kind: "normal",
    cumecs: round2(d.cumecs),
    modelledFor: null,
    ageDays: null,
    percentile: null,
    band: "usual",
    median: round2(d.normal.median),
    source: SOURCES.discharge.model,
    cell: [water.gauge.cell[0], water.gauge.cell[1]],
  };
}

export function skySlice(sky: SkyReading, water: WaterState): SkySlice {
  const sun = water.sky;

  return {
    tithi: sky.tithi.name.en,
    paksha: sky.tithi.paksha,
    tithiIndex: sky.tithi.index,
    nakshatra: sky.nakshatra.nakshatra.name.en,
    nakshatraPada: sky.nakshatra.pada,
    boundary: sky.nakshatra.boundary,
    moonPct: Math.round(sky.phase.illumination * 100),
    phase: sky.phase.name,
    sunrise: sun.kind === "observed" ? sun.sunrise : (sun.sunrise ?? null),
    sunset: sun.kind === "observed" ? sun.sunset : (sun.sunset ?? null),
  };
}

/**
 * The figure the seed stands on.
 *
 * Always the number printed on the sheet, whichever arm it came from, because
 * a reader recomputing the seed has only what the sheet shows them.
 */
export function seedFigure(slice: RiverSlice): number {
  return slice.cumecs;
}

/**
 * The day the seed is keyed to: the model day when there is one, and the
 * morning's own IST date when the sheet stands on the seasonal median.
 */
export function seedDay(slice: RiverSlice, istToday: string): string {
  return slice.modelledFor ?? istToday;
}
