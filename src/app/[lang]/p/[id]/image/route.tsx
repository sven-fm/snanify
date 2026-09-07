import { eq } from "drizzle-orm";
import { db, sittings } from "@/db";
import { isId } from "@/lib/ids";
import { renderPatra } from "@/lib/patra-image";
import { patraView } from "@/lib/patra-view";

/* ---------------------------------------------------------------------------
   The share image, 1080 by 1350.

   Rendered on demand and cached for a year: a sitting never changes after it
   is minted, so the only reason to draw one twice is that nobody asked for it
   in between.

   `isId` runs before the database is touched, so a path segment from the open
   internet never becomes a query.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  if (!isId(id)) return new Response("not found", { status: 404 });

  const rows = await db.select().from(sittings).where(eq(sittings.id, id)).limit(1);

  const sitting = rows[0];
  if (!sitting || !sitting.isPublic) return new Response("not found", { status: 404 });

  const png = await renderPatra(patraView(sitting));

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
