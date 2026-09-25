import type { MetadataRoute } from "next";
import { RIVER_SLUGS } from "@/content/rivers";
import { OCCASION_SLUGS } from "@/content/muhurat";
import { CITY_SLUGS } from "@/content/cities";
import { isIndexable } from "@/lib/indexable";
import { hreflangMap, localeUrl, LANGS, DEFAULT_LANG } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitemap, generated per locale from the same route manifest that drives
   hreflang, and filtered through src/lib/indexable.ts, the one list of pages
   that ask to be indexed. A page outside it stays live with `noindex` and is
   left out here.

   This file cannot disagree with the `<link rel="alternate">` tags on the
   pages themselves: both come out of `hreflangMap`, so every entry carries the
   same alternates set as the page it points at, and both locales of a route
   are in or out together.

   Remade once a day, so a dated occasion enters as it comes within 180 days
   and leaves once it is past.

   `lastModified` is one fixed date, the day the index was last cut and its
   pages rewritten. It is never the build time: a date that moves on every
   deploy claims every URL changed, and search engines stop reading lastmod
   from a site that does that. Move LAST_MODIFIED forward by hand in the
   commit that changes what the pages say, and only then.
   --------------------------------------------------------------------------- */

export const revalidate = 86400;

const LAST_MODIFIED = "2026-09-25";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/** Locale-independent routes, in the public English shape. */
const ROUTES: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/rivers", priority: 0.9, changeFrequency: "monthly" },
  ...RIVER_SLUGS.map(
    (slug): Route => ({ path: `/rivers/${slug}`, priority: 0.8, changeFrequency: "monthly" }),
  ),
  { path: "/snan", priority: 0.95, changeFrequency: "monthly" },
  { path: "/live", priority: 0.9, changeFrequency: "daily" },
  { path: "/panchang", priority: 0.85, changeFrequency: "daily" },
  { path: "/panchang/shraddha", priority: 0.8, changeFrequency: "monthly" },
  ...CITY_SLUGS.map((slug): Route => ({ path: `/panchang/${slug}`, priority: 0.7, changeFrequency: "daily" })),
  { path: "/muhurat", priority: 0.9, changeFrequency: "weekly" },
  ...OCCASION_SLUGS.map(
    (slug): Route => ({ path: `/muhurat/${slug}`, priority: 0.7, changeFrequency: "weekly" }),
  ),
  { path: "/kumbh", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.filter(({ path }) => isIndexable(path, now)).flatMap(({ path, priority, changeFrequency }) => {
    const languages = hreflangMap(path);
    return LANGS.map((lang) => ({
      url: localeUrl(lang, path),
      lastModified: LAST_MODIFIED,
      changeFrequency,
      /* The English edition is the one to crawl first for a given route; the
         others are the same page in another language, not a lesser page. A
         single step down is enough to say so without burying them. */
      priority: lang === DEFAULT_LANG ? priority : Number((priority * 0.9).toFixed(2)),
      alternates: { languages },
    }));
  });
}
