/* ---------------------------------------------------------------------------
   The limits the setup form and its validator both need.

   THIS FILE HAS NO IMPORTS, ON PURPOSE. They used to live in
   src/lib/profile-input.ts, which imports the muhurat dataset to check a water
   slug. That module parses and validates a large JSON file at load, and the
   form importing one constant from it pulled the whole thing into the browser
   bundle, where evaluating it broke hydration on /setup: React discarded the
   server HTML and rebuilt the page on every first load.

   A leaf module is the fix and the guard. Anything a client component needs
   from the validator belongs here, where it can be imported without dragging
   a dataset along behind it.
   --------------------------------------------------------------------------- */

export const LIMITS = {
  /** Names on a sheet. Five is what the sheet's title block can set. */
  maxNames: 5,
  /** One name. Long enough for "Lakshmi Narayanan Venkataraman". */
  nameChars: 60,
  /** The vow. Two or three sentences, which is what people actually write. */
  sankalpChars: 280,
  /**
   * The largest portrait the form sends and src/lib/portrait.ts accepts.
   * Vercel Functions take a request body of 4.5 MB at most, the other fields
   * and the multipart framing included, so four leaves the rest room. The
   * browser shrinks a photograph to well under this before it is sent.
   */
  portraitBytes: 4 * 1024 * 1024,
} as const;
