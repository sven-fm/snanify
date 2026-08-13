import type { MetadataRoute } from "next";
import { RIVER_SLUGS } from "@/content/rivers";
import { OCCASION_SLUGS } from "@/content/muhurat";
import { hreflangMap, localeUrl, localesForPath, DEFAULT_LANG } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitemap, generated per locale from the same route manifest that drives
   hreflang.

   The important property is that this file cannot disagree with the `<link
   rel="alternate">` tags on the pages themselves: both come out of
   `localesForPath`, so a route only ever appears in the locales that serve it,
   and every entry carries the same alternates set as the page it points at.
   Google treats a mismatch between the two as a reason to ignore both.

   `/rivers` is listed in twelve locales; `/rivers/ganga-haridwar` in two. That
   asymmetry is the whole point of the route manifest, and it is why the detail
   routes are built with `isFullOnlyPath` rather than assumed.

   THERE IS NO `lastModified` HERE, AND THAT IS A DECISION RATHER THAN AN
   OVERSIGHT. It was an oversight until August 2026; this paragraph is the point
   at which it stopped being one, so nobody adds one in good faith later.

   Google uses `lastmod` only while it is consistently and verifiably accurate,
   and discounts the whole signal once it is not. Every implementation available
   to this repo fails that test:

     · Build time on every entry claims all 104 URLs changed on every deploy.
       That is false on 103 of them for a one-line copy fix, and it is the
       version that gets the signal ignored.
     · A date derived from `git log -1` over the content file behind each route
       is accurate, but Vercel clones shallow by default, so it returns empty in
       CI and silently ships a sitemap with no lastmod anyway, or worse, with
       the clone boundary's date on everything.
     · A committed manifest is accurate on the day it is generated and quietly
       wrong from the next content commit onward, which is the worst of the
       three because it looks maintained.

   The upside is small enough to make that trade obvious: 104 URLs is far inside
   any crawl budget, and `changefreq` and `priority` below already say which
   routes move. `/live` is daily, the river pages are monthly, the occasions are
   weekly.

   The rule this file is under is the same one the shraddha ladder on /panchang
   is under: we would rather publish nothing than publish a date we cannot stand
   behind. If a real content-modification date ever becomes available, from a
   CMS or a build step that can see full history, this is where it goes.
   --------------------------------------------------------------------------- */

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
  { path: "/muhurat", priority: 0.9, changeFrequency: "weekly" },
  ...OCCASION_SLUGS.map(
    (slug): Route => ({ path: `/muhurat/${slug}`, priority: 0.7, changeFrequency: "weekly" }),
  ),
  { path: "/kumbh", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ethics", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/patra", priority: 0.7, changeFrequency: "monthly" },
  { path: "/patra/sample", priority: 0.6, changeFrequency: "monthly" },
  { path: "/verify", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority, changeFrequency }) => {
    const languages = hreflangMap(path);
    return localesForPath(path).map((lang) => ({
      url: localeUrl(lang, path),
      changeFrequency,
      /* The English edition is the one to crawl first for a given route; the
         others are the same page in another language, not a lesser page. A
         single step down is enough to say so without burying them. */
      priority: lang === DEFAULT_LANG ? priority : Number((priority * 0.9).toFixed(2)),
      alternates: { languages },
    }));
  });
}
