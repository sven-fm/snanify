import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { LANGS } from "@/lib/locales";
import { CARD_PATHS, cardSpec, pageCard } from "@/lib/page-cards";
import { cardSvg, siteCardSvg } from "@/lib/site-card";
import { RIVERS } from "@/content/rivers";
import { config } from "@/proxy";

/* ---------------------------------------------------------------------------
   Each major page carries its own link card, with its own headline.

   The cards are served at /opengraph-image/<lang>/<page>, a path outside
   /en/ that the proxy leaves alone, and each URL carries a hash of what the
   card says and of CARD_DRAWING, so a chat app fetches a card again when it
   changes. The pin at the foot is the drawing's own fingerprint.
   --------------------------------------------------------------------------- */

const DRAWING = "src/lib/site-card.ts";
const DRAWING_SHA256 = "5b8aecba45206365069f24cb55af5bbab76e8148404b9bf5af38f3ceb9afef56";

type PageModule = { generateMetadata: (args: { params: Promise<{ lang: string; river: string }> }) => Promise<Metadata> };

/** Every page with its own card, with the route its card is named by. */
const PAGES: { dir: string; load: () => Promise<PageModule>; path: (river: string) => string }[] = [
  { dir: "snan", load: () => import("@/app/[lang]/snan/page") as Promise<PageModule>, path: () => "/snan" },
  { dir: "rivers", load: () => import("@/app/[lang]/rivers/page") as Promise<PageModule>, path: () => "/rivers" },
  { dir: "rivers/[river]", load: () => import("@/app/[lang]/rivers/[river]/page") as Promise<PageModule>, path: (river) => `/rivers/${river}` },
  { dir: "live", load: () => import("@/app/[lang]/live/page") as Promise<PageModule>, path: () => "/live" },
  { dir: "panchang", load: () => import("@/app/[lang]/panchang/page") as Promise<PageModule>, path: () => "/panchang" },
  { dir: "muhurat", load: () => import("@/app/[lang]/muhurat/page") as Promise<PageModule>, path: () => "/muhurat" },
  { dir: "kumbh", load: () => import("@/app/[lang]/kumbh/page") as Promise<PageModule>, path: () => "/kumbh" },
  { dir: "faq", load: () => import("@/app/[lang]/faq/page") as Promise<PageModule>, path: () => "/faq" },
  { dir: "about", load: () => import("@/app/[lang]/about/page") as Promise<PageModule>, path: () => "/about" },
];

function matches(pathname: string): boolean {
  return config.matcher.some((m) => new RegExp(`^${m}$`).test(pathname));
}

describe("each major page's own card", () => {
  it("covers the homepage, the nine pages and every river, in both editions", () => {
    expect(CARD_PATHS).toHaveLength(9 + RIVERS.length);
    for (const lang of LANGS) for (const path of CARD_PATHS) expect(cardSpec(lang, path), `${lang} ${path}`).toBeDefined();
    expect(cardSpec("en", "/privacy")).toBeUndefined();
    expect(cardSpec("en", "/rivers/nowhere")).toBeUndefined();
  });

  it("names each card by a versioned URL outside /en/ that the proxy leaves alone", () => {
    const urls = new Set<string>();
    for (const lang of LANGS) {
      for (const path of CARD_PATHS) {
        const card = pageCard(lang, path)!;
        const tail = path === "/" ? "" : path;
        expect(card.url).toMatch(new RegExp(`^https://www\\.snanify\\.com/opengraph-image/${lang}${tail}\\?v=[0-9a-f]{8}$`));
        expect({ width: card.width, height: card.height, type: card.type }).toEqual({ width: 1200, height: 630, type: "image/png" });
        expect(card.alt).not.toContain("{");
        const pathname = new URL(card.url).pathname;
        expect(matches(pathname), pathname).toBe(false);
        urls.add(card.url);
      }
    }
    expect(urls.size).toBe(LANGS.length * CARD_PATHS.length);
  });

  it("is what each page's metadata points at, for Open Graph and X", async () => {
    for (const { dir, load, path } of PAGES) {
      const page = await load();
      for (const lang of LANGS) {
        for (const river of dir.includes("[river]") ? RIVERS.map((r) => r.slug) : [""]) {
          const meta = await page.generateMetadata({ params: Promise.resolve({ lang, river }) });
          const card = pageCard(lang, path(river));
          expect(card, `${lang} ${dir} ${river}`).toBeDefined();
          expect(meta.openGraph?.images, `${lang} ${dir} ${river}`).toEqual([card]);
          expect(meta.twitter?.images, `${lang} ${dir} ${river}`).toEqual([card]);
        }
      }
    }
  }, 60000);

  it("sets the page's own headline, and the Hindi one in its own script", async () => {
    const en = cardSpec("en", "/rivers")!;
    const hi = cardSpec("hi", "/rivers")!;
    expect(en.title).toContain("{accent}");
    expect(hi.accent).toMatch(/[ऀ-ॿ]/);
    for (const spec of [en, hi]) {
      const svg = await cardSvg(spec);
      /* Outlines only: a chat app's renderer never has to shape Devanagari. */
      expect(svg).not.toContain("<text");
      expect(svg).not.toBe(await siteCardSvg(spec.lang));
    }
  });

  it("moves every card's URL when the drawing changes", () => {
    const sha = createHash("sha256").update(readFileSync(DRAWING)).digest("hex");
    expect(
      sha,
      `${DRAWING} changed. If the cards draw differently, bump CARD_DRAWING in src/lib/page-cards.ts ` +
        `(and SITE_CARD_VERSION in src/lib/seo.ts, as tests/unit/og-image.test.ts says), then set DRAWING_SHA256 here to ${sha}.`,
    ).toBe(DRAWING_SHA256);
  });
});
