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
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The specimen: a Sankalp Patra a stranger can see before paying.

   It is a real day's sheet for a family that does not exist. The river, the
   sky and the seed are today's, computed the way a kept morning computes
   them, so the figure on it is the figure on /live. The names are common
   ones, the time is six in the morning in Toronto, and the sheet says
   "specimen" on its masthead and carries the site rather than an address.
   Nothing on it is a claim about anybody.
   --------------------------------------------------------------------------- */

const WATER = "ganga-haridwar";
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

  /* Six in the morning in Toronto on the day the model published for. */
  const kept = new Date(at);
  kept.setUTCHours(10, 12, 0, 0);

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
    keptTz: "America/Toronto",
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
    isPublic: true,
    createdAt: kept,
    /* Toronto to the ghat, to the nearest ten kilometres, as a real morning would carry it. */
    distanceKm: Math.round(greatCircleKm([43.6532, -79.3832], water.gauge.ghat) / 10) * 10,
  };

  return { ...patraView(sitting, lang), specimen: true };
}
