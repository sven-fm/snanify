import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANGS } from "@/lib/locales";
import { CURRENCY_COOKIE, currencyForCountry } from "@/lib/currency";
import { ADS_COOKIE, adsAllowed } from "@/lib/meta";

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
  /* Whether the Meta Pixel may load from the first visit ("1") or only after
     the reader says yes to the cookie notice ("ask"); see src/lib/meta.ts.
     Read by the browser, so not httpOnly, and rewritten on every response
     like the currency, so a reader who travels is treated by where they are. */
  res.cookies.set(ADS_COOKIE, adsAllowed(country) ? "1" : "ask", {
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
 * THE LANDING, FOR SOMEBODY SIGNED IN, IS THEIR ACCOUNT. A signed-in visitor
 * on `/` or `/hi` is sent on with a 307 to /account, where the register and
 * the one press for this morning are; /account forwards somebody who has not
 * set up yet to /setup. The landing itself stays a static page.
 *
 * ONLY A POSSIBLE SESSION PAYS FOR CLERK. A stranger, and every crawler, has
 * no Clerk cookie and goes straight to the rewrite, so the landing keeps the
 * fast first paint the comment on APP_PATH is about. A cookie that says a
 * session may exist (`__session*`, or a `__client_uat*` that is not "0") runs
 * Clerk's middleware, which verifies it before anything is redirected.
 */
export function isLanding(pathname: string): boolean {
  const bare = pathname.replace(/\/$/, "") || "/";
  return bare === "/" || [...PREFIXES].some((p) => bare === `/${p}`);
}

export function mightBeSignedIn(cookies: { name: string; value: string }[]): boolean {
  return cookies.some(
    ({ name, value }) =>
      (/^__session(?:_|$)/.test(name) && value !== "") || (/^__client_uat(?:_|$)/.test(name) && value !== "" && value !== "0"),
  );
}

const landingWithClerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId) return route(req);
  const first = req.nextUrl.pathname.split("/")[1];
  const prefix = PREFIXES.has(first) ? `/${first}` : "";
  return NextResponse.redirect(new URL(`${prefix}/account`, req.url), 307);
});

/**
 * Only the signed-in routes pass through Clerk. On a marketing page Clerk has
 * nothing to read, and on a development instance its middleware answered a
 * first visit with a round trip to clerk.accounts.dev and back, 1.6 seconds
 * before the landing page could paint. The pages that call `requireUser` or
 * render Clerk's widgets all live under these prefixes, in either edition.
 */
const APP_PATH = /^\/(?:[a-z]{2}\/)?(?:begin|setup|today|account|p|specimen|sign-in|sign-up|sign-out)(?:\/|$)/;

export function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (APP_PATH.test(pathname)) return withClerk(req, event);
  if (isLanding(pathname) && mightBeSignedIn(req.cookies.getAll())) return landingWithClerk(req, event);
  return route(req);
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
   * `email/` holds the two images every reminder loads by absolute URL, and
   * `brand-1024.png` the Facebook avatar: files in public/ that a locale
   * rewrite would answer with the site's 404.
   *
   * The 32-hex `.txt` is the IndexNow key file (public/<key>.txt). Search
   * engines fetch it to verify a submission and want the bare key back, so it
   * is served as the static file it is, like robots.txt.
   *
   * The `149e9513-…` prefix is BotID's. `withBotId` in next.config.ts rewrites
   * it to Vercel's bot check, but the proxy runs before those rewrites: caught
   * here, the challenge script got the locale rewrite and a 404, the browser
   * never sent the server action, and saving setup and paying both failed.
   * tests/unit/proxy-matcher.test.ts reads the prefix from the installed
   * package, so an upgrade that moves it fails there first.
   */
  matcher: [
    "/((?!_next/|api/|waters/|email/|149e9513-01fa-4fb0-aad4-566afd725d1b/|favicon\\.ico|icon\\.svg|icon-\\d+\\.png|brand-\\d+\\.png|apple-touch-icon\\.png|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|[0-9a-f]{32}\\.txt|.*opengraph-image|.*twitter-image).*)",
  ],
};
