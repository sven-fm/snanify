import "server-only";
import type { Sitting } from "@/db/schema";
import { asInstant } from "@/content/muhurat";
import { getGhat } from "@/content/rivers";
import { riverSlice, seedDay, seedFigure, skySlice } from "@/lib/patra-record";
import { patraView, type PatraView } from "@/lib/patra-view";
import { getLiveSnapshot, istDate, type WaterState } from "@/lib/riverdata";
import { seedFor } from "@/lib/seed";
import { readSky } from "@/lib/sky";
import { greatCircleKm } from "@/lib/distance";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The specimen: a Sankalp Patra a stranger can see before paying.

   It is a real day's sheet for a family that does not exist. The river, the
   sky and the seed are today's, computed the way a kept morning computes
   them, so the figure on it is the figure on /live. The names are common
   ones, the time is six in the morning in New York, and the sheet says
   "specimen" on its masthead and carries the site rather than an address.
   Nothing on it is a claim about anybody.
   --------------------------------------------------------------------------- */

const WATER = "ganga-haridwar";
const SPECIMEN_TZ = "America/New_York";
const NAMES: Record<Lang, string[]> = {
  en: ["Anjali Sharma", "Vikram Sharma"],
  hi: ["अंजलि शर्मा", "विक्रम शर्मा"],
};

export async function specimenView(
  lang: Lang,
  at = new Date(),
  /** The signed-in person's own names, once they have set up their sheet. */
  names?: string[],
): Promise<PatraView> {
  const snapshot = await getLiveSnapshot();
  const water = snapshot.waters.find((w) => w.slug === WATER) ?? snapshot.waters[0];
  const ghat = getGhat(water.slug);

  /* 06:12 in New York on the day the model published for: 10:12 UTC under
     daylight time, 11:12 under standard time. */
  const kept = new Date(at);
  kept.setUTCHours(10, 12, 0, 0);
  const nyHour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: SPECIMEN_TZ }).format(kept),
  );
  if (nyHour !== 6) kept.setUTCHours(10 + (6 - nyHour), 12, 0, 0);

  const sky = readSky({
    instant: asInstant(kept.toISOString()),
    coordinates: ghat
      ? { lat: water.gauge.ghat[0], lon: water.gauge.ghat[1], elevationM: water.gauge.elevationM }
      : null,
  });

  const river = riverSlice(water as WaterState);
  const seed = await seedFor({
    sittingId: "specimen",
    waterSlug: water.slug,
    modelledFor: seedDay(river, istDate(kept)),
    discharge: seedFigure(river),
  });

  const sitting: Sitting = {
    id: "specimen",
    userId: "specimen",
    waterSlug: water.slug,
    keptAt: kept,
    keptTz: SPECIMEN_TZ,
    keptOn: kept.toISOString().slice(0, 10),
    locale: lang,
    river,
    sky: skySlice(sky, water as WaterState),
    seed,
    names: (names && names.length > 0 ? names : NAMES[lang]).map((name) => ({ name })),
    prayerId: "sapta-nadi",
    portraitKey: null,
    sankalpText: "",
    imageKey: null,
    morningNo: null,
    imageVersion: null,
    isPublic: true,
    createdAt: kept,
    /* New York to the ghat, to the nearest ten kilometres, as a real morning would carry it.
       A New York family, because the largest share of the diaspora this sells to is American. */
    distanceKm: Math.round(greatCircleKm([40.7128, -74.006], water.gauge.ghat) / 10) * 10,
  };

  return { ...patraView(sitting, lang), specimen: true };
}
