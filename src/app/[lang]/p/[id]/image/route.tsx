import { eq } from "drizzle-orm";
import { db, sittings } from "@/db";
import { isId } from "@/lib/ids";
import { allow, clientKey } from "@/lib/limiter";
import { renderPatra } from "@/lib/patra-image";
import { sheetUrl, storeSheet } from "@/lib/patra-store";
import { patraView } from "@/lib/patra-view";

/* ---------------------------------------------------------------------------
   The share image, 1080 by 1920: the memento.

   Almost always a redirect. The sheet is drawn once, when the morning is
   minted, and stored; this hands the reader that file. A sitting never changes
   after it is minted, so there is never a reason to draw one twice.

   It still draws on demand for the sheets that have no stored file: the ones
   minted before this existed, and any whose render failed at the time. Those
   are stored on the way past, so it happens once.

   `isId` runs before the database is touched, so a path segment from the open
   internet never becomes a query.
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
  if (!sitting || !sitting.isPublic) return new Response("not found", { status: 404 });

  const stored = sheetUrl(sitting);
  if (stored) return Response.redirect(stored, 308);

  const png = await renderPatra(patraView(sitting));

  /* Drawn because it was missing, so keep it this time. Nothing waits on the
     write: the reader already has their bytes below. */
  void storeSheet(sitting);

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
