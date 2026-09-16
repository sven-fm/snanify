import sharp from "sharp";
import { renderPatra } from "@/lib/patra-image";
import { specimenView } from "@/lib/specimen";

/* The specimen sheet, drawn from today's figure. One figure a day, so an
   hour on the CDN is plenty and nothing is ever stale by more than that.

   SERVED SMALL. The memento is a 700 KB PNG at full size; on the landing
   page, inside a 280px phone, that is most of the page's weight. It goes out
   as a WebP at 540 wide, which is the phone at a 2x screen, at a tenth of
   the bytes. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const lang = new URL(request.url).searchParams.get("lang") === "hi" ? "hi" : "en";
  const png = await renderPatra(await specimenView(lang));
  const webp = await sharp(png).resize(540).webp({ quality: 82 }).toBuffer();
  return new Response(new Uint8Array(webp), {
    headers: {
      "content-type": "image/webp",
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
