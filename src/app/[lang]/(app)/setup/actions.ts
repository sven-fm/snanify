"use server";

import { checkBotId } from "botid/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { after } from "next/server";
import { db, profiles, users } from "@/db";
import { requireUser } from "@/lib/auth";
import { balance } from "@/lib/credits";
import { putPortrait, remove } from "@/lib/blob";
import { PortraitRejected, processPortrait } from "@/lib/portrait";
import { validateProfile, type ProfileErrors, type RawProfile } from "@/lib/profile-input";
import { localePath, localeUrl, type Lang } from "@/lib/locales";
import { adsAllowed } from "@/lib/meta";
import { CONSENT_COOKIE } from "@/lib/consent";
import { sendRegistration } from "@/lib/meta-capi";
import { isTier } from "@/lib/packs";
import { autosaveAllowed } from "@/lib/autosave";

/* ---------------------------------------------------------------------------
   Saving the setup form.

   THE PHOTOGRAPH IS PRESSED HERE, NOT IN THE BROWSER. A phone can crop and
   resize, and a phone can also be told to send anything at all: a server that
   trusts a client-side resize is a server that stores whatever bytes it is
   handed. src/lib/portrait.ts checks the pixel budget from the header, strips
   EXIF and writes a grayscale JPEG, and this is the only path a portrait
   reaches the store by. The browser shrinks a photograph for the trip
   (src/lib/shrink-photo.ts), because the platform caps a request body at
   4.5 MB, and that is all it is trusted with.

   THE OLD PORTRAIT IS DELETED AFTER THE NEW ONE IS WRITTEN, never before. If
   the upload fails halfway, the person keeps the portrait they had rather than
   losing it to a failed replacement.

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
  errors: ProfileErrors & { portrait?: string; form?: string };
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
  const user = await requireUser(lang, "/setup");

  /* A script filling the form gets the form's own error and no row. */
  if ((await checkBotId()).isBot) return { ok: false, errors: { form: "refused" } };

  const autosave = formData.get("autosave") === "1";

  const existing = await db
    .select({ portraitKey: profiles.portraitKey, completedAt: profiles.completedAt })
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  if (autosave && !autosaveAllowed(existing[0]?.completedAt)) {
    return { ok: false, errors: { form: "unknown" } };
  }

  const raw: RawProfile = {
    waterSlug: String(formData.get("waterSlug") ?? ""),
    names: formData.getAll("name").map(String),
    prayerId: String(formData.get("prayerId") ?? ""),
    sankalpText: String(formData.get("sankalpText") ?? ""),
    reminderHour: String(formData.get("reminderHour") ?? ""),
    tz: String(formData.get("tz") ?? ""),
  };

  const checked = validateProfile(raw);
  if (!checked.ok) return { ok: false, errors: checked.errors };

  let portraitKey = existing[0]?.portraitKey ?? null;
  const first = !existing[0]?.completedAt;
  const dropPortrait = formData.get("removePortrait") === "1";
  const upload = formData.get("portrait");

  if (upload instanceof File && upload.size > 0) {
    try {
      const pressed = await processPortrait(Buffer.from(await upload.arrayBuffer()));
      const stored = await putPortrait(user.id, pressed.buffer);
      const previous = portraitKey;
      portraitKey = stored.key;
      if (previous && previous !== stored.key) await remove(previous);
    } catch (error) {
      if (error instanceof PortraitRejected) {
        return { ok: false, errors: { portrait: error.reason } };
      }
      console.error("setup: portrait failed", error);
      return { ok: false, errors: { form: "unknown" } };
    }
  } else if (dropPortrait && portraitKey) {
    await remove(portraitKey);
    portraitKey = null;
  }

  const value = checked.value;

  await db
    .insert(profiles)
    .values({
      userId: user.id,
      waterSlug: value.waterSlug,
      portraitKey,
      names: value.names,
      prayerId: value.prayerId,
      sankalpText: value.sankalpText,
      completedAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        waterSlug: value.waterSlug,
        portraitKey,
        names: value.names,
        prayerId: value.prayerId,
        sankalpText: value.sankalpText,
        /* Kept from the first save; set here only if a row ever lacked it. */
        completedAt: sql`coalesce(${profiles.completedAt}, now())`,
        updatedAt: new Date(),
      },
    });

  await db
    .update(users)
    .set({ reminderHour: value.reminderHour, tz: value.tz, locale: lang })
    .where(eq(users.id, user.id));

  revalidatePath(localePath(lang, "/account"));

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
