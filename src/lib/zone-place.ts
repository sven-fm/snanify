import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   A time zone as a reader says it.

   The browser hands over an IANA name, "America/Toronto" or
   "America/Argentina/Buenos_Aires". That is a database key, and printed on a
   sheet it reads like one. People say "six in the morning in Toronto", so the
   sheet, the setup form and the printable all print the place: the last
   segment of the key, with its underscores as spaces.

   The place stays in Latin letters in both editions. It is the city's own
   name as the reader's phone writes it, and a transliteration of every zone
   in the database would be a guess for most of them.
   --------------------------------------------------------------------------- */

const SPECIAL: Record<string, string> = {
  "Asia/Kolkata": "India",
  "Asia/Calcutta": "India",
  UTC: "UTC",
  "Etc/UTC": "UTC",
  "Etc/GMT": "GMT",
};

/** "America/New_York" -> "New York". */
export function zonePlace(tz: string): string {
  if (SPECIAL[tz]) return SPECIAL[tz];
  const last = tz.split("/").pop() ?? tz;
  return last.replace(/_/g, " ");
}

/** "06:12 in Toronto", or "Toronto में 06:12" in the Hindi edition. */
export function timeAtPlace(time: string, tz: string, lang: Lang): string {
  const place = zonePlace(tz);
  return lang === "hi" ? `${place} में ${time}` : `${time} in ${place}`;
}
