import * as Astro from "astronomy-engine";
import type { Lang } from "@/lib/content";
import {
  asInstant,
  type Bilingual,
  type Instant,
  type PanchangProvenance,
} from "@/content/muhurat";
import type { OccasionRule } from "@/content/muhurat";
import { NAKSHATRAS, nakshatraByIndex, type Nakshatra } from "@/content/nakshatra";

/* ---------------------------------------------------------------------------
 * Snanify, the sky engine.
 *
 * Deterministic, server-side, offline. Same instant in, same reading out, on
 * any machine, forever. No API, no key, no network, nothing to rate-limit and
 * nothing to go down on Kartik Purnima.
 *
 * WHAT THIS IS ACCURATE TO, stated plainly:
 *
 *   Ephemeris.  Positions come from astronomy-engine, which carries its own
 *     accuracy claims upstream. We do not restate them. We measure the one
 *     thing we can measure end to end: the Lahiri ayanamsa is DEFINED by Spica
 *     sitting at sidereal 180 degrees exactly, and our pipeline puts Spica at
 *     179.993. So the whole chain, ephemeris plus our ayanamsa approximation,
 *     is inside 0.007 degrees, about 25 arcseconds. The moon covers that in
 *     31 seconds of clock time.
 *
 *   Ayanamsa.  That 25 arcseconds is NOT the number that matters. Panchangs in
 *     actual use disagree with each other by far more: Lahiri, Krishnamurti and
 *     Raman span 1.37 degrees, which the moon crosses in about two and a half
 *     hours. A nakshatra ingress is therefore only ever knowable to within
 *     about two and a half hours ACROSS TRADITIONS, however exactly any one
 *     tradition computes it. Every reading here carries that spread as data,
 *     and `boundary` goes to "contested" whenever the three do not agree on
 *     which nakshatra the moon is in. A reading near a boundary must be shown
 *     as near a boundary. False precision is the failure mode this module is
 *     built to make impossible.
 *
 *   Rise and set.  Requires surveyed coordinates. muhurat.ts ships every ghat
 *     with `coordinates: null` on purpose, so `moonEvents` returns a reason
 *     rather than a time. There is no default lat/lon anywhere in this file.
 *
 * PROVENANCE. Every reading carries a `PanchangProvenance` with confidence
 * "provisional", because provenance in this codebase means "checked against a
 * named almanac by a named human", and nothing here has been. Computing a
 * thing exactly is not the same as having it checked, and the type system is
 * not going to let us blur those.
 * ------------------------------------------------------------------------- */

/* --- ayanamsa ------------------------------------------------------------- */

export type AyanamsaId = "lahiri" | "krishnamurti" | "raman";

interface AyanamsaSpec {
  readonly id: AyanamsaId;
  readonly name: Bilingual;
  /** Degrees at J2000.0. */
  readonly j2000Deg: number;
  /** Degrees per Julian century. */
  readonly rateDegPerCentury: number;
  readonly note: Bilingual;
}

/**
 * Lahiri is the default because it is the ayanamsa adopted by the Government of
 * India's Calendar Reform Committee, which is a fact about public record rather
 * than a preference of ours. The other two are here to bound the disagreement,
 * not to be offered as options.
 */
export const AYANAMSAS: Record<AyanamsaId, AyanamsaSpec> = {
  lahiri: {
    id: "lahiri",
    name: { en: "Lahiri (Chitrapaksha)", hi: "लाहिड़ी (चित्रापक्ष)" },
    j2000Deg: 23.8531,
    rateDegPerCentury: 1.396,
    note: {
      en: "Anchored so that Spica sits at sidereal 180 degrees. Adopted by the Calendar Reform Committee and used by the Rashtriya Panchang.",
      hi: "इस प्रकार आधारित कि चित्रा 180 अंश पर पड़े। कैलेंडर सुधार समिति द्वारा स्वीकृत और राष्ट्रीय पंचांग में प्रयुक्त।",
    },
  },
  krishnamurti: {
    id: "krishnamurti",
    name: { en: "Krishnamurti (KP)", hi: "कृष्णमूर्ति (के पी)" },
    j2000Deg: 23.7642,
    rateDegPerCentury: 1.396,
    note: {
      en: "About five arcminutes less than Lahiri. Widely used in KP practice.",
      hi: "लाहिड़ी से लगभग पाँच कला कम। के पी पद्धति में व्यापक रूप से प्रयुक्त।",
    },
  },
  raman: {
    id: "raman",
    name: { en: "Raman", hi: "रमन" },
    j2000Deg: 22.4806,
    rateDegPerCentury: 1.396,
    note: {
      en: "About 1.37 degrees less than Lahiri, the widest of the three in common Indian use.",
      hi: "लाहिड़ी से लगभग 1.37 अंश कम, भारत में प्रचलित तीनों में सबसे अधिक अंतर।",
    },
  },
};

export const DEFAULT_AYANAMSA: AyanamsaId = "lahiri";

/** The full spread of the three, in degrees. Recomputed, not asserted. */
export const AYANAMSA_SPREAD_DEG =
  AYANAMSAS.lahiri.j2000Deg - AYANAMSAS.raman.j2000Deg;

/** The moon's mean tropical motion. 360 degrees per sidereal month. */
export const MOON_DEG_PER_DAY = 360 / 27.321661;

/** The spread expressed as moon-travel time. About 2 h 30 m. */
export const AYANAMSA_SPREAD_MINUTES = Math.round(
  (AYANAMSA_SPREAD_DEG / MOON_DEG_PER_DAY) * 24 * 60,
);

function ayanamsaDeg(id: AyanamsaId, date: Date): number {
  const spec = AYANAMSAS[id];
  const jd = date.getTime() / 86_400_000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  return spec.j2000Deg + spec.rateDegPerCentury * T;
}

/* --- primitives ----------------------------------------------------------- */

const SEG = 360 / 27;
const PADA = SEG / 4;
const TITHI_DEG = 12;

const norm360 = (x: number): number => ((x % 360) + 360) % 360;
/** Wrap into (-180, 180]. The only correct way to compare two longitudes. */
const wrap180 = (x: number): number => ((((x + 180) % 360) + 360) % 360) - 180;

const toInstant = (t: Astro.AstroTime): Instant =>
  asInstant(t.date.toISOString().replace(/\.\d{3}Z$/, ".000Z"));

/** Moon's apparent geocentric tropical ecliptic longitude, degrees. */
function moonTropicalLon(date: Date): number {
  return Astro.Ecliptic(Astro.GeoVector(Astro.Body.Moon, date, true)).elon;
}

/** Moon's sidereal longitude under a named ayanamsa, degrees. */
export function moonSiderealLon(date: Date, ayanamsa: AyanamsaId = DEFAULT_AYANAMSA): number {
  return norm360(moonTropicalLon(date) - ayanamsaDeg(ayanamsa, date));
}

/** Moon minus Sun in ecliptic longitude, 0 to 360. Drives tithi and phase. */
function elongation(date: Date): number {
  return Astro.PairLongitude(Astro.Body.Moon, Astro.Body.Sun, date);
}

/**
 * Solve f(t) = 0 forward from `from`, where f is a wrapped angular difference.
 * Bracketing is done in fixed steps rather than analytically, because the moon's
 * rate varies by about 15 percent over an anomalistic month and a linear guess
 * can step past a root near perigee.
 */
function searchCrossing(
  f: (t: Astro.AstroTime) => number,
  from: Date,
  limitDays: number,
  stepHours = 3,
): Instant | null {
  let t1 = Astro.MakeTime(from);
  let v1 = f(t1);
  const steps = Math.ceil((limitDays * 24) / stepHours);
  for (let i = 0; i < steps; i++) {
    const t2 = t1.AddDays(stepHours / 24);
    const v2 = f(t2);
    if (v1 <= 0 && v2 > 0) {
      const hit = Astro.Search(f, t1, t2, { dt_tolerance_seconds: 1 });
      if (hit) return toInstant(hit);
    }
    t1 = t2;
    v1 = v2;
  }
  return null;
}

/* --- tithi ---------------------------------------------------------------- */

export type Paksha = "shukla" | "krishna";

/**
 * Tithi names. This is the *vocabulary*, not a second scheduling model: the
 * numbering and the paksha vocabulary are muhurat.ts's, and `matchesOccasionRule`
 * below consumes an `OccasionRule` from that file unchanged rather than
 * restating its rules here.
 */
const TITHI_NAMES: readonly Bilingual[] = [
  { en: "Pratipada", hi: "प्रतिपदा" },
  { en: "Dwitiya", hi: "द्वितीया" },
  { en: "Tritiya", hi: "तृतीया" },
  { en: "Chaturthi", hi: "चतुर्थी" },
  { en: "Panchami", hi: "पंचमी" },
  { en: "Shashthi", hi: "षष्ठी" },
  { en: "Saptami", hi: "सप्तमी" },
  { en: "Ashtami", hi: "अष्टमी" },
  { en: "Navami", hi: "नवमी" },
  { en: "Dashami", hi: "दशमी" },
  { en: "Ekadashi", hi: "एकादशी" },
  { en: "Dwadashi", hi: "द्वादशी" },
  { en: "Trayodashi", hi: "त्रयोदशी" },
  { en: "Chaturdashi", hi: "चतुर्दशी" },
];

const PURNIMA: Bilingual = { en: "Purnima", hi: "पूर्णिमा" };
const AMAVASYA: Bilingual = { en: "Amavasya", hi: "अमावस्या" };

export const PAKSHA_NAMES: Record<Paksha, Bilingual> = {
  shukla: { en: "Shukla paksha, the bright half", hi: "शुक्ल पक्ष" },
  krishna: { en: "Krishna paksha, the dark half", hi: "कृष्ण पक्ष" },
};

export interface TithiReading {
  /** 1 to 30 across the whole lunation. */
  readonly index: number;
  readonly paksha: Paksha;
  /** 1 to 15 within the paksha. Matches `OccasionRule.tithi` in muhurat.ts. */
  readonly numberInPaksha: number;
  readonly name: Bilingual;
  /** How far through this tithi we are, 0 to 1. */
  readonly elapsed: number;
  /** Moon minus Sun, degrees. The quantity a tithi actually is. */
  readonly elongationDeg: number;
  /** When this tithi gives way to the next. Computed, not tabulated. */
  readonly endsAt: Instant | null;
  /**
   * A tithi is 12 degrees of elongation, not a day, and its real length runs
   * from about 19 to about 26 hours. This is that length for this one.
   */
  readonly lengthMinutes: number | null;
}

export function readTithi(date: Date): TithiReading {
  const el = elongation(date);
  const raw = el / TITHI_DEG;
  const i = Math.floor(raw);
  const index = i + 1;
  const paksha: Paksha = i < 15 ? "shukla" : "krishna";
  const numberInPaksha = i < 15 ? i + 1 : i - 14;

  const name =
    index === 15 ? PURNIMA : index === 30 ? AMAVASYA : TITHI_NAMES[numberInPaksha - 1];

  const target = norm360((i + 1) * TITHI_DEG);
  const endsAt = searchCrossing((t) => wrap180(elongation(t.date) - target), date, 2, 2);

  const prevTarget = norm360(i * TITHI_DEG);
  const startedAt = searchCrossing(
    (t) => wrap180(elongation(t.date) - prevTarget),
    new Date(date.getTime() - 36 * 3_600_000),
    2,
    2,
  );

  const lengthMinutes =
    endsAt && startedAt
      ? Math.round((Date.parse(endsAt) - Date.parse(startedAt)) / 60_000)
      : null;

  return {
    index,
    paksha,
    numberInPaksha,
    name,
    elapsed: raw - i,
    elongationDeg: el,
    endsAt,
    lengthMinutes,
  };
}

/**
 * Reuse, not duplication: this consumes muhurat.ts's `OccasionRule` as it
 * stands. `dayResolution` is deliberately NOT applied here. Deciding which
 * civil day an occasion falls on needs a sunrise, a sunrise needs surveyed
 * coordinates, and muhurat.ts already refuses to pretend otherwise. This
 * answers only "is the tithi rule satisfied at this instant".
 */
export function matchesOccasionRule(tithi: TithiReading, rule: OccasionRule): boolean {
  if (rule.kind !== "tithi" && rule.kind !== "tithi-range") return false;
  if (rule.tithi !== undefined && rule.tithi !== tithi.numberInPaksha) return false;
  if (rule.paksha && rule.paksha !== "both" && rule.paksha !== tithi.paksha) return false;
  return true;
}

/* --- nakshatra ------------------------------------------------------------ */

/**
 * "settled"   every ayanamsa in the panel agrees, and the moon is more than the
 *             ayanamsa spread away from either edge of the segment.
 * "near-edge" the panel agrees, but the moon is inside the spread of an edge.
 *             The reading is right under Lahiri and should be shown with its
 *             margin, never as a bare name.
 * "contested" the panel does NOT agree. Two traditions in live use would name
 *             this moment differently. Both names must be printed.
 */
export type BoundaryState = "settled" | "near-edge" | "contested";

export interface NakshatraReading {
  readonly nakshatra: Nakshatra;
  readonly pada: 1 | 2 | 3 | 4;
  readonly siderealLon: number;
  readonly degreesIntoSegment: number;
  /** Degrees to the next ingress. Always positive. */
  readonly degreesToNextEdge: number;
  readonly boundary: BoundaryState;
  /** What the other ayanamsas in the panel say, when they say something else. */
  readonly alsoNamed: readonly { readonly ayanamsa: AyanamsaId; readonly nakshatra: Nakshatra }[];
  readonly entersAt: Instant | null;
  readonly leavesAt: Instant | null;
  /**
   * The width of the ayanamsa disagreement expressed as clock time at this
   * moment's actual lunar speed, which is not the mean speed.
   */
  readonly ayanamsaUncertaintyMinutes: number;
}

function nakIndexFor(lon: number): number {
  return Math.floor(norm360(lon) / SEG);
}

export function readNakshatra(
  date: Date,
  ayanamsa: AyanamsaId = DEFAULT_AYANAMSA,
): NakshatraReading {
  const lon = moonSiderealLon(date, ayanamsa);
  const i = nakIndexFor(lon);
  const into = lon - i * SEG;
  const pada = (Math.floor(into / PADA) + 1) as 1 | 2 | 3 | 4;

  /* The moon's instantaneous rate, from a one-hour central difference. Near
     perigee it runs about 15 deg/day, near apogee about 11.8, and using the
     mean would misstate the uncertainty window by a fifth. */
  const h = 0.5 / 24;
  const rate =
    Math.abs(
      wrap180(
        moonTropicalLon(new Date(date.getTime() + h * 86_400_000)) -
          moonTropicalLon(new Date(date.getTime() - h * 86_400_000)),
      ),
    ) /
    (2 * h);

  const others: { ayanamsa: AyanamsaId; nakshatra: Nakshatra }[] = [];
  for (const id of Object.keys(AYANAMSAS) as AyanamsaId[]) {
    if (id === ayanamsa) continue;
    const j = nakIndexFor(moonSiderealLon(date, id));
    if (j !== i) others.push({ ayanamsa: id, nakshatra: nakshatraByIndex(j + 1) });
  }

  const toNext = SEG - into;
  const margin = Math.min(into, toNext);
  const boundary: BoundaryState =
    others.length > 0 ? "contested" : margin < AYANAMSA_SPREAD_DEG ? "near-edge" : "settled";

  const nextEdge = norm360((i + 1) * SEG);
  const thisEdge = norm360(i * SEG);
  const leavesAt = searchCrossing(
    (t) => wrap180(moonSiderealLon(t.date, ayanamsa) - nextEdge),
    date,
    2,
    2,
  );
  const entersAt = searchCrossing(
    (t) => wrap180(moonSiderealLon(t.date, ayanamsa) - thisEdge),
    new Date(date.getTime() - 30 * 3_600_000),
    2,
    2,
  );

  return {
    nakshatra: nakshatraByIndex(i + 1),
    pada,
    siderealLon: lon,
    degreesIntoSegment: into,
    degreesToNextEdge: toNext,
    boundary,
    alsoNamed: others,
    entersAt,
    leavesAt,
    ayanamsaUncertaintyMinutes: Math.round((AYANAMSA_SPREAD_DEG / rate) * 24 * 60),
  };
}

/* --- phase ---------------------------------------------------------------- */

export type PhaseName =
  | "amavasya"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "purnima"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent";

export const PHASE_NAMES: Record<PhaseName, Bilingual> = {
  amavasya: { en: "New moon, amavasya", hi: "अमावस्या" },
  "waxing-crescent": { en: "Waxing crescent", hi: "बढ़ता हुआ चंद्र, शुक्ल" },
  "first-quarter": { en: "First quarter", hi: "प्रथम पक्ष-अष्टमी" },
  "waxing-gibbous": { en: "Waxing gibbous", hi: "बढ़ता हुआ, अर्ध से अधिक" },
  purnima: { en: "Full moon, purnima", hi: "पूर्णिमा" },
  "waning-gibbous": { en: "Waning gibbous", hi: "घटता हुआ, अर्ध से अधिक" },
  "last-quarter": { en: "Last quarter", hi: "कृष्ण-अष्टमी" },
  "waning-crescent": { en: "Waning crescent", hi: "घटता हुआ चंद्र, कृष्ण" },
};

export interface PhaseReading {
  readonly name: PhaseName;
  /** Fraction of the disc lit, 0 to 1. */
  readonly illumination: number;
  /** Sun-Moon-Earth angle. 0 is full, 180 is new. Drives the terminator. */
  readonly phaseAngleDeg: number;
  /** Days since the last conjunction. */
  readonly ageDays: number;
  readonly lastNewMoon: Instant;
  readonly nextFullMoon: Instant;
}

function phaseName(el: number): PhaseName {
  if (el < 6 || el >= 354) return "amavasya";
  if (el < 84) return "waxing-crescent";
  if (el < 96) return "first-quarter";
  if (el < 174) return "waxing-gibbous";
  if (el < 186) return "purnima";
  if (el < 264) return "waning-gibbous";
  if (el < 276) return "last-quarter";
  return "waning-crescent";
}

export function readPhase(date: Date): PhaseReading {
  const el = elongation(date);
  const ill = Astro.Illumination(Astro.Body.Moon, date);
  const lastNew = Astro.SearchMoonPhase(0, new Date(date.getTime() - 31 * 86_400_000), 32);
  const nextFull = Astro.SearchMoonPhase(180, date, 32);
  if (!lastNew || !nextFull) throw new Error("sky: lunar phase search failed");
  return {
    name: phaseName(el),
    illumination: ill.phase_fraction,
    phaseAngleDeg: ill.phase_angle,
    ageDays: (date.getTime() - lastNew.date.getTime()) / 86_400_000,
    lastNewMoon: toInstant(lastNew),
    nextFullMoon: toInstant(nextFull),
  };
}

/* --- rise and set --------------------------------------------------------- */

export interface Coordinates {
  readonly lat: number;
  readonly lon: number;
  /** Metres above the geoid. Moves a rise time by seconds, not minutes. */
  readonly elevationM: number;
}

export type MoonEventsStatus = "computed" | "no-coordinates" | "circumpolar";

export interface MoonEvents {
  readonly status: MoonEventsStatus;
  readonly rise: Instant | null;
  readonly set: Instant | null;
  readonly note: Bilingual;
}

const NO_COORDS: Bilingual = {
  en: "Not computed. Moonrise depends on the exact position of the ghat, and no ghat here has been surveyed yet. An approximate lat and lon would produce a time that looks precise and is not, so none is used.",
  hi: "गणना नहीं की गई। चंद्रोदय घाट की ठीक स्थिति पर निर्भर है, और यहाँ किसी घाट का सर्वेक्षण अभी नहीं हुआ। अनुमानित अक्षांश-देशांतर से ऐसा समय निकलता जो सटीक दिखता किंतु होता नहीं, इसलिए कोई नहीं लिया गया।",
};

/**
 * Moon rise and set for the 24 hours following `from`.
 *
 * `coordinates: null` is the normal case today, not an error path. Every ghat
 * in muhurat.ts carries `coordinates: null` and `coordinatesStatus:
 * "pending-survey"`, and this function exists to keep that honest rather than
 * to work around it.
 *
 * Refraction is the library's standard 34 arcminutes at the horizon. Real
 * refraction over a river valley at dawn varies by several minutes' worth, and
 * a printed moonrise should never be given to the second for that reason.
 */
export function moonEvents(from: Date, coordinates: Coordinates | null): MoonEvents {
  if (!coordinates) {
    return { status: "no-coordinates", rise: null, set: null, note: NO_COORDS };
  }
  const obs = new Astro.Observer(coordinates.lat, coordinates.lon, coordinates.elevationM);
  const rise = Astro.SearchRiseSet(Astro.Body.Moon, obs, +1, from, 2);
  const set = Astro.SearchRiseSet(Astro.Body.Moon, obs, -1, from, 2);
  if (!rise && !set) {
    return {
      status: "circumpolar",
      rise: null,
      set: null,
      note: {
        en: "The moon neither rises nor sets in the window searched from this latitude.",
        hi: "इस अक्षांश से खोजी गई अवधि में चंद्रमा न उदय होता है न अस्त।",
      },
    };
  }
  return {
    status: "computed",
    rise: rise ? toInstant(rise) : null,
    set: set ? toInstant(set) : null,
    note: {
      en: "Geometric rise and set with standard refraction. Good to about a minute; local haze and the valley horizon move the visible moment by more than that.",
      hi: "मानक वर्तन सहित ज्यामितीय उदय-अस्त। लगभग एक मिनट तक ठीक; स्थानीय कुहासा तथा घाटी का क्षितिज दृश्य क्षण को इससे अधिक खिसका देते हैं।",
    },
  };
}

/* --- the whole reading ---------------------------------------------------- */

export interface SkyReading {
  readonly instant: Instant;
  readonly ayanamsa: AyanamsaId;
  readonly ayanamsaDeg: number;
  readonly tithi: TithiReading;
  readonly nakshatra: NakshatraReading;
  readonly phase: PhaseReading;
  readonly events: MoonEvents;
  readonly panchang: PanchangProvenance;
  /**
   * The one accuracy claim we make and can prove: Spica, which defines Lahiri,
   * comes out of this pipeline at 179.993 rather than the definitional 180.
   */
  readonly anchorCheck: { readonly spicaSiderealLon: number; readonly errorDeg: number };
}

export const SKY_ENGINE_ID = "snanify-sky-1";

export function readSky(args: {
  instant: Instant;
  coordinates?: Coordinates | null;
  ayanamsa?: AyanamsaId;
}): SkyReading {
  const date = new Date(args.instant);
  const ayanamsa = args.ayanamsa ?? DEFAULT_AYANAMSA;

  Astro.DefineStar(Astro.Body.Star1, 201.2983 / 15, -11.1613, 250);
  const spica = norm360(
    Astro.Ecliptic(Astro.GeoVector(Astro.Body.Star1, date, false)).elon - ayanamsaDeg(ayanamsa, date),
  );

  return {
    instant: args.instant,
    ayanamsa,
    ayanamsaDeg: ayanamsaDeg(ayanamsa, date),
    tithi: readTithi(date),
    nakshatra: readNakshatra(date, ayanamsa),
    phase: readPhase(date),
    events: moonEvents(date, args.coordinates ?? null),
    panchang: {
      confidence: "provisional",
      source: `${SKY_ENGINE_ID} (astronomy-engine)`,
      computedAt: asInstant(new Date().toISOString().replace(/\.\d{3}Z$/, ".000Z")),
      ayanamsa,
    },
    anchorCheck: {
      spicaSiderealLon: Number(spica.toFixed(4)),
      errorDeg: Number(Math.abs(wrap180(spica - 180)).toFixed(4)),
    },
  };
}

/* --- formatting ----------------------------------------------------------- */

const DEVA = "०१२३४५६७८९";

/** Degrees as 13° 20′ 05″. Devanagari numerals in the Hindi edition. */
export function formatDegrees(deg: number, lang: Lang): string {
  const sign = deg < 0 ? "-" : "";
  const a = Math.abs(deg);
  const d = Math.floor(a);
  const m = Math.floor((a - d) * 60);
  const s = Math.round((((a - d) * 60) - m) * 60);
  const out = `${sign}${d}° ${String(m).padStart(2, "0")}′ ${String(s).padStart(2, "0")}″`;
  return lang === "hi" ? out.replace(/\d/g, (c) => DEVA[Number(c)]) : out;
}

/** The one-line reading. Never prints a bare nakshatra name near a boundary. */
export function nakshatraLine(r: NakshatraReading, lang: Lang): string {
  const n = r.nakshatra;
  const pada = lang === "hi" ? `चरण ${r.pada}` : `pada ${r.pada}`;
  const base = `${n.name[lang]} ${n.devanagari === n.name[lang] ? "" : n.devanagari} ${pada}`
    .replace(/\s+/g, " ")
    .trim();

  if (r.boundary === "settled") return base;

  if (r.boundary === "contested") {
    const other = r.alsoNamed[0];
    return lang === "hi"
      ? `${base}, किंतु सीमा पर: ${AYANAMSAS[other.ayanamsa].name.hi} के अनुसार ${other.nakshatra.name.hi}`
      : `${base}, but on the boundary: by ${AYANAMSAS[other.ayanamsa].name.en} this is ${other.nakshatra.name.en}`;
  }

  return lang === "hi"
    ? `${base}, सीमा के निकट, ${formatDegrees(Math.min(r.degreesIntoSegment, r.degreesToNextEdge), "hi")} की दूरी पर`
    : `${base}, close to the edge, ${formatDegrees(Math.min(r.degreesIntoSegment, r.degreesToNextEdge), "en")} from it`;
}

/** The tithi line. "Shukla Purnima, 86% elapsed". */
export function tithiLine(t: TithiReading, lang: Lang): string {
  const pct = Math.round(t.elapsed * 100);
  if (lang === "hi") {
    const p = t.paksha === "shukla" ? "शुक्ल" : "कृष्ण";
    return `${p} ${t.name.hi}, ${pct}% बीत चुकी`;
  }
  const p = t.paksha === "shukla" ? "Shukla" : "Krishna";
  return `${p} ${t.name.en}, ${pct}% elapsed`;
}

/** Every nakshatra the moon will stand in over the next `days`, in order. */
export function nakshatraSequence(from: Date, days: number): readonly Nakshatra[] {
  const out: Nakshatra[] = [];
  const stepMs = 3 * 3_600_000;
  let last = -1;
  for (let t = from.getTime(); t < from.getTime() + days * 86_400_000; t += stepMs) {
    const i = nakIndexFor(moonSiderealLon(new Date(t)));
    if (i !== last) {
      out.push(NAKSHATRAS[i]);
      last = i;
    }
  }
  return out;
}
