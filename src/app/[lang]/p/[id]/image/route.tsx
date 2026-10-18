import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db, sittings } from "@/db";
import { isId } from "@/lib/ids";
import { allow, clientKey } from "@/lib/limiter";
import { renderPatraFor } from "@/lib/patra-image";
import { sheetUrl, storeSheet } from "@/lib/patra-store";
import { downloadResponse, storedBytes, wantsDownload } from "@/lib/patra-download";

/* ---------------------------------------------------------------------------
   The share image, 1080 by 1920: the memento.

   Almost always a redirect. The sheet is drawn once, when the morning is
   minted, and stored; this hands the reader that file. A sitting never changes
   after it is minted, so there is never a reason to draw one twice.

   It still draws on demand for the sheets that have no stored file: the ones
   minted before this existed, and any whose render failed at the time. Those
   are stored on the way past, so it happens once, and each is drawn by the
   renderer its row names (`renderPatraFor`), so an old sheet comes back as
   it was sent.

   `isId` runs before the database is touched, so a path segment from the open
   internet never becomes a query.

   A PRIVATE SHEET IS STILL ITS OWNER'S. The owner's page shows this image, so
   a private sheet is served to the person who kept it and a 404 to everyone
   else. Clerk's session is readable here because the proxy runs its
   middleware on every /p/ path (APP_PATH in src/proxy.ts). Every private
   answer, the redirect included, is `private, no-store`: a CDN or a shared
   cache must never keep a copy, and a temporary redirect, never a 308, so a
   browser asks again once the sheet's state changes.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  if (!isId(id)) return new Response("not found", { status: 404 });
  if (!allow(`image:${clientKey(request)}`, 60, 60_000)) return new Response("slow down", { status: 429 });

  const rows = await db.select().from(sittings).where(eq(sittings.id, id)).limit(1);

  const sitting = rows[0];
  if (!sitting) return new Response("not found", { status: 404 });

  const owned = !sitting.isPublic;
  if (owned) {
    const { userId } = await auth();
    if (!userId || userId !== sitting.userId) {
      return new Response("not found", { status: 404, headers: { "cache-control": "private, no-store" } });
    }
  }

  const stored = sheetUrl(sitting);

  /* "Save the image": the bytes from this origin, as an attachment, because a
     browser will not save a file it was redirected to on another origin. */
  if (wantsDownload(request)) {
    const bytes = (stored && (await storedBytes(stored))) || new Uint8Array(await renderPatraFor(sitting));
    if (!stored) void storeSheet(sitting);
    return downloadResponse(bytes, owned);
  }

  if (stored && owned) {
    return new Response(null, {
      status: 307,
      headers: { location: stored, "cache-control": "private, no-store" },
    });
  }
  if (stored) return Response.redirect(stored, 308);

  const png = await renderPatraFor(sitting);

  /* Drawn because it was missing, so keep it this time. Nothing waits on the
     write: the reader already has their bytes below. */
  void storeSheet(sitting);

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": owned ? "private, no-store" : "public, max-age=31536000, immutable",
    },
  });
}
