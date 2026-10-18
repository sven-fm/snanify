import type { Lang } from "@/lib/locales";
import type { PatraView } from "@/lib/patra-view";
import { ordinal } from "@/lib/ordinal";
import { nthMorning } from "@/lib/mornings";

/* ---------------------------------------------------------------------------
   The Sankalp Patra in HTML: the words printed on the sheet, and the owner's
   record.

   The sheet is the memento (src/lib/patra-image.ts) set as a page, in the
   sitting's own edition: the header, the ghat, the names in capitals, where,
   the prayer, how the river ran, the closing river, the foot. The owner's
   copy adds one thing, their sankalp under the sheet.

   `hi` is checked against the shape of `en`, so a missing translation is a
   compile error rather than an English word on a Hindi sheet.
   --------------------------------------------------------------------------- */

/**
 * The owner's copy: the sheet everyone sees, plus the person's own words.
 * `printableRecord()` in src/lib/patra-view.ts is the only thing that makes
 * one; every other renderer takes a bare `PatraView`, which has never held
 * the sankalp.
 */
export type PatraRecord = PatraView & { sankalp: string | null };

type SheetCopy = {
  aria: string;
  title: string;
  specimenTitle: string;
  /** "at the ", the river, ", ghat, city": the river is set in sindoor. */
  place: (v: Pick<PatraView, "water" | "ghat" | "city">) => [string, string, string];
  stop: string;
  rank: (n: number) => string;
  median: string;
  /** The seal's two lines: "7th" / "morning". */
  morning: (n: number) => [string, string];
  /** Read aloud for the owner's words, which print without a label. */
  sankalpAria: string;
  /** The quiet line under the owner's words, on their page and their paper. */
  sankalpNote: string;
};

const tail = (v: Pick<PatraView, "ghat" | "city">) => `${v.ghat ? `, ${v.ghat}` : ""}${v.city ? `, ${v.city}` : ""}`;

const en: { sheet: SheetCopy } = {
  sheet: {
    aria: "Sankalp Patra",
    title: "Sankalp Patra",
    specimenTitle: "Sankalp Patra, specimen",
    place: (v) => ["at the ", v.water, tail(v)],
    stop: ".",
    rank: (n) => `${ordinal(n, "en")} percentile since 1997`,
    median: "Seasonal median, 1997 to 2025",
    morning: (n) => [ordinal(n, "en"), "morning"],
    sankalpAria: "Your sankalp",
    sankalpNote: "Your sankalp. It stays with you.",
  },
};

const hi: typeof en = {
  sheet: {
    aria: "संकल्प पत्र",
    title: "संकल्प पत्र",
    specimenTitle: "संकल्प पत्र, नमूना",
    place: (v) => ["", v.water, ` के तट पर${tail(v)}`],
    stop: "।",
    rank: (n) => `1997 से ${n}वाँ प्रतिशतक`,
    median: "1997 से 2025 का सामान्य स्तर",
    morning: (n) => [nthMorning(n, "hi"), "सुबह"],
    sankalpAria: "आपका संकल्प",
    sankalpNote: "आपका संकल्प। यह आपके पास रहता है।",
  },
};

export const patraContent = { en, hi } satisfies Record<Lang, typeof en>;
