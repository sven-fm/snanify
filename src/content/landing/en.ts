/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error in eleven places at once, which is the point.

   HOW THIS COPY IS WRITTEN, and it is not how it used to be.

   SELL THE THING. Say what the product IS. This page used to be built out of
   denials ("no priest, no ghat, nothing performed for you by anyone", "there is
   no free snan", "no snan works better than any other one") and it read as an
   argument with a critic who was not in the room. A sales page does not defend
   itself. It states, plainly and with some force, what the reader gets.

   NO NEGATIVE CONSTRUCTIONS. If a sentence is built on "no", "nobody",
   "nothing" or "there is no", rewrite it until it is built on a noun and a
   verb. "Nobody stands in the water for you" becomes "the practice is yours".
   "There is no quick mode" becomes "the form is the form". This is a rule here,
   not a preference.

   SHORT WORDS, SHORT SENTENCES. This is read at six in the morning, on a phone,
   by someone half awake, and by a great many readers for whom English is a
   second or third language. Prefer the common word. Break the long sentence.

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
     · 1,20,000+    daily river values on the public record since 1991
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
      "A digital snan. Four and a half minutes with a real sacred river, measured this hour, and your own sankalp in your own words. The six waters, the panchang and every occasion in the year are free to read.",
  },
  themeLabel: "Change theme",
  langLabel: "Language",
  nav: {
    how: "How it works",
    rivers: "Sacred waters",
    muhurat: "Muhurat",
    pricing: "Tariff",
    cta: "Begin a snan",
    menu: "Menu",
  },
  edition: "Samvat 2083 · 2026",
  hero: {
    badge: "Ganga at Haridwar · 1,444 m³/s · read 06:00 IST",
    titleA: "The river",
    titleB: "comes to you.",
    lede: "Four and a half minutes each morning with a real river, measured this hour. You say your own sankalp, in your own words. Every reading comes off India's public river record, so you can check it yourself.",
    ctaPrimary: "Begin a snan",
    ctaSecondary: "See the four and a half minutes",
    offer:
      "Eleven mornings for {price}, one for each morning. The six waters, the panchang and every occasion in the year are free to read, always.",
    card: {
      label: "The river, now",
      title: "Ganga, Har Ki Pauri",
      rows: [
        { k: "Flow", v: "1,444 m³/s, running as she usually runs" },
        { k: "Ranked", v: "41st percentile against this week since 1991" },
        { k: "Read", v: "06:00 IST, modelled discharge" },
        { k: "Next muhurat", v: "Brahma Muhurat, 04:24 IST" },
      ],
      link: "All six waters, live",
    },
    stats: [
      { n: "6", l: "waters, read every hour" },
      { n: "48", l: "reads a day from the flood model" },
      { n: "1,20,000+", l: "daily river values on record since 1991" },
    ],
  },
  rivers: {
    eyebrow: "Sacred waters",
    title: "Six waters. One sankalp.",
    lede: "The Ganga at Haridwar. The Sangam at Prayagraj. The Yamuna at Mathura. The Godavari at Nashik. The Shipra at Ujjain. The Kaveri at her source. Each one has its own page, its own days and its own reading this hour, free to read.",
  },
  how: {
    eyebrow: "How it works",
    title: "Write it once. Come back tomorrow.",
    steps: [
      {
        n: "01",
        t: "Once, at the start",
        d: "Your name, your gotra if your family keeps one, and what you came to say, in your own words. You write it once and never type it again.",
      },
      {
        n: "02",
        t: "Every morning",
        d: "Four and a half minutes at the hour the panchang names. The river's flow now, six breaths at its rhythm, your words under your thumb, and ninety seconds of dark.",
      },
      {
        n: "03",
        t: "What you keep",
        d: "One line in your register, and a Jal Chihna: a sheet carrying the water, the minute, and the reading the river was published at. Anyone can check that reading against the public record.",
      },
    ],
  },
  form: {
    eyebrow: "The form",
    title: "Four and a half minutes. Five parts. The same every day.",
    lede: "Two hundred and seventy seconds, in five parts, in the same order, every morning. Only the river changes, and it changes on its own.",
    limbs: [
      {
        clock: "0:04",
        name: "The Reading",
        alt: "जल-पाठ",
        len: "21 seconds",
        d: "Five lines print themselves, one every four seconds: the water, its flow this hour, where that sits against thirty-five years of the same week, the minute it was read, and how far you are standing from it. A hairline waterline holds at the river's true level.",
      },
      {
        clock: "0:25",
        name: "The Breath",
        alt: "श्वास",
        len: "60 seconds",
        d: "The waterline rises for four seconds and falls for six, six times over. Today's flow sets how far it rises, so a full river breathes bigger than a thin one.",
      },
      {
        clock: "1:25",
        name: "The Sankalp",
        alt: "संकल्प",
        len: "60 seconds",
        d: "The water stills and your own words are already there, waiting to be read back. Press and hold, and the text fills with vermillion over eleven seconds. Let go early and the ink drains back, and you begin again.",
      },
      {
        clock: "2:25",
        name: "The Stillness",
        alt: "मौन",
        len: "90 seconds",
        d: "The screen goes black. Put the phone down, face down if you like. The river keeps running in your ears for a minute and a half, and the time is yours.",
      },
      {
        clock: "3:55",
        name: "The Mark",
        alt: "चिह्न",
        len: "35 seconds",
        d: "The screen returns at a fifth of its brightness and the morning writes itself into your register as one ruled line. Under it, the count of mornings you have kept, and what the river has done since your first one.",
      },
    ],
    pull: {
      label: "The ninety seconds",
      title: "A minute and a half of it is a black screen.",
      body: "For ninety of the two hundred and seventy seconds the screen goes dark, the river keeps playing, and the phone lies face down on the table. This is the part people come back for, and it is why the whole thing is four and a half minutes rather than forty.",
    },
    note: "The form is the form: the same length every morning, at the hour the panchang names. Come late if you come late. It is four and a half minutes.",
  },
  muhurat: {
    eyebrow: "The calendar",
    title: "Days the water listens.",
    lede: "Occasions open months ahead. Every timing follows the panchang and prints twice, in IST and in the hours you actually keep. Every occasion has its own page, free to read.",
    heads: {
      occasion: "Occasion",
      reckoning: "Reckoning",
      window: "Window",
    },
    note: "Timings are provisional until the panchang confirms them. The calendar is free and stays free.",
  },
  pricing: {
    eyebrow: "The tariff",
    title: "Everything you can read is free. You pay for the morning.",
    lede: "The live state of all six waters, the panchang and every occasion in the year cost nothing, and always will. What you buy is the snan itself. Eleven mornings cost eleven, one for each morning, and that is the line most people take.",
    free: {
      label: "Free, and it stays free",
      items: [
        {
          name: "The river, now",
          d: "All six waters, the flow at each this hour, and where that sits against thirty-five years of the same week.",
          href: "/rivers",
        },
        {
          name: "The panchang",
          d: "Tithi, paksha and nakshatra, with the day's windows in IST and in your own hours.",
          href: "/panchang",
        },
        {
          name: "Muhurat",
          d: "Every named occasion in the year, each with its own page and its own reckoning.",
          href: "/muhurat",
        },
      ],
      note: "Open any of them right now.",
    },
    labels: {
      snans: "Snans",
      each: "Each morning",
      expiry: "Expiry",
    },
    tiers: [
      {
        key: "one",
        name: "Ek Dhara",
        alt: "एक धारा",
        sub: "One snan",
        flag: "",
        body: "One dhara. The full four and a half minutes, one ruled line in your register, and the Jal Chihna that comes out of it. Take this to see what the morning actually is.",
        snans: "One",
        expiry: "None",
      },
      {
        key: "eleven",
        name: "Gyarah",
        alt: "ग्यारह",
        sub: "Eleven snans",
        flag: "The one to take",
        body: "Eleven mornings, bought once, one for each morning. Spend them the way a year runs: one on every amavasya, eleven mornings in a row, or the eleven days your family keeps. They wait until you use them.",
        snans: "Eleven",
        expiry: "None",
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        alt: "वर्ष कोष",
        sub: "Sixty snans",
        flag: "",
        body: "Sixty mornings, five a month for a year, at the lowest price we set. A store of mornings you draw down as the year goes.",
        snans: "Sixty",
        expiry: "None",
      },
    ],
    truth: {
      label: "What you are buying, exactly",
      body: "A digital practice. The river is real, its reading is on the public record, and the words are yours. Four and a half minutes that belong to you, every morning you choose to keep.",
    },
    note: "Prices are shown before any tax charged where you live. Where we hold the line on what this is, and what it is not, is set out in full on the ethics page.",
    cta: "The tariff in full",
  },
  notFound: {
    code: "404",
    title: "This path does not reach the water.",
    lede: "The page you were looking for is not here. The river, however, is exactly where it has always been.",
    cta: "Return home",
  },
  closing: {
    title: "Wherever you stand, the water is already there.",
    lede: "The river is at its own level tonight, whether anyone is watching or not. Be one of the people watching.",
    cta: "Begin a snan",
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
