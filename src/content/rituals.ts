import type { Lang } from "@/lib/content";

/**
 * Copy for /rituals, the offering catalog.
 *
 * PLACEHOLDER, PRICING. Every figure on this page (rite prices, premiums,
 * the two ladders) is provisional and pending real operational costing:
 * ritvik rates, ghat/samiti fees, streaming, payment processing and tax.
 * The UI presents them as ordinary prices, which is correct for a catalog,
 * but nothing here has been costed and no figure may be treated as final.
 *
 * PLACEHOLDER, OPERATIONS. Shrine names (Abhishek), lamp suppliers
 * (Deep Daan), aarti samiti arrangements (Aarti Sankalp) and the japa mantra
 * list are all unconfirmed. Rather than inventing them, each rite carries a
 * visible line stating that the detail is not yet settled and will be named
 * here before booking opens. Do not replace those lines with invented facts.
 *
 * The money split (§ ladder.split) deliberately prints no numbers. When the
 * costing exists, put the real three numbers there, not before.
 *
 * Structural note: `id`, `sku`, `usd` and `inr` must stay identical between
 * the `en` and `hi` objects. The anchors in the sub-nav are built from `id`,
 * so a drift there strands the Hindi page's deep links.
 */

export type Honesty = { is: string; isNot: string };

export type Note = { label: string; body: string };

export type Rite = {
  /** Anchor id. Identical in both locales. */
  id: string;
  sku: string;
  index: string;
  name: string;
  /** Devanagari name, shown in both locales. */
  deva: string;
  usd: string;
  inr: string;
  duration: string;
  vessel: string;
  what: string;
  who: string;
  receive: string;
  /** What the household has to give us before the rite can be performed. */
  need?: string;
  variant?: {
    name: string;
    deva: string;
    sku: string;
    usd: string;
    inr: string;
    duration: string;
    note: string;
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
      vessel: string;
      alsoAvailable: string;
      sku: string;
    };
  };
  /**
   * Visible provenance for the PLACEHOLDER pricing. Every figure on this page is
   * uncosted, so the page has to say so where the figures are, not only in a
   * source comment. Rendered beside the rite list and again beside the fee table.
   * Delete this field only when the numbers are real.
   */
  priceNote: string;
  honestyLabels: { block: string; is: string; isNot: string };
  catalog: Rite[];
  ladder: {
    eyebrow: string;
    title: string;
    lede: string;
    statement: string;
    ladders: { name: string; deva: string; note: string; steps: string }[];
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
        "What is performed, by whom, for how long, and what it is not. Every rite Snanify offers, both price ladders in full, and the list of things we refuse to sell.",
    },
    nav: {
      label: "Sections of the catalog",
      items: [
        { href: "#vessels", label: "Two vessels" },
        { href: "#included", label: "Always included" },
        { href: "#rites", label: "The rites" },
        { href: "#sankalp", label: "Fees" },
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
          d: "Aloud, at the ghat, by the person performing the rite. Not displayed on a screen. Not printed in a list. Spoken.",
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
      lede: "Not the number of names. Not the river. Not the length. What a person is actually buying is the room the rite happens in, and there are two of them.",
      statement:
        "A samuhik snan places your sankalp inside a session shared with up to fifty other households, the same way a ghat has always worked at dawn. An ekantik snan is held for your household alone. Both are real. One is not lesser than the other; it is a different room.",
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
          samuhik: "Up to 51 sankalps",
          ekantik: "Your household alone",
        },
        {
          key: "Names read aloud",
          samuhik: "Every one, always",
          ekantik: "Every one, always",
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
          samuhik: "30-45 minutes",
          ekantik: "25-120 minutes, by what is performed",
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
          key: "Precedent",
          samuhik: "Samuhik puja, performed at every ghat, every day",
          ekantik: "Vyaktigat anushthan, a rite commissioned by one household",
        },
      ],
      cap: {
        label: "Where 51 comes from",
        body: "A name and a gotra take about eight seconds to read. Fifty-one of them is roughly seven minutes of reading inside a session of forty, a length a person can actually stand at the ghat and speak without hurrying. The cap is derived from the guarantee, not chosen because the number is auspicious. If we ever raised it, we would have to stop reading every name. That is not permitted.",
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
          meta: "Included in every rite · not sold alone · about 8 seconds per name in a shared session, unhurried in a private one",
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
          body: "Anything above the $108 rung, and any recurring memorial, carries a 24-hour cooling-off period before the money is taken. Grief and a card at two in the morning are a bad combination, and a day's delay costs us almost nothing.",
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
      lede: "Each may be added to a snan or commissioned on its own as its own small session, a standalone rite still carries its sankalp, its recording, its Naam Kshan and its patra.",
      labels: {
        what: "What it is",
        who: "Who it is for",
        receive: "What you receive",
        need: "What we need from you",
        duration: "Duration",
        vessel: "Held as",
        alsoAvailable: "Extended form",
        sku: "SKU",
      },
    },
    priceNote:
      "Every price on this page is provisional. Nothing here has been costed against ritvik rates, ghat fees, streaming and payment charges yet, and no figure is final until it is. The confirmed prices will be published here before booking opens.",
    honestyLabels: {
      block: "Honestly",
      is: "What this is",
      isNot: "What this is not",
    },
    catalog: [
      {
        id: "pitru-tarpan",
        sku: "SNF-RITE-TARPAN-PITRU",
        index: "01",
        name: "Pitru Tarpan",
        deva: "पितृ तर्पण",
        usd: "$21",
        inr: "₹501",
        duration: "about 12 minutes",
        vessel: "Samuhik or Ekantik",
        what: "Water offered to the departed, poured from the hands with each ancestor named. The oldest and the simplest of the ancestral rites.",
        who: "Anyone who wishes to remember someone they have lost, during Pitru Paksha, on a barsi, on an amavasya, on a parent's tithi, or by a family that could not be at the funeral.",
        receive:
          "The ritvik faces south, takes water and darbha, and names each of your departed in turn, name, relationship to you, and the year. The water falls. Each name has its own Naam Kshan in your recording.",
        need: "A name, the relationship to you, and the year of passing, an approximate year is accepted. A gotra only if it differs from yours, and only if you know it.",
        variant: {
          name: "Deva-Rishi-Pitru Tarpan",
          deva: "देव-ऋषि-पितृ तर्पण",
          sku: "SNF-RITE-TARPAN-TRI",
          usd: "$31",
          inr: "₹751",
          duration: "about 18 minutes",
          note: "The threefold form, offerings made to the devas, the rishis and the pitrus in sequence, rather than to the pitrus alone.",
        },
        honesty: {
          is: "An offering of water and remembrance to named ancestors, performed by a ritvik on behalf of a descendant who cannot be present.",
          isNot:
            "A rescue. We will never tell you your ancestors are suffering, restless, unsatisfied or waiting. We do not know that, and nobody does. Perform tarpan because you wish to remember them.",
        },
        notes: [
          {
            label: "Adhikara",
            body: "Eligibility rules differ by community, and several traditions hold that pitru tarpan is not performed while one's father is living. Any descendant of any gender may commission it here. If your family keeps a purohit, ask them first.",
          },
        ],
      },
      {
        id: "deep-daan",
        sku: "SNF-RITE-DEEPDAAN",
        index: "02",
        name: "Deep Daan",
        deva: "दीप दान",
        usd: "$11",
        inr: "₹101",
        duration: "about 3 minutes",
        vessel: "Samuhik or Ekantik",
        what: "A lamp lit at the ghat in your name and set on the water.",
        who: "The smallest honest way in. A birthday, a good result, a small thanksgiving, Kartik Purnima, Dev Deepawali, a death anniversary, or simply a difficult week.",
        receive:
          "Ninety seconds of your recording: the wick catches, your name is spoken over the flame, the lamp is set on the current, and the camera follows it until it leaves the frame. It is not cut short.",
        honesty: {
          is: "A lamp, lit, named, floated. That is the whole of it, and it has always been enough.",
          isNot: "Going to arrive anywhere. It is a lamp on a river.",
        },
        notes: [
          {
            label: "Materials",
            body: "Lamps are leaf and cotton, no plastic, no thermocol. The supplier and each ghat's own rules on floating lamps are still being confirmed and will be named here before this rite opens for booking.",
          },
        ],
      },
      {
        id: "nadi-puja",
        sku: "SNF-RITE-NADIPUJA",
        index: "03",
        name: "Nadi Puja",
        deva: "नदी पूजा",
        usd: "$31",
        inr: "₹751",
        duration: "about 18 minutes",
        vessel: "Samuhik or Ekantik",
        what: "Worship of the river herself, the upachara sequence of invocation, water, flowers, incense, lamp, offering and salutation, performed at the water's edge in your name. Ganga Puja at Haridwar, Yamuna Puja at Mathura, Triveni Puja at the Sangam, and so on by river.",
        who: "A new house, a new business, a marriage, a first child, a vow completed, an anniversary. Occasions of gratitude rather than petition.",
        receive:
          "The full upachara sequence, each step named in the subtitles as it happens, with flowers and the lamp set on the water at the close.",
        honesty: {
          is: "A devotional puja to the river, performed with your sankalp, at the ghat.",
          isNot:
            "A substitute for a griha pravesh or a wedding rite performed in your own home with your own family. It accompanies those. It does not replace them.",
        },
        notes: [],
      },
      {
        id: "abhishek",
        sku: "SNF-RITE-ABHISHEK",
        index: "04",
        name: "Abhishek",
        deva: "अभिषेक",
        usd: "$31",
        inr: "₹751",
        duration: "about 12 minutes",
        vessel: "Samuhik or Ekantik",
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
        sku: "SNF-RITE-AARTI",
        index: "05",
        name: "Aarti Sankalp",
        deva: "आरती संकल्प",
        usd: "$21",
        inr: "₹501",
        duration: "about 25 minutes of stream; your name read at a fixed point",
        vessel: "Samuhik",
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
        id: "sankalpit-japa",
        sku: "SNF-RITE-JAPA",
        index: "06",
        name: "Sankalpit Japa",
        deva: "संकल्पित जप",
        usd: "$51",
        inr: "₹1,100",
        duration: "1,008 repetitions, about 3 hours",
        vessel: "Ekantik only",
        what: "A fixed count of a chosen mantra, recited at the ghat and dedicated to your sankalp.",
        who: "Anyone who wants a fixed count performed and recorded. You bring the intention. We will not name it for you, and we will not name an occasion to sell it to you.",
        receive:
          "An unbroken recording of the recitation with the count visible throughout, the full duration, not a highlight.",
        variant: {
          name: "Sankalpit Japa, 10,008",
          deva: "संकल्पित जप, दस सहस्र",
          sku: "SNF-RITE-JAPA-10K",
          usd: "$251",
          inr: "₹5,100",
          duration: "about 30 hours of recitation, across several days",
          note: "Recorded in full across each day's sitting, with the running count carried forward on camera between them.",
        },
        honesty: {
          is: "A count of recitations, performed at the ghat, recorded in full so that you can see the count was real, and dedicated to the person you named.",
          isNot:
            "Medicine, and not a treatment. If someone you love is ill, this is something you may do alongside their doctors, never instead of them. We will not sell you a second one because the first did not work.",
        },
        notes: [
          {
            label: "The arithmetic, stated plainly",
            body: "1,008 repetitions of the Gayatri or the Mahamrityunjaya, recited properly, take about three hours, not the forty minutes this is commonly sold as. We would rather charge for three hours and record all of them than sell you a number we cannot perform.",
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
      {
        id: "path",
        sku: "SNF-RITE-PATH",
        index: "07",
        name: "Path",
        deva: "पाठ",
        usd: "$51",
        inr: "₹1,100",
        duration: "35-70 minutes, by text",
        vessel: "Ekantik only",
        what: "The recitation of a complete text at the ghat in your name, Vishnu Sahasranama (about 35 minutes), Hanuman Chalisa eleven times (about 40 minutes), or Sundarkand (about 70 minutes).",
        who: "A vow, an anniversary, a household observance you keep every year, or a text your family has always read together and cannot gather to read this year.",
        receive:
          "The full unedited recording, with the session ID spoken aloud on camera at the close so the recording carries the proof of its own date.",
        honesty: {
          is: "A complete text, recited in full at the ghat, dedicated to you, and delivered unedited.",
          isNot: "Abridged, sped up, or pre-recorded.",
        },
        notes: [
          {
            label: "Which texts",
            body: "Additional texts, including Rudri path, are added only where the ritvik at that ghat recites them regularly. We do not list a text before someone can actually perform it.",
          },
        ],
      },
    ],
    ladder: {
      eyebrow: "Fees",
      title: "Two prices, on one page.",
      lede: "The Vishwa Dar in dollars and the Bharat Dar in rupees. Both are printed here, side by side, in both languages.",
      statement:
        "We publish two prices rather than one price converted. The Vishwa Dar is what a rite costs a household paying in dollars; the Bharat Dar is what the same rite costs a household paying in rupees. They are two real prices for two markets, neither is a discount off the other, and we would rather print both on the same page than pick one for you by your IP address.",
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
      eligibility: {
        label: "How the India rate is applied",
        body: "By your payment instrument, not your IP address. UPI, RuPay or an Indian-issued card pays the Bharat Dar. IP checks are trivially defeated and they punish people who travel. The currency selector stays visible and switchable everywhere, and if a payment is not eligible the message says so plainly, without insinuation.",
      },
      fee: {
        label: "This is a fee, not dakshina",
        body: "Dakshina is voluntary, given afterwards, in an amount the yajaman chooses. A fixed number in a checkout is a fee, शुल्क, and calling it dakshina would borrow the manners of a gift for a commercial transaction. If you wish to give dakshina, it is a separate optional amount at the end, and it goes to the ritvik in full.",
      },
      split: {
        label: "Where the fee goes",
        body: "Of every fee, a share goes to the ritvik who performs the rite, a share to the ghat body whose permission makes it possible, and a share to Snanify. We have not finished costing the operation, so the three numbers are not printed here yet. They will be printed here, as numbers, before booking opens. Nothing appears in this paragraph until it is true.",
      },
      cooling: {
        label: "Cancellation",
        body: "More than 24 hours before the rite, a full refund. Inside 24 hours, a free reschedule, and for a shared session, still a full refund, because a samuhik session runs whether or not you are in it. If a rite is not performed for any reason at all, the money is returned automatically and you do not have to ask.",
      },
      tableTitle: "Everything on this page, at both rates",
      tableCaption: "All rites in this catalog with their duration, vessel and both published prices.",
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
            "The window moves with sunrise at each ghat, so no fixed clock time is printed here; the exact slot is confirmed against the panchang before it is offered. Either way the ritvik reaches the ghat in the dark. Waived on annual and private vessels.",
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
          name: "Each name beyond your tier's count, to a maximum of 21 in a shared session",
          usd: "+$11",
          inr: "+₹251",
          reason: "Every name adds reading time to the session.",
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
      ],
    },
    refusals: {
      eyebrow: "The refusal list",
      title: "What we do not sell.",
      lede: "Every item here is revenue we have decided not to take. It is published as a page rather than buried in terms, because a company's refusals tell you more than its promises.",
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
            "Money routed abroad for charity needs a named, audited, registered partner and receipts issued by that partner rather than by us. Until that exists, we do not take the money and call it a service.",
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
        "क्या संपन्न होता है, किसके द्वारा, कितनी देर, और क्या नहीं होता। स्नानिफ़ाई के सभी अनुष्ठान, दोनों दरें, और वह सूची जो हम नहीं बेचते।",
    },
    nav: {
      label: "सेवा सूची के अनुभाग",
      items: [
        { href: "#vessels", label: "दो प्रकार" },
        { href: "#included", label: "सदैव सम्मिलित" },
        { href: "#rites", label: "अनुष्ठान" },
        { href: "#sankalp", label: "शुल्क" },
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
          d: "घाट पर, अनुष्ठान करने वाले के मुख से, सस्वर। स्क्रीन पर दिखाया नहीं जाता, सूची में छापा नहीं जाता, बोला जाता है।",
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
      lede: "नामों की संख्या नहीं, नदी नहीं, अवधि नहीं। भेद इस बात का है कि अनुष्ठान किस कक्ष में होता है, और कक्ष दो हैं।",
      statement:
        "सामूहिक स्नान में आपका संकल्प पचास अन्य परिवारों के साथ एक ही सत्र में रखा जाता है, जैसे भोर के समय घाट सदा से होता आया है। निजी अनुष्ठान केवल आपके परिवार के लिए संपन्न होता है। दोनों वास्तविक हैं। एक दूसरे से न्यून नहीं, वह केवल एक भिन्न कक्ष है।",
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
          samuhik: "51 संकल्पों तक",
          ekantik: "केवल आपका परिवार",
        },
        {
          key: "नाम सस्वर",
          samuhik: "हर नाम, सदैव",
          ekantik: "हर नाम, सदैव",
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
          samuhik: "30-45 मिनट",
          ekantik: "25-120 मिनट, अनुष्ठान के अनुसार",
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
          key: "परंपरा",
          samuhik: "सामूहिक पूजा, हर घाट पर, प्रतिदिन",
          ekantik: "व्यक्तिगत अनुष्ठान, एक परिवार द्वारा कराया गया",
        },
      ],
      cap: {
        label: "51 की संख्या कहाँ से आई",
        body: "एक नाम और एक गोत्र पढ़ने में लगभग आठ सेकंड लगते हैं। इक्यावन नाम अर्थात लगभग सात मिनट का वाचन, चालीस मिनट के सत्र के भीतर, इतना समय ऋत्विक बिना जल्दबाजी के दे सकते हैं। यह सीमा वचन से निकली है, किसी शुभ अंक से नहीं। यदि हम इसे बढ़ाएँ तो हमें हर नाम पढ़ना छोड़ना पड़ेगा, और इसकी अनुमति नहीं है।",
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
          meta: "हर अनुष्ठान में सम्मिलित · अलग से नहीं · साझा सत्र में प्रति नाम लगभग आठ सेकंड, निजी सत्र में बिना जल्दबाजी",
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
          body: "$108 से ऊपर की हर श्रेणी और हर स्मृति सदस्यता में शुल्क लेने से पहले 24 घंटे का विचार-काल रहता है। शोक और रात दो बजे हाथ में कार्ड, यह अच्छा मेल नहीं है, और एक दिन की प्रतीक्षा से हमारा कुछ नहीं जाता।",
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
      lede: "इनमें से कोई भी स्नान के साथ जोड़ा जा सकता है या अपने आप एक छोटे सत्र के रूप में कराया जा सकता है, अकेले कराने पर भी संकल्प, रिकॉर्डिंग, नाम क्षण और पत्र उसी तरह मिलते हैं।",
      labels: {
        what: "यह क्या है",
        who: "किनके लिए",
        receive: "आपको क्या मिलता है",
        need: "आपसे क्या चाहिए",
        duration: "अवधि",
        vessel: "किस रूप में",
        alsoAvailable: "विस्तृत रूप",
        sku: "SKU",
      },
    },
    priceNote:
      "इस पृष्ठ की हर दर अभी अनंतिम है। ऋत्विक का पारिश्रमिक, घाट का शुल्क, प्रसारण और भुगतान के व्यय, इनके आधार पर लागत का आकलन अभी पूरा नहीं हुआ है, और जब तक नहीं होता, कोई अंक अंतिम नहीं है। बुकिंग खुलने से पहले पुष्ट दरें यहीं प्रकाशित की जाएँगी।",
    honestyLabels: {
      block: "स्पष्ट रूप से",
      is: "यह क्या है",
      isNot: "यह क्या नहीं है",
    },
    catalog: [
      {
        id: "pitru-tarpan",
        sku: "SNF-RITE-TARPAN-PITRU",
        index: "०१",
        name: "पितृ तर्पण",
        deva: "Pitru Tarpan",
        usd: "$21",
        inr: "₹501",
        duration: "लगभग 12 मिनट",
        vessel: "सामूहिक अथवा निजी",
        what: "जल की अंजलि, हाथों से अर्पित, और हर पूर्वज का नाम लेकर। पितरों के निमित्त सबसे प्राचीन और सबसे सरल कर्म।",
        who: "जिन्होंने किसी अपने को खोया है, पितृ पक्ष में, बरसी पर, अमावस्या को, माता-पिता की तिथि पर, अथवा वह परिवार जो अंत्येष्टि में सम्मिलित नहीं हो सका।",
        receive:
          "ऋत्विक दक्षिण दिशा की ओर मुख कर, जल और दर्भ लेकर आपके प्रत्येक दिवंगत का नाम, आपसे संबंध और वर्ष उच्चारित करते हैं। जल गिरता है। हर नाम का अपना नाम क्षण आपकी रिकॉर्डिंग में रहता है।",
        need: "नाम, आपसे संबंध, और देहावसान का वर्ष, अनुमानित वर्ष भी स्वीकार है। गोत्र केवल तब, जब वह आपके गोत्र से भिन्न हो और आपको ज्ञात हो।",
        variant: {
          name: "देव-ऋषि-पितृ तर्पण",
          deva: "Deva-Rishi-Pitru Tarpan",
          sku: "SNF-RITE-TARPAN-TRI",
          usd: "$31",
          inr: "₹751",
          duration: "लगभग 18 मिनट",
          note: "त्रिविध रूप, देव, ऋषि और पितृ, तीनों के निमित्त क्रम से तर्पण, केवल पितरों के लिए नहीं।",
        },
        honesty: {
          is: "नामित पितरों के निमित्त जल और स्मरण का अर्पण, उस वंशज की ओर से जो स्वयं उपस्थित नहीं हो सकता।",
          isNot:
            "कोई उद्धार नहीं। हम आपसे कभी नहीं कहेंगे कि आपके पितर कष्ट में हैं, अशांत हैं, अतृप्त हैं या प्रतीक्षा कर रहे हैं। यह हमें ज्ञात नहीं, किसी को ज्ञात नहीं। तर्पण इसलिए कीजिए कि आप उन्हें स्मरण करना चाहते हैं।",
        },
        notes: [
          {
            label: "अधिकार",
            body: "अधिकार के नियम समुदाय के अनुसार भिन्न हैं, और कई परंपराओं में पिता के जीवित रहते पितृ तर्पण नहीं किया जाता। यहाँ किसी भी लिंग का कोई भी वंशज इसे करा सकता है। यदि आपके परिवार के अपने पुरोहित हैं तो पहले उनसे पूछ लें।",
          },
        ],
      },
      {
        id: "deep-daan",
        sku: "SNF-RITE-DEEPDAAN",
        index: "०२",
        name: "दीप दान",
        deva: "Deep Daan",
        usd: "$11",
        inr: "₹101",
        duration: "लगभग 3 मिनट",
        vessel: "सामूहिक अथवा निजी",
        what: "आपके नाम से घाट पर एक दीप जलाकर जल पर रखा जाता है।",
        who: "सबसे छोटा और सबसे सच्चा आरंभ। जन्मदिन, कोई शुभ समाचार, छोटी सी कृतज्ञता, कार्तिक पूर्णिमा, देव दीपावली, पुण्यतिथि, या केवल एक कठिन सप्ताह।",
        receive:
          "रिकॉर्डिंग में नब्बे सेकंड: बाती जलती है, ज्योति पर आपका नाम बोला जाता है, दीप धारा पर रखा जाता है, और कैमरा उसे तब तक देखता रहता है जब तक वह दृश्य से बाहर न हो जाए। इसे बीच में काटा नहीं जाता।",
        honesty: {
          is: "एक दीप, जला, नामित, प्रवाहित। बस इतना ही, और यह सदा से पर्याप्त रहा है।",
          isNot: "यह कहीं पहुँचेगा नहीं। यह नदी पर रखा एक दीप है।",
        },
        notes: [
          {
            label: "सामग्री",
            body: "दीप पत्ते और रुई के होते हैं, न प्लास्टिक, न थर्मोकोल। आपूर्तिकर्ता और हर घाट के अपने नियम अभी तय हो रहे हैं; बुकिंग खुलने से पहले वे यहीं नाम सहित लिखे जाएँगे।",
          },
        ],
      },
      {
        id: "nadi-puja",
        sku: "SNF-RITE-NADIPUJA",
        index: "०३",
        name: "नदी पूजा",
        deva: "Nadi Puja",
        usd: "$31",
        inr: "₹751",
        duration: "लगभग 18 मिनट",
        vessel: "सामूहिक अथवा निजी",
        what: "नदी का स्वयं देवी रूप में पूजन, आवाहन, जल, पुष्प, धूप, दीप, नैवेद्य और नमस्कार का उपचार क्रम, जल के किनारे, आपके नाम से। हरिद्वार में गंगा पूजा, मथुरा में यमुना पूजा, संगम पर त्रिवेणी पूजा, नदी के अनुसार।",
        who: "नया घर, नया व्यवसाय, विवाह, प्रथम संतान, पूर्ण हुआ व्रत, वर्षगाँठ। याचना के नहीं, कृतज्ञता के अवसर।",
        receive:
          "पूरा उपचार क्रम, हर चरण उपशीर्षक में नाम सहित, और अंत में पुष्प तथा दीप जल पर।",
        honesty: {
          is: "घाट पर, आपके संकल्प के साथ संपन्न नदी का पूजन।",
          isNot:
            "आपके अपने घर में, अपने परिवार के साथ होने वाले गृह प्रवेश या विवाह संस्कार का विकल्प नहीं। यह उनके साथ चलता है, उनकी जगह नहीं लेता।",
        },
        notes: [],
      },
      {
        id: "abhishek",
        sku: "SNF-RITE-ABHISHEK",
        index: "०४",
        name: "अभिषेक",
        deva: "Abhishek",
        usd: "$31",
        inr: "₹751",
        duration: "लगभग 12 मिनट",
        vessel: "सामूहिक अथवा निजी",
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
        sku: "SNF-RITE-AARTI",
        index: "०५",
        name: "आरती संकल्प",
        deva: "Aarti Sankalp",
        usd: "$21",
        inr: "₹501",
        duration: "लगभग 25 मिनट का प्रसारण; नाम एक नियत क्षण पर",
        vessel: "सामूहिक",
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
        id: "sankalpit-japa",
        sku: "SNF-RITE-JAPA",
        index: "०६",
        name: "संकल्पित जप",
        deva: "Sankalpit Japa",
        usd: "$51",
        inr: "₹1,100",
        duration: "1,008 जप, लगभग 3 घंटे",
        vessel: "केवल निजी अनुष्ठान",
        what: "चुने हुए मंत्र की निश्चित संख्या, घाट पर, आपके संकल्प को समर्पित।",
        who: "जो एक निश्चित संख्या संपन्न और अभिलिखित चाहते हैं। भाव आप लाइए। हम उसे आपके लिए नाम नहीं देंगे, और न ही कोई अवसर गिनाकर इसे बेचेंगे।",
        receive: "पूरी अवधि की अखंड रिकॉर्डिंग, गणना निरंतर दृश्यमान, अंश नहीं, संपूर्ण।",
        variant: {
          name: "संकल्पित जप, 10,008",
          deva: "Sankalpit Japa, 10,008",
          sku: "SNF-RITE-JAPA-10K",
          usd: "$251",
          inr: "₹5,100",
          duration: "लगभग 30 घंटे का जप, कई दिनों में",
          note: "हर दिन का बैठक-काल पूरा रिकॉर्ड होता है, और चलती गणना कैमरे पर एक दिन से अगले दिन तक आगे बढ़ती है।",
        },
        honesty: {
          is: "जप की एक निश्चित संख्या, घाट पर संपन्न, पूरी अवधि में अभिलिखित ताकि आप देख सकें कि संख्या वास्तविक थी, और उस व्यक्ति को समर्पित जिसका नाम आपने दिया।",
          isNot:
            "औषधि नहीं, उपचार नहीं। यदि आपका कोई अपना रुग्ण है, तो यह उनके चिकित्सकों के साथ किया जा सकता है, उनके स्थान पर कभी नहीं। और 'पहली बार काम नहीं आया' कहकर हम आपको दूसरी बार नहीं बेचेंगे।",
        },
        notes: [
          {
            label: "गणित, स्पष्ट रूप से",
            body: "गायत्री अथवा महामृत्युंजय का 1,008 जप, ठीक से किया जाए तो लगभग तीन घंटे लेता है, वे चालीस मिनट नहीं, जितना यह प्रायः बेचा जाता है। हम तीन घंटे का शुल्क लेकर तीनों घंटे रिकॉर्ड करना बेहतर मानते हैं, बजाय ऐसी संख्या बेचने के जो संभव ही नहीं।",
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
      {
        id: "path",
        sku: "SNF-RITE-PATH",
        index: "०७",
        name: "पाठ",
        deva: "Path",
        usd: "$51",
        inr: "₹1,100",
        duration: "35-70 मिनट, ग्रंथ के अनुसार",
        vessel: "केवल निजी अनुष्ठान",
        what: "घाट पर, आपके नाम से किसी संपूर्ण ग्रंथ का पाठ, विष्णु सहस्रनाम (लगभग 35 मिनट), हनुमान चालीसा ग्यारह बार (लगभग 40 मिनट), अथवा सुंदरकांड (लगभग 70 मिनट)।",
        who: "कोई व्रत, कोई वर्षगाँठ, घर की वह परंपरा जो हर वर्ष निभाई जाती है, या वह ग्रंथ जिसे परिवार सदा साथ बैठकर पढ़ता आया है और इस वर्ष एकत्र नहीं हो सका।",
        receive:
          "पूरी, बिना संपादन की रिकॉर्डिंग, और अंत में ऋत्विक कैमरे पर सत्र संख्या बोलते हैं, जिससे रिकॉर्डिंग अपनी तिथि का प्रमाण स्वयं अपने भीतर रखती है।",
        honesty: {
          is: "संपूर्ण ग्रंथ, पूरा का पूरा घाट पर पढ़ा गया, आपको समर्पित और बिना संपादन दिया गया।",
          isNot: "संक्षिप्त नहीं, गति बढ़ाकर नहीं, और पहले से रिकॉर्ड किया हुआ नहीं।",
        },
        notes: [
          {
            label: "कौन से ग्रंथ",
            body: "रुद्री पाठ सहित अन्य ग्रंथ केवल वहीं जोड़े जाते हैं जहाँ उस घाट के ऋत्विक उन्हें नियमित रूप से पढ़ते हैं। जिसे कोई वास्तव में कर न सके, उसे हम सूची में नहीं रखते।",
          },
        ],
      },
    ],
    ladder: {
      eyebrow: "शुल्क",
      title: "दो दरें, एक ही पृष्ठ पर।",
      lede: "डॉलर में विश्व दर और रुपये में भारत दर। दोनों यहीं, साथ-साथ, दोनों भाषाओं में छपी हैं।",
      statement:
        "हम एक दर को बदलकर नहीं, दो अलग दरें प्रकाशित करते हैं। विश्व दर वह है जो डॉलर में भुगतान करने वाले परिवार के लिए है; भारत दर वह जो रुपये में भुगतान करने वाले परिवार के लिए। ये दो बाज़ारों की दो वास्तविक दरें हैं, कोई दूसरे पर छूट नहीं, और हम इन्हें आपके IP पते के आधार पर चुनने के बजाय एक ही पृष्ठ पर छाप देना बेहतर समझते हैं।",
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
      eligibility: {
        label: "भारत दर कैसे लागू होती है",
        body: "आपके भुगतान माध्यम से, आपके IP पते से नहीं। UPI, RuPay अथवा भारत में जारी कार्ड पर भारत दर लगती है। IP की जाँच सरलता से चकमा दे दी जाती है और यात्रा करने वालों को व्यर्थ दंडित करती है। मुद्रा चुनने का विकल्प हर जगह दिखता और बदला जा सकता है, और यदि कोई भुगतान पात्र न हो तो संदेश सीधा रहता है, आरोप जैसा नहीं।",
      },
      fee: {
        label: "यह शुल्क है, दक्षिणा नहीं",
        body: "दक्षिणा स्वेच्छा से, कर्म के बाद, यजमान द्वारा चुनी गई राशि में दी जाती है। चेकआउट में लिखा नियत अंक शुल्क है, और उसे दक्षिणा कहना एक व्यावसायिक लेन-देन पर उपहार का आवरण चढ़ाना होगा। यदि आप दक्षिणा देना चाहें तो वह अंत में एक अलग, ऐच्छिक राशि है, और वह पूरी की पूरी ऋत्विक को जाती है।",
      },
      split: {
        label: "शुल्क कहाँ जाता है",
        body: "हर शुल्क का एक भाग अनुष्ठान करने वाले ऋत्विक को, एक भाग उस घाट निकाय को जिसकी अनुमति से यह संभव होता है, और एक भाग स्नानिफ़ाई को जाता है। संचालन की लागत का आकलन अभी पूरा नहीं हुआ है, इसलिए तीनों अंक यहाँ अभी नहीं छपे हैं। बुकिंग खुलने से पहले वे यहीं, अंकों में, छाप दिए जाएँगे। जब तक वे सत्य न हों, इस अनुच्छेद में कोई संख्या नहीं आएगी।",
      },
      cooling: {
        label: "रद्द करना",
        body: "अनुष्ठान से 24 घंटे से अधिक पहले, पूरा धन वापस। 24 घंटे के भीतर, नि:शुल्क पुनर्निर्धारण, और साझा सत्र में फिर भी पूरा धन वापस, क्योंकि सामूहिक सत्र आपके होने या न होने पर भी होता है। यदि किसी भी कारण से अनुष्ठान न हो सका, तो धन स्वयं लौट आता है, आपको माँगना नहीं पड़ता।",
      },
      tableTitle: "इस पृष्ठ का सब कुछ, दोनों दरों पर",
      tableCaption: "इस सूची के सभी अनुष्ठान, उनकी अवधि, प्रकार और दोनों प्रकाशित दरें।",
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
            "यह अवधि हर घाट पर सूर्योदय के साथ बदलती है, इसलिए यहाँ कोई नियत समय नहीं छापा गया; ठीक समय देने से पहले पंचांग से उसकी पुष्टि की जाती है। ऋत्विक तब भी अँधेरे में ही घाट पहुँचते हैं। वार्षिक और निजी श्रेणियों में यह नहीं लगता।",
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
          name: "श्रेणी की संख्या से अधिक हर नाम, साझा सत्र में अधिकतम 21 तक",
          usd: "+$11",
          inr: "+₹251",
          reason: "हर नाम सत्र में वाचन का समय बढ़ाता है।",
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
      ],
    },
    refusals: {
      eyebrow: "निषेध सूची",
      title: "जो हम नहीं बेचते।",
      lede: "यहाँ लिखी हर वस्तु वह आय है जो हमने न लेने का निर्णय किया। यह शर्तों में छिपाने के बजाय एक पृष्ठ के रूप में प्रकाशित है, क्योंकि किसी संस्था के इनकार उसके वादों से अधिक बताते हैं।",
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
            "विदेश से भेजे गए दान के लिए नामित, अंकेक्षित और पंजीकृत साझेदार चाहिए, और रसीद हमारी नहीं, उसी साझेदार की होनी चाहिए। जब तक ऐसा नहीं है, हम यह धन लेकर उसे सेवा नहीं कहेंगे।",
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
