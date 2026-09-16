import * as Astro from "astronomy-engine";
import type { City } from "@/content/cities";
import { WINDOWS } from "@/content/muhurat";
import { readTithi, type TithiReading } from "@/lib/sky";

/* ---------------------------------------------------------------------------
   One city's morning: sunrise, sunset, Brahma muhurat and the tithi at
   sunrise, for the civil day the city is in now.

   Sunrise is searched from the city's own midnight with astronomy-engine at
   the city's coordinates. Brahma muhurat takes its offsets from the same
   window record /muhurat prints (96 to 48 minutes before sunrise at the
   equinox), scaled by the real night, exactly as the ghat's windows are.
   The tithi is read at that sunrise, which is the udaya rule the rest of the
   almanac keeps.
   --------------------------------------------------------------------------- */

export interface CityDay {
  /** The civil date in the city, "2026-09-16". */
  readonly date: string;
  readonly sunrise: Date;
  readonly sunset: Date;
  readonly brahma: { readonly start: Date; readonly end: Date };
  readonly tithi: TithiReading;
  readonly sunriseTomorrow: Date;
}

/** The parts of `at` on the wall clock of `zone`. */
function wall(at: Date, zone: string): { y: number; m: number; d: number; h: number; min: number } {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(at)
      .map((x) => [x.type, x.value]),
  );
  return { y: Number(p.year), m: Number(p.month), d: Number(p.day), h: Number(p.hour), min: Number(p.minute) };
}

/** The instant the wall clock of `zone` reads 00:00 on the civil day of `at`. */
function localMidnight(at: Date, zone: string): Date {
  const w = wall(at, zone);
  const guess = Date.UTC(w.y, w.m - 1, w.d);
  /* The zone's offset at that moment, read back off the guess. */
  const g = wall(new Date(guess), zone);
  const offsetMin = (Date.UTC(g.y, g.m - 1, g.d, g.h, g.min) - guess) / 60_000;
  return new Date(guess - offsetMin * 60_000);
}

function rise(obs: Astro.Observer, from: Date, dir: 1 | -1): Date | null {
  /* Two days of search, not one: in autumn each sunrise comes a little
     later than the last, so the next one sits just past twenty-four hours. */
  const t = Astro.SearchRiseSet(Astro.Body.Sun, obs, dir, new Astro.AstroTime(from), 2);
  return t ? t.date : null;
}

export function cityDay(city: City, now = new Date()): CityDay | null {
  const obs = new Astro.Observer(city.lat, city.lon, 0);
  const midnight = localMidnight(now, city.zone);
  const sunrise = rise(obs, midnight, 1);
  const sunset = sunrise ? rise(obs, sunrise, -1) : null;
  const sunriseTomorrow = sunrise ? rise(obs, new Date(sunrise.getTime() + 60_000), 1) : null;
  if (!sunrise || !sunset || !sunriseTomorrow) return null;

  const brahma = WINDOWS.find((w) => w.id === "brahma");
  const dayMinutes = (sunset.getTime() - sunrise.getTime()) / 60_000;
  const night = (1440 - dayMinutes) / 15 / 48;
  const startMin = brahma ? brahma.offsetStartMin : -96;
  const endMin = brahma ? brahma.offsetEndMin : -48;

  const w = wall(sunrise, city.zone);
  return {
    date: `${w.y}-${String(w.m).padStart(2, "0")}-${String(w.d).padStart(2, "0")}`,
    sunrise,
    sunset,
    brahma: {
      start: new Date(sunrise.getTime() + startMin * night * 60_000),
      end: new Date(sunrise.getTime() + endMin * night * 60_000),
    },
    tithi: readTithi(sunrise),
    sunriseTomorrow,
  };
}
