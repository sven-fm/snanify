/* ---------------------------------------------------------------------------
   Autosave on /setup.

   A leaf module with no imports, so the setup form can take it without pulling
   anything heavy into the browser (the hydration trap noted at the top of
   src/components/setup/SetupForm.tsx).

   AUTOSAVE IS FOR A SHEET THAT EXISTS. The server action validates the whole
   sheet, and a first setup is half filled for most of the two minutes it
   takes. Saving it field by field would either fail on every change or write
   a half sheet. So a first setup saves once, on the press, and every later
   visit (the page is also the settings page) saves each change as it is made.
   The server holds the same line: an autosave for an account without a
   completed sheet is refused before anything is written.

   ONE SAVE AT A TIME, AND THE LAST ONE WINS. A choice saves at once and a text
   field on blur, after a short pause so that moving between name rows is one
   save. A change made while a save is in flight queues one more, and that one
   reads the form as it stands when it runs, so the newest state is what lands.
   --------------------------------------------------------------------------- */

export type SaveStatus = "idle" | "saving" | "saved" | "failed";

/** A choice (water, prayer, hour, photograph) saves at once. */
export const CHOICE_DELAY = 0;
/** A text field (names, sankalp) saves this long after it loses focus. */
export const TEXT_DELAY = 600;

/** Whether the server takes an autosave: only onto a completed sheet. */
export function autosaveAllowed(completedAt: Date | null | undefined): boolean {
  return completedAt instanceof Date;
}

type Timer = ReturnType<typeof setTimeout>;

export type Saver = {
  /** Ask for a save after `delay` ms; a later request replaces an earlier one. */
  request(delay: number): void;
  /** Drop a waiting save (on unmount). An in-flight one finishes. */
  cancel(): void;
};

/**
 * A debounced, serialised saver. `run` does one save and resolves true when
 * it landed; a throw counts as a failure. `onStatus` hears every change.
 */
export function createSaver(
  run: () => Promise<boolean>,
  onStatus: (status: SaveStatus) => void,
): Saver {
  let timer: Timer | null = null;
  let inFlight = false;
  let again = false;

  async function fire() {
    timer = null;
    if (inFlight) {
      again = true;
      return;
    }
    inFlight = true;
    onStatus("saving");
    let ok = false;
    try {
      ok = await run();
    } catch {
      ok = false;
    }
    inFlight = false;
    if (again) {
      again = false;
      void fire();
      return;
    }
    onStatus(ok ? "saved" : "failed");
  }

  return {
    request(delay) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => void fire(), delay);
    },
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
    },
  };
}

export type SheetValues = {
  lang: string;
  pack?: string;
  waterSlug: string;
  names: string[];
  prayerId: string;
  sankalpText: string;
  reminderHour: number;
  tz: string;
  /** The photograph was removed and the removal is still to be saved. */
  removePortrait: boolean;
  /** A newly chosen photograph, shrunk, still to be saved. */
  portrait: File | null;
};

/** The same fields the press sends, plus the autosave flag. */
export function autosaveForm(values: SheetValues): FormData {
  const form = new FormData();
  form.set("lang", values.lang);
  if (values.pack) form.set("pack", values.pack);
  form.set("waterSlug", values.waterSlug);
  for (const name of values.names) form.append("name", name);
  form.set("prayerId", values.prayerId);
  form.set("sankalpText", values.sankalpText);
  form.set("reminderHour", String(values.reminderHour));
  form.set("tz", values.tz);
  if (values.portrait) form.set("portrait", values.portrait, values.portrait.name);
  else if (values.removePortrait) form.set("removePortrait", "1");
  form.set("autosave", "1");
  return form;
}
