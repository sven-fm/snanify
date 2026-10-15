"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db, users } from "@/db";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { localePath, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The button on /reminders/off.

   The signed pair from the email rides along in two hidden fields and is
   checked again here, so the form can switch off only the person the link was
   signed for. A bad pair writes nothing and lands on the page's own 404.

   Answered with the same URL, which now reads the row as off and says so.
   --------------------------------------------------------------------------- */

export async function switchOffReminders(lang: Lang, formData: FormData): Promise<void> {
  const u = String(formData.get("u") ?? "");
  const t = String(formData.get("t") ?? "");
  const page = localePath(lang, "/reminders/off");

  if (!verifyUnsubscribe(u, t)) redirect(page);

  await db.update(users).set({ reminderOn: false }).where(eq(users.id, u));

  redirect(`${page}?u=${encodeURIComponent(u)}&t=${encodeURIComponent(t)}`);
}
