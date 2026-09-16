import { engrave, strokeOpacity, strokeWidth } from "@/lib/engraving";

/* ---------------------------------------------------------------------------
   A band of engraved water that never stops moving.

   The same lines the Sankalp Patra carries, drawn from a seed so a page's
   water is the same water each visit, flowing steadily downward. The drawing
   is stacked twice and the stack slides down by one copy on a loop, so the
   motion has no seam and no turn. Transform only, on the SVG element in
   screen pixels, so it costs a phone nothing and it stops under
   prefers-reduced-motion. No JavaScript: the motion is the stylesheet's.

   It used to breathe, four seconds up and six down like the sitting. On a
   band forty pixels tall that read as a squeeze rather than as water.
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
  faint = false,
}: {
  /** Names the water: a page slug, a river slug. */
  seed: string;
  /** Sets the amplitude and the density of the lines, 0 to 100. */
  percentile?: number;
  /** Sizes the band; give it a height and a width. */
  className?: string;
  /** Faint grey lines edge to edge, for a screen rather than a band. The
      caller positions it; the band's own `relative` is left off. */
  faint?: boolean;
}) {
  const drawn = engrave({ seed: seedFor(seed), percentile, width: 1000, height: 300, flat: true });
  const lines = drawn.lines.map((d, i, all) => (
    <path
      key={i}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth(i, all.length) * 1.4}
      strokeOpacity={strokeOpacity(i, all.length)}
      vectorEffect="non-scaling-stroke"
    />
  ));
  /* One water, strongest at its crown and gone by its foot. */
  const fade = "linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)";
  return (
    <div
      className={`${faint ? "" : "relative"} overflow-hidden ${className}`}
      aria-hidden="true"
      style={faint ? undefined : { maskImage: fade, WebkitMaskImage: fade }}
    >
      {/* Twice the band's height, its top one copy above the band, sliding
          down by one copy: the second drawing arrives exactly where the
          first began. The drawing is cut flat, so the two meet without a
          seam. */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className={`flow absolute left-[-4%] top-[-100%] h-[200%] w-[108%] ${faint ? "text-ink2 opacity-30" : "text-ink"}`}
      >
        <g>{lines}</g>
        <g transform="translate(0 300)">{lines}</g>
      </svg>
    </div>
  );
}
