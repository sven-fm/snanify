/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error, which is the point.

   The copy rules are in CLAUDE.md: plain sentences, a noun and a verb, one
   idea each, and never a negative construction.

   FIGURES. The reading is built in src/app/[lang]/page.tsx from the same
   snapshot /live uses; only templates live here, and a figure never goes in
   this file.

   PRICES ARE NOT IN THIS FILE. One price, in the reader's own currency, out of
   src/content/prices.ts; see src/lib/currency.ts for how that currency is
   chosen. The price seal and the packs render it through <Price>.
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
    /* The owner's words (spec 6.1), all of it above the fold at 390 x 660 (a
       phone inside the Instagram browser), the press included. {river} is the
       landing's hero water, set in sindoor at render. */
    title: "Your {river} snan. From home.",
    band: "Takes just 3 minutes. Then share it with your family.",
    pitch: "Breathe with the river as it runs this morning. Make your sankalp.",
    push: "Do your first snan today!",
    ctaPrimary: "Start your snan now",
    card: {
      /* The reading under the river: the state and the gauge lead, the
         figure proves it (src/content/flow.ts). */
      muhurat: "Next muhurat",
      link: "See all six waters",
    },
  },
  rivers: {
    title: "Pick your river",
    lede: "The one you grew up near, or the one your family bathed in. Each has its own page, with today's flow and the ghat's calendar.",
  },
  pricing: {
    title: "Eleven mornings for eleven.",
    /* For rupee readers: eleven mornings cost ₹501, so the line names it. */
    titleInr: "Eleven mornings for {price:eleven}.",
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
    head: { title: "This {accent} has moved.", accent: "ghat" },
    lede: "The river moved, or the link did. The six waters are where they always were.",
    cta: "Back to the river",
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
