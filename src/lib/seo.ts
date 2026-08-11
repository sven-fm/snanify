import type { Metadata } from "next";
import {
  DEFAULT_LANG,
  hreflangMap,
  localeDef,
  localeUrl,
  localesForPath,
  SITE_ORIGIN,
  type Lang,
} from "@/lib/locales";

/* ---------------------------------------------------------------------------
   One page, one metadata block, built the same way everywhere.

   Google's rules for an hreflang cluster, all four of which this enforces
   structurally rather than by remembering:

   1. SELF-REFERENTIAL. The set on a page includes that page. `hreflangMap`
      iterates every locale serving the route, including the current one.
   2. RECIPROCAL. If /ta/rivers points at /rivers, /rivers must point back, or
      Google discards the whole cluster and not just the one row. Because every
      page in the set is generated from the same `localesForPath(path)`, the
      sets are identical by construction and cannot drift.
   3. NO DEAD ALTERNATES. A locale is only listed for routes it actually
      serves. `/panchang` exists in English and Hindi only, so its set has two
      entries and an x-default, while `/rivers` has twelve. An alternate that
      404s invalidates the cluster.
   4. ABSOLUTE URLs. hreflang is ignored when relative. Everything here comes
      out of `localeUrl`, which is absolute by construction.

   X-DEFAULT points at English: it is the fallback for a reader whose language
   is not in the set, and English is the edition in which the whole site exists.

   CANONICALS are self-referential and always in the public URL shape (English
   unprefixed, everything else prefixed), never the internal `/en/...` form that
   src/proxy.ts rewrites to.
   --------------------------------------------------------------------------- */

export type PageMetaArgs = {
  lang: Lang;
  /** The locale-independent route, e.g. "/rivers" or "/muhurat/kartik-purnima". */
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
  /** Set on pages that should be indexed but carry no useful preview image. */
  images?: string[];
};

export function pageMetadata({
  lang,
  path,
  title,
  description,
  ogType = "website",
  images,
}: PageMetaArgs): Metadata {
  const def = localeDef(lang);
  const url = localeUrl(lang, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflangMap(path),
    },
    openGraph: {
      type: ogType,
      url,
      siteName: "Snanify",
      title,
      description,
      locale: def.og,
      alternateLocale: localesForPath(path)
        .filter((code) => code !== lang)
        .map((code) => localeDef(code).og),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/**
 * The bits that belong to the site rather than to a page. Lives on the root
 * layout only; Next merges it down into every route.
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: "Snanify",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  /**
   * Search Console's HTML-tag verification, supplied by the environment so the
   * token is not committed. Set GOOGLE_SITE_VERIFICATION in the Vercel project
   * (Production and Preview) to the value Search Console gives you; leave it
   * unset and the tag is simply absent, which is the correct behaviour on a
   * local build. DNS verification at the registrar is the better method for the
   * apex domain and needs nothing here. See docs/seo/search-console.md.
   */
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/** The English URL for a route, which is what x-default resolves to. */
export const defaultUrl = (path: string) => localeUrl(DEFAULT_LANG, path);
