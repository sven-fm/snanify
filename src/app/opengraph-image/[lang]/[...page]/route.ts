import { LANGS, parseLang } from "@/lib/locales";
import { CARD_PATHS, cardSpec } from "@/lib/page-cards";
import { renderCard } from "@/lib/site-card";

/* ---------------------------------------------------------------------------
   Each major page's link card, at /opengraph-image/<lang>/<page>.

   A plain route rather than Next's opengraph-image file in every segment: one
   renderer, one list of pages (src/lib/page-cards.ts), and a URL that is not
   under /en/, so neither the proxy's /en/* redirect nor robots.txt's /en/ rule
   stands between a scraper and the English card. src/proxy.ts skips every
   path containing `opengraph-image`, so this one too.

   Prerendered for every page in both editions at build, so a scraper gets a
   200 and a PNG at once. Anything else is a 404.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => CARD_PATHS.map((path) => ({ lang, page: path.slice(1).split("/") })));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; page: string[] }> },
): Promise<Response> {
  const { lang, page } = await params;
  const edition = parseLang(lang);
  const spec = edition ? cardSpec(edition, `/${page.join("/")}`) : undefined;
  if (!spec) return new Response("not found", { status: 404 });
  const png = await renderCard(spec);
  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
