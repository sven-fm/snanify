"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, profiles, users } from "@/db";
import { requireUser } from "@/lib/auth";
import { balance } from "@/lib/credits";
import { putPortrait, remove } from "@/lib/blob";
import { PortraitRejected, processPortrait } from "@/lib/portrait";
import { validateProfile, type ProfileErrors, type RawProfile } from "@/lib/profile-input";
import { localePath, type FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Saving the setup form.

   THE PHOTOGRAPH IS PRESSED HERE, NOT IN THE BROWSER. A phone can crop and
   resize, and a phone can also be told to send anything at all: a server that
   trusts a client-side resize is a server that stores whatever bytes it is
   handed. src/lib/portrait.ts checks the pixel budget from the header, strips
   EXIF and writes a grayscale JPEG, and this is the only path a portrait
   reaches the store by.

   THE OLD PORTRAIT IS DELETED AFTER THE NEW ONE IS WRITTEN, never before. If
   the upload fails halfway, the person keeps the portrait they had rather than
   losing it to a failed replacement.

   THE RESULT IS RETURNED, NOT THROWN. The form renders field errors, so a
   failure is a value: `useActionState` on the client puts them next to the
   inputs, in the reader's own language, out of src/content/setup.ts.
   --------------------------------------------------------------------------- */

export type SaveState = {
  ok: boolean;
  errors: ProfileErrors & { portrait?: string; form?: string };
  /** Where to go once saved: the morning if there is one in hand, the packs if not. */
  next?: string;
};

/**
 * The edition comes from a hidden field rather than a bound argument.
 *
 * `action.bind(null, lang)` inside a client component gives React a different
 * action reference on the server render and on hydration, and the form's
 * hidden action fields then disagree: a hydration mismatch on first load only,
 * which is exactly how it presented. A hidden input has no such problem.
 */
export async function saveProfile(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const lang: Lang = formData.get("lang") === "hi" ? "hi" : "en";
  const user = await requireUser(lang, "/setup");

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

  const existing = await db
    .select({ portraitKey: profiles.portraitKey })
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  let portraitKey = existing[0]?.portraitKey ?? null;
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
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    });

  await db
    .update(users)
    .set({ reminderHour: value.reminderHour, tz: value.tz, locale: lang })
    .where(eq(users.id, user.id));

  revalidatePath(localePath(lang, "/account"));

  /* Setup comes before payment. A person with mornings in hand goes to sit;
     a person with none goes to pick them, with their names on the specimen. */
  const credits = await balance(db, user.id);
  return { ok: true, errors: {}, next: localePath(lang, credits > 0 ? "/today" : "/begin") };
}
