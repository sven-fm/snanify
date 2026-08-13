/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error in eleven places at once, which is the point.

   HOW THIS COPY IS WRITTEN, and it is not how it used to be.

   SELL THE THING, IN THE ACTIVE VOICE. Say what the reader gets and start the
   sentence with the verb that gets it: "Sit with a real river", "Speak your own
   sankalp", "Check every reading". The page once explained itself in the passive
   ("four and a half minutes are spent", "the reading is taken") and it read as a
   brochure describing a product rather than a product asking to be used.

   NO NEGATIVE CONSTRUCTIONS. If a sentence is built on "no", "nobody",
   "nothing" or "there is no", rewrite it until it is built on a noun and a
   verb. "Nobody stands in the water for you" becomes "the practice is yours".
   "There is no quick mode" becomes "the form is the form". This is a rule here,
   not a preference.

   HALF THE WORDS. Every field on this page was cut by about half in August
   2026, and the shape is the budget from here on: a lede is two or three short
   sentences, a step or a limb is one or two, a tier body is one. If a sentence
   restates the register or the table directly under it, it goes. The reader is
   half awake, on a phone, at six in the morning, and for a great many of them
   English is a second or third language. One idea per sentence, common words,
   full stops over commas.

   THE TWO RULES STILL HOLD, and they are what makes the silence possible:
   nothing here claims a rite was performed, and nothing promises an outcome.
   Not claiming is not the same as denying. The full commitment, stated at
   length and in the negative where that belongs, lives on /ethics, which is
   linked from every page and named in `pricing.note`.

   FIGURES. hero.badge and hero.stats carry the owner's placeholder marketing
   figures, kept at his explicit direction. Each label is written so a reader
   could go and check it:
     · 6            the six waters in rivers.ts
     · 48           two upstream reads an hour against the flood model, per day
     · 1,20,000+    daily river values on the public record since 1997
   The badge reading is a placeholder shape until the live spine lands. Replace
   it with the real reading; never re-dress it to look fresher.

   PRICES ARE NOT IN THIS FILE. One price, in the reader's own currency, out of
   src/content/prices.ts; see src/lib/currency.ts for how that currency is
   chosen. `{price}` in hero.offer is filled at render.
   --------------------------------------------------------------------------- */

export const en = {
  htmlLang: "en",
  dir: "ltr" as const,
  meta: {
    title: "Snanify, the river comes to you",
    description:
      "A digital snan. Four and a half minutes with a real sacred river, measured this hour, and your own sankalp in your own words. Six waters live, free to read.",
  },
  themeLabel: "Change theme",
  langLabel: "Language",
  nav: {
    how: "How it works",
    rivers: "Sacred waters",
    muhurat: "Muhurat",
    pricing: "Tariff",
    cta: "Begin",
    menu: "Menu",
  },
  edition: "Samvat 2083 · 2026",
  hero: {
    badge: "Ganga at Haridwar · 1,444 m³/s · read 06:00 IST",
    titleA: "The river",
    titleB: "comes to you.",
    lede: "Sit with a real river for four and a half minutes. Speak your own sankalp. Check every reading against the public record.",
    ctaPrimary: "Begin your snan",
    ctaSecondary: "See the form",
    offer: "Eleven mornings for {price}. One for each morning.",
    card: {
      label: "The river, now",
      title: "Ganga, Har Ki Pauri",
      rows: [
        { k: "Flow", v: "1,444 m³/s, her usual run" },
        { k: "Ranked", v: "41st percentile since 1997" },
        { k: "Read", v: "06:00 IST, modelled" },
        { k: "Next muhurat", v: "Brahma Muhurat, 04:24" },
      ],
      link: "All six waters, live",
    },
    stats: [
      { n: "6", l: "waters, read hourly" },
      { n: "48", l: "reads a day" },
      { n: "1,20,000+", l: "daily values since 1997" },
    ],
  },
  rivers: {
    eyebrow: "Sacred waters",
    title: "Six waters. One sankalp.",
    lede: "Each water keeps its own page, its own days, its own reading this hour.",
  },
  how: {
    eyebrow: "How it works",
    title: "Write it once. Come back tomorrow.",
    steps: [
      {
        n: "01",
        t: "Once, at the start",
        d: "Your name, your gotra, and what you came to say. Write it once.",
      },
      {
        n: "02",
        t: "Every morning",
        d: "The river now, six breaths, your words, ninety seconds of dark.",
      },
      {
        n: "03",
        t: "What you keep",
        d: "A ruled line in your register, and a Jal Chihna anyone can check against the record.",
      },
    ],
  },
  form: {
    eyebrow: "The form",
    title: "Four and a half minutes. Five parts.",
    lede: "Two hundred and seventy seconds, one order, every morning. Only the river changes.",
    limbs: [
      {
        clock: "0:04",
        name: "The Reading",
        alt: "जल-पाठ",
        len: "21 seconds",
        d: "Five lines print: the water, its flow, its rank against twenty-nine years, the minute, your distance from it.",
      },
      {
        clock: "0:25",
        name: "The Breath",
        alt: "श्वास",
        len: "60 seconds",
        d: "The waterline rises four seconds, falls six, six times over. Today's flow sets how far it rises.",
      },
      {
        clock: "1:25",
        name: "The Sankalp",
        alt: "संकल्प",
        len: "60 seconds",
        d: "Your words wait on the water. Press and hold: vermillion fills the text over eleven seconds.",
      },
      {
        clock: "2:25",
        name: "The Stillness",
        alt: "मौन",
        len: "90 seconds",
        d: "The screen goes black. Put the phone face down. The river runs on, and the time is yours.",
      },
      {
        clock: "3:55",
        name: "The Mark",
        alt: "चिह्न",
        len: "35 seconds",
        d: "The screen returns dim and writes the morning into your register as one ruled line.",
      },
    ],
    pull: {
      label: "The ninety seconds",
      title: "A minute and a half is a black screen.",
      body: "Ninety seconds run dark, the river playing, the phone face down. This is the part people come back for.",
    },
    note: "The form is the form. Same length, every morning, at the hour the panchang names.",
  },
  muhurat: {
    eyebrow: "The calendar",
    title: "Days the water listens.",
    lede: "Occasions open months ahead. Each timing follows the panchang, printed in IST and in the hours you keep.",
    heads: {
      occasion: "Occasion",
      reckoning: "Reckoning",
      window: "Window",
    },
    note: "Timings print provisional until the panchang confirms them. The calendar stays free.",
  },
  pricing: {
    eyebrow: "The tariff",
    title: "Everything you can read is free. You pay for the morning.",
    lede: "Read everything free, always. You buy the snan. Eleven mornings cost eleven, one for each.",
    free: {
      label: "Free, and it stays free",
      items: [
        {
          name: "The river, now",
          d: "Six waters, the flow at each this hour, ranked against twenty-nine years.",
          href: "/rivers",
        },
        {
          name: "The panchang",
          d: "Tithi, paksha and nakshatra, with today's windows in IST and yours.",
          href: "/panchang",
        },
        {
          name: "Muhurat",
          d: "Every named occasion in the year, each with its own page.",
          href: "/muhurat",
        },
      ],
      note: "Open any of them right now.",
    },
    labels: {
      snans: "Snans",
      each: "Each morning",
      expiry: "Validity",
    },
    tiers: [
      {
        key: "one",
        name: "Ek Dhara",
        alt: "एक धारा",
        sub: "One snan",
        flag: "",
        body: "One dhara. The whole form, one ruled line, one Jal Chihna.",
        snans: "One",
        expiry: "Forever",
      },
      {
        key: "eleven",
        name: "Gyarah",
        alt: "ग्यारह",
        sub: "Eleven snans",
        flag: "The one to take",
        body: "Eleven mornings, bought once. Spend them as the year runs: every amavasya, or eleven days straight.",
        snans: "Eleven",
        expiry: "Forever",
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        alt: "वर्ष कोष",
        sub: "Sixty snans",
        flag: "",
        body: "Sixty mornings, five a month for a year, at our lowest price.",
        snans: "Sixty",
        expiry: "Forever",
      },
    ],
    truth: {
      label: "What you are buying, exactly",
      body: "A digital practice. The river is real, its reading stands on the public record, the words are yours.",
    },
    note: "Prices show before local tax. The ethics page holds the line, in full.",
    cta: "The tariff in full",
  },
  notFound: {
    code: "404",
    title: "This path runs dry.",
    lede: "The river sits where it always has. Go back to the water.",
    cta: "Return home",
  },
  closing: {
    title: "Wherever you stand, the water is already there.",
    lede: "The river is at its own level tonight. Be one of the people watching.",
    cta: "Begin your snan",
  },
  bar: {
    label: "Eleven mornings",
    cta: "Begin",
  },
  footer: {
    tagline: "A digital snan for Indians everywhere.",
    cols: [
      { h: "Service", links: ["Sacred waters", "The river now", "Muhurat calendar", "Jal Chihna"] },
      { h: "Company", links: ["About", "Manifesto", "Press", "Contact"] },
      { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
    ],
    made: "Made with reverence · Prayagraj & Berlin",
    rights: "© 2026 Snanify",
  },
};

/** The shape every other locale in this directory is checked against. */
export type LandingCopy = typeof en;
