import type { Lang } from "@/lib/content";

export type { Lang };

/**
 * English is the bare root (`/rituals`); Hindi is prefixed (`/hi/rituals`).
 * Always build hrefs through this, hand-written `/hi/...` strings are how a
 * locale gets stranded when a route is renamed.
 */
export function localePath(lang: Lang, path: string): string {
  const p = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p;
  return p === "/" ? "/hi" : `/hi${p}`;
}

/** The same route in the other language, for the header's language switch. */
export function otherLangPath(lang: Lang, path: string): string {
  return localePath(lang === "en" ? "hi" : "en", path);
}

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "hi" : "en");
