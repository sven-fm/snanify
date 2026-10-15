/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error, which is the point.

   The copy rules are in CLAUDE.md: plain sentences, a noun and a verb, one
   idea each, and never a negative construction.

   FIGURES. `hero.record` carries the three figures the owner asked to keep on
   the page, written as a sentence a reader could check: six waters in
   rivers.ts, forty-eight refreshes a day (the page revalidates every thirty
   minutes), and a record that runs back to 1997, which is where the flood
   model's reanalysis starts. The river line and the card are built in
   src/app/[lang]/page.tsx from the same snapshot /live uses; only templates
   live here, and a figure never goes in this file.

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
      "Sit three minutes with the river you grew up near, at the hour the panchang names. Six sacred rivers, live, with the muhurat for every day.",
  },
  /* The one line on the share card a chat app unfurls; see src/lib/site-card.ts. */
  share: "A digital snan. Three minutes with the river you grew up near, and a sheet to send home.",
  themeLabel: "Change theme",
  langLabel: "Language",
  nav: {
    how: "How it works",
    rivers: "Sacred waters",
    muhurat: "Muhurat",
    pricing: "Prices",
    cta: "Begin",
    menu: "Menu",
    account: "Your mornings",
    accountShort: "Mornings",
    profile: "Your account",
    snanSettings: "Your snan",
    buy: "Buy mornings",
    signOut: "Sign out",
  },
  edition: "Samvat {samvat}",
  hero: {
    /* The headline says what this is, for a reader who arrived from an ad and
       has never heard the name. The lede says what happens, in four short
       sentences, and all of it sits above the fold at 390 x 700 (a phone
       inside the Instagram browser), with the button. */
    titleA: "A daily snan,",
    titleB: "wherever you live.",
    lede: "Three minutes with the Ganga, the Yamuna or another sacred river, as it runs this morning. Breathe with it. Make your sankalp. Then send the family a sheet with their names on it.",
    ctaPrimary: "Begin your first snan",
    ctaSecondary: "Watch the three minutes",
    offer: "Eleven mornings for {price}. Start tomorrow.",
    card: {
      /* The live line above the headline and the card's first row take their
         words from src/content/flow.ts: the river's state leads, the figure
         proves it. */
      today: "Today",
      flow: "Flow",
      ranked: "Ranked",
      muhurat: "Next muhurat",
      percentile: "{n} percentile since 1997",
      median: "Seasonal median, 1997 to 2025",
      link: "See all six waters",
    },
    record: "Six waters, one figure a day, each ranked against every day since 1997.",
  },
  rivers: {
    title: "Pick your river",
    lede: "The one you grew up near, or the one your family bathed in. Each has its own page, with today's flow and the ghat's calendar.",
  },
  pricing: {
    title: "Eleven mornings for eleven.",
    lede: "Pay once, in your own currency. Sit them on any mornings you like.",
    labels: {
      each: "a morning",
      choose: "Choose this pack",
    },
    /* The count is the name. The packs once carried coined names with
       Devanagari beside them, three words to learn on the one table where a
       reader decides to pay. */
    tiers: [
      {
        key: "one",
        name: "One morning",
        body: "Try one morning, and send the sheet it leaves.",
      },
      {
        key: "eleven",
        name: "Eleven mornings",
        body: "Eleven mornings, paid once. Sit them on any eleven days. They keep.",
      },
      {
        key: "sixty",
        name: "Sixty mornings",
        body: "Five mornings a month for a year, at the lowest price a morning gets.",
      },
    ],
    /* Read by <TaxNote>: one line for US dollars, one for every other currency. */
    tax: {
      exclusive: "Prices show before US sales tax.",
      inclusive: "Tax included.",
    },
    cta: "Watch the three minutes",
  },
  /* The sheet a stranger sees before paying: drawn from today's figure, for
     a family that does not exist, and labelled as a specimen on its face. */
  /* The band that shows the sheet, straight under the hero: it is the thing
     people pay for, so it comes before the figures and the six waters. */
  sheet: {
    title: "Send this morning home.",
    lede: "Every snan ends with a Sankalp Patra: your family's names, the river as it ran, the tithi and the hour. It opens ready for the family group.",
  },
  specimen: {
    label: "Specimen",
    alt: "A Sankalp Patra, as it arrives on a phone: two names, the Ganga at Haridwar, today's flow and rank.",
    caption: "A sheet as it arrives in a family group, drawn from the Ganga's own figure today.",
  },
  notFound: {
    code: "404",
    title: "This ghat has moved.",
    lede: "The river moved, or the link did. The six waters are where they always were.",
    cta: "Back to the river",
  },
  closing: {
    title: "Sit with the river tomorrow.",
    lede: "Set it up tonight in two minutes. Sit for three in the morning, and the sheet is ready to send before your chai.",
    cta: "Begin your snan",
  },
  bar: {
    label: "Eleven mornings",
    cta: "Begin",
  },
  footer: {
    tagline: "A digital snan for Indians everywhere.",
    cols: [
      { h: "Practice", links: ["Begin", "The snan"] },
      { h: "Reference", links: ["Panchang", "The rivers now", "Sacred waters", "Muhurat", "Questions"] },
      { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
    ],
    made: "Prayagraj and Berlin",
    rights: "© 2026 Snanify",
  },
};

/** The shape every other locale in this directory is checked against. */
export type LandingCopy = typeof en;
