/* ---------------------------------------------------------------------------
   The locale registry.

   One row per language the site serves. Every other locale-aware thing in the
   codebase (routing, the proxy, hreflang, the sitemap, fonts, the language
   switch, JSON-LD) reads from here, so adding a language is a row in `LOCALES`
   plus the translations the compiler then asks for, and never a hunt through
   the tree.

   Every page exists in every locale. Copy is typed `Record<Lang, ...>`, so a
   missing translation is a compile error and English never silently stands in
   for Hindi.

   URL SHAPE. English is the bare root (`/rivers`). Every other locale is
   prefixed with its ISO 639-1 code (`/hi/rivers`). `/en/...` is never a public
   URL; src/proxy.ts collapses it with a 308.
   --------------------------------------------------------------------------- */

/** Every locale the site serves. */
export type Lang = "en" | "hi";

/**
 * Which writing system a locale is set in. This picks the font pair, and it is
 * deliberately not one-to-one with the locale: a second Devanagari locale
 * would need no new script here.
 */
export type Script = "latin" | "devanagari";

export type LocaleDef = {
  readonly code: Lang;
  /**
   * The BCP 47 tag for `<html lang>` and for `hreflang`. Bare language codes,
   * not language-region pairs: this product is for Indians everywhere, so
   * `hi` should match a Hindi reader in Delhi, Toronto and Singapore alike. A
   * `hi-IN` tag would exclude two of those.
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
};

export const LOCALES: readonly LocaleDef[] = [
  { code: "en", tag: "en", og: "en_IN", native: "English", english: "English", script: "latin",      dir: "ltr" },
  { code: "hi", tag: "hi", og: "hi_IN", native: "हिन्दी",    english: "Hindi",   script: "devanagari", dir: "ltr" },
] as const;

/** Every locale code, in registry order. The landing locale is first. */
export const LANGS: readonly Lang[] = LOCALES.map((l) => l.code);

/** The locale English falls out of. Also the x-default target and the bare root. */
export const DEFAULT_LANG: Lang = "en";

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

/** The other edition. The deep content is bilingual by construction: a river
 *  page prints its water's name in the other language as an alternate name. */
export const otherLang = (lang: Lang): Lang => (lang === "en" ? "hi" : "en");

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
 * route. `/hi/rivers` and `/rivers` both come back as `/rivers`, which is what
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

/* --- hreflang -------------------------------------------------------------- */

/**
 * The hreflang map for a route, in the shape Next's `alternates.languages`
 * wants. Every locale is listed, including the page's own (Google requires the
 * set to be self-referential), and `x-default` points at English as the
 * fallback for a reader whose language is not here. The sitemap reads the same
 * function, so the two cannot disagree.
 */
export function hreflangMap(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const code of LANGS) {
    map[localeDef(code).tag] = localeUrl(code, path);
  }
  map["x-default"] = localeUrl(DEFAULT_LANG, path);
  return map;
}

/** The other locales, for the language switch. */
export function alternatesFor(lang: Lang, path: string): { def: LocaleDef; href: string }[] {
  return LANGS.filter((code) => code !== lang).map((code) => ({ def: localeDef(code), href: localePath(code, path) }));
}

/* --- static params -------------------------------------------------------- */

/** `generateStaticParams` for a route, one entry per locale. */
export function langParams(): { lang: Lang }[] {
  return LANGS.map((lang) => ({ lang }));
}
