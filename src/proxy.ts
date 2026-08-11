import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANGS } from "@/lib/locales";

/**
 * Keeps the public URL scheme (English unprefixed, every other locale under its
 * ISO 639-1 code) while the route tree is authored once under src/app/[lang].
 *
 *   /rivers      -> rewrite  /en/rivers      (URL bar keeps /rivers)
 *   /ta/rivers   -> pass through, matches [lang]=ta
 *   /en/rivers   -> 308 redirect to /rivers  (one canonical URL per page)
 *
 * The prefix set is derived from the registry rather than written out, so
 * adding a locale needs no edit here. It is a Set because this runs on every
 * request that is not a static asset.
 *
 * Next 16 renamed middleware.ts to proxy.ts.
 */

const PREFIXES = new Set<string>(LANGS.filter((l) => l !== DEFAULT_LANG));

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is never canonical, collapse it to the unprefixed form.
  if (first === DEFAULT_LANG) {
    const rest = pathname.slice(DEFAULT_LANG.length + 1) || "/";
    return NextResponse.redirect(new URL(rest + search, req.url), 308);
  }

  // /hi/..., /ta/... and the rest already match [lang].
  if (PREFIXES.has(first)) return NextResponse.next();

  // Everything else is English: rewrite without changing the visible URL.
  return NextResponse.rewrite(new URL(`/${DEFAULT_LANG}${pathname}${search}`, req.url));
}

export const config = {
  /**
   * Skip Next internals, anything with a file extension, and the generated
   * image routes.
   *
   * `opengraph-image` is load bearing. It lives at `[lang]/opengraph-image`, so
   * Next writes the English one as `/en/opengraph-image`, which the redirect
   * above would otherwise 308 to a path that does not exist and mangle the
   * cache-busting query while doing it. Scrapers do not reliably follow a
   * redirect for an `og:image`, so the card would simply come out blank.
   */
  matcher: ["/((?!_next/|api/|.*\\..*|.*opengraph-image|.*twitter-image).*)"],
};
