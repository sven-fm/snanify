/* ---------------------------------------------------------------------------
   Is an occasion being kept today? The festival panel (spec 6.6) shows on an
   occasion page only inside its window, and the page is regenerated once a
   day, so the answer is worked out in the browser from the dates already in
   the HTML. Pure and dependency free so it costs the client nothing: it does
   not pull astronomy-engine in with src/lib/occasions.ts.
   --------------------------------------------------------------------------- */

export type DayWindow = { readonly date: string; readonly to?: string };

const IST = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The civil day in India, "2026-11-24". */
export function istToday(now = new Date()): string {
  return IST.format(now);
}

/** The window holding today in India (its first and last day included), if any. */
export function inWindow<T extends DayWindow>(dates: readonly T[], now = new Date()): T | null {
  return windowOn(dates, istToday(now));
}

/** The window holding a given civil day in India, "2026-11-24", if any. */
export function windowOn<T extends DayWindow>(dates: readonly T[], today: string): T | null {
  return dates.find((d) => d.date <= today && today <= (d.to ?? d.date)) ?? null;
}
