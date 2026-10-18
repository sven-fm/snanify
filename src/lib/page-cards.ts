import { SITE_ORIGIN, type Lang } from "@/lib/locales";
import { withSamvat } from "@/lib/occasions";
import { content } from "@/lib/content";
import { snanContent } from "@/content/snan";
import { riversIndexContent } from "@/content/rivers-index";
import { getGhat, RIVERS, riverDetailContent } from "@/content/rivers";
import { waterName } from "@/content/names";
import { HERO_WATER } from "@/lib/hero-water";
import { liveContent } from "@/content/live";
import { panchangContent } from "@/content/panchang";
import { muhuratIndexContent } from "@/content/muhurat-index";
import { KUMBH_ROUTE, kumbhContent } from "@/content/kumbh";
import { faqContent } from "@/content/trust";
import { ABOUT_ROUTE, aboutContent } from "@/content/about";
import type { CardSpec } from "@/lib/site-card";
import type { PreviewImage } from "@/lib/seo";

/* ---------------------------------------------------------------------------
   Each major page's own link card.

   The page's headline, its accent and its one plain sentence, exactly as its
   head sets them, drawn by src/lib/site-card.ts and served by
   src/app/opengraph-image/[lang]/[[...page]]/route.ts at
   /opengraph-image/<lang>/<page>, and the homepage's at /opengraph-image/<lang>.
   The homepage's old address, /<lang>/opengraph-image, is a rewrite to it in
   next.config.ts, for the scrapers that cached it.

   That path is chosen for the scrapers. It is not under /en/, so the proxy's
   /en/* redirect and robots.txt's /en/ rule never touch it, and it contains
   `opengraph-image`, which src/proxy.ts already leaves alone. The route is
   prerendered for every path below, so a scraper gets a 200 and a PNG on
   the first request.

   THE VERSION. Facebook and WhatsApp cache an image by its URL, so each URL
   carries a short hash of what the card says (the headline, the accent, the
   plain line, the edition's template) and of CARD_DRAWING. Change a page's headline and
   its card's URL moves by itself. Change the drawing (site-card.ts) and bump
   CARD_DRAWING: tests/unit/page-cards.test.ts pins the drawing's file and
   fails until you do. The homepage's URL is also SITE_CARD_VERSION in
   src/lib/seo.ts, which every page without a card of its own carries;
   tests/unit/og-image.test.ts fails until the two agree.
   --------------------------------------------------------------------------- */

/** Bump when src/lib/site-card.ts draws differently. */
export const CARD_DRAWING = "v3-2026-10-18b";

/** Every page with its own card, by its locale-independent route. */
export const CARD_PATHS: readonly string[] = [
  "/",
  "/snan",
  "/rivers",
  ...RIVERS.map((r) => `/rivers/${r.slug}`),
  "/live",
  "/panchang",
  "/muhurat",
  KUMBH_ROUTE,
  "/faq",
  ABOUT_ROUTE,
];

type Words = { title: string; accent: string; plain: string };

function words(lang: Lang, path: string): Words | undefined {
  switch (path) {
    case "/": {
      /* The landing's headline with the hero water, and the share line. */
      const t = content[lang];
      const ghat = getGhat(HERO_WATER);
      const river = ghat ? waterName(ghat, "river", lang) : "Ganga";
      return { title: t.hero.title.replace("{river}", "{accent}"), accent: river, plain: t.share };
    }
    case "/snan": {
      const t = snanContent[lang].hero;
      return { title: t.title.replace("{river}", "{accent}"), accent: t.riverWord, plain: t.band };
    }
    case "/rivers": {
      const t = riversIndexContent[lang].head;
      return { title: t.title, accent: t.accent, plain: t.plain };
    }
    case "/live": {
      const t = liveContent[lang].head;
      return { title: t.title, accent: t.accent, plain: t.plain };
    }
    case "/panchang": {
      const t = panchangContent[lang];
      return { title: t.head.title, accent: t.head.accent, plain: t.hero.lede };
    }
    case "/muhurat": {
      const t = muhuratIndexContent[lang];
      return { title: t.head.title, accent: t.head.accent, plain: t.hero.lede };
    }
    case KUMBH_ROUTE: {
      const t = kumbhContent[lang];
      return { title: t.head.title, accent: t.head.accent, plain: t.hero.standfirst };
    }
    case "/faq": {
      const t = faqContent[lang];
      return { title: t.head.title, accent: t.head.accent, plain: t.lede };
    }
    case ABOUT_ROUTE: {
      const t = aboutContent[lang];
      return { title: t.head.title, accent: t.head.accent, plain: t.lede };
    }
  }
  const slug = path.match(/^\/rivers\/([^/]+)$/)?.[1];
  const ghat = slug ? getGhat(slug) : undefined;
  if (!ghat) return undefined;
  return {
    title: riverDetailContent[lang].head.title.replace("{place}", ghat.city[lang]),
    accent: ghat.river[lang],
    plain: ghat.epithet[lang],
  };
}

/** What a page's card says, or undefined for a page without its own card. */
export function cardSpec(lang: Lang, path: string): CardSpec | undefined {
  if (!CARD_PATHS.includes(path)) return undefined;
  const w = words(lang, path);
  if (!w) return undefined;
  /* The homepage's river keeps the seed it has always been drawn from. */
  const seed = path === "/" ? "snanify-site-card" : `snanify-card:${path}`;
  return { lang, ...w, edition: withSamvat(content[lang].edition, lang), seed };
}

/** FNV-1a, 32 bits, as hex: short, stable, and free of node:crypto. */
function fnv(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/** The headline as a sentence, the alt text of its card. */
function plainTitle(spec: CardSpec): string {
  return spec.title.replace("{accent}", spec.accent);
}

/**
 * A page's card, absolute and versioned, with its size so a chat app can lay
 * out the preview before the image arrives. Undefined for a page without one.
 */
export function pageCard(lang: Lang, path: string): PreviewImage | undefined {
  const spec = cardSpec(lang, path);
  if (!spec) return undefined;
  /* The edition is hashed as its template ("Samvat {samvat}"), not the
     filled line: the year turns at Chaitra Shukla Pratipada with no change
     to the code, and a URL that moved by itself then would leave the
     SITE_CARD_VERSION literal behind and fail CI. The next deploy redraws
     the year in place. */
  const version = fnv(`${CARD_DRAWING}|${JSON.stringify({ ...spec, edition: content[lang].edition })}`);
  return {
    url: `${SITE_ORIGIN}/opengraph-image/${lang}${path === "/" ? "" : path}?v=${version}`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: plainTitle(spec),
  };
}

/** A page's card as pageMetadata's `images`. */
export function cardImages(lang: Lang, path: string): PreviewImage[] | undefined {
  const card = pageCard(lang, path);
  return card ? [card] : undefined;
}
