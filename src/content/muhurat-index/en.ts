/* ---------------------------------------------------------------------------
   The muhurat calendar, /muhurat, in twelve locales.

   English is the source edition and defines `MuhuratIndexCopy`; every other
   file in this directory closes with `satisfies MuhuratIndexCopy`, so a key
   added here without its eleven translations is a compile error in eleven
   places.

   WHAT LIVES HERE AND WHAT DOES NOT. These are the keys the index page uses,
   plus the few the detail page shares with it (meta, nav, cta, provenance,
   tiers, windows, anchors). The detail-only copy stayed in muhurat.ts, in
   English and Hindi, because /muhurat/<occasion> is a full-depth route. A
   `Record<Lang, ...>` indexes perfectly well with a `FullLang`, so the detail
   page reads the shared keys from here and nothing is written twice.

   THE PROVENANCE COPY IS LOAD BEARING. Every locale says, in its own words,
   that the timings are provisional until a panchang is named. /ethics commits
   to that publicly, so no edition is allowed to sound more certain than the
   English one. The August 2026 cut halved this page's prose and left that
   disclosure standing: `provenance.line` is shorter and no longer opens on "No
   panchang provider is wired yet", but it still says provisional, still says
   labelled wherever it appears, and still names the condition under which the
   labels change.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    indexTitle: "Muhurat calendar, Snanify",
    indexDescription:
      "The occasions Snanify keeps, the daily windows they are held in, and how precisely we know when each one falls.",
    detailSuffix: "Muhurat calendar · Snanify",
  },
  nav: { back: "All occasions" },
  hero: {
    eyebrow: "The calendar",
    title: "When the water is kept.",
    lede: "Twelve months of occasions, the daily windows they are held in, and how much we know about when each one falls.",
    asOf: "Looking forward from 10 August 2026",
  },
  provenance: {
    badge: "Provisional · to be confirmed against the panchang",
    badgeShort: "Provisional",
    heading: "Where these timings come from",
    line: "Every date and every window on this page is provisional, and is labelled so wherever it appears. When a provider is named and a sample of days is checked here against a reference almanac, the labels change and this sentence changes with them.",
    sourceLabel: "Provider",
    ayanamsaLabel: "Ayanamsa",
    coordinatesLabel: "Ghat coordinates",
    coordinatesPending: "Pending on-site survey",
    notSet: "Not yet fixed",
  },
  reading: {
    eyebrow: "How to read this",
    title: "Three things we do differently.",
    items: [
      {
        n: "01",
        t: "Months, not dates",
        d: "Where an exact date is undefendable we print the month and the tithi rule instead. The rule is a definition, and therefore a fact. A confident wrong date is worse than an honest imprecise one.",
      },
      {
        n: "02",
        t: "Both clocks, always",
        d: "Times are given at the ghat first, and beside them in your own zone with the date shift written out. Every conversion prints rather than being left to you.",
      },
      {
        n: "03",
        t: "Sunrise to sunrise",
        d: "The Hindu day turns at sunrise. A window at 4:24 in the morning belongs to the panchang day that opened the previous dawn, which is the common case for our earliest window.",
      },
    ],
  },
  rhythm: {
    eyebrow: "Every month",
    title: "The rhythm underneath.",
    lede: "Four occasions recur on their own schedule and run through every month below, named or not.",
  },
  spine: {
    eyebrow: "The twelve months ahead",
    title: "Occasion by month.",
    empty: "No dated occasion. The monthly rhythm runs as it always does.",
    observedAt: "Kept at",
    waters: (n: number) => (n === 1 ? "1 water" : `${n} waters`),
  },
  windows: {
    eyebrow: "The daily windows",
    title: "Four hours of the day.",
    lede: "These are rules rather than clock times. Each is defined by its distance from sunrise, from the sun's transit, or from sunset, so it holds on every day of the year and at every latitude.",
    formulaLabel: "Definition",
    lengthLabel: "Length",
    basisLabel: "Why this hour",
    minutes: (n: number) => `${n} minutes`,
    diagramLabel: "A day, with the four windows marked in their order",
    diagram: { sunrise: "Sunrise", noon: "Solar transit", sunset: "Sunset" },
  },
  clock: {
    eyebrow: "Reading the clock",
    title: "One instant, six cities.",
    lede: "A window at the ghat is a single moment in time. What it is called on your wall calendar depends on where you are standing, and for half the diaspora it is the previous evening.",
    atTheGhat: "At the ghat",
    elsewhere: "Elsewhere",
    illustration:
      "Illustration only, worked from an assumed sunrise of 06:00 IST on a notional day. This is not a panchang date and no occasion falls on it.",
    assumed: "Assumed sunrise",
    window: "Window",
  },
  notPublished: {
    eyebrow: "What is not here",
    title: "Four things we will not print.",
    lede: "A calendar is as much what it declines to say as what it says.",
  },
  refusals: {
    eyebrow: "What we do not do",
    title: "Asked for, and refused.",
  },
  cta: {
    title: "Choose the water first.",
    lede: "The occasion matters less than the river you have a relationship with.",
    primary: "The six waters",
    secondary: "The occasion list",
  },
  tiers: {
    nitya: "A daily observance",
    punya: "A recurring parva",
    parva: "A major occasion",
    mahaparva: "One of the year's great days",
  },
  anchors: {
    sunrise: "Anchored to sunrise",
    "solar-noon": "Anchored to the sun's transit",
    sunset: "Anchored to sunset",
  },
};

/** The shape every other locale in this directory is checked against. */
export type MuhuratIndexCopy = typeof en;
