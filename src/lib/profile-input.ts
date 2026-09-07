import { GHAT_BY_ID, type GhatId } from "@/content/muhurat";
import { isPrayerFor } from "@/content/prayers";
import type { NameEntry } from "@/db/schema";

/* ---------------------------------------------------------------------------
   What /setup accepts.

   One validator, called by the server action, returning either a clean value
   or a map of field to error key. No schema library: the rules are eleven
   lines of business logic and a dependency would hide them rather than state
   them.

   TWO THINGS IT GETS RIGHT THAT THE OBVIOUS VERSION DOES NOT.

   1. IT COUNTS CHARACTERS THE WAY A PERSON COUNTS THEM. `"अ".length` is 1 but
      `"क्ष".length` is 3, and an emoji is 2. Most of these readers write in
      Devanagari, so a limit measured in code units would silently cut a Hindi
      vow at about half the length of an English one. [...text] counts what a
      person sees.

   2. BLANK ROWS ARE NOT ERRORS. The names field renders five inputs and most
      people fill two. Empty rows are dropped before the count is checked, so
      the form never says "name 3 is required" about a box nobody typed in.

   Errors are keys, not sentences. The page looks them up in its own copy so
   the message is in the reader's language, and this file never holds English.
   --------------------------------------------------------------------------- */

export const LIMITS = {
  /** Names on a sheet. Five is what the sheet's title block can set. */
  maxNames: 5,
  /** One name. Long enough for "Lakshmi Narayanan Venkataraman". */
  nameChars: 60,
  /** The vow. Two or three sentences, which is what people actually write. */
  sankalpChars: 280,
} as const;

/** Straight off the form, everything a string. */
export type RawProfile = {
  waterSlug: string;
  names: string[];
  prayerId: string;
  sankalpText: string;
  reminderHour: string;
  tz: string;
};

/** Ready for the database. */
export type CleanProfile = {
  waterSlug: GhatId;
  names: NameEntry[];
  prayerId: string | null;
  sankalpText: string;
  reminderHour: number;
  tz: string;
};

export type ProfileErrors = Partial<Record<keyof RawProfile, string>>;

export type Validated =
  | { ok: true; value: CleanProfile }
  | { ok: false; errors: ProfileErrors };

/** Characters a person sees, not UTF-16 code units. See note 1 above. */
function visibleLength(text: string): number {
  return [...text].length;
}

/** Whether the runtime can actually reckon a morning in this zone. */
function isRealZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/* Control characters and line breaks. A name is one line: a newline in it
   breaks the sheet's title block, and it is also the shape an injection
   attempt takes when it wants to add a row to a document. */
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;

export function validateProfile(raw: RawProfile): Validated {
  const errors: ProfileErrors = {};

  const waterSlug = raw.waterSlug as GhatId;
  if (!GHAT_BY_ID[waterSlug]) errors.waterSlug = "water";

  const names = raw.names.map((n) => n.trim()).filter((n) => n.length > 0);
  if (names.length === 0) errors.names = "namesEmpty";
  else if (names.length > LIMITS.maxNames) errors.names = "namesMany";
  else if (names.some((n) => visibleLength(n) > LIMITS.nameChars)) errors.names = "nameLong";
  else if (names.some((n) => CONTROL.test(n))) errors.names = "nameShape";

  const prayerId = raw.prayerId.trim() === "" ? null : raw.prayerId.trim();
  if (!errors.waterSlug && !isPrayerFor(waterSlug, prayerId)) errors.prayerId = "prayer";

  const sankalpText = raw.sankalpText.trim();
  if (sankalpText.length === 0) errors.sankalpText = "sankalpEmpty";
  else if (visibleLength(sankalpText) > LIMITS.sankalpChars) errors.sankalpText = "sankalpLong";

  const reminderHour = Number(raw.reminderHour);
  if (
    raw.reminderHour.trim() === "" ||
    !Number.isInteger(reminderHour) ||
    reminderHour < 0 ||
    reminderHour > 23
  ) {
    errors.reminderHour = "hour";
  }

  const tz = raw.tz.trim();
  if (tz.length === 0 || !isRealZone(tz)) errors.tz = "zone";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      waterSlug,
      names: names.map((name) => ({ name })),
      prayerId,
      sankalpText,
      reminderHour,
      tz,
    },
  };
}
