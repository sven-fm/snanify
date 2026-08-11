/* ---------------------------------------------------------------------------
   The locale registry.

   One row per language the site serves. Every other locale-aware thing in the
   codebase (routing, the proxy, hreflang, the sitemap, fonts, the language
   switch, JSON-LD) reads from here, so adding a language is a change to this
   file plus the translations it names, and never a hunt through the tree.

   TWO TIERS, AND THE TYPE SYSTEM KNOWS THE DIFFERENCE.

   `FullLang` is the set of locales in which *every* page exists: English and
   Hindi. The deep content (the six waters in full, the panchang, the kumbh
   essay, the ethics and FAQ pages, the Sankalp Patra) is typed
   `Record<FullLang, ...>`, so a missing translation there is still a compile
   error and English never silently stands in for Hindi.

   `Lang` is every locale the site serves. The surfaces that must exist in all
   of them (the landing page, the header and footer, the live river index, the
   waters index, the muhurat calendar, all page metadata) are typed
   `Record<Lang, ...>`, so a missing translation there is a compile error too.

   The two tiers are not a fallback mechanism. A locale never advertises a page
   it does not have: `localesForPath` below drives both the sitemap and the
   hreflang set, so `/panchang` is offered to `en` and `hi` and to nobody else,
   which is exactly what Google's reciprocity rule requires.

   URL SHAPE. English is the bare root (`/rivers`). Every other locale is
   prefixed with its ISO 639-1 code (`/ta/rivers`). `/en/...` is never a public
   URL; src/proxy.ts collapses it with a 308.
   --------------------------------------------------------------------------- */

/** The locales in which every page on the site exists. */
export type FullLang = "en" | "hi";

/** Every locale the site serves. */
export type Lang =
  | FullLang
  | "bn"
  | "mr"
  | "te"
  | "ta"
  | "gu"
  | "kn"
  | "ml"
  | "or"
  | "pa"
  | "as";

/**
 * Which writing system a locale is set in. This picks the font pair, and it is
 * deliberately not one-to-one with the locale: Marathi shares Devanagari with
 * Hindi, and Assamese shares its script with Bengali.
 */
export type Script =
  | "latin"
  | "devanagari"
  | "bengali"
  | "telugu"
  | "tamil"
  | "gujarati"
  | "kannada"
  | "malayalam"
  | "oriya"
  | "gurmukhi";

/** How much of the site a locale carries. See the tier note at the top. */
export type Depth = "full" | "surface";

export type LocaleDef = {
  readonly code: Lang;
  /**
   * The BCP 47 tag for `<html lang>` and for `hreflang`. Bare language codes,
   * not language-region pairs: this product is for Indians everywhere, so
   * `ta` should match a Tamil reader in Chennai, Colombo, Toronto and
   * Singapore alike. A `ta-IN` tag would exclude three of those.
   */
  readonly tag: string;
  /** Open Graph locale, which does want a region. */
  readonly og: string;
  /** The language's name in itself, which is the only correct label in a switch. */
  readonly native: string;
  /** The language's name in English, for aria labels and the language index. */
  readonly english: string;
  readonly script: Script;
  readonly dir: "ltr";
  readonly depth: Depth;
};

export const LOCALES: readonly LocaleDef[] = [
  { code: "en", tag: "en", og: "en_IN", native: "English",  english: "English",   script: "latin",      dir: "ltr", depth: "full"    },
  { code: "hi", tag: "hi", og: "hi_IN", native: "हिन्दी",     english: "Hindi",     script: "devanagari", dir: "ltr", depth: "full"    },
  { code: "bn", tag: "bn", og: "bn_IN", native: "বাংলা",      english: "Bengali",   script: "bengali",    dir: "ltr", depth: "surface" },
  { code: "mr", tag: "mr", og: "mr_IN", native: "मराठी",      english: "Marathi",   script: "devanagari", dir: "ltr", depth: "surface" },
  { code: "te", tag: "te", og: "te_IN", native: "తెలుగు",     english: "Telugu",    script: "telugu",     dir: "ltr", depth: "surface" },
  { code: "ta", tag: "ta", og: "ta_IN", native: "தமிழ்",      english: "Tamil",     script: "tamil",      dir: "ltr", depth: "surface" },
  { code: "gu", tag: "gu", og: "gu_IN", native: "ગુજરાતી",    english: "Gujarati",  script: "gujarati",   dir: "ltr", depth: "surface" },
  { code: "kn", tag: "kn", og: "kn_IN", native: "ಕನ್ನಡ",      english: "Kannada",   script: "kannada",    dir: "ltr", depth: "surface" },
  { code: "ml", tag: "ml", og: "ml_IN", native: "മലയാളം",    english: "Malayalam", script: "malayalam",  dir: "ltr", depth: "surface" },
  { code: "or", tag: "or", og: "or_IN", native: "ଓଡ଼ିଆ",       english: "Odia",      script: "oriya",      dir: "ltr", depth: "surface" },
  { code: "pa", tag: "pa", og: "pa_IN", native: "ਪੰਜਾਬੀ",     english: "Punjabi",   script: "gurmukhi",   dir: "ltr", depth: "surface" },
  { code: "as", tag: "as", og: "as_IN", native: "অসমীয়া",    english: "Assamese",  script: "bengali",    dir: "ltr", depth: "surface" },
] as const;

/** Every locale code, in registry order. The landing locale is first. */
export const LANGS: readonly Lang[] = LOCALES.map((l) => l.code);

/** The locales that carry the whole site. */
export const FULL_LANGS: readonly FullLang[] = ["en", "hi"];

/** The locale English falls out of. Also the x-default target and the bare root. */
export const DEFAULT_LANG: FullLang = "en";

const BY_CODE = new Map<string, LocaleDef>(LOCALES.map((l) => [l.code, l]));

export function localeDef(lang: Lang): LocaleDef {
  const def = BY_CODE.get(lang);
  /* Unreachable while `lang` is typed, but this module is also handed raw
     route segments, and a silent undefined here would surface as a blank
     `<html lang>` rather than as a 404. */
  if (!def) throw new Error(`Unknown locale: ${lang}`);
  return def;
}

/** Narrows a raw route segment. Returns undefined rather than throwing, so the
 *  caller decides between `notFound()` and a redirect. */
export function parseLang(value: string | undefined): Lang | undefined {
  return value && BY_CODE.has(value) ? (value as Lang) : undefined;
}

export function isFullLang(lang: Lang): lang is FullLang {
  return localeDef(lang).depth === "full";
}

/* --- URLs ---------------------------------------------------------------- */

export const SITE_ORIGIN = "https://www.snanify.com";

/**
 * The public URL for `path` in `lang`. English is unprefixed; everything else
 * sits under its code. Always build hrefs through this, a hand-written
 * `/hi/...` is how a locale gets stranded when a route is renamed.
 */
export function localePath(lang: Lang, path: string): string {
  const p = path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return p || "/";
  return `/${lang}${p}`;
}

/** The same, absolute. Used by hreflang, canonicals, the sitemap and JSON-LD,
 *  all of which are invalid with a relative URL. */
export function localeUrl(lang: Lang, path: string): string {
  return `${SITE_ORIGIN}${localePath(lang, path)}`;
}

/**
 * Strips a locale prefix off a public path, giving the locale-independent
 * route. `/ta/rivers` and `/rivers` both come back as `/rivers`, which is what
 * the language switch needs in order to land on the same page.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && BY_CODE.has(first)) {
    const remainder = rest.join("/");
    return remainder ? `/${remainder}` : "/";
  }
  return pathname === "" ? "/" : pathname;
}

/* --- which locales serve which route ------------------------------------- */

/**
 * Routes that only the full-depth locales carry. Matched as prefixes, so
 * `/rivers/ganga-haridwar` is covered by `/rivers/` while `/rivers` itself is
 * not. The trailing slash is what separates the index from its details.
 */
const FULL_ONLY: readonly string[] = [
  "/snan",
  "/panchang",
  "/ethics",
  "/how-it-works",
  "/faq",
  "/patra",
  "/verify",
  "/kumbh",
  "/rivers/",
  "/muhurat/",
  /* The free daily surface. These three index pages are the next to widen to
     all twelve; until their copy exists in every locale they stay here, so the
     hreflang sets and the sitemap keep telling the truth about what is
     actually served. Moving a route out of this list is the only change
     needed to publish it in twelve languages. */
  "/live",
  "/rivers",
  "/muhurat",
];

/** True when a route exists in English and Hindi only. */
export function isFullOnlyPath(path: string): boolean {
  return FULL_ONLY.some((p) => (p.endsWith("/") ? path.startsWith(p) : path === p || path.startsWith(`${p}/`)));
}

/**
 * The locales that actually serve `path`. This is the single source of truth
 * for hreflang and for the sitemap, and it is why neither can ever advertise a
 * page that 404s: an alternate Google cannot fetch invalidates the whole
 * cluster, not just the one bad row.
 */
export function localesForPath(path: string): readonly Lang[] {
  return isFullOnlyPath(path) ? FULL_LANGS : LANGS;
}

/**
 * Whether THIS locale serves `path`. Navigation must ask this and never
 * `isFullOnlyPath` alone: `/snan` is a full-depth-only route, but English and
 * Hindi are full-depth locales and must still be offered it. Getting that
 * backwards empties the English nav, which is exactly what it did once.
 */
export function servesPath(lang: Lang, path: string): boolean {
  return !isFullOnlyPath(path) || isFullLang(lang);
}

/**
 * The hreflang map for a route, in the shape Next's `alternates.languages`
 * wants. Every locale that serves the page is listed, including the page's own
 * locale (Google requires the set to be self-referential), and `x-default`
 * points at English as the fallback for a reader whose language is not here.
 */
export function hreflangMap(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const code of localesForPath(path)) {
    map[localeDef(code).tag] = localeUrl(code, path);
  }
  map["x-default"] = localeUrl(DEFAULT_LANG, path);
  return map;
}

/** The other locales serving this route, for the language switch. */
export function alternatesFor(lang: Lang, path: string): { def: LocaleDef; href: string }[] {
  return localesForPath(path)
    .filter((code) => code !== lang)
    .map((code) => ({ def: localeDef(code), href: localePath(code, path) }));
}

/* --- crossing the tier boundary ------------------------------------------ */

/**
 * Read a full-depth string from a page that may be in any locale.
 *
 * The deep content (river names, ghat names, occasion names) is written in
 * English and Hindi only. The landing page exists in twelve locales and prints
 * some of those names, so it needs a defined answer for Tamil.
 *
 * This is a fallback, and it is deliberately the ONLY one in the codebase. It
 * is named, it is typed, and it is confined to proper nouns: places and
 * occasions, never a sentence. Prose is never allowed to fall back, which is
 * why `content`, `nav` and every page's copy are `Record<Lang, ...>` and fail
 * to compile rather than quietly reaching for English.
 *
 * Anything routed through here should be paired with `deepHrefLang` so the
 * markup admits which language the string is actually in.
 */
export function pickDeep(value: Record<FullLang, string>, lang: Lang): string {
  return isFullLang(lang) ? value[lang] : value[DEFAULT_LANG];
}

/** The locale `pickDeep` will actually have returned, for a `lang` attribute. */
export const deepLang = (lang: Lang): FullLang => (isFullLang(lang) ? lang : DEFAULT_LANG);

/**
 * A link from a twelve-locale page into a route that only English and Hindi
 * serve. A Tamil reader following the six waters register gets the English
 * river page rather than a 404, and the anchor says so with `hrefLang`.
 */
export function deepHref(lang: Lang, path: string): { href: string; hrefLang?: string } {
  if (!isFullOnlyPath(path)) return { href: localePath(lang, path) };
  const target = deepLang(lang);
  return {
    href: localePath(target, path),
    ...(target === lang ? {} : { hrefLang: localeDef(target).tag }),
  };
}

/* --- static params -------------------------------------------------------- */

/** `generateStaticParams` for a route every locale serves. */
export function allLangParams(): { lang: Lang }[] {
  return LANGS.map((lang) => ({ lang }));
}

/** `generateStaticParams` for a route only English and Hindi serve. */
export function fullLangParams(): { lang: FullLang }[] {
  return FULL_LANGS.map((lang) => ({ lang }));
}

/**
 * The other full-depth locale. Only meaningful for the deep content, which is
 * bilingual by construction: a river page prints its water's name in the other
 * language as an alternate name, and there are exactly two to choose between.
 */
export const otherFullLang = (lang: FullLang): FullLang => (lang === "en" ? "hi" : "en");
