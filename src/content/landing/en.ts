/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error in eleven places at once, which is the point.

   HOW THIS COPY IS WRITTEN, and it is not how it used to be.

   SELL THE THING, IN THE ACTIVE VOICE. Say what the reader gets and start the
   sentence with the verb that gets it: "Sit with a real river", "Speak your own
   sankalp", "Check every reading". The page once explained itself in the passive
   ("three minutes are spent", "the reading is taken") and it read as a
   brochure describing a product rather than a product asking to be used.

   NO NEGATIVE CONSTRUCTIONS. If a sentence is built on "no", "nobody",
   "nothing" or "there is no", rewrite it until it is built on a noun and a
   verb. "Nobody stands in the water for you" becomes "the practice is yours".
   "There is no quick mode" becomes "the form is the form". This is a rule here,
   not a preference.

   HALF THE WORDS, AND FEWER SECTIONS. The page is a hero, the live card, the
   six waters, the tariff and a colophon. It used to also teach the five limbs,
   the calendar and a three-step how-it-works, all of which /snan does at
   length; a landing page that teaches is a landing page nobody buys from. A
   lede is two or three short sentences, a tier body is one. The reader is half
   awake, on a phone, at six in the morning, and for a great many of them
   English is a second or third language. One idea per sentence, common words,
   full stops over commas.

   PROUD, WARM, AND SELLING. The promise is closeness to home and something to
   send the family: the river you grew up near, your name and theirs on one
   sheet. Nothing here explains what the product is not, and nothing apologises
   for it being digital.

   THE TWO RULES STILL HOLD, and they are what makes the silence possible:
   nothing here claims a rite was performed, and nothing promises an outcome.
   Not claiming is not the same as denying. Where the numbers come from is set
   out on /ethics, in the voice of a maker showing the workshop.

   FIGURES. hero.stats carries the owner's placeholder marketing figures, kept
   at his explicit direction. Each label is written so a reader could go and
   check it:
     · 6            the six waters in rivers.ts
     · 48           two upstream reads an hour against the flood model, per day
     · 1,20,000+    daily river values on the public record since 1997
   THE BADGE AND THE CARD ARE REAL NOW. They were four hardcoded strings under
   a heading reading "The river, now", which is exactly the fabricated reading
   this repo forbids, and it was the first thing anybody read. Both are built
   in src/app/[lang]/page.tsx from the same snapshot /live uses. What is left
   here are labels and templates: a figure never goes in this file again.

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
      "A digital snan. Three minutes with the river you grew up near, your family's names on one keepsake sheet, and your own sankalp in your own words. Six waters live, free to read.",
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
    titleA: "The river",
    titleB: "comes to you.",
    lede: "Three minutes with the river you grew up near, at an hour the panchang names. Your name and your family's on one sheet, and a morning worth sending them.",
    ctaPrimary: "Begin your snan",
    ctaSecondary: "The rivers now",
    offer: "Eleven mornings for {price}. One for each morning.",
    card: {
      badge: "{river} at {city} · {flow} · modelled for {day}",
      cardLabel: "The river, now",
      flow: "Flow",
      ranked: "Ranked",
      modelled: "Modelled for",
      muhurat: "Next muhurat",
      percentile: "{n}th percentile since 1997",
      median: "Seasonal median, 1997 to 2025",
      link: "All six waters, live",
    },
    stats: [
      { n: "6", l: "waters, read daily" },
      { n: "48", l: "reads a day" },
      { n: "1,20,000+", l: "daily values since 1997" },
    ],
  },
  rivers: {
    eyebrow: "Sacred waters",
    title: "Six waters. One sankalp.",
    lede: "Each water keeps its own page, its own days, its own reading this hour.",
  },
  pricing: {
    eyebrow: "The tariff",
    title: "Eleven mornings for eleven.",
    lede: "One for each morning, in your own currency. Everything that is a page stays free, always.",
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
        body: "One morning, whole: the form, a ruled line in your register, one Sankalp Patra.",
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
      body: "A morning with a real river, and a sheet carrying your family's names that anyone can check against the public record.",
    },
    note: "Prices show before local tax.",
    cta: "How it is made",
  },
  notFound: {
    code: "404",
    title: "This path runs dry.",
    lede: "The river sits where it always has. Go back to the water.",
    cta: "Return home",
  },
  closing: {
    title: "Wherever you stand, the water is already there.",
    lede: "Tomorrow morning, the river you are from, and a sheet to send the family group.",
    cta: "Begin your snan",
  },
  bar: {
    label: "Eleven mornings",
    cta: "Begin",
  },
  footer: {
    tagline: "A digital snan for Indians everywhere.",
    cols: [
      { h: "Service", links: ["Begin", "The snan", "The river now", "Sacred waters", "Muhurat calendar"] },
      { h: "Company", links: ["How it is made", "Panchang", "Questions", "Contact"] },
      { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
    ],
    made: "Made with reverence · Prayagraj & Berlin",
    rights: "© 2026 Snanify",
  },
};

/** The shape every other locale in this directory is checked against. */
export type LandingCopy = typeof en;
