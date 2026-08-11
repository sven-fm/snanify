import type { Lang } from "@/lib/content";

/**
 * Copy for /rituals, the offering catalog.
 *
 * PRICING, 2026 REPRICING. The figures on this page are no longer the launch
 * placeholders. They are set from the unit-economics work in
 * docs/product/economics.md and the lifecycle work in docs/product/retention.md:
 *
 *   - Deep Daan ($11 / Rs 101) is the entry SKU and the only rite below $21.
 *   - Ekal Snan moves $11 -> $51 and Rs 251 -> Rs 501, matching the ladder
 *     published on the landing page in src/lib/content.ts. The old price did
 *     not cover 45 seconds of a ritvik's time plus his 20% segment share, the
 *     camera, the stream, the card fee and the refund promise, and the Rs 1,800
 *     per-segment officiant floor means a near-empty segment has to be carried
 *     by a single sankalp in year one.
 *   - Parivar Snan Rs 1,100 / $151, Ekantik Snan Rs 5,100 / $251. A dedicated
 *     private session is $251 whatever is performed inside it, because the
 *     private morning is the cost. Longer private forms step to $501.
 *   - Sankalpit Japa is priced from its true duration (1,008 japa is about
 *     three hours, not forty minutes), and the 10,008 form is withdrawn.
 *   - Path is priced from its true duration, 35 to 70 minutes of undivided time.
 *   - Varsh (twelve snans for one price) is withdrawn and replaced by Snan Kosh,
 *     a credit whose unspent part is refunded automatically at 24 months.
 *     The amounts here ($108 -> $130, Rs 2,100 -> Rs 2,500) must stay identical
 *     to src/lib/content.ts pricing.kosh.
 *
 * SESSION CAP. 51 sankalps per session, at most 11 per segment, five segments.
 * 51 x 45s = 38 minutes of recitation plus roughly 15 minutes of slate, dip and
 * closing across five segments = about 53 minutes. Brahma Muhurat is 48. The
 * cap is kept and the window is stated honestly instead: a full session opens
 * in Brahma Muhurat and finishes about five minutes into Pratah Sandhya. This
 * agrees with src/lib/content.ts and with the 45-second floor in trust.ts. If
 * the cap moves it must move here in the same commit: it appears in
 * vessels.columns, vessels.cap, vessels.privacy and the Parivar copy.
 *
 * PLACEHOLDER, OPERATIONS. Shrine names (Abhishek), lamp suppliers
 * (Deep Daan), aarti samiti arrangements (Aarti Sankalp) and the japa mantra
 * list are all unconfirmed. Rather than inventing them, each rite carries a
 * visible line stating that the detail is not yet settled and will be named
 * here before booking opens. Do not replace those lines with invented facts.
 *
 * The money split (see ladder.split) prints the one number that is already
 * published on /ethics, the ritvik's share, and states plainly that the other
 * numbers are not agreed yet. Do not invent the missing ones.
 *
 * Structural note: `id`, every `sku`, and every `usd` / `inr` pair must stay
 * identical between the `en` and `hi` objects. The anchors in the sub-nav are
 * built from `id`, so a drift there strands the Hindi page's deep links.
 */

export type Honesty = { is: string; isNot: string };

export type Note = { label: string; body: string };

/**
 * One purchasable line. A rite offered in both vessels carries two fares, and
 * the vessel is the price axis, so each fare states what its number buys.
 * `note` must describe time, access or cost. It must never claim a discount
 * and must never claim a difference in what the rite is worth.
 */
export type Fare = {
  vessel: string;
  sku: string;
  usd: string;
  inr: string;
  note: string;
};

export type Rite = {
  /** Anchor id. Identical in both locales. */
  id: string;
  index: string;
  name: string;
  /** Devanagari name, shown in both locales. */
  deva: string;
  duration: string;
  /** At least one. A rite with no fare must not render. */
  fares: Fare[];
  what: string;
  who: string;
  receive: string;
  /** What the household has to give us before the rite can be performed. */
  need?: string;
  variant?: {
    name: string;
    deva: string;
    duration: string;
    note: string;
    fares: Fare[];
  };
  /** Mandatory. A rite without both halves must not render. */
  honesty: Honesty;
  notes: Note[];
};

export type RitualsCopy = {
  meta: { title: string; description: string };
  nav: { label: string; items: { href: string; label: string }[] };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    badge: string;
    guaranteesLabel: string;
    guarantees: { n: string; t: string; d: string }[];
  };
  vessels: {
    eyebrow: string;
    title: string;
    lede: string;
    statement: string;
    nameNote: string;
    columns: { key: string; samuhik: string; ekantik: string }[];
    tableCaption: string;
    heads: { row: string; samuhik: string; samuhikDeva: string; ekantik: string; ekantikDeva: string };
    cap: { label: string; body: string };
    privacy: { label: string; body: string };
  };
  included: {
    eyebrow: string;
    title: string;
    lede: string;
    items: {
      name: string;
      deva: string;
      sku: string;
      meta: string;
      body: string;
      honesty: Honesty;
    }[];
    termsTitle: string;
    terms: Note[];
  };
  rites: {
    eyebrow: string;
    title: string;
    lede: string;
    labels: {
      what: string;
      who: string;
      receive: string;
      need: string;
      duration: string;
      fares: string;
      alsoAvailable: string;
      sku: string;
    };
  };
  /**
   * Visible provenance for the prices. The figures are set, but two inputs
   * behind them are still unconfirmed, and the page says which two where the
   * figures are, not only in a source comment.
   */
  priceNote: string;
  honestyLabels: { block: string; is: string; isNot: string };
  catalog: Rite[];
  /** Snan Kosh, the credit that replaced Varsh. */
  kosh: {
    eyebrow: string;
    title: string;
    lede: string;
    sku: string;
    statement: string;
    tableTitle: string;
    tableCaption: string;
    heads: { ladder: string; place: string; spend: string };
    rows: { ladder: string; place: string; spend: string }[];
    withdrawn: { label: string; body: string };
    terms: Note[];
    honesty: Honesty;
  };
  ladder: {
    eyebrow: string;
    title: string;
    lede: string;
    statement: string;
    reason: { label: string; body: string };
    ladders: { name: string; deva: string; note: string; steps: string }[];
    differencesTitle: string;
    differencesLede: string;
    differencesCaption: string;
    differencesHeads: { key: string; vishwa: string; vishwaDeva: string; bharat: string; bharatDeva: string };
    differences: { key: string; vishwa: string; bharat: string }[];
    eligibility: { label: string; body: string };
    fee: { label: string; body: string };
    split: { label: string; body: string };
    cooling: { label: string; body: string };
    tableTitle: string;
    tableCaption: string;
    heads: { rite: string; vessel: string; duration: string; usd: string; inr: string };
    premiumsTitle: string;
    premiumsLede: string;
    premiums: { name: string; usd: string; inr: string; reason: string }[];
    freeTitle: string;
    freeItems: string[];
  };
  refusals: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { name: string; reason: string }[];
    footnote: string;
  };
  closing: { title: string; lede: string; cta: string; ctaSecondary: string };
};

export const ritualsContent = {
  en: {
    meta: {
      title: "The catalog, every rite, named | Snanify",
      description:
        "What is performed, by whom, for how long, and what it costs on both ladders. Every rite Snanify offers, the dollar and rupee rates side by side, and the list of things we refuse to sell.",
    },
    nav: {
      label: "Sections of the catalog",
      items: [
        { href: "#vessels", label: "Two vessels" },
        { href: "#included", label: "Always included" },
        { href: "#rites", label: "The rites" },
        { href: "#kosh", label: "Snan Kosh" },
        { href: "#sankalp", label: "Both rates" },
        { href: "#refusals", label: "What we refuse" },
      ],
    },
    hero: {
      eyebrow: "The catalog",
      title: "Every rite, named.",
      lede: "What is performed, by whom, for how long, and what it is not. Every rite on this page carries the same block: what this is, and what this is not. Nothing here is written to make you feel that something is wrong with your life.",
      badge: "Fully digital · nothing is ever posted to you",
      guaranteesLabel: "At every price, without exception",
      guarantees: [
        {
          n: "01",
          t: "Your name is spoken",
          d: "Aloud, at the ghat, by the person performing the rite. Not displayed on a screen. Not printed in a list. Spoken, for at least forty five seconds, at every price on this page.",
        },
        {
          n: "02",
          t: "Naam Kshan",
          d: "Your recording opens at the second your name is spoken, and that timestamp is printed on your Sankalp Patra.",
        },
        {
          n: "03",
          t: "A patra you can check",
          d: "Anyone holding your patra can confirm the session, the ghat, the hour and the ritvik who actually performed. Your name, your gotra and your sankalp appear only if you choose to show them.",
        },
      ],
    },
    vessels: {
      eyebrow: "The real price axis",
      title: "Two ways a rite is held.",
      lede: "Not the number of names. Not the river. Not the length. What a person is actually buying is the room the rite happens in, and there are two of them. Every price on this page is a price for one of those two rooms.",
      statement:
        "A samuhik snan places your sankalp inside a session shared with up to fifty other households, the same way a ghat has always worked at dawn. An ekantik snan is held for your household alone, and that is where nearly all of the cost sits, because one person's whole morning goes to one family. Both are real. One is not lesser than the other; it is a different room.",
      nameNote:
        "We write the private vessel as Ekantik in English for short. In Hindi it is said plainly, निजी अनुष्ठान, a private rite. It is a description of the arrangement, not a claim about doctrine.",
      tableCaption: "How the two vessels differ, line by line.",
      heads: {
        row: "Aspect",
        samuhik: "Samuhik",
        samuhikDeva: "सामूहिक, held together",
        ekantik: "Ekantik",
        ekantikDeva: "निजी अनुष्ठान, held alone",
      },
      columns: [
        {
          key: "Session shared with",
          samuhik: "Up to 51 sankalps, in five segments of no more than eleven",
          ekantik: "Your household alone",
        },
        {
          key: "Reading time for your sankalp",
          samuhik: "At least 45 seconds, never less",
          ekantik: "At least 45 seconds, and unhurried",
        },
        {
          key: "What is read for you",
          samuhik: "Your name and your gotra",
          ekantik: "Your name, your gotra, and your sankalp in your own words",
        },
        {
          key: "Ritvik",
          samuhik: "One ritvik, one shared rite",
          ekantik: "One ritvik, your rite only",
        },
        {
          key: "Session length",
          samuhik: "About 53 minutes when full, less when it is not",
          ekantik: "25 to 180 minutes, by what is performed",
        },
        {
          key: "Speaking with the ritvik",
          samuhik: "Not in a shared session",
          ekantik: "Three minutes before, three minutes after",
        },
        {
          key: "What you receive",
          samuhik: "Your Naam Kshan and the shared ghat segments",
          ekantik: "The whole session, unedited",
        },
        {
          key: "Where the money goes",
          samuhik: "One session's costs divided across every household in it",
          ekantik: "One session's costs carried by you alone",
        },
        {
          key: "Precedent",
          samuhik: "Samuhik puja, performed at every ghat, every day",
          ekantik: "Vyaktigat anushthan, a rite commissioned by one household",
        },
      ],
      cap: {
        label: "Where 51 comes from, and why the window is stated the way it is",
        body: "Two published rules make the number. At least forty five seconds of recitation for every named sankalp, and never more than eleven sankalps in one segment. Fifty one is five segments, which is about thirty eight minutes of recitation plus roughly fifteen minutes of slate, dip and closing across the five: a session of about fifty three minutes. Brahma Muhurat is forty eight minutes long, so a full session does not fit inside it. We are not going to read faster to make it fit. A full session opens in Brahma Muhurat and finishes about five minutes into Pratah Sandhya, and a session that is not full ends sooner. Your recording carries the second your own name was spoken, so you never have to take our word for where in the hour you were. The forty five seconds is the number that does not move.",
      },
      privacy: {
        label: "What a shared session does not do",
        body: "Your sankalp, in your own words, is read aloud only in an ekantik session, where the only people listening are the household that wrote it. A samuhik session reads names and gotras and nothing else, and your recording carries your own Naam Kshan and the ghat segments, not fifty other families' declarations. People type the hardest things they are carrying into that box. It is not ours to broadcast.",
      },
    },
    included: {
      eyebrow: "Standing terms",
      title: "In every rite, at every price.",
      lede: "Two rites are never sold separately because nothing else means anything without them, and a handful of terms apply to everything below.",
      items: [
        {
          name: "Sankalp",
          deva: "संकल्प",
          sku: "SNF-RITE-SANKALP",
          meta: "Included in every rite · not sold alone · at least 45 seconds of recitation for every named sankalp, in both vessels",
          body: "The formal declaration that binds a rite to a person. The ritvik states where the rite is happening, when it is happening in the traditional calendar, then your gotra and your name, and dedicates what follows to you. Your Naam Kshan points here.",
          honesty: {
            is: "The traditional act of naming a beneficiary before a rite, performed as it is performed for anyone who stands at the ghat and cannot recite the formula themselves.",
            isNot: "Magic. Being named does not change your circumstances. It records and dedicates an intention.",
          },
        },
        {
          name: "Pratinidhi Snan",
          deva: "प्रतिनिधि स्नान",
          sku: "SNF-RITE-SNAN",
          meta: "Included in every snan · about 9 minutes · unedited, never sped up, never stock",
          body: "The ritvik enters the river and performs the snan sequence on your behalf as your representative, the marjan sequence, three immersions, water taken up in the hands and released while your sankalp is held.",
          honesty: {
            is: "A rite performed by proxy, a practice with long and ordinary precedent for those who cannot travel: the ill, the aged, the distant.",
            isNot: "Your own bath. Your body does not enter the Ganga. Anyone who tells you a streamed rite is identical to standing in the water yourself is selling you something.",
          },
        },
      ],
      termsTitle: "Terms that apply to everything on this page",
      terms: [
        {
          label: "Why several of these prices went up in 2026",
          body: "We costed this properly for the first time. A shared snan at eleven dollars did not cover forty five seconds of a ritvik's time and his twenty per cent share of the segment, the camera, the connection, the card fee and the refund we promise, and a segment has to clear about two thousand seven hundred rupees before any of that is paid for. A japa sold everywhere as forty minutes takes about three hours. Faced with that, a company either shortens the rite or raises the price. We raised the price and left the rite alone. The way into this catalog is still eleven dollars, and it is a whole rite, not a sample of one.",
        },
        {
          label: "Sankalp is naming. Tarpan is offering.",
          body: "They are different acts and we sell them separately. Being named in a sankalp is not a tarpan, and no tier here quietly implies that it is. If you want the water offering itself, it is the rite listed below, at its own price.",
        },
        {
          label: "Two of our words are ours, not inherited",
          body: "Naam Kshan and Pratinidhi Snan are Snanify's names for two features of this service. They are not traditional terms and we will not dress them as though they were.",
        },
        {
          label: "The tradition we follow",
          body: "The liturgy is North Indian Smarta. Families in other sampradayas, Sri Vaishnava, Madhva, Shaiva, Bengali, Tamil, Malayali and others, will notice differences from their own rite. We would rather say so than present one practice as the practice.",
        },
        {
          label: "Gotra is optional",
          body: "Many families do not know their gotra, and many communities do not use one. You may leave it blank. When the gotra is not known, Kashyapa gotra is used, that is the traditional rule, not a workaround, and no tier is ever gated on it.",
        },
        {
          label: "Who may commission an ancestral rite",
          body: "Rules on who performs tarpan and pind daan vary sharply by community and region, and several traditions hold that pitru tarpan is not performed while one's father is living. Snanify's position, stated before you pay rather than at the ghat afterwards: any descendant, of any gender, may commission these rites. If your family keeps a purohit, ask them first, we are not a replacement for your family's practice.",
        },
        {
          label: "Recordings are never charged for",
          body: "Free at every price, kept for at least three years at the entry rate and permanently above it, downloadable, and never put behind a payment. You will not be asked to pay to keep the video of a rite performed in your father's name.",
        },
        {
          label: "A day to change your mind",
          body: "Anything at one hundred and fifty one dollars and above, and any Snan Kosh, carries a 24-hour cooling-off period before the money is taken. Grief and a card at two in the morning are a bad combination, and a day's delay costs us almost nothing.",
        },
        {
          label: "Timings are provisional until confirmed",
          body: "Muhurat times shown anywhere in this service are marked provisional until they are confirmed against the panchang for that ghat, with the source and the ayanamsa named. We will not print a time as fact before then.",
        },
      ],
    },
    rites: {
      eyebrow: "Anushthan",
      title: "The rites, one by one.",
      lede: "Each may be added to a snan or commissioned on its own as its own session. A rite offered in both vessels is priced twice, because the two rooms cost very different amounts to run and it would be dishonest to hide that inside one number.",
      labels: {
        what: "What it is",
        who: "Who it is for",
        receive: "What you receive",
        need: "What we need from you",
        duration: "Duration",
        fares: "Held as, and what it costs",
        alsoAvailable: "Extended form",
        sku: "SKU",
      },
    },
    priceNote:
      "These are the prices, and they are derived rather than picked: ritvik pay, camera and connection at the ghat, streaming, storage, card fees and the refund we promise, all added up. They are not final, and we will not pretend otherwise. Two inputs behind them are unconfirmed, what each ghat body charges for permission to film, and how this service is treated for Indian tax, and either could move a number. If one does, the new price is announced here before it is applied, and any Snan Kosh already placed keeps the rates it was placed at.",
    honestyLabels: {
      block: "Honestly",
      is: "What this is",
      isNot: "What this is not",
    },
    catalog: [
      {
        id: "deep-daan",
        index: "01",
        name: "Deep Daan",
        deva: "दीप दान",
        duration: "about 3 minutes",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-DEEPDAAN",
            usd: "$11",
            inr: "₹101",
            note: "The way in, and the only rite on this page below fifty one dollars. Inside a session that is already running, a lamp costs the wick, the leaf, and the ritvik's hands for three minutes.",
          },
        ],
        what: "A lamp lit at the ghat in your name and set on the water.",
        who: "The smallest honest way in. A birthday, a good result, a small thanksgiving, Kartik Purnima, Dev Deepawali, a death anniversary, or simply a difficult week.",
        receive:
          "Ninety seconds of your recording: the wick catches, your name is spoken over the flame, the lamp is set on the current, and the camera follows it until it leaves the frame. It is not cut short.",
        honesty: {
          is: "A lamp, lit, named, floated. That is the whole of it, and it has always been enough.",
          isNot:
            "Going to arrive anywhere. It is a lamp on a river. It is also not a smaller version of a snan, and nothing on this page is withheld from it: your name is spoken for the same forty five seconds, and your patra verifies the same way.",
        },
        notes: [
          {
            label: "Inside a private rite",
            body: "If you have already commissioned an ekantik rite, a Deep Daan added to it is the same eleven dollars. The session is yours already, so we are not going to charge you a private rate for a lamp.",
          },
          {
            label: "Materials",
            body: "Lamps are leaf and cotton, no plastic, no thermocol. The supplier and each ghat's own rules on floating lamps are still being confirmed and will be named here before this rite opens for booking.",
          },
        ],
      },
      {
        id: "ekal-snan",
        index: "02",
        name: "Ekal Snan",
        deva: "एकल स्नान",
        duration: "a snan of about 9 minutes; at least 45 seconds of reading for your sankalp",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-SNAN-EKAL",
            usd: "$51",
            inr: "₹501",
            note: "One named sankalp, taking one of the eleven places in its segment. This was eleven dollars until 2026. The ritvik is paid the greater of one thousand eight hundred rupees or a fifth of what his segment takes, so a segment has to clear about two thousand seven hundred rupees before the floor, the camera and the connection are covered. At eleven dollars that needed nine households in one segment. At fifty one a single sankalp carries it, which is what a first year actually looks like.",
          },
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-SNAN-EKANTIK",
            usd: "$251",
            inr: "₹5,100",
            note: "The same snan with nobody else in the session. About twenty five minutes of one ritvik's morning, the camera and the ghat for that whole time, your sankalp read in your own words, and three minutes with him before and after. Every dedicated private session on this page is two hundred and fifty one dollars, because the private morning is the cost.",
          },
        ],
        what: "The Pratinidhi Snan performed in your name and your gotra, the marjan sequence and three immersions, with your sankalp declared before the water is entered. Held alone rather than in a shared session, the same rite is the Ekantik Snan, and it is the second fare below.",
        who: "One person. The commonest reason people come here, and the rite everything else on this page is built around.",
        receive:
          "Your Naam Kshan, the ghat segments around it, and your Sankalp Patra. In an ekantik session, the entire recording from the first word to the last, unedited.",
        need: "A name. A gotra only if you know it, and it is never required.",
        variant: {
          name: "Parivar Snan",
          deva: "परिवार स्नान",
          duration: "six named sankalps, at least 45 seconds each, one gotra",
          note: "Up to six names of one household, each read in full for its own forty five seconds and each with its own Naam Kshan. Six names take six of the eleven places in a segment, so a household is priced as a household. It works out at about twenty five dollars a name against fifty one for one, and that is a real saving on our side rather than a claim about what six names are worth: one order, one gotra, one patra, one card fee and one household to answer to.",
          fares: [
            {
              vessel: "Samuhik",
              sku: "SNF-RITE-SNAN-PARIVAR",
              usd: "$151",
              inr: "₹1,100",
              note: "Six names inside a shared session, taking six of the eleven places in their segment.",
            },
          ],
        },
        honesty: {
          is: "A snan performed at the river by a ritvik acting as your representative, with your name and gotra spoken aloud, recorded without editing, and verifiable afterwards by anyone you show the patra to.",
          isNot:
            "Your own bath, and not an obligation discharged. It does not stand in for a rite your family's own purohit performs, and being in a shared session takes nothing away from it and adds nothing to it either.",
        },
        notes: [
          {
            label: "What the higher price paid for",
            body: "None of the increase went into the rite getting shorter or longer. The ritvik's share of what a session takes is published on our ethics page and is fixed for twelve months, so when the price went up his pay went up with it, on the same day, by the same proportion.",
          },
        ],
      },
      {
        id: "pitru-tarpan",
        index: "03",
        name: "Pitru Tarpan",
        deva: "पितृ तर्पण",
        duration: "about 12 minutes",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-TARPAN-PITRU",
            usd: "$81",
            inr: "₹751",
            note: "The tarpan sequence is performed once for the whole session and your departed are named within it, in turn, up to three names taking three of the eleven places. It costs more than a snan because it is a longer vidhi with more preparation and more names read, not because of what it is about. We will not price grief.",
          },
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-TARPAN-PITRU-E",
            usd: "$251",
            inr: "₹5,100",
            note: "The full twelve minutes performed for your household and nobody else, with your sankalp read in your own words and no other family's names in the recording. The same two hundred and fifty one dollars as any other private session, because it is the same private morning.",
          },
        ],
        what: "Water offered to the departed, poured from the hands with each ancestor named. The oldest and the simplest of the ancestral rites.",
        who: "Anyone who wishes to remember someone they have lost, during Pitru Paksha, on a barsi, on an amavasya, on a parent's tithi, or by a family that could not be at the funeral.",
        receive:
          "The ritvik faces south, takes water and darbha, and names each of your departed in turn, name, relationship to you, and the year. The water falls. Each name has its own Naam Kshan in your recording.",
        need: "A name, the relationship to you, and the year of passing, an approximate year is accepted. A gotra only if it differs from yours, and only if you know it.",
        variant: {
          name: "Deva-Rishi-Pitru Tarpan",
          deva: "देव-ऋषि-पितृ तर्पण",
          duration: "about 18 minutes",
          note: "The threefold form, offerings made to the devas, the rishis and the pitrus in sequence, rather than to the pitrus alone. Offered privately only, because eighteen minutes of sequence cannot be shared between households without one of them waiting.",
          fares: [
            {
              vessel: "Ekantik",
              sku: "SNF-RITE-TARPAN-TRI",
              usd: "$251",
              inr: "₹5,100",
              note: "Eighteen minutes instead of twelve, at the same price as the shorter form, because both fit inside one private session and the session is what costs.",
            },
          ],
        },
        honesty: {
          is: "An offering of water and remembrance to named ancestors, performed by a ritvik on behalf of a descendant who cannot be present.",
          isNot:
            "A rescue. We will never tell you your ancestors are suffering, restless, unsatisfied or waiting. We do not know that, and nobody does. Perform tarpan because you wish to remember them. It is also not a varshik shraddh and we will not let anyone believe it discharges one.",
        },
        notes: [
          {
            label: "Adhikara",
            body: "Eligibility rules differ by community, and several traditions hold that pitru tarpan is not performed while one's father is living. Any descendant of any gender may commission it here. If your family keeps a purohit, ask them first.",
          },
          {
            label: "Nothing follows this in your inbox",
            body: "Booking a tarpan does not put you on a list. No message on the anniversary of a death unless you have asked us for one, no offer after it, and nothing at all in the days after a rite except the recording and the patra.",
          },
        ],
      },
      {
        id: "nadi-puja",
        index: "04",
        name: "Nadi Puja",
        deva: "नदी पूजा",
        duration: "about 18 minutes",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-NADIPUJA",
            usd: "$81",
            inr: "₹751",
            note: "The upachara sequence is performed once for the session, and your name and sankalp are read within it at the invocation and again at the offering.",
          },
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-NADIPUJA-E",
            usd: "$251",
            inr: "₹5,100",
            note: "The whole sequence performed for your household alone, with your flowers and your lamp set on the water at the close and nobody else's in the frame.",
          },
        ],
        what: "Worship of the river herself, the upachara sequence of invocation, water, flowers, incense, lamp, offering and salutation, performed at the water's edge in your name. Ganga Puja at Haridwar, Yamuna Puja at Mathura, Triveni Puja at the Sangam, and so on by river.",
        who: "A new house, a new business, a marriage, a first child, a vow completed, an anniversary. Occasions of gratitude rather than petition.",
        receive:
          "The full upachara sequence, each step named in the subtitles as it happens, with flowers and the lamp set on the water at the close.",
        honesty: {
          is: "A devotional puja to the river, performed with your sankalp, at the ghat.",
          isNot:
            "A substitute for a griha pravesh or a wedding rite performed in your own home with your own family. It accompanies those. It does not replace them, and no outcome follows from it that we would ever put in writing.",
        },
        notes: [],
      },
      {
        id: "abhishek",
        index: "05",
        name: "Abhishek",
        deva: "अभिषेक",
        duration: "about 12 minutes",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-ABHISHEK",
            usd: "$81",
            inr: "₹751",
            note: "One continuous pour for the session, with each household's name and gotra read into the recitation as it runs.",
          },
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-ABHISHEK-E",
            usd: "$251",
            inr: "₹5,100",
            note: "The pour performed for your household alone, at a shrine we name in advance, with the whole twelve minutes recorded unbroken.",
          },
        ],
        what: "River water poured in a continuous stream over the murti or the shivling at a ghat-side shrine, with recitation, in your name.",
        who: "Mahashivratri, the Mondays of Shravan, Pradosh, or a vow you have taken.",
        receive:
          "The unbroken pour with the recitation audible, and the exact shrine named, both on camera and on your Sankalp Patra.",
        honesty: {
          is: "An abhishek at a ghat-side shrine, performed with river water in your name, at a shrine we name.",
          isNot:
            "An abhishek inside a jyotirlinga sanctum. We do not have access to the Mahakaleshwar garbhagriha and we will never imply that we do.",
        },
        notes: [
          {
            label: "Which shrine",
            body: "The shrine at each ghat is still being agreed with the body that administers it. Until a shrine is named and agreed it does not appear here, and the shrine printed on your patra is always the one where the rite was actually performed.",
          },
        ],
      },
      {
        id: "aarti-sankalp",
        index: "06",
        name: "Aarti Sankalp",
        deva: "आरती संकल्प",
        duration: "about 25 minutes of stream; your name read at a fixed point",
        fares: [
          {
            vessel: "Samuhik",
            sku: "SNF-RITE-AARTI",
            usd: "$21",
            inr: "₹251",
            note: "The only rung between the lamp and the snan. It stays low because the aarti happens anyway and it takes no place in a snan segment. We are paying for a lamp, for the reading of your name inside the aarti, and for the camera. There is no private form of this and we will not invent one.",
          },
        ],
        what: "Your name and sankalp are read at the evening aarti at the ghat, and a lamp is offered on your behalf during it.",
        who: "Anyone who wants the sound and the light of the ghat at dusk, and families in three timezones who want to sit and watch the same thing at the same hour.",
        receive:
          "The full aarti, streamed, with the moment your name is read indexed as your Naam Kshan.",
        honesty: {
          is: "Your name read, and a lamp offered, within a public aarti, an aarti that would have happened whether or not you booked.",
          isNot: "A private aarti. We are not its organisers and we do not present ourselves as such.",
        },
        notes: [
          {
            label: "The arrangement",
            body: "The arrangement with the aarti samiti at each ghat is not yet documented. This rite does not open for booking until it is, and when it does, the arrangement will be described here in one plain sentence.",
          },
        ],
      },
      {
        id: "path",
        index: "07",
        name: "Path",
        deva: "पाठ",
        duration: "35 to 70 minutes, by text",
        fares: [
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-PATH",
            usd: "$251",
            inr: "₹5,100",
            note: "Vishnu Sahasranama, about 35 minutes, or Hanuman Chalisa eleven times, about 40 minutes. That is a ritvik's whole morning given to one household, at the same two hundred and fifty one dollars as every other private session.",
          },
        ],
        what: "The recitation of a complete text at the ghat in your name. The duration is stated first and the price is derived from it, never the other way round.",
        who: "A vow, an anniversary, a household observance you keep every year, or a text your family has always read together and cannot gather to read this year.",
        receive:
          "The full unedited recording, with the session ID spoken aloud on camera at the close so the recording carries the proof of its own date.",
        variant: {
          name: "Sundarkand",
          deva: "सुंदरकांड",
          duration: "about 70 minutes",
          note: "The longer text, recited complete in one sitting, at the same price as the shorter ones.",
          fares: [
            {
              vessel: "Ekantik",
              sku: "SNF-RITE-PATH-SUNDAR",
              usd: "$251",
              inr: "₹5,100",
              note: "Seventy minutes of continuous recitation instead of thirty five, recorded end to end without a cut, and not a rupee more. The travel in the dark, the ghat, the camera and the morning are the same whichever text he reads.",
            },
          ],
        },
        honesty: {
          is: "A complete text, recited in full at the ghat, dedicated to you, and delivered unedited.",
          isNot:
            "Abridged, sped up, or pre-recorded, and not a transaction with a result. Nothing follows from a path that we can promise you, and if we could we would not need to record it.",
        },
        notes: [
          {
            label: "Why this costs what it costs",
            body: "It used to be fifty one dollars. Thirty five to seventy minutes of one person's undivided attention cannot be sold for fifty one dollars without either the recitation being rushed or somebody being underpaid for it. We would rather print the higher number and the real duration together, and let you decide with both in front of you.",
          },
          {
            label: "Which texts",
            body: "Additional texts, including Rudri path, are added only where the ritvik at that ghat recites them regularly. We do not list a text before someone can actually perform it.",
          },
        ],
      },
      {
        id: "sankalpit-japa",
        index: "08",
        name: "Sankalpit Japa",
        deva: "संकल्पित जप",
        duration: "1,008 repetitions, about 3 hours",
        fares: [
          {
            vessel: "Ekantik",
            sku: "SNF-RITE-JAPA",
            usd: "$501",
            inr: "₹11,000",
            note: "Three hours of one ritvik sitting at the water doing nothing else, recorded unbroken with the count visible. Per minute it is the cheapest thing on this page and it is still the one we are least keen to sell you, because three hours of a person's life is a great deal to spend on a number.",
          },
        ],
        what: "A fixed count of a chosen mantra, recited at the ghat and dedicated to your sankalp. The count and the hours are stated before the price, because the hours are the price.",
        who: "Anyone who wants a fixed count performed and recorded. You bring the intention. We will not name it for you, and we will not name an occasion to sell it to you.",
        receive:
          "An unbroken recording of the recitation with the count visible throughout, the full duration, not a highlight.",
        honesty: {
          is: "A count of recitations, performed at the ghat, recorded in full so that you can see the count was real, and dedicated to the person you named.",
          isNot:
            "Medicine, and not a treatment. If someone you love is ill, this is something you may do alongside their doctors, never instead of them. We will not sell you a second one because the first did not work, and we do not list any illness anywhere as a reason to buy it.",
        },
        notes: [
          {
            label: "The arithmetic, stated plainly",
            body: "1,008 repetitions of the Gayatri or the Mahamrityunjaya, recited properly, take about three hours, not the forty minutes this is commonly sold as. We used to charge fifty one dollars for those three hours, which was not a bargain, it was a price that could only be honoured by rushing. It is now five hundred and one, and all three hours are recorded.",
          },
          {
            label: "The 10,008 form is withdrawn",
            body: "Ten thousand repetitions is roughly thirty hours of one person's recitation. Priced honestly against those hours it would cost several thousand dollars, and we do not believe anyone should pay that for a count. We would rather not offer it than offer it at a price that only works if the hours are not really spent.",
          },
          {
            label: "If your sankalp mentions illness",
            body: "You will see one line before payment, and it will not block you: we will carry this prayer, we cannot promise a recovery, and we will never claim to.",
          },
          {
            label: "Mantras",
            body: "The list of mantras offered is under review by a pandit advisory. It is not published here until that review is finished.",
          },
        ],
      },
    ],
    kosh: {
      eyebrow: "Standing arrangement",
      title: "Snan Kosh, and the money we give back.",
      lede: "One payment placed against rites you have not chosen yet. What you do not spend comes back to you, automatically, at twenty four months. That is the whole product and it is the reason it exists.",
      sku: "SNF-KOSH",
      statement:
        "A Snan Kosh is money held in your name, spendable on anything in this catalog at the rates printed on this page. One hundred and eight dollars holds one hundred and thirty dollars of rite credit, and two thousand one hundred rupees holds two thousand five hundred. It is a little larger than what you paid, for a reason we will state in a moment. It is not a plan, not a membership and not a number of rites. If you place one and never use it, you lose nothing at all, because at twenty four months whatever is left is returned to the card that paid it, without you asking and without us writing to you first to see whether you might spend it instead.",
      tableTitle: "What a Kosh costs and what it holds",
      tableCaption: "Snan Kosh amounts on both ladders, with the balance each one carries.",
      heads: {
        ladder: "Ladder",
        place: "What you pay",
        spend: "What you can spend",
      },
      rows: [
        { ladder: "Vishwa Dar", place: "$108", spend: "$130" },
        { ladder: "Bharat Dar", place: "₹2,100", spend: "₹2,500" },
      ],
      withdrawn: {
        label: "What this replaced, and why",
        body: "Until 2026 we sold Varsh: twelve snans for one price, across a year. An honest household rhythm is two to four rites a year, not twelve. Which means the arithmetic behind Varsh only worked if most of it went unused, and a product that only works when it is not used is a product designed around forgetting. It is withdrawn. Anyone who bought one keeps every snan in it, and may convert the unused part to a Kosh at full value or take it back in cash, whichever they prefer.",
      },
      terms: [
        {
          label: "Unspent money is returned, not kept",
          body: "At twenty four months, whatever is left in your Kosh goes back to the card or account that paid it, automatically. You do not have to ask, you do not have to remember, and there is no form. We email you when it has gone back, not before, because a message saying your balance is about to expire is exactly the sort of pressure this arrangement exists to avoid.",
        },
        {
          label: "You can have it back at any time, for any reason",
          body: "Ask, at any point in the twenty four months, and the unspent part is returned in full. No reason required, no call, no offer to keep you, no extra clicks. It is the same one button as every other refund we do.",
        },
        {
          label: "How the refund is worked out",
          body: "We return what you paid, less the price of the rites you actually performed. If you paid $108, held $130 of balance, and performed $60 of rites, you get $48 back. You are never out of pocket for a rite that did not happen, and the extra balance is not something you have to earn back.",
        },
        {
          label: "Why the balance is larger than the payment",
          body: "Because one payment costs us one card fee instead of four or five, and because money in advance is worth something to a small company. That is the entire reason. It is not a reward, it does not buy a better rite, and it confers nothing on the rites you spend it on.",
        },
        {
          label: "The rates are held",
          body: "Every price on this page is held for your Kosh for the full twenty four months. If they rise, they do not rise for you. If they fall, you pay the lower one.",
        },
        {
          label: "Two messages, and no others",
          body: "One when the Kosh is placed, one when the unspent part is returned. Nothing in between. We will never write to tell you a balance is sitting unused, and we will never attach an occasion to it.",
        },
        {
          label: "What it cannot be",
          body: "Not transferable, not resellable, not redeemable for anything except rites we perform ourselves and the refund described above. You cannot gift the balance, and it cannot be spent by anyone but the household that placed it.",
        },
      ],
      honesty: {
        is: "Money placed with us before you have chosen the rites, held in your name, spendable on anything in this catalog at the rates shown here, and returned to you if it is not spent.",
        isNot:
          "A membership, a subscription, a bundle of rites, or a plan you can fall behind on. It confers nothing spiritual. An unspent Kosh is not an unfinished duty, and no message from us will ever suggest that it is.",
      },
    },
    ladder: {
      eyebrow: "Both rates",
      title: "Two prices, on one page.",
      lede: "The Vishwa Dar in dollars and the Bharat Dar in rupees. Both are printed here, in full, side by side, in both languages. Neither is hidden from the other and neither is chosen for you.",
      statement:
        "We publish two prices rather than one price converted. The Vishwa Dar is what a rite costs a household paying in dollars; the Bharat Dar is what the same rite costs a household paying in rupees. They are two real prices for two markets, neither is a discount off the other, and we would rather print both on the same page than pick one for you by your IP address.",
      reason: {
        label: "Why the two numbers are not one number converted",
        body: "The rite costs us the same to perform whichever ladder pays for it, so the difference is not in the water and we will not pretend it is. Part of it is real cost: a foreign card costs more to accept than a UPI transfer, several countries add sales tax to a streamed service, and serving a household eight timezones away means scheduling, a second language on the patra and answering at hours when nobody in India is awake. The rest of it is a decision, and here it is plainly. A rupee price set high enough to look right beside a dollar price would put this out of reach of the families who actually live beside these rivers. We would rather serve both than pick one, so the Bharat Dar is built from what these rites cost at the ghat, and the Vishwa Dar is built from what it costs to serve a household abroad. We do not publish the gap as a percentage, because a percentage would make one of them look like a discount, and neither of them is.",
      },
      ladders: [
        {
          name: "Vishwa Dar",
          deva: "विश्व दर · USD",
          note: "Built on shagun numbers ending in one. Other currencies are set once a quarter from this ladder and rounded to a local equivalent, never live FX, because a price that flickers reads as a bazaar.",
          steps: "11 · 21 · 31 · 51 · 81 · 108 · 151 · 251 · 501 · 1008",
        },
        {
          name: "Bharat Dar",
          deva: "भारत दर · INR",
          note: "Its own ladder, set against what these rites cost at the ghat, not translated from the dollar figure beside it.",
          steps: "101 · 251 · 501 · 751 · 1,100 · 2,100 · 5,100 · 11,000 · 21,000",
        },
      ],
      differencesTitle: "What each ladder actually buys",
      differencesLede:
        "If two households pay different amounts, the difference has to be visible, and it has to be in the service rather than in the rite. Here is every place the two differ, and every place they do not.",
      differencesCaption: "The two ladders compared, line by line.",
      differencesHeads: {
        key: "Aspect",
        vishwa: "Vishwa Dar",
        vishwaDeva: "विश्व दर, paid in dollars",
        bharat: "Bharat Dar",
        bharatDeva: "भारत दर, paid in rupees",
      },
      differences: [
        {
          key: "Who pays it",
          vishwa: "Any household paying with a non-Indian instrument, in dollars or the quarterly local equivalent.",
          bharat: "Any household paying with a rupee instrument, wherever in the world they happen to be sitting.",
        },
        {
          key: "How the number is set",
          vishwa: "From the cost of serving a household abroad, and from what a named private rite with proof actually sells for internationally.",
          bharat: "From what these rites cost at the ghat, which is the number a family in India already knows and would otherwise pay at the water's edge.",
        },
        {
          key: "Scheduling",
          vishwa: "Muhurat windows converted to your own clock, with a calendar file, and a second reminder at your local hour.",
          bharat: "IST throughout, with no conversion and no calendar file, because none is needed.",
        },
        {
          key: "Delivery",
          vishwa: "Recording and patra by email in English and Hindi, with support answered at hours that are the middle of the night in India.",
          bharat: "Recording and patra on WhatsApp in Hindi, with support in Indian hours.",
        },
        {
          key: "Payment",
          vishwa: "International cards and wallets, which cost us between three and five per cent to accept.",
          bharat: "UPI, RuPay and Indian-issued cards.",
        },
        {
          key: "Tax",
          vishwa: "Shown before any sales tax or VAT your country requires us to add. Where we must collect it, it appears before you pay, never after.",
          bharat: "The number shown is the number you pay. Indian tax treatment of this service is not settled yet, and until it is, any tax due comes out of the fare and not out of you.",
        },
        {
          key: "What is identical",
          vishwa: "The rite, the ritvik, the forty five seconds, the recording, the Naam Kshan, the patra and the refund policy.",
          bharat: "The rite, the ritvik, the forty five seconds, the recording, the Naam Kshan, the patra and the refund policy.",
        },
      ],
      eligibility: {
        label: "How the India rate is applied",
        body: "By your payment instrument, not your IP address. UPI, RuPay or an Indian-issued card pays the Bharat Dar. IP checks are trivially defeated and they punish people who travel. The currency selector stays visible and switchable everywhere, and both prices are shown before any card details are entered, never swapped afterwards. Some households abroad hold an Indian card and will pay the Bharat Dar with it. We know. We are not going to police that, and nobody will ever be asked to prove where they live.",
      },
      fee: {
        label: "This is a fee, not dakshina",
        body: "Dakshina is voluntary, given afterwards, in an amount the yajaman chooses. A fixed number in a checkout is a fee, शुल्क, and calling it dakshina would borrow the manners of a gift for a commercial transaction. If you wish to give dakshina, it is a separate optional amount at the end, and it reaches the ritvik in full, less only what the card network charges to move it, which we publish rather than absorb quietly.",
      },
      split: {
        label: "Where the fee goes",
        body: "The ritvik who performs the rite is paid the greater of ₹1,800 or twenty per cent of what his segment takes, whichever is larger. That formula is published on our ethics page and is fixed for twelve months, which is why raising a price raises his pay on the same day and by the same proportion. The rest covers the ghat body's permission, the camera and the connection, the card fee, tax, the storage of your recording for as long as we promised to keep it, and what remains is ours. We have not finished agreeing permission fees with every ghat body, so those last figures are not printed here yet. They will be printed here, as numbers, before booking opens. Nothing appears in this paragraph until it is true.",
      },
      cooling: {
        label: "Cancellation",
        body: "More than 24 hours before the rite, a full refund. Inside 24 hours, a free reschedule, and for a shared session, still a full refund, because a samuhik session runs whether or not you are in it. If a rite is not performed for any reason at all, the money is returned automatically and you do not have to ask.",
      },
      tableTitle: "Every rite, in both vessels, at both rates",
      tableCaption:
        "All rites in this catalog with their duration, the vessel each fare buys, and both published prices.",
      heads: {
        rite: "Rite",
        vessel: "Held as",
        duration: "Duration",
        usd: "Vishwa Dar",
        inr: "Bharat Dar",
      },
      premiumsTitle: "Premiums, each with its reason",
      premiumsLede:
        "A higher price on a holy day reads as extortion unless the reason is printed next to it. So it is printed next to it.",
      premiums: [
        {
          // The brahma muhurat window moves with sunrise, so no clock time is
          // printed here. Do not replace this with a fixed range.
          name: "Brahma Muhurat slot, the last watch before dawn",
          usd: "+$21",
          inr: "+₹501",
          reason:
            "The window moves with sunrise at each ghat, so no fixed clock time is printed here; the exact slot is confirmed against the panchang before it is offered. A full session runs about fifty three minutes and the window is forty eight, so a full session opens in Brahma Muhurat and finishes about five minutes into Pratah Sandhya. Either way the ritvik reaches the ghat in the dark. Waived on private vessels and on anything paid from a Snan Kosh.",
        },
        {
          name: "Parva day, Kartik Purnima, Makar Sankranti, Mahashivratri, Ganga Dussehra, Amavasya, Pitru Paksha",
          usd: "+$31",
          inr: "+₹751",
          reason: "Ghat access is contested and ritvik hours are scarce on these days.",
        },
        {
          name: "Kumbh or Ardh Kumbh at the host river",
          usd: "+$81",
          inr: "+₹2,100",
          reason: "Separate permissions and crowd management, booked on a separate calendar.",
        },
        {
          name: "Each name beyond the first, up to six, inside a Parivar Snan",
          usd: "$0",
          inr: "₹0",
          reason:
            "There is no per-name charge on top of a Parivar Snan and there never was a good reason for one. Six names take six of the eleven places in a segment, and that is already what the household price pays for. Beyond six we book a second Parivar rather than sell names one at a time, because past six the reading stops being a sankalp and becomes a list. The old rule allowed 21 names in a shared session; it is now six.",
        },
      ],
      freeTitle: "Never charged for",
      freeItems: [
        "The recording",
        "The Sankalp Patra",
        "Additional language versions of it",
        "A re-issue after a mispronunciation",
        "The verification page",
        "Timezone conversion",
        "The return of an unspent Snan Kosh",
      ],
    },
    refusals: {
      eyebrow: "The refusal list",
      title: "What we do not sell.",
      lede: "Every item here is revenue we have decided not to take, and two of them are revenue we used to take and stopped. It is published as a page rather than buried in terms, because a company's refusals tell you more than its promises.",
      items: [
        {
          name: "Dosha diagnosis and remedy rites, kaal sarp, manglik, pitru dosh, shani sade sati",
          reason:
            "Telling a stranger that something is wrong with their chart and then selling them the fix is fear, sold by the hour. We do not do it, in any packaging.",
        },
        {
          name: "Tripindi shraddha and comparable unsatisfied-ancestor rites",
          reason: "The entire sales premise is that your dead are in distress and that you caused it. No.",
        },
        {
          name: "Illness, a diagnosis or a surgery as an occasion to buy",
          reason:
            "You may name whatever you are carrying in your sankalp and we will carry it. But no rite on this site is listed against a condition, no page suggests one, and nobody will ever be sold a second japa because the first one did not work.",
        },
        {
          name: "Prepayment that expires into our pocket",
          reason:
            "Anything you place with us and do not spend is returned automatically at twenty four months, without you asking. A balance we keep because a household forgot is not revenue we are willing to book, and it is the easiest money in this industry to take.",
        },
        {
          name: "Twelve rites sold to a household that will perform three",
          reason:
            "We sold this. It was called Varsh and the arithmetic only worked if most of it went unused. It is withdrawn, everyone who bought one keeps everything in it, and the honest version of the same idea is the Snan Kosh above.",
        },
        {
          name: "Shipped prasad, Ganga jal, threads, rudraksha, yantras",
          reason: "Snanify is entirely digital. Nothing is ever posted to you, at any price.",
        },
        {
          name: "Asthi visarjan",
          reason:
            "It requires human remains to be carried to India. That is outside what a digital service can handle honourably, and we will not pretend otherwise.",
        },
        {
          name: "Pind daan at Gaya",
          reason:
            "Gaya carries a specific weight that we will not claim without a named, verified arrangement there. When we have one, we will name the person who holds it.",
        },
        {
          name: "Guarantees of outcome, a job, a visa, a pregnancy, a cure, a marriage",
          reason: "We cannot deliver these, and neither can anyone who is charging you for them.",
        },
        {
          name: "Urgency, scarcity and guilt",
          reason:
            "No countdown on any ancestral or bereavement page, no seats-remaining panic, no alarm colour, no upsell after a death, and no notification on an anniversary you did not ask for.",
        },
        {
          name: "Forwarded charity, annadaan and gau seva",
          reason:
            "Money sent from abroad to an Indian charity is regulated as foreign contribution and needs a named, registered recipient issuing its own receipt, not ours. Until such an arrangement exists and is audited, we do not take the money and call it a service.",
        },
      ],
      footnote:
        "If you find any of the above being sold on this site, it is a mistake and we want to hear about it.",
    },
    closing: {
      title: "Ask your family's purohit first.",
      lede: "We are not a replacement for the practice your family already keeps. Where we are useful is the distance, the ghat is there, you are here, and a rite can still be performed in your name and recorded honestly.",
      cta: "Begin your snan",
      ctaSecondary: "Back to the rivers",
    },
  },

  hi: {
    meta: {
      title: "सेवा सूची, हर अनुष्ठान, नाम सहित | स्नानिफ़ाई",
      description:
        "क्या संपन्न होता है, किसके द्वारा, कितनी देर, और दोनों दरों पर उसका मूल्य क्या है। स्नानिफ़ाई के सभी अनुष्ठान, डॉलर और रुपये की दरें साथ-साथ, और वह सूची जो हम नहीं बेचते।",
    },
    nav: {
      label: "सेवा सूची के अनुभाग",
      items: [
        { href: "#vessels", label: "दो प्रकार" },
        { href: "#included", label: "सदैव सम्मिलित" },
        { href: "#rites", label: "अनुष्ठान" },
        { href: "#kosh", label: "स्नान कोष" },
        { href: "#sankalp", label: "दोनों दरें" },
        { href: "#refusals", label: "जो हम नहीं करते" },
      ],
    },
    hero: {
      eyebrow: "सेवा सूची",
      title: "हर अनुष्ठान, नाम सहित।",
      lede: "क्या संपन्न होता है, किसके द्वारा, कितनी देर, और क्या नहीं होता। इस पृष्ठ का हर अनुष्ठान एक ही खंड के साथ आता है: यह क्या है, और यह क्या नहीं है। यहाँ एक भी पंक्ति ऐसी नहीं है जो आपको यह अनुभव कराने के लिए लिखी गई हो कि आपके जीवन में कुछ गड़बड़ है।",
      badge: "पूर्णतः डिजिटल · कुछ भी डाक से नहीं भेजा जाता",
      guaranteesLabel: "हर दर पर, बिना अपवाद",
      guarantees: [
        {
          n: "०१",
          t: "आपका नाम बोला जाता है",
          d: "घाट पर, अनुष्ठान करने वाले के मुख से, सस्वर। स्क्रीन पर दिखाया नहीं जाता, सूची में छापा नहीं जाता, बोला जाता है, कम से कम पैंतालीस सेकंड, इस पृष्ठ की हर दर पर।",
        },
        {
          n: "०२",
          t: "नाम क्षण",
          d: "आपकी रिकॉर्डिंग ठीक उसी सेकंड से खुलती है जब आपका नाम बोला गया, और वही समय आपके संकल्प पत्र पर अंकित रहता है।",
        },
        {
          n: "०३",
          t: "पत्र, जिसे जाँचा जा सके",
          d: "आपका पत्र जिसके पास हो वह सत्र, घाट, समय और वास्तव में अनुष्ठान करने वाले ऋत्विक की पुष्टि कर सकता है। आपका नाम, गोत्र और संकल्प तभी दिखते हैं जब आप स्वयं उन्हें दिखाना चुनें।",
        },
      ],
    },
    vessels: {
      eyebrow: "वास्तविक भेद",
      title: "अनुष्ठान दो प्रकार से संपन्न होता है।",
      lede: "नामों की संख्या नहीं, नदी नहीं, अवधि नहीं। भेद इस बात का है कि अनुष्ठान किस कक्ष में होता है, और कक्ष दो हैं। इस पृष्ठ की हर दर इन्हीं दो कक्षों में से किसी एक की दर है।",
      statement:
        "सामूहिक स्नान में आपका संकल्प पचास अन्य परिवारों के साथ एक ही सत्र में रखा जाता है, जैसे भोर के समय घाट सदा से होता आया है। निजी अनुष्ठान केवल आपके परिवार के लिए संपन्न होता है, और लागत का बड़ा भाग वहीं है, क्योंकि एक व्यक्ति की पूरी प्रातःवेला एक ही परिवार को जाती है। दोनों वास्तविक हैं। एक दूसरे से न्यून नहीं, वह केवल एक भिन्न कक्ष है।",
      nameNote:
        "अंग्रेज़ी में हम निजी अनुष्ठान को संक्षेप में Ekantik लिखते हैं। हिंदी में हम इसे सीधे निजी अनुष्ठान ही कहते हैं, यह व्यवस्था का वर्णन है, किसी सिद्धांत का दावा नहीं।",
      tableCaption: "दोनों प्रकारों का अंतर, पंक्ति दर पंक्ति।",
      heads: {
        row: "पक्ष",
        samuhik: "सामूहिक",
        samuhikDeva: "समूह में संपन्न",
        ekantik: "निजी अनुष्ठान",
        ekantikDeva: "एकांत में संपन्न",
      },
      columns: [
        {
          key: "सत्र किसके साथ",
          samuhik: "अधिकतम 51 संकल्प, ग्यारह से अधिक नहीं, ऐसे पाँच खंडों में",
          ekantik: "केवल आपका परिवार",
        },
        {
          key: "आपके संकल्प के लिए वाचन का समय",
          samuhik: "कम से कम 45 सेकंड, इससे कम कभी नहीं",
          ekantik: "कम से कम 45 सेकंड, और बिना किसी जल्दबाजी के",
        },
        {
          key: "आपके लिए क्या पढ़ा जाता है",
          samuhik: "आपका नाम और गोत्र",
          ekantik: "आपका नाम, गोत्र, और आपके अपने शब्दों में आपका संकल्प",
        },
        {
          key: "ऋत्विक",
          samuhik: "एक ऋत्विक, एक साझा अनुष्ठान",
          ekantik: "एक ऋत्विक, केवल आपका अनुष्ठान",
        },
        {
          key: "सत्र की अवधि",
          samuhik: "पूरा भरा हो तो लगभग 53 मिनट, अन्यथा उससे कम",
          ekantik: "25 से 180 मिनट, अनुष्ठान के अनुसार",
        },
        {
          key: "ऋत्विक से बातचीत",
          samuhik: "साझा सत्र में नहीं",
          ekantik: "तीन मिनट पहले, तीन मिनट बाद",
        },
        {
          key: "आपको क्या मिलता है",
          samuhik: "आपका नाम क्षण और घाट के साझा अंश",
          ekantik: "पूरा सत्र, बिना संपादन",
        },
        {
          key: "व्यय कैसे बँटता है",
          samuhik: "एक सत्र का सारा व्यय उसमें सम्मिलित सब परिवारों में बँटकर",
          ekantik: "एक सत्र का सारा व्यय केवल आप पर",
        },
        {
          key: "परंपरा",
          samuhik: "सामूहिक पूजा, हर घाट पर, प्रतिदिन",
          ekantik: "व्यक्तिगत अनुष्ठान, एक परिवार द्वारा कराया गया",
        },
      ],
      cap: {
        label: "51 की संख्या कहाँ से आई, और अवधि इस तरह क्यों लिखी गई है",
        body: "दो प्रकाशित नियमों से यह संख्या बनती है। हर नामित संकल्प के लिए कम से कम पैंतालीस सेकंड का वाचन, और एक खंड में ग्यारह से अधिक संकल्प कभी नहीं। इक्यावन अर्थात पाँच खंड, अर्थात लगभग अड़तीस मिनट का वाचन, और पाँचों खंडों में स्लेट, डुबकी तथा समापन के लगभग पंद्रह मिनट और: कुल मिलाकर लगभग तिरपन मिनट का सत्र। ब्रह्म मुहूर्त अड़तालीस मिनट का होता है, इसलिए भरा हुआ सत्र उसके भीतर पूरा नहीं बैठता। और उसे बैठाने के लिए हम तेज़ी से नहीं पढ़ेंगे। भरा हुआ सत्र ब्रह्म मुहूर्त में आरंभ होता है और प्रातः संध्या में लगभग पाँच मिनट जाकर समाप्त होता है; जो सत्र भरा न हो वह पहले ही समाप्त हो जाता है। आपकी रिकॉर्डिंग में वह सेकंड अंकित रहता है जब आपका अपना नाम बोला गया, इसलिए आपको हमारी बात पर भरोसा करने की आवश्यकता कभी नहीं पड़ती। जो संख्या नहीं बदलती वह है पैंतालीस सेकंड।",
      },
      privacy: {
        label: "साझा सत्र में क्या नहीं होता",
        body: "आपके अपने शब्दों में लिखा संकल्प केवल निजी अनुष्ठान में पढ़ा जाता है, जहाँ सुनने वाला केवल वही परिवार होता है जिसने उसे लिखा। सामूहिक सत्र में केवल नाम और गोत्र पढ़े जाते हैं, और आपकी रिकॉर्डिंग में आपका नाम क्षण तथा घाट के साझा अंश आते हैं, पचास अन्य परिवारों की बातें नहीं। लोग उस खाने में अपने जीवन की सबसे कठिन बातें लिखते हैं। उन्हें प्रसारित करने का अधिकार हमारा नहीं है।",
      },
    },
    included: {
      eyebrow: "स्थायी शर्तें",
      title: "हर अनुष्ठान में, हर दर पर।",
      lede: "दो कर्म कभी अलग से नहीं बेचे जाते, क्योंकि उनके बिना नीचे कुछ भी अर्थ नहीं रखता, और कुछ शर्तें पूरे पृष्ठ पर लागू होती हैं।",
      items: [
        {
          name: "संकल्प",
          deva: "Sankalp",
          sku: "SNF-RITE-SANKALP",
          meta: "हर अनुष्ठान में सम्मिलित · अलग से नहीं · हर नामित संकल्प के लिए कम से कम 45 सेकंड का वाचन, दोनों प्रकारों में",
          body: "वह औपचारिक घोषणा जो अनुष्ठान को व्यक्ति से जोड़ती है। ऋत्विक स्थान बताते हैं, पारंपरिक पंचांग के अनुसार समय बताते हैं, फिर आपका गोत्र और नाम लेकर आगे का सब कुछ आपको समर्पित करते हैं। आपका नाम क्षण यहीं का होता है।",
          honesty: {
            is: "अनुष्ठान से पूर्व यजमान का नाम लेने की पारंपरिक विधि, ठीक वैसी ही, जैसी उस हर व्यक्ति के लिए की जाती है जो घाट पर खड़ा होकर स्वयं यह वाक्य नहीं बोल सकता।",
            isNot:
              "कोई चमत्कार नहीं। नाम लिए जाने से आपकी परिस्थिति नहीं बदलती। यह एक भाव को अंकित और समर्पित करता है।",
          },
        },
        {
          name: "प्रतिनिधि स्नान",
          deva: "Pratinidhi Snan",
          sku: "SNF-RITE-SNAN",
          meta: "हर स्नान में सम्मिलित · लगभग 9 मिनट · बिना संपादन, बिना गति बढ़ाए, कभी पुराना फुटेज नहीं",
          body: "ऋत्विक नदी में उतरकर आपके प्रतिनिधि के रूप में स्नान की विधि संपन्न करते हैं, मार्जन, तीन डुबकियाँ, और हाथों में जल लेकर आपके संकल्प के साथ छोड़ना।",
          honesty: {
            is: "प्रतिनिधि के माध्यम से संपन्न अनुष्ठान, उनके लिए जो यात्रा नहीं कर सकते, यह एक पुरानी और सामान्य परंपरा है: रुग्ण, वृद्ध, और दूर बसे हुए लोग।",
            isNot:
              "आपका अपना स्नान नहीं। आपका शरीर गंगा में नहीं उतरता। जो कोई कहे कि प्रसारित अनुष्ठान और स्वयं जल में खड़े होना एक ही बात है, वह आपको कुछ बेच रहा है।",
          },
        },
      ],
      termsTitle: "जो पूरे पृष्ठ पर लागू है",
      terms: [
        {
          label: "2026 में कई दरें क्यों बढ़ीं",
          body: "हमने पहली बार पूरी लागत का ईमानदार आकलन किया। ग्यारह डॉलर में साझा स्नान की क़ीमत नहीं निकलती थी, न ऋत्विक के पैंतालीस सेकंड और खंड की आय में उनका बीस प्रतिशत हिस्सा, न कैमरा, न संपर्क, न कार्ड का शुल्क, न वह धनवापसी जिसका हमने वचन दिया है, और किसी भी खंड को इन सबसे पहले लगभग दो हज़ार सात सौ रुपये जुटाने पड़ते हैं। और जिस जप को हर जगह चालीस मिनट का बताकर बेचा जाता है, वह वास्तव में लगभग तीन घंटे लेता है। ऐसी स्थिति में संस्था या तो अनुष्ठान छोटा करती है, या दर बढ़ाती है। हमने दर बढ़ाई और अनुष्ठान वैसा ही रहने दिया। इस सूची में प्रवेश आज भी ग्यारह डॉलर से है, और वह पूरा अनुष्ठान है, नमूना नहीं।",
        },
        {
          label: "संकल्प नाम लेना है। तर्पण अर्पण है।",
          body: "ये दो भिन्न कर्म हैं और हम इन्हें अलग-अलग ही देते हैं। संकल्प में नाम आ जाना तर्पण नहीं है, और यहाँ कोई श्रेणी चुपचाप ऐसा संकेत नहीं देती। जल का अर्पण चाहिए तो वह नीचे अपनी दर के साथ अलग सूचीबद्ध है।",
        },
        {
          label: "दो शब्द हमारे गढ़े हुए हैं, परंपरा के नहीं",
          body: "नाम क्षण और प्रतिनिधि स्नान, ये इस सेवा की दो विशेषताओं के लिए स्नानिफ़ाई के दिए नाम हैं। ये पारंपरिक शब्द नहीं हैं और हम इन्हें परंपरा का वेश नहीं पहनाएँगे।",
        },
        {
          label: "हम किस परंपरा का अनुसरण करते हैं",
          body: "विधि उत्तर भारतीय स्मार्त परंपरा की है। श्री वैष्णव, माध्व, शैव, बंगाली, तमिल, मलयाली और अन्य संप्रदायों के परिवार अपनी विधि से अंतर देखेंगे। किसी एक परंपरा को ही 'सही' परंपरा बताकर प्रस्तुत करने के बजाय हम यह अंतर पहले ही स्पष्ट कह देना उचित मानते हैं।",
        },
        {
          label: "गोत्र अनिवार्य नहीं है",
          body: "बहुत से परिवार अपना गोत्र नहीं जानते, और बहुत से समुदायों में गोत्र होता ही नहीं। आप इसे खाली छोड़ सकते हैं। गोत्र ज्ञात न हो तो कश्यप गोत्र लिया जाता है, यह परंपरा का नियम है, कोई जुगाड़ नहीं, और किसी श्रेणी के लिए गोत्र शर्त नहीं है।",
        },
        {
          label: "पितृ कर्म कौन करा सकता है",
          body: "तर्पण और पिंडदान के अधिकार के नियम समुदाय और क्षेत्र के अनुसार बहुत भिन्न हैं, और कई परंपराओं में पिता के जीवित रहते पितृ तर्पण नहीं किया जाता। स्नानिफ़ाई की स्थिति, शुल्क लेने से पहले कही जा रही है, घाट पर बाद में नहीं: किसी भी लिंग का कोई भी वंशज ये अनुष्ठान करा सकता है। यदि आपके परिवार के अपने पुरोहित हैं तो पहले उनसे पूछ लें, हम आपके परिवार की परंपरा का विकल्प नहीं हैं।",
        },
        {
          label: "रिकॉर्डिंग का कभी शुल्क नहीं",
          body: "हर दर पर नि:शुल्क, प्रवेश दर पर कम से कम तीन वर्ष और उससे ऊपर सदैव सुरक्षित, डाउनलोड योग्य, और कभी भुगतान के पीछे नहीं। अपने पिता के नाम से हुए अनुष्ठान का वीडियो रखने के लिए आपसे पैसे नहीं माँगे जाएँगे।",
        },
        {
          label: "मन बदलने के लिए एक दिन",
          body: "एक सौ इक्यावन डॉलर और उससे ऊपर की हर दर पर, तथा हर स्नान कोष पर, शुल्क लेने से पहले 24 घंटे का विचार-काल रहता है। शोक और रात दो बजे हाथ में कार्ड, यह अच्छा मेल नहीं है, और एक दिन की प्रतीक्षा से हमारा कुछ नहीं जाता।",
        },
        {
          label: "समय पुष्टि तक अनंतिम है",
          body: "इस सेवा में दिखने वाला हर मुहूर्त तब तक 'अनंतिम' अंकित रहता है जब तक उस घाट के लिए पंचांग से उसकी पुष्टि न हो जाए, स्रोत और अयनांश के नाम सहित। उससे पहले हम किसी समय को तथ्य की तरह नहीं छापते।",
        },
      ],
    },
    rites: {
      eyebrow: "अनुष्ठान",
      title: "एक-एक कर, हर अनुष्ठान।",
      lede: "इनमें से कोई भी स्नान के साथ जोड़ा जा सकता है या अपने आप एक अलग सत्र के रूप में कराया जा सकता है। जो अनुष्ठान दोनों प्रकारों में उपलब्ध है, उसकी दो दरें छपी हैं, क्योंकि दोनों कक्षों का व्यय बहुत भिन्न है और उसे एक ही अंक में छिपाना ईमानदारी नहीं होगी।",
      labels: {
        what: "यह क्या है",
        who: "किनके लिए",
        receive: "आपको क्या मिलता है",
        need: "आपसे क्या चाहिए",
        duration: "अवधि",
        fares: "किस रूप में, और कितने में",
        alsoAvailable: "विस्तृत रूप",
        sku: "SKU",
      },
    },
    priceNote:
      "ये हमारी दरें हैं, और ये चुनी नहीं गईं, निकाली गई हैं। ये ऋत्विक के पारिश्रमिक, घाट पर कैमरे और संपर्क, प्रसारण, भंडारण, कार्ड शुल्क और हमारी धनवापसी के वचन, सबकी पूरी लागत जोड़कर बनी हैं। ये अंतिम नहीं हैं, और हम इसे छिपाएँगे नहीं। इनके पीछे दो बातें अभी अनिश्चित हैं, हर घाट निकाय फ़िल्मांकन की अनुमति के लिए कितना लेता है, और भारत में इस सेवा पर कर की क्या स्थिति बनती है, और इनमें से कोई भी किसी अंक को बदल सकती है। ऐसा हुआ तो नई दर लागू होने से पहले यहीं घोषित होगी, और जो स्नान कोष पहले से रखा है वह उन्हीं दरों पर चलता रहेगा जिन पर रखा गया था।",
    honestyLabels: {
      block: "स्पष्ट रूप से",
      is: "यह क्या है",
      isNot: "यह क्या नहीं है",
    },
    catalog: [
      {
        id: "deep-daan",
        index: "०१",
        name: "दीप दान",
        deva: "Deep Daan",
        duration: "लगभग 3 मिनट",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-DEEPDAAN",
            usd: "$11",
            inr: "₹101",
            note: "यहाँ से प्रवेश होता है, और इस पृष्ठ पर इक्यावन डॉलर से नीचे केवल यही है। चलते हुए सत्र के भीतर एक दीप का व्यय है बाती, पत्ता, और ऋत्विक के तीन मिनट।",
          },
        ],
        what: "आपके नाम से घाट पर एक दीप जलाकर जल पर रखा जाता है।",
        who: "सबसे छोटा और सबसे सच्चा आरंभ। जन्मदिन, कोई शुभ समाचार, छोटी सी कृतज्ञता, कार्तिक पूर्णिमा, देव दीपावली, पुण्यतिथि, या केवल एक कठिन सप्ताह।",
        receive:
          "रिकॉर्डिंग में नब्बे सेकंड: बाती जलती है, ज्योति पर आपका नाम बोला जाता है, दीप धारा पर रखा जाता है, और कैमरा उसे तब तक देखता रहता है जब तक वह दृश्य से बाहर न हो जाए। इसे बीच में काटा नहीं जाता।",
        honesty: {
          is: "एक दीप, जला, नामित, प्रवाहित। बस इतना ही, और यह सदा से पर्याप्त रहा है।",
          isNot:
            "यह कहीं पहुँचेगा नहीं। यह नदी पर रखा एक दीप है। और यह स्नान का छोटा रूप भी नहीं है, इसमें से कुछ भी घटाया नहीं गया: आपका नाम उतने ही पैंतालीस सेकंड बोला जाता है, और आपका पत्र उसी तरह जाँचा जा सकता है।",
        },
        notes: [
          {
            label: "निजी अनुष्ठान के भीतर",
            body: "यदि आपने पहले से कोई निजी अनुष्ठान कराया है तो उसमें जोड़ा गया दीप दान उन्हीं ग्यारह डॉलर का रहता है। सत्र पहले से आपका है, इसलिए एक दीप के लिए निजी दर लेना उचित नहीं होगा।",
          },
          {
            label: "सामग्री",
            body: "दीप पत्ते और रुई के होते हैं, न प्लास्टिक, न थर्मोकोल। आपूर्तिकर्ता और हर घाट के अपने नियम अभी तय हो रहे हैं; बुकिंग खुलने से पहले वे यहीं नाम सहित लिखे जाएँगे।",
          },
        ],
      },
      {
        id: "ekal-snan",
        index: "०२",
        name: "एकल स्नान",
        deva: "Ekal Snan",
        duration: "लगभग 9 मिनट का स्नान; आपके संकल्प के लिए कम से कम 45 सेकंड का वाचन",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-SNAN-EKAL",
            usd: "$51",
            inr: "₹501",
            note: "एक नामित संकल्प, जो अपने खंड के ग्यारह स्थानों में से एक लेता है। 2026 तक यह ग्यारह डॉलर था। ऋत्विक को ₹1,800 अथवा उनके खंड की आय का पाँचवाँ भाग, जो अधिक हो, वह मिलता है, इसलिए किसी भी खंड को उस न्यूनतम, कैमरे और संपर्क से पहले लगभग दो हज़ार सात सौ रुपये जुटाने पड़ते हैं। ग्यारह डॉलर पर इसके लिए एक ही खंड में नौ परिवार चाहिए थे। इक्यावन पर एक ही संकल्प इसे उठा लेता है, और पहला वर्ष वास्तव में ऐसा ही होता है।",
          },
          {
            vessel: "निजी",
            sku: "SNF-RITE-SNAN-EKANTIK",
            usd: "$251",
            inr: "₹5,100",
            note: "वही स्नान, सत्र में और कोई नहीं। एक ऋत्विक की प्रातःवेला के लगभग पच्चीस मिनट, उतनी ही देर कैमरा और घाट, आपका संकल्प आपके अपने शब्दों में, और उनसे तीन मिनट पहले तथा तीन मिनट बाद की बातचीत। इस पृष्ठ का हर निजी सत्र दो सौ इक्यावन डॉलर का है, क्योंकि व्यय उस पूरी प्रातःवेला का है।",
          },
        ],
        what: "आपके नाम और गोत्र से संपन्न प्रतिनिधि स्नान, मार्जन की विधि और तीन डुबकियाँ, और जल में उतरने से पूर्व आपके संकल्प की घोषणा। यही अनुष्ठान जब साझे सत्र के बजाय अकेले आपके लिए होता है तो वह एकांतिक स्नान है, और वही नीचे दूसरी दर है।",
        who: "एक व्यक्ति के लिए। लोग यहाँ प्रायः इसी के लिए आते हैं, और इस पृष्ठ का शेष सब कुछ इसी के चारों ओर बना है।",
        receive:
          "आपका नाम क्षण, उसके आसपास के घाट के अंश, और आपका संकल्प पत्र। निजी सत्र में पहले शब्द से अंतिम शब्द तक की पूरी रिकॉर्डिंग, बिना संपादन।",
        need: "एक नाम। गोत्र केवल तब जब आपको ज्ञात हो, और वह कभी अनिवार्य नहीं है।",
        variant: {
          name: "परिवार स्नान",
          deva: "Parivar Snan",
          duration: "छह नामित संकल्प, प्रत्येक के लिए कम से कम 45 सेकंड, एक गोत्र",
          note: "एक ही परिवार के छह नाम तक, हर नाम अपने पूरे पैंतालीस सेकंड में पढ़ा जाता है और हर नाम का अपना नाम क्षण होता है। छह नाम एक खंड के ग्यारह स्थानों में से छह लेते हैं, इसलिए परिवार को परिवार की तरह मूल्य दिया गया है। यह प्रति नाम लगभग पच्चीस डॉलर बैठता है, जबकि अकेला नाम इक्यावन का है, और यह अंतर हमारी ओर की वास्तविक बचत है, यह दावा नहीं कि साथ लिए गए छह नामों का मूल्य अधिक है: एक ही आदेश, एक गोत्र, एक पत्र, एक कार्ड शुल्क और एक ही परिवार से संवाद।",
          fares: [
            {
              vessel: "सामूहिक",
              sku: "SNF-RITE-SNAN-PARIVAR",
              usd: "$151",
              inr: "₹1,100",
              note: "साझा सत्र में छह नाम, जो अपने खंड के ग्यारह स्थानों में से छह लेते हैं।",
            },
          ],
        },
        honesty: {
          is: "नदी पर, आपके प्रतिनिधि के रूप में ऋत्विक द्वारा संपन्न स्नान, जिसमें आपका नाम और गोत्र सस्वर बोले जाते हैं, जो बिना संपादन रिकॉर्ड होता है, और जिसे बाद में आपका पत्र देखने वाला कोई भी जाँच सकता है।",
          isNot:
            "आपका अपना स्नान नहीं, और कोई कर्तव्य पूरा हो जाना भी नहीं। यह उस अनुष्ठान की जगह नहीं लेता जो आपके परिवार के पुरोहित कराते हैं, और साझा सत्र में होने से इसमें न कुछ घटता है, न कुछ जुड़ता है।",
        },
        notes: [
          {
            label: "बढ़ी हुई दर कहाँ गई",
            body: "बढ़ोतरी में से कुछ भी अनुष्ठान को छोटा या बड़ा करने में नहीं गया। सत्र की आय में ऋत्विक का हिस्सा हमारे नीति पृष्ठ पर प्रकाशित है और बारह महीनों के लिए तय है, इसलिए जिस दिन दर बढ़ी उसी दिन, उसी अनुपात में, उनका पारिश्रमिक भी बढ़ा।",
          },
        ],
      },
      {
        id: "pitru-tarpan",
        index: "०३",
        name: "पितृ तर्पण",
        deva: "Pitru Tarpan",
        duration: "लगभग 12 मिनट",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-TARPAN-PITRU",
            usd: "$81",
            inr: "₹751",
            note: "तर्पण की विधि पूरे सत्र के लिए एक बार संपन्न होती है और उसी के भीतर आपके दिवंगतों के नाम क्रम से लिए जाते हैं, अधिकतम तीन नाम, जो खंड के ग्यारह स्थानों में से तीन लेते हैं। यह स्नान से अधिक इसलिए है कि विधि लंबी है, तैयारी अधिक है और नाम अधिक पढ़े जाते हैं, इसलिए नहीं कि यह किस विषय पर है। शोक की क़ीमत हम नहीं लगाएँगे।",
          },
          {
            vessel: "निजी",
            sku: "SNF-RITE-TARPAN-PITRU-E",
            usd: "$251",
            inr: "₹5,100",
            note: "पूरे बारह मिनट, केवल आपके परिवार के लिए, आपका संकल्प आपके अपने शब्दों में, और रिकॉर्डिंग में किसी दूसरे परिवार का नाम नहीं। किसी भी अन्य निजी सत्र जितने ही दो सौ इक्यावन डॉलर, क्योंकि प्रातःवेला वही एक है।",
          },
        ],
        what: "जल की अंजलि, हाथों से अर्पित, और हर पूर्वज का नाम लेकर। पितरों के निमित्त सबसे प्राचीन और सबसे सरल कर्म।",
        who: "जिन्होंने किसी अपने को खोया है, पितृ पक्ष में, बरसी पर, अमावस्या को, माता-पिता की तिथि पर, अथवा वह परिवार जो अंत्येष्टि में सम्मिलित नहीं हो सका।",
        receive:
          "ऋत्विक दक्षिण दिशा की ओर मुख कर, जल और दर्भ लेकर आपके प्रत्येक दिवंगत का नाम, आपसे संबंध और वर्ष उच्चारित करते हैं। जल गिरता है। हर नाम का अपना नाम क्षण आपकी रिकॉर्डिंग में रहता है।",
        need: "नाम, आपसे संबंध, और देहावसान का वर्ष, अनुमानित वर्ष भी स्वीकार है। गोत्र केवल तब, जब वह आपके गोत्र से भिन्न हो और आपको ज्ञात हो।",
        variant: {
          name: "देव-ऋषि-पितृ तर्पण",
          deva: "Deva-Rishi-Pitru Tarpan",
          duration: "लगभग 18 मिनट",
          note: "त्रिविध रूप, देव, ऋषि और पितृ, तीनों के निमित्त क्रम से तर्पण, केवल पितरों के लिए नहीं। यह केवल निजी रूप में उपलब्ध है, क्योंकि अठारह मिनट की यह विधि दो परिवारों में बाँटी जाए तो एक को प्रतीक्षा करनी पड़ेगी।",
          fares: [
            {
              vessel: "निजी",
              sku: "SNF-RITE-TARPAN-TRI",
              usd: "$251",
              inr: "₹5,100",
              note: "बारह के स्थान पर अठारह मिनट, और दर वही, क्योंकि दोनों एक ही निजी सत्र में समा जाते हैं और व्यय सत्र का है।",
            },
          ],
        },
        honesty: {
          is: "नामित पितरों के निमित्त जल और स्मरण का अर्पण, उस वंशज की ओर से जो स्वयं उपस्थित नहीं हो सकता।",
          isNot:
            "कोई उद्धार नहीं। हम आपसे कभी नहीं कहेंगे कि आपके पितर कष्ट में हैं, अशांत हैं, अतृप्त हैं या प्रतीक्षा कर रहे हैं। यह हमें ज्ञात नहीं, किसी को ज्ञात नहीं। तर्पण इसलिए कीजिए कि आप उन्हें स्मरण करना चाहते हैं। और यह वार्षिक श्राद्ध नहीं है, न ही हम किसी को यह समझने देंगे कि इससे श्राद्ध पूरा हो जाता है।",
        },
        notes: [
          {
            label: "अधिकार",
            body: "अधिकार के नियम समुदाय के अनुसार भिन्न हैं, और कई परंपराओं में पिता के जीवित रहते पितृ तर्पण नहीं किया जाता। यहाँ किसी भी लिंग का कोई भी वंशज इसे करा सकता है। यदि आपके परिवार के अपने पुरोहित हैं तो पहले उनसे पूछ लें।",
          },
          {
            label: "इसके बाद आपके इनबॉक्स में कुछ नहीं आता",
            body: "तर्पण कराने से आप किसी सूची में नहीं जुड़ते। पुण्यतिथि पर कोई संदेश नहीं, जब तक आप स्वयं न कहें; उसके बाद कोई प्रस्ताव नहीं; और अनुष्ठान के बाद के दिनों में रिकॉर्डिंग तथा पत्र के अतिरिक्त कुछ भी नहीं।",
          },
        ],
      },
      {
        id: "nadi-puja",
        index: "०४",
        name: "नदी पूजा",
        deva: "Nadi Puja",
        duration: "लगभग 18 मिनट",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-NADIPUJA",
            usd: "$81",
            inr: "₹751",
            note: "उपचार क्रम पूरे सत्र के लिए एक बार संपन्न होता है, और आवाहन तथा नैवेद्य, दोनों समय आपका नाम और संकल्प उसी के भीतर पढ़े जाते हैं।",
          },
          {
            vessel: "निजी",
            sku: "SNF-RITE-NADIPUJA-E",
            usd: "$251",
            inr: "₹5,100",
            note: "पूरा क्रम केवल आपके परिवार के लिए, अंत में आपके पुष्प और आपका दीप जल पर, और दृश्य में किसी और का कुछ नहीं।",
          },
        ],
        what: "नदी का स्वयं देवी रूप में पूजन, आवाहन, जल, पुष्प, धूप, दीप, नैवेद्य और नमस्कार का उपचार क्रम, जल के किनारे, आपके नाम से। हरिद्वार में गंगा पूजा, मथुरा में यमुना पूजा, संगम पर त्रिवेणी पूजा, नदी के अनुसार।",
        who: "नया घर, नया व्यवसाय, विवाह, प्रथम संतान, पूर्ण हुआ व्रत, वर्षगाँठ। याचना के नहीं, कृतज्ञता के अवसर।",
        receive: "पूरा उपचार क्रम, हर चरण उपशीर्षक में नाम सहित, और अंत में पुष्प तथा दीप जल पर।",
        honesty: {
          is: "घाट पर, आपके संकल्प के साथ संपन्न नदी का पूजन।",
          isNot:
            "आपके अपने घर में, अपने परिवार के साथ होने वाले गृह प्रवेश या विवाह संस्कार का विकल्प नहीं। यह उनके साथ चलता है, उनकी जगह नहीं लेता, और इससे कोई ऐसा परिणाम नहीं निकलता जिसे हम लिखकर देने को तैयार हों।",
        },
        notes: [],
      },
      {
        id: "abhishek",
        index: "०५",
        name: "अभिषेक",
        deva: "Abhishek",
        duration: "लगभग 12 मिनट",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-ABHISHEK",
            usd: "$81",
            inr: "₹751",
            note: "सत्र के लिए एक अखंड धारा, और चलते पाठ के भीतर हर परिवार का नाम तथा गोत्र पढ़ा जाता है।",
          },
          {
            vessel: "निजी",
            sku: "SNF-RITE-ABHISHEK-E",
            usd: "$251",
            inr: "₹5,100",
            note: "धारा केवल आपके परिवार के लिए, उसी मंदिर में जिसका नाम पहले बता दिया जाता है, और पूरे बारह मिनट अखंड रिकॉर्ड।",
          },
        ],
        what: "घाट के समीप स्थित मंदिर में मूर्ति अथवा शिवलिंग पर नदी का जल अखंड धारा में, पाठ सहित, आपके नाम से अर्पित।",
        who: "महाशिवरात्रि, श्रावण के सोमवार, प्रदोष, अथवा कोई व्रत।",
        receive:
          "अखंड धारा, सुनाई देता पाठ, और उस मंदिर का नाम, कैमरे पर भी और आपके संकल्प पत्र पर भी।",
        honesty: {
          is: "घाट के समीप के मंदिर में, नदी के जल से, आपके नाम से संपन्न अभिषेक, और उस मंदिर का नाम हम बताते हैं।",
          isNot:
            "किसी ज्योतिर्लिंग के गर्भगृह के भीतर का अभिषेक नहीं। महाकालेश्वर के गर्भगृह तक हमारी पहुँच नहीं है और हम कभी ऐसा संकेत भी नहीं देंगे।",
        },
        notes: [
          {
            label: "कौन सा मंदिर",
            body: "हर घाट का मंदिर उसके प्रबंधक निकाय के साथ अभी तय हो रहा है। जब तक कोई मंदिर नामित और स्वीकृत न हो, वह यहाँ नहीं दिखेगा; और आपके पत्र पर वही मंदिर छपेगा जहाँ अनुष्ठान वास्तव में हुआ।",
          },
        ],
      },
      {
        id: "aarti-sankalp",
        index: "०६",
        name: "आरती संकल्प",
        deva: "Aarti Sankalp",
        duration: "लगभग 25 मिनट का प्रसारण; नाम एक नियत क्षण पर",
        fares: [
          {
            vessel: "सामूहिक",
            sku: "SNF-RITE-AARTI",
            usd: "$21",
            inr: "₹251",
            note: "दीप और स्नान के बीच की इकलौती सीढ़ी। दर नीची इसलिए बनी हुई है कि आरती वैसे भी होती है और यह स्नान के किसी खंड का स्थान नहीं लेती। हम एक दीप का, आरती के भीतर आपका नाम पढ़े जाने का, और कैमरे का व्यय ले रहे हैं। इसका कोई निजी रूप नहीं है और हम बनाकर खड़ा भी नहीं करेंगे।",
          },
        ],
        what: "घाट की संध्या आरती में आपका नाम और संकल्प पढ़ा जाता है, और आपकी ओर से उसी में एक दीप अर्पित किया जाता है।",
        who: "जो संध्या के घाट की ध्वनि और ज्योति देखना चाहते हैं, और वे परिवार जो तीन अलग-अलग समय-क्षेत्रों में बैठकर एक ही घड़ी में एक ही दृश्य देखना चाहते हैं।",
        receive: "पूरी आरती, सजीव, और जिस क्षण आपका नाम पढ़ा गया वह क्षण आपके नाम क्षण के रूप में अंकित।",
        honesty: {
          is: "एक सार्वजनिक आरती के भीतर आपका नाम पढ़ा जाना और आपकी ओर से दीप अर्पित होना, वह आरती आपके बुक करने या न करने पर भी होती।",
          isNot: "निजी आरती नहीं। आरती के आयोजक हम नहीं हैं और हम स्वयं को आयोजक बताते भी नहीं।",
        },
        notes: [
          {
            label: "व्यवस्था",
            body: "हर घाट की आरती समिति के साथ व्यवस्था अभी लिखित रूप में नहीं है। जब तक वह नहीं होती, यह अनुष्ठान बुकिंग के लिए नहीं खुलता, और जब खुलेगा, वह व्यवस्था यहीं एक सरल वाक्य में लिखी जाएगी।",
          },
        ],
      },
      {
        id: "path",
        index: "०७",
        name: "पाठ",
        deva: "Path",
        duration: "35 से 70 मिनट, ग्रंथ के अनुसार",
        fares: [
          {
            vessel: "निजी",
            sku: "SNF-RITE-PATH",
            usd: "$251",
            inr: "₹5,100",
            note: "विष्णु सहस्रनाम, लगभग 35 मिनट, अथवा हनुमान चालीसा ग्यारह बार, लगभग 40 मिनट। यह एक ऋत्विक की पूरी प्रातःवेला एक ही परिवार को देना है, और दर वही दो सौ इक्यावन डॉलर है जो हर निजी सत्र की है।",
          },
        ],
        what: "घाट पर, आपके नाम से किसी संपूर्ण ग्रंथ का पाठ। पहले अवधि बताई जाती है और दर उसी से निकलती है, कभी उलटा नहीं।",
        who: "कोई व्रत, कोई वर्षगाँठ, घर की वह परंपरा जो हर वर्ष निभाई जाती है, या वह ग्रंथ जिसे परिवार सदा साथ बैठकर पढ़ता आया है और इस वर्ष एकत्र नहीं हो सका।",
        receive:
          "पूरी, बिना संपादन की रिकॉर्डिंग, और अंत में ऋत्विक कैमरे पर सत्र संख्या बोलते हैं, जिससे रिकॉर्डिंग अपनी तिथि का प्रमाण स्वयं अपने भीतर रखती है।",
        variant: {
          name: "सुंदरकांड",
          deva: "Sundarkand",
          duration: "लगभग 70 मिनट",
          note: "बड़ा ग्रंथ, एक ही बैठक में पूरा पढ़ा जाता है, और दर छोटे ग्रंथों जितनी ही।",
          fares: [
            {
              vessel: "निजी",
              sku: "SNF-RITE-PATH-SUNDAR",
              usd: "$251",
              inr: "₹5,100",
              note: "पैंतीस के स्थान पर सत्तर मिनट का निरंतर पाठ, आरंभ से अंत तक बिना किसी कटाव के रिकॉर्ड, और एक रुपया अधिक नहीं। अँधेरे में की गई यात्रा, घाट, कैमरा और वह प्रातःवेला, ये सब वही रहते हैं, ग्रंथ चाहे कोई हो।",
            },
          ],
        },
        honesty: {
          is: "संपूर्ण ग्रंथ, पूरा का पूरा घाट पर पढ़ा गया, आपको समर्पित और बिना संपादन दिया गया।",
          isNot:
            "संक्षिप्त नहीं, गति बढ़ाकर नहीं, पहले से रिकॉर्ड किया हुआ नहीं, और परिणाम का कोई सौदा भी नहीं। पाठ से ऐसा कुछ नहीं निकलता जिसका हम वचन दे सकें, और यदि दे सकते तो उसे रिकॉर्ड करने की आवश्यकता ही न होती।",
        },
        notes: [
          {
            label: "इसकी दर इतनी क्यों है",
            body: "पहले यह इक्यावन डॉलर था। एक व्यक्ति का पैंतीस से सत्तर मिनट का अविभाजित ध्यान इक्यावन डॉलर में नहीं बिक सकता, बिना इसके कि या तो पाठ जल्दी-जल्दी हो या किसी को उसका उचित पारिश्रमिक न मिले। हम बड़ी संख्या और सच्ची अवधि, दोनों साथ छापकर निर्णय आप पर छोड़ना बेहतर मानते हैं।",
          },
          {
            label: "कौन से ग्रंथ",
            body: "रुद्री पाठ सहित अन्य ग्रंथ केवल वहीं जोड़े जाते हैं जहाँ उस घाट के ऋत्विक उन्हें नियमित रूप से पढ़ते हैं। जिसे कोई वास्तव में कर न सके, उसे हम सूची में नहीं रखते।",
          },
        ],
      },
      {
        id: "sankalpit-japa",
        index: "०८",
        name: "संकल्पित जप",
        deva: "Sankalpit Japa",
        duration: "1,008 जप, लगभग 3 घंटे",
        fares: [
          {
            vessel: "निजी",
            sku: "SNF-RITE-JAPA",
            usd: "$501",
            inr: "₹11,000",
            note: "तीन घंटे, जिनमें एक ऋत्विक जल के किनारे बैठकर और कुछ नहीं करते, और गणना दिखती रहती है, रिकॉर्डिंग अखंड रहती है। प्रति मिनट के हिसाब से यह इस पृष्ठ की सबसे सस्ती वस्तु है, और फिर भी इसे बेचने में हमारी रुचि सबसे कम है, क्योंकि किसी के जीवन के तीन घंटे एक संख्या पर लगाना बहुत है।",
          },
        ],
        what: "चुने हुए मंत्र की निश्चित संख्या, घाट पर, आपके संकल्प को समर्पित। संख्या और घंटे दर से पहले बताए जाते हैं, क्योंकि घंटे ही दर हैं।",
        who: "जो एक निश्चित संख्या संपन्न और अभिलिखित चाहते हैं। भाव आप लाइए। हम उसे आपके लिए नाम नहीं देंगे, और न ही कोई अवसर गिनाकर इसे बेचेंगे।",
        receive: "पूरी अवधि की अखंड रिकॉर्डिंग, गणना निरंतर दृश्यमान, अंश नहीं, संपूर्ण।",
        honesty: {
          is: "जप की एक निश्चित संख्या, घाट पर संपन्न, पूरी अवधि में अभिलिखित ताकि आप देख सकें कि संख्या वास्तविक थी, और उस व्यक्ति को समर्पित जिसका नाम आपने दिया।",
          isNot:
            "औषधि नहीं, उपचार नहीं। यदि आपका कोई अपना रुग्ण है, तो यह उनके चिकित्सकों के साथ किया जा सकता है, उनके स्थान पर कभी नहीं। 'पहली बार काम नहीं आया' कहकर हम आपको दूसरी बार नहीं बेचेंगे, और किसी रोग को इसे खरीदने का कारण बताकर हम कहीं नहीं लिखते।",
        },
        notes: [
          {
            label: "गणित, स्पष्ट रूप से",
            body: "गायत्री अथवा महामृत्युंजय का 1,008 जप, ठीक से किया जाए तो लगभग तीन घंटे लेता है, वे चालीस मिनट नहीं, जितना यह प्रायः बेचा जाता है। पहले हम उन्हीं तीन घंटों के इक्यावन डॉलर लेते थे, जो सस्ता सौदा नहीं था, वह ऐसी दर थी जो केवल जल्दबाजी से ही निभाई जा सकती थी। अब यह पाँच सौ एक है, और तीनों घंटे रिकॉर्ड होते हैं।",
          },
          {
            label: "10,008 वाला रूप वापस ले लिया गया है",
            body: "दस हज़ार जप अर्थात एक व्यक्ति का लगभग तीस घंटे का पाठ। उन घंटों के हिसाब से ईमानदार दर कई हज़ार डॉलर बैठती है, और हमें नहीं लगता कि किसी को एक संख्या के लिए इतना देना चाहिए। ऐसी दर पर देने से, जो केवल तब चलती है जब घंटे वास्तव में लगाए ही न जाएँ, न देना बेहतर है।",
          },
          {
            label: "यदि आपके संकल्प में रोग का उल्लेख हो",
            body: "भुगतान से पहले आपको एक पंक्ति दिखेगी, और वह आपको रोकेगी नहीं: हम यह प्रार्थना अवश्य ले चलेंगे। हम स्वस्थ होने का वचन नहीं दे सकते, और कभी नहीं देंगे।",
          },
          {
            label: "मंत्र",
            body: "मंत्रों की सूची विद्वत् परामर्श मंडल की समीक्षा में है। समीक्षा पूरी होने से पहले वह यहाँ प्रकाशित नहीं होगी।",
          },
        ],
      },
    ],
    kosh: {
      eyebrow: "स्थायी व्यवस्था",
      title: "स्नान कोष, और वह धन जो हम लौटा देते हैं।",
      lede: "एक बार का भुगतान, उन अनुष्ठानों के लिए जिन्हें आपने अभी चुना भी नहीं है। जो आप खर्च नहीं करते वह चौबीस महीने पर स्वयं आपके पास लौट आता है। यही पूरी व्यवस्था है, और यही इसके होने का कारण है।",
      sku: "SNF-KOSH",
      statement:
        "स्नान कोष आपके नाम पर रखा धन है, जो इस सूची के किसी भी अनुष्ठान पर, इसी पृष्ठ की दरों पर, खर्च किया जा सकता है। एक सौ आठ डॉलर पर एक सौ तीस डॉलर का शेष मिलता है, और दो हज़ार एक सौ रुपये पर दो हज़ार पाँच सौ। यह आपके दिए हुए से कुछ अधिक होता है, और उसका कारण हम अभी बताएँगे। यह न कोई योजना है, न सदस्यता, न अनुष्ठानों की गिनती। यदि आपने कोष रखा और कभी उपयोग नहीं किया तो आपका कुछ नहीं जाता, क्योंकि चौबीस महीने पर जो शेष है वह उसी कार्ड पर लौट जाता है जिससे भुगतान हुआ था, बिना आपके माँगे, और बिना इसके कि हम पहले आपको लिखकर टटोलें कि शायद आप खर्च ही कर दें।",
      tableTitle: "कोष की राशि और उसमें उपलब्ध शेष",
      tableCaption: "दोनों दरों पर स्नान कोष की राशियाँ, और हर राशि पर उपलब्ध शेष।",
      heads: {
        ladder: "दर",
        place: "आप कितना देते हैं",
        spend: "आप कितना खर्च कर सकते हैं",
      },
      rows: [
        { ladder: "विश्व दर", place: "$108", spend: "$130" },
        { ladder: "भारत दर", place: "₹2,100", spend: "₹2,500" },
      ],
      withdrawn: {
        label: "इससे पहले क्या था, और वह क्यों हटा",
        body: "2026 तक हम 'वर्ष' बेचते थे: एक दर में बारह स्नान, पूरे वर्ष के लिए। किसी परिवार की सच्ची लय वर्ष में दो से चार अनुष्ठान की होती है, बारह की नहीं। अर्थात वर्ष का गणित तभी बैठता था जब उसका बड़ा भाग अनुपयोगी रह जाए, और जो वस्तु तभी चलती है जब उसका उपयोग न हो, वह भूल जाने के भरोसे बनी वस्तु है। उसे हटा दिया गया है। जिन्होंने वह लिया था उनके सारे स्नान यथावत हैं, और शेष भाग वे चाहें तो पूरे मूल्य पर कोष में बदल सकते हैं, या नकद वापस ले सकते हैं।",
      },
      terms: [
        {
          label: "बिना खर्च हुआ धन लौटता है, रखा नहीं जाता",
          body: "चौबीस महीने पर आपके कोष में जो शेष है वह उसी कार्ड या खाते में स्वयं लौट जाता है जिससे भुगतान हुआ था। न आपको माँगना है, न याद रखना है, न कोई प्रपत्र भरना है। लौट जाने के बाद हम आपको सूचना भेजते हैं, पहले नहीं, क्योंकि 'आपका शेष समाप्त होने वाला है' जैसा संदेश ठीक वही दबाव है जिससे बचने के लिए यह व्यवस्था बनी है।",
        },
        {
          label: "आप जब चाहें, जिस कारण से चाहें, वापस ले सकते हैं",
          body: "चौबीस महीनों में कभी भी कहिए, और बिना खर्च हुआ भाग पूरा लौटा दिया जाता है। कारण बताना नहीं है, बात करनी नहीं है, रोकने का कोई प्रस्ताव नहीं आएगा, और अतिरिक्त क्लिक नहीं हैं। वही एक बटन, जो हर दूसरी धनवापसी के लिए है।",
        },
        {
          label: "वापसी की गणना कैसे होती है",
          body: "आपने जो दिया, उसमें से उन अनुष्ठानों का मूल्य घटाकर शेष लौटा दिया जाता है जो वास्तव में हुए। यदि आपने $108 दिए, शेष $130 मिला, और $60 के अनुष्ठान हुए, तो आपको $48 वापस मिलते हैं। जो अनुष्ठान हुआ ही नहीं उसके लिए आपकी जेब से कभी कुछ नहीं जाता, और अतिरिक्त शेष आपको कमाकर लौटाना नहीं पड़ता।",
        },
        {
          label: "शेष, दी गई राशि से अधिक क्यों होता है",
          body: "क्योंकि एक बार के भुगतान पर हमें चार-पाँच बार के बजाय एक बार कार्ड शुल्क देना पड़ता है, और क्योंकि पहले से मिला धन एक छोटी संस्था के लिए मूल्य रखता है। कारण बस इतना है। यह कोई पुरस्कार नहीं है, इससे अनुष्ठान बेहतर नहीं होता, और जिन अनुष्ठानों पर यह खर्च होता है उन्हें यह कुछ भी अतिरिक्त नहीं देता।",
        },
        {
          label: "दरें रोक दी जाती हैं",
          body: "इस पृष्ठ की हर दर आपके कोष के लिए पूरे चौबीस महीने वही बनी रहती है। दरें बढ़ें तो आपके लिए नहीं बढ़तीं। घटें तो आपसे कम ही लिया जाता है।",
        },
        {
          label: "दो संदेश, और कोई नहीं",
          body: "एक जब कोष रखा जाता है, एक जब बिना खर्च हुआ भाग लौटता है। बीच में कुछ नहीं। हम कभी यह बताने के लिए नहीं लिखेंगे कि आपका शेष पड़ा हुआ है, और उससे कोई अवसर जोड़कर तो कभी नहीं।",
        },
        {
          label: "यह क्या नहीं हो सकता",
          body: "यह किसी और को हस्तांतरित नहीं होता, बेचा नहीं जा सकता, और ऊपर लिखी वापसी तथा हमारे अपने किए हुए अनुष्ठानों के अतिरिक्त किसी और चीज़ में नहीं लगता। शेष को उपहार नहीं किया जा सकता, और उसे केवल वही परिवार खर्च कर सकता है जिसने उसे रखा।",
        },
      ],
      honesty: {
        is: "अनुष्ठान चुनने से पहले हमारे पास रखा गया धन, आपके नाम पर सुरक्षित, इस सूची के किसी भी अनुष्ठान पर इसी पृष्ठ की दरों पर खर्च योग्य, और खर्च न हो तो आपको लौटा दिया जाने वाला।",
        isNot:
          "न सदस्यता, न कोई मासिक योजना, न अनुष्ठानों का बंडल, और न ही ऐसी कोई व्यवस्था जिसमें आप पिछड़ सकते हों। इससे आध्यात्मिक रूप से कुछ नहीं मिलता। बिना खर्च हुआ कोष कोई अधूरा कर्तव्य नहीं है, और हमारा कोई संदेश कभी ऐसा संकेत नहीं देगा।",
      },
    },
    ladder: {
      eyebrow: "दोनों दरें",
      title: "दो दरें, एक ही पृष्ठ पर।",
      lede: "डॉलर में विश्व दर और रुपये में भारत दर। दोनों यहीं, पूरी, साथ-साथ, दोनों भाषाओं में छपी हैं। एक दूसरी से छिपाई नहीं गई, और आपके लिए चुनी भी नहीं गई।",
      statement:
        "हम एक दर को बदलकर नहीं, दो अलग दरें प्रकाशित करते हैं। विश्व दर वह है जो डॉलर में भुगतान करने वाले परिवार के लिए है; भारत दर वह जो रुपये में भुगतान करने वाले परिवार के लिए। ये दो बाज़ारों की दो वास्तविक दरें हैं, कोई दूसरी पर छूट नहीं, और हम इन्हें आपके IP पते के आधार पर चुनने के बजाय एक ही पृष्ठ पर छाप देना बेहतर समझते हैं।",
      reason: {
        label: "दोनों अंक एक ही अंक का रूपांतर क्यों नहीं हैं",
        body: "अनुष्ठान संपन्न कराने में हमारा व्यय दोनों दरों पर एक जैसा ही है, इसलिए अंतर जल में नहीं है और हम ऐसा दिखाएँगे भी नहीं। कुछ अंतर वास्तविक लागत का है: विदेशी कार्ड स्वीकार करना UPI से महँगा पड़ता है, कई देश प्रसारित सेवा पर बिक्री कर जोड़ते हैं, और आठ समय-क्षेत्र दूर बसे परिवार की सेवा में समय-निर्धारण, पत्र की दूसरी भाषा, और ऐसे घंटों में उत्तर देना पड़ता है जब भारत में कोई जागा नहीं होता। शेष अंतर एक निर्णय है, और वह यह रहा, सीधे शब्दों में। रुपये की दर इतनी ऊँची रखी जाए कि डॉलर की दर के बराबर दिखे, तो यह सेवा उन्हीं परिवारों की पहुँच से बाहर हो जाएगी जो वास्तव में इन्हीं नदियों के किनारे रहते हैं। एक को चुनने से बेहतर हमें दोनों की सेवा करना लगा, इसलिए भारत दर उस व्यय से बनी है जो ये अनुष्ठान घाट पर लेते हैं, और विश्व दर उस व्यय से जो विदेश में बसे परिवार की सेवा में लगता है। हम इस अंतर को प्रतिशत में नहीं छापते, क्योंकि प्रतिशत लिखते ही इनमें से एक छूट जैसी दिखने लगेगी, और इनमें से कोई छूट नहीं है।",
      },
      ladders: [
        {
          name: "विश्व दर",
          deva: "Vishwa Dar · USD",
          note: "एक पर समाप्त होने वाले शगुन अंकों पर आधारित। अन्य मुद्राएँ इसी सीढ़ी से तिमाही में एक बार तय होती हैं, सजीव विनिमय दर से नहीं, क्योंकि बदलते रहने वाले दाम बाज़ार जैसे लगते हैं।",
          steps: "11 · 21 · 31 · 51 · 81 · 108 · 151 · 251 · 501 · 1008",
        },
        {
          name: "भारत दर",
          deva: "Bharat Dar · INR",
          note: "अपनी अलग सीढ़ी, जो घाट पर इन अनुष्ठानों की वास्तविक लागत को देखकर बनी है, साथ लिखे डॉलर अंक से अनूदित नहीं।",
          steps: "101 · 251 · 501 · 751 · 1,100 · 2,100 · 5,100 · 11,000 · 21,000",
        },
      ],
      differencesTitle: "हर दर वास्तव में क्या देती है",
      differencesLede:
        "यदि दो परिवार अलग-अलग राशि देते हैं तो वह अंतर दिखना चाहिए, और वह अंतर सेवा में होना चाहिए, अनुष्ठान में नहीं। नीचे हर वह बात है जिसमें दोनों भिन्न हैं, और वे भी जिनमें भिन्न नहीं हैं।",
      differencesCaption: "दोनों दरों की तुलना, पंक्ति दर पंक्ति।",
      differencesHeads: {
        key: "पक्ष",
        vishwa: "विश्व दर",
        vishwaDeva: "डॉलर में भुगतान",
        bharat: "भारत दर",
        bharatDeva: "रुपये में भुगतान",
      },
      differences: [
        {
          key: "कौन देता है",
          vishwa: "वह हर परिवार जो भारत से बाहर जारी माध्यम से, डॉलर अथवा तिमाही में तय स्थानीय मुद्रा में भुगतान करता है।",
          bharat: "वह हर परिवार जो रुपये के माध्यम से भुगतान करता है, चाहे वह संसार में कहीं भी बैठा हो।",
        },
        {
          key: "अंक कैसे तय होता है",
          vishwa: "विदेश में बसे परिवार की सेवा के व्यय से, और इस बात से कि प्रमाण सहित नामित निजी अनुष्ठान अंतरराष्ट्रीय स्तर पर वास्तव में किस मूल्य पर बिकता है।",
          bharat: "घाट पर इन अनुष्ठानों की वास्तविक लागत से, अर्थात उसी अंक से जिसे भारत का परिवार पहले से जानता है और जल के किनारे वैसे भी देता।",
        },
        {
          key: "समय-निर्धारण",
          vishwa: "मुहूर्त आपकी अपनी घड़ी में बदलकर, कैलेंडर फ़ाइल सहित, और आपके स्थानीय समय पर एक दूसरी स्मरण-सूचना के साथ।",
          bharat: "आरंभ से अंत तक भारतीय समय में, न कोई रूपांतर, न कैलेंडर फ़ाइल, क्योंकि उसकी आवश्यकता ही नहीं।",
        },
        {
          key: "पहुँचाना",
          vishwa: "रिकॉर्डिंग और पत्र ईमेल पर, हिंदी और अंग्रेज़ी दोनों में, और सहायता उन घंटों में जो भारत में आधी रात होते हैं।",
          bharat: "रिकॉर्डिंग और पत्र व्हाट्सएप पर, हिंदी में, और सहायता भारतीय समय में।",
        },
        {
          key: "भुगतान",
          vishwa: "अंतरराष्ट्रीय कार्ड और वॉलेट, जिन्हें स्वीकार करने में हमें तीन से पाँच प्रतिशत लगता है।",
          bharat: "UPI, RuPay और भारत में जारी कार्ड।",
        },
        {
          key: "कर",
          vishwa: "आपका देश जो बिक्री कर या VAT जोड़वाता है, दर उससे पहले की है। जहाँ हमें वह वसूलना पड़ता है, वह भुगतान से पहले दिखता है, बाद में कभी नहीं।",
          bharat: "जो अंक दिख रहा है वही आप देते हैं। भारत में इस सेवा पर कर की स्थिति अभी तय नहीं है, और जब तक तय नहीं होती, देय कर इसी दर में से जाएगा, आपसे अलग से नहीं।",
        },
        {
          key: "क्या एक जैसा रहता है",
          vishwa: "अनुष्ठान, ऋत्विक, पैंतालीस सेकंड, रिकॉर्डिंग, नाम क्षण, पत्र और धनवापसी की नीति।",
          bharat: "अनुष्ठान, ऋत्विक, पैंतालीस सेकंड, रिकॉर्डिंग, नाम क्षण, पत्र और धनवापसी की नीति।",
        },
      ],
      eligibility: {
        label: "भारत दर कैसे लागू होती है",
        body: "आपके भुगतान माध्यम से, आपके IP पते से नहीं। UPI, RuPay अथवा भारत में जारी कार्ड पर भारत दर लगती है। IP की जाँच सरलता से चकमा दे दी जाती है और यात्रा करने वालों को व्यर्थ दंडित करती है। मुद्रा चुनने का विकल्प हर जगह दिखता और बदला जा सकता है, और दोनों दरें कार्ड की जानकारी माँगने से पहले ही दिख जाती हैं, बाद में बदली नहीं जातीं। विदेश में बसे कुछ परिवारों के पास भारतीय कार्ड होता है और वे उसी से भारत दर पर भुगतान करेंगे। हमें यह ज्ञात है। हम इसकी पहरेदारी नहीं करेंगे, और किसी से यह प्रमाण कभी नहीं माँगा जाएगा कि वह रहता कहाँ है।",
      },
      fee: {
        label: "यह शुल्क है, दक्षिणा नहीं",
        body: "दक्षिणा स्वेच्छा से, कर्म के बाद, यजमान द्वारा चुनी गई राशि में दी जाती है। चेकआउट में लिखा नियत अंक शुल्क है, और उसे दक्षिणा कहना एक व्यावसायिक लेन-देन पर उपहार का आवरण चढ़ाना होगा। यदि आप दक्षिणा देना चाहें तो वह अंत में एक अलग, ऐच्छिक राशि है, और वह पूरी की पूरी ऋत्विक तक पहुँचती है, केवल उतना घटाकर जितना उसे भेजने में कार्ड नेटवर्क लेता है, और वह अंक हम चुपचाप वहन करने के बजाय प्रकाशित करते हैं।",
      },
      split: {
        label: "शुल्क कहाँ जाता है",
        body: "अनुष्ठान करने वाले ऋत्विक को ₹1,800 अथवा उनके खंड की आय का बीस प्रतिशत, इनमें से जो अधिक हो, वह मिलता है। यह सूत्र हमारे नीति पृष्ठ पर प्रकाशित है और बारह महीनों के लिए तय है, इसीलिए दर बढ़ने पर उनका पारिश्रमिक उसी दिन, उसी अनुपात में बढ़ता है। शेष में घाट निकाय की अनुमति, कैमरा और संपर्क, कार्ड शुल्क, कर, तथा आपकी रिकॉर्डिंग को उतने वर्ष सुरक्षित रखना आता है जितने का हमने वचन दिया है; उसके बाद जो बचता है वह हमारा है। हर घाट निकाय के साथ अनुमति शुल्क अभी तय नहीं हुआ है, इसलिए वे अंक यहाँ अभी नहीं छपे हैं। बुकिंग खुलने से पहले वे यहीं, अंकों में, छाप दिए जाएँगे। जब तक वे सत्य न हों, इस अनुच्छेद में कोई संख्या नहीं आएगी।",
      },
      cooling: {
        label: "रद्द करना",
        body: "अनुष्ठान से 24 घंटे से अधिक पहले, पूरा धन वापस। 24 घंटे के भीतर, नि:शुल्क पुनर्निर्धारण, और साझा सत्र में फिर भी पूरा धन वापस, क्योंकि सामूहिक सत्र आपके होने या न होने पर भी होता है। यदि किसी भी कारण से अनुष्ठान न हो सका, तो धन स्वयं लौट आता है, आपको माँगना नहीं पड़ता।",
      },
      tableTitle: "हर अनुष्ठान, दोनों प्रकारों में, दोनों दरों पर",
      tableCaption:
        "इस सूची के सभी अनुष्ठान, उनकी अवधि, हर दर किस प्रकार के लिए है, और दोनों प्रकाशित दरें।",
      heads: {
        rite: "अनुष्ठान",
        vessel: "किस रूप में",
        duration: "अवधि",
        usd: "विश्व दर",
        inr: "भारत दर",
      },
      premiumsTitle: "अतिरिक्त शुल्क, कारण सहित",
      premiumsLede:
        "पर्व के दिन बढ़ा हुआ दाम तब तक शोषण लगता है जब तक उसका कारण साथ न लिखा हो। इसलिए कारण साथ लिखा है।",
      premiums: [
        {
          name: "ब्रह्म मुहूर्त, भोर से पहले का अंतिम प्रहर",
          usd: "+$21",
          inr: "+₹501",
          reason:
            "यह अवधि हर घाट पर सूर्योदय के साथ बदलती है, इसलिए यहाँ कोई नियत समय नहीं छापा गया; ठीक समय देने से पहले पंचांग से उसकी पुष्टि की जाती है। भरा हुआ सत्र लगभग तिरपन मिनट का होता है और अवधि अड़तालीस मिनट की, इसलिए भरा हुआ सत्र ब्रह्म मुहूर्त में आरंभ होकर प्रातः संध्या में लगभग पाँच मिनट जाकर समाप्त होता है। ऋत्विक तब भी अँधेरे में ही घाट पहुँचते हैं। निजी अनुष्ठानों पर और स्नान कोष से किए गए भुगतान पर यह नहीं लगता।",
        },
        {
          name: "पर्व दिवस, कार्तिक पूर्णिमा, मकर संक्रांति, महाशिवरात्रि, गंगा दशहरा, अमावस्या, पितृ पक्ष",
          usd: "+$31",
          inr: "+₹751",
          reason: "इन दिनों घाट पर स्थान और ऋत्विक का समय, दोनों दुर्लभ रहते हैं।",
        },
        {
          name: "कुंभ अथवा अर्ध कुंभ, संबंधित नदी पर",
          usd: "+$81",
          inr: "+₹2,100",
          reason: "अलग अनुमतियाँ और भीड़ प्रबंधन। यह अलग पंचांग पर बुक होता है।",
        },
        {
          name: "परिवार स्नान में पहले नाम के बाद हर नाम, छह तक",
          usd: "$0",
          inr: "₹0",
          reason:
            "परिवार स्नान के ऊपर प्रति नाम कोई शुल्क नहीं है, और कभी उसका कोई अच्छा कारण था भी नहीं। छह नाम एक खंड के ग्यारह स्थानों में से छह लेते हैं, और परिवार की दर इसी के लिए है। छह से अधिक होने पर हम एक-एक नाम बेचने के बजाय दूसरा परिवार स्नान लगाते हैं, क्योंकि उसके आगे वाचन संकल्प न रहकर सूची बनने लगता है। पहले साझा सत्र में 21 नामों तक की अनुमति थी; अब वह छह है।",
        },
      ],
      freeTitle: "इनका शुल्क कभी नहीं",
      freeItems: [
        "रिकॉर्डिंग",
        "संकल्प पत्र",
        "पत्र के अन्य भाषाओं वाले रूप",
        "नाम गलत बोले जाने पर नया पत्र",
        "सत्यापन पृष्ठ",
        "समयक्षेत्र की गणना",
        "बिना खर्च हुए स्नान कोष की वापसी",
      ],
    },
    refusals: {
      eyebrow: "निषेध सूची",
      title: "जो हम नहीं बेचते।",
      lede: "यहाँ लिखी हर वस्तु वह आय है जो हमने न लेने का निर्णय किया, और इनमें से दो वह आय हैं जो हम लेते थे और लेना बंद कर दिया। यह शर्तों में छिपाने के बजाय एक पृष्ठ के रूप में प्रकाशित है, क्योंकि किसी संस्था के इनकार उसके वादों से अधिक बताते हैं।",
      items: [
        {
          name: "दोष निदान और निवारण के अनुष्ठान, काल सर्प, मांगलिक, पितृ दोष, शनि साढ़े साती",
          reason:
            "किसी अनजान व्यक्ति से यह कहना कि उसकी कुंडली में कुछ गड़बड़ है और फिर उसका उपाय बेचना, यह घंटे के हिसाब से बेचा गया भय है। हम यह किसी भी रूप में नहीं करते।",
        },
        {
          name: "त्रिपिंडी श्राद्ध और 'अतृप्त पितर' जैसे अनुष्ठान",
          reason: "इनकी पूरी बिक्री इसी बात पर टिकी है कि आपके दिवंगत कष्ट में हैं और इसका कारण आप हैं। नहीं।",
        },
        {
          name: "रोग, निदान अथवा शल्यक्रिया को खरीदने का अवसर बनाना",
          reason:
            "आप अपने संकल्प में जो भी भार लिए हैं वह लिख सकते हैं और हम उसे साथ ले चलेंगे। पर इस साइट का कोई अनुष्ठान किसी रोग के सामने सूचीबद्ध नहीं है, कोई पृष्ठ ऐसा सुझाव नहीं देता, और किसी को दूसरा जप इसलिए कभी नहीं बेचा जाएगा कि पहला 'काम नहीं आया'।",
        },
        {
          name: "पहले से लिया गया वह धन जो समय बीतने पर हमारा हो जाए",
          reason:
            "जो आपने हमारे पास रखा और खर्च नहीं किया, वह चौबीस महीने पर बिना माँगे स्वयं लौट जाता है। जो शेष हमें इसलिए मिल जाए कि किसी परिवार को याद नहीं रहा, उसे आय मानकर लिखना हमें स्वीकार नहीं, और इस उद्योग में सबसे सरल कमाई यही है।",
        },
        {
          name: "उस परिवार को बारह अनुष्ठान बेचना जो तीन करेगा",
          reason:
            "यह हम बेचते थे। उसका नाम 'वर्ष' था और उसका गणित तभी बैठता था जब उसका बड़ा भाग अनुपयोगी रह जाए। वह हटा दिया गया है, जिन्होंने लिया था उनका सब कुछ यथावत है, और उसी विचार का ईमानदार रूप ऊपर लिखा स्नान कोष है।",
        },
        {
          name: "प्रसाद, गंगाजल, मौली, रुद्राक्ष, यंत्र, डाक से",
          reason: "स्नानिफ़ाई पूर्णतः डिजिटल है। किसी भी दर पर कुछ भी आपको भेजा नहीं जाता।",
        },
        {
          name: "अस्थि विसर्जन",
          reason:
            "इसके लिए मानव अवशेष भारत तक ले जाने पड़ते हैं। यह उस सीमा से बाहर है जिसे एक डिजिटल सेवा सम्मानपूर्वक निभा सके, और हम इसका दिखावा नहीं करेंगे।",
        },
        {
          name: "गया में पिंडदान",
          reason:
            "गया का अपना विशेष भार है, और बिना नामित तथा सत्यापित व्यवस्था के हम उस पर दावा नहीं करेंगे। जिस दिन ऐसी व्यवस्था होगी, हम उस व्यक्ति का नाम बताएँगे।",
        },
        {
          name: "परिणाम का वचन, नौकरी, वीज़ा, संतान, आरोग्य, विवाह",
          reason: "ये हम नहीं दे सकते, और जो इनका शुल्क ले रहा है वह भी नहीं दे सकता।",
        },
        {
          name: "जल्दबाजी, कमी और अपराधबोध",
          reason:
            "किसी भी पितृ या शोक से जुड़े पृष्ठ पर कोई उलटी गिनती नहीं, 'केवल दो स्थान शेष' नहीं, चेतावनी वाला लाल रंग नहीं, मृत्यु के बाद कोई अतिरिक्त बिक्री नहीं, और बिना आपकी अनुमति के पुण्यतिथि पर कोई सूचना नहीं।",
        },
        {
          name: "दान का हस्तांतरण, अन्नदान और गौ सेवा",
          reason:
            "विदेश से भारत की किसी संस्था को भेजा गया दान विदेशी अंशदान के नियमों में आता है, और उसके लिए नामित, पंजीकृत प्राप्तकर्ता चाहिए जो अपनी रसीद दे, हमारी नहीं। जब तक ऐसी व्यवस्था बनकर अंकेक्षित न हो जाए, हम यह धन लेकर उसे सेवा नहीं कहेंगे।",
        },
      ],
      footnote: "यदि इनमें से कुछ भी इस साइट पर बिकता दिखे तो वह हमारी चूक है, और हम उसे जानना चाहते हैं।",
    },
    closing: {
      title: "पहले अपने परिवार के पुरोहित से पूछिए।",
      lede: "जो परंपरा आपका परिवार पहले से निभाता है, हम उसका विकल्प नहीं हैं। हमारा काम केवल दूरी है, घाट वहाँ है, आप यहाँ हैं, और फिर भी अनुष्ठान आपके नाम से संपन्न होकर ईमानदारी से अभिलिखित हो सकता है।",
      cta: "स्नान आरंभ करें",
      ctaSecondary: "नदियों पर लौटें",
    },
  },
} satisfies Record<Lang, RitualsCopy>;
