import type { MetadataRoute } from "next";

const SITE = "https://www.snanify.com";

/** Every route is listed in both locales with reciprocal hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [{ path: "/", priority: 1 }];

  return routes.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    changeFrequency: "weekly" as const,
    priority,
    alternates: {
      languages: {
        en: `${SITE}${path}`,
        hi: `${SITE}${path === "/" ? "/hi" : `/hi${path}`}`,
      },
    },
  }));
}
