import { renderSiteCard, SITE_CARD_SIZE } from "@/lib/site-card";
import { DEFAULT_LANG, parseLang } from "@/lib/locales";

/* The site's link preview, one per edition. `src/proxy.ts` excludes every
   `opengraph-image` path from the locale rewrite so the English one, which
   Next writes as /en/opengraph-image, is not redirected out from under the
   scraper; see the note there. */

export const runtime = "nodejs";
export const alt = "Snanify, the river comes to you";
export const size = SITE_CARD_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Response> {
  const lang = parseLang((await params).lang) ?? DEFAULT_LANG;
  const png = await renderSiteCard(lang);
  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
