import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANGS } from "@/lib/locales";
import { CURRENCY_COOKIE, currencyForCountry } from "@/lib/currency";

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

/** Locale prefixes that were once public. Their URLs are indexed, so they land on
 * the English page rather than a 404 while Search Console works through them. */
const RETIRED = new Set(["bn", "mr", "te", "ta", "gu", "kn", "ml", "or", "pa", "as"]);

/**
 * Routes that were folded into others. A 308 rather than a 404 keeps whatever
 * link equity they earned and keeps anyone's bookmark working.
 */
const FOLDED: Record<string, string> = {
  "/how-it-works": "/snan",
  "/patra": "/snan",
  "/patra/sample": "/snan",
  "/verify": "/faq",
  "/ethics": "/faq#how",
};

/**
 * The visitor's country, from Vercel, turned into the currency their price is
 * shown in. Written on every response so a reader who moves country sees the
 * new price on their next load. Not httpOnly: the sync <head> script in
 * src/lib/currency.ts has to read it before first paint.
 */
function stampCurrency(res: NextResponse, req: NextRequest): NextResponse {
  const country = req.headers.get("x-vercel-ip-country");
  res.cookies.set(CURRENCY_COOKIE, currencyForCountry(country), {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

function route(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  // A folded route keeps its readers, in whichever locale asked for it.
  const withoutPrefix =
    PREFIXES.has(first) || RETIRED.has(first) ? pathname.slice(first.length + 1) : pathname;
  const folded = FOLDED[withoutPrefix.replace(/\/$/, "")];
  if (folded) {
    const prefix = PREFIXES.has(first) ? `/${first}` : "";
    return NextResponse.redirect(new URL(`${prefix}${folded}`, req.url), 308);
  }

  // A retired locale lands on the English page it used to have.
  if (RETIRED.has(first)) {
    const rest = pathname.slice(first.length + 1) || "/";
    return NextResponse.redirect(new URL(rest + search, req.url), 308);
  }

  // /en/... is never canonical, collapse it to the unprefixed form.
  if (first === DEFAULT_LANG) {
    const rest = pathname.slice(DEFAULT_LANG.length + 1) || "/";
    return NextResponse.redirect(new URL(rest + search, req.url), 308);
  }

  // /hi/..., /ta/... and the rest already match [lang].
  if (PREFIXES.has(first)) return stampCurrency(NextResponse.next(), req);

  // Everything else is English: rewrite without changing the visible URL.
  return stampCurrency(
    NextResponse.rewrite(new URL(`/${DEFAULT_LANG}${pathname}${search}`, req.url)),
    req,
  );
}

/**
 * Clerk reads its session cookie here so every server component downstream can
 * ask who is signed in without a round trip of its own. It protects nothing by
 * itself: pages call `requireUser` and decide for themselves, which keeps the
 * rule next to the page it applies to rather than in a list here.
 *
 * The URL scheme runs inside it, unchanged.
 */
const withClerk = clerkMiddleware(async (_auth, req) => route(req));

/**
 * Only the signed-in routes pass through Clerk. On a marketing page Clerk has
 * nothing to read, and on a development instance its middleware answered a
 * first visit with a round trip to clerk.accounts.dev and back, 1.6 seconds
 * before the landing page could paint. The pages that call `requireUser` or
 * render Clerk's widgets all live under these prefixes, in either edition.
 */
const APP_PATH = /^\/(?:[a-z]{2}\/)?(?:begin|setup|today|account|p|specimen|sign-in|sign-up|sign-out)(?:\/|$)/;

export function proxy(req: NextRequest, event: NextFetchEvent) {
  return APP_PATH.test(req.nextUrl.pathname) ? withClerk(req, event) : route(req);
}

export const config = {
  /**
   * Skip Next internals, the files that actually exist in public/, and the
   * generated image routes. Everything else, dotted or not, goes through the
   * locale rewrite, so `/llms.txt.bak` or `/wp-login.php` lands on the
   * catch-all and gets the site's own 404. The matcher used to skip every
   * path with a dot, which let `/foo.png` reach `[lang]/page.tsx` with a
   * locale of "foo.png" and answer 500 to every bot probe.
   *
   * `opengraph-image` is load bearing. It lives at `[lang]/opengraph-image`, so
   * Next writes the English one as `/en/opengraph-image`, which the redirect
   * above would otherwise 308 to a path that does not exist and mangle the
   * cache-busting query while doing it. Scrapers do not reliably follow a
   * redirect for an `og:image`, so the card would simply come out blank.
   *
   * The 32-hex `.txt` is the IndexNow key file (public/<key>.txt). Search
   * engines fetch it to verify a submission and want the bare key back, so it
   * is served as the static file it is, like robots.txt.
   */
  matcher: [
    "/((?!_next/|api/|waters/|favicon\\.ico|icon\\.svg|icon-\\d+\\.png|apple-touch-icon\\.png|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|[0-9a-f]{32}\\.txt|.*opengraph-image|.*twitter-image).*)",
  ],
};
