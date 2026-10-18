import { bandFor, type FlowBand } from "@/lib/riverdata";

/* The strip behind the gauge: five bands cut at the 10th, 30th, 70th and 90th
   percentile (the same edges as bandFor), and today's dot at its percentile.
   Positions are fractions 0..1 of the strip's width. */

export type GaugeSegment = { band: FlowBand; from: number; to: number };

export type GaugeModel = {
  dot: number | null;
  band: FlowBand | null;
  segments: GaugeSegment[];
};

const SEGMENTS: readonly GaugeSegment[] = [
  { band: "slack", from: 0, to: 0.1 },
  { band: "low", from: 0.1, to: 0.3 },
  { band: "usual", from: 0.3, to: 0.7 },
  { band: "full", from: 0.7, to: 0.9 },
  { band: "spate", from: 0.9, to: 1 },
];

export function gaugeModel(percentile: number | null): GaugeModel {
  const segments = SEGMENTS.map((s) => ({ ...s }));
  if (percentile === null || !Number.isFinite(percentile)) return { dot: null, band: null, segments };
  const p = Math.min(100, Math.max(0, percentile));
  return { dot: p / 100, band: bandFor(p), segments };
}
