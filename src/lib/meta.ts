/* ---------------------------------------------------------------------------
   The Meta Pixel and the Conversions API: what is shared between the browser,
   the proxy and the server.

   WHERE IT RUNS. The EU, the rest of the EEA, the UK and Switzerland ask for
   consent before an advertising script loads; everywhere else the law lets
   Meta measure from the first visit. src/proxy.ts reads Vercel's geo header
   and writes `snf-ads`: "1" outside those countries, "ask" inside them. Where
   it says "ask", the cookie notice (src/components/ConsentBanner.tsx) asks,
   and the pixel loads only after a yes; see src/lib/consent.ts. A purchase is
   sent to the Conversions API under the same rule, decided when the checkout
   began. An unknown country (local development, a missing header) is
   treated as one that asks.

   NOTHING RUNS WITHOUT AN ID. With NEXT_PUBLIC_META_PIXEL_ID unset the pixel
   is never injected and the server sends nothing, so the code ships inert
   and switches on with an environment variable.
   --------------------------------------------------------------------------- */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** "1" where Meta may measure from the first visit, "ask" where the reader is asked first. */
export const ADS_COOKIE = "snf-ads";

/** The EU twenty-seven, the rest of the EEA, the UK and Switzerland. */
const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB", "CH",
]);

/** Whether Meta may measure a reader from this country without asking first. */
export function adsAllowed(country: string | null | undefined): boolean {
  if (!country) return false;
  return !CONSENT_COUNTRIES.has(country.toUpperCase());
}
