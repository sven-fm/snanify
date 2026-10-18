"use server";

import { checkBotId } from "botid/server";
import { cookies, headers } from "next/headers";
import { after } from "next/server";
import { db } from "@/db";
import { currentUser, requireUser } from "@/lib/auth";
import { balance } from "@/lib/credits";
import { saveSheet, type SheetErrors } from "@/lib/save-sheet";
import { localePath, localeUrl, type Lang } from "@/lib/locales";
import { adsAllowed } from "@/lib/meta";
import { CONSENT_COOKIE } from "@/lib/consent";
import { sendRegistration } from "@/lib/meta-capi";
import { isTier } from "@/lib/packs";

/* ---------------------------------------------------------------------------
   Saving the setup form.

   THE PHOTOGRAPH IS PRESSED ON THE SERVER (src/lib/save-sheet.ts), NOT IN
   THE BROWSER. A phone can crop and
   resize, and a phone can also be told to send anything at all: a server that
   trusts a client-side resize is a server that stores whatever bytes it is
   handed. src/lib/portrait.ts checks the pixel budget from the header, strips
   EXIF and writes a grayscale JPEG, and this is the only path a portrait
   reaches the store by. The writing itself lives there too, shared with the
   beacon route beside this file. The browser shrinks a photograph for the trip
   (src/lib/shrink-photo.ts), because the platform caps a request body at
   4.5 MB, and that is all it is trusted with.

   A REPLACED PORTRAIT IS KEPT. Every sitting snapshots the portrait key it
   was made with, and its Patra renders that key for as long as the link
   lives, so replacing or removing the photograph only changes the profile
   row. The files go together when the account is deleted
   (removePortraits in src/lib/blob.ts, called by deleteAccount).

   THE RESULT IS RETURNED, NOT THROWN. The form renders field errors, so a
   failure is a value: `useActionState` on the client puts them next to the
   inputs, in the reader's own language, out of src/content/setup.ts.

   THE FIRST SAVE IS A REGISTRATION, AND ONLY THE FIRST. This form is also the
   settings page, so `completedAt` is written once and kept on every later
   save, and the state says `first` only when it was written now. That save
   alone tells Meta CompleteRegistration: from here through the Conversions
   API, under the checkout's own consent rule (src/app/[lang]/begin/actions.ts),
   and from the browser's pixel under the same event id, so Meta keeps one.
   The send runs after the response, so a slow or failed one never touches
   the save.

   AN AUTOSAVE WRITES ONLY ONTO A COMPLETED SHEET. The form sends
   `autosave=1` when it saves a change on its own (src/lib/autosave.ts). That
   save is refused before anything is written, the photograph included, when
   the account has no completed sheet: a first setup is saved once, whole, by
   the press. An autosave returns no `next`, so the form stays where it is.
   --------------------------------------------------------------------------- */

export type SaveState = {
  ok: boolean;
  errors: SheetErrors;
  /** Where to go once saved: the morning if there is one in hand, the packs if not. */
  next?: string;
  /** True on the save that completed setup for the first time. */
  first?: boolean;
  /** The id CompleteRegistration went to Meta under, for the pixel to repeat. */
  eventId?: string;
};

/**
 * The edition comes from a hidden field rather than a bound argument.
 *
 * `action.bind(null, lang)` inside a client component gives React a different
 * action reference on the server render and on hydration, and the form's
 * hidden action fields then disagree: a hydration mismatch on first load only,
 * which is exactly how it presented. A hidden input has no such problem.
 */
/** /begin, with the pack the reader chose on a price table if one came along. */
function packed(lang: Lang, pack: FormDataEntryValue | null): string {
  const begin = localePath(lang, "/begin");
  return typeof pack === "string" && isTier(pack) ? `${begin}?pack=${pack}` : begin;
}

export async function saveProfile(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const lang: Lang = formData.get("lang") === "hi" ? "hi" : "en";
  const autosave = formData.get("autosave") === "1";

  /* The press sends a signed-out reader to sign in. An autosave runs in the
     background while somebody types, so it fails quietly instead of
     navigating away from words that are still on the screen. */
  const user = autosave ? await currentUser(lang) : await requireUser(lang, "/setup");
  if (!user) return { ok: false, errors: { form: "unknown" } };

  /* A script filling the form gets the form's own error and no row. */
  if ((await checkBotId()).isBot) return { ok: false, errors: { form: "refused" } };

  const saved = await saveSheet(user.id, lang, formData, { autosave });
  if (!saved.ok) return { ok: false, errors: saved.errors };
  const first = saved.first;

  /* A change saved on its own: the form stays, and only a first save registers. */
  if (autosave) return { ok: true, errors: {} };

  const eventId = `reg_${user.id}`;
  if (first) await registered(user, lang, eventId);

  /* Setup comes before payment. A person with mornings in hand goes to sit;
     a person with none goes to pick them, with their names on the specimen. */
  const credits = await balance(db, user.id);
  return {
    ok: true,
    errors: {},
    next: credits > 0 ? localePath(lang, "/today") : packed(lang, formData.get("pack")),
    first,
    eventId: first ? eventId : undefined,
  };
}

/**
 * CompleteRegistration to the Conversions API, for a reader Meta may measure:
 * a country that lets it, or a yes to the cookie notice. The request is read
 * now and the send is scheduled with `after()`, so the save returns first.
 */
async function registered(
  user: { id: string; email: string | null },
  lang: Lang,
  eventId: string,
): Promise<void> {
  try {
    const head = await headers();
    const jar = await cookies();
    const country = head.get("x-vercel-ip-country");
    if (!adsAllowed(country) && jar.get(CONSENT_COOKIE)?.value !== "yes") return;

    const event = {
      eventId,
      email: user.email,
      userId: user.id,
      sourceUrl: localeUrl(lang, "/setup"),
      fbp: jar.get("_fbp")?.value,
      fbc: jar.get("_fbc")?.value,
      ip: head.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
      ua: head.get("user-agent") ?? undefined,
      at: Math.floor(Date.now() / 1000),
    };
    after(() => sendRegistration(event));
  } catch (error) {
    console.error("setup: registration not sent", error);
  }
}
