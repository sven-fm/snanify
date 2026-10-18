import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   The phone: the one rounded frame on the site, drawn like a current iPhone.
   The specimen sheet sits in it on the landing, /snan and /begin, and the
   looped sitting on /snan. One component, so every phone is the same phone.

   THE PHONE IS BUILT AROUND THE SCREEN'S CONTENT, NOT THE CONTENT FITTED TO
   A PHONE. The content box is nine by sixteen, the sheet's own ratio
   (1080 by 1920). Above it sits a status bar, as tall as an iPhone's, with
   the small island in it and the hour beside the island, so the island
   covers nothing. Around the screen runs a thin black bezel, and around
   that a hairline band in ink-2, the metal edge.

   All numbers are in the frame's own units, 100 wide. The CSS percentages
   are those numbers over the frame's size, so the picture holds at any
   width, from the 136px phone beside the packs on /begin to the 320px one
   on a desktop landing.

   The base layer sets border-radius to zero everywhere, so corners are cut
   with clip-path. The corner radius is 15% of the width, the iPhone's.
   --------------------------------------------------------------------------- */

const FRAME_W = 100;
const BAND = 0.9; // the metal edge
const BEZEL = 2.6; // the black glass border, inside the band
const EDGE = BAND + BEZEL;
const SCREEN_W = FRAME_W - EDGE * 2; // 93
/** The status bar: an iPhone's 54pt over 393pt, at this screen's width. */
const STATUS = 12.6;
const CONTENT_H = (SCREEN_W * 16) / 9; // 165.33
const SCREEN_H = STATUS + CONTENT_H;
const FRAME_H = SCREEN_H + EDGE * 2;
const RADIUS = 15;

/* The island: a small pill, 28% of the width, centred, in the status bar. */
const ISLAND_W = 28;
const ISLAND_H = 7.6;
const ISLAND_TOP = 2.4; // below the screen's top edge

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;
/** clip-path corners: horizontal radius over the width, vertical over the height. */
const round = (r: number, w: number, h: number) => `inset(0 round ${pct(r, w)} / ${pct(r, h)})`;

/** The status bar's height as a share of the content box, for a screen that
    wants to paint the bar too (a dark stillness): top: -PHONE_STATUS_OVER. */
export const PHONE_STATUS_OVER = pct(STATUS, CONTENT_H);

/** The frame's geometry, exported for the unit test. */
export const PHONE_GEOMETRY = {
  FRAME_W,
  FRAME_H,
  SCREEN_W,
  SCREEN_H,
  STATUS,
  CONTENT_H,
  RADIUS,
  EDGE,
  ISLAND: { top: EDGE + ISLAND_TOP, height: ISLAND_H, width: ISLAND_W },
} as const;

export function Phone({
  children,
  screenClassName = "bg-paper text-ink",
  className = "",
}: {
  /** The content, laid out in a nine by sixteen box under the status bar. */
  children: ReactNode;
  /** The screen's own paper and ink, which the status bar shares. */
  screenClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={`phone @container relative mx-auto w-full bg-ink2 ${className}`}
      style={{
        aspectRatio: `${FRAME_W} / ${FRAME_H.toFixed(3)}`,
        clipPath: round(RADIUS, FRAME_W, FRAME_H),
      }}
    >
      {/* The bezel, inside the metal band. */}
      <div
        className="absolute bg-[#0b0a08]"
        style={{
          left: pct(BAND, FRAME_W),
          top: pct(BAND, FRAME_H),
          width: pct(FRAME_W - BAND * 2, FRAME_W),
          height: pct(FRAME_H - BAND * 2, FRAME_H),
          clipPath: round(RADIUS - BAND, FRAME_W - BAND * 2, FRAME_H - BAND * 2),
        }}
      />

      {/* The screen: the status bar, then the content below it. */}
      <div
        data-phone="screen"
        className={`absolute overflow-hidden ${screenClassName}`}
        style={{
          left: pct(EDGE, FRAME_W),
          top: pct(EDGE, FRAME_H),
          width: pct(SCREEN_W, FRAME_W),
          height: pct(SCREEN_H, FRAME_H),
          clipPath: round(RADIUS - EDGE, SCREEN_W, SCREEN_H),
        }}
      >
        {/* The status bar: the hour on the left, the battery on the right,
            each centred on the island's line. Decoration, so hidden from
            readers, and dropped on a phone under 180px wide (the one beside
            the packs on /begin), where the hour would be a 5px smudge. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 flex items-center justify-between @max-[180px]:hidden"
          style={{
            height: pct(ISLAND_TOP * 2 + ISLAND_H, SCREEN_H),
            paddingInline: "9cqw",
            fontSize: "4cqw",
            lineHeight: 1,
          }}
        >
          <span className="tabular-nums" style={{ fontWeight: 700 }}>
            6:00
          </span>
          <svg viewBox="0 0 26 12" style={{ width: "7.5cqw" }} fill="currentColor">
            <rect x="0.75" y="0.75" width="21" height="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
            <rect x="2.75" y="2.75" width="17" height="6.5" />
            <rect x="23.25" y="4" width="2" height="4" opacity="0.45" />
          </svg>
        </div>

        <div
          data-phone="content"
          className="phone-content absolute inset-x-0 bottom-0"
          style={{ height: pct(CONTENT_H, SCREEN_H) }}
        >
          {children}
        </div>
      </div>

      {/* The island, inside the status bar, clear of the content. */}
      <div
        aria-hidden="true"
        data-phone="island"
        className="absolute bg-[#0b0a08]"
        style={{
          left: pct((FRAME_W - ISLAND_W) / 2, FRAME_W),
          top: pct(EDGE + ISLAND_TOP, FRAME_H),
          width: pct(ISLAND_W, FRAME_W),
          height: pct(ISLAND_H, FRAME_H),
          clipPath: "inset(0 round 999px)",
        }}
      />
    </div>
  );
}
