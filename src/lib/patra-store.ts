import "server-only";
import { eq } from "drizzle-orm";
import { db, sittings, type Sitting } from "@/db";
import { blobUrl, putSheet } from "@/lib/blob";
import { renderPatra } from "@/lib/patra-image";
import { patraView } from "@/lib/patra-view";

/* ---------------------------------------------------------------------------
   Rendering a Sankalp Patra once, rather than every time somebody looks at it.

   WHY THIS MATTERS MORE THAN IT LOOKS. The share button fetches the image so
   it can attach the file to the message, and that fetch is the last thing
   between finishing a morning and sending it to a family group. Re-rendering
   the PNG on that request means shaping every glyph and drawing thirty river
   lines while somebody waits with their thumb over the button.

   A sitting never changes after it is minted, so the sheet is rendered once,
   stored, and served from the blob store for good. `image_key` on the row is
   where it lives, and it was declared from the start and never written until
   now.

   RENDERING IS NEVER ALLOWED TO COST SOMEBODY THEIR MORNING. `store` is called
   after the sitting row is committed, and every failure inside it is swallowed
   and logged. A sheet that could not be pre-rendered is drawn on demand by the
   image route instead, which is exactly what happened before this existed.
   --------------------------------------------------------------------------- */

/**
 * Render the sheet and remember where it went. Returns the key, or null if
 * anything went wrong, in which case the image route will draw it live.
 */
export async function storeSheet(sitting: Sitting): Promise<string | null> {
  if (sitting.imageKey) return sitting.imageKey;

  try {
    const png = await renderPatra(patraView(sitting));
    const stored = await putSheet(sitting.id, png);

    await db
      .update(sittings)
      .set({ imageKey: stored.key })
      .where(eq(sittings.id, sitting.id));

    return stored.key;
  } catch (error) {
    console.error("patra: could not pre-render", sitting.id, error);
    return null;
  }
}

/** Where a stored sheet can be fetched, or null when there is not one yet. */
export function sheetUrl(sitting: Pick<Sitting, "imageKey">): string | null {
  return sitting.imageKey ? blobUrl(sitting.imageKey) : null;
}
