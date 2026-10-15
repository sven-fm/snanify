import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   The shape of a count, and the few sums made on it.

   Pure, so the wording of "how many are left" can be tested without a page.
   The bug this exists for: /today chose its line from the balance BEFORE the
   morning was spent, so the last morning said "One morning left" and the
   second to last said "1 mornings left". The line is chosen from what is
   left AFTER, always.
   --------------------------------------------------------------------------- */

export type Count = "zero" | "one" | "many";

/** Which line a number takes. Anything below one is zero. */
export function countOf(n: number): Count {
  if (n < 1) return "zero";
  return n === 1 ? "one" : "many";
}

/** A zero / one / many line, with `{n}` filled. */
export function countLine(lines: Record<Count, string>, n: number): string {
  return lines[countOf(n)].replace("{n}", String(Math.max(0, n)));
}

/** What is left once the morning in progress is spent. */
export function leftAfterSitting(balance: number): number {
  return Math.max(0, balance - 1);
}

/** Whether a string off a database row names a real pack. */
export function asTier(value: string | null | undefined): TierKey | null {
  return value === "one" || value === "eleven" || value === "sixty" ? value : null;
}

/** Minor units and a currency, written for a reader. Never a float on the way in. */
export function formatMoney(amountMinor: number, currency: string, locale = "en"): string {
  const value = amountMinor / 100;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${value} ${currency.toUpperCase()}`;
  }
}

/** A day in the person's own zone. A zone the runtime cannot read falls back to India. */
export function formatDay(at: Date, tz: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  try {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: tz }).format(at);
  } catch {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: "Asia/Kolkata" }).format(at);
  }
}
