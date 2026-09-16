import { eq } from "drizzle-orm";
import sharp from "sharp";
import { db, profiles } from "@/db";
import { currentUser } from "@/lib/auth";
import { renderPatra } from "@/lib/patra-image";
import { specimenView } from "@/lib/specimen";
import { parseLang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The specimen sheet, drawn from today's figure.

   FOR A STRANGER it carries a family that does not exist. FOR SOMEBODY SIGNED
   IN WHO HAS SET UP THEIR SHEET it carries their own names, so the pack
   picker, which is the last step after setup, shows them the thing they are
   about to pay for with their family on it. The route sits under the locale
   tree rather than /api so the proxy runs Clerk's middleware for it and
   `currentUser()` can answer.

   SERVED SMALL. The memento is a 700 KB PNG at full size; inside a 280px
   phone that is most of a page's weight. It goes out as a WebP at 540 wide.
   A stranger's copy may be cached for an hour; a signed-in copy is private.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  const lang = parseLang((await params).lang) === "hi" ? "hi" : "en";

  const user = await currentUser(lang);
  let names: string[] | undefined;
  if (user) {
    const rows = await db
      .select({ names: profiles.names, completedAt: profiles.completedAt })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);
    if (rows[0]?.completedAt) {
      names = (rows[0].names as { name: string }[]).map((n) => n.name).filter(Boolean);
    }
  }

  const png = await renderPatra(await specimenView(lang, new Date(), names));
  const webp = await sharp(png).resize(540).webp({ quality: 82 }).toBuffer();
  return new Response(new Uint8Array(webp), {
    headers: {
      "content-type": "image/webp",
      "cache-control": names
        ? "private, no-store"
        : "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
