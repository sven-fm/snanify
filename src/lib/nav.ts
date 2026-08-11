import { localePath, servesPath, type Lang } from "@/lib/locales";

export type NavItem = { href: string; label: string };

/**
 * One source of truth for site navigation. Pages were each hand-building their
 * own header links, which drifts the moment a route is renamed.
 *
 * Every label exists in every locale even though the full-depth routes are only
 * reachable in English and Hindi: the footer and the sitemap both read from
 * here, and a label that exists is cheaper than a lookup that can return
 * undefined.
 */
const LABELS = {
  rivers: {
    en: "Sacred waters",
    hi: "पवित्र जल",
    bn: "পবিত্র জল",
    mr: "पवित्र जले",
    te: "పవిత్ర జలాలు",
    ta: "புனித நீர்நிலைகள்",
    gu: "પવિત્ર જળ",
    kn: "ಪವಿತ್ರ ಜಲಗಳು",
    ml: "പുണ്യജലങ്ങൾ",
    or: "ପବିତ୍ର ଜଳ",
    pa: "ਪਵਿੱਤਰ ਜਲ",
    as: "পৱিত্ৰ জল",
  },
  snan: {
    en: "The snan",
    hi: "स्नान",
    bn: "স্নান",
    mr: "स्नान",
    te: "స్నానం",
    ta: "ஸ்நானம்",
    gu: "સ્નાન",
    kn: "ಸ್ನಾನ",
    ml: "സ്നാനം",
    or: "ସ୍ନାନ",
    pa: "ਇਸ਼ਨਾਨ",
    as: "স্নান",
  },
  muhurat: {
    en: "Muhurat",
    hi: "मुहूर्त",
    bn: "মুহূর্ত",
    mr: "मुहूर्त",
    te: "ముహూర్తం",
    ta: "முகூர்த்தம்",
    gu: "મુહૂર્ત",
    kn: "ಮುಹೂರ್ತ",
    ml: "മുഹൂർത്തം",
    or: "ମୁହୂର୍ତ୍ତ",
    pa: "ਮੁਹੂਰਤ",
    as: "মুহূৰ্ত",
  },
  patra: {
    en: "Sankalp Patra",
    hi: "संकल्प पत्र",
    bn: "সংকল্প পত্র",
    mr: "संकल्प पत्र",
    te: "సంకల్ప పత్రం",
    ta: "சங்கல்ப பத்திரம்",
    gu: "સંકલ્પ પત્ર",
    kn: "ಸಂಕಲ್ಪ ಪತ್ರ",
    ml: "സങ്കൽപ പത്രം",
    or: "ସଙ୍କଳ୍ପ ପତ୍ର",
    pa: "ਸੰਕਲਪ ਪੱਤਰ",
    as: "সংকল্প পত্ৰ",
  },
  how: {
    en: "How it works",
    hi: "कैसे काम करता है",
    bn: "কীভাবে কাজ করে",
    mr: "कसे चालते",
    te: "ఎలా పనిచేస్తుంది",
    ta: "எப்படி இயங்குகிறது",
    gu: "કેવી રીતે ચાલે છે",
    kn: "ಹೇಗೆ ನಡೆಯುತ್ತದೆ",
    ml: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    or: "କିପରି ଚାଲେ",
    pa: "ਕਿਵੇਂ ਚੱਲਦਾ ਹੈ",
    as: "কেনেকৈ চলে",
  },
  ethics: {
    en: "Ethics & rites",
    hi: "नीति एवं विधि",
    bn: "নীতি ও বিধি",
    mr: "नीती व विधी",
    te: "నీతి, విధి",
    ta: "நெறியும் விதியும்",
    gu: "નીતિ અને વિધિ",
    kn: "ನೀತಿ ಮತ್ತು ವಿಧಿ",
    ml: "നീതിയും വിധിയും",
    or: "ନୀତି ଓ ବିଧି",
    pa: "ਨੀਤੀ ਤੇ ਵਿਧੀ",
    as: "নীতি আৰু বিধি",
  },
  faq: {
    en: "Questions",
    hi: "प्रश्न",
    bn: "প্রশ্ন",
    mr: "प्रश्न",
    te: "ప్రశ్నలు",
    ta: "கேள்விகள்",
    gu: "પ્રશ્નો",
    kn: "ಪ್ರಶ್ನೆಗಳು",
    ml: "ചോദ്യങ്ങൾ",
    or: "ପ୍ରଶ୍ନ",
    pa: "ਸਵਾਲ",
    as: "প্ৰশ্ন",
  },
  live: {
    en: "The rivers now",
    hi: "अभी की नदियाँ",
    bn: "এখনকার নদী",
    mr: "आताच्या नद्या",
    te: "ఇప్పటి నదులు",
    ta: "இப்போதைய நதிகள்",
    gu: "અત્યારની નદીઓ",
    kn: "ಈಗಿನ ನದಿಗಳು",
    ml: "ഇപ്പോഴത്തെ നദികൾ",
    or: "ବର୍ତ୍ତମାନର ନଦୀ",
    pa: "ਹੁਣ ਦੇ ਦਰਿਆ",
    as: "এতিয়াৰ নদী",
  },
  panchang: {
    en: "Panchang",
    hi: "पंचांग",
    bn: "পঞ্চাঙ্গ",
    mr: "पंचांग",
    te: "పంచాంగం",
    ta: "பஞ்சாங்கம்",
    gu: "પંચાંગ",
    kn: "ಪಂಚಾಂಗ",
    ml: "പഞ്ചാംഗം",
    or: "ପଞ୍ଜିକା",
    pa: "ਪੰਚਾਂਗ",
    as: "পঞ্চাঙ্গ",
  },
  verify: {
    en: "Verify a Patra",
    hi: "पत्र सत्यापित करें",
    bn: "পত্র যাচাই করুন",
    mr: "पत्र पडताळा",
    te: "పత్రం సరిచూడండి",
    ta: "பத்திரம் சரிபார்",
    gu: "પત્ર ચકાસો",
    kn: "ಪತ್ರ ಪರಿಶೀಲಿಸಿ",
    ml: "പത്രം പരിശോധിക്കുക",
    or: "ପତ୍ର ଯାଞ୍ଚ କରନ୍ତୁ",
    pa: "ਪੱਤਰ ਪਰਖੋ",
    as: "পত্ৰ পৰীক্ষা কৰক",
  },
} satisfies Record<string, Record<Lang, string>>;

export type NavKey = keyof typeof LABELS;

export function navLabel(lang: Lang, key: NavKey): string {
  return LABELS[key][lang];
}

const PATHS: Record<NavKey, string> = {
  rivers: "/rivers",
  snan: "/snan",
  muhurat: "/muhurat",
  patra: "/patra",
  how: "/how-it-works",
  ethics: "/ethics",
  faq: "/faq",
  live: "/live",
  panchang: "/panchang",
  verify: "/verify",
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

/**
 * Where the primary CTA goes. Until /begin exists this is the landing page's
 * pricing anchor, built absolutely so it resolves from any route rather than
 * scrolling nowhere.
 */
export function ctaHref(lang: Lang): string {
  return `${localePath(lang, "/")}#sankalp`.replace("//#", "/#");
}
