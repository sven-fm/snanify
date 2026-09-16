"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, sittings } from "@/db";
import { requireUser } from "@/lib/auth";
import { isId } from "@/lib/ids";
import { localePath, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Taking a Sankalp Patra out of circulation, or putting it back.

   THE UPDATE IS SCOPED TO THE OWNER IN THE STATEMENT ITSELF, not by a check
   beforehand. `where id = ? and user_id = ?` cannot be raced or mistaken: a
   request for somebody else's sheet updates zero rows and says nothing about
   whether that sheet exists.

   MAKING ONE PRIVATE DOES NOT UNSEND IT. Anybody who already has the image
   file has it. What changes is that the page and the image stop answering, so
   a link forwarded onward reaches nothing. The copy says that plainly rather
   than implying a recall that is not possible.
   --------------------------------------------------------------------------- */

export async function setPatraPublic(
  lang: Lang,
  id: string,
  makePublic: boolean,
): Promise<void> {
  if (!isId(id)) return;

  const user = await requireUser(lang, `/p/${id}`);

  await db
    .update(sittings)
    .set({ isPublic: makePublic })
    .where(and(eq(sittings.id, id), eq(sittings.userId, user.id)));

  revalidatePath(localePath(lang, `/p/${id}`));
}
