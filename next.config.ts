import type { NextConfig } from "next";

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
   serves portraits and sheets.

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

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLERK} https://challenges.cloudflare.com https://va.vercel-scripts.com`,
  `connect-src 'self' ${CLERK} ${BLOB} https://vitals.vercel-insights.com https://va.vercel-scripts.com`,
  `img-src 'self' data: blob: ${BLOB} https://img.clerk.com`,
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
   * Next caps action bodies at one megabyte unless told otherwise, and a
   * phone photograph is three to eight, so every real upload was answered
   * with a 500 before src/lib/portrait.ts saw a byte. The limit here matches
   * PORTRAIT.maxUploadBytes; the pipeline still rejects anything larger.
   */
  experimental: {
    serverActions: { bodySizeLimit: "12mb" },
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

export default nextConfig;
