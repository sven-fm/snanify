import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";
import { LANGS } from "./src/lib/locales";

/* ---------------------------------------------------------------------------
   Security headers, on every response.

   THE CONTENT SECURITY POLICY NAMES EVERY THIRD PARTY THIS SITE TALKS TO,
   and nothing else may load. Clerk serves its browser script and its API
   from the instance domain (clerk.snanify.com in production, a
   *.clerk.accounts.dev host in development) and its bot check from
   Cloudflare. Stripe is reached by a redirect, never embedded, so it appears
   only in form-action: Chrome applies form-action to the redirect a form
   submission ends in, and the Pay button is a form that ends on
   checkout.stripe.com. Vercel Analytics posts to its own host. The blob store
   serves portraits and sheets. The Meta Pixel loads from connect.facebook.net
   and reports to www.facebook.com.

   `'unsafe-inline'` on scripts is the price of the two sync <head> scripts
   (theme and currency) and of Next's own inline bootstrap. A nonce would
   need every page to render per request, which the marketing pages must not.
   frame-ancestors, base-uri, object-src and form-action are where the value
   is, and those are strict.

   Test on /sign-in, /begin, the Pay press and the Stripe return after any
   change here. A wrong CSP is a blank checkout, silently.
   --------------------------------------------------------------------------- */

const CLERK = "https://clerk.snanify.com https://*.clerk.accounts.dev";
const BLOB = "https://*.public.blob.vercel-storage.com";
/* The Meta Pixel loads from connect.facebook.net and reports to
   www.facebook.com, by request and by image beacon; see src/lib/meta.ts. */
const META = "https://connect.facebook.net";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLERK} https://challenges.cloudflare.com https://va.vercel-scripts.com ${META}`,
  `connect-src 'self' ${CLERK} ${BLOB} https://vitals.vercel-insights.com https://va.vercel-scripts.com ${META} https://www.facebook.com`,
  `img-src 'self' data: blob: ${BLOB} https://img.clerk.com https://www.facebook.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  `frame-src ${CLERK} https://challenges.cloudflare.com`,
  "worker-src 'self' blob:",
  "form-action 'self' https://checkout.stripe.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  /**
   * Left out of the bundle and required at runtime instead.
   *
   * Both are native: `@resvg/resvg-js` is a Rust addon loaded through a `.node`
   * binary, and `harfbuzzjs` is WebAssembly. The bundler cannot place either in
   * an ECMAScript chunk, and the build fails outright rather than degrading, so
   * anything drawing the Sankalp Patra takes both from node_modules directly.
   *
   * `sharp` is here for the same reason, and because Vercel keeps its own
   * prebuilt copy for the platform the function runs on.
   */
  serverExternalPackages: ["@resvg/resvg-js", "harfbuzzjs", "sharp"],

  /**
   * The portrait arrives through a server action as multipart form data.
   * Next caps action bodies at one megabyte unless told otherwise, so every
   * real upload was answered with a 500 before src/lib/portrait.ts saw a
   * byte. Vercel Functions cap a request body at 4.5 MB whatever this says,
   * so the limit here is the platform's; the form shrinks a photograph to
   * well under it (src/lib/shrink-photo.ts) and the pipeline refuses
   * anything over PORTRAIT.maxUploadBytes.
   */
  experimental: {
    serverActions: { bodySizeLimit: "4.5mb" },
  },

  /**
   * The homepage's card moved from /<lang>/opengraph-image to
   * /opengraph-image/<lang> (src/lib/page-cards.ts), out from under robots.txt's
   * /en/ rule, which X's crawler honours for images. Facebook and WhatsApp
   * cached the old address on links already shared, so it keeps answering
   * with the same card: a rewrite, never a redirect, since scrapers do not
   * reliably follow one for an og:image. Before the filesystem, so the
   * `[lang]` catch-all never sees the path. src/proxy.ts skips both.
   */
  async rewrites() {
    return {
      beforeFiles: [{ source: `/:lang(${LANGS.join("|")})/opengraph-image`, destination: "/opengraph-image/:lang" }],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    /* Development runs on http, where upgrade-insecure-requests would break
       every local fetch; the rest applies everywhere. */
    const value =
      process.env.NODE_ENV === "production" ? csp : csp.replace("; upgrade-insecure-requests", "");
    return [
      {
        source: "/(.*)",
        headers: securityHeaders.map((h) =>
          h.key === "Content-Security-Policy" ? { ...h, value } : h,
        ),
      },
    ];
  },
};

/* BotID: the rewrites that proxy Vercel's bot check through this origin, so
   the CSP needs no new host. The client side is src/instrumentation-client.ts;
   the checks are in the pay and setup actions. */
export default withBotId(nextConfig);
