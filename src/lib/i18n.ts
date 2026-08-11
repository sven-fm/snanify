/**
 * The locale-aware URL helpers. The registry they read from is
 * src/lib/locales.ts; this file exists so the rest of the tree has one short
 * import for the things it actually uses.
 */

export {
  localePath,
  localeUrl,
  stripLocale,
  alternatesFor,
  hreflangMap,
  localeDef,
  localesForPath,
  isFullLang,
  isFullOnlyPath,
  otherFullLang,
  otherFullLang as otherLang,
  parseLang,
  allLangParams,
  fullLangParams,
  LANGS,
  FULL_LANGS,
  LOCALES,
  DEFAULT_LANG,
  SITE_ORIGIN,
} from "@/lib/locales";

export type { Lang, FullLang, LocaleDef, Script, Depth } from "@/lib/locales";
