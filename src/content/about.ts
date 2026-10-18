import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /about, the two people behind Snanify.

   The question this page answers is the one a buyer asks before typing in a
   card number: who made this? Rules it is written under:

   1. FACTS FROM THE PUBLIC RECORD ONLY. Every line of a bio is on sven.fm or
      hiten.eu. No biography, belief, upbringing or practice is added here.
   2. FIRST PERSON. "We" for the why, "I" for each bio, so neither founder is
      ever named by a pronoun.
   3. BUILDERS. The tradition belongs to its teachers and to the families who
      keep it; the page says what we made and how, and stops there.

   A portrait is optional: set `portrait` to a path under /public and the
   square plate appears above that founder's name. Both are unset today.
   --------------------------------------------------------------------------- */

export const ABOUT_ROUTE = "/about";

export type FounderId = "sven" | "hiten";

export type FounderLink = {
  readonly label: string;
  readonly href: string;
};

export type Founder = {
  readonly id: FounderId;
  readonly name: string;
  readonly role: string;
  /** Four or five short sentences, first person, facts first. */
  readonly bio: readonly string[];
  readonly links: readonly FounderLink[];
};

/**
 * The facts that hold in every edition: the Latin name, the job title, the
 * profiles that are theirs, and the portrait slot. `sameAs` in the structured
 * data reads `profiles`, and every profile is also a visible link on the page.
 */
export const FOUNDERS: Record<
  FounderId,
  {
    readonly name: string;
    readonly jobTitle: string;
    readonly city: string;
    readonly profiles: readonly string[];
    /** A square photograph under /public, e.g. "/about/sven.jpg". Unset until one exists. */
    readonly portrait?: string;
  }
> = {
  sven: {
    name: "Sven Ahrens",
    jobTitle: "Co-founder",
    city: "Berlin",
    profiles: ["https://sven.fm", "https://www.linkedin.com/in/svenahrens"],
  },
  hiten: {
    name: "Hiten Sangani",
    jobTitle: "Co-founder",
    city: "Berlin",
    profiles: ["https://hiten.eu", "https://www.linkedin.com/in/hiten-sangani"],
  },
};

const SVEN_LINKS: readonly FounderLink[] = [
  { label: "sven.fm", href: "https://sven.fm" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/svenahrens" },
];

const HITEN_LINKS: readonly FounderLink[] = [
  { label: "hiten.eu", href: "https://hiten.eu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hiten-sangani" },
];

type Copy = {
  readonly meta: { readonly title: string; readonly description: string };
  readonly title: string;
  readonly lede: string;
  /** The capitals headline: `{accent}` is set in sindoor. */
  readonly head: { readonly title: string; readonly accent: string };
  readonly why: { readonly title: string; readonly body: readonly string[] };
  readonly founders: {
    readonly title: string;
    readonly people: readonly Founder[];
  };
  readonly write: {
    readonly title: string;
    readonly body: string;
    readonly mailLabel: string;
  };
  readonly closing: {
    readonly title: string;
    readonly body: string;
    readonly cta: string;
  };
  /** The breadcrumb's last step and the footer link. */
  readonly crumb: string;
};

const en: Copy = {
  meta: {
    title: "Who we are: the two founders of Snanify",
    description:
      "Snanify is made in Berlin by Sven Ahrens and Hiten Sangani. Who we are, why we built a daily snan with India's sacred rivers, and how to write to us.",
  },
  title: "Who we are",
  lede: "Two people in Berlin, Sven Ahrens and Hiten Sangani, make Snanify for the river you grew up near.",
  head: { title: "Made for your {accent}.", accent: "river" },
  why: {
    title: "Why we made this",
    body: [
      "We admire Hinduism and its living traditions. The daily bath in a sacred river is one of the oldest of them.",
      "Many families now live far from their river: in New Jersey, in Leicester, in Dubai, in Sydney. We wanted the practice to reach them, in English and in Hindi, wherever they live.",
      "So we built it with care. The six waters are real places. Each morning shows the river's figure as published for that day. The panchang is computed for each ghat and checked against Drik Panchang.",
      "We are builders. The tradition belongs to its teachers and to the families who keep it. The sankalp is yours, in your own words. Our part is the craft: three clear, quiet minutes each morning.",
    ],
  },
  founders: {
    title: "The two of us",
    people: [
      {
        id: "sven",
        name: "Sven Ahrens",
        role: "Co-founder, Berlin",
        bio: [
          "I led Global Growth at Spotify from 2016 to 2024.",
          "Our team is credited with more than 60% of Spotify's subscriber growth.",
          "Then I was Chief Growth Officer at Muse Group, and from 2025 to 2026 CEO of Yousician.",
          "Its two apps, Yousician and GuitarTuna, have more than 20 million users a month.",
          "I began as a consultant at Bain & Company, and I invest in young companies through Newconic Ventures.",
        ],
        links: SVEN_LINKS,
      },
      {
        id: "hiten",
        name: "Hiten Sangani",
        role: "Co-founder, Berlin",
        bio: [
          "I am Senior AI & Search Manager at Yousician in Berlin.",
          "For more than ten years I have turned search into revenue.",
          "Before Yousician I was Head of Growth (SEO) at Upfluence in Lyon.",
          "In India I worked in SEO at Botpresso, F6S, NewsBytes, Infidigit, Tonic Worldwide and others.",
          "I started as an engineer at TCS and Tech Mahindra in Mumbai, and I hold an MSc in Information Technology from the University of Mumbai.",
        ],
        links: HITEN_LINKS,
      },
    ],
  },
  write: {
    title: "Write to us",
    body: "Ask us about the rivers, the panchang or your mornings. This address reaches us both.",
    mailLabel: "Write to us",
  },
  closing: {
    title: "Begin tomorrow morning.",
    body: "Choose your river tonight. Sit with it tomorrow, before the day starts.",
    cta: "Begin your snan",
  },
  crumb: "Who we are",
};

const hi: Copy = {
  meta: {
    title: "हम कौन हैं: Snanify के दो संस्थापक",
    description:
      "Snanify बर्लिन में स्वेन आरेन्स और हितेन संगानी बनाते हैं। हम कौन हैं, भारत की पवित्र नदियों के साथ रोज़ का स्नान हमने क्यों बनाया, और हमें कैसे लिखें।",
  },
  title: "हम कौन हैं",
  lede: "बर्लिन में रहने वाले दो लोग, स्वेन आरेन्स और हितेन संगानी, Snanify उस नदी के लिए बनाते हैं जिसके पास आप बड़े हुए।",
  head: { title: "आपकी {accent} के लिए बनाया", accent: "नदी" },
  why: {
    title: "हमने यह क्यों बनाया",
    body: [
      "हम हिंदू धर्म और उसकी जीवित परंपराओं का आदर करते हैं। पवित्र नदी में रोज़ का स्नान उनमें सबसे पुरानी परंपराओं में से एक है।",
      "आज बहुत-से परिवार अपनी नदी से दूर रहते हैं: न्यू जर्सी में, लेस्टर में, दुबई में, सिडनी में। हम चाहते थे कि यह साधना उन तक पहुँचे, अंग्रेज़ी और हिंदी में, वे जहाँ भी रहें।",
      "इसलिए हमने इसे सावधानी से बनाया। छह जल असली स्थान हैं। हर सुबह नदी का उस दिन का प्रकाशित आँकड़ा दिखता है। पंचांग हर घाट के लिए गणना करके निकाला जाता है और दृक पंचांग से मिलाया गया है।",
      "हम बनाने वाले हैं। परंपरा उसके आचार्यों की है, और उन परिवारों की जो उसे निभाते हैं। संकल्प आपका है, आपके अपने शब्दों में। हमारा हिस्सा शिल्प है: हर सुबह तीन साफ़, शांत मिनट।",
    ],
  },
  founders: {
    title: "हम दोनों",
    people: [
      {
        id: "sven",
        name: "स्वेन आरेन्स",
        role: "सह-संस्थापक, बर्लिन",
        bio: [
          "मैंने 2016 से 2024 तक Spotify में Global Growth का नेतृत्व किया।",
          "हमारी टीम को Spotify की 60% से अधिक सब्सक्राइबर वृद्धि का श्रेय दिया जाता है।",
          "फिर मैं Muse Group में Chief Growth Officer रहा, और 2025 से 2026 तक Yousician का CEO।",
          "उसके दो ऐप, Yousician और GuitarTuna, हर महीने 2 करोड़ से अधिक लोग इस्तेमाल करते हैं।",
          "मैंने शुरुआत Bain & Company में सलाहकार के रूप में की, और Newconic Ventures के ज़रिए नई कंपनियों में निवेश करता हूँ।",
        ],
        links: SVEN_LINKS,
      },
      {
        id: "hiten",
        name: "हितेन संगानी",
        role: "सह-संस्थापक, बर्लिन",
        bio: [
          "मैं बर्लिन में Yousician में Senior AI & Search Manager हूँ।",
          "दस साल से अधिक समय से मैं सर्च को राजस्व में बदलता आया हूँ।",
          "Yousician से पहले मैं ल्योन में Upfluence में Head of Growth (SEO) था।",
          "भारत में मैंने Botpresso, F6S, NewsBytes, Infidigit, Tonic Worldwide और दूसरी कंपनियों में SEO का काम किया।",
          "मैंने मुंबई में TCS और Tech Mahindra में इंजीनियर के रूप में शुरुआत की, और मुंबई विश्वविद्यालय से सूचना प्रौद्योगिकी में MSc किया है।",
        ],
        links: HITEN_LINKS,
      },
    ],
  },
  write: {
    title: "हमें लिखिए",
    body: "नदियों, पंचांग या अपनी सुबहों के बारे में हमसे पूछिए। यह पता हम दोनों तक पहुँचता है।",
    mailLabel: "हमें लिखिए",
  },
  closing: {
    title: "कल सुबह शुरू कीजिए।",
    body: "आज रात अपनी नदी चुनिए। कल, दिन शुरू होने से पहले, उसके साथ बैठिए।",
    cta: "अपना स्नान शुरू कीजिए",
  },
  crumb: "हम कौन हैं",
};

export const aboutContent = { en, hi } satisfies Record<Lang, Copy>;
