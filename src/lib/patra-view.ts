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
import type { FullLang as Lang } from "@/lib/locales";

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
  source: string;
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

export function patraView(sitting: Sitting): PatraView {
  const river = sitting.river as RiverSlice;
  const sky = sitting.sky as SkySlice;
  const lang = (sitting.locale === "hi" ? "hi" : "en") as Lang;

  const ghat = getGhat(sitting.waterSlug);
  const prayer = sitting.prayerId ? PRAYER_BY_ID[sitting.prayerId] : undefined;
  const at = new Date(sitting.keptAt);

  return {
    id: sitting.id,
    locale: lang,

    names: (sitting.names as { name: string }[]).map((n) => n.name),
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
    source: river.source,
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
  };
}


/* ---------------------------------------------------------------------------
   The same sitting, shaped for the printable A4 sheet.

   `SankalpPatra.tsx` was built for the officiant model and kept when that was
   cancelled, because the furniture was always the good part: the double rule,
   the folio line, the ruled register, the colophon and the print CSS. It was
   orphaned when /patra/sample went, and this is what puts it back to work as
   the owner's own print view.

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

    /* Only when the panchang has a named source behind it. Until then the
       sheet leaves the line ruled and empty, which is the honest state. */
    tithi: { label: view.tithi, confidence: "provisional" },

    flow: {
      value: view.flow,
      note:
        river.kind === "modelled"
          ? `Modelled for ${river.modelledFor}. ${view.rank ? `${view.rank}th percentile since 1997.` : ""}`.trim()
          : "Seasonal median, 1997 to 2025.",
    },

    reading: {
      at: river.modelledFor ?? sitting.keptOn,
      agency: river.source,
    },

    seed: view.seed,
    verifyUrl: `${SITE_ORIGIN}/p/${sitting.id}`,
  };
}
