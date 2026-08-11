import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/locales";

/**
 * Generated rather than served from public/robots.txt, so the origin is stated
 * once (src/lib/locales.ts) and the sitemap reference can never drift from the
 * route that actually produces it.
 *
 * `/en/*` is disallowed as a belt-and-braces measure: src/proxy.ts already 308s
 * it to the unprefixed form, so a crawler should never see one, but a stray
 * internal link would otherwise offer Google a second URL for every English
 * page. The rest of the tree is open; there is nothing here to hide, and every
 * paid surface is behind an action rather than a URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/en/"] }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
