import "server-only";
import { flowContent, quietFigure } from "@/content/flow";
import { patraContent } from "@/content/patra";
import { setupContent } from "@/content/setup";
import { specimenView } from "@/lib/specimen";
import { ordinal } from "@/lib/ordinal";
import type { Lang } from "@/lib/locales";
import type { FlowBand } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   What the walkthrough on /snan shows, as plain strings.

   It is the specimen's morning (src/lib/specimen.ts): today's Ganga at Har Ki
   Pauri, today's tithi, a family that does not exist, six in the morning in
   New York. So the figure in the phone is the figure on /live and on the
   specimen sheet under it, and a quiet feed shows the season's usual level
   with no dot, exactly as the sitting would.
   --------------------------------------------------------------------------- */

export type WalkData = {
  river: string;
  /** "Har Ki Pauri, Haridwar". */
  place: string;
  /** "Running full." */
  state: string;
  /** "Fuller than usual for this time of year.", or null on a quiet feed. */
  plain: string | null;
  /** Today's percentile, or null on a quiet feed: then the gauge draws no dot. */
  percentile: number | null;
  /** "669 m³/s, 86th percentile since 1997". */
  figure: string;
  names: string[];
  sankalp: string;
  sheetTitle: string;
  /** "19 October 2026 · Shukla 9". */
  dateLine: string;
  /** ["at the ", "Ganga", ", Har Ki Pauri, Haridwar"]: the river goes sindoor. */
  placeLine: [string, string, string];
  /** ["7th", "morning"], the badge at the mark. */
  badge: [string, string];
  /** "06:12 in New York · 15:42 IST · 11,650 km away". */
  timeLine: string;
};

const BANDS: readonly FlowBand[] = ["slack", "low", "usual", "full", "spate"];
const isBand = (b: string): b is FlowBand => (BANDS as readonly string[]).includes(b);

export async function walkData(lang: Lang): Promise<WalkData> {
  const v = await specimenView(lang);
  const words = flowContent[lang];
  const sheet = patraContent[lang].sheet;
  const stop = lang === "hi" ? "।" : ".";
  const modelled = v.figureKind === "modelled" && v.percentile !== null && isBand(v.band);
  const [a, b, c] = sheet.place(v);

  return {
    river: v.water,
    place: [v.ghat, v.city].filter(Boolean).join(", "),
    state: `${v.state}${stop}`,
    plain: modelled ? words.plain[v.band as FlowBand] : null,
    percentile: modelled ? v.percentile : null,
    figure: modelled
      ? words.proof.replace("{flow}", v.flow).replace("{n}", ordinal(Math.round(v.percentile ?? 0), lang))
      : quietFigure(v.flow, lang),
    names: v.names,
    sankalp: setupContent[lang].sankalp.examples[0],
    sheetTitle: sheet.title,
    dateLine: `${v.keptDate} · ${v.tithi}`,
    placeLine: [a, b, c],
    badge: sheet.morning(7),
    timeLine: [v.keptLocal, `${v.keptIst} IST`, v.distance].filter(Boolean).join(" · "),
  };
}
