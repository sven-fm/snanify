/* ---------------------------------------------------------------------------
   The owner's sheet on paper: one page, A4 or US Letter.

   The sheet is set in container units, so it scales as one block and its
   height is a fixed multiple of its width: two names and a short sankalp run
   about 1.9 times as tall as wide, five names, the prayer and a full sankalp
   about 2.6. The printed column is chosen from that ratio, just before the
   print, so the whole of it ends inside the shorter of the two papers.

   The fallback width, used when the browser prints without telling the page
   first, fits the tallest sheet the form allows in practice.
   --------------------------------------------------------------------------- */

/** US Letter is 279.4mm tall; less the 10mm margins and a little air. */
export const PRINT_HEIGHT_MM = 253;

/** The widest the column prints, so a short sheet stays a sheet. */
export const PRINT_MAX_MM = 140;

/** The column when nothing measured it: five names, the prayer, 280 characters. */
export const PRINT_FALLBACK_MM = 96;

/** The custom property the measured width is written to. */
export const PRINT_WIDTH_VAR = "--patra-print-width";

/** The printed width, in millimetres, for a block `ratio` times as tall as wide. */
export function printWidthMm(ratio: number): number {
  if (!Number.isFinite(ratio) || ratio <= 0) return PRINT_FALLBACK_MM;
  return Math.floor(Math.min(PRINT_MAX_MM, PRINT_HEIGHT_MM / ratio));
}
