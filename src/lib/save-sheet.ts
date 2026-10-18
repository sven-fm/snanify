import "server-only";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, profiles, users } from "@/db";
import { putPortrait } from "@/lib/blob";
import { PortraitRejected, processPortrait } from "@/lib/portrait";
import { validateProfile, type ProfileErrors, type RawProfile } from "@/lib/profile-input";
import { localePath, type Lang } from "@/lib/locales";
import { autosaveAllowed } from "@/lib/autosave";

/* ---------------------------------------------------------------------------
   Writing the sheet: one function behind both ways a /setup change arrives.

   The server action (src/app/[lang]/(app)/setup/actions.ts) is the press and
   the autosave. The route beside it (setup/autosave/route.ts) is the beacon a
   page sends as it closes, for the words typed in its last half second. The
   caller has already found the user; this function writes.

   AN AUTOSAVE WRITES ONLY ONTO A COMPLETED SHEET, and is refused before
   anything is written, the photograph included. A first setup saves once,
   whole, on the press.

   A REPLACED PORTRAIT IS KEPT. Every sitting snapshots the portrait key it
   was made with, and its Patra renders that key for as long as the link
   lives, so a new photograph or a removal only changes the profile row. All
   of a person's portraits go together when the account is deleted
   (removePortraits in src/lib/blob.ts).

   THE PORTRAIT COLUMN IS WRITTEN ONLY WHEN THIS SAVE CHANGES IT. Saves can
   overlap (an autosave carrying a photograph, a beacon carrying words), and
   one that never touched the photograph must never write back the key it
   happened to read.
   --------------------------------------------------------------------------- */

export type SheetErrors = ProfileErrors & { portrait?: string; form?: string };

export type SheetResult = { ok: true; first: boolean } | { ok: false; errors: SheetErrors };

export async function saveSheet(
  userId: string,
  lang: Lang,
  formData: FormData,
  { autosave }: { autosave: boolean },
): Promise<SheetResult> {
  const existing = await db
    .select({ completedAt: profiles.completedAt })
    .from(profiles)
    .where(eq(profiles.userId, userId))
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

  const first = !existing[0]?.completedAt;
  const upload = formData.get("portrait");

  /* undefined: this save leaves the photograph as it is. */
  let portraitKey: string | null | undefined;
  if (upload instanceof File && upload.size > 0) {
    try {
      const pressed = await processPortrait(Buffer.from(await upload.arrayBuffer()));
      portraitKey = (await putPortrait(userId, pressed.buffer)).key;
    } catch (error) {
      if (error instanceof PortraitRejected) {
        return { ok: false, errors: { portrait: error.reason } };
      }
      console.error("setup: portrait failed", error);
      return { ok: false, errors: { form: "unknown" } };
    }
  } else if (formData.get("removePortrait") === "1") {
    portraitKey = null;
  }

  const value = checked.value;
  const portrait = portraitKey === undefined ? {} : { portraitKey };

  await db
    .insert(profiles)
    .values({
      userId,
      waterSlug: value.waterSlug,
      ...portrait,
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
        ...portrait,
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
    .where(eq(users.id, userId));

  revalidatePath(localePath(lang, "/account"));

  return { ok: true, first };
}
