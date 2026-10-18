"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { setupContent } from "@/content/setup";
import { LIMITS } from "@/lib/limits";
import { saveProfile, type SaveState } from "@/app/[lang]/(app)/setup/actions";
import { localePath, type Lang } from "@/lib/locales";
import { SubmitButton, buttonClass } from "@/components/ui";
import { track } from "@/lib/track";
import { shrinkPhoto } from "@/lib/shrink-photo";
import {
  CHOICE_DELAY,
  TEXT_DELAY,
  autosaveForm,
  createSaver,
  type SaveStatus,
  type Saver,
  SAVE_TIMEOUT,
  withTimeout,
} from "@/lib/autosave";

/* ---------------------------------------------------------------------------
   The setup form.

   A client component because five of its six fields want to answer while you
   are typing: the portrait shows itself, the name rows appear as you fill
   them, the vow counts down, and the time zone reads itself off the browser.

   THE TIME ZONE IS READ HERE AND SENT AS A HIDDEN FIELD. It decides when
   somebody's morning is, and the server cannot know it: a request from Toronto
   and a request from Chennai look the same. `Intl` knows, so the browser tells
   us once and /account is where it is changed.

   ONE COLUMN, ALWAYS. At 390 pixels there is no second column to put anything
   in, and the fields are in the order somebody would fill them if you were
   sitting beside them. The save button is the last thing on the page, where a
   thumb ends up.

   THE PORTRAIT PREVIEW IS THE BROWSER'S OWN OBJECT URL, not an upload. Nothing
   leaves the phone until the form is submitted, and the pressed grey version
   the sheet will actually use is made on the server.

   THE PORTRAIT IS SHRUNK THE MOMENT IT IS CHOSEN. A phone photograph is larger
   than the 4.5 MB a Vercel Function accepts, so it is redrawn at 1600 pixels
   (src/lib/shrink-photo.ts) while the rest of the form is filled, and the
   smaller file replaces the original on the FormData at submit.

   ONE BUG WORTH REMEMBERING. This page used to log React error #418, a
   hydration mismatch, on most first loads: React would throw away the server
   HTML and rebuild the whole form in the browser. It was not the time zone,
   not `useActionState`, not the server action, and not suppressHydrationWarning,
   all of which were tried. It was a single import. `LIMITS` came from
   src/lib/profile-input.ts, which imports the muhurat dataset to check a water
   slug, and that module parses and validates a large JSON file the moment it
   loads. Importing one constant from it pulled all of that into the browser.
   The constants live in a leaf module now, and the bisect that found it went:
   remove the fields, remove the form, remove the markup, remove the hooks,
   remove the props, then add the imports back one at a time.

   A COMPLETED SHEET SAVES ITSELF. With `autosave` on (the page sets it when
   the account has a completed sheet), a choice saves at once and a text field
   on blur, through the same server action, and the field shows a quiet note.
   A first setup saves once, on the press, and goes on to the packs: the
   action validates the whole sheet, and a half-filled one is half a sheet.
   The fields are controlled, so a failed save keeps every word typed, and the
   note offers to try again. See src/lib/autosave.ts.
   --------------------------------------------------------------------------- */

type Copy = (typeof setupContent)["en"];

type Water = { slug: string; river: string; ghat: string; city: string };
type Prayer = { id: string; title: string; line: string; waters: string[] | "all" };

const EMPTY: SaveState = { ok: false, errors: {} };

/**
 * The browser's time zone, read at submit time and never rendered.
 *
 * Setting it on the FormData here rather than in a hidden field is load
 * bearing: React resets uncontrolled fields around a form action, so a value
 * written into a hidden input from an effect arrived at the server as an empty
 * string and the form was refused with "we could not read your time zone".
 *
 * It is not displayed at all. It used to sit under the hour picker, which put
 * a string the server cannot know inside a server-rendered form; that turned
 * out not to be the cause of the hydration warning noted at the top of this
 * file, but /account shows the zone from the database anyway, where the server
 * does know it, so there is nothing to gain by painting it twice.
 */
function readZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
  } catch {
    return "Asia/Kolkata";
  }
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-2 text-sm font-bold text-sindoor">{children}</p>;
}

const W700 = { fontWeight: 700 } as const;

/* The water, the prayer and the hour are each one choice of many: a
   radiogroup of press-choice buttons (role="radio", aria-checked), with the
   chosen one the only tab stop. The arrows move the choice, as they do in a
   native radio group. */
function arrowKeys(e: React.KeyboardEvent<HTMLDivElement>) {
  const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
  if (!dir) return;
  const radios = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const at = radios.indexOf(document.activeElement as HTMLButtonElement);
  if (at < 0) return;
  e.preventDefault();
  const next = radios[(at + dir + radios.length) % radios.length];
  next.focus();
  next.click();
}

/** The props that make a press-choice button one radio of a group. */
function radio(checked: boolean) {
  return { type: "button" as const, role: "radio", "aria-checked": checked, tabIndex: checked ? 0 : -1 };
}

/* A field's name in Eczar 700, sentence case, and its one hint under it
   where the field has one. */
function Label({ label, hint }: { label: string; hint?: string }) {
  return (
    <>
      <span className="display block text-[1.25rem] text-ink" style={W700}>
        {label}
      </span>
      {hint && <span className="mt-1 block text-sm leading-relaxed text-ink2">{hint}</span>}
    </>
  );
}

type Field = "water" | "portrait" | "names" | "prayer" | "sankalp" | "hour";

/* The quiet line under a field that just saved itself: "Saving", "Saved", or
   the failure in sindoor with a way to try again. It is for the eye only:
   a screen reader hears the one live region at the foot of the form, and the
   button stays an ordinary button outside it. */
function SaveNote({
  copy,
  status,
  retry,
}: {
  copy: Copy["autosave"];
  status: SaveStatus;
  retry: () => void;
}) {
  return (
    <div className="mt-2 min-h-[1.25rem] text-sm text-ink2">
      <span aria-hidden="true" className={status === "failed" ? "font-bold text-sindoor" : ""}>
        {status === "saving" && copy.saving}
        {status === "saved" && copy.saved}
        {status === "failed" && copy.failed}
      </span>
      {status === "failed" && (
        <>
          {" "}
          <button type="button" onClick={retry} className={buttonClass("quiet", "min-h-[44px] text-sm")}>
            {copy.retry}
          </button>
        </>
      )}
    </div>
  );
}

export function SetupForm({
  lang,
  pack,
  t,
  waters,
  prayers,
  autosave = false,
  initial,
}: {
  lang: Lang;
  /** Save each change as it is made: on for a completed sheet, off for a first setup. */
  autosave?: boolean;
  /** A pack chosen on a price table, carried on to /begin after the save. */
  pack?: string;
  t: Copy;
  waters: Water[];
  prayers: Prayer[];
  initial: {
    waterSlug: string;
    names: string[];
    prayerId: string;
    sankalpText: string;
    reminderHour: number;
    portraitUrl: string | null;
  };
}) {
  const router = useRouter();
  const [state, rawAction, pending] = useActionState(saveProfile, EMPTY);
  /* The autosave, made in an effect below, and whether the press has the
     floor. Declared here because the press reads both. */
  const saver = useRef<Saver | null>(null);
  const pressing = useRef(false);

  /* The zone is put on the form at the moment it is submitted, rather than
     rendered into a hidden field and hoped for. Writing it into the DOM from an
     effect looked equivalent and was not: React resets uncontrolled fields
     around a form action, so the server received an empty string and refused
     the form with "we could not read your time zone". Setting it here happens
     after any reset and cannot be undone by one. */
  const action = async (formData: FormData) => {
    formData.set("tz", readZone());

    /* On a sheet that saves itself, the press takes over: a save still
       waiting is dropped (the press carries the same fields), one in flight
       is waited for, and no new one starts until the press has answered. A
       photograph that autosave already stored is gone from `shrinking`, so
       it is never sent twice. */
    if (autosave) {
      pressing.current = true;
      saver.current?.cancel();
    }
    try {
      await saver.current?.settled();
    } catch {
      /* A save that failed has already said so under its field. */
    }

    /* Usually long finished by the time Save is pressed; awaited in case not. */
    const photo = await shrinking.current;
    if (photo) {
      if (photo.size > LIMITS.portraitBytes) {
        pressing.current = false;
        setTooLarge(true);
        return;
      }
      formData.set("portrait", photo, photo.name);
    } else {
      /* The file input may still hold the original; only a shrunk, unsaved
         photograph travels. */
      formData.delete("portrait");
    }

    /* After an await the action is outside the form's transition, so it is
       put back into one; otherwise React warns and `pending` never shows. */
    setAutoErrors(null);
    startTransition(() => rawAction(formData));
  };

  const [water, setWater] = useState(initial.waterSlug);
  const [prayer, setPrayer] = useState(initial.prayerId);
  const [hour, setHour] = useState(initial.reminderHour);
  const [names, setNames] = useState<string[]>(
    initial.names.length > 0 ? initial.names : [""],
  );
  const [sankalp, setSankalp] = useState(initial.sankalpText);
  const [preview, setPreview] = useState<string | null>(initial.portraitUrl);
  const [dropped, setDropped] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  /* The preview of the photograph last chosen, and of the one last saved. */
  const picked = useRef<string | null>(null);
  const shownSaved = useRef<string | null>(initial.portraitUrl);
  /* The chosen photograph, shrunk for sending; null until one is chosen. */
  const shrinking = useRef<Promise<File> | null>(null);
  const [tooLarge, setTooLarge] = useState(false);

  /* ---------------- autosave ----------------
     The errors of the newest autosave, or null when the press spoke last. */
  const [autoErrors, setAutoErrors] = useState<SaveState["errors"] | null>(null);
  const [note, setNote] = useState<{ field: Field; status: SaveStatus } | null>(null);
  /* A save asked for by the last change. Asked through state, so the effect
     below runs after the change is committed and reads the form as it is. */
  const [ask, setAsk] = useState<{ n: number; field: Field; delay: number } | null>(null);
  const live = useRef({ water, prayer, hour, names, sankalp, dropped });
  const noted = useRef<Field>("water");

  /** Ask for a save of the sheet after a change to `field`, when autosave is on. */
  function changed(field: Field, delay: number = CHOICE_DELAY) {
    if (!autosave) return;
    setAsk((a) => ({ n: (a?.n ?? 0) + 1, field, delay }));
  }

  /* The words as last saved, so leaving a field unchanged asks for nothing.
     Moved on only when a save lands, so a failed one is asked for again. */
  const sentText = useRef(JSON.stringify([initial.names, initial.sankalpText]));
  function blurred(field: "names" | "sankalp") {
    const now = JSON.stringify([names, sankalp]);
    if (now === sentText.current) return;
    changed(field, TEXT_DELAY);
  }

  function noteFor(field: Field) {
    if (!autosave || note?.field !== field || note.status === "idle") return null;
    return <SaveNote copy={t.autosave} status={note.status} retry={() => changed(field)} />;
  }

  const offered = useMemo(
    () => prayers.filter((p) => p.waters === "all" || p.waters.includes(water)),
    [prayers, water],
  );

  /* A prayer belongs to its waters: moving to a water it does not belong to
     lets it go, rather than sending one the server refuses. */
  function pickWater(slug: string) {
    setWater(slug);
    const kept = prayers.find((p) => p.id === prayer);
    if (kept && kept.waters !== "all" && !kept.waters.includes(slug)) setPrayer("");
  }

  const remaining = LIMITS.sankalpChars - [...sankalp].length;
  const errors = autoErrors ?? state.errors;

  function pickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    picked.current = URL.createObjectURL(file);
    setPreview(picked.current);
    setDropped(false);
    setTooLarge(false);
    shrinking.current = shrinkPhoto(file);
    changed("portrait");
  }

  function dropFile() {
    setDropped(true);
    setPreview(null);
    setTooLarge(false);
    shrinking.current = null;
    if (fileRef.current) fileRef.current.value = "";
    changed("portrait");
  }

  /* CompleteRegistration once per account: only the save that completed
     setup is counted, under the event id the server sent to Meta with it.
     Every later save is the settings page and is counted nowhere. */
  useEffect(() => {
    if (!state.ok) {
      pressing.current = false;
      return;
    }
    shrinking.current = null;
    if (state.first) track("setup_done", { water, lang }, { eventId: state.eventId });
    router.push(state.next ?? `${lang === "en" ? "" : `/${lang}`}/today`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, lang, router]);

  /* The autosave's effects sit below every handler that writes a ref they
     read; the React compiler's lint refuses the other order. */
  useEffect(() => {
    live.current = { water, prayer, hour, names, sankalp, dropped };
  });

  /* Made in an effect, so the save it runs only ever reads the refs after a
     render, never during one. */
  useEffect(() => {
    const made = createSaver(
      async () => {
        let sending = shrinking.current;
        let photo = sending ? await sending : null;
        /* Read after the photograph is ready, so the words sent are the
           newest the page holds. */
        const v = live.current;
        /* A photograph too large to send is let go, with its error, and the
           rest of the sheet still saves; otherwise every later change would
           fail behind it. */
        if (photo && photo.size > LIMITS.portraitBytes) {
          setTooLarge(true);
          if (shrinking.current === sending) {
            shrinking.current = null;
            if (fileRef.current) fileRef.current.value = "";
            setPreview(shownSaved.current);
          }
          sending = null;
          photo = null;
        }
        const result = await withTimeout(saveProfile(
          EMPTY,
          autosaveForm({
            lang,
            pack,
            waterSlug: v.water,
            names: v.names,
            prayerId: v.prayer,
            sankalpText: v.sankalp,
            reminderHour: v.hour,
            tz: readZone(),
            removePortrait: v.dropped,
            portrait: photo,
          }),
        ), SAVE_TIMEOUT);
        setAutoErrors(result.errors);
        if (result.ok) {
          sentText.current = JSON.stringify([v.names, v.sankalp]);
          if (v.dropped) shownSaved.current = null;
          /* The photograph is in the store now: later saves leave it be. */
          if (sending && shrinking.current === sending) {
            shownSaved.current = picked.current;
            shrinking.current = null;
            if (fileRef.current) fileRef.current.value = "";
          }
        }
        return result.ok;
      },
      (status) => setNote({ field: noted.current, status }),
    );
    saver.current = made;

    /* Leaving loses nothing. A tab put away (visibility hidden) saves now
       through the action. A page that is closing cannot finish an action, so
       what is still unsaved goes by beacon to the route beside the action
       (setup/autosave/route.ts): the words and choices, never a photograph. */
    const hidden = () => {
      if (document.visibilityState === "hidden" && !pressing.current) made.flush();
    };
    const closing = () => {
      if (pressing.current || !made.busy()) return;
      made.cancel();
      const v = live.current;
      navigator.sendBeacon(
        localePath(lang, "/setup/autosave"),
        autosaveForm({
          lang,
          waterSlug: v.water,
          names: v.names,
          prayerId: v.prayer,
          sankalpText: v.sankalp,
          reminderHour: v.hour,
          tz: readZone(),
          removePortrait: v.dropped,
          portrait: null,
        }),
      );
    };
    document.addEventListener("visibilitychange", hidden);
    window.addEventListener("pagehide", closing);
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      window.removeEventListener("pagehide", closing);
      /* Unmounting (a link inside the app) runs a waiting save at once
         rather than dropping it; the page is still alive to finish it. */
      if (pressing.current) made.cancel();
      else made.flush();
    };
  }, [lang, pack]);

  /* The press gives the floor back when it answers without moving on: a
     refusal, an error, a request that never came back as a state. Read off
     the falling edge of `pending`, so a press that throws cannot leave the
     page with autosave switched off. */
  const wasPending = useRef(false);
  useEffect(() => {
    if (wasPending.current && !pending && !state.ok) pressing.current = false;
    wasPending.current = pending;
  }, [pending, state]);

  useEffect(() => {
    if (!ask || pressing.current) return;
    noted.current = ask.field;
    saver.current?.request(ask.delay);
  }, [ask]);

  return (
    <form action={action} className="mt-10">
      <input type="hidden" name="lang" value={lang} />
      {pack && <input type="hidden" name="pack" value={pack} />}
      {dropped && <input type="hidden" name="removePortrait" value="1" />}

      {/* ---------------- the water ---------------- */}
      <fieldset>
        <legend className="sr-only">{t.water.label}</legend>
        <Label label={t.water.label} />

        {/* Small blocks on 3px walls (spec 5.1a); the chosen one stays sunk,
            with a sindoor face. The value travels in the hidden field. */}
        <input type="hidden" name="waterSlug" value={water} />
        <div role="radiogroup" aria-label={t.water.label} onKeyDown={arrowKeys} className="mt-5 grid gap-3 sm:grid-cols-2">
          {waters.map((w) => {
            const on = water === w.slug;
            return (
              <button
                key={w.slug}
                {...radio(on)}
                onClick={() => {
                  pickWater(w.slug);
                  changed("water");
                }}
                className="press-choice min-h-[64px] w-full flex-col items-start justify-center gap-0.5 text-left"
              >
                <span className="display block text-[1.15rem] leading-tight" style={W700}>
                  {w.river}
                </span>
                <span className={`block text-sm ${on ? "" : "text-ink2"}`}>
                  {w.ghat}, {w.city}
                </span>
              </button>
            );
          })}
        </div>
        {noteFor("water")}
        <FieldError>{errors.waterSlug && t.errors[errors.waterSlug as "water"]}</FieldError>
      </fieldset>

      {/* ---------------- the photograph ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.portrait.label}</legend>
        <Label label={t.portrait.label} />

        <div className="mt-5 flex items-start gap-5">
          {/* The frame the sheet prints it in: a 2px ink border, empty until a
              photograph is chosen. */}
          <div className="h-[120px] w-24 shrink-0 border-2 border-ink">
            {preview && !dropped && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="h-full w-full object-cover grayscale"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              ref={fileRef}
              type="file"
              name="portrait"
              accept="image/jpeg,image/png,image/heic,image/heif"
              onChange={pickFile}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={buttonClass("quiet")}
            >
              {preview && !dropped ? t.portrait.change : t.portrait.choose}
            </button>

            {preview && !dropped && (
              <button
                type="button"
                onClick={dropFile}
                className={buttonClass("quiet", "font-normal text-ink2")}
              >
                {t.portrait.remove}
              </button>
            )}
          </div>
        </div>
        {noteFor("portrait")}
        <FieldError>
          {tooLarge
            ? t.errors.portrait.tooLarge
            : errors.portrait &&
              t.errors.portrait[errors.portrait as keyof Copy["errors"]["portrait"]]}
        </FieldError>
      </fieldset>

      {/* ---------------- the names ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.names.label}</legend>
        <Label label={t.names.label} hint={t.names.hint} />

        <div className="mt-5 flex flex-col gap-3">
          {names.map((value, index) => (
            <input
              key={index}
              type="text"
              name="name"
              value={value}
              maxLength={LIMITS.nameChars}
              placeholder={t.names.placeholder}
              onChange={(e) => {
                const next = [...names];
                next[index] = e.target.value;
                setNames(next);
              }}
              onBlur={() => blurred("names")}
              className="field min-h-[48px] w-full text-[1.02rem] text-ink"
            />
          ))}
        </div>

        {names.length < LIMITS.maxNames && (
          <button
            type="button"
            onClick={() => setNames([...names, ""])}
            className={buttonClass("quiet", "mt-3")}
          >
            {t.names.add}
          </button>
        )}
        {noteFor("names")}
        <FieldError>{errors.names && t.errors[errors.names as "namesEmpty"]}</FieldError>
      </fieldset>

      {/* ---------------- the prayer ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.prayer.label}</legend>
        <Label label={t.prayer.label} />

        <input type="hidden" name="prayerId" value={prayer} />
        <div role="radiogroup" aria-label={t.prayer.label} onKeyDown={arrowKeys} className="mt-5 flex flex-col gap-3">
          <button
            {...radio(prayer === "")}
            onClick={() => {
              setPrayer("");
              changed("prayer");
            }}
            className="press-choice w-full text-left"
          >
            {t.prayer.none}
          </button>

          {offered.map((p) => {
            const on = prayer === p.id;
            return (
              <button
                key={p.id}
                {...radio(on)}
                onClick={() => {
                  setPrayer(p.id);
                  changed("prayer");
                }}
                className="press-choice w-full flex-col items-start gap-1 text-left"
              >
                <span className="block font-bold">{p.title}</span>
                <span className={`block text-sm leading-relaxed ${on ? "" : "text-ink2"}`}>{p.line}</span>
              </button>
            );
          })}
        </div>
        {noteFor("prayer")}
        <FieldError>{errors.prayerId && t.errors.prayer}</FieldError>
      </fieldset>

      {/* ---------------- the sankalp ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.sankalp.label}</legend>
        <Label label={t.sankalp.label} hint={t.sankalp.hint} />

        <textarea
          name="sankalpText"
          value={sankalp}
          onChange={(e) => setSankalp(e.target.value)}
          onBlur={() => blurred("sankalp")}
          rows={4}
          placeholder={t.sankalp.placeholder}
          className="field mt-5 w-full py-3 text-[1.05rem] leading-[1.7] text-ink"
        />
        <p className="mt-2 text-right text-sm tabular-nums text-ink2">
          {t.sankalp.remaining.replace("{n}", String(remaining))}
        </p>

        {/* Three to take as they are, for the person who stops here. */}
        {(sankalp.trim() === "" || t.sankalp.examples.includes(sankalp)) && (
          <div className="mt-4">
            <p className="text-sm text-ink2">{t.sankalp.examplesLabel}</p>
            <ul className="mt-3 flex flex-col gap-3">
              {t.sankalp.examples.map((example) => (
                <li key={example}>
                  <button
                    type="button"
                    aria-pressed={sankalp === example}
                    onClick={() => {
                      setSankalp(example);
                      changed("sankalp");
                    }}
                    className="press-choice w-full text-left text-[0.98rem] leading-[1.6]"
                  >
                    {example}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {noteFor("sankalp")}
        <FieldError>{errors.sankalpText && t.errors[errors.sankalpText as "sankalpEmpty"]}</FieldError>
      </fieldset>

      {/* ---------------- the hour ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.reminder.label}</legend>
        <Label label={t.reminder.label} hint={t.reminder.hint} />

        {/* Twenty-four small blocks rather than a select: the hour is chosen
            with a thumb, and the chosen one stays sunk like the chosen water. */}
        <input type="hidden" name="reminderHour" value={hour} />
        <div role="radiogroup" aria-label={t.reminder.label} onKeyDown={arrowKeys} className="mt-5 grid grid-cols-4 gap-2.5 sm:grid-cols-6">
          {Array.from({ length: 24 }, (_, h) => (
            <button
              key={h}
              {...radio(hour === h)}
              onClick={() => {
                setHour(h);
                changed("hour");
              }}
              className="press-choice justify-center px-0 tabular-nums"
            >
              {String(h).padStart(2, "0")}:00
            </button>
          ))}
        </div>
        {noteFor("hour")}
        <FieldError>{errors.reminderHour && t.errors.hour}</FieldError>
        <FieldError>{errors.tz && t.errors.zone}</FieldError>
      </fieldset>

      <FieldError>{errors.form && t.errors.unknown}</FieldError>

      {/* The one live region for autosave, always mounted, so a screen reader
          hears each settled save once: "Saved" or the failure, never "Saving",
          and arrowing through the hours ends in one announcement. */}
      {autosave && (
        <p role="status" aria-live="polite" className="sr-only">
          {note?.status === "saved" ? t.autosave.saved : note?.status === "failed" ? t.autosave.failed : ""}
        </p>
      )}

      <div className="mt-12">
        <SubmitButton className="w-full" disabled={pending || note?.status === "saving"}>
          {pending || note?.status === "saving" ? t.saving : t.save}
        </SubmitButton>
      </div>
    </form>
  );
}
