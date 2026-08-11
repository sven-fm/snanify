/* ---------------------------------------------------------------------------
 * Snanify, muhurat & scheduling domain
 *
 * INVARIANT 1  Every point in time here is a UTC ISO-8601 instant ending in
 *              "Z". Wall-clock time is never stored; it is derived at render
 *              time from (instant, IANA zone).
 * INVARIANT 2  Every record that can put a date or a time on screen carries a
 *              `panchang: PanchangProvenance`. There is no way to type one
 *              without it, and `loadMuhuratData()` throws at module load if a
 *              record in the JSON is missing it. Forgetting the provenance
 *              label is meant to be a build failure, not a review comment.
 * INVARIANT 3  A Slot is only bookable when its provenance says `sourced`.
 *              `SellableSlot` narrows on that field, so a provisional slot
 *              cannot be passed where a sellable one is required. No Slot
 *              records ship in muhurat.json today, nothing is sourced yet.
 * INVARIANT 4  Brahma Muhurat starts before sunrise, so its `panchangDate`
 *              (the Hindu day, sunrise→sunrise) is the day *before* its
 *              `ghatCivilDate`. The two fields are never merged.
 * ------------------------------------------------------------------------- */

/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";
import raw from "./data/muhurat.json";

/* --- primitives ---------------------------------------------------------- */

/** ISO-8601 UTC instant, e.g. "2026-09-14T22:54:00.000Z". Always ends in "Z". */
export type Instant = string & { readonly __brand: "Instant" };

/** IANA zone id, e.g. "Asia/Kolkata". Never a raw offset like "+05:30". */
export type IanaZone = string & { readonly __brand: "IanaZone" };

/** Civil date "YYYY-MM-DD" *in some named zone*. Not an instant. */
export type CivilDate = string & { readonly __brand: "CivilDate" };

/** Gregorian month "YYYY-MM". The precision most of this calendar ships at. */
export type CivilMonth = string & { readonly __brand: "CivilMonth" };

export type Minutes = number;

export function asInstant(value: string): Instant {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) {
    throw new Error(`muhurat: "${value}" is not a UTC instant ending in Z`);
  }
  return value as Instant;
}

export function asZone(value: string): IanaZone {
  if (!value.includes("/")) throw new Error(`muhurat: "${value}" is not an IANA zone id`);
  return value as IanaZone;
}

/* --- bilingual text ------------------------------------------------------ */

/** Copy that must exist in both locales, a missing side is a type error. */
export type Bilingual = Record<Lang, string>;

export const pick = (t: Bilingual, lang: Lang): string => t[lang];

/* --- provenance ---------------------------------------------------------- */

/**
 * `provisional`, computed or asserted by us, unchecked. Must be labelled as
 *   such on every surface that renders it.
 * `sourced`    , agreed with a named almanac and signed off by a named human.
 *
 * The user-facing word is never "verified": to a devotee that reads as
 * "verified by a religious authority", which is not what any of this means.
 */
export type PanchangConfidence = "provisional" | "sourced";

export interface PanchangProvenance {
  readonly confidence: PanchangConfidence;
  /** Provider id. "PLACEHOLDER_PANCHANG_PROVIDER" until one is contracted. */
  readonly source: string;
  /** Null while nothing has actually been computed. */
  readonly computedAt: Instant | null;
  /** Null until an ayanamsa is pinned. Matters for nakshatra and ingress. */
  readonly ayanamsa: string | null;
}

/* --- ghat ---------------------------------------------------------------- */

export type GhatId =
  | "ganga-haridwar"
  | "triveni-prayagraj"
  | "yamuna-mathura"
  | "godavari-nashik"
  | "shipra-ujjain"
  | "kaveri-talakaveri";

/** Which lunar-month reckoning names the month at this place. */
export type MasaScheme = "amanta" | "purnimanta";

export interface Ghat {
  readonly id: GhatId;
  readonly river: Bilingual;
  readonly ghat: Bilingual;
  readonly city: Bilingual;
  readonly state: Bilingual;
  readonly note: Bilingual;
  readonly zone: IanaZone;
  readonly masaScheme: MasaScheme;
  /**
   * Null on purpose. Sunrise cannot be computed without surveyed coordinates,
   * and printing an approximate lat/lon as though it were a survey is the same
   * class of error as printing an unchecked tithi. Null makes it impossible.
   */
  readonly coordinates: { readonly lat: number; readonly lon: number } | null;
  readonly coordinatesStatus: "pending-survey" | "surveyed";
  /**
   * Rahu Kaal governs new undertakings; a snan is nitya karma. We show the
   * period as a fact and decline the doctrine, so the default is "warn".
   */
  readonly rahuKaalPolicy: "warn" | "veto";
  readonly windows: readonly MuhuratWindowId[];
  /** Something we are asked for at this ghat and will not do. */
  readonly refusal?: Bilingual;
}

/* --- daily windows ------------------------------------------------------- */

export type MuhuratWindowId = "brahma" | "pratah" | "abhijit" | "godhuli";

export type WindowAnchor = "sunrise" | "solar-noon" | "sunset";

/**
 * A daily window as a *rule*, not as clock times. Offsets are minutes from the
 * anchor, so the record stays true on every day of the year and at every
 * latitude, and stays honest while we have no surveyed coordinates.
 */
export interface MuhuratWindow {
  readonly id: MuhuratWindowId;
  readonly name: Bilingual;
  readonly anchor: WindowAnchor;
  readonly offsetStartMin: Minutes;
  readonly offsetEndMin: Minutes;
  readonly durationMin: Minutes;
  readonly formula: Bilingual;
  /** Why the tradition keeps this hour. Never why it converts well. */
  readonly basis: Bilingual;
  readonly note: Bilingual;
}

/* --- occasions ----------------------------------------------------------- */

export type OccasionTier = "nitya" | "punya" | "parva" | "mahaparva";

/**
 * Which panchang day the occasion falls on. This is NOT when the ceremony
 * runs, that is the window list. Mahashivratri is decided at nishita and
 * performed at dawn; merging the two fields is how an engine ends up selling
 * a midnight snan.
 */
export type DayResolution = "udaya" | "madhyahna" | "aparahna" | "pradosha" | "nishita" | "instant";

export type OccasionRuleKind = "tithi" | "tithi-range" | "solar-ingress" | "lunar-month" | "manual";

export interface OccasionRule {
  readonly kind: OccasionRuleKind;
  readonly tithi?: number;
  readonly paksha?: "shukla" | "krishna" | "both";
  readonly dayResolution: DayResolution;
  readonly label: Bilingual;
  readonly resolutionNote: Bilingual;
}

/** How precisely we are willing to state when this occasion falls. */
export type OccurrenceBasis = "recurring" | "month" | "day";

export interface Occurrence {
  readonly basis: OccurrenceBasis;
  /** Gregorian months the occasion can fall in. Empty for `recurring`. */
  readonly months: readonly CivilMonth[];
  readonly label: Bilingual;
  readonly note: Bilingual;
}

export interface OccasionGhat {
  readonly id: GhatId;
  /** Why this water, on this day. Absent where there is no real distinction. */
  readonly note?: Bilingual;
}

export interface Occasion {
  /** Route segment. Dated occasions carry the year; rules do not. */
  readonly slug: string;
  readonly occasionId: string;
  readonly tier: OccasionTier;
  readonly cadence: "monthly" | "annual" | "season";
  readonly name: Bilingual;
  readonly line: Bilingual;
  readonly about: Bilingual;
  readonly why: Bilingual;
  readonly rule: OccasionRule;
  readonly occurrence: Occurrence;
  readonly windows: readonly MuhuratWindowId[];
  readonly ghats: readonly OccasionGhat[];
  readonly ghatsNote: Bilingual;
  /** What we are explicitly NOT claiming to do on this occasion. */
  readonly notClaimed?: Bilingual;
  readonly textualBasis: Bilingual;
  readonly panchang: PanchangProvenance;
}

/* --- slot ---------------------------------------------------------------- */

export type SlotStatus = "scheduled" | "open" | "closed" | "full" | "cancelled";

/**
 * One ceremony inside one window at one ghat. Nothing in this repo produces a
 * Slot yet: a slot needs a start instant, a start instant needs a sunrise, and
 * a sunrise needs coordinates and an ephemeris we do not have.
 */
export interface Slot {
  readonly id: string;
  readonly ghatId: GhatId;
  readonly windowId: MuhuratWindowId;
  /** Hindu day, sunrise→sunrise. For `brahma`, the day before ghatCivilDate. */
  readonly panchangDate: CivilDate;
  /** Civil date in the ghat's zone at which `startsAt` falls. */
  readonly ghatCivilDate: CivilDate;
  readonly startsAt: Instant;
  readonly endsAt: Instant;
  readonly durationMin: Minutes;
  readonly status: SlotStatus;
  readonly panchang: PanchangProvenance;
}

/**
 * A slot that may be sold. The narrowing is the point: a provisional slot is
 * not assignable here, so "we accidentally sold an unchecked timing" is a
 * compile error rather than an incident.
 */
export type SellableSlot = Slot & {
  readonly panchang: PanchangProvenance & { readonly confidence: "sourced" };
};

export function isSellable(slot: Slot): slot is SellableSlot {
  return slot.panchang.confidence === "sourced";
}

/* --- loader -------------------------------------------------------------- */

export interface NamedNote {
  readonly id: string;
  readonly name: Bilingual;
  readonly text: Bilingual;
}

export interface WorkedExampleZone {
  readonly zone: IanaZone;
  readonly label: Bilingual;
}

export interface WorkedExample {
  readonly assumedSunriseIst: string;
  readonly instantUtc: Instant;
  readonly windowId: MuhuratWindowId;
  readonly zones: readonly WorkedExampleZone[];
}

export interface MuhuratData {
  readonly horizon: { readonly asOf: string; readonly from: CivilMonth; readonly to: CivilMonth };
  readonly provider: {
    readonly id: string;
    readonly displayName: Bilingual;
    readonly ayanamsa: string | null;
    readonly note: Bilingual;
  };
  readonly ghats: readonly Ghat[];
  readonly windows: readonly MuhuratWindow[];
  readonly displayedNotActedOn: readonly NamedNote[];
  readonly occasions: readonly Occasion[];
  readonly notPublished: readonly NamedNote[];
  readonly workedExample: WorkedExample;
}

function assertProvenance(where: string, p: unknown): asserts p is PanchangProvenance {
  const v = p as PanchangProvenance | undefined;
  if (!v || (v.confidence !== "provisional" && v.confidence !== "sourced")) {
    throw new Error(`muhurat: ${where} has no usable panchang provenance`);
  }
  if (v.confidence === "sourced" && (!v.computedAt || !v.ayanamsa)) {
    throw new Error(
      `muhurat: ${where} claims "sourced" without a computedAt instant and an ayanamsa`,
    );
  }
}

function load(): MuhuratData {
  const data = raw as unknown as MuhuratData;

  for (const o of data.occasions) {
    assertProvenance(`occasion "${o.slug}"`, o.panchang);
    if (o.occurrence.basis === "day") {
      throw new Error(
        `muhurat: occasion "${o.slug}" claims day-level precision, which nothing here is entitled to yet`,
      );
    }
    for (const g of o.ghats) {
      if (!data.ghats.some((gh) => gh.id === g.id)) {
        throw new Error(`muhurat: occasion "${o.slug}" references unknown ghat "${g.id}"`);
      }
    }
    for (const w of o.windows) {
      if (!data.windows.some((win) => win.id === w)) {
        throw new Error(`muhurat: occasion "${o.slug}" references unknown window "${w}"`);
      }
    }
  }

  asInstant(data.workedExample.instantUtc);
  return data;
}

export const MUHURAT: MuhuratData = load();

export const OCCASIONS = MUHURAT.occasions;
export const WINDOWS = MUHURAT.windows;
export const GHATS = MUHURAT.ghats;

export const GHAT_BY_ID: Record<string, Ghat> = Object.fromEntries(
  GHATS.map((g) => [g.id, g]),
);
export const WINDOW_BY_ID: Record<string, MuhuratWindow> = Object.fromEntries(
  WINDOWS.map((w) => [w.id, w]),
);

export function occasionBySlug(slug: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.slug === slug);
}

export const OCCASION_SLUGS: readonly string[] = OCCASIONS.map((o) => o.slug);

/** Ghat label as one line: "Ganga · Har Ki Pauri, Haridwar". */
export function ghatLabel(g: Ghat, lang: Lang): string {
  return `${g.river[lang]} · ${g.ghat[lang]}, ${g.city[lang]}`;
}

/* --- the almanac spine --------------------------------------------------- */

const MONTH_NAMES: Record<Lang, readonly string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  hi: [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
  ],
};

export function monthLabel(month: string, lang: Lang): { name: string; year: string } {
  const [y, m] = month.split("-");
  const index = Number(m) - 1;
  return { name: MONTH_NAMES[lang][index] ?? month, year: y };
}

export interface AlmanacMonth {
  readonly month: CivilMonth;
  readonly occasions: readonly Occasion[];
}

/**
 * The horizon expanded month by month, each carrying the dated occasions that
 * open in it. Months with nothing dated are kept rather than skipped, an
 * almanac shows the empty weeks too, and the monthly rhythm runs through them.
 */
export function almanacMonths(): readonly AlmanacMonth[] {
  const [fy, fm] = MUHURAT.horizon.from.split("-").map(Number);
  const [ty, tm] = MUHURAT.horizon.to.split("-").map(Number);
  const out: AlmanacMonth[] = [];

  let y = fy;
  let m = fm;
  while (y < ty || (y === ty && m <= tm)) {
    const key = `${y}-${String(m).padStart(2, "0")}` as CivilMonth;
    out.push({
      month: key,
      // An occasion is listed under the first month it can fall in, and its own
      // label carries the full range ("May-June 2027").
      occasions: OCCASIONS.filter((o) => o.occurrence.months[0] === key),
    });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

export const RECURRING_OCCASIONS = OCCASIONS.filter((o) => o.cadence === "monthly");
export const DATED_OCCASIONS = OCCASIONS.filter((o) => o.cadence !== "monthly");

/* --- the dual clock ------------------------------------------------------ */

export const GHAT_ZONE = asZone("Asia/Kolkata");

export interface FormattedTime {
  readonly zone: IanaZone;
  readonly zoneLabel: string;
  /** "Tue" / "मंगल" */
  readonly weekday: string;
  /** "15 Sep" / "15 सित" */
  readonly date: string;
  /** "4:24 am" / "प्रातः 4:24" */
  readonly time: string;
}

export interface DualClock {
  readonly ghat: FormattedTime;
  readonly viewer: FormattedTime;
  /** Viewer's calendar date relative to the ghat's: −1 behind, +1 ahead. */
  readonly dateShift: -1 | 0 | 1;
  /** One sentence naming the shift. Always present, including for 0. */
  readonly shiftNote: string;
  readonly sameZone: boolean;
}

const SHIFT_NOTE: Record<Lang, Record<"back" | "same" | "forward", string>> = {
  en: {
    back: "That is the previous day where you are.",
    same: "The same day where you are.",
    forward: "That is the next day where you are.",
  },
  hi: {
    back: "आपके यहाँ यह पिछला दिन होगा।",
    same: "आपके यहाँ भी यही दिन।",
    forward: "आपके यहाँ यह अगला दिन होगा।",
  },
};

/** Prahar words, because Hindi speakers do not read "16:24" naturally. */
function prahar(hour24: number, lang: Lang): string {
  if (lang === "en") return hour24 < 12 ? "am" : "pm";
  if (hour24 >= 4 && hour24 < 12) return "प्रातः";
  if (hour24 >= 12 && hour24 < 16) return "दोपहर";
  if (hour24 >= 16 && hour24 < 20) return "सायं";
  return "रात्रि";
}

function partsIn(instant: Instant, zone: IanaZone) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const p = Object.fromEntries(
    fmt.formatToParts(new Date(instant)).map((x) => [x.type, x.value]),
  );
  return {
    civilDate: `${p.year}-${p.month}-${p.day}`,
    hour: Number(p.hour),
    minute: Number(p.minute),
  };
}

function formatIn(instant: Instant, zone: IanaZone, zoneLabel: string, lang: Lang): FormattedTime {
  const locale = lang === "hi" ? "hi-IN" : "en-GB";
  const d = new Date(instant);
  const { hour, minute } = partsIn(instant, zone);

  const weekday = new Intl.DateTimeFormat(locale, { timeZone: zone, weekday: "short" }).format(d);
  const date = new Intl.DateTimeFormat(locale, {
    timeZone: zone,
    day: "numeric",
    month: "short",
  }).format(d);

  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = String(minute).padStart(2, "0");
  const word = prahar(hour, lang);
  const time = lang === "hi" ? `${word} ${h12}:${mm}` : `${h12}:${mm} ${word}`;

  return { zone, zoneLabel, weekday, date, time };
}

function dayDelta(a: string, b: string): number {
  const ms = Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

/**
 * Format one instant twice: at the ghat and where the reader is.
 *
 * The ghat clock is the primary reading, the rite happens at a real place at
 * a real hour, and demoting that to a parenthetical is dishonest. The viewer's
 * clock is rendered beside it, never instead of it, and the date shift is
 * spelled out in a sentence rather than left for the reader to notice. Silent
 * conversion is the one thing this function will not do.
 */
export function formatDualClock(args: {
  instant: Instant;
  viewerZone: IanaZone;
  viewerLabel: string;
  ghatLabel: string;
  lang: Lang;
  ghatZone?: IanaZone;
}): DualClock {
  const ghatZone = args.ghatZone ?? GHAT_ZONE;
  const ghat = formatIn(args.instant, ghatZone, args.ghatLabel, args.lang);
  const viewer = formatIn(args.instant, args.viewerZone, args.viewerLabel, args.lang);

  const delta = dayDelta(
    partsIn(args.instant, args.viewerZone).civilDate,
    partsIn(args.instant, ghatZone).civilDate,
  );
  const dateShift: -1 | 0 | 1 = delta < 0 ? -1 : delta > 0 ? 1 : 0;
  const key = dateShift < 0 ? "back" : dateShift > 0 ? "forward" : "same";

  return {
    ghat,
    viewer,
    dateShift,
    shiftNote: SHIFT_NOTE[args.lang][key],
    sameZone: args.viewerZone === ghatZone,
  };
}

/* --- page copy ----------------------------------------------------------- */

export const muhuratContent = {
  en: {
    meta: {
      indexTitle: "Muhurat calendar, Snanify",
      indexDescription:
        "The occasions Snanify keeps, the daily windows they are held in, and an honest account of how precisely we know when each one falls.",
      detailSuffix: "Muhurat calendar · Snanify",
    },
    nav: { back: "All occasions" },
    hero: {
      eyebrow: "The calendar",
      title: "When the water is kept.",
      lede: "Twelve months of occasions, the daily windows they are held in, and, stated in the same breath, exactly how much we know about when each one falls.",
      asOf: "Looking forward from 10 August 2026",
    },
    provenance: {
      badge: "Provisional · to be confirmed against the panchang",
      badgeShort: "Provisional",
      heading: "Where these timings come from",
      line: "No panchang provider is wired yet. Every date and every window on this page is provisional and is labelled so wherever it appears, on this list, on each occasion, and on anything we ever send you. When a provider is named and a person here has checked a sample of days against a reference almanac, the labels change and this sentence changes with them.",
      sourceLabel: "Provider",
      ayanamsaLabel: "Ayanamsa",
      coordinatesLabel: "Ghat coordinates",
      coordinatesPending: "Pending on-site survey",
      notSet: "Not yet fixed",
    },
    reading: {
      eyebrow: "How to read this",
      title: "Three things we do differently.",
      items: [
        {
          n: "01",
          t: "Months, not dates",
          d: "Where we cannot defend an exact date we print the month and the tithi rule instead. The rule is a definition and therefore a fact; the date is a computation we have not yet done. A confident wrong date is worse than an honest imprecise one.",
        },
        {
          n: "02",
          t: "Both clocks, always",
          d: "Times are given at the ghat first, because that is where the rite happens, and beside them in your own zone with the date shift written out. We never convert silently, and we never print a bare IST time and leave the arithmetic to you.",
        },
        {
          n: "03",
          t: "Sunrise to sunrise",
          d: "The Hindu day turns at sunrise, not at midnight. A window at 4:24 in the morning belongs to the panchang day that opened the previous dawn, which is the common case for our earliest window, not an edge case.",
        },
      ],
    },
    rhythm: {
      eyebrow: "Every month",
      title: "The rhythm underneath.",
      lede: "Four occasions recur on their own schedule regardless of what else the year is doing. They run through every month below, named or not.",
    },
    spine: {
      eyebrow: "The twelve months ahead",
      title: "Occasion by month.",
      empty: "No dated occasion. The monthly rhythm runs as it always does.",
      observedAt: "Kept at",
      waters: (n: number) => (n === 1 ? "1 water" : `${n} waters`),
    },
    windows: {
      eyebrow: "The daily windows",
      title: "Four hours of the day.",
      lede: "These are rules, not clock times. Each one is defined by its distance from sunrise, from the sun's transit, or from sunset, so it holds on every day of the year and at every latitude, and it stays true while we still have no surveyed coordinates to compute a sunrise from.",
      formulaLabel: "Definition",
      lengthLabel: "Length",
      basisLabel: "Why this hour",
      minutes: (n: number) => `${n} minutes`,
      diagramLabel: "A day, with the four windows marked in their order",
      diagram: { sunrise: "Sunrise", noon: "Solar transit", sunset: "Sunset" },
    },
    clock: {
      eyebrow: "Reading the clock",
      title: "One instant, six cities.",
      lede: "A window at the ghat is a single moment in time. What it is called on your wall calendar depends entirely on where you are standing, and for half the diaspora it is the previous evening.",
      atTheGhat: "At the ghat",
      elsewhere: "Elsewhere",
      illustration:
        "Illustration only. Worked from an assumed sunrise of 06:00 IST, a round number chosen to make the arithmetic legible, on a notional day. This is not a panchang date and no occasion falls on it.",
      assumed: "Assumed sunrise",
      window: "Window",
    },
    notPublished: {
      eyebrow: "What is not here",
      title: "Four things we will not print.",
      lede: "A calendar is as much what it declines to say as what it says.",
    },
    refusals: {
      eyebrow: "What we do not do",
      title: "Asked for, and refused.",
    },
    cta: {
      title: "Choose the water first.",
      lede: "The occasion matters less than the river you have a relationship with. Start there.",
      primary: "The six waters",
      secondary: "The occasion list",
    },
    detail: {
      aboutTitle: "What it is",
      whyTitle: "Why this occasion",
      whenTitle: "When it falls",
      rulePrefix: "The rule",
      resolutionPrefix: "Which day it lands on",
      watersTitle: "Which waters keep it",
      windowsTitle: "The windows offered",
      notClaimedTitle: "What this is not",
      basisTitle: "Textual basis",
      provenanceTitle: "Provenance",
      tierLabel: "Weight",
      cadenceLabel: "Returns",
      prev: "Previous",
      next: "Next",
      backToCalendar: "The whole calendar",
    },
    tiers: {
      nitya: "A daily observance",
      punya: "A recurring parva",
      parva: "A major occasion",
      mahaparva: "One of the year's great days",
    },
    cadences: {
      monthly: "Every lunar month",
      annual: "Once a year",
      season: "A season of days",
    },
    anchors: {
      sunrise: "Anchored to sunrise",
      "solar-noon": "Anchored to the sun's transit",
      sunset: "Anchored to sunset",
    },
    resolutions: {
      udaya: "Sunrise (udaya-vyapini)",
      madhyahna: "Midday (madhyahna)",
      aparahna: "The fourth part of the day (aparahna)",
      pradosha: "The hour after sunset (pradosha)",
      nishita: "True midnight (nishita kaal)",
      instant: "The instant of the crossing",
    },
  },

  hi: {
    meta: {
      indexTitle: "मुहूर्त पंचांग, स्नानिफ़ाई",
      indexDescription:
        "स्नानिफ़ाई जिन पर्वों को मानता है, जिन दैनिक बेलाओं में वे संपन्न होते हैं, और इसका स्पष्ट लेखा कि प्रत्येक की तिथि हम कितनी निश्चितता से जानते हैं।",
      detailSuffix: "मुहूर्त पंचांग · स्नानिफ़ाई",
    },
    nav: { back: "सभी पर्व" },
    hero: {
      eyebrow: "पंचांग",
      title: "जल किन दिनों में रखा जाता है।",
      lede: "आगामी बारह मास के पर्व, वे दैनिक बेलाएँ जिनमें वे संपन्न होते हैं, और उसी साँस में यह भी कि प्रत्येक की तिथि के बारे में हम वास्तव में कितना जानते हैं।",
      asOf: "10 अगस्त 2026 से आगे की गणना",
    },
    provenance: {
      badge: "अनुमानित · पंचांग से पुष्ट किया जाना शेष",
      badgeShort: "अनुमानित",
      heading: "ये समय कहाँ से आते हैं",
      line: "अभी कोई पंचांग स्रोत जुड़ा नहीं है। इस पृष्ठ की प्रत्येक तिथि और प्रत्येक बेला अनुमानित है, और जहाँ भी दिखती है वहाँ यह अंकित रहता है, इस सूची में, प्रत्येक पर्व पर, और आपको भेजे जाने वाले हर संदेश में। जब स्रोत नियुक्त हो जाएगा और यहाँ का कोई उत्तरदायी व्यक्ति कुछ तिथियों का मिलान किसी प्रामाणिक पंचांग से कर लेगा, तब ये अंकन बदलेंगे और यह वाक्य भी।",
      sourceLabel: "स्रोत",
      ayanamsaLabel: "अयनांश",
      coordinatesLabel: "घाट के अक्षांश-देशांतर",
      coordinatesPending: "स्थल सर्वेक्षण शेष",
      notSet: "अभी निश्चित नहीं",
    },
    reading: {
      eyebrow: "इसे कैसे पढ़ें",
      title: "तीन बातें, जो हम भिन्न ढंग से करते हैं।",
      items: [
        {
          n: "०१",
          t: "तारीख़ नहीं, मास",
          d: "जहाँ हम सटीक तिथि का औचित्य नहीं दे सकते, वहाँ हम मास और तिथि-नियम छापते हैं। नियम एक परिभाषा है, अतः तथ्य; तिथि वह गणना है जो हमने अभी की ही नहीं। आत्मविश्वास से दी गई ग़लत तारीख़, ईमानदार अनिश्चितता से बुरी है।",
        },
        {
          n: "०२",
          t: "दोनों घड़ियाँ, सदैव",
          d: "समय पहले घाट का दिया जाता है, क्योंकि अनुष्ठान वहीं होता है, और उसके साथ आपके समयक्षेत्र का, दिन के अंतर सहित। हम चुपचाप रूपांतरण नहीं करते, और केवल IST लिखकर गणित आप पर नहीं छोड़ते।",
        },
        {
          n: "०३",
          t: "सूर्योदय से सूर्योदय",
          d: "हिंदू दिवस मध्यरात्रि नहीं, सूर्योदय पर बदलता है। प्रातः 4:24 की बेला उस पंचांग दिवस की है जो पिछली भोर आरंभ हुआ था, और हमारी सबसे प्रारंभिक बेला के लिए यह अपवाद नहीं, सामान्य स्थिति है।",
        },
      ],
    },
    rhythm: {
      eyebrow: "प्रत्येक मास",
      title: "नीचे बहती लय।",
      lede: "चार पर्व अपने क्रम से लौटते रहते हैं, वर्ष में और चाहे जो हो। नीचे दिए प्रत्येक मास में ये चलते हैं, नाम लिए बिना भी।",
    },
    spine: {
      eyebrow: "आगामी बारह मास",
      title: "मास दर मास।",
      empty: "कोई तिथि-बद्ध पर्व नहीं। मासिक लय यथावत चलती है।",
      observedAt: "कहाँ",
      waters: (n: number) => (n === 1 ? "1 जल" : `${n} जल`),
    },
    windows: {
      eyebrow: "दैनिक बेलाएँ",
      title: "दिन के चार पहर।",
      lede: "ये नियम हैं, घड़ी के समय नहीं। प्रत्येक की परिभाषा सूर्योदय, सूर्य के मध्याह्न अथवा सूर्यास्त से उसकी दूरी है, इसलिए यह वर्ष के हर दिन और हर अक्षांश पर सही रहती है, और तब भी सत्य रहती है जब सूर्योदय की गणना के लिए हमारे पास सर्वेक्षित अक्षांश-देशांतर नहीं।",
      formulaLabel: "परिभाषा",
      lengthLabel: "अवधि",
      basisLabel: "यही बेला क्यों",
      minutes: (n: number) => `${n} मिनट`,
      diagramLabel: "एक दिन, जिसमें चारों बेलाएँ क्रम से अंकित हैं",
      diagram: { sunrise: "सूर्योदय", noon: "मध्याह्न", sunset: "सूर्यास्त" },
    },
    clock: {
      eyebrow: "घड़ी पढ़ना",
      title: "एक क्षण, छह नगर।",
      lede: "घाट की एक बेला समय का एक ही क्षण है। आपकी दीवार के कैलेंडर पर उसे क्या कहा जाएगा, यह पूरी तरह इस पर निर्भर है कि आप कहाँ खड़े हैं, और आधे प्रवासी भारतीयों के लिए वह पिछली संध्या होती है।",
      atTheGhat: "घाट पर",
      elsewhere: "अन्यत्र",
      illustration:
        "केवल उदाहरण। एक कल्पित दिन पर, प्रातः 06:00 IST के मान लिए गए सूर्योदय से गणना, यह गोल संख्या केवल गणित को स्पष्ट करने के लिए चुनी गई है। यह कोई पंचांग तिथि नहीं है और उस दिन कोई पर्व नहीं पड़ता।",
      assumed: "मान लिया गया सूर्योदय",
      window: "बेला",
    },
    notPublished: {
      eyebrow: "जो यहाँ नहीं है",
      title: "चार बातें, जो हम नहीं छापेंगे।",
      lede: "पंचांग उतना ही उससे बनता है जो वह कहने से इनकार करता है, जितना उससे जो वह कहता है।",
    },
    refusals: {
      eyebrow: "जो हम नहीं करते",
      title: "पूछा गया, और अस्वीकार किया गया।",
    },
    cta: {
      title: "पहले जल चुनिए।",
      lede: "पर्व से अधिक महत्व उस नदी का है जिससे आपका संबंध है। आरंभ वहीं से कीजिए।",
      primary: "छह पवित्र जल",
      secondary: "पर्वों की सूची",
    },
    detail: {
      aboutTitle: "यह क्या है",
      whyTitle: "यह पर्व क्यों",
      whenTitle: "कब पड़ता है",
      rulePrefix: "नियम",
      resolutionPrefix: "दिन कैसे निश्चित होता है",
      watersTitle: "कौन-से जल इसे मानते हैं",
      windowsTitle: "प्रस्तुत बेलाएँ",
      notClaimedTitle: "यह क्या नहीं है",
      basisTitle: "शास्त्रीय आधार",
      provenanceTitle: "स्रोत",
      tierLabel: "महत्व",
      cadenceLabel: "आवृत्ति",
      prev: "पिछला",
      next: "अगला",
      backToCalendar: "संपूर्ण पंचांग",
    },
    tiers: {
      nitya: "नित्य कर्म",
      punya: "आवर्ती पर्व",
      parva: "प्रमुख पर्व",
      mahaparva: "वर्ष के महापर्वों में एक",
    },
    cadences: {
      monthly: "प्रत्येक चांद्र मास",
      annual: "वर्ष में एक बार",
      season: "कई दिनों की ऋतु",
    },
    anchors: {
      sunrise: "सूर्योदय से बद्ध",
      "solar-noon": "सूर्य के मध्याह्न से बद्ध",
      sunset: "सूर्यास्त से बद्ध",
    },
    resolutions: {
      udaya: "सूर्योदय (उदयव्यापिनी)",
      madhyahna: "मध्याह्न",
      aparahna: "दिनमान का चौथा भाग (अपराह्न)",
      pradosha: "सूर्यास्त के बाद की बेला (प्रदोष)",
      nishita: "वास्तविक मध्यरात्रि (निशीथ काल)",
      instant: "राशि-प्रवेश का क्षण",
    },
  },
} satisfies Record<Lang, unknown>;

export type MuhuratCopy = (typeof muhuratContent)["en"];
