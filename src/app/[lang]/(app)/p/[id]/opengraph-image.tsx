import { eq } from "drizzle-orm";
import { db, sittings } from "@/db";
import { isId } from "@/lib/ids";
import { CARD_SIZE, renderPatraCard } from "@/lib/patra-image";
import { patraView } from "@/lib/patra-view";

/* ---------------------------------------------------------------------------
   The card a chat app unfurls when somebody pastes the link.

   `src/proxy.ts` excludes every `opengraph-image` path from the locale rewrite
   on purpose: Next writes the English one as `/en/p/<id>/opengraph-image`, and
   the `/en/*` redirect would send a scraper somewhere else. Scrapers do not
   follow redirects for an og:image, so the card would simply come out blank.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const alt = "A Sankalp Patra";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Response> {
  /* A promise in Next 16, as everywhere else. Read synchronously it is
     undefined, `isId` refuses it, and every card comes out as a 404 that looks
     from the outside exactly like a missing sitting. */
  const { id } = await params;
  if (!isId(id)) return new Response("not found", { status: 404 });

  const rows = await db.select().from(sittings).where(eq(sittings.id, id)).limit(1);
  const sitting = rows[0];
  if (!sitting || !sitting.isPublic) return new Response("not found", { status: 404 });

  const png = await renderPatraCard(patraView(sitting));

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
