"use client";

import { useState } from "react";
import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";
import { CountUp } from "@/components/live/CountUp";

/* ---------------------------------------------------------------------------
   The head of /live: pick a water, and its gauge answers.

   Everything here is already in the page. The six waters arrive as plain
   strings and numbers from the server, so the picker only decides which of
   them is on the plate; nothing is fetched and the markup for the first water
   is in the HTML for anyone without JavaScript.

   What moves, and why each thing moves:
     · the picture prints in six steps when the water changes, as ink does;
     · the needle sweeps to the rank, because a dial that jumps reads as a
       number and a dial that sweeps reads as a measurement;
     · the flow figure counts up and stops, under a second;
     · the eleven bars rise from their baseline in turn;
     · the waterline breathes at the river's own amplitude, four seconds in
       and six out, which is the one motion the sitting itself has.
   All of it is transform and opacity, so a mid-range phone paints it without
   noticing, and all of it stops under prefers-reduced-motion.
   --------------------------------------------------------------------------- */

export interface HeroWater {
  slug: string;
  river: string;
  place: string;
  sentence: string;
  trend: string;
  caret: string;
  cumecs: number;
  unit: string;
  /** 0 to 100, or null when the page stands on the seasonal median. */
  percentile: number | null;
  bandWord: string;
  rankNote: string;
  modelled: string;
  sunrise: string;
  nextWindow: string | null;
  series: number[];
  picture: { src: string; alt: string };
  href: string;
}

export interface HeroLabels {
  pick: string;
  flow: string;
  rank: string;
  of: string;
  next: string;
  sunrise: string;
  open: string;
  eleven: string;
  dialLabel: string;
  bandWords: Record<string, string>;
}

/** A stable hex seed per water, so the band is the same river each visit. */
function seedFor(slug: string): string {
  let h = 2166136261;
  for (const ch of slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h.toString(16).padStart(8, "0").repeat(8);
}

/* --- the dial ------------------------------------------------------------- */

const CX = 100;
const CY = 100;
const R = 84;

function polar(p: number, r = R): [number, number] {
  const a = Math.PI - (p / 100) * Math.PI;
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)];
}

function arc(from: number, to: number, r = R): string {
  const [x1, y1] = polar(from, r);
  const [x2, y2] = polar(to, r);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

const BANDS: [number, number][] = [
  [0, 10],
  [10, 30],
  [30, 70],
  [70, 90],
  [90, 100],
];

function Dial({ percentile, label }: { percentile: number | null; label: string }) {
  const p = percentile ?? 50;
  const band = BANDS.find(([lo, hi]) => p >= lo && p < hi) ?? BANDS[4];
  const deg = -90 + (p / 100) * 180;

  return (
    <svg viewBox="0 0 200 112" className="w-full text-ink" role="img" aria-label={label}>
      {/* the scale */}
      <path d={arc(0, 100)} fill="none" stroke="currentColor" strokeWidth="1" />
      <path d={arc(0, 100, R - 10)} fill="none" stroke="var(--rule)" strokeWidth="0.6" />
      {[10, 30, 70, 90].map((t) => {
        const [x1, y1] = polar(t, R - 10);
        const [x2, y2] = polar(t, R + 4);
        return (
          <line
            key={t}
            x1={x1.toFixed(2)}
            y1={y1.toFixed(2)}
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
      {/* the band the river is in, inked */}
      {percentile !== null && (
        <path
          d={arc(band[0], band[1])}
          fill="none"
          stroke="var(--spot)"
          strokeWidth="3.5"
          style={{ transition: "d 0.6s" }}
        />
      )}
      {/* the needle */}
      <g
        style={{
          transform: `rotate(${deg.toFixed(2)}deg)`,
          transformOrigin: `${CX}px ${CY}px`,
          transition: "transform 1.1s cubic-bezier(0.2, 0.8, 0.3, 1)",
          opacity: percentile === null ? 0.25 : 1,
        }}
      >
        <g className="quiver" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - R + 14} stroke="var(--spot)" strokeWidth="2.5" />
          <line x1={CX} y1={CY} x2={CX} y2={CY + 8} stroke="currentColor" strokeWidth="2.5" />
        </g>
      </g>
      <circle cx={CX} cy={CY} r="4" fill="currentColor" />
      <line x1="8" y1={CY + 8} x2="192" y2={CY + 8} stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* --- the waterline --------------------------------------------------------- */

function Waterline({ slug, percentile }: { slug: string; percentile: number | null }) {
  const drawn = engrave({ seed: seedFor(slug), percentile, width: 1000, height: 300 });
  /* Screen pixels, on the SVG element itself: a transform on an inner group
     is in viewBox units, which at a phone's width came to a pixel or two and
     read as nothing moving at all. */
  const amp = 6 + ((percentile ?? 50) / 100) * 16;
  return (
    <svg
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
      className="breathe absolute bottom-0 left-[-4%] h-[36%] w-[108%] text-ink"
      style={{ ["--amp" as string]: `${amp.toFixed(1)}px` }}
      aria-hidden="true"
    >
      <g className="sway">
        {drawn.lines.map((d, i, all) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth(i, all.length) * 1.6}
            strokeOpacity={strokeOpacity(i, all.length)}
          />
        ))}
      </g>
    </svg>
  );
}

/* --- eleven days ----------------------------------------------------------- */

function Eleven({ series }: { series: number[] }) {
  const max = Math.max(...series);
  if (!Number.isFinite(max) || max <= 0 || series.length < 2) return null;
  const slot = 100 / series.length;
  const w = slot * 0.52;
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-3 h-12 w-full text-ink" aria-hidden="true">
      {series.map((v, i) => {
        const h = Math.max(0.6, (v / max) * 30);
        return (
          <rect
            key={i}
            className="rise"
            style={{ ["--i" as string]: i }}
            x={(i * slot + (slot - w) / 2).toFixed(2)}
            y={(30 - h).toFixed(2)}
            width={w.toFixed(2)}
            height={h.toFixed(2)}
            fill="currentColor"
            opacity={i === series.length - 1 ? 1 : 0.5}
          />
        );
      })}
    </svg>
  );
}

/* --- the hero -------------------------------------------------------------- */

export function LiveHero({
  lang,
  waters,
  labels,
  note,
}: {
  lang: string;
  waters: HeroWater[];
  labels: HeroLabels;
  /** When the page was assembled, printed under the plate. */
  note: string;
}) {
  const [index, setIndex] = useState(0);
  const w = waters[index] ?? waters[0];
  if (!w) return null;

  const rank = w.percentile === null ? null : Math.round(w.percentile);
  const dialLabel = labels.dialLabel
    .replace("{river}", w.river)
    .replace("{band}", w.bandWord)
    .replace("{rank}", rank === null ? "" : String(rank));

  return (
    <section className="border-b-2 border-rulestrong">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-sm text-ink2">{labels.pick}</p>

        {/* Six tabs in a row that scrolls on a phone and wraps from sm. Each
            clears 44px. The chosen one is set in ink, as a stamp. */}
        <div
          role="tablist"
          aria-label={labels.pick}
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {waters.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`display min-h-[44px] shrink-0 border-2 px-4 text-[1.05rem] transition-colors ${
                i === index
                  ? "border-ink bg-ink text-paper"
                  : "border-rulestrong bg-paper text-ink hover:bg-paper3"
              }`}
            >
              {x.river}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* --------------------------------------------------- plate --- */}
          <div className="boxed relative aspect-[3/2] overflow-hidden bg-paper2">
            <div
              key={w.slug}
              role="img"
              aria-label={w.picture.alt}
              className="ink-picture ink-in absolute inset-0"
              style={{ ["--picture" as string]: `url(${w.picture.src})` }}
            />
            <Waterline key={`${w.slug}-line`} slug={w.slug} percentile={w.percentile} />
            <div className="absolute top-4 left-4 bg-paper px-3 py-2">
              <p className="display text-[1.4rem] leading-tight sm:text-[1.8rem]">{w.river}</p>
              <p className="text-xs text-ink2 sm:text-sm">{w.place}</p>
            </div>
          </div>

          {/* --------------------------------------------------- gauge --- */}
          <div className="flex flex-col">
            <p key={`${w.slug}-s`} className="display ink-in text-[1.3rem] leading-[1.3] sm:text-[1.6rem]">
              {w.sentence}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink2">
              <span aria-hidden="true" className="text-[0.8rem] leading-none text-spot">
                {w.caret}
              </span>
              {w.trend}
            </p>

            <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
              <div>
                <p className="text-sm text-ink2">{labels.flow}</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <CountUp
                    key={w.slug}
                    value={w.cumecs}
                    lang={lang}
                    className="display tabular text-[2.8rem] leading-none sm:text-[3.6rem]"
                  />
                  <span className="text-sm text-ink2">{w.unit}</span>
                </p>
                <p className="mt-2 text-[0.85rem] leading-snug text-ink2">{w.modelled}</p>
              </div>
              <div className="w-[9.5rem] sm:w-[11rem]">
                <Dial percentile={w.percentile} label={dialLabel} />
                <p className="mt-1 flex justify-between text-[0.7rem] text-ink2">
                  <span>{labels.bandWords.slack}</span>
                  <span>{labels.bandWords.usual}</span>
                  <span>{labels.bandWords.spate}</span>
                </p>
              </div>
            </div>

            <dl className="mt-5 border-t-2 border-rulestrong">
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                <dt className="label text-ink2">{labels.rank}</dt>
                <dd className="text-sm text-ink">
                  {rank === null ? w.rankNote : `${rank} ${labels.of}, ${w.bandWord.toLowerCase()}`}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                <dt className="label text-ink2">{labels.sunrise}</dt>
                <dd className="tabular text-sm text-ink">{w.sunrise} IST</dd>
              </div>
              {w.nextWindow && (
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                  <dt className="label text-ink2">{labels.next}</dt>
                  <dd className="text-right text-sm text-ink">{w.nextWindow}</dd>
                </div>
              )}
            </dl>

            {w.series.length > 1 && (
              <div className="mt-4">
                <p className="text-xs text-ink2">{labels.eleven}</p>
                <Eleven key={`${w.slug}-e`} series={w.series} />
              </div>
            )}

            <a
              href={w.href}
              className="mt-5 inline-flex min-h-[44px] items-center self-start text-sm text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-spot"
            >
              {labels.open}
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-[1.7] text-ink2">{note}</p>
      </div>
    </section>
  );
}
