/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   जल चिह्न · Jal Chihna, the Watermark: copy, document labels, and the
   specimen record.

   This file used to carry the Sankalp Patra, a certificate of a rite that a
   person performed at a ghat. No rite is performed and none ever will be, so
   the name went with the product: a certificate of performance cannot be
   honestly reused for a record of a river. What is recorded now is the water's
   own condition at the moment a name was kept, taken from public data, plus
   the name and the words the person gave.

   The word "sankalp" survives, because it is the user's own written line and
   that is what the word means. The sheet never says a snan was performed on
   anybody's behalf. It says "taken in the name of", which is exactly true.

   Two things live here:

   1. `chihnaContent`, every user-facing string on /patra and /patra/sample,
      keyed by locale. `hi` is checked against the shape of `en`, so a missing
      translation is a compile error rather than an English word on a Hindi
      page.
   2. `specimenChihna()`, the composed record rendered on /patra/sample. Every
      value in it is a specimen. The names are the placeholder names of the
      Sanskrit grammarians (Devadatta, Yajnadatta, the equivalents of "John
      Doe"); nothing has been issued against the identifier; the tithi was not
      computed from any panchang. The sample page states all of this in the UI
      and the sheet itself is watermarked.

      One value on the specimen is NOT invented, and deliberately so: the seed.
      It is the real SHA-256 of the canonical line printed beside it on /patra,
      so a reader who runs the hash themselves gets the number on the sheet.
      See `SPECIMEN_CANONICAL`.
   --------------------------------------------------------------------------- */

/* ---------------------------------- data ---------------------------------- */

export type ChihnaNameEntry = {
  /** The name in Latin script, as it was written. */
  latin: string;
  /** The same name in Devanagari, where it was given or transliterated. */
  devanagari?: string;
  /** Already-localised relation label ("father" / "पिता"). Ordering only. */
  relation?: string;
  /** Kept in remembrance of someone who has passed. Changes the label only. */
  remembrance?: boolean;
};

/**
 * A figure read off a public source, with the one line of context that makes
 * it mean something. `note` is already localised and already carries its
 * units; nothing in the sheet formats numbers, because nothing in the sheet
 * knows which agency published them.
 */
export type ChihnaFigure = {
  value: string;
  note?: string;
};

export type ChihnaRecord = {
  /** 22-character base58. Unguessable, so a chihna is link-shareable. */
  chihnaId: string;
  /** The folio, printed at the masthead. Digits only, already localised. */
  folioNo?: string;
  /** "the 1,412th chihna kept at Har Ki Pauri", already localised. */
  sequenceLine?: string;

  names: ChihnaNameEntry[];
  /** Omitted when the family does not use one, the sheet prints "Not stated". */
  gotra?: string;
  /** Present only on a gift. A gift sheet with one name on it fails as a gift. */
  givenBy?: string;
  /** The person's own words. Printed on their sheet; never returned by /verify. */
  sankalpText?: string;

  /** "Ganga". The river, or at Talakaveri the spring. */
  water: string;
  ghat: string;
  place: string;
  /**
   * Printed under the water and ghat cell where the site itself needs a
   * sentence, as Talakaveri does: "Source, not a ghat. There is no bathing
   * here." Already localised.
   */
  waterNote?: string;

  /** The moment the person kept, already formatted for the locale. */
  keptOn: string;
  /** The same moment in India Standard Time. */
  keptIst: string;
  /** The same moment in the zone the person was keeping. */
  keptLocal?: string;

  /**
   * Printed only when `confidence === "sourced"`. An unsourced tithi is left
   * off the sheet as a blank rule rather than guessed.
   */
  tithi?: { label: string; confidence: "sourced" | "provisional" };
  /** The muhurat window the moment fell in: name, and its span in IST. */
  window?: { label: string; span: string };

  /** Modelled river discharge. The note carries the percentile and its window. */
  flow?: ChihnaFigure;
  /** A published gauge level, where a gauge on this reach publishes one. */
  level?: ChihnaFigure;
  /**
   * Printed in the level cell when nobody publishes a level for this reach.
   * Stated in words, in the same cell, rather than left blank: a missing
   * figure and an unpublished figure are different facts.
   */
  levelUnavailable?: ChihnaFigure;

  /** When the source observed the reading, and who published it. */
  reading?: { at: string; agency: string };
  /** How far the person was from that water. */
  distance?: ChihnaFigure;

  /** One of five state sentences. Never a grade, never a tier. */
  stateLine?: string;

  /** The first twelve hex of the SHA-256 over the canonical line. */
  seed: string;
  /** Displayed without a scheme, it is read off paper as often as clicked. */
  verifyUrl: string;
};

/* --------------------------------- copy ----------------------------------- */

const en = {
  meta: {
    title: "Jal Chihna, the mark the water left",
    description:
      "Every snan is kept at a moment when the river was in one particular state, and that state is on the public record. The Jal Chihna prints it: the water, the hour, the flow, the tithi, the distance, and a seed anyone can recompute.",
  },
  sampleMeta: {
    title: "A specimen Jal Chihna",
    description:
      "A full, watermarked specimen sheet. Every value on it is composed for this page and nothing has been issued against the identifier printed on it.",
  },

  hero: {
    eyebrow: "Jal Chihna",
    title: "The mark the water left.",
    lede: "Every snan happens at a moment when the river was in a particular state, and that state is on the public record. Your name, your gotra, the second you kept, and the reading at that second are the whole of what draws the picture. Two chihna have never been alike and cannot be.",
    primary: "See a specimen",
    secondary: "Check one",
    previewCaption: "Specimen. Every value on it is composed for this page.",
    honesty:
      "No rite is performed at any ghat, for you or for anybody. The chihna records the water, the hour, and the name that was kept.",
  },

  read: {
    eyebrow: "The picture",
    title: "How to read it.",
    lede: "The engraving is not decoration laid over the numbers. It is the numbers, drawn. Nothing on it is chosen by hand, and nothing on it is random except the two things that have to be.",
    items: [
      {
        h: "The horizon, and how much of the sheet is ink",
        b: "The higher the water stands against its own record, the higher the horizon sits and the more of the page is inked. A river in spate is a dark, crowded, high sheet. A river running thin is a pale one with wide margins. You can tell what the water was doing from across a room.",
      },
      {
        h: "The ripples",
        b: "The stronger the flow, the more ripple lines run across the channel and the rougher they break. Between eighteen lines and sixty-four, set by one number and no other.",
      },
      {
        h: "The disc",
        b: "The sun by day and the moon by night, placed at the height it actually stood at that ghat at that minute, and cut to the phase it was actually in. On Amavasya it is an empty outlined circle. On Purnima it is filled solid.",
      },
      {
        h: "The bend in the channel",
        b: "The one thing the river does not decide. The meander and the corner device come from your own seed, so two people who keep the same minute at the same water still hold two different sheets.",
      },
    ],
  },

  anatomy: {
    eyebrow: "What it records",
    title: "Ten things, and every one of them checkable.",
    lede: "Each numbered mark on the sheet is one field of the document. Where nobody publishes a figure, the field says so in words rather than carrying a number we invented.",
    diagramTitle: "Schematic of a Jal Chihna sheet with ten numbered fields",
    items: [
      {
        n: 1,
        name: "The chihna number",
        body: "The folio at the masthead, and beneath the title the sequence: which chihna this is overall, and which it is at that particular water. Both are counts of things that happened. Low numbers are scarce for the ordinary reason that they came first.",
      },
      {
        n: 2,
        name: "Taken in the name of",
        body: "Written as you gave it, in the script you gave it in, Latin and Devanagari. Where the name is of someone who has passed, the line reads 'Taken in remembrance of' instead. On a gift, the giver is named directly beneath.",
      },
      {
        n: 3,
        name: "Gotra",
        body: "Printed if you stated one. If your family does not use a gotra the line reads 'Not stated', and nothing on the sheet or in the record changes. It is never a required field.",
      },
      {
        n: 4,
        name: "The sankalp",
        body: "Your own words, verbatim and unedited. Printed on your sheet and nowhere else: a stranger checking the chihna never sees it.",
      },
      {
        n: 5,
        name: "Water and ghat",
        body: "The water, the steps, and the town, named plainly enough that you could go and stand there. At Talakaveri the cell carries one extra sentence, because Talakaveri is a spring in a temple tank and there is no bathing at it.",
      },
      {
        n: 6,
        name: "The moment you kept",
        body: "The date, the clock in India Standard Time, and the same instant in the time you were keeping. Both, because they are usually different days.",
      },
      {
        n: 7,
        name: "Tithi, and the window beneath it",
        body: "The tithi and paksha, printed only when they have been confirmed against a named panchang. Beneath, the muhurat window the moment fell in and its span in IST, computed against that ghat's own sunrise rather than a national average.",
      },
      {
        n: 8,
        name: "Flow, and level",
        body: "Modelled river discharge for the reach, in cubic metres a second, ranked against every reading at that cell in this same week of the year since 1991. Beside it, the published gauge level where a gauge on that reach publishes one. Where none does, the cell says so and names what is missing.",
      },
      {
        n: 9,
        name: "When the reading was taken, and how far away you were",
        body: "The instant the source observed, which is not the instant you kept and is printed separately for that reason, together with the body that published it. Beside it, the distance from where you were to that water, in a straight line.",
      },
      {
        n: 10,
        name: "The seed, and the line anyone can check it on",
        body: "Twelve characters of a hash taken over every value above, and the address a stranger can open to recompute it. This is the field that makes the sheet worth anything.",
      },
    ],
  },

  proof: {
    eyebrow: "Why it cannot be faked",
    title: "The reading is inside the picture.",
    lede: "The chihna is not signed, stamped or sealed, because a signature is only as good as the person holding the pen. It is drawn from a line of text that contains the river's published reading, and the picture is what that line hashes to.",
    steps: [
      {
        h: "The line",
        b: "Every value that went into the sheet, in a fixed order, joined by one character. The water, the source cell, the instant observed, the level, the flow, the instant you kept, your name and your gotra.",
      },
      {
        h: "The hash",
        b: "SHA-256 over that line, byte for byte. The first twelve characters are printed on the sheet as the seed, and the whole digest is what the drawing is generated from.",
      },
      {
        h: "The picture",
        b: "The seed drives the meander, the corner device and the misregistration. Change one character of the line and every one of them moves. There is no version of the picture that fits a different reading.",
      },
    ],
    canonicalLabel: "The line this specimen was drawn from",
    canonicalNote:
      "Run SHA-256 on the line above, exactly as printed, and the first twelve characters are the seed on the specimen sheet. Nothing is being taken on trust here, and nothing needs to be.",
    seedLabel: "Seed",
    consequenceHeading: "What that buys",
    consequences: [
      "You cannot mint a chihna claiming a monsoon peak, because the peak figure is inside the line that produced the hash, and the figure is checkable against the body that published it.",
      "A stranger with the line can rebuild the identical picture without asking us anything. The method and the twenty-four corner devices are published.",
      "We keep the source response for every reading, with the time we fetched it and a hash of it, because agency pages rotate and the record has to outlive them.",
    ],
  },

  restraint: {
    eyebrow: "What it never says",
    title: "A document is only as good as the claims it refuses to make.",
    lede: "A certificate borrows its authority from the things printed on it. These are the things that will never be printed on this one.",
    points: [
      "It never says a rite was performed. None was. Nobody stood at the ghat on your behalf, and no line on the sheet lets you think otherwise.",
      "It never says certified, blessed or purified. Nothing here certifies anything, and nothing here is in a position to bless.",
      "It carries no registry number, no seal of any temple, and no crest we have not been given the right to use.",
      "It never carries a tithi, nakshatra or muhurat that has not been confirmed against a named panchang. Where it has not been, the cell is a blank rule.",
      "It never prints a water temperature. Nobody publishes one for these six waters, so no sheet can carry one honestly.",
      "It never calls a reading rare, legendary or limited. It prints the percentile and names the years it was measured against.",
      "It makes no claim about what follows from it, not for health, money, examinations, marriage or a court date.",
    ],
    attestationLabel: "Printed on every chihna",
    attestation:
      "The numbers on this sheet are the river's, not ours. They were published by the body named above and they can be checked against it.",
  },

  verify: {
    eyebrow: "Verification",
    title: "Anyone can check it. Nobody can read it.",
    lede: "A chihna is worth having only if a person who did not buy it can confirm it stands. Confirming it must not mean reading what you wrote.",
    steps: [
      {
        h: "Someone has your chihna",
        b: "They are sent the link, or they read the twenty-two characters off a printed sheet.",
      },
      {
        h: "They open the check page",
        b: "No account, no sign-in, no cookie set, nothing to install.",
      },
      {
        h: "They are told what stands, and given the line",
        b: "Issued, withdrawn or unknown, the reading it was drawn from, and the full line they can hash themselves.",
      },
    ],
    showsHeading: "What checking returns",
    shows: [
      "The name, masked, D••••••• S•••••",
      "The water, the ghat and the moment kept",
      "The reading, the instant it was observed, and who published it",
      "The full line, the seed, and whether the chihna still stands",
    ],
    hidesHeading: "What it never returns",
    hides: [
      "The sankalp, your words are never shown to anyone checking",
      "The full name",
      "Any other name kept on the same day by the same person",
      "Your email, your phone, or what was paid",
    ],
    demoLabel: "What a stranger sees",
    demoStatus: "Issued",
    demoName: "D••••••• S•••••",
    demoRiver: "Ganga · Har Ki Pauri, Haridwar",
    demoKeptLabel: "Moment kept",
    demoKept: "14 May 2026, 04:52 IST",
    demoReadingLabel: "Reading observed",
    demoReading: "14 May 2026, 05:00 IST",
    demoSeedLabel: "Seed",
    demoCaption:
      "Illustration. This response is composed for this page, no chihna with this identifier exists.",
    cta: "Go to checking",
  },

  privacy: {
    eyebrow: "Who can see it",
    title: "Unlisted, until you decide otherwise.",
    items: [
      {
        h: "Unlisted by default",
        b: "A chihna opens only from its own link and carries a noindex instruction, so it does not turn up in search results. Nothing lists it anywhere.",
      },
      {
        h: "The link preview says less than the page",
        b: "Paste a chihna link into a chat and the preview shows the engraving, the water and the date. Names kept in remembrance are never placed in a preview image, a death is not a thumbnail.",
      },
      {
        h: "You can withdraw it",
        b: "Ask, and the chihna is withdrawn: the link stops resolving to a sheet, and checking reports it as withdrawn, with the date.",
      },
      {
        h: "The register is yours alone",
        b: "Your own chihna are listed together in one register that only your link opens. Withdrawing one does not touch the rest, and nobody else's register is reachable from yours.",
      },
    ],
  },

  formats: {
    eyebrow: "How it reaches you",
    title: "Three forms of the same record.",
    items: [
      {
        h: "A page that stays",
        b: "A permanent link, built for a phone first, and printable straight from the browser onto A4 with the margins already set.",
      },
      {
        h: "A sheet to keep",
        b: "The A4 document at print resolution, and a PDF with Eczar and Martel Sans embedded, so a Devanagari name is never substituted into the wrong face.",
      },
      {
        h: "Images to send",
        b: "The engraving cut for the places people actually send things: the tall frame a chat renders without cropping, a story, a square, and a lock screen.",
      },
    ],
    nothingShipped:
      "Nothing is posted to you. The Jal Chihna is digital, like everything else here. There is no parcel, no prasad, no courier, and no water in a bottle.",
  },

  closing: {
    title: "Look at one before you decide anything.",
    lede: "The specimen is the whole sheet at full size, watermarked, and plain about every value composed for it.",
    primary: "See the specimen",
    secondary: "How a snan works",
  },

  sample: {
    eyebrow: "Specimen",
    title: "A Jal Chihna, in full.",
    lede: "The layout, the type, the register and the foot line are exactly what is issued. The values are composed for this page. The names are the placeholder names of Sanskrit grammar, Devadatta and Yajnadatta, the equivalents of 'John Doe', and the identifier resolves to nothing.",
    noticeHeading: "What on this specimen is composed, and what is not",
    noticeItems: [
      "Composed: the two names, the relation between them, and the gotra.",
      "Composed: the date, the window and the tithi. No panchang was consulted for this page.",
      "Composed: the flow figure, the percentile, the reading time and the distance.",
      "Composed: the identifier and the folio. Nothing has been issued against them, and checking would report the identifier as unknown.",
      "Not composed: the seed. It is the true SHA-256 of the line printed on the page before this one, and you can run it yourself.",
    ],
    plateHeading: "The engraving is not on this specimen",
    plateBody:
      "An issued chihna carries its engraving across the upper half of the sheet, drawn from that day's reading. A specimen has no reading, so it has no engraving, and drawing a decorative one here would be the one dishonest thing on an otherwise honest page. What you are looking at is the document furniture and the register.",
    notesHeading: "Three things to notice",
    notes: [
      {
        h: "Why it is watermarked",
        b: "A specimen that could be mistaken for an issued chihna is a forgery waiting to happen. The mark is on the page, on the print, and on any image made of it.",
      },
      {
        h: "The level cell",
        b: "It reads 'Not published for this reach', and that is the truth at Haridwar: no public gauge on that reach publishes a level. Where one does, as it does on parts of the Godavari, the figure and the gauge are printed instead.",
      },
      {
        h: "The tithi cell",
        b: "Shown here to demonstrate the layout. On an issued chihna it appears only when the tithi has been confirmed against a named panchang; otherwise the cell is a blank rule and the sheet is one field shorter.",
      },
    ],
    printHint: "This page prints as a single A4 sheet, and the specimen mark prints with it.",
    smallScreenHint:
      "The sheet keeps the proportions of a printed page, so on a phone it is shown small. Open it full size to read every field.",
    back: "What a Jal Chihna is",
    verifyCta: "Check a chihna",
  },

  /* The document itself. Kept beside the page copy so the sheet and the page
     that explains it can never drift apart. */
  sheet: {
    aria: "Jal Chihna",
    ariaSpecimen: "Jal Chihna, specimen, not a record of anything issued",
    titleLatin: "Jal Chihna",
    subtitle: "The river's own condition, at the moment you kept.",
    folioLabel: "Chihna",
    namesLabel: "Taken in the name of",
    remembranceLabel: "Taken in remembrance of",
    givenByLabel: "Given by",
    gotraLabel: "Gotra",
    gotraUnstated: "Not stated",
    sankalpLabel: "The sankalp, as it was written",

    waterLabel: "Water and ghat",
    keptLabel: "Kept at",
    localLabel: "In your own time",
    tithiLabel: "Tithi",
    windowLabel: "Window",
    flowLabel: "Flow, modelled",
    levelLabel: "Level",
    readingLabel: "Reading taken",
    distanceLabel: "Distance to the water",
    seedLabel: "Seed",
    stateLabel: "The state of the water",

    verifyLabel: "Anyone may check this chihna at",
    attestation:
      "The numbers on this sheet are the river's, not ours. They were published by the body named above and they can be checked against it.",
    footerLine:
      "No rite was performed at the ghat. This is a record of the river's own condition at the moment you kept, taken from the public source named above, together with the name and the words you gave. It is a record of what the water was doing. It is not a promise of what will follow.",

    specimenChip: "Specimen",
    specimenBanner:
      "Specimen. Nothing on this sheet records anything issued, and the identifier resolves to nothing.",

    viewFull: "Open the sheet full size",
    viewerAria: "The chihna sheet, full size",
    viewFit: "Whole sheet",
    viewRead: "Reading size",
    viewClose: "Close",
  },
};

const hi: typeof en = {
  meta: {
    title: "जल चिह्न, जो चिह्न जल छोड़ गया",
    description:
      "हर स्नान उस क्षण होता है जब नदी किसी एक विशेष स्थिति में थी, और वह स्थिति सार्वजनिक अभिलेख में है। जल चिह्न उसी को अंकित करता है: जल, बेला, प्रवाह, तिथि, दूरी, और वह बीज जिसकी गणना कोई भी दोहरा सकता है।",
  },
  sampleMeta: {
    title: "जल चिह्न का नमूना",
    description:
      "जल चिह्न का पूरा पत्र, नमूने की छाप सहित। इस पर अंकित हर विवरण इसी पृष्ठ के लिए रचा गया है, और उस पहचान से कुछ भी जारी नहीं हुआ।",
  },

  hero: {
    eyebrow: "जल चिह्न",
    title: "जो चिह्न जल छोड़ गया।",
    lede: "हर स्नान उस क्षण होता है जब नदी किसी एक विशेष स्थिति में थी, और वह स्थिति सार्वजनिक अभिलेख में है। आपका नाम, आपका गोत्र, वह क्षण जो आपने रखा, और उसी क्षण का पाठ, चित्र इन्हीं से बनता है। दो चिह्न आज तक एक जैसे नहीं हुए, और हो भी नहीं सकते।",
    primary: "नमूना देखिए",
    secondary: "जाँच कीजिए",
    previewCaption: "नमूना। इसका हर विवरण इसी पृष्ठ के लिए रचा गया है।",
    honesty:
      "किसी घाट पर कोई अनुष्ठान नहीं किया जाता, न आपके लिए, न किसी और के लिए। चिह्न में जल, बेला और वह नाम अंकित होता है जो रखा गया।",
  },

  read: {
    eyebrow: "चित्र",
    title: "इसे कैसे पढ़ें।",
    lede: "यह उकेरन संख्याओं के ऊपर लगाई गई सजावट नहीं है। यह स्वयं वे संख्याएँ हैं, चित्र के रूप में। इस पर कुछ भी हाथ से नहीं चुना गया, और दो बातों के सिवा कुछ भी यादृच्छिक नहीं।",
    items: [
      {
        h: "क्षितिज, और पन्ने पर स्याही की मात्रा",
        b: "जल अपने ही अभिलेख के सामने जितना ऊँचा खड़ा हो, क्षितिज उतना ऊपर बैठता है और पन्ने पर स्याही उतनी अधिक चढ़ती है। उफान पर की नदी का पत्र गहरा, भरा और ऊँचा होता है। पतली धार का पत्र हल्का होता है और उसके हाशिये चौड़े। जल क्या कर रहा था, यह कमरे के दूसरे छोर से दिख जाता है।",
      },
      {
        h: "तरंगें",
        b: "प्रवाह जितना तेज़, धारा पर उतनी अधिक तरंग-रेखाएँ और उतनी ही खुरदरी। अठारह से चौंसठ रेखाओं के बीच, और यह केवल एक ही संख्या तय करती है।",
      },
      {
        h: "बिंब",
        b: "दिन में सूर्य और रात्रि में चंद्र, ठीक उसी ऊँचाई पर जिस पर वे उस घाट पर उस मिनट खड़े थे, और ठीक उसी कला में कटे हुए। अमावस्या पर यह केवल एक खाली वृत्त रह जाता है। पूर्णिमा पर पूरा भरा हुआ।",
      },
      {
        h: "धारा का मोड़",
        b: "यही एक बात नदी तय नहीं करती। मोड़ और कोने का अलंकरण आपके अपने बीज से आते हैं, इसलिए एक ही जल पर एक ही मिनट रखने वाले दो लोगों के पत्र भी दो अलग पत्र ही रहते हैं।",
      },
    ],
  },

  anatomy: {
    eyebrow: "इसमें क्या अंकित होता है",
    title: "दस बातें, और हर एक जाँची जा सकने वाली।",
    lede: "पत्र पर लगा हर अंक दस्तावेज़ के एक विवरण को दर्शाता है। जिस आँकड़े को कोई प्रकाशित नहीं करता, वहाँ हम गढ़ी हुई संख्या नहीं रखते, शब्दों में यही लिख देते हैं।",
    diagramTitle: "जल चिह्न का रेखांकन, दस अंकित विवरणों सहित",
    items: [
      {
        n: 1,
        name: "चिह्न क्रमांक",
        body: "शीर्ष पर पत्र-संख्या, और शीर्षक के नीचे क्रम: यह कुल मिलाकर कौन-सा चिह्न है, और उस विशेष जल पर कौन-सा। दोनों घटी हुई बातों की गिनती हैं। छोटे क्रमांक इसी साधारण कारण से दुर्लभ हैं कि वे पहले आए।",
      },
      {
        n: 2,
        name: "जिनके नाम से लिया गया",
        body: "जैसे आपने दिया, उसी लिपि में, रोमन और देवनागरी दोनों में। यदि नाम किसी दिवंगत का हो, तो पंक्ति ‘जिनके स्मरण में लिया गया’ हो जाती है। भेंट पर, भेंटकर्ता का नाम ठीक उसके नीचे अंकित रहता है।",
      },
      {
        n: 3,
        name: "गोत्र",
        body: "यदि आपने बताया हो तो अंकित। यदि आपके परिवार में गोत्र का प्रयोग नहीं होता, तो यहाँ ‘अनुल्लिखित’ रहता है और पत्र या अभिलेख में इससे कुछ नहीं बदलता। यह कभी अनिवार्य विवरण नहीं।",
      },
      {
        n: 4,
        name: "संकल्प",
        body: "आपके अपने शब्द, ज्यों के त्यों, बिना किसी संपादन के। केवल आपके पत्र पर, और कहीं नहीं: जाँच करने वाले किसी अन्य व्यक्ति को यह कभी नहीं दिखता।",
      },
      {
        n: 5,
        name: "जल और घाट",
        body: "जल, सीढ़ियाँ और नगर, इतने स्पष्ट रूप से अंकित कि आप स्वयं जाकर वहाँ खड़े हो सकें। तलकावेरी पर इस खाने में एक वाक्य और जुड़ता है, क्योंकि तलकावेरी मंदिर-कुंड में उद्गम है और वहाँ स्नान होता ही नहीं।",
      },
      {
        n: 6,
        name: "जो क्षण आपने रखा",
        body: "दिनांक, भारतीय मानक समय की घड़ी, और वही क्षण उस समय में जो आपका अपना था। दोनों, क्योंकि प्रायः वे दो अलग दिन होते हैं।",
      },
      {
        n: 7,
        name: "तिथि, और उसके नीचे बेला",
        body: "तिथि और पक्ष, केवल तभी अंकित जब वे किसी नामित पंचांग से पुष्ट हों। नीचे वह मुहूर्त-बेला जिसमें वह क्षण पड़ा और भारतीय मानक समय में उसका विस्तार, जो उसी घाट के अपने सूर्योदय से गिना जाता है, किसी राष्ट्रीय औसत से नहीं।",
      },
      {
        n: 8,
        name: "प्रवाह, और जलस्तर",
        body: "उस धारा का प्रतिरूपित नदी-प्रवाह, घन मीटर प्रति सेकंड में, और उसकी तुलना 1991 से वर्ष के इसी सप्ताह में उसी खंड के हर पाठ से। उसके साथ प्रकाशित गेज-जलस्तर, जहाँ उस धारा पर कोई गेज उसे प्रकाशित करता है। जहाँ नहीं करता, वहाँ खाना यही बात लिखता है और बताता है कि क्या उपलब्ध नहीं।",
      },
      {
        n: 9,
        name: "पाठ कब लिया गया, और आप कितनी दूर थे",
        body: "वह क्षण जब स्रोत ने पाठ लिया, जो उस क्षण से भिन्न है जो आपने रखा और इसीलिए अलग अंकित होता है, और उसके साथ वह संस्था जिसने उसे प्रकाशित किया। उसी के पास, आप जहाँ थे वहाँ से उस जल तक की सीधी दूरी।",
      },
      {
        n: 10,
        name: "बीज, और वह पंक्ति जिस पर कोई भी जाँच ले",
        body: "ऊपर के हर विवरण पर लिए गए हैश के बारह अक्षर, और वह पता जिसे खोलकर कोई अजनबी उसी गणना को दोहरा सकता है। पत्र का सारा मूल्य इसी विवरण से है।",
      },
    ],
  },

  proof: {
    eyebrow: "यह नक़ली क्यों नहीं बनाया जा सकता",
    title: "पाठ स्वयं चित्र के भीतर है।",
    lede: "चिह्न पर न हस्ताक्षर हैं, न मुहर, न सील, क्योंकि हस्ताक्षर उतना ही खरा होता है जितना कलम पकड़ने वाला। यह पाठ की एक पंक्ति से बनता है जिसमें नदी का प्रकाशित पाठ भी सम्मिलित है, और चित्र वही है जो उस पंक्ति के हैश से निकलता है।",
    steps: [
      {
        h: "पंक्ति",
        b: "पत्र में गया हर मान, एक निश्चित क्रम में, एक ही चिह्न से जुड़ा हुआ। जल, स्रोत-खंड, पाठ का क्षण, जलस्तर, प्रवाह, वह क्षण जो आपने रखा, आपका नाम और आपका गोत्र।",
      },
      {
        h: "हैश",
        b: "उसी पंक्ति पर SHA-256, अक्षर दर अक्षर। पहले बारह अक्षर पत्र पर बीज के रूप में छपते हैं, और पूरा डाइजेस्ट वह है जिससे चित्र बनता है।",
      },
      {
        h: "चित्र",
        b: "बीज ही मोड़, कोने का अलंकरण और छपाई का खिसकाव तय करता है। पंक्ति का एक अक्षर बदलिए, ये सब हिल जाते हैं। चित्र का ऐसा कोई रूप है ही नहीं जो किसी दूसरे पाठ पर बैठ जाए।",
      },
    ],
    canonicalLabel: "जिस पंक्ति से यह नमूना बना",
    canonicalNote:
      "ऊपर छपी पंक्ति पर, ठीक वैसी ही, SHA-256 चलाइए, और पहले बारह अक्षर वही बीज हैं जो नमूना-पत्र पर छपा है। यहाँ कुछ भी विश्वास पर नहीं लिया जा रहा, और लेने की आवश्यकता भी नहीं।",
    seedLabel: "बीज",
    consequenceHeading: "इससे क्या मिलता है",
    consequences: [
      "मानसून के उफान का दावा करने वाला चिह्न गढ़ा नहीं जा सकता, क्योंकि उफान का आँकड़ा उसी पंक्ति के भीतर है जिससे हैश बना, और वह आँकड़ा प्रकाशित करने वाली संस्था से मिलाया जा सकता है।",
      "जिसके पास वह पंक्ति है, वह हमसे कुछ पूछे बिना ठीक वही चित्र दोबारा बना सकता है। विधि और चौबीसों कोने-अलंकरण प्रकाशित हैं।",
      "हर पाठ का मूल उत्तर, उसे लेने के समय और उसके हैश सहित, हम अपने पास रखते हैं, क्योंकि संस्थाओं के पृष्ठ बदलते रहते हैं और अभिलेख को उनसे अधिक जीना है।",
    ],
  },

  restraint: {
    eyebrow: "इस पर कभी क्या नहीं लिखा जाता",
    title: "दस्तावेज़ उतना ही खरा होता है, जितने दावों से वह इनकार करता है।",
    lede: "प्रमाणपत्र अपना बल उन बातों से लेता है जो उस पर छपी होती हैं। ये वे बातें हैं जो इस पर कभी नहीं छपेंगी।",
    points: [
      "इस पर कभी नहीं लिखा जाता कि कोई अनुष्ठान संपन्न हुआ। हुआ ही नहीं। आपकी ओर से घाट पर कोई खड़ा नहीं हुआ, और पत्र की कोई पंक्ति आपको ऐसा समझने नहीं देती।",
      "इस पर ‘प्रमाणित’, ‘आशीषित’ या ‘पवित्रीकृत’ कभी नहीं लिखा जाता। यहाँ कुछ भी किसी बात को प्रमाणित नहीं करता, और आशीर्वाद देने की स्थिति में तो यहाँ कुछ है ही नहीं।",
      "न कोई रजिस्ट्री संख्या, न किसी मंदिर की मुहर, न कोई ऐसा चिह्न जिसके प्रयोग का अधिकार हमें नहीं मिला।",
      "जो तिथि, नक्षत्र या मुहूर्त किसी नामित पंचांग से पुष्ट न हो, वह इस पर कभी नहीं आता। जहाँ पुष्टि न हो, वहाँ खाना केवल एक रेखा रह जाता है।",
      "इस पर जल का ताप कभी नहीं छपता। इन छहों जलों के लिए उसे कोई प्रकाशित नहीं करता, इसलिए कोई पत्र उसे सच्चाई से नहीं छाप सकता।",
      "किसी पाठ को दुर्लभ, विरल या सीमित नहीं कहा जाता। प्रतिशतक छपता है, और वे वर्ष भी जिनसे उसकी तुलना की गई।",
      "इसके बाद क्या होगा, इसका कोई दावा इस पर नहीं, न आरोग्य का, न धन का, न परीक्षा, विवाह या मुकदमे का।",
    ],
    attestationLabel: "हर चिह्न पर अंकित",
    attestation:
      "इस पत्र पर अंकित संख्याएँ नदी की हैं, हमारी नहीं। वे ऊपर अंकित संस्था द्वारा प्रकाशित हुईं और उन्हीं से मिलाई जा सकती हैं।",
  },

  verify: {
    eyebrow: "जाँच",
    title: "जाँच कोई भी कर सकता है। पढ़ कोई नहीं सकता।",
    lede: "चिह्न का मूल्य तभी है जब वह व्यक्ति भी उसकी सत्यता जाँच सके जिसने उसे नहीं लिया। और सत्यता जाँचने का अर्थ यह नहीं होना चाहिए कि आपका लिखा पढ़ लिया जाए।",
    steps: [
      {
        h: "किसी के पास आपका चिह्न पहुँचता है",
        b: "उन्हें लिंक भेजा जाता है, या वे छपे हुए पत्र से वही बाईस अक्षर पढ़ लेते हैं।",
      },
      {
        h: "वे जाँच का पृष्ठ खोलते हैं",
        b: "न खाता, न लॉगिन, न कोई कुकी, न कुछ इंस्टॉल करने की आवश्यकता।",
      },
      {
        h: "उन्हें स्थिति और पूरी पंक्ति मिल जाती है",
        b: "जारी, वापस लिया गया, या अज्ञात, वह पाठ जिससे चिह्न बना, और वह पूरी पंक्ति जिस पर वे स्वयं हैश चला सकते हैं।",
      },
    ],
    showsHeading: "जाँच में क्या मिलता है",
    shows: [
      "नाम, आंशिक रूप से ढका हुआ, D••••••• S•••••",
      "जल, घाट, और वह क्षण जो रखा गया",
      "पाठ, वह क्षण जब वह लिया गया, और प्रकाशित करने वाली संस्था",
      "पूरी पंक्ति, बीज, और यह कि चिह्न अब भी वैध है या नहीं",
    ],
    hidesHeading: "क्या कभी नहीं मिलता",
    hides: [
      "संकल्प, आपके शब्द जाँच करने वाले को कभी नहीं दिखाए जाते",
      "पूरा नाम",
      "उसी व्यक्ति द्वारा उसी दिन रखा गया कोई अन्य नाम",
      "आपका ईमेल, आपका फ़ोन, या दी गई राशि",
    ],
    demoLabel: "अजनबी को यह दिखता है",
    demoStatus: "जारी",
    demoName: "D••••••• S•••••",
    demoRiver: "गंगा · हर की पौड़ी, हरिद्वार",
    demoKeptLabel: "जो क्षण रखा गया",
    demoKept: "14 मई 2026, 04:52 IST",
    demoReadingLabel: "पाठ लिया गया",
    demoReading: "14 मई 2026, 05:00 IST",
    demoSeedLabel: "बीज",
    demoCaption:
      "यह चित्रण है। यह उत्तर केवल इसी पृष्ठ के लिए रचा गया है, इस पहचान का कोई चिह्न मौजूद नहीं।",
    cta: "जाँच के पृष्ठ पर जाइए",
  },

  privacy: {
    eyebrow: "इसे कौन देख सकता है",
    title: "जब तक आप न चाहें, यह असूचीबद्ध रहता है।",
    items: [
      {
        h: "डिफ़ॉल्ट रूप से असूचीबद्ध",
        b: "चिह्न केवल अपने लिंक से खुलता है और उस पर noindex का निर्देश रहता है, इसलिए वह खोज परिणामों में नहीं आता। कहीं कोई सूची इसे नहीं दिखाती।",
      },
      {
        h: "लिंक की झलक पृष्ठ से कम कहती है",
        b: "चिह्न का लिंक किसी चैट में भेजने पर झलक में उकेरन, जल और दिनांक ही दिखते हैं। स्मरण में रखे गए नाम कभी झलक-चित्र में नहीं रखे जाते, मृत्यु किसी की झलक-तस्वीर नहीं होती।",
      },
      {
        h: "आप इसे वापस ले सकते हैं",
        b: "कहने भर से चिह्न वापस ले लिया जाता है: लिंक से पत्र खुलना बंद हो जाता है, और जाँच में वह दिनांक सहित ‘वापस लिया गया’ दिखता है।",
      },
      {
        h: "बही केवल आपकी है",
        b: "आपके अपने सब चिह्न एक ही बही में एक साथ रहते हैं, जो केवल आपके लिंक से खुलती है। एक को वापस लेने से बाकी पर कोई असर नहीं पड़ता, और आपकी बही से किसी और की बही तक पहुँचा नहीं जा सकता।",
      },
    ],
  },

  formats: {
    eyebrow: "यह आप तक कैसे पहुँचता है",
    title: "एक ही अभिलेख, तीन रूपों में।",
    items: [
      {
        h: "एक स्थायी पृष्ठ",
        b: "स्थायी लिंक, पहले फ़ोन के लिए बना, और ब्राउज़र से सीधे A4 पर छपने योग्य, हाशिये पहले से निर्धारित।",
      },
      {
        h: "सहेजने योग्य पत्र",
        b: "छपाई-योग्य विभेदन में वही A4 दस्तावेज़, और एक PDF जिसमें एज़्कार और मार्टेल सैंस भीतर ही रखे हैं, ताकि देवनागरी नाम कभी किसी दूसरे अक्षर-रूप में न बदल जाए।",
      },
      {
        h: "भेजने योग्य चित्र",
        b: "वही उकेरन उन नापों में कटी हुई जहाँ लोग सचमुच भेजते हैं: वह लंबा फ़्रेम जिसे चैट बिना काटे दिखाती है, स्टोरी, वर्ग, और लॉक स्क्रीन।",
      },
    ],
    nothingShipped:
      "आपको डाक से कुछ नहीं भेजा जाता। जल चिह्न भी यहाँ की हर वस्तु की भाँति डिजिटल है। न पार्सल, न प्रसाद, न कुरियर, और न बोतल में भरा जल।",
  },

  closing: {
    title: "कुछ भी तय करने से पहले, एक बार देख लीजिए।",
    lede: "नमूना पूरा पत्र है, पूरे आकार में, नमूने की छाप सहित, और उसके लिए रचे गए हर विवरण के बारे में स्पष्ट।",
    primary: "नमूना देखिए",
    secondary: "स्नान कैसे होता है",
  },

  sample: {
    eyebrow: "नमूना",
    title: "संपूर्ण जल चिह्न।",
    lede: "विन्यास, अक्षर, पंजिका और नीचे की पंक्ति ठीक वही हैं जो जारी किए गए पत्र पर होते हैं। विवरण इसी पृष्ठ के लिए रचे गए हैं। नाम संस्कृत व्याकरण के परंपरागत उदाहरण-नाम हैं, देवदत्त और यज्ञदत्त, और उस पर दी गई पहचान से कुछ नहीं खुलता।",
    noticeHeading: "इस नमूने में क्या रचा गया है, और क्या नहीं",
    noticeItems: [
      "रचा गया: दोनों नाम, उनका पारस्परिक संबंध, और गोत्र।",
      "रचा गया: दिनांक, बेला और तिथि। इस पृष्ठ के लिए किसी पंचांग से परामर्श नहीं लिया गया।",
      "रचा गया: प्रवाह का आँकड़ा, प्रतिशतक, पाठ का समय और दूरी।",
      "रचा गया: पहचान और पत्र-संख्या। इनके सापेक्ष कुछ जारी नहीं हुआ, और जाँच में यह पहचान अज्ञात बताई जाती।",
      "रचा नहीं गया: बीज। यह इससे पिछले पृष्ठ पर छपी पंक्ति का वास्तविक SHA-256 है, और आप इसे स्वयं चला सकते हैं।",
    ],
    plateHeading: "इस नमूने पर उकेरन नहीं है",
    plateBody:
      "जारी किए गए चिह्न पर उसकी उकेरन पत्र के ऊपरी आधे भाग में रहती है, जो उसी दिन के पाठ से बनती है। नमूने के पास कोई पाठ नहीं, इसलिए उसके पास कोई उकेरन भी नहीं, और यहाँ सजावट के लिए कोई चित्र बना देना इस खरे पृष्ठ की अकेली बेईमानी होती। आप जो देख रहे हैं, वह दस्तावेज़ की बनावट और उसकी पंजिका है।",
    notesHeading: "तीन बातें ध्यान देने योग्य",
    notes: [
      {
        h: "इस पर नमूने की छाप क्यों है",
        b: "जो नमूना जारी किए गए चिह्न जैसा दिखे, वह जालसाज़ी का निमंत्रण है। यह छाप पृष्ठ पर, छपाई पर, और उससे बने किसी भी चित्र पर बनी रहती है।",
      },
      {
        h: "जलस्तर का खाना",
        b: "इसमें लिखा है ‘इस धारा के लिए प्रकाशित नहीं’, और हरिद्वार पर यही सच है: उस धारा पर कोई सार्वजनिक गेज जलस्तर प्रकाशित नहीं करता। जहाँ करता है, जैसे गोदावरी के कुछ भागों पर, वहाँ उसके स्थान पर आँकड़ा और गेज अंकित होते हैं।",
      },
      {
        h: "तिथि का खाना",
        b: "यहाँ यह केवल विन्यास दिखाने के लिए है। जारी किए गए चिह्न पर यह तभी आता है जब तिथि किसी नामित पंचांग से पुष्ट हो; अन्यथा खाना केवल एक रेखा रह जाता है और पत्र एक विवरण छोटा हो जाता है।",
      },
    ],
    printHint: "यह पृष्ठ एक A4 पन्ने पर छपता है, और नमूने की छाप उसी के साथ छपती है।",
    smallScreenHint:
      "पत्र छपे हुए पन्ने का अनुपात रखता है, इसलिए फ़ोन पर वह छोटा दिखता है। हर विवरण पढ़ने के लिए इसे पूरे आकार में खोलिए।",
    back: "जल चिह्न क्या है",
    verifyCta: "किसी चिह्न की जाँच कीजिए",
  },

  sheet: {
    aria: "जल चिह्न",
    ariaSpecimen: "जल चिह्न, नमूना, किसी जारी की गई वस्तु का अभिलेख नहीं",
    titleLatin: "Jal Chihna",
    subtitle: "उस क्षण नदी की अपनी स्थिति, जो क्षण आपने रखा।",
    folioLabel: "चिह्न",
    namesLabel: "जिनके नाम से लिया गया",
    remembranceLabel: "जिनके स्मरण में लिया गया",
    givenByLabel: "भेंटकर्ता",
    gotraLabel: "गोत्र",
    gotraUnstated: "अनुल्लिखित",
    sankalpLabel: "संकल्प, जैसा लिखा गया",

    waterLabel: "जल और घाट",
    keptLabel: "जो क्षण रखा गया",
    localLabel: "आपके अपने समय में",
    tithiLabel: "तिथि",
    windowLabel: "बेला",
    flowLabel: "प्रवाह, प्रतिरूपित",
    levelLabel: "जलस्तर",
    readingLabel: "पाठ लिया गया",
    distanceLabel: "जल तक की दूरी",
    seedLabel: "बीज",
    stateLabel: "जल की स्थिति",

    verifyLabel: "इस चिह्न की जाँच कोई भी यहाँ कर सकता है",
    attestation:
      "इस पत्र पर अंकित संख्याएँ नदी की हैं, हमारी नहीं। वे ऊपर अंकित संस्था द्वारा प्रकाशित हुईं और उन्हीं से मिलाई जा सकती हैं।",
    footerLine:
      "घाट पर कोई अनुष्ठान नहीं किया गया। यह उस क्षण नदी की अपनी स्थिति का अभिलेख है जो क्षण आपने रखा, जो ऊपर अंकित सार्वजनिक स्रोत से लिया गया, और उसके साथ वह नाम तथा वे शब्द जो आपने दिए। यह इस बात का अभिलेख है कि जल क्या कर रहा था। आगे क्या होगा, इसका वचन नहीं।",

    specimenChip: "नमूना",
    specimenBanner:
      "नमूना। इस पत्र पर जारी की गई किसी वस्तु का अभिलेख नहीं, और यह पहचान कुछ भी नहीं खोलती।",

    viewFull: "पत्र पूरे आकार में खोलिए",
    viewerAria: "चिह्न-पत्र, पूरे आकार में",
    viewFit: "पूरा पत्र",
    viewRead: "पढ़ने का आकार",
    viewClose: "बंद कीजिए",
  },
};

export const chihnaContent = { en, hi } satisfies Record<Lang, typeof en>;

/* ------------------------------- the specimen ------------------------------ */

/** The bilingual watermark word tiled across a specimen sheet. */
export const SPECIMEN_WATERMARK_TEXT = "SPECIMEN · नमूना";

/**
 * The canonical line the specimen's seed is taken over, in the exact field
 * order the seed builder uses:
 *
 *   snanify.chihna | v | waterId | sourceCell | observedAtUtc | stageM |
 *   dischargeCumecs | keptAtUtc | nameNorm | gotraNorm
 *
 * A field nobody publishes is a single hyphen, which is why the level slot is
 * "-": no public gauge on the Haridwar reach publishes a stage.
 *
 * THIS STRING IS LOAD-BEARING. `SPECIMEN_SEED` is the first twelve characters
 * of its real SHA-256 digest,
 *   fc68aec95e10ffdd60804a6d4bd4112666a8fac87edb679a134dc2e4e9ea3330
 * and /patra invites the reader to run the hash themselves. Edit one byte of
 * the line and the seed on the page becomes a lie, so change both together or
 * neither.
 */
export const SPECIMEN_CANONICAL =
  "snanify.chihna|1|ganga-haridwar|GLOFAS-29.925-78.125|2026-05-14T05:00:00Z|-|1444.000|2026-05-13T23:22:00Z|devadatta sharma|kashyapa";

/** The first twelve characters of sha256(SPECIMEN_CANONICAL). Verified. */
export const SPECIMEN_SEED = "fc68aec95e10";

/**
 * A composed record, for /patra/sample and the illustration on /patra.
 *
 * Devadatta and Yajnadatta are the traditional placeholder names of Sanskrit
 * grammar. The tithi below was NOT computed from a panchang and must never be
 * presented as one: on an issued chihna the tithi cell is omitted unless
 * `confidence === "sourced"`, and it is marked "sourced" here only so the
 * specimen can demonstrate the layout. The identifier is not issued against
 * anything.
 *
 * The level is deliberately shown in its unavailable form. There is no public
 * gauge publishing a stage on the Ganga at Haridwar, and a specimen that
 * invented one is exactly the specimen that ends up copied into production.
 */
export function specimenChihna(lang: Lang): ChihnaRecord {
  const hi = lang === "hi";
  return {
    chihnaId: "pT4mKq9RxB2vLh6nYeW3dU",
    folioNo: hi ? "००४ २१७" : "004 217",
    sequenceLine: hi
      ? "हर की पौड़ी पर रखा गया १,४१२वाँ चिह्न"
      : "the 1,412th chihna kept at Har Ki Pauri",

    names: [
      { latin: "Devadatta Sharma", devanagari: "देवदत्त शर्मा" },
      {
        latin: "Yajnadatta Sharma",
        devanagari: "यज्ञदत्त शर्मा",
        relation: hi ? "पिता" : "father",
      },
    ],
    gotra: hi ? "काश्यप" : "Kashyapa",
    sankalpText: hi
      ? "बीते वर्ष के लिए कृतज्ञता, और आने वाले वर्ष में मन की शांति के निमित्त।"
      : "In gratitude for the year that has passed, and for peace of mind in the year ahead.",

    water: hi ? "गंगा" : "Ganga",
    ghat: hi ? "हर की पौड़ी" : "Har Ki Pauri",
    place: hi ? "हरिद्वार" : "Haridwar",

    keptOn: hi ? "14 मई 2026" : "14 May 2026",
    keptIst: "04:52 IST",
    keptLocal: hi ? "14 मई 2026 · 01:22 CEST" : "14 May 2026 · 01:22 CEST",

    tithi: {
      label: hi ? "वैशाख, शुक्ल अष्टमी" : "Vaishakha, Shukla Ashtami",
      confidence: "sourced",
    },
    window: {
      label: hi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat",
      span: hi ? "04:24 से 05:12 IST" : "04:24 to 05:12 IST",
    },

    flow: {
      value: hi ? "1,444 घन मी/से" : "1,444 m³/s",
      note: hi
        ? "1991 से वर्ष के इसी सप्ताह के 41% पाठों से अधिक"
        : "higher than 41% of readings here in this week of the year since 1991",
    },
    levelUnavailable: {
      value: hi ? "इस धारा के लिए प्रकाशित नहीं" : "Not published for this reach",
      note: hi
        ? "इस धारा पर कोई सार्वजनिक गेज जलस्तर प्रकाशित नहीं करता।"
        : "No public gauge on this reach publishes a level.",
    },

    reading: {
      at: hi ? "14 मई 2026, 05:00 IST" : "14 May 2026, 05:00 IST",
      agency: hi
        ? "कोपरनिकस EMS, ओपन-मेटियो के माध्यम से"
        : "Copernicus EMS, via Open-Meteo",
    },
    distance: {
      value: hi ? "5,739 किमी" : "5,739 km",
      note: hi ? "बर्लिन से हर की पौड़ी तक" : "Berlin to Har Ki Pauri",
    },

    stateLine: hi
      ? "गंगा वर्ष के इस मोड़ पर अपने सामान्य बहाव में बह रही थीं।"
      : "The Ganga was running as she usually runs at this turn of the year.",

    seed: SPECIMEN_SEED,
    verifyUrl: "snanify.com/c/pT4mKq9RxB2vLh6nYeW3dU",
  };
}
