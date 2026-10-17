/**
 * River geometry shared by the page, the Patra image and the email art.
 * Constants are for a 260 wide box and scale linearly with width / 260.
 * Every emitted number is rounded to two places (hydration trap).
 */

export type WaveRow = {
  y: number;
  amp: number;
  period: number;
  stroke: number;
  opacity: number;
  /** Polyline spanning 0..2*width so it can slide left by one period. */
  points: string;
  /** Seconds for one loop. */
  drift: number;
};

const r2 = (n: number) => Number(n.toFixed(2));

export function waveRows(opts: {
  width: number;
  height: number;
  rows: number;
  top?: number;
}): WaveRow[] {
  const { width, height, rows } = opts;
  const top = opts.top ?? 0;
  const k = width / 260;
  const out: WaveRow[] = [];
  for (let i = 0; i < rows; i++) {
    const t = rows > 1 ? i / (rows - 1) : 0;
    const y = r2(top + (height - top - 4) * Math.pow(t, 1.7));
    const amp = r2((0.5 + 2.6 * t) * k);
    const period = r2((40 + 50 * t) * k);
    const pts: string[] = [];
    const step = 6;
    for (let x = 0; x <= 2 * width + 1e-9; x += step) {
      pts.push(`${r2(x)},${r2(y + amp * Math.sin((2 * Math.PI * x) / period))}`);
    }
    out.push({
      y,
      amp,
      period,
      stroke: r2(0.6 + 1.2 * t),
      opacity: r2(0.3 + 0.6 * t),
      points: pts.join(" "),
      drift: r2(11 - 4 * t),
    });
  }
  return out;
}

export function sunPath(
  rows: WaveRow[],
  opts: { sunX: number; width: number },
): { x: number; y: number; w: number; h: number }[] {
  const k = opts.width / 260;
  const out: { x: number; y: number; w: number; h: number }[] = [];
  rows.forEach((row, i) => {
    const t = rows.length > 1 ? i / (rows.length - 1) : 0;
    const centre = opts.sunX + (opts.width / 2 - opts.sunX) * t;
    const total = (5 + 64 * t) * k;
    const n = t < 0.3 ? 1 : t < 0.7 ? 2 : 3;
    const w = total / (2 * n - 1);
    const left = centre - total / 2;
    const h = row.stroke * 3.6;
    for (let d = 0; d < n; d++) {
      out.push({ x: r2(left + d * 2 * w), y: r2(row.y), w: r2(w), h: r2(h) });
    }
  });
  return out;
}

export function horizonSun(opts: { cx: number; horizonY: number; r: number }): {
  cx: number;
  cy: number;
  r: number;
  clipBelow: number;
} {
  return {
    cx: r2(opts.cx),
    cy: r2(opts.horizonY - 0.35 * opts.r),
    r: r2(opts.r),
    clipBelow: opts.horizonY,
  };
}
