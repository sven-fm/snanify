/* ---------------------------------------------------------------------------
   How long the snan is, in one place.

   These five numbers are printed on the landing page and on /snan, and they
   drive the state machine that runs the sitting. They were written out in
   three copy files and one component before, in two languages, which is four
   places for them to disagree and no way to notice. Copy reads them through
   `SITTING`, the machine reads them through `SITTING`, and a change is one
   edit.

   WHY THESE LENGTHS. The form was four and a half minutes. It is three, and
   the cut came out of the two limbs a reader loses patience with first on
   morning three: the reading and the breath. The eleven-second hold and the
   stillness are the parts people come back for, so the stillness keeps a full
   minute and the hold keeps its eleven seconds exactly.

   Next moves on early from the reading, the breath and the stillness; the
   owner opened the stillness on 16 September 2026. Pressing nothing is still
   the whole form, and the stillness shows its seconds while it runs.
   --------------------------------------------------------------------------- */

export const SITTING = {
  /** The water, its flow, its rank, the day. */
  reading: 15,
  /** The waterline rises and falls at the river's own amplitude. */
  breath: 45,
  /** Your words, held under your thumb while the ink fills. */
  hold: 11,
  /** The screen goes fully black. */
  stillness: 60,
  /** One line writes itself into your register. */
  mark: 20,
} as const;

export type Limb = keyof typeof SITTING;

/** The order the limbs run in. The machine walks this array. */
export const LIMB_ORDER = ["reading", "breath", "hold", "stillness", "mark"] as const;

/** The whole sitting, in seconds. */
export const TOTAL_SECONDS: number = LIMB_ORDER.reduce((n, limb) => n + SITTING[limb], 0);

/** Where each limb starts, in seconds from the beginning. Used by the clock column. */
export const LIMB_START: Record<Limb, number> = (() => {
  let at = 0;
  const out = {} as Record<Limb, number>;
  for (const limb of LIMB_ORDER) {
    out[limb] = at;
    at += SITTING[limb];
  }
  return out;
})();

/** "1:11", for the clock column on /snan. */
export function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
