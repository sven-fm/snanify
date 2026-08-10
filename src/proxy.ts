import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps the public URL scheme (English unprefixed, Hindi under /hi) while the
 * route tree is authored once under src/app/[lang].
 *
 *   /rivers      -> rewrite  /en/rivers      (URL bar keeps /rivers)
 *   /hi/rivers   -> pass through, matches [lang]=hi
 *   /en/rivers   -> 308 redirect to /rivers  (one canonical URL per page)
 *
 * Next 16 renamed middleware.ts to proxy.ts.
 */

const PREFIXED = "hi";
const DEFAULT = "en";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is never canonical — collapse it to the unprefixed form.
  if (first === DEFAULT) {
    const rest = pathname.slice(DEFAULT.length + 1) || "/";
    return NextResponse.redirect(new URL(rest + search, req.url), 308);
  }

  // /hi/... already matches [lang]=hi.
  if (first === PREFIXED) return NextResponse.next();

  // Everything else is English: rewrite without changing the visible URL.
  return NextResponse.rewrite(new URL(`/${DEFAULT}${pathname}${search}`, req.url));
}

export const config = {
  // Skip Next internals, the metadata routes and anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
