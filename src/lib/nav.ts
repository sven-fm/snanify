import { localePath, type Lang } from "@/lib/i18n";

export type NavItem = { href: string; label: string };

/**
 * One source of truth for site navigation. Pages were each hand-building their
 * own header links, which drifts the moment a route is renamed.
 */
const LABELS = {
  rivers: { en: "Sacred waters", hi: "पवित्र जल" },
  rituals: { en: "The catalog", hi: "सेवा सूची" },
  muhurat: { en: "Muhurat", hi: "मुहूर्त" },
  patra: { en: "Sankalp Patra", hi: "संकल्प पत्र" },
  how: { en: "How it works", hi: "कैसे काम करता है" },
  ethics: { en: "Ethics & rites", hi: "नीति एवं विधि" },
  faq: { en: "Questions", hi: "प्रश्न" },
  refusals: { en: "What we do not sell", hi: "जो हम नहीं बेचते" },
  verify: { en: "Verify a Patra", hi: "पत्र सत्यापित करें" },
} as const;

export type NavKey = keyof typeof LABELS;

export function navLabel(lang: Lang, key: NavKey): string {
  return LABELS[key][lang];
}

const PATHS: Record<NavKey, string> = {
  rivers: "/rivers",
  rituals: "/rituals",
  muhurat: "/muhurat",
  patra: "/patra",
  how: "/how-it-works",
  ethics: "/ethics",
  faq: "/faq",
  refusals: "/rituals#refusals",
  verify: "/verify",
};

export function navItem(lang: Lang, key: NavKey): NavItem {
  return { href: localePath(lang, PATHS[key]), label: navLabel(lang, key) };
}

/** The header set, identical on every page so the site reads as one place. */
export function primaryNav(lang: Lang): NavItem[] {
  return (["rivers", "rituals", "muhurat", "how", "ethics"] as NavKey[]).map((k) =>
    navItem(lang, k),
  );
}

/**
 * Where the primary CTA goes. Until /begin exists this is the landing page's
 * pricing anchor, built absolutely so it resolves from any route rather than
 * scrolling nowhere.
 */
export function ctaHref(lang: Lang): string {
  return `${localePath(lang, "/")}#sankalp`.replace("//#", "/#");
}
