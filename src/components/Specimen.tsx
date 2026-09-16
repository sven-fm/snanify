import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   A Sankalp Patra, shown to somebody who has not paid.

   The sheet is drawn from today's figure by the /specimen route, and it sits
   inside the outline of a phone, because that is where it lives: it is sent
   into a family group and opened on one.

   THE PHONE IS BUILT AROUND THE SHEET, NOT THE SHEET FITTED TO A PHONE. The
   sheet is 1080 by 1920, nine by sixteen. The screen is that ratio plus a
   strip of paper at the top for the island to sit on, and the frame is the
   screen plus a bezel, so nothing is cropped and nothing is stretched. All
   the numbers below are in the frame's own units (90 wide); the CSS
   percentages are those numbers over the frame's size, so the picture holds
   at any width.

   The outline is the one rounded shape on the site, drawn as SVG so the base
   layer's square corners do not apply; a phone with square corners reads as a
   television. The screen's corners are cut with clip-path for the same reason.
   --------------------------------------------------------------------------- */

/* Frame units. */
const BEZEL = 3;
const STRIP = 8;
const SCREEN_W = 84;
const SHEET_H = (SCREEN_W * 1920) / 1080; // 149.33
const SCREEN_H = STRIP + SHEET_H; // 157.33
const FRAME_W = SCREEN_W + BEZEL * 2; // 90
const FRAME_H = SCREEN_H + BEZEL * 2; // 163.33

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

export function Specimen({
  lang,
  className = "",
  caption = true,
}: {
  lang: Lang;
  className?: string;
  /** The line under the phone. Off where the surrounding copy says it. */
  caption?: boolean;
}) {
  const t = content[lang].specimen;
  const src = localePath(lang, "/specimen");

  return (
    <figure className={`pull ${className}`}>
      <div
        className="relative mx-auto w-full max-w-[280px]"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        {/* The screen: paper, with its corners cut. */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: pct(BEZEL, FRAME_W),
            top: pct(BEZEL, FRAME_H),
            width: pct(SCREEN_W, FRAME_W),
            height: pct(SCREEN_H, FRAME_H),
            backgroundColor: "#faf6ea",
            clipPath: "inset(0 round 0.55rem)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={t.alt}
            width={1080}
            height={1920}
            loading="lazy"
            className="absolute inset-x-0 block w-full"
            style={{ top: pct(STRIP, SCREEN_H), height: pct(SHEET_H, SCREEN_H) }}
          />
        </div>
        {/* The frame and the island, over the screen. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${FRAME_W} ${FRAME_H.toFixed(2)}`}
          className="absolute inset-0 h-full w-full text-ink"
          fill="none"
        >
          <rect x="0.75" y="0.75" width={FRAME_W - 1.5} height={(FRAME_H - 1.5).toFixed(2)} rx="11" stroke="currentColor" strokeWidth="1.5" />
          <rect x="28" y={BEZEL + 2} width="34" height="5" rx="2.5" fill="currentColor" />
        </svg>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-sm leading-[1.6] text-ink2">
          <span className="label mr-2 text-spot">{t.label}</span>
          {t.caption}
        </figcaption>
      )}
    </figure>
  );
}
