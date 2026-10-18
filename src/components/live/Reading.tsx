import type { Lang } from "@/lib/locales";
import { Gauge } from "@/components/kit";
import { fill, liveContent } from "@/content/live";
import { flowContent } from "@/content/flow";
import { ordinal } from "@/lib/ordinal";
import { SOURCES, type FlowBand, type WaterState } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   One river's reading on the reference pages, /live and /rivers/[river]
   (spec 6.6): the state word, one plain sentence and the gauge lead; the
   exact figure and its rank sit in one small row under the strip; the
   source line closes it, because on these pages a number always carries
   where it came from (the copy-guard split: source and "modelled" are
   named on /rivers, /live and /faq, and never "measured").
   --------------------------------------------------------------------------- */

const locale = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");

/**
 * Discharge spans four orders of magnitude across the six, from the Kaveri at
 * a fifth of a cubic metre to the Ganga at thirty thousand, so precision is
 * chosen from the magnitude rather than fixed. Two decimals on a trickle, none
 * on a flood.
 */
export function cumecs(value: number, lang: Lang): string {
  const digits = value < 10 ? 2 : value < 100 ? 1 : 0;
  return new Intl.NumberFormat(locale(lang), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** "11 Aug 2026". The civil date is a date, so it is formatted in UTC. */
export function longDate(date: string, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export interface ReadingView {
  percentile: number | null;
  band: FlowBand | null;
  /** "797 m³/s, 86th percentile since 1997". */
  figure: string;
  /** "Modelled for 18 Oct 2026, Copernicus EMS, GloFAS, CC BY 4.0." */
  source: string;
}

/** The reading of one water, as the plain strings the gauge row needs. */
export function readingView(water: WaterState, lang: Lang): ReadingView {
  const t = liveContent[lang];
  const words = flowContent[lang];
  const d = water.discharge;
  const flow = `${cumecs(d.cumecs, lang)} ${t.flow.unit}`;
  const by = `${SOURCES.discharge.shortName}, ${SOURCES.discharge.licence}.`;
  if (d.kind === "modelled") {
    return {
      percentile: d.percentile.value,
      band: d.percentile.band,
      figure: words.proof.replace("{flow}", flow).replace("{n}", ordinal(Math.round(d.percentile.value), lang)),
      source: `${fill(t.flow.modelledFor, { date: longDate(d.modelledFor, lang) })}, ${by}`,
    };
  }
  return {
    percentile: null,
    band: null,
    figure: `${flow}, ${words.stateMedian}`,
    source: `${t.feed.normalLabel}, ${by}`,
  };
}

export function Reading({ view, lang, className = "" }: { view: ReadingView; lang: Lang; className?: string }) {
  return (
    <div data-reading className={className}>
      <Gauge percentile={view.percentile} band={view.band} lang={lang} figure={view.figure} />
      <p data-source className="mt-0.5 text-[0.75rem] leading-[1.4] text-ink2">
        {view.source}
      </p>
    </div>
  );
}
