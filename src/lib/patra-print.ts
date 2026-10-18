/* ---------------------------------------------------------------------------
   The owner's sheet on paper: one page, A4 or US Letter.

   The sheet is set in container units, so it scales as one block and its
   height is a fixed multiple of its width: two names and a short sankalp run
   about 1.9 times as tall as wide, five names, the prayer and a full sankalp
   about 2.6. The printed column is chosen from that ratio, just before the
   print, so the whole of it ends inside the shorter of the two papers.

   The fallback width, plain CSS used whenever the browser prints without
   telling the page first, fits the tallest sheet the form allows at all:
   five names of 60 characters, the longest prayer and 280 characters of
   sankalp, measured by tests/e2e/patra-print.spec.ts on /p/specimen?worst=1.
   --------------------------------------------------------------------------- */

/** US Letter is 279.4mm tall; less the 10mm margins and a little air. */
export const PRINT_HEIGHT_MM = 250;

/** The widest the column prints, so a short sheet stays a sheet. */
export const PRINT_MAX_MM = 140;

/** The tallest sheet the form allows, height over width: 3.47 measured in
    English (Latin capitals wrap first), 3.07 in Hindi, rounded up. */
export const PRINT_WORST_RATIO = 3.5;

/** The column when nothing measured it: the worst ratio inside the height. */
export const PRINT_FALLBACK_MM = Math.floor(PRINT_HEIGHT_MM / PRINT_WORST_RATIO);

/** The custom property the measured width is written to. */
export const PRINT_WIDTH_VAR = "--patra-print-width";

/** The printed width, in millimetres, for a block `ratio` times as tall as wide. */
export function printWidthMm(ratio: number): number {
  if (!Number.isFinite(ratio) || ratio <= 0) return PRINT_FALLBACK_MM;
  return Math.floor(Math.min(PRINT_MAX_MM, PRINT_HEIGHT_MM / ratio));
}
