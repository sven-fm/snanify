import { type CSSProperties, useId } from "react";

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

/**
 * The logotype.
 *
 * Two things are happening. The word is set in mixed case in two weights, the
 * Sanskrit root heavy and the English suffix light, so the eye reads SNAN first
 * and the word has ascenders and a descender to be recognised by rather than
 * the even grey of letter-spaced caps. And the dot of the i is the bindu, in
 * the spot colour, so the seal's one idea recurs inside the word instead of
 * standing next to it.
 *
 * The dot is drawn, not typed. Two reasons it has to be:
 *
 * 1. The base layer sets border-radius: 0 !important on everything, so a
 *    rounded span would print as a square. The seal draws its bindu as an SVG
 *    circle and so does this.
 * 2. The letter under it is U+0131, the dotless i, because Eczar's own tittle
 *    would otherwise sit above the bindu.
 *
 * The visible string is therefore not "Snanify", which is why the lettering is
 * aria-hidden and the real name is carried in a sr-only span beside it. Without
 * that, a screen reader says "Snan" plus a stray letter, find-in-page misses the
 * brand, and copying the masthead yields a Turkish i.
 *
 * The geometry of the dot lives in globals.css, in em, measured off the live
 * face: 0.152em across, 0.826em up from the box bottom, centred at 46.1% of the
 * i's advance. That last figure only holds while the wordmark stays at
 * line-height: 1, which is why the utility sets it explicitly.
 */
export function Wordmark({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`wordmark ${className}`} style={style}>
      {/* select-none so a reader copying the masthead gets the sr-only
          "Snanify" and not that string glued to a Turkish-i version of it. */}
      <span aria-hidden="true" className="select-none">
        <span className="wordmark-root">Snan</span>
        <span className="wordmark-suffix">
          <span className="wordmark-i">
            {"ı"}
            <svg viewBox="0 0 10 10" className="wordmark-bindu" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="var(--spot)" />
            </svg>
          </span>
          fy
        </span>
      </span>
      <span className="sr-only">Snanify</span>
    </span>
  );
}

/**
 * Masthead lockup: seal, then the word, baseline aligned.
 *
 * The hairline that used to sit between them is gone. It was there to hold an
 * icon and a label apart, and this is not an icon with a label: the word now
 * carries the seal's own bindu, so the two read as one printed block without a
 * rule to bind them. The seal is nudged down 0.14em, not the old 0.2em, because
 * a mixed-case word puts its optical centre lower than caps do.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[11px] sm:gap-3 ${className}`}>
      <Mark className="h-7 w-7 shrink-0 translate-y-[0.14em] text-ink" />
      <Wordmark className="text-[22px] text-ink sm:text-[24px]" />
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
