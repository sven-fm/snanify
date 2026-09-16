import { ordinal } from "@/lib/ordinal";
import "server-only";
import type { Sitting } from "@/db/schema";
import type { RiverSlice, SkySlice } from "@/lib/patra-record";
import { PRAYER_BY_ID } from "@/content/prayers";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { blobUrl } from "@/lib/blob";
import { shortSeed } from "@/lib/seed";
import type { PatraRecord } from "@/content/patra";
import { SITE_ORIGIN } from "@/lib/locales";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   One sitting, formatted for a sheet.

   The page, the share image and the link preview all render from this, so a
   date reads the same in all three and there is one place where a figure is
   rounded.

   THE SANKALP IS NOT HERE. It lives on the sitting row and is read separately,
   by the owner's own view only. Keeping it out of this type means no renderer
   can print it by accident: the share image, the OG card and the public page
   are all built from a value that has never held it.
   --------------------------------------------------------------------------- */

export type PatraView = {
  /** One of six; names the ghat's plate. */
  waterSlug: string;
  id: string;
  locale: Lang;

  /** "Rekha Sharma · अनिल शर्मा", already joined. */
  names: string[];
  water: string;
  ghat: string;
  city: string;

  /** "8 September 2026", in the sitting's own edition. */
  keptDate: string;
  /** "06:12", the person's own clock. */
  keptTime: string;
  keptZone: string;
  /** The same instant in India Standard Time. */
  keptIst: string;

  flow: string;
  band: string;
  rank: string | null;
  modelledFor: string | null;
  /** "modelled" or "normal", so the sheet can say which it is showing. */
  figureKind: RiverSlice["kind"];

  tithi: string;
  nakshatra: string;
  moon: string;

  prayer: { devanagari: string[]; roman: string[]; title: string } | null;
  portraitUrl: string | null;

  seed: string;
  seedShort: string;
  percentile: number | null;

  /** "3,880 km away", in the edition, or null when the morning carried no fix. */
  distance: string | null;

  /** A specimen for the marketing pages: labelled as one, with no address. */
  specimen?: boolean;
};

const NUMBER = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function dateIn(at: Date, tz: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  }).format(at);
}

function timeIn(at: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  }).format(at);
}

/**
 * `edition` is the language the strings come out in. The sheet's own image
 * is drawn in the sitting's edition and never changes; the page around it,
 * the share line and the link preview follow the reader, so a Hindi page
 * about an English morning names the water and the date in Hindi.
 */
export function patraView(sitting: Sitting, edition?: Lang): PatraView {
  const river = sitting.river as RiverSlice;
  const sky = sitting.sky as SkySlice;
  const lang: Lang = edition ?? (sitting.locale === "hi" ? "hi" : "en");

  const ghat = getGhat(sitting.waterSlug);
  const prayer = sitting.prayerId ? PRAYER_BY_ID[sitting.prayerId] : undefined;
  const at = new Date(sitting.keptAt);

  return {
    id: sitting.id,
    locale: lang,

    names: (sitting.names as { name: string }[]).map((n) => n.name),
    waterSlug: sitting.waterSlug,
    water: ghat ? waterName(ghat, "river", lang) : sitting.waterSlug,
    ghat: ghat ? waterName(ghat, "ghat", lang) : "",
    city: ghat ? waterName(ghat, "city", lang) : "",

    keptDate: dateIn(at, sitting.keptTz, lang),
    keptTime: timeIn(at, sitting.keptTz),
    keptZone: sitting.keptTz,
    keptIst: timeIn(at, "Asia/Kolkata"),

    flow: `${NUMBER.format(river.cumecs)} m³/s`,
    band: river.band,
    rank: river.percentile === null ? null : `${river.percentile}`,
    modelledFor: river.modelledFor,
    figureKind: river.kind,

    tithi: `${sky.paksha === "shukla" ? "Shukla" : "Krishna"} ${sky.tithi}`,
    nakshatra: `${sky.nakshatra} ${sky.nakshatraPada}`,
    moon: `${sky.moonPct}%`,

    prayer: prayer
      ? {
          devanagari: [...prayer.devanagari],
          roman: [...prayer.roman],
          title: prayer.title[lang],
        }
      : null,

    portraitUrl: sitting.portraitKey ? blobUrl(sitting.portraitKey) : null,

    seed: sitting.seed,
    seedShort: shortSeed(sitting.seed),
    percentile: river.percentile,

    distance:
      sitting.distanceKm === null || sitting.distanceKm === undefined
        ? null
        : lang === "hi"
          ? `${NUMBER.format(sitting.distanceKm)} कि.मी. दूर`
          : `${NUMBER.format(sitting.distanceKm)} km away`,
  };
}


/* ---------------------------------------------------------------------------
   The same sitting, shaped for the printable A4 sheet.

   `SankalpPatra.tsx` draws it: the double rule, the folio line, the ruled
   register, the colophon and the print CSS.

   THE SHEET IS THE OWNER'S, SO IT CARRIES THEIR SANKALP. That is the one thing
   `patraView` deliberately never holds, and it is why this takes the sitting
   rather than the view: printing your own words is the whole reason to print
   the sheet, and nothing else renders from this function.

   A field with nothing behind it is left off rather than filled with a
   plausible value: gotra, the giver, the muhurat window and the gauge level
   are all absent, and the sheet prints an honest blank for each.
   --------------------------------------------------------------------------- */

export function printableRecord(sitting: Sitting): PatraRecord {
  const view = patraView(sitting);
  const river = sitting.river as RiverSlice;

  return {
    patraId: sitting.id,
    names: view.names.map((name) => ({
      latin: name,
      /* Already Devanagari, so it is the same string and the sheet sets it
         once rather than printing a transliteration of itself. */
      devanagari: /[\u0900-\u097f]/.test(name) ? name : undefined,
    })),
    sankalpText: sitting.sankalpText || undefined,

    water: view.water,
    ghat: view.ghat,
    place: view.city,

    keptOn: view.keptDate,
    keptIst: `${view.keptIst} IST`,
    keptLocal: `${view.keptTime} ${view.keptZone}`,

    /* Printed since the check of 11 September 2026: the tithi is computed
       here and was matched against Drik Panchang on eight days, every one to
       the minute; see docs/panchang-check.md. Before that the sheet left the
       line ruled and empty. */
    tithi: { label: view.tithi, confidence: "sourced" },

    flow: {
      value: view.flow,
      note:
        river.kind === "modelled" && view.rank
          ? `${ordinal(Number(view.rank))} percentile since 1997.`
          : "Seasonal median, 1997 to 2025.",
    },

    seed: view.seed,
    distance: view.distance ? { value: view.distance, note: "" } : undefined,
    verifyUrl: `${SITE_ORIGIN}/p/${sitting.id}`,
  };
}
