"use server";

import { requireUser } from "@/lib/auth";
import { mintSitting } from "@/lib/sitting";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Keeping this morning.

   Called once by the sitting, at the moment the mark begins. Everything it
   needs is already on the server: who is asking, which water they chose, what
   the river is doing. Nothing is accepted from the browser except the edition,
   because anything the client could send is something the client could forge.

   In particular the clock is the server's. A browser that says it is six in
   the morning on a day it is not would otherwise be able to keep a second
   morning, and the zone that decides which day it is comes from the person's
   own saved profile rather than from this request.
   --------------------------------------------------------------------------- */

export type Kept = { id: string | null; already?: boolean; reason?: string };

export async function keepThisMorning(lang: Lang): Promise<Kept> {
  const user = await requireUser(lang, "/today");

  const result = await mintSitting({ userId: user.id, tz: user.tz, lang });

  switch (result.outcome) {
    case "kept":
      return { id: result.sitting.id };
    case "already":
      return { id: result.sitting.id, already: true };
    case "no-credit":
      return { id: null, reason: "no-credit" };
    case "no-profile":
      return { id: null, reason: "no-profile" };
  }
}
