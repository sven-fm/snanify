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

   The phone is the one rounded shape on the site. The base layer sets
   border-radius to zero everywhere, so its corners are cut with clip-path
   instead; a phone with square corners reads as a television.
   --------------------------------------------------------------------------- */

/* Frame units: the screen is the sheet's own ratio, nine by sixteen, and the
   body is the screen plus a bezel. The island sits over the sheet's top
   margin, which is paper and water, so it covers no type. */
const BEZEL = 3;
const SCREEN_W = 84;
const SCREEN_H = (SCREEN_W * 1920) / 1080; // 149.33
const FRAME_W = SCREEN_W + BEZEL * 2; // 90
const FRAME_H = SCREEN_H + BEZEL * 2; // 155.33

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
      {/* The body: ink, with rounded corners cut by clip-path. */}
      <div
        className="relative mx-auto w-full max-w-[280px] bg-ink"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}`, clipPath: "inset(0 round 1.4rem)" }}
      >
        {/* The screen: the sheet, edge to edge, its corners cut. */}
        <div
          className="absolute overflow-hidden bg-[#faf6ea]"
          style={{
            left: pct(BEZEL, FRAME_W),
            top: pct(BEZEL, FRAME_H),
            width: pct(SCREEN_W, FRAME_W),
            height: pct(SCREEN_H, FRAME_H),
            clipPath: "inset(0 round 0.8rem)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={t.alt}
            width={1080}
            height={1920}
            loading="lazy"
            className="absolute inset-0 block h-full w-full"
          />
        </div>
        {/* The island, over the sheet's top margin. */}
        <div
          aria-hidden="true"
          className="absolute bg-ink"
          style={{
            left: pct(28, FRAME_W),
            top: pct(BEZEL + 2.2, FRAME_H),
            width: pct(34, FRAME_W),
            height: pct(5, FRAME_H),
            clipPath: "inset(0 round 999px)",
          }}
        />
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
