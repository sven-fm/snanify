"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { db, profiles, sittings, users } from "@/db";
import { requireUser } from "@/lib/auth";
import { remove } from "@/lib/blob";
import { localePath, type FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   What somebody can do to their own account.

   DELETION IS REAL AND IT IS IN THE RIGHT ORDER. The files go first, because a
   blob whose row is gone is a file nobody can find to delete afterwards. Then
   the rows, which cascade from `users`. Then the Clerk account, last, because
   that is the thing whose absence would stop us reaching the rest.

   The one thing deliberately left behind is the purchase and ledger history,
   which cascade with the user. That is a decision worth naming: a business
   selling to consumers has to be able to answer a chargeback, and the ledger
   is the answer. It is also personal data, so it goes. If that trade ever
   needs reversing, it reverses here and in the privacy page together, not in
   one of them.
   --------------------------------------------------------------------------- */

export async function setReminder(lang: Lang, formData: FormData): Promise<void> {
  const user = await requireUser(lang, "/account");

  const on = formData.get("reminderOn") === "1";
  const hour = Number(formData.get("reminderHour"));

  await db
    .update(users)
    .set({
      reminderOn: on,
      reminderHour: Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : user.reminderHour,
    })
    .where(eq(users.id, user.id));

  revalidatePath(localePath(lang, "/account"));
}

export async function deleteAccount(lang: Lang, formData: FormData): Promise<void> {
  const user = await requireUser(lang, "/account");

  /* Typed, not clicked. A modal is dismissed by a thumb that was aiming
     somewhere else; a word has to be meant. */
  if (String(formData.get("confirm") ?? "").trim().toLowerCase() !== "delete") {
    redirect(`${localePath(lang, "/account")}?confirm=1`);
  }

  const [profile, kept] = await Promise.all([
    db
      .select({ portraitKey: profiles.portraitKey })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1),
    db
      .select({ portraitKey: sittings.portraitKey, imageKey: sittings.imageKey })
      .from(sittings)
      .where(eq(sittings.userId, user.id)),
  ]);

  const keys = new Set<string>();
  if (profile[0]?.portraitKey) keys.add(profile[0].portraitKey);
  for (const row of kept) {
    if (row.portraitKey) keys.add(row.portraitKey);
    if (row.imageKey) keys.add(row.imageKey);
  }

  for (const key of keys) await remove(key);

  /* Everything else cascades from here: profile, purchases, ledger, sittings. */
  await db.delete(users).where(eq(users.id, user.id));

  const clerk = await clerkClient();
  await clerk.users.deleteUser(user.id);

  redirect(localePath(lang, "/"));
}
