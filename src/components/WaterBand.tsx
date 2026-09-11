import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";

/* ---------------------------------------------------------------------------
   A band of engraved water that never stops moving.

   The same lines the Sankalp Patra carries, drawn from a seed so a page's
   water is the same water each visit, breathing four seconds in and six out
   and swaying on a slower cycle underneath. Transform only, on the SVG
   element in screen pixels, so it costs a phone nothing and it stops under
   prefers-reduced-motion. No JavaScript: the motion is the stylesheet's.
   --------------------------------------------------------------------------- */

/** A stable hex seed from any short string. */
function seedFor(key: string): string {
  let h = 2166136261;
  for (const ch of key) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h.toString(16).padStart(8, "0").repeat(8);
}

export function WaterBand({
  seed,
  percentile = 55,
  className = "",
}: {
  /** Names the water: a page slug, a river slug. */
  seed: string;
  /** Sets the amplitude and the density of the lines, 0 to 100. */
  percentile?: number;
  /** Sizes the band; give it a height and a width. */
  className?: string;
}) {
  const drawn = engrave({ seed: seedFor(seed), percentile, width: 1000, height: 300 });
  const amp = 4 + (percentile / 100) * 10;
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        className="breathe absolute top-0 left-[-4%] h-full w-[108%] text-ink"
        style={{ ["--amp" as string]: `${amp.toFixed(1)}px` }}
      >
        <g className="sway">
          {drawn.lines.map((d, i, all) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth(i, all.length) * 1.4}
              strokeOpacity={strokeOpacity(i, all.length)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
