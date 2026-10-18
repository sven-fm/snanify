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

   ONE SAVE AT A TIME, AND THE LAST ONE WINS. A choice saves after a breath
   and a text field on blur after a short pause, so that arrowing through the
   hours or moving between name rows is one save. A change made while a save is in flight queues one more, and that one
   reads the form as it stands when it runs, so the newest state is what lands.
   --------------------------------------------------------------------------- */

export type SaveStatus = "idle" | "saving" | "saved" | "failed";

/** A choice (water, prayer, hour, photograph) saves this soon: at once to a
    reader, and long enough that arrowing through the hours is one save. */
export const CHOICE_DELAY = 350;
/** A text field (names, sankalp) saves this long after it loses focus. */
export const TEXT_DELAY = 600;

/** A save that has not answered in this long counts as failed, so a hung
    request ends in "Try again" rather than a press disabled for good. */
export const SAVE_TIMEOUT = 15_000;

/** The promise, or a rejection once `ms` have passed without an answer. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const late = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("save timed out")), ms);
  });
  return Promise.race([promise, late]).finally(() => clearTimeout(timer));
}

/** Whether the server takes an autosave: only onto a completed sheet. */
export function autosaveAllowed(completedAt: Date | null | undefined): boolean {
  return completedAt instanceof Date;
}

type Timer = ReturnType<typeof setTimeout>;

export type Saver = {
  /** Ask for a save after `delay` ms; a later request replaces an earlier one. */
  request(delay: number): void;
  /** Run a waiting save now (leaving the page, the form unmounting). */
  flush(): void;
  /** Drop a waiting save and any queued behind the one in flight. */
  cancel(): void;
  /** Resolves once nothing is in flight or queued. */
  settled(): Promise<void>;
  /** A save is waiting, in flight or queued. */
  busy(): boolean;
};

/**
 * A debounced, serialised saver. `run` does one save and resolves true when
 * it landed; a throw counts as a failure. `onStatus` hears "saving" when a
 * round of saves starts and "saved" or "failed" once, when it settles.
 */
export function createSaver(
  run: () => Promise<boolean>,
  onStatus: (status: SaveStatus) => void,
): Saver {
  let timer: Timer | null = null;
  let running: Promise<void> | null = null;
  let again = false;

  async function drain() {
    onStatus("saving");
    let ok = false;
    do {
      again = false;
      try {
        ok = await run();
      } catch {
        ok = false;
      }
    } while (again);
    running = null;
    onStatus(ok ? "saved" : "failed");
  }

  function fire() {
    timer = null;
    if (running) again = true;
    else running = drain();
  }

  return {
    request(delay) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fire, delay);
    },
    flush() {
      if (!timer) return;
      clearTimeout(timer);
      fire();
    },
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
      again = false;
    },
    async settled() {
      while (running) await running;
    },
    busy() {
      return timer !== null || running !== null;
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
