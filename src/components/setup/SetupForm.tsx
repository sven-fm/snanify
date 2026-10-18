"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import type { setupContent } from "@/content/setup";
import { LIMITS } from "@/lib/limits";
import { saveProfile, type SaveState } from "@/app/[lang]/(app)/setup/actions";
import type { Lang } from "@/lib/locales";
import { SubmitButton, buttonClass } from "@/components/ui";
import { track } from "@/lib/track";
import { shrinkPhoto } from "@/lib/shrink-photo";
import { zonePlace } from "@/lib/zone-place";

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

/* A field's name in Eczar 700, sentence case, and its one hint under it. */
function Label({ label, hint }: { label: string; hint: string }) {
  return (
    <>
      <span className="display block text-[1.25rem] text-ink" style={W700}>
        {label}
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-ink2">{hint}</span>
    </>
  );
}

export function SetupForm({
  lang,
  pack,
  t,
  waters,
  prayers,
  initial,
}: {
  lang: Lang;
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

  /* The zone is put on the form at the moment it is submitted, rather than
     rendered into a hidden field and hoped for. Writing it into the DOM from an
     effect looked equivalent and was not: React resets uncontrolled fields
     around a form action, so the server received an empty string and refused
     the form with "we could not read your time zone". Setting it here happens
     after any reset and cannot be undone by one. */
  const action = async (formData: FormData) => {
    formData.set("tz", readZone());

    /* Usually long finished by the time Save is pressed; awaited in case not. */
    const photo = await shrinking.current;
    if (photo) {
      if (photo.size > LIMITS.portraitBytes) {
        setTooLarge(true);
        return;
      }
      formData.set("portrait", photo, photo.name);
    }

    /* After an await the action is outside the form's transition, so it is
       put back into one; otherwise React warns and `pending` never shows. */
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
  /* The chosen photograph, shrunk for sending; null until one is chosen. */
  const shrinking = useRef<Promise<File> | null>(null);
  const [tooLarge, setTooLarge] = useState(false);

  /* Named beside the hour picker once the browser has said which zone it is
     in. Read through useSyncExternalStore with an empty server snapshot, so
     the server render carries no zone it cannot know and hydration matches. */
  const zone = useSyncExternalStore(
    () => () => {},
    () => readZone(),
    () => "",
  );


  /* CompleteRegistration once per account: only the save that completed
     setup is counted, under the event id the server sent to Meta with it.
     Every later save is the settings page and is counted nowhere. */
  useEffect(() => {
    if (!state.ok) return;
    if (state.first) track("setup_done", { water, lang }, { eventId: state.eventId });
    router.push(state.next ?? `${lang === "en" ? "" : `/${lang}`}/today`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok, lang, router]);

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
  const errors = state.errors;

  function pickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setDropped(false);
    setTooLarge(false);
    shrinking.current = shrinkPhoto(file);
  }

  function dropFile() {
    setDropped(true);
    setPreview(null);
    setTooLarge(false);
    shrinking.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <form action={action} className="mt-10">
      <input type="hidden" name="lang" value={lang} />
      {pack && <input type="hidden" name="pack" value={pack} />}
      {dropped && <input type="hidden" name="removePortrait" value="1" />}

      {/* ---------------- the water ---------------- */}
      <fieldset>
        <legend className="sr-only">{t.water.label}</legend>
        <Label label={t.water.label} hint={t.water.hint} />

        {/* Small blocks on 3px walls (spec 5.1a); the chosen one stays sunk,
            with a sindoor face. The value travels in the hidden field. */}
        <input type="hidden" name="waterSlug" value={water} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {waters.map((w) => {
            const on = water === w.slug;
            return (
              <button
                key={w.slug}
                type="button"
                aria-pressed={on}
                onClick={() => pickWater(w.slug)}
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
        <FieldError>{errors.waterSlug && t.errors[errors.waterSlug as "water"]}</FieldError>
      </fieldset>

      {/* ---------------- the photograph ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.portrait.label}</legend>
        <Label label={t.portrait.label} hint={t.portrait.hint} />

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
        <FieldError>{errors.names && t.errors[errors.names as "namesEmpty"]}</FieldError>
      </fieldset>

      {/* ---------------- the prayer ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.prayer.label}</legend>
        <Label label={t.prayer.label} hint={t.prayer.hint} />

        <input type="hidden" name="prayerId" value={prayer} />
        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            aria-pressed={prayer === ""}
            onClick={() => setPrayer("")}
            className="press-choice w-full text-left"
          >
            {t.prayer.none}
          </button>

          {offered.map((p) => {
            const on = prayer === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => setPrayer(p.id)}
                className="press-choice w-full flex-col items-start gap-1 text-left"
              >
                <span className="block font-bold">{p.title}</span>
                <span className={`block text-sm leading-relaxed ${on ? "" : "text-ink2"}`}>{p.line}</span>
              </button>
            );
          })}
        </div>
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
                    onClick={() => setSankalp(example)}
                    className="press-choice w-full text-left text-[0.98rem] leading-[1.6]"
                  >
                    {example}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <FieldError>{errors.sankalpText && t.errors[errors.sankalpText as "sankalpEmpty"]}</FieldError>
      </fieldset>

      {/* ---------------- the hour ---------------- */}
      <fieldset className="mt-14">
        <legend className="sr-only">{t.reminder.label}</legend>
        <Label label={t.reminder.label} hint={t.reminder.hint} />

        {/* Twenty-four small blocks rather than a select: the hour is chosen
            with a thumb, and the chosen one stays sunk like the chosen water. */}
        <input type="hidden" name="reminderHour" value={hour} />
        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:grid-cols-6">
          {Array.from({ length: 24 }, (_, h) => (
            <button
              key={h}
              type="button"
              aria-pressed={hour === h}
              onClick={() => setHour(h)}
              className="press-choice justify-center px-0 tabular-nums"
            >
              {String(h).padStart(2, "0")}:00
            </button>
          ))}
        </div>
        {zone && <p className="mt-2 text-sm text-ink2">{t.reminder.zone.replace("{zone}", zonePlace(zone))}</p>}
        <FieldError>{errors.reminderHour && t.errors.hour}</FieldError>
        <FieldError>{errors.tz && t.errors.zone}</FieldError>
      </fieldset>

      <FieldError>{errors.form && t.errors.unknown}</FieldError>

      <div className="mt-12">
        <SubmitButton className="w-full" disabled={pending}>
          {pending ? t.saving : t.save}
        </SubmitButton>
      </div>
    </form>
  );
}
