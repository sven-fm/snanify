"use client";

import { useActionState, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { setupContent } from "@/content/setup";
import { LIMITS } from "@/lib/limits";
import { saveProfile, type SaveState } from "@/app/[lang]/(app)/setup/actions";
import type { Lang } from "@/lib/locales";
import { SubmitButton } from "@/components/ui";
import { track } from "@/lib/track";

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
  return <p className="mt-2 border-l-2 border-spot pl-3 text-sm text-spot">{children}</p>;
}

function Label({ label, hint }: { label: string; hint: string }) {
  return (
    <>
      <span className="display block text-[1.15rem] text-ink">{label}</span>
      <span className="mt-1 block text-sm leading-relaxed text-ink2">{hint}</span>
    </>
  );
}

export function SetupForm({
  lang,
  t,
  waters,
  prayers,
  initial,
}: {
  lang: Lang;
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
  const action = (formData: FormData) => {
    formData.set("tz", readZone());
    rawAction(formData);
  };

  const [water, setWater] = useState(initial.waterSlug);
  const [hour, setHour] = useState(initial.reminderHour);
  const [names, setNames] = useState<string[]>(
    initial.names.length > 0 ? initial.names : [""],
  );
  const [sankalp, setSankalp] = useState(initial.sankalpText);
  const [preview, setPreview] = useState<string | null>(initial.portraitUrl);
  const [dropped, setDropped] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Named beside the hour picker once the browser has said which zone it is
     in. Read through useSyncExternalStore with an empty server snapshot, so
     the server render carries no zone it cannot know and hydration matches. */
  const zone = useSyncExternalStore(
    () => () => {},
    () => readZone(),
    () => "",
  );


  useEffect(() => {
    if (!state.ok) return;
    track("setup_done", { water, lang });
    router.push(state.next ?? `${lang === "en" ? "" : `/${lang}`}/today`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok, lang, router]);

  const offered = useMemo(
    () => prayers.filter((p) => p.waters === "all" || p.waters.includes(water)),
    [prayers, water],
  );

  const remaining = LIMITS.sankalpChars - [...sankalp].length;
  const errors = state.errors;

  function pickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setDropped(false);
  }

  return (
    <form action={action} className="mt-10">
      <input type="hidden" name="lang" value={lang} />
      {dropped && <input type="hidden" name="removePortrait" value="1" />}

      {/* ---------------- the water ---------------- */}
      <fieldset className="border-t-2 border-rulestrong pt-6">
        <legend className="sr-only">{t.water.label}</legend>
        <Label label={t.water.label} hint={t.water.hint} />

        <div className="mt-5 grid gap-px bg-rule sm:grid-cols-2">
          {waters.map((w) => (
            <label
              key={w.slug}
              className={`flex min-h-[64px] cursor-pointer items-baseline justify-between gap-3 bg-paper p-4 transition-colors ${
                water === w.slug ? "bg-tint text-ink" : "text-ink2"
              }`}
            >
              <span>
                <span className="display block text-[1.15rem] leading-tight text-ink">
                  {w.river}
                </span>
                <span className="mt-1 block text-sm text-ink2">
                  {w.ghat}, {w.city}
                </span>
              </span>
              <input
                type="radio"
                name="waterSlug"
                value={w.slug}
                checked={water === w.slug}
                onChange={() => setWater(w.slug)}
                className="mt-1"
              />
            </label>
          ))}
        </div>
        <FieldError>{errors.waterSlug && t.errors[errors.waterSlug as "water"]}</FieldError>
      </fieldset>

      {/* ---------------- the photograph ---------------- */}
      <fieldset className="mt-12 border-t-2 border-rulestrong pt-6">
        <legend className="sr-only">{t.portrait.label}</legend>
        <Label label={t.portrait.label} hint={t.portrait.hint} />

        <div className="mt-5 flex items-start gap-5">
          <div className="h-[120px] w-24 shrink-0 border border-rule bg-tint">
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
              className="label min-h-[44px] border border-rulestrong px-4 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {preview && !dropped ? t.portrait.change : t.portrait.choose}
            </button>

            {preview && !dropped && (
              <button
                type="button"
                onClick={() => {
                  setDropped(true);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="label min-h-[44px] text-ink2 underline decoration-rule underline-offset-4"
              >
                {t.portrait.remove}
              </button>
            )}
          </div>
        </div>
        <FieldError>
          {errors.portrait &&
            t.errors.portrait[errors.portrait as keyof Copy["errors"]["portrait"]]}
        </FieldError>
      </fieldset>

      {/* ---------------- the names ---------------- */}
      <fieldset className="mt-12 border-t-2 border-rulestrong pt-6">
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
            className="mt-3 min-h-[44px] text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-spot"
          >
            {t.names.add}
          </button>
        )}
        <FieldError>{errors.names && t.errors[errors.names as "namesEmpty"]}</FieldError>
      </fieldset>

      {/* ---------------- the prayer ---------------- */}
      <fieldset className="mt-12 border-t-2 border-rulestrong pt-6">
        <legend className="sr-only">{t.prayer.label}</legend>
        <Label label={t.prayer.label} hint={t.prayer.hint} />

        <div className="mt-5 flex flex-col">
          <label className="flex min-h-[48px] cursor-pointer items-center gap-3 border-b border-rule py-3">
            <input
              type="radio"
              name="prayerId"
              value=""
              defaultChecked={initial.prayerId === ""}
              
            />
            <span className="text-ink2">{t.prayer.none}</span>
          </label>

          {offered.map((p) => (
            <label
              key={p.id}
              className="flex min-h-[48px] cursor-pointer items-start gap-3 border-b border-rule py-3"
            >
              <input
                type="radio"
                name="prayerId"
                value={p.id}
                defaultChecked={initial.prayerId === p.id}
                className="mt-1"
              />
              <span>
                <span className="block text-ink">{p.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink2">{p.line}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError>{errors.prayerId && t.errors.prayer}</FieldError>
      </fieldset>

      {/* ---------------- the sankalp ---------------- */}
      <fieldset className="mt-12 border-t-2 border-rulestrong pt-6">
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
        {sankalp.trim() === "" && (
          <div className="mt-4">
            <p className="text-sm text-ink2">{t.sankalp.examplesLabel}</p>
            <ul className="mt-2 flex flex-col gap-2">
              {t.sankalp.examples.map((example) => (
                <li key={example}>
                  <button
                    type="button"
                    onClick={() => setSankalp(example)}
                    className="impress min-h-[44px] w-full border border-rule px-4 py-2 text-left text-[0.98rem] leading-[1.6] text-ink hover:border-rulestrong active:bg-paper2"
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
      <fieldset className="mt-12 border-t-2 border-rulestrong pt-6">
        <legend className="sr-only">{t.reminder.label}</legend>
        <Label label={t.reminder.label} hint={t.reminder.hint} />

        {/* Twenty-four ruled cells rather than a select: the hour is chosen
            with a thumb, and the chosen cell is tinted like the chosen water. */}
        <div className="mt-5 grid grid-cols-4 gap-px bg-rule sm:grid-cols-6">
          {Array.from({ length: 24 }, (_, h) => (
            <label
              key={h}
              className={`flex min-h-[48px] cursor-pointer items-center justify-center tabular-nums transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-spot ${
                hour === h ? "bg-tint text-ink" : "bg-paper text-ink2"
              }`}
            >
              <input
                type="radio"
                name="reminderHour"
                value={h}
                checked={hour === h}
                onChange={() => setHour(h)}
                className="sr-only"
              />
              {String(h).padStart(2, "0")}:00
            </label>
          ))}
        </div>
        {zone && <p className="mt-2 text-sm text-ink2">{t.reminder.zone.replace("{zone}", zone)}</p>}
        <FieldError>{errors.reminderHour && t.errors.hour}</FieldError>
        <FieldError>{errors.tz && t.errors.zone}</FieldError>
      </fieldset>

      <FieldError>{errors.form && t.errors.unknown}</FieldError>

      <div className="mt-12">
        <SubmitButton className="w-full !py-4" disabled={pending}>
          {pending ? t.saving : t.save}
        </SubmitButton>
      </div>
    </form>
  );
}
