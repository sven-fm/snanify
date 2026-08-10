import type { MetadataRoute } from "next";
import { RIVER_SLUGS } from "@/content/rivers";
import { OCCASION_SLUGS } from "@/content/muhurat";

const SITE = "https://www.snanify.com";

/** Locale-independent routes, in the public English shape. */
const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/rivers", priority: 0.9, changeFrequency: "monthly" },
  ...RIVER_SLUGS.map((slug) => ({
    path: `/rivers/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/rituals", priority: 0.9, changeFrequency: "monthly" },
  { path: "/muhurat", priority: 0.9, changeFrequency: "weekly" },
  ...OCCASION_SLUGS.map((slug) => ({
    path: `/muhurat/${slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  })),
  { path: "/ethics", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/patra", priority: 0.7, changeFrequency: "monthly" },
  { path: "/patra/sample", priority: 0.6, changeFrequency: "monthly" },
  { path: "/verify", priority: 0.5, changeFrequency: "monthly" },
];

/** Hindi lives under /hi; English is unprefixed. */
const hi = (path: string) => (path === "/" ? "/hi" : `/hi${path}`);

/**
 * Both locales are listed as separate entries, each carrying the reciprocal
 * hreflang pair — a page missing from its own alternates is invisible to the
 * locale it serves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority, changeFrequency }) => {
    const languages = { en: `${SITE}${path}`, hi: `${SITE}${hi(path)}` };
    return [
      { url: `${SITE}${path}`, priority, changeFrequency, alternates: { languages } },
      {
        url: `${SITE}${hi(path)}`,
        priority: priority * 0.9,
        changeFrequency,
        alternates: { languages },
      },
    ];
  });
}
