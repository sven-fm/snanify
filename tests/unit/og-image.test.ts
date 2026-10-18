import { describe, expect, it } from "vitest";
import { LANGS } from "@/lib/locales";
import { pageCard } from "@/lib/page-cards";
import { SITE_CARD_SIZE } from "@/lib/site-card";
import { SITE_CARD_VERSION, pageMetadata, siteCard } from "@/lib/seo";

/* ---------------------------------------------------------------------------
   Every page carries a picture when its link is pasted into Facebook,
   WhatsApp or X.

   A page that sets `openGraph` replaces the layout's, image and all, so
   pageMetadata names the site card itself: the homepage's card, at
   /opengraph-image/<lang>. Its query is a literal in src/lib/seo.ts (the copy
   imports seo, so seo cannot import the cards); the test below holds it to
   the hash src/lib/page-cards.ts gives the homepage's card.
   --------------------------------------------------------------------------- */

describe("the site card on every page", () => {
  it("names the card on a subpage in both editions, for Open Graph and X", () => {
    for (const lang of LANGS) {
      const meta = pageMetadata({ lang, path: "/privacy", title: "t", description: "d" });
      const card = siteCard(lang);
      expect(meta.openGraph?.images).toEqual([card]);
      expect(meta.twitter?.images).toEqual([card]);
      expect(card.url).toBe(`https://www.snanify.com/opengraph-image/${lang}?v=${SITE_CARD_VERSION[lang]}`);
    }
  });

  it("keeps a page's own image when it passes one", () => {
    const meta = pageMetadata({ lang: "en", path: "/x", title: "t", description: "d", images: ["/own.png"] });
    expect(meta.openGraph?.images).toEqual(["/own.png"]);
    expect(meta.twitter?.images).toEqual(["/own.png"]);
  });

  it("describes the card the route draws", () => {
    const card = siteCard("en");
    expect({ width: card.width, height: card.height }).toEqual(SITE_CARD_SIZE);
  });

  it("is the homepage's card, at the version its words and drawing give it", () => {
    for (const lang of LANGS) {
      const home = pageCard(lang, "/")!;
      const version = new URL(home.url).searchParams.get("v");
      expect(
        siteCard(lang).url,
        `The homepage's card moved. Set SITE_CARD_VERSION.${lang} in src/lib/seo.ts to "${version}".`,
      ).toBe(home.url);
    }
  });
});
