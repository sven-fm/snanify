import { type CSSProperties, useId } from "react";
import { CLIP_R, HORIZON_Y, MARK_FULL, MARK_SMALL, sunPath } from "@/lib/logo-svg";

/**
 * The horizon sun (spec 6.9).
 *
 * The idea is the old one, the sun over the water and the bindu over the
 * river, drawn as the v3 river: an ink ring on paper, a sindoor sun cut by an
 * ink horizon through the middle, and teal water bands widening toward the
 * viewer, trimmed by the ring the way a printed block is trimmed by its seal.
 * The marigold path stays out of the mark.
 *
 * Every colour is a token, so the night edition (`.dark` on <html>) recolours
 * it by itself: ring and horizon in the night ink, water and sun brighter.
 * The ring's ground is paper, so the mark reads on the strip's waves.
 *
 * `small` is the cut for 16 and 32 pixels: a thicker ring, a larger sun and
 * two thick bands, because three thin ones merge at that size. The geometry
 * lives in src/lib/logo-svg.ts, shared with the icon files.
 */
export function Mark({ className = "", small = false }: { className?: string; small?: boolean }) {
  const clip = `snf-mark-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const cut = small ? MARK_SMALL : MARK_FULL;

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="24" cy="24" r={CLIP_R} />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r={cut.ring.r} fill="var(--paper)" stroke="currentColor" strokeWidth={cut.ring.stroke} />
      <g clipPath={`url(#${clip})`}>
        <path d={sunPath(cut.sun)} fill="var(--sindoor)" />
        <rect y={HORIZON_Y} width="48" height={cut.horizon} fill="currentColor" />
        <g fill="var(--teal)">
          {cut.water.map(([x, y, w, h]) => (
            <rect key={y} x={x} y={y} width={w} height={h} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * The logotype: "Snanify" in one heavy weight, Eczar 800, mixed case so it
 * stays a name, with the dot of the i inked as the sindoor bindu.
 *
 * The dot is drawn, not typed. Two reasons it has to be:
 *
 * 1. The base layer sets border-radius: 0 !important on everything, so a
 *    rounded span would print as a square. The bindu is an SVG circle.
 * 2. The letter under it is U+0131, the dotless i, because Eczar's own tittle
 *    would otherwise sit beside the bindu.
 *
 * The visible string is therefore not "Snanify", which is why the lettering is
 * aria-hidden and the real name is carried in a sr-only span beside it. Without
 * that, a screen reader says "Snan" plus a stray letter, find-in-page misses the
 * brand, and copying the masthead yields a Turkish i.
 *
 * The dot's geometry lives in globals.css, in em, measured off the live 800
 * face. It holds only while the wordmark stays at line-height: 1, which is why
 * the utility sets it explicitly.
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
        Snan
        <span className="wordmark-i">
          {"ı"}
          <svg viewBox="0 0 10 10" className="wordmark-bindu" aria-hidden="true">
            <circle cx="5" cy="5" r="5" fill="var(--sindoor)" />
          </svg>
        </span>
        fy
      </span>
      <span className="sr-only">Snanify</span>
    </span>
  );
}

/**
 * Masthead lockup: the mark, then the word, centred on each other. The mark
 * stands a shade taller than the word's capitals so the ring reads as a seal
 * beside the name.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="h-[30px] w-[30px] shrink-0 text-ink" />
      <Wordmark className="text-[24px] text-ink" />
    </span>
  );
}

/**
 * The large colophon, for page heads and the foot of the Patra: the full mark
 * with the wordmark set under it, one block that scales with its box. The
 * word is HTML inside a foreignObject, so it keeps the measured bindu and the
 * live face while the whole block scales as one drawing.
 */
export function Colophon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <svg x="34" y="0" width="132" height="132">
        <Mark />
      </svg>
      <foreignObject x="0" y="146" width="200" height="54">
        <div style={{ textAlign: "center", lineHeight: 1 }}>
          <Wordmark style={{ fontSize: 44 }} />
        </div>
      </foreignObject>
    </svg>
  );
}

/** Retained so pages written against the previous mark keep compiling. */
export const SealAnimated = Colophon;
