/* ---------------------------------------------------------------------------
   The seed a Sankalp Patra is engraved from.

   This is the one genuinely unforgeable thing in the product, and the reason
   the sheet is worth keeping. The engraving is drawn deterministically from
   this seed, and the seed is a SHA-256 of four public facts printed on the
   sheet itself:

     <sitting id> | <water> | <the day the model published for> | <the flow>

   So anyone holding a Patra can fetch that day's figure from Copernicus
   through Open-Meteo, rebuild the line below, hash it, and get the same
   sixty-four characters. Forging a Patra means forging the flood model's
   published record first.

   TWO RULES THIS FILE EXISTS TO ENFORCE.

   1. THE FIGURE IN THE LINE IS THE FIGURE ON THE SHEET. `discharge` is rounded
      to two decimals here and printed to two decimals there. A raw float would
      serialise as 1443.6200000000001 in one place and 1443.62 in another, and
      the reader's recomputation would fail for a reason nobody could ever
      diagnose. Same class of bug as the SVG hydration mismatch in CLAUDE.md.
   2. THE LINE IS PART OF THE PRODUCT, NOT AN IMPLEMENTATION DETAIL. Changing
      the order of the fields, the separator, or the rounding invalidates every
      Patra ever issued. If it must change, it changes with a version marker
      and the old scheme keeps working for the sheets that used it.

   Uses Web Crypto, which is present in Node 20+, in the browser and in the
   Vercel runtime, so the same code checks a seed wherever it runs.
   --------------------------------------------------------------------------- */

export type SeedInput = {
  /** The sitting's public identifier, from src/lib/ids.ts. */
  sittingId: string;
  /** The water, keyed as rivers.ts and muhurat.ts key it. */
  waterSlug: string;
  /** The day the flood model published for, ISO, e.g. "2026-08-11". */
  modelledFor: string;
  /** Modelled discharge in m3/s, as fetched. Rounded here, never by the caller. */
  discharge: number;
};

/** How many characters of the seed the sheet prints. Enough to compare by eye. */
export const SEED_SHOWN = 16;

/** The flow, to two decimals, exactly as the sheet prints it. */
export function seedDischarge(discharge: number): string {
  return discharge.toFixed(2);
}

/**
 * The canonical line. Printed on the sheet beside the seed, so a reader can see
 * precisely what was hashed rather than being asked to trust a description.
 */
export function seedLine(input: SeedInput): string {
  return [
    input.sittingId,
    input.waterSlug,
    input.modelledFor,
    seedDischarge(input.discharge),
  ].join("|");
}

/** The full SHA-256 of the canonical line, lowercase hex. */
export async function seedFor(input: SeedInput): Promise<string> {
  const bytes = new TextEncoder().encode(seedLine(input));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** The first sixteen characters, which is what goes on the sheet and in the URL bar. */
export function shortSeed(seed: string): string {
  return seed.slice(0, SEED_SHOWN);
}
