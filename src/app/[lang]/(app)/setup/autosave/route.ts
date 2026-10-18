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

   SMALL AND WELL FORMED ONLY. A body over 64 KB, or without a length, is
   refused unread; one that is not multipart form data, or does not parse as
   it, is a 400 rather than an unhandled throw.

   SAME ORIGIN ONLY. It lives under /setup, so the proxy runs Clerk for it and
   the session cookie names the user, and a post from another site is refused
   before the cookie is looked at.
   --------------------------------------------------------------------------- */

export async function POST(
  req: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });

  /* Sized before it is read: a beacon carries 64 KB at most, and the real
     sheet is a few hundred bytes. */
  const length = req.headers.get("content-length");
  if (length === null) return new Response(null, { status: 411 });
  if (!(Number(length) <= MAX_BYTES)) return new Response(null, { status: 413 });

  const { lang: raw } = await params;
  const lang: Lang = raw === "hi" ? "hi" : "en";

  const user = await currentUser(lang);
  if (!user) return new Response(null, { status: 401 });

  const form = await readForm(req);
  if (form instanceof Response) return form;
  form.delete("portrait");

  const saved = await saveSheet(user.id, lang, form, { autosave: true });
  return Response.json({ ok: saved.ok }, { status: saved.ok ? 200 : 422 });
}

/** The most a beacon can carry. */
const MAX_BYTES = 64 * 1024;

/** The body as form data, or the 400 that answers one that is not. */
async function readForm(req: Request): Promise<FormData | Response> {
  if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return new Response(null, { status: 400 });
  }
  try {
    return await req.formData();
  } catch {
    return new Response(null, { status: 400 });
  }
}
