import { InView } from "@/components/live/InView";
import { NIGHT_RIVER } from "@/lib/palette";
import { horizonSun, sunPath, waveRows, type WaveRow } from "@/lib/river-geometry";

/* ---------------------------------------------------------------------------
   The river, the brand's living element, in the palette.

   RiverStrip: teal waves only, 74px, behind the masthead's logo on every
   page, fading downward into paper by a stepped opacity per line.

   RiverHorizon: the full river. A thin ink horizon, the sun sitting on it and
   cut by it, teal waves bunching toward the horizon and opening toward the
   viewer, each line drifting sideways at its own pace, and the sun's path in
   marigold from under the sun toward the bottom centre, widening and broken
   into dashes that shimmer. `night` is the stillness's river; `breathe`
   lets the waves rise and fall with the breath.

   Motion is CSS on one clock (`flow`, `breathe` in globals.css), so it needs
   no client JavaScript beyond InView, which pauses it off screen, and it
   stops under prefers-reduced-motion. Geometry is src/lib/river-geometry.ts,
   drawn in a 390 wide box (the phone) and stretched to the column.
   --------------------------------------------------------------------------- */

const W = 390;
const HORIZON = 6;
const SUN_X = 0.8;
const SUN_R = 24;

const r2 = (n: number) => Number(n.toFixed(2));

function Waves({ rows, stroke, opacity }: { rows: WaveRow[]; stroke: string; opacity: (row: WaveRow, i: number) => number }) {
  return (
    <>
      {rows.map((row, i) => (
        <polyline
          key={i}
          className="flow-line"
          points={row.points}
          fill="none"
          stroke={stroke}
          strokeWidth={row.stroke}
          opacity={r2(opacity(row, i))}
          style={{ "--drift": `${row.drift}s`, "--shift": `${-row.period}px` } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/** The strip behind the masthead: teal only, no sun, no path. */
export function RiverStrip({ className = "" }: { className?: string }) {
  const height = 74;
  const rows = waveRows({ width: W, height, rows: 6, top: 4 });
  const steps = [0.9, 0.72, 0.55, 0.4, 0.26, 0.14];
  return (
    <InView live className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        className="block"
      >
        <Waves rows={rows} stroke="var(--teal)" opacity={(_, i) => steps[i] ?? 0.1} />
      </svg>
    </InView>
  );
}

/** The sun on the horizon, its lower part hidden behind the water. */
function Sun({ fill }: { fill: string }) {
  const above = r2(1.35 * SUN_R);
  const s = horizonSun({ cx: SUN_R, horizonY: above, r: SUN_R });
  const dy = s.clipBelow - s.cy;
  const dx = Math.sqrt(s.r * s.r - dy * dy);
  const d = `M${r2(s.cx - dx)} ${r2(s.clipBelow)}A${s.r} ${s.r} 0 1 1 ${r2(s.cx + dx)} ${r2(s.clipBelow)}Z`;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${2 * SUN_R} ${above}`}
      width={2 * SUN_R}
      height={above}
      className="absolute block"
      style={{ left: `${SUN_X * 100}%`, top: r2(HORIZON - above), transform: "translateX(-50%)" }}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

export function RiverHorizon({
  height,
  sun = true,
  night = false,
  breathe = false,
  className = "",
}: {
  height: number;
  sun?: boolean;
  night?: boolean;
  breathe?: boolean;
  className?: string;
}) {
  const waterTop = HORIZON + 2;
  const waterH = Math.max(24, height - waterTop);
  const count = Math.min(16, Math.max(6, Math.round(waterH / 12.5)));
  const rows = waveRows({ width: W, height: waterH, rows: count, top: 3 });
  const dashes = sun ? sunPath(rows, { sunX: SUN_X * W, width: W }) : [];
  const colour = night
    ? { waves: NIGHT_RIVER.waves, sun: NIGHT_RIVER.sun, path: NIGHT_RIVER.path, horizon: NIGHT_RIVER.waves }
    : { waves: "var(--teal)", sun: "var(--sindoor)", path: "var(--marigold)", horizon: "var(--ink)" };
  const dim = night ? 0.6 : 1;

  return (
    <InView live className={`pointer-events-none relative ${className}`}>
      <div aria-hidden="true" className="relative" style={{ height }}>
        {sun ? <Sun fill={colour.sun} /> : null}
        <div className="absolute inset-x-0" style={{ top: HORIZON, borderTop: `1.5px solid ${colour.horizon}` }} />
        <svg
          viewBox={`0 0 ${W} ${waterH}`}
          width="100%"
          height={waterH}
          preserveAspectRatio="none"
          className="absolute inset-x-0 block overflow-hidden"
          style={{ top: waterTop }}
        >
          <g className={breathe ? "breathe-waves" : undefined}>
            <Waves rows={rows} stroke={colour.waves} opacity={(row) => row.opacity * dim} />
            {dashes.map((d, i) => (
              <rect
                key={i}
                className="flow-glint"
                x={d.x}
                y={d.y}
                width={d.w}
                height={d.h}
                fill={colour.path}
                style={
                  {
                    "--glint": `${3 + (i % 3)}s`,
                    "--glint-from": `${r2(-0.5 - d.w * 0.08)}px`,
                    "--glint-to": `${r2(0.5 + d.w * 0.08)}px`,
                    animationDelay: `${r2(-0.37 * i)}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </g>
        </svg>
      </div>
    </InView>
  );
}
