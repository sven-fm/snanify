/* ---------------------------------------------------------------------------
   The Meta Pixel and the Conversions API: what is shared between the browser,
   the proxy and the server.

   WHERE IT RUNS. Until the site has a consent banner, Meta measures only
   visitors outside the countries whose law asks for consent before an
   advertising script loads: the EU, the rest of the EEA, the UK and
   Switzerland. src/proxy.ts reads Vercel's geo header and writes `snf-ads`;
   the pixel loads only where that cookie says "1", and a purchase is sent to
   the Conversions API only when the checkout began under the same rule. An
   unknown country (local development, a missing header) counts as a
   consent country. When the banner ships, `adsAllowed` becomes "the reader
   said yes" and the country list goes.

   NOTHING RUNS WITHOUT AN ID. With NEXT_PUBLIC_META_PIXEL_ID unset the pixel
   is never injected and the server sends nothing, so the code ships inert
   and switches on with an environment variable.
   --------------------------------------------------------------------------- */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** "1" where Meta may measure this reader, "0" everywhere else. */
export const ADS_COOKIE = "snf-ads";

/** The EU twenty-seven, the rest of the EEA, the UK and Switzerland. */
const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB", "CH",
]);

/** Whether Meta may measure a reader from this country, before any banner exists. */
export function adsAllowed(country: string | null | undefined): boolean {
  if (!country) return false;
  return !CONSENT_COUNTRIES.has(country.toUpperCase());
}
