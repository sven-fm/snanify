import { useId } from "react";

/**
 * The Bindu Ripple, cut as a printer's colophon.
 *
 * A solid vermillion bindu over flat ink rules, trimmed by a double-ruled
 * roundel. Everything is solid colour with butt ends, no gradient, no glow,
 * no blur. The rules deliberately run past the roundel and get clipped by it,
 * the way a printed block is trimmed by its seal.
 */
export function Mark({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `snf-seal-${id}`;

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="24" cy="24" r="20" />
        </clipPath>
      </defs>

      {/* double rule, as an almanac sets its borders */}
      <circle cx="24" cy="24" r="23.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />

      <g clipPath={`url(#${clip})`}>
        {/* the bindu, the one spot of colour */}
        <circle cx="24" cy="17.6" r="6.2" fill="var(--spot)" />

        {/* flat water rules, widening as they come forward */}
        <g fill="currentColor">
          <rect x="14" y="27.4" width="20" height="2.2" />
          <rect x="9" y="32" width="30" height="2.2" />
          <rect x="3" y="36.6" width="42" height="2.2" />
        </g>
      </g>
    </svg>
  );
}

/** Masthead lockup: seal + wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-7 w-7 text-ink" />
      <span className="wordmark text-[1.05rem] text-ink">Snanify</span>
    </span>
  );
}

/**
 * The large colophon, for page heads. Same forme at a bigger measure, with the
 * ring of tick marks an almanac uses around a dial. Still entirely flat.
 */
export function Colophon({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `snf-colophon-${id}`;

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="100" cy="100" r="78" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="4" />

      {/* 30 ticks, a printed dial, not a glow.
          Coordinates are rounded: raw floats serialise differently on server
          and client, which React reports as a hydration mismatch. */}
      <g stroke="currentColor" strokeWidth="2">
        {Array.from({ length: 30 }, (_, i) => {
          const a = (i * Math.PI * 2) / 30;
          const x = (r: number) => (100 + Math.cos(a) * r).toFixed(2);
          const y = (r: number) => (100 + Math.sin(a) * r).toFixed(2);
          return <line key={i} x1={x(84)} y1={y(84)} x2={x(90)} y2={y(90)} />;
        })}
      </g>

      <g clipPath={`url(#${clip})`}>
        <circle cx="100" cy="72" r="25" fill="var(--spot)" />
        <g fill="currentColor">
          <rect x="59" y="112" width="82" height="8" />
          <rect x="38" y="132" width="124" height="8" />
          <rect x="14" y="152" width="172" height="8" />
        </g>
      </g>
    </svg>
  );
}

/** Retained so pages written against the previous mark keep compiling. */
export const SealAnimated = Colophon;
