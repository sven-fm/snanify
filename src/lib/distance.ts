/* ---------------------------------------------------------------------------
   How far the reader is from the ghat.

   Vercel puts the request's coordinates on `x-vercel-ip-latitude` and
   `x-vercel-ip-longitude`. An IP fix is a city, not a street, so the
   great-circle distance is rounded to the nearest ten kilometres. Null where
   the request carries no fix (local development, a proxy that strips them),
   and then the reading has no distance row and the sheet no distance.
   --------------------------------------------------------------------------- */

const EARTH_KM = 6371;

export function greatCircleKm(
  from: readonly [number, number],
  to: readonly [number, number],
): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const [lat1, lon1] = from;
  const [lat2, lon2] = to;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return EARTH_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** The request's fix, from Vercel's headers, or null. */
export function requestFix(head: { get(name: string): string | null }): [number, number] | null {
  const lat = Number(head.get("x-vercel-ip-latitude"));
  const lon = Number(head.get("x-vercel-ip-longitude"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || (lat === 0 && lon === 0)) return null;
  return [lat, lon];
}

/** Kilometres from the request to the ghat, to the nearest ten, or null. */
export function distanceKm(
  head: { get(name: string): string | null },
  ghat: readonly [number, number],
): number | null {
  const fix = requestFix(head);
  if (!fix) return null;
  return Math.round(greatCircleKm(fix, ghat) / 10) * 10;
}
