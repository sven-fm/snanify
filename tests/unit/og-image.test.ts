import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { alt, size } from "@/app/[lang]/opengraph-image";
import { LANGS } from "@/lib/locales";
import { SITE_CARD_VERSION, pageMetadata, siteCard } from "@/lib/seo";

/* ---------------------------------------------------------------------------
   Every page carries a picture when its link is pasted into Facebook or
   WhatsApp.

   A page that sets `openGraph` replaces the layout's, image and all, so
   pageMetadata names the site card itself. It names it by the URL the
   homepage carries, and that URL holds Next's content hash of the card's
   route file. The pin below is that file's own fingerprint: when it moves,
   Next's hash has moved too.
   --------------------------------------------------------------------------- */

const ROUTE = "src/app/[lang]/opengraph-image.tsx";
const ROUTE_SHA256 = "8e1ffaba53cdb7803e4b096c7a38f69d6c90d4e1a6e85b2cf0edd0e9b58ba5fd";

describe("the site card on every page", () => {
  it("names the card on a subpage in both editions, for Open Graph and X", () => {
    for (const lang of LANGS) {
      const meta = pageMetadata({ lang, path: "/snan", title: "t", description: "d" });
      const card = siteCard(lang);
      expect(meta.openGraph?.images).toEqual([card]);
      expect(meta.twitter?.images).toEqual([card]);
      expect(card.url).toBe(`https://www.snanify.com/${lang}/opengraph-image?${SITE_CARD_VERSION}`);
    }
  });

  it("keeps a page's own image when it passes one", () => {
    const meta = pageMetadata({ lang: "en", path: "/x", title: "t", description: "d", images: ["/own.png"] });
    expect(meta.openGraph?.images).toEqual(["/own.png"]);
    expect(meta.twitter?.images).toEqual(["/own.png"]);
  });

  it("describes the card the route draws", () => {
    const card = siteCard("en");
    expect({ width: card.width, height: card.height }).toEqual(size);
    expect(card.alt).toBe(alt);
  });

  it("follows the homepage's query: when the route file changes, rebuild and copy it", () => {
    const sha = createHash("sha256").update(readFileSync(ROUTE)).digest("hex");
    expect(
      sha,
      `${ROUTE} changed, so the homepage's og:image query changed. Run \`npm run build\`, ` +
        `read the query after /en/opengraph-image? on /, set SITE_CARD_VERSION in src/lib/seo.ts ` +
        `to it and ROUTE_SHA256 here to ${sha}.`,
    ).toBe(ROUTE_SHA256);
  });
});
