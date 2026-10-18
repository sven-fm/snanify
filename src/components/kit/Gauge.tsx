import type { Lang } from "@/lib/locales";
import type { FlowBand } from "@/lib/riverdata";
import { gaugeModel } from "@/lib/gauge";
import { flowContent } from "@/content/flow";

/* ---------------------------------------------------------------------------
   The gauge: how the river is running, without numbers. A strip in five
   fills, widths 1 : 2 : 4 : 2 : 1 (the bands' own cut points at the 10th,
   30th, 70th and 90th percentile), a dashed ink line at the middle for
   "usual", and a sindoor dot ringed in ink at the morning's percentile.
   Under it "Thin", "Usual", "In spate"; above it the state and one plain
   sentence (src/content/flow.ts). A quiet feed draws no dot and claims
   nothing about today.
   --------------------------------------------------------------------------- */

const pct = (f: number) => `${(f * 100).toFixed(2)}%`;

export function Gauge({
  percentile,
  band,
  lang,
  figure,
  heading = true,
  className = "",
}: {
  percentile: number | null;
  band: FlowBand | null;
  lang: Lang;
  /** The small proof under the words, e.g. "797 m³/s, 86th percentile since 1997". */
  figure?: string;
  /** The state and its plain sentence above the strip. */
  heading?: boolean;
  className?: string;
}) {
  const model = gaugeModel(percentile);
  const t = flowContent[lang];
  const today = band ?? model.band;
  return (
    <div data-gauge className={className}>
      {heading && today ? (
        <>
          <p className="display text-[1.625rem] leading-[1.05]" style={{ fontWeight: 800 }}>
            {`${t.state[today]}${lang === "hi" ? "।" : "."}`}
          </p>
          <p className="mt-1.5 text-[0.875rem] leading-[1.45]">{t.plain[today]}</p>
        </>
      ) : null}
      <div
        className={heading && today ? "relative mt-5" : "relative mt-2.5"}
        /* A quiet feed claims nothing about today: the strip is then decoration. */
        role={today ? "img" : undefined}
        aria-label={today ? t.state[today] : undefined}
        aria-hidden={today ? undefined : true}
      >
        <div className="flex h-[14px]" style={{ border: "2px solid var(--ink)" }}>
          {model.segments.map((s, i) => (
            <i
              key={s.band}
              className="block h-full"
              style={{ flexGrow: Math.round((s.to - s.from) * 10), backgroundColor: `var(--gauge-${i + 1})` }}
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="absolute"
          style={{ left: "50%", top: -6, height: 26, borderLeft: "2px dashed var(--ink)", transform: "translateX(-1px)" }}
        />
        {model.dot !== null ? (
          <svg
            aria-hidden="true"
            data-today=""
            viewBox="0 0 18 18"
            width="18"
            height="18"
            className="absolute"
            style={{ left: pct(model.dot), top: -2, transform: "translateX(-50%)" }}
          >
            <circle cx="9" cy="9" r="8" fill="var(--sindoor)" stroke="var(--ink)" strokeWidth="2" />
          </svg>
        ) : null}
        <div className="mt-1.5 grid grid-cols-3 text-[0.6875rem] leading-[1.4] text-ink2" aria-hidden="true">
          <span>{t.word.slack}</span>
          <span className="text-center">{t.word.usual}</span>
          <span className="text-right">{t.word.spate}</span>
        </div>
      </div>
      {figure ? <p data-figure className="tabular mt-2 text-[0.75rem] leading-[1.4] text-ink2">{figure}</p> : null}
    </div>
  );
}
