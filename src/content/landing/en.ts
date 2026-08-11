/* ---------------------------------------------------------------------------
   The landing edition, written for the digital product. English is the source
   locale: every other file in this directory is typed against `LandingCopy`
   below, so a key added here without a translation is a compile error in ten
   places at once, which is the point.

   Two rules govern every string in this directory and neither is negotiable:

   1. Nothing here claims that a rite was performed. Nobody stands at a ghat,
      nobody recites a name, nothing is recorded and nothing is proved to have
      happened, because none of it does. Every sentence that used to say
      otherwise has been deleted rather than softened.
   2. Nothing here promises an outcome. No punya, no dosha, no sins washed, no
      tier that works better than a cheaper tier. Prices differ by how many
      snans they carry and by nothing else.

   What is left is small and entirely true: a real river, its measured flow this
   hour, the panchang, a four and a half minute form, and the user's own words.

   FIGURES. hero.badge and hero.stats carry the owner's placeholder marketing
   figures. The figures are kept; the labels were rewritten so that each one is
   a statement the reader could go and check:
     · 6            the six waters in rivers.ts
     · 48           two upstream reads an hour against the flood model, per day
     · 1,20,000+    daily river values on the public record since 1991, six
                    waters, several series each. Stated as a floor, deliberately
   The badge reading itself is a placeholder shape until the live spine lands;
   it must be replaced by the real reading, never re-dressed to look fresher.

   PRICES. Paid only, three lines, both ladders always printed together:
     Ek Dhara    $2  / Rs 101    one snan
     Gyarah      $11 / Rs 501    eleven, exactly a dollar a snan, the hero SKU
     Varsh Kosh  $48 / Rs 2,100  sixty, eighty cents a snan
   The per snan figures in tiers[].rows are arithmetic on those numbers:
   501/11 = 46, 2100/60 = 35, 48/60 = 0.80. Change a price and change those in
   the same commit, in EVERY locale in this directory, or the page starts
   contradicting itself. The dollar and rupee figures are deliberately left as
   digits in all twelve locales: a price is the one string a reader should be
   able to check without reading the language it sits in.
   --------------------------------------------------------------------------- */

export const en = {
  htmlLang: "en",
  dir: "ltr" as const,
  meta: {
    title: "Snanify, the river comes to you",
    description:
      "A digital snan. No priest, no ghat, nothing performed on your behalf by anyone. Four and a half minutes with a sacred river's real measured flow this hour, and your own sankalp in your own words.",
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
    lede: "A digital snan, and nothing more than that. No priest, no ghat, nothing performed for you by anyone. Four and a half minutes with a sacred river's real, measured flow this hour, and your own sankalp, said by you in your own words.",
    ctaPrimary: "Begin a snan",
    ctaSecondary: "What the 4:30 holds",
    offer:
      "One snan is $2, or ₹101. Eleven are $11, or ₹501, which is exactly a dollar a snan. The river's reading, the panchang and all six waters cost nothing and never will.",
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
    lede: "The Ganga at Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain, and the Kaveri where she begins. Each water has its own page, its own occasions and its own reading this hour. Nobody is standing in any of them on your behalf, and none of it costs anything to read.",
  },
  how: {
    eyebrow: "How it works",
    title: "Write it once. Come back tomorrow.",
    steps: [
      {
        n: "01",
        t: "Once, at the start",
        d: "Your name, your gotra if your family keeps one, and the thing you came to say, in your own words. You write it once. You never type it again.",
      },
      {
        n: "02",
        t: "Every morning",
        d: "Four and a half minutes at an hour the panchang names. The river's flow this hour, six breaths at its rhythm, your own words held under your thumb, and ninety seconds of dark.",
      },
      {
        n: "03",
        t: "What you keep",
        d: "One ruled line in your register, and a Jal Chihna: a sheet carrying the water, the minute, and the reading the river was published at. A stranger can check that reading against the public record.",
      },
    ],
  },
  form: {
    eyebrow: "The form",
    title: "Four and a half minutes, five limbs, the same every day.",
    lede: "Two hundred and seventy seconds, in the same five parts, in the same order, at the same lengths, forever. Only the river changes, and it changes on its own.",
    limbs: [
      {
        clock: "0:04",
        name: "The Reading",
        alt: "जल-पाठ",
        len: "21 seconds",
        d: "Five almanac lines print themselves, one every four seconds: the water, its flow this hour, where that sits against thirty-five years of the same week, the minute it was read, and how far you are standing from it. A hairline waterline sits at the river's true level.",
      },
      {
        clock: "0:25",
        name: "The Breath",
        alt: "श्वास",
        len: "60 seconds",
        d: "The waterline rises for four seconds and falls for six, six times over. The words in and out appear on the first two breaths and then never again. How far it rises is set by today's flow, so a full river breathes bigger than a thin one.",
      },
      {
        clock: "1:25",
        name: "The Sankalp",
        alt: "संकल्प",
        len: "60 seconds",
        d: "The water stills and your own words are already there, waiting to be read back. Press and hold, and the text fills with vermillion over eleven seconds. Let go early and the ink drains back. Nothing scolds you. You begin again.",
      },
      {
        clock: "2:25",
        name: "The Stillness",
        alt: "मौन",
        len: "90 seconds",
        d: "The screen goes black. Not dimmed, black. Put the phone down, face down if you like. The river keeps running in your ears, and nothing counts you, measures you or watches whether you moved.",
      },
      {
        clock: "3:55",
        name: "The Mark",
        alt: "चिह्न",
        len: "35 seconds",
        d: "The screen returns at a fifth of its brightness and the morning writes itself into your register as one ruled line. Beneath it, the count of mornings kept, and what the river has done since your first one.",
      },
    ],
    pull: {
      label: "The ninety seconds",
      title: "A minute and a half of it is a black screen.",
      body: "For ninety of the two hundred and seventy seconds, this shows you nothing at all. The screen dims itself out, the river keeps playing, and the phone goes face down on the table. The best part of the product is the part where you are not looking at it. Nobody guesses that from the outside, which is why it is printed here.",
    },
    note: "There is no progress bar anywhere in the form and there is no quick mode. A practice you can set to quick is a preference, not a practice. If you are late, do it anyway; it is four and a half minutes.",
  },
  muhurat: {
    eyebrow: "The calendar",
    title: "Days the water listens.",
    lede: "Occasions open months ahead. Timings follow the panchang, printed in IST and in the hours you actually keep, and every occasion has its own page. All of it is free to read.",
    heads: {
      occasion: "Occasion",
      reckoning: "Reckoning",
      window: "Window",
    },
    note: "Provisional until the panchang confirms them. The calendar is free, has no account behind it, and will stay that way.",
  },
  pricing: {
    eyebrow: "The tariff",
    title: "The content is free. The snan is paid.",
    lede: "Everything you can read here costs nothing and always will: the live state of all six waters, the panchang, every muhurat and every occasion in the year. The snan is the paid thing. Two dollars for one, a dollar each if you take eleven. There is no free snan, and no snan on this page works better than any other one.",
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
      note: "No account, no card, no trial that runs out.",
    },
    heads: { world: "Vishwa Dar", india: "Bharat Dar" },
    tiers: [
      {
        name: "Ek Dhara",
        alt: "एक धारा",
        sub: "One snan",
        flag: "",
        world: "$2",
        india: "₹101",
        body: "One dhara: the full four and a half minutes, one ruled line in your register, and the Jal Chihna that comes out of it. Take this if you came for a single morning and want to see what this actually is.",
        rows: [
          { k: "Snans", v: "One" },
          { k: "Each snan", v: "$2 · ₹101" },
          { k: "Expiry", v: "None" },
        ],
      },
      {
        name: "Gyarah",
        alt: "ग्यारह",
        sub: "Eleven snans",
        flag: "The one to take",
        world: "$11",
        india: "₹501",
        body: "Eleven snans, bought once, at exactly one dollar each. Spend them the way a year actually runs: one on every amavasya, eleven mornings in a row, or the eleven occasions that matter in your family. They do not expire and nothing renews.",
        rows: [
          { k: "Snans", v: "Eleven" },
          { k: "Each snan", v: "$1 · ₹46" },
          { k: "Expiry", v: "None" },
        ],
      },
      {
        name: "Varsh Kosh",
        alt: "वर्ष कोष",
        sub: "Sixty snans",
        flag: "",
        world: "$48",
        india: "₹2,100",
        body: "Sixty snans, which is five mornings a month for a year, at eighty cents each. This is as low as the price goes. It is a store of snans and not a subscription: nothing renews, and you are never charged a second time.",
        rows: [
          { k: "Snans", v: "Sixty" },
          { k: "Each snan", v: "$0.80 · ₹35" },
          { k: "Expiry", v: "None" },
        ],
      },
    ],
    ladders: {
      label: "Why two prices are printed",
      body: [
        "The morning costs the same to serve whether you are in Ujjain or in New Jersey. The price is not the cost. Five hundred rupees is a considered amount in one place and lunch in the other, and a single number would shut one of them out.",
        "So both ladders are printed above, in full, on the same page. Which one you are charged is decided by the instrument you pay with: an Indian card or a UPI address pays the rupee price, wherever in the world you are standing that morning. We do not read your location, we do not infer it from your name, and the price you were shown before you entered any payment detail is the price you are charged. There is no third price, no code to ask for, and nothing to negotiate.",
      ],
    },
    truth: {
      label: "What you are buying, exactly",
      body: "A digital practice. No priest. No ghat. Nothing performed anywhere, by anyone, on your behalf. The river is real, its reading is real, the words are yours. That is the whole product, and it is enough.",
    },
    note: "Prices are shown before any tax charged where you live. No snan here promises an outcome, and no amount of money buys a better one.",
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
    lede: "The river is at its own level tonight, whether anyone is watching or not. You can be one of the people watching.",
    cta: "Begin a snan",
  },
  bar: {
    label: "Eleven snans",
    price: "$11 · ₹501",
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
