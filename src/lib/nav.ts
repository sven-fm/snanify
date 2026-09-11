import { localePath, servesPath, type Lang } from "@/lib/locales";

export type NavItem = { href: string; label: string };

/**
 * One source of truth for site navigation. Pages were each hand-building their
 * own header links, which drifts the moment a route is renamed.
 */
const LABELS = {
  rivers: {
    en: "Sacred waters",
    hi: "पवित्र जल",
  },
  snan: {
    en: "The snan",
    hi: "स्नान",
  },
  muhurat: {
    en: "Muhurat",
    hi: "मुहूर्त",
  },
  ethics: {
    en: "How it is made",
    hi: "यह कैसे बनी है",
  },
  faq: {
    en: "Questions",
    hi: "प्रश्न",
  },
  begin: {
    en: "Begin",
    hi: "आरंभ कीजिए",
  },
  account: {
    en: "Your mornings",
    hi: "आपकी सुबहें",
  },
  live: {
    en: "The rivers now",
    hi: "अभी की नदियाँ",
  },
  panchang: {
    en: "Panchang",
    hi: "पंचांग",
  },
} satisfies Record<string, Record<Lang, string>>;

export type NavKey = keyof typeof LABELS;

export function navLabel(lang: Lang, key: NavKey): string {
  return LABELS[key][lang];
}

const PATHS: Record<NavKey, string> = {
  begin: "/begin",
  account: "/account",
  rivers: "/rivers",
  snan: "/snan",
  muhurat: "/muhurat",
  ethics: "/ethics",
  faq: "/faq",
  live: "/live",
  panchang: "/panchang",
};

export function navItem(lang: Lang, key: NavKey): NavItem {
  return { href: localePath(lang, PATHS[key]), label: navLabel(lang, key) };
}

/**
 * The header set, identical on every page so the site reads as one place.
 *
 * Filtered by what the locale actually serves: a Tamil reader is not offered
 * `/snan` and `/ethics`, because those exist in English and Hindi only and a
 * nav link into a 404 is worse than a shorter nav.
 */
export function primaryNav(lang: Lang): NavItem[] {
  return (["snan", "live", "rivers", "muhurat", "ethics"] as NavKey[])
    .filter((k) => servesPath(lang, PATHS[k]))
    .map((k) => navItem(lang, k));
}

/** Where the primary CTA goes, from every page. */
export function ctaHref(lang: Lang): string {
  return localePath(lang, "/begin");
}
