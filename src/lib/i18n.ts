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
  otherLang,
  parseLang,
  langParams,
  LANGS,
  LOCALES,
  DEFAULT_LANG,
  SITE_ORIGIN,
} from "@/lib/locales";

export type { Lang, LocaleDef, Script } from "@/lib/locales";
