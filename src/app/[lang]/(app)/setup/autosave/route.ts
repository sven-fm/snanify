import { currentUser } from "@/lib/auth";
import { saveSheet } from "@/lib/save-sheet";
import type { Lang } from "@/lib/locales";
import { sameOrigin } from "@/lib/same-origin";

/* ---------------------------------------------------------------------------
   The beacon: the last words of a /setup page that is closing.

   A server action cannot be sent with `keepalive`, so a reader who blurs a
   name and closes the tab inside the autosave's pause would lose it. On
   `pagehide` the form sends what is still unsaved here with
   `navigator.sendBeacon` (src/components/setup/SetupForm.tsx), which the
   browser delivers after the page is gone.

   IT TAKES WORDS AND CHOICES ONLY. A beacon carries 64 KB at most and the
   photograph is dropped before the write, so the blob store is reached by
   the BotID-checked action alone; this route is an autosave like any other,
   refused onto an account without a completed sheet (src/lib/save-sheet.ts).

   SAME ORIGIN ONLY. It lives under /setup, so the proxy runs Clerk for it and
   the session cookie names the user, and a post from another site is refused
   before the cookie is looked at.
   --------------------------------------------------------------------------- */

export async function POST(
  req: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });

  const { lang: raw } = await params;
  const lang: Lang = raw === "hi" ? "hi" : "en";

  const user = await currentUser(lang);
  if (!user) return new Response(null, { status: 401 });

  const form = await req.formData();
  form.delete("portrait");

  const saved = await saveSheet(user.id, lang, form, { autosave: true });
  return Response.json({ ok: saved.ok }, { status: saved.ok ? 200 : 422 });
}

