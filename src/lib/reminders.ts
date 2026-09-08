/* ---------------------------------------------------------------------------
   Who gets written to this hour.

   The cron runs every hour on the hour, looks at everybody with a morning in
   hand, and writes to the ones whose chosen hour has just arrived where they
   are. That is the whole rule, and every piece of it is about time zones.

   THE HOUR IS THEIRS, NOT INDIA'S. Somebody in Toronto who asked for six in
   the morning means six in Toronto. The river's day stays IST because that is
   the day the model published for, but the person's day is their own.

   DAYLIGHT SAVING IS WHY THIS USES `Intl` AND NOT ARITHMETIC. Berlin is two
   hours ahead of UTC in August and one in December; a stored offset would send
   the December reminders an hour early for four months. `Intl.DateTimeFormat`
   knows, and the zone database is the only thing that does.

   ONCE A DAY, BY THEIR OWN DATE. `lastRemindedOn` holds the local date the
   last message went out on, so a retried cron run inside the same hour writes
   nothing, and somebody in Toronto whose local date is still the seventh is
   not written to twice because it turned the eighth in India.

   This file is pure. The query that reads the rows lives in the cron route, so
   these rules can be tested without a database.
   --------------------------------------------------------------------------- */

export type Remindable = {
  id: string;
  tz: string;
  reminderHour: number;
  reminderOn: boolean;
  /** The local date of the last reminder, "2026-09-08", or null for never. */
  lastRemindedOn: string | null;
};

const FALLBACK_TZ = "Asia/Kolkata";

function formatter(tz: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  try {
    return new Intl.DateTimeFormat("en-CA", { ...options, timeZone: tz });
  } catch {
    /* A zone the runtime cannot read means a bad row rather than a bad person.
       India is where the rivers are, so that is the guess. */
    return new Intl.DateTimeFormat("en-CA", { ...options, timeZone: FALLBACK_TZ });
  }
}

/** The hour of the day, 0 to 23, where this person is. */
export function localHour(at: Date, tz: string): number {
  const hour = formatter(tz, { hour: "2-digit", hourCycle: "h23" }).format(at);
  return Number(hour);
}

/** The civil date where this person is, "2026-09-08". */
export function localDate(at: Date, tz: string): string {
  return formatter(tz, { year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
}

/** Whether this person should be written to now. */
export function isDue(person: Remindable, at: Date): boolean {
  if (!person.reminderOn) return false;
  if (localHour(at, person.tz) !== person.reminderHour) return false;
  return person.lastRemindedOn !== localDate(at, person.tz);
}
