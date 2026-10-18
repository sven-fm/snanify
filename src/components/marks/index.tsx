/* The bindu: the one mark design system v3 keeps. It is the logo's sun, the
   dot of the wordmark's dotless i, the selected radio, the current step and
   the live status dot. SVG, because the base layer squares every box and a
   bindu is round, sized in em so it scales with the type beside it, and
   hidden from assistive tech. See DESIGNSYSTEM.md, The kit. */

type MarkProps = { className?: string };

/** One sindoor dot: the selected radio, the current step. `faint` is the
 *  step still ahead. A prop rather than a colour class, because two text
 *  colours on one element resolve by stylesheet order, not by class order. */
export function Bindu({ className = "", tone = "sindoor" }: MarkProps & { tone?: "sindoor" | "faint" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className={`h-[0.5em] w-[0.5em] ${className}`}>
      <circle cx="5" cy="5" r="5" fill={tone === "sindoor" ? "var(--sindoor)" : "var(--rule)"} />
    </svg>
  );
}
