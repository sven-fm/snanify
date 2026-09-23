import * as Astro from "astronomy-engine";
import { OCCASIONS, type MasaName, type Occasion } from "@/content/muhurat";
import { GAUGES, type WaterSlug } from "@/lib/riverdata";
import { ayanamsaDeg, tithiAt, DEFAULT_AYANAMSA, type AyanamsaId } from "@/lib/sky";

/* ---------------------------------------------------------------------------
   The calendar day each occasion falls on, computed.

   src/content/data/muhurat.json carries every occasion as a rule and refuses
   to carry a date, on purpose: a rule is a definition and a typed date is a
   claim. This module turns the rules into dates, at a named ghat's own
   sunrise, for a rolling horizon, so the pages can print "Kartik Purnima,
   Tuesday 24 November 2026" and mean it.

   WHAT A DAY IS. A tithi is twelve degrees of the moon's lead over the sun
   and runs for anything from twenty to twenty-six hours, so it is pinned to
   a civil day by a rule. Udaya: the tithi running at that day's sunrise.
   Nishita: the tithi running at that day's local midnight, the midpoint of
   sunset and the next sunrise, which is how Mahashivratri is kept. Sunrise
   here is astronomy-engine's, at the ghat's surveyed coordinates and
   elevation, the same call src/lib/riverdata.ts checked against Drik Panchang
   on 11 September 2026.

   WHAT A LUNAR MONTH IS. An amanta month runs from one new moon to the next
   and is named after the sign the sun enters during it: the month holding
   Mesha sankranti is Chaitra, and so on round to Phalguna. A month holding no
   sankranti is adhika, an extra month with the next month's name, and the
   dated rules name their month so that Mahashivratri lands in Magha and not
   in the dark fortnight before it. Kartik snan and Magh snan are purnimanta
   months, from the day after one full moon to the next; Pitru Paksha is the
   dark fortnight of Bhadrapada, from the day after its full moon to the new
   moon that ends it.

   WHAT A KSHAYA TITHI IS. A tithi shorter than a day can begin after one
   sunrise and end before the next, touching neither. It is still kept, on
   the civil day it ran through; without that rule December's full moon went
   missing from the list.

   WHAT A SANKRANTI IS: the instant the sun's sidereal longitude, under the
   Lahiri ayanamsa, enters a sign. The civil date is that instant's date in
   India. Makar and Tula are the two named ones; "sankranti" itself lists all
   twelve.

   Every answer carries the ghat it was computed for. Tithi ends do not move
   with the place, but a sunrise does, and on a morning when a tithi ends
   within an hour of dawn two ghats can name different days. That is the
   panchang's own behaviour, not a defect, and the page says which ghat.
   --------------------------------------------------------------------------- */

export type ResolvedKind = "day" | "span" | "instant";

export type ResolvedDate = {
  readonly slug: string;
  readonly ghat: WaterSlug;
  readonly kind: ResolvedKind;
  /** The civil date in India, "2026-11-24". For a span, its first day. */
  readonly date: string;
  /** A span's last day. */
  readonly to?: string;
  /** A sankranti's exact moment, ISO. */
  readonly instant?: string;
};

/** How the dates were made. Printed beside them. */
export const RESOLVER = {
  ayanamsa: DEFAULT_AYANAMSA as AyanamsaId,
  ayanamsaName: { en: "Lahiri (Chitrapaksha)", hi: "लाहिड़ी (चित्रापक्ष)" },
  source: "computed-checked-drik-panchang-2026-09",
} as const;

const DAY_MS = 86_400_000;

/* --- the civil day in India ------------------------------------------- */

const IST = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function istDay(at: Date): string {
  return IST.format(at);
}

/** IST midnight at the start of a civil day, as an instant. */
function istMidnight(day: string): Date {
  return new Date(`${day}T00:00:00+05:30`);
}

function addDays(day: string, n: number): string {
  return istDay(new Date(istMidnight(day).getTime() + 12 * 3_600_000 + n * DAY_MS));
}

function observerFor(ghat: WaterSlug): Astro.Observer {
  const g = GAUGES.find((x) => x.slug === ghat) ?? GAUGES[0];
  return new Astro.Observer(g.ghat[0], g.ghat[1], g.elevationM);
}

/* --- the sun at a ghat --------------------------------------------------- */

function sunriseOn(day: string, obs: Astro.Observer): Date {
  const start = new Astro.AstroTime(istMidnight(day));
  const rise = Astro.SearchRiseSet(Astro.Body.Sun, obs, +1, start, 1);
  /* Every ghat sits between 12 and 30 degrees north; the sun rises on every
     day of the year there. The fallback is for the type system, not the sky. */
  return rise ? rise.date : new Date(istMidnight(day).getTime() + 6 * 3_600_000);
}

function sunsetOn(day: string, obs: Astro.Observer): Date {
  const start = new Astro.AstroTime(istMidnight(day));
  const set = Astro.SearchRiseSet(Astro.Body.Sun, obs, -1, start, 1);
  return set ? set.date : new Date(istMidnight(day).getTime() + 18 * 3_600_000);
}

/** Nishita: the middle of the night that begins on `day`. */
function nishitaOn(day: string, obs: Astro.Observer): Date {
  const set = sunsetOn(day, obs);
  const rise = sunriseOn(addDays(day, 1), obs);
  return new Date((set.getTime() + rise.getTime()) / 2);
}

/** The instant a day's rule looks at the moon. */
function momentOn(day: string, resolution: Occasion["rule"]["dayResolution"], obs: Astro.Observer): Date {
  return resolution === "nishita" ? nishitaOn(day, obs) : sunriseOn(day, obs);
}

/* --- sankranti ----------------------------------------------------------- */

function sunSiderealLon(date: Date): number {
  const lon = Astro.SunPosition(date).elon - ayanamsaDeg(RESOLVER.ayanamsa, date);
  return ((lon % 360) + 360) % 360;
}

/** Sign entries between two instants: the sign entered (0 = Mesha) and the moment. */
function ingresses(from: Date, to: Date): { sign: number; at: Date }[] {
  const out: { sign: number; at: Date }[] = [];
  let t1 = Astro.MakeTime(from);
  let s1 = Math.floor(sunSiderealLon(t1.date) / 30);
  while (t1.date < to) {
    const t2 = t1.AddDays(1);
    const s2 = Math.floor(sunSiderealLon(t2.date) / 30);
    if (s2 !== s1) {
      const target = s2 * 30;
      const f = (t: Astro.AstroTime) => ((sunSiderealLon(t.date) - target + 540) % 360) - 180;
      const hit = Astro.Search(f, t1, t2, { dt_tolerance_seconds: 1 });
      if (hit) out.push({ sign: s2, at: hit.date });
    }
    t1 = t2;
    s1 = s2;
  }
  return out;
}

/** Which sign a named sankranti is, from the occasion's own id. 0 = Mesha. */
const NAMED_SIGN: Record<string, number> = {
  makar: 9,
  tula: 6,
  mesha: 0,
};

/* --- lunar months -------------------------------------------------------- */

const MASA_ORDER: readonly MasaName[] = [
  "chaitra", "vaishakha", "jyeshtha", "ashadha", "shravana", "bhadrapada",
  "ashwina", "kartika", "margashirsha", "pausha", "magha", "phalguna",
];

type LunarMonth = {
  readonly name: MasaName;
  readonly adhika: boolean;
  /** The new moon it begins at and the one it ends at. */
  readonly from: Date;
  readonly to: Date;
};

/** New moon instants from just before `from` to just after `to`. */
function newMoons(from: Date, to: Date): Date[] {
  const out: Date[] = [];
  let t = Astro.SearchMoonPhase(0, new Date(from.getTime() - 31 * DAY_MS), 40);
  while (t && t.date <= new Date(to.getTime() + 31 * DAY_MS)) {
    out.push(t.date);
    t = Astro.SearchMoonPhase(0, t.AddDays(1), 40);
  }
  return out;
}

/** The amanta months covering the range, each named by the sankranti it holds. */
function lunarMonths(from: Date, to: Date): LunarMonth[] {
  const moons = newMoons(from, to);
  const out: LunarMonth[] = [];
  for (let i = 0; i + 1 < moons.length; i += 1) {
    const inside = ingresses(moons[i], moons[i + 1]);
    /* Mesha entered means Chaitra; no entry means an adhika month that
       borrows the following month's name. */
    const sign = inside.length > 0 ? inside[0].sign : (Math.floor(sunSiderealLon(moons[i + 1]) / 30) + 1) % 12;
    out.push({ name: MASA_ORDER[sign], adhika: inside.length === 0, from: moons[i], to: moons[i + 1] });
  }
  return out;
}

/* --- the resolver -------------------------------------------------------- */

function days(from: string, to: string): string[] {
  const out: string[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) out.push(d);
  return out;
}

/** The civil days of a month list, or the whole horizon when the list is empty. */
function window(o: Occasion, from: string, to: string): [string, string] {
  const months = o.occurrence.months;
  if (months.length === 0) return [from, to];
  const first = `${months[0]}-01`;
  const [y, m] = months[months.length - 1].split("-").map(Number);
  const last = istDay(new Date(Date.UTC(y, m, 0, 12)));
  return [first, last];
}

/** The days whose sunrise falls inside a lunar month. */
function monthDays(month: LunarMonth, obs: Astro.Observer): string[] {
  const out: string[] = [];
  for (let d = istDay(month.from); d <= istDay(new Date(month.to.getTime() + DAY_MS)); d = addDays(d, 1)) {
    const rise = sunriseOn(d, obs);
    if (rise >= month.from && rise < month.to) out.push(d);
  }
  return out;
}

/**
 * The days on which a tithi is kept, by the udaya rule with its kshaya
 * fallback: the day it runs at sunrise, or, when it touches no sunrise, the
 * day it ran through. `index` is 1 to 30.
 */
function tithiDays(candidates: string[], index: number, resolution: Occasion["rule"]["dayResolution"], obs: Astro.Observer): string[] {
  const out: string[] = [];
  /* A tithi that runs at two sunrises is kept on the first of them, except
     the ekadashi, whose fast is kept on the second: that is the day Drik
     Panchang gives (Vijaya Ekadashi, 4 March 2027). */
  const second = index === 11 || index === 26;
  for (const d of candidates) {
    const at = tithiAt(momentOn(d, resolution, obs)).index;
    if (at === index) {
      const prev = out[out.length - 1];
      if (out.length === 0 || addDays(prev, 1) !== d) out.push(d);
      else if (second && resolution === "udaya") out[out.length - 1] = d;
      continue;
    }
    if (resolution === "udaya") {
      const next = tithiAt(sunriseOn(addDays(d, 1), obs)).index;
      const before = ((index - 2 + 30) % 30) + 1;
      const after = (index % 30) + 1;
      if (at === before && next === after) out.push(d);
    }
  }
  return out;
}

function ruleIndex(o: Occasion): number | null {
  const t = o.rule.tithi;
  if (t === undefined) return null;
  if (t === 30 || t === 15) return t;
  return o.rule.paksha === "krishna" ? t + 15 : t;
}

const cache = new Map<string, ResolvedDate[]>();

/**
 * Every date an occasion falls on between `from` and `to`, civil days in
 * India, computed at `ghat`. A dated occasion answers with its one date or
 * span; a recurring one with every occurrence in the range.
 */
export function resolveOccasion(
  o: Occasion,
  from: string,
  to: string,
  ghat: WaterSlug = "ganga-haridwar",
): ResolvedDate[] {
  const key = `${o.slug}|${from}|${to}|${ghat}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const obs = observerFor(ghat);
  const [wf, wt] = window(o, from, to);
  const base = { slug: o.slug, ghat };
  const months = lunarMonths(istMidnight(wf), istMidnight(wt));
  const named = (name: MasaName) => months.filter((m) => m.name === name && !m.adhika);
  const fullMoonDay = (m: LunarMonth) => tithiDays(monthDays(m, obs), 15, "udaya", obs)[0];
  let out: ResolvedDate[] = [];

  switch (o.rule.kind) {
    case "tithi": {
      const index = ruleIndex(o);
      if (index === null) break;
      if (o.rule.masa) {
        /* One named month, then the tithi inside it. */
        const m = named(o.rule.masa)[0];
        const d = m ? tithiDays(monthDays(m, obs), index, o.rule.dayResolution, obs)[0] : undefined;
        if (d) out = [{ ...base, kind: "day", date: d }];
      } else {
        const both = o.rule.paksha === "both" || !o.rule.paksha;
        const indices = both ? [index, ((index + 15 - 1) % 30) + 1] : [index];
        const found = indices.flatMap((i) => tithiDays(days(wf, wt), i, o.rule.dayResolution, obs));
        out = found.sort().map((d) => ({ ...base, kind: "day", date: d }));
        if (o.occurrence.basis !== "recurring") out = out.slice(0, 1);
      }
      break;
    }
    case "tithi-range": {
      /* The dark fortnight of the named month: from the day after its full
         moon to the day of the new moon that ends it. */
      const m = named(o.rule.masa ?? "bhadrapada")[0];
      if (m) {
        const full = fullMoonDay(m);
        const end = tithiDays(monthDays(m, obs).concat(addDays(istDay(m.to), 1)), 30, "udaya", obs).pop();
        if (full && end) out = [{ ...base, kind: "span", date: addDays(full, 1), to: end }];
      }
      break;
    }
    case "lunar-month": {
      /* The purnimanta month: the day after the previous month's full moon
         to this month's full moon. */
      const m = named(o.rule.masa ?? "kartika")[0];
      const i = m ? months.indexOf(m) : -1;
      if (i > 0) {
        const prevFull = fullMoonDay(months[i - 1]);
        const full = fullMoonDay(m);
        if (prevFull && full) out = [{ ...base, kind: "span", date: addDays(prevFull, 1), to: full }];
      }
      break;
    }
    case "solar-ingress": {
      const sign = Object.entries(NAMED_SIGN).find(([k]) => o.occasionId.startsWith(k));
      const hits = ingresses(istMidnight(wf), istMidnight(addDays(wt, 1))).filter((h) => !sign || h.sign === sign[1]);
      /* The day is the moment's own, with one exception. Makar Sankranti is
         kept in the punya kaal after the ingress, so a crossing after sunset
         is kept the next morning: in 2027 the sun enters Makara at 21:14 IST
         on 14 January and the day is 15 January, as Drik Panchang has it.
         Every other sankranti keeps the moment's day; at Talakaveri the
         theerthodbhava is the instant itself, whatever the hour. */
      const nextMorning = o.occasionId.startsWith("makar");
      out = hits.map((h) => {
        const day = istDay(h.at);
        const kept = nextMorning && h.at.getTime() > sunsetOn(day, obs).getTime() ? addDays(day, 1) : day;
        return { ...base, kind: "instant", date: kept, instant: h.at.toISOString() };
      });
      if (o.occurrence.basis !== "recurring") out = out.slice(0, 1);
      break;
    }
    case "manual":
      out = [];
      break;
  }

  cache.set(key, out);
  return out;
}

/** Vikram Samvat on `now`: the year of the last Chaitra new moon, plus 57.
    The year turns at Chaitra Shukla Pratipada, the day after that new moon. */
export function vikramSamvat(now = new Date()): number {
  const months = lunarMonths(new Date(now.getTime() - 400 * DAY_MS), now);
  const chaitra = months.filter((m) => m.name === "chaitra" && !m.adhika && m.from <= now).pop();
  const start = chaitra ? istDay(chaitra.from) : istDay(now);
  return Number(start.slice(0, 4)) + 57;
}

/** A rolling twelve months from today, in India. */
export function horizonFrom(now = new Date()): { from: string; to: string } {
  const from = istDay(now);
  const [y, m, d] = from.split("-").map(Number);
  const to = istDay(new Date(Date.UTC(y + 1, m - 1, d, 12)));
  return { from, to };
}

/** Every occasion resolved over the rolling horizon, at one ghat. */
export function resolveAll(now = new Date(), ghat: WaterSlug = "ganga-haridwar"): Map<string, ResolvedDate[]> {
  const { from, to } = horizonFrom(now);
  return new Map(OCCASIONS.map((o) => [o.slug, resolveOccasion(o, from, to, ghat)]));
}

/* --- said in words ------------------------------------------------------- */

const LOCALE = { en: "en-IN", hi: "hi-IN" } as const;

function fmt(day: string, lang: "en" | "hi", weekday: boolean): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: "Asia/Kolkata",
    ...(weekday ? { weekday: "long" } : {}),
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${day}T12:00:00+05:30`));
}

function fmtShort(day: string, lang: "en" | "hi"): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${day}T12:00:00+05:30`));
}

function fmtTime(iso: string, lang: "en" | "hi"): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

/** "Tuesday 24 November 2026", "27 October to 24 November 2026", "14 January 2027, 21:00 IST". */
export function sayResolved(r: ResolvedDate, lang: "en" | "hi"): string {
  if (r.kind === "span" && r.to) {
    const joiner = lang === "hi" ? " से " : " to ";
    return `${fmt(r.date, lang, false)}${joiner}${fmt(r.to, lang, false)}`;
  }
  if (r.kind === "instant" && r.instant) {
    const time = `${fmtTime(r.instant, lang)} IST`;
    if (istDay(new Date(r.instant)) === r.date) return `${fmt(r.date, lang, true)}, ${time}`;
    return lang === "hi"
      ? `${fmt(r.date, lang, true)}, संक्रमण पिछली शाम ${time}`
      : `${fmt(r.date, lang, true)}, the sun crosses at ${time} the evening before`;
  }
  return fmt(r.date, lang, true);
}

/** "Tue 24 Nov", for a register row. */
export function sayResolvedShort(r: ResolvedDate, lang: "en" | "hi"): string {
  if (r.kind === "span" && r.to) {
    const joiner = lang === "hi" ? " से " : " to ";
    return `${fmtShort(r.date, lang)}${joiner}${fmtShort(r.to, lang)}`;
  }
  if (r.kind === "instant" && r.instant) return `${fmtShort(r.date, lang)}, ${fmtTime(r.instant, lang)}`;
  return fmtShort(r.date, lang);
}

/** Today, said the same way the dates are. */
export function sayDay(day: string, lang: "en" | "hi"): string {
  return fmt(day, lang, false);
}
