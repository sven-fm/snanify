/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";


/**
 * Copy for the trust layer: /ethics and /faq.
 *
 * Every string exists in both locales. The `satisfies Record<Lang, typeof …En>`
 * on each export is deliberate, it makes a missing or renamed Hindi key a
 * compile error rather than a page that silently falls back to English.
 *
 * THE PRODUCT THIS FILE DESCRIBES: a purely digital snan. No priest, no ghat
 * performance, no camera, no recording, nothing done on anyone's behalf. The
 * user sits for three minutes with the live measured state of a
 * sacred river, says a sankalp in their own words, and keeps a mark and a
 * register line. Two rules bind every sentence below:
 *
 *   1. Never claim a physical rite happened. None does.
 *   2. Never make a promise that is not true. No guaranteed outcomes.
 *
 * Sourced from docs/digital/position.md (the manifesto), docs/digital/
 * experience.md (the five limbs and their timings) and docs/digital/river.md
 * (the data spine, which is normative wherever the other two disagree with it).
 *
 * PROVENANCE DISCIPLINE, do not loosen any of these:
 *   · Flow is MODELLED discharge from the Copernicus global flood model read
 *     through Open-Meteo, not a gauge reading. The word "modelled" appears
 *     everywhere a number does.
 *   · The Central Water Commission supplies the named station registry only,
 *     and four of the six waters have no CWC river level telemetry published.
 *     Never imply a gauge exists where one does not.
 *   · No water temperature anywhere. No live feed, no video, no generated
 *     imagery, no simulated reading.
 *   · The tracking copy names Vercel Web Analytics explicitly. If analytics is
 *     ever removed, tighten this copy back; never loosen it to cover a script
 *     that is not named on the page.
 *
 * PLACEHOLDER inventory, none of these may be presented as settled fact, and
 * each is stated as unsettled on the manifesto page (§11):
 *   · ethics@snanify.com, the address must exist and be monitored before launch
 *   · the panchang provider
 *   · the Open-Meteo commercial tier and the Copernicus attribution wording
 *   · which of the six waters carry a named government gauge
 *   · the licence and the recordist of every audio stem
 *   · the published edition the invocation verse in §03 is quoted from
 *   · the publication and revision dates of the manifesto
 */

export const ETHICS_MAIL = "ethics@snanify.com";

/* ------------------------------------------------------------------ nav --- */

/* The trust pages carry the same three header links. `rivers` is deliberately
   absent here: it already exists as content[lang].nav.rivers, and one label in
   two places is one label that will eventually disagree with itself. */
const navEn = {
  how: "How it works",
  ethics: "Manifesto",
  faq: "Questions",
};

export const trustNav = { en: navEn, hi: {
  how: "कैसे काम करता है",
  ethics: "घोषणा",
  faq: "प्रश्न",
} } satisfies Record<Lang, typeof navEn>;

/* ------------------------------------------------------- the manifesto --- */

const ethicsEn = {
  meta: {
    title: "How it is made: the river, the sky, and your sheet · Snanify",
    description:
      "Where every number on Snanify comes from: modelled river discharge from the Copernicus flood model, a panchang computed offline, and a Sankalp Patra anyone can recompute from its seed.",
  },
  eyebrow: "How it is made",
  title: "How it is made.",
  lede: "Six rivers, a panchang computed from the sky itself, and a sheet anyone can check. Here is where every number on this site comes from.",
  version: "Version 3. Every revision is kept and dated beside the one before it.",
  tocLabel: "On this page",

  s1: {
    n: "01",
    id: "standard",
    h: "The standard we build to",
    body: [
      "The practice is yours from end to end. You choose the water, you say the sankalp in your own words, and you keep the sheet it leaves.",
      "And every claim we print is one you can check yourself, from a public source, without asking us anything. That standard is why this page exists, and the rest of it is simply where to look.",
    ],
  },

  s2: {
    n: "02",
    id: "river",
    h: "The river",
    body: [
      "The flow at each of the six waters is modelled river discharge from the Copernicus Emergency Management Service global flood model, read through Open-Meteo at a grid cell calibrated onto the main stem. The model publishes once a day, the data is licensed CC BY 4.0, and every page that shows a figure carries the attribution.",
      "A figure is printed with the day it was modelled for. When the feed is quiet, the page shows the 1997 to 2025 seasonal median for that date, drawn from twenty-nine years of the same fortnight, and says that is what it is showing.",
      "The Central Water Commission's National Water Data Portal is the register of India's own gauges, and where a station sits on one of these reaches we name it: station, agency, coordinates and datum.",
    ],
  },

  s3: {
    n: "03",
    id: "sky",
    h: "The sky",
    body: [
      "Tithi, nakshatra and the muhurat windows are computed here, offline and deterministically, with astronomy-engine: the moon's apparent geocentric longitude, less the Lahiri ayanamsa, divided into the twenty-seven. No API and no key, so the same instant always returns the same sky, today and in ten years.",
      "Sunrise and sunset are computed at each ghat's own coordinates, which is why Brahma muhurat genuinely differs between Haridwar and Nashik rather than being one number printed twice.",
      "An exact timing with no named source behind it yet ships labelled provisional, and where sources disagree the page prints the range.",
    ],
  },

  s4: {
    n: "04",
    id: "patra",
    h: "Your Sankalp Patra",
    body: [
      "The sheet carries your name and the names you added, the water and the ghat, the instant you kept it in your own zone and in India Standard Time, the day's reading with its source, and a seed.",
      "The seed is computed from your sitting and that day's published figure, so anyone holding the sheet can recompute the engraving and get the identical image. Forging one means forging the public record first, which is the point of building it this way.",
      "Your sankalp stays yours. It is printed on your own copy and reaches nowhere a stranger can look.",
    ],
  },

  s5: {
    n: "05",
    id: "hands",
    h: "Who handles what",
    lede: "Five companies touch this product, and here is each of them and what they hold.",
    rows: [
      { k: "Payments", v: "Stripe. Card details go to them and never to us." },
      { k: "Accounts", v: "Clerk. Your email address and your sign-in." },
      { k: "Records", v: "Neon, Postgres. Your profile, your register and your sheets." },
      { k: "Files", v: "Vercel Blob. Your portrait and your rendered sheets." },
      { k: "Email", v: "Resend. Your receipt and your morning reminder, and nothing else." },
      { k: "Analytics", v: "Vercel Web Analytics. Page counts, with no cookies and no cross-site following." },
    ],
    body: ["Ask about any of it and a person answers."],
    mailLabel: "Write to us:",
  },

  closing: {
    title: "The river you are from, tomorrow morning.",
    body: "Eleven mornings cost eleven, one for each morning, in your own currency.",
    cta: "Begin",
  },
};

export const ethicsContent = { en: ethicsEn, hi: {
  meta: {
    title: "यह कैसे बनी है: नदी, आकाश, और आपका पत्र · Snanify",
    description:
      "स्नानिफ़ाई का हर अंक कहाँ से आता है: कोपरनिकस बाढ़-मॉडल से नदी का प्रवाह, बिना किसी सेवा के गणना किया पंचांग, और एक संकल्प पत्र जिसे उसके बीज से कोई भी पुनः बना सकता है।",
  },
  eyebrow: "यह कैसे बनी है",
  title: "यह कैसे बनी है।",
  lede: "छह नदियाँ, आकाश से ही गणना किया गया पंचांग, और एक ऐसा पत्र जिसे कोई भी जाँच सकता है। इस स्थल का हर अंक कहाँ से आता है, यह रहा।",
  version: "संस्करण ३। हर संशोधन पिछले के साथ, तिथि सहित, सुरक्षित रखा जाता है।",
  tocLabel: "इस पृष्ठ पर",

  s1: {
    n: "०१",
    id: "standard",
    h: "हमारा मानक",
    body: [
      "साधना आदि से अंत तक आपकी है। जल आप चुनते हैं, संकल्प आप अपने शब्दों में कहते हैं, और जो पत्र वह छोड़ जाती है, वह आप रखते हैं।",
      "और जो कुछ हम छापते हैं, उसे आप स्वयं, सार्वजनिक स्रोत से, हमसे कुछ पूछे बिना जाँच सकते हैं। यही मानक इस पृष्ठ का कारण है, और आगे बस यह लिखा है कि कहाँ देखना है।",
    ],
  },

  s2: {
    n: "०२",
    id: "river",
    h: "नदी",
    body: [
      "छहों जलों का प्रवाह कोपरनिकस एमरजेंसी मैनेजमेंट सर्विस के वैश्विक बाढ़-मॉडल से आता है, जिसे ओपन-मीटियो के माध्यम से उस ग्रिड-कोष्ठ पर पढ़ा जाता है जो नदी की मुख्य धारा पर बैठाया गया है। मॉडल दिन में एक बार प्रकाशित होता है, आँकड़े CC BY 4.0 के अंतर्गत हैं, और जिस भी पृष्ठ पर अंक दिखता है, वहाँ श्रेय भी छपा होता है।",
      "हर अंक के साथ वह दिन छपता है जिसके लिए वह मॉडल किया गया था। जब फ़ीड मौन हो, तो पृष्ठ उस तिथि का १९९७ से २०२५ तक का ऋतु-मध्यक दिखाता है, जो उन्नतीस वर्षों के उसी पखवाड़े से निकला है, और साथ में यह भी कहता है कि वह क्या दिखा रहा है।",
      "केंद्रीय जल आयोग का राष्ट्रीय जल आँकड़ा पोर्टल भारत के अपने मापक-स्थलों की पंजिका है, और इन जलों में जहाँ कोई स्थल है, हम उसे नाम सहित देते हैं: स्थल, एजेंसी, निर्देशांक और डेटम।",
    ],
  },

  s3: {
    n: "०३",
    id: "sky",
    h: "आकाश",
    body: [
      "तिथि, नक्षत्र और मुहूर्त यहीं गणना किए जाते हैं, बिना किसी बाहरी सेवा के और सदा एक ही परिणाम के साथ, astronomy-engine से: चंद्रमा का दृश्य भूकेंद्रीय देशांतर, उसमें से लाहिड़ी अयनांश घटाकर, सत्ताईस में विभाजित। न कोई एपीआई, न कुंजी, इसलिए वही क्षण आज भी वही आकाश देता है और दस वर्ष बाद भी।",
      "सूर्योदय और सूर्यास्त हर घाट के अपने निर्देशांकों पर गणना होते हैं, इसीलिए हरिद्वार और नासिक का ब्रह्म मुहूर्त सचमुच अलग होता है, एक ही अंक दो बार छपा हुआ नहीं।",
      "जिस सटीक समय के पीछे अभी कोई नामित स्रोत नहीं है, वह 'अस्थायी' अंकित होकर जाता है, और जहाँ स्रोत आपस में भिन्न हों, वहाँ पृष्ठ पूरी परिधि छापता है।",
    ],
  },

  s4: {
    n: "०४",
    id: "patra",
    h: "आपका संकल्प पत्र",
    body: [
      "पत्र पर आपका नाम और आपके जोड़े हुए नाम होते हैं, जल और घाट, वह क्षण जो आपने रखा, आपके अपने समय में और भारतीय मानक समय में, उस दिन का पाठ अपने स्रोत सहित, और एक बीज।",
      "बीज आपकी बैठक और उस दिन के प्रकाशित अंक से बनता है, इसलिए पत्र रखने वाला कोई भी उस उत्कीर्णन को फिर से बना सकता है और वही चित्र पाएगा। उसकी नकल बनाने के लिए पहले सार्वजनिक अभिलेख की नकल बनानी पड़ेगी, और इसे ऐसे बनाने का यही प्रयोजन है।",
      "आपका संकल्प आपका ही रहता है। वह आपकी अपनी प्रति पर छपता है, और वहाँ कहीं नहीं पहुँचता जहाँ कोई अजनबी देख सके।",
    ],
  },

  s5: {
    n: "०५",
    id: "hands",
    h: "किसके हाथ में क्या है",
    lede: "इस उत्पाद को पाँच कंपनियाँ छूती हैं। हर एक, और उसके पास क्या रहता है, यह रहा।",
    rows: [
      { k: "भुगतान", v: "Stripe। कार्ड का विवरण उन तक जाता है, हम तक कभी नहीं।" },
      { k: "खाते", v: "Clerk। आपका ईमेल पता और आपका प्रवेश।" },
      { k: "अभिलेख", v: "Neon, Postgres। आपकी प्रोफ़ाइल, आपकी पंजिका और आपके पत्र।" },
      { k: "फ़ाइलें", v: "Vercel Blob। आपका चित्र और बने हुए पत्र।" },
      { k: "ईमेल", v: "Resend। आपकी रसीद और आपकी प्रातःकालीन सूचना, इसके अतिरिक्त कुछ नहीं।" },
      { k: "आँकड़े", v: "Vercel Web Analytics। पृष्ठ-गणना, बिना कुकी और बिना अंतर-स्थल अनुसरण के।" },
    ],
    body: ["इनमें से किसी के विषय में पूछिए, उत्तर कोई व्यक्ति देगा।"],
    mailLabel: "हमें लिखिए:",
  },

  closing: {
    title: "जिस नदी से आप हैं, कल सुबह।",
    body: "ग्यारह सुबहें ग्यारह में, हर सुबह के लिए एक, आपकी अपनी मुद्रा में।",
    cta: "आरंभ करें",
  },
} } satisfies Record<Lang, typeof ethicsEn>;

/* ------------------------------------------------------------------ faq --- */

const faqEn = {
  meta: {
    title: "Questions, including the sceptical ones · Snanify",
    description:
      "What am I paying for? Is this religious? Does it work? Is there a priest? Where does the river data come from? What happens to my name and my sankalp? Plain answers, including the ones where the honest answer is that we cannot promise.",
  },
  eyebrow: "Questions",
  title: "Questions, including the ones we would rather not be asked.",
  lede: "If the honest answer is that we cannot promise something, the answer below says exactly that. Nothing here is written to close a sale.",
  indexLabel: "Sections",
  moreLabel: "Read the long answer",
  ctaLabel: "Sit with the river",

  groups: [
    {
      id: "sitting",
      title: "What actually happens",
      items: [
        {
          id: "what-happens",
          q: "What is actually on my screen?",
          a: [
            "Five limbs, always the same, three minutes end to end. Twenty-one seconds of the river's reading. Sixty seconds of breathing with a waterline that rises for four and falls for six. Sixty seconds with your own sankalp, held for eleven while the words fill with vermillion. Sixty seconds of black screen with the river running. Thirty-five seconds in which the day writes itself into your register.",
            "The waterline is the only thing telling you time is passing, and it is busy doing something else.",
          ],
        },
        {
          id: "black-screen",
          q: "Sixty seconds of a black screen? Really?",
          a: [
            "Yes, and it is the best part. The screen tells you to put the phone down, and then it goes away.",
            "If you pick it up, nothing happens. No counter, no penalty, no note that you moved. One bell brings you back at sixty seconds.",
            "A digital product whose best minute is the minute the screen is off is a strange thing to build and an easy thing to defend.",
          ],
        },
        {
          id: "when",
          q: "Do I have to be awake at four in the morning?",
          a: [
            "Sit at the hour you actually wake. You tell us when that is, and the river is brought to that hour in your own timezone. Plenty of people sit in the evening.",
            "The muhurat windows are computed against that ghat's true sunrise, so they are genuinely different for Haridwar and Nashik. Sit inside one if it matters to you, and outside one if it does not.",
          ],
        },
        {
          id: "miss",
          q: "What if I miss a day?",
          a: [
            "Pick it up the next morning. Your snans sit on your account until you use them.",
            "Your register is a record: it counts the mornings you kept and leaves the rest alone. That is precisely why people keep going.",
          ],
        },
        {
          id: "sound",
          q: "Is the sound real? Is it live?",
          a: [
            "It is real water, and it is not live.",
            "Four recordings of moving water are mixed against the river's actual percentile, so a river in spate sounds broken and urgent and a slack river wide and slow. Rain fades in when it is raining at that ghat. Every recording is licensed and credited.",
            "There is no microphone at any ghat, no live feed, and no generated audio. A water we have no honest recording of ships silent, and its page says so.",
          ],
        },
        {
          id: "shipping",
          q: "Do you send me Ganga jal, or prasad?",
          a: [
            "Everything Snanify gives you arrives on your screen, the moment you finish: the sitting, your Sankalp Patra, and your register.",
            "That is what makes it work from Frankfurt or Fremont as well as from Faridabad. Nothing waits at customs, and there is nothing to wait for.",
          ],
        },
        {
          id: "mark",
          q: "What is the mark I keep?",
          a: [
            "One engraving per sitting, drawn from the reading you sat with: the water, the flow, where that flow sits against twenty-nine years of the same week, the minute, and your name and gotra. A monsoon morning is dark and crowded; a January morning pale and open.",
            "It carries the string it was generated from, so anyone can recompute it and check the river figure against the public source. Forging one would mean forging a public river record.",
            "At the foot of every sheet, at full weight and not in fine print: no rite was performed for you, this sheet records a river, a minute, and the words you chose to say into it.",
          ],
        },
      ],
    },
    {
      id: "river",
      title: "The river",
      items: [
        {
          id: "data",
          q: "Where does the river data come from?",
          a: [
            "Modelled river discharge from the Copernicus Emergency Management Service global flood model, read through Open-Meteo at the grid cell covering that reach. It is public data, licensed CC BY 4.0, and we carry the attribution on every page that shows a number.",
            "It is a model, not a gauge reading, and we write “modelled” every time rather than let you assume there is an instrument in the water with our name on it.",
            "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates. Tithi and the muhurat windows are computed from the panchang against that ghat's true sunrise.",
          ],
        },
        {
          id: "percentile",
          q: "What does the percentile mean?",
          a: [
            "Where today's flow sits against every daily value that same cell has produced in this same week of the year from 1997 to 2025. Six hundred and nine days of that river's own history.",
            "It is the only honest way to compare a river to anything. The Kaveri at Talakaveri runs at about six cubic metres a second and the Sangam at five thousand, and neither number tells you whether either is behaving unusually. The percentile does.",
          ],
        },
        {
          id: "verify",
          q: "How do I know a Sankalp Patra is genuine?",
          a: [
            "Every sheet carries the line it was made from and the seed that line hashes to. Take that day's figure from the flood model, hash the line yourself, and you get the same seed and the same engraving.",
            "That is why the engraving is drawn from the river rather than chosen: forging a sheet means forging Copernicus's published record for that day first.",
            "A stranger holding your link sees the names on the sheet, the water, the day and the reading. Your sankalp is not among them.",
          ],
        },
        {
          id: "offline",
          q: "What happens when you cannot reach the river?",
          a: [
            "The page says so and prints the twenty-nine year median for today's date, labelled as that: what this river usually does on the eleventh of August, taken from twenty-nine years of Augusts.",
            "We never interpolate and we never invent a plausible number. A reading a day old is served with its true timestamp and no apology, because a river moves on the scale of days.",
            "The one time the model goes quiet and the page says the model has gone quiet is worth more to us than a year of marketing.",
          ],
        },
      ],
    },
    {
      id: "money",
      title: "Money",
      items: [
        {
          id: "paying-for",
          q: "What am I actually paying for?",
          a: [
            "A sitting: three minutes with the river as she runs that day, the panchang behind the hour, and your own words.",
            "And what it leaves you: a Sankalp Patra carrying your name, your family's names and that day's reading, and a line in a register you keep.",
          ],
        },
        {
          id: "free",
          q: "Is there a free version?",
          a: [
            "Everything that is a page rather than a practice is free forever, with no account: the live state of all six waters, the panchang, and the muhurat calendar. Read all of it, every day, and pay nothing.",
            "The sitting itself is what you buy, and one morning costs {price:one}. We would rather charge for the thing itself and keep your attention yours.",
          ],
        },
        {
          id: "prices",
          q: "What does it cost?",
          a: [
            "Ek Dhara, one snan, {price:one}.",
            "Gyarah, eleven snans, {price:eleven}, one for each morning, and the line most people take.",
            "Varsh Kosh, sixty snans, {price:sixty}.",
            "Snans sit on your account until you use them. Nothing expires, nothing renews itself, and no box is ticked for you.",
          ],
        },
        {
          id: "eleven",
          q: "Why eleven at a time and not one?",
          a: [
            "An unglamorous reason we would rather print than hide. A single charge loses about a third of itself to card fees. Eleven at once loses about six percent.",
            "Eleven is what holds the price. Sold one at a time, a third of what you paid would go to the card network and the price would have to go up.",
          ],
        },
        {
          id: "india",
          q: "Why is the India price different?",
          a: [
            "Because a price that ignores where someone lives is not one price, it is a wall. India pays rupees, Canada Canadian dollars, the eurozone euro, and everywhere else US dollars.",
            "Nothing differs between them except the number. The same sittings, the same waters, the same marks.",
          ],
        },
        {
          id: "refund",
          q: "Can I get a refund?",
          a: [
            "Yes. Any snans you have not used are refunded in full, on one click, without being asked why.",
            "A sitting you have already done is not refundable, and we would rather say that plainly. Nothing was consumed except three minutes of your own attention, and we cannot give those back either.",
            "If the site failed you, the model was stale and we did not say so, or the sound did not play, write to us and we will refund the sitting itself.",
          ],
        },
        {
          id: "account",
          q: "Do I need an account?",
          a: [
            "Yes, for the snan, because your sankalp, your register and your marks have to belong to somebody and that somebody is you. There is no account needed to read anything on this site.",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "Names, gotra and family",
      items: [
        {
          id: "gotra",
          q: "I do not know my gotra, or my family does not use one.",
          a: [
            "Then leave it blank. A form that insists on a gotra is a form that sorts people by caste, and ours does not insist.",
            "If the field is empty the sankalp says the gotra is not stated, plainly and with no apology. If you would rather use the customary Kashyapa gotra, or your family's own convention, tell us and we will use that.",
          ],
        },
        {
          id: "names",
          q: "Can I include several people? What if they have different gotras?",
          a: [
            "Yes, and yes. Each name may carry its own gotra, because households are not uniform: a woman who married in, an adopted child, an inter-caste marriage. One gotra imposed on six names would be simply wrong for most families.",
            "You will be asked to confirm that anyone living whom you name would not object. If they later ask us to remove their details, we do it, without asking your permission first.",
          ],
        },
        {
          id: "ancestors",
          q: "Can I do this in memory of someone who has died?",
          a: [
            "Yes, and many people do. Name them in your own sankalp, in your own words, and sit with them in mind.",
            "Their name goes on your Sankalp Patra beside yours, marked as remembrance, with the river and the day. It is a sheet worth keeping and worth sending to the family.",
            "If a tithi matters to you, tell us and we will bring the river on that tithi, once a year, and leave you alone the rest of it.",
          ],
        },
        {
          id: "who-can-book",
          q: "I am not Hindu, or my family is inter-faith, or my name is not a Hindu name. Can I use this?",
          a: [
            "Yes, anyone. Sit as you are.",
            "People sit for a Hindu parent, for a spouse, for a friend, for themselves, and for three quiet minutes with a river they have never seen.",
          ],
        },
      ],
    },
    {
      id: "data-privacy",
      title: "Your data",
      items: [
        {
          id: "sankalp-private",
          q: "Who reads my sankalp?",
          a: [
            "Yours alone. It is shown to you and to nobody else.",
            "It stays off your Sankalp Patra, out of your register line, and out of anything a stranger holding your identifier can look up. What they see is a masked name, the water, the day and the reading.",
            "Reading one inside Snanify takes two approvals and a written reason, is logged permanently, and you are emailed within a day telling you it was read, by whom, and why.",
          ],
        },
        {
          id: "delete",
          q: "Can I delete everything?",
          a: [
            "Yes. One button, across copies and backups, within seven days. It works by destroying the key your record was encrypted with, which is why it holds even where storage cannot be overwritten.",
            "The mark you downloaded keeps working, because what it stands on is a public river reading rather than a row in our database. Deleting removes our ability to hold your sankalp, not your ability to prove what the river was doing.",
            "The confirmation lists what was deleted and what was kept, including the invoices tax law requires.",
          ],
        },
        {
          id: "tracking",
          q: "What is tracking me on this site?",
          a: [
            "No advertising script and no session-replay script, anywhere, ever. Nothing records the screen where you type your sankalp.",
            "Two third-party scripts exist in the whole product, and we name both. Vercel Web Analytics counts page views: no cookies, no cross-site following, no sight of any form. The payment processor's script runs on the payment step alone.",
          ],
        },
        {
          id: "panchang",
          q: "Why are some timings marked provisional?",
          a: [
            "Because we have not yet named a panchang source, and a precise time with nothing behind it is an invented fact.",
            "Until a source is named, every exact time carries that label, and where sources disagree we show the range rather than pick the one that suits us. When a source is named, the method, the ayanamsa and the ghat's coordinates are published beside the times.",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "Not answered here?",
    body: "Write to us. If it is a question others will have, we add it to this page. If you think we have got something wrong, we publish objections made in good faith along with what we did about them.",
    mailLabel: "Write to us",
  },
};

export const faqContent = { en: faqEn, hi: {
  meta: {
    title: "प्रश्न, संशय के प्रश्न भी · स्नानिफ़ाई",
    description:
      "मैं किसका भुगतान कर रहा हूँ? क्या यह धार्मिक है? क्या इससे कुछ होता है? क्या कोई पुरोहित है? नदी के आँकड़े कहाँ से आते हैं? मेरे नाम और मेरे संकल्प का क्या होता है? सीधे उत्तर, वे भी जहाँ सच्चा उत्तर यही है कि हम वचन नहीं दे सकते।",
  },
  eyebrow: "प्रश्न",
  title: "प्रश्न, वे भी जो हमसे न पूछे जाएँ तो अच्छा लगता।",
  lede: "जहाँ सच्चा उत्तर यह है कि हम कोई वचन नहीं दे सकते, वहाँ उत्तर ठीक यही कहता है। यहाँ कुछ भी सौदा पक्का करने के लिए नहीं लिखा गया।",
  indexLabel: "खंड",
  moreLabel: "विस्तृत उत्तर पढ़िए",
  ctaLabel: "नदी के साथ बैठिए",

  groups: [
    {
      id: "sitting",
      title: "वास्तव में होता क्या है",
      items: [
        {
          id: "what-happens",
          q: "मेरी स्क्रीन पर वास्तव में क्या होता है?",
          a: [
            "पाँच अंग, सदा वही, आरंभ से अंत तक तीन मिनट। इक्कीस सेकंड नदी का पाठ। साठ सेकंड श्वास, जिसमें जल-रेखा चार सेकंड चढ़ती और छह सेकंड उतरती है। साठ सेकंड अपने संकल्प के साथ, ग्यारह सेकंड थामे हुए, जब अक्षर सिंदूरी रंग से भर जाते हैं। साठ सेकंड अंधेरी स्क्रीन, नदी बहती हुई। और पैंतीस सेकंड, जिनमें वह दिन आपकी पंजिका में लिख जाता है।",
            "इसमें कहीं कोई प्रगति-पट्टी नहीं है, और कोई “जल्दी वाला” रूप नहीं। समय बीतने का एकमात्र संकेत जल-रेखा है, और वह अपने में व्यस्त है।",
          ],
        },
        {
          id: "black-screen",
          q: "साठ सेकंड अंधेरी स्क्रीन? सचमुच?",
          a: [
            "हाँ, और वही सबसे अच्छा भाग है। स्क्रीन कहती है कि फ़ोन नीचे रख दीजिए, और फिर वह स्वयं चली जाती है।",
            "यदि आप उसे उठा लें तो कुछ नहीं होता। न कोई गिनती, न दंड, न यह टिप्पणी कि आप हिले। साठ सेकंड पर एक घंटी आपको वापस बुला लेती है।",
            "जिस डिजिटल वस्तु का सबसे अच्छा मिनट वही हो जब स्क्रीन बंद रहे, उसे बनाना विचित्र है और उसका बचाव सरल।",
          ],
        },
        {
          id: "when",
          q: "क्या तड़के चार बजे जागना आवश्यक है?",
          a: [
            "उसी घड़ी बैठिए जिस घड़ी आप सचमुच उठते हैं। वह समय आप बताते हैं, और नदी उसी घड़ी तक, आपके अपने समय में, लाई जाती है। बहुत लोग संध्या में भी बैठते हैं।",
            "मुहूर्त उस घाट के वास्तविक सूर्योदय से गणना किए जाते हैं, इसलिए हरिद्वार और नासिक के मुहूर्त सचमुच भिन्न होते हैं। यदि आपके लिए इसका महत्व है तो मुहूर्त के भीतर बैठिए, और न हो तो बाहर।",
          ],
        },
        {
          id: "miss",
          q: "यदि कोई दिन छूट जाए तो?",
          a: [
            "अगली सुबह फिर बैठ जाइए। आपके स्नान आपके खाते में तब तक रहते हैं जब तक आप उन्हें लेते नहीं।",
            "आपकी पंजिका एक अभिलेख है: वह उन सुबहों को गिनती है जो आपने निभाईं, और बाकी को यूँ ही रहने देती है। लोग इसी कारण चलते रहते हैं।",
          ],
        },
        {
          id: "sound",
          q: "क्या ध्वनि असली है? क्या वह सजीव है?",
          a: [
            "जल सच्चा है, और ध्वनि सजीव नहीं है।",
            "बहते जल की चार रिकॉर्डिंग नदी के वास्तविक प्रतिशतक के सामने मिलाई जाती हैं, इसलिए उफान पर बहती नदी टूटी और तेज़ सुनाई देती है और मंद नदी चौड़ी और धीमी। जब उस घाट पर वर्षा होती है, तब वर्षा भी घुल आती है। हर रिकॉर्डिंग अनुज्ञप्त और श्रेय सहित है।",
            "किसी घाट पर कोई माइक्रोफ़ोन नहीं है, कहीं से कोई सजीव प्रसारण नहीं है, और कोई कृत्रिम रूप से बनाई गई ध्वनि नहीं है। जिस जल की हमारे पास सच्ची रिकॉर्डिंग नहीं, वह मौन ही आता है, और उसका पृष्ठ यही कहता है, किसी और की नदी उधार नहीं लेता।",
          ],
        },
        {
          id: "shipping",
          q: "क्या आप गंगाजल या प्रसाद भेजते हैं?",
          a: [
            "स्नानिफ़ाई जो देती है, वह आपके पूरा करते ही आपकी स्क्रीन पर आ जाता है: बैठक, आपका संकल्प पत्र, और आपकी पंजिका।",
            "इसी कारण यह फ़रीदाबाद की तरह फ़्रैंकफ़र्ट और फ़्रीमॉन्ट से भी उतना ही चलता है। कुछ सीमा-शुल्क पर नहीं रुकता, और किसी की प्रतीक्षा भी नहीं करनी पड़ती।",
          ],
        },
        {
          id: "mark",
          q: "जो चिह्न मुझे मिलता है, वह क्या है?",
          a: [
            "हर बैठक पर एक कृति, ठीक उसी पाठ से खींची हुई जिसके साथ आप बैठे: जल, प्रवाह, वह प्रवाह उसी सप्ताह के उनतीस वर्षों के सामने कहाँ बैठता है, वह मिनट, और आपका नाम तथा गोत्र। वर्षा की सुबह गहरी और भरी हुई होती है। जनवरी की सुबह हल्की और खुली।",
            "उस पर वही पंक्ति रहती है जिससे वह बना, इसलिए कोई भी उसे दोबारा बनाकर नदी के अंक सार्वजनिक स्रोत से मिला सकता है। इसे नक़ली बनाने का अर्थ होगा नदी का सार्वजनिक अभिलेख नक़ली बनाना।",
            "हर पत्र के पाद पर, पूरे भार में और किसी छोटे अक्षर में नहीं: आपके लिए कोई अनुष्ठान नहीं किया गया। यह पत्र एक नदी, एक क्षण, और वे शब्द अंकित करता है जो आपने उसमें कहे।",
          ],
        },
      ],
    },
    {
      id: "river",
      title: "नदी",
      items: [
        {
          id: "data",
          q: "नदी के आँकड़े कहाँ से आते हैं?",
          a: [
            "कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़ मॉडल से लिया गया प्रतिरूपित नदी-प्रवाह, जो Open-Meteo के माध्यम से उस ग्रिड-खंड पर पढ़ा जाता है जो नदी की उस धारा को ढकता है। यह सार्वजनिक आँकड़ा है, CC BY 4.0 के अंतर्गत, और जिस भी पृष्ठ पर अंक दिखता है वहाँ हम उसका श्रेय देते हैं।",
            "यह एक मॉडल है, गेज का पाठ नहीं, और हम हर बार “प्रतिरूपित” ही लिखते हैं, ताकि आप यह न मान बैठें कि जल में हमारे नाम का कोई यंत्र लगा है।",
            "सूर्योदय, सूर्यास्त, वायु का तापमान और वर्षा घाट के अपने निर्देशांक पर पढ़े जाते हैं। तिथि और मुहूर्त उसी घाट के वास्तविक सूर्योदय के आधार पर पंचांग से गणना किए जाते हैं।",
          ],
        },
        {
          id: "percentile",
          q: "प्रतिशतक का अर्थ क्या है?",
          a: [
            "आज का प्रवाह उन सब दैनिक मानों के सामने कहाँ बैठता है जो उसी खंड पर वर्ष के इसी सप्ताह में १९९७ से २०२५ तक आए। उस नदी के अपने इतिहास के छह सौ नौ दिन।",
            "किसी नदी की तुलना करने का यही एकमात्र सच्चा ढंग है। तालकावेरी में कावेरी लगभग छह घन मीटर प्रति सेकंड बहती हैं और संगम पर पाँच हज़ार, और इनमें से कोई अंक यह नहीं बताता कि कोई नदी असामान्य व्यवहार कर रही है या नहीं। प्रतिशतक बताता है।",
          ],
        },
        {
          id: "verify",
          q: "मुझे कैसे पता चले कि कोई संकल्प पत्र असली है?",
          a: [
            "हर पत्र पर वह पंक्ति छपी होती है जिससे वह बना, और वह बीज भी जो उस पंक्ति का हैश है। उस दिन का अंक बाढ़-मॉडल से लीजिए, पंक्ति का हैश स्वयं बनाइए, और वही बीज तथा वही उत्कीर्णन मिलेगा।",
            "इसीलिए उत्कीर्णन नदी से बनता है, चुना नहीं जाता: पत्र की नकल बनाने के लिए पहले उस दिन का कोपरनिकस का प्रकाशित अभिलेख गढ़ना पड़ेगा।",
            "आपकी कड़ी रखने वाले किसी अजनबी को पत्र पर के नाम, जल, दिन और उस दिन का पाठ दिखता है। आपका संकल्प उनमें नहीं है।",
          ],
        },
        {
          id: "offline",
          q: "जब आप नदी तक न पहुँच सकें तब क्या होता है?",
          a: [
            "पृष्ठ यही कहता है और आज की तिथि का उनतीस-वर्षीय मध्यमान छापता है, ठीक इसी नाम से: यह वह है जो यह नदी सामान्यतः ग्यारह अगस्त को करती है, उनतीस वर्षों के अगस्त से लिया गया।",
            "हम न बीच के मान गढ़ते हैं, न कोई विश्वसनीय दिखने वाला अंक बनाते हैं। एक दिन पुराना पाठ अपने सच्चे समय के साथ दिखाया जाता है, बिना किसी सफ़ाई के, क्योंकि नदी दिनों की गति से बदलती है।",
            "जिस दिन मॉडल चुप हो जाए और पृष्ठ कह दे कि मॉडल चुप है, वह दिन हमारे लिए वर्ष भर के विज्ञापन से अधिक मूल्यवान है।",
          ],
        },
      ],
    },
    {
      id: "money",
      title: "मूल्य",
      items: [
        {
          id: "paying-for",
          q: "मैं वास्तव में किसका भुगतान कर रहा हूँ?",
          a: [
            "एक बैठक का: उस दिन नदी जिस प्रवाह पर बह रही है, उसके साथ तीन मिनट, उस घड़ी के पीछे का पंचांग, और आपके अपने शब्द।",
            "और जो वह आपके पास छोड़ जाती है: एक संकल्प पत्र, जिस पर आपका नाम, आपके परिवार के नाम और उस दिन का पाठ अंकित है, तथा आपकी पंजिका में एक पंक्ति।",
          ],
        },
        {
          id: "free",
          q: "क्या कोई निःशुल्क रूप है?",
          a: [
            "जो पृष्ठ है, साधना नहीं, वह बिना खाते के सदा निःशुल्क है: छहों जलों की सजीव स्थिति, पंचांग, और मुहूर्त तथा उसके पर्व। सब पढ़िए, हर दिन पढ़िए, और कुछ मत दीजिए।",
            "मूल्य बैठक का है, और एक सुबह {price:one} की पड़ती है। हम वस्तु का ही मूल्य लेना ठीक मानते हैं, और आपका ध्यान आपका ही रहने देते हैं।",
          ],
        },
        {
          id: "prices",
          q: "इसका मूल्य क्या है?",
          a: [
            "एक धारा, एक स्नान, {price:one}।",
            "ग्यारह, ग्यारह स्नान, {price:eleven}, हर सुबह के लिए एक, और अधिकांश लोग यही लेते हैं।",
            "वर्ष कोश, साठ स्नान, {price:sixty}।",
            "स्नान आपके लेने तक आपके खाते में रहते हैं। कुछ भी समाप्त नहीं होता, कुछ भी स्वयं नवीनीकृत नहीं होता, और कोई डिब्बी आपके लिए पहले से चुनी हुई नहीं होती।",
          ],
        },
        {
          id: "eleven",
          q: "एक-एक क्यों नहीं, ग्यारह एक साथ क्यों?",
          a: [
            "कारण साधारण है जिसे हम छिपाने के बजाय छाप देना ठीक समझते हैं। एक अकेला भुगतान अपना लगभग एक तिहाई कार्ड शुल्क में गँवा देता है। एक साथ गुज़रते ग्यारह लगभग छह प्रतिशत।",
            "मूल्य ग्यारह के कारण ही टिकता है। एक-एक बेचते, तो आपके दिए हुए का एक तिहाई कार्ड नेटवर्क को जाता और मूल्य बढ़ाना पड़ता।",
          ],
        },
        {
          id: "india",
          q: "भारत का मूल्य अलग क्यों है?",
          a: [
            "क्योंकि जो मूल्य यह नहीं देखता कि व्यक्ति कहाँ रहता है, वह एक मूल्य नहीं, एक दीवार है। भारत में रुपया, कनाडा में कनाडाई डॉलर, यूरो-क्षेत्र में यूरो, और शेष सर्वत्र अमेरिकी डॉलर।",
            "अंक के अतिरिक्त दोनों में कुछ भी भिन्न नहीं। वही बैठकें, वही जल, वही चिह्न।",
          ],
        },
        {
          id: "refund",
          q: "क्या राशि वापस मिल सकती है?",
          a: [
            "हाँ। जो स्नान आपने नहीं लिए, उनकी पूरी राशि एक क्लिक पर वापस, बिना यह पूछे कि क्यों।",
            "जो बैठक आप कर चुके हैं, वह वापसी योग्य नहीं है, और यह हम साफ़ कह देना चाहेंगे। उसमें आपके अपने ध्यान के तीन मिनट के अतिरिक्त कुछ ख़र्च नहीं हुआ, और वे मिनट हम भी लौटा नहीं सकते।",
            "यदि साइट ने आपका साथ न दिया, मॉडल पुराना था और हमने बताया नहीं, या ध्वनि नहीं बजी, तो हमें लिखिए और हम उस बैठक की राशि लौटा देंगे।",
          ],
        },
        {
          id: "account",
          q: "क्या खाता बनाना आवश्यक है?",
          a: [
            "स्नान के लिए हाँ, क्योंकि आपका संकल्प, आपकी पंजिका और आपके चिह्न किसी के तो होंगे, और वे आपके हैं। इस साइट पर कुछ भी पढ़ने के लिए किसी खाते की आवश्यकता नहीं।",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "नाम, गोत्र और परिवार",
      items: [
        {
          id: "gotra",
          q: "मुझे अपना गोत्र नहीं मालूम, या मेरा परिवार गोत्र नहीं मानता।",
          a: [
            "तो उसे रिक्त छोड़ दीजिए। जो फ़ॉर्म गोत्र पर अड़ता है, वह लोगों को जाति से छाँटने वाला फ़ॉर्म है; हमारा नहीं अड़ता।",
            "खाना रिक्त हो तो संकल्प में सीधे लिखा जाता है कि गोत्र अनुक्त है, बिना किसी सफ़ाई के। यदि आप प्रचलित कश्यप गोत्र लेना चाहें, या आपके परिवार की अपनी परिपाटी हो, बता दीजिए, हम वही लेंगे।",
          ],
        },
        {
          id: "names",
          q: "क्या कई लोगों को जोड़ सकते हैं? यदि उनके गोत्र अलग हों तो?",
          a: [
            "हाँ, और हाँ। हर नाम का अपना गोत्र हो सकता है, क्योंकि घर एकरूप नहीं होते, विवाह कर आई स्त्री, गोद लिया बच्चा, अंतर्जातीय विवाह। छह नामों पर एक ही गोत्र थोप देना अधिकांश परिवारों के लिए ग़लत संकल्प बनाता।",
            "जिन जीवित व्यक्तियों का नाम आप देते हैं, उनके विषय में आपसे पुष्टि माँगी जाती है कि उन्हें आपत्ति न होगी। यदि वे बाद में अपनी सूचना हटाने को कहें, तो हम हटा देते हैं, आपकी अनुमति लिए बिना।",
          ],
        },
        {
          id: "ancestors",
          q: "क्या यह किसी दिवंगत के स्मरण में किया जा सकता है?",
          a: [
            "जी हाँ, और बहुत लोग करते हैं। उनका नाम अपने संकल्प में, अपने शब्दों में लिखिए, और उन्हें मन में रखकर बैठिए।",
            "उनका नाम आपके संकल्प पत्र पर आपके नाम के साथ आता है, स्मरण के रूप में अंकित, नदी और उस दिन के साथ। यह पत्र सँभालने योग्य होता है, और परिवार को भेजने योग्य भी।",
            "यदि कोई तिथि आपके लिए महत्व रखती है, तो बता दीजिए। हम उसी तिथि पर, वर्ष में एक बार, नदी ले आएँगे, और शेष वर्ष आपको सूचनाओं से नहीं घेरेंगे।",
          ],
        },
        {
          id: "who-can-book",
          q: "मैं हिंदू नहीं हूँ, या मेरा परिवार अंतर-धार्मिक है, या मेरा नाम हिंदू नाम नहीं है। क्या मैं यह कर सकता हूँ?",
          a: [
            "जी हाँ, कोई भी। आप जैसे हैं, वैसे ही बैठिए।",
            "लोग अपने हिंदू माता-पिता के लिए बैठते हैं, जीवनसाथी के लिए, मित्र के लिए, अपने लिए, और उस नदी के साथ तीन शांत मिनटों के लिए जिसे उन्होंने कभी देखा नहीं।",
          ],
        },
      ],
    },
    {
      id: "data-privacy",
      title: "आपकी सूचना",
      items: [
        {
          id: "sankalp-private",
          q: "मेरा संकल्प कौन पढ़ता है?",
          a: [
            "केवल आप। वह आपको दिखता है, और किसी को नहीं।",
            "वह आपके संकल्प पत्र पर नहीं छपता, पंजिका की पंक्ति में नहीं आता, और पहचान-संख्या रखने वाले किसी अजनबी को भी नहीं मिलता। उसे दिखता है ढका हुआ नाम, जल, दिन और उस दिन का पाठ।",
            "स्नानिफ़ाई के भीतर उसे पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह स्थायी रूप से दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया, किसने और क्यों।",
          ],
        },
        {
          id: "delete",
          q: "क्या मैं सब कुछ मिटा सकता हूँ?",
          a: [
            "हाँ। एक बटन, प्रतियों और बैकअप सहित, सात दिन के भीतर। यह उस कुंजी को नष्ट करके होता है जिससे आपका अभिलेख एन्क्रिप्ट किया गया था, इसीलिए यह वहाँ भी चलता है जहाँ भंडारण मिटाया नहीं जा सकता।",
            "आपका उतारा हुआ चिह्न बाद में भी काम करता रहता है, क्योंकि वह नदी के सार्वजनिक पाठ पर टिका है, हमारी तालिका की किसी पंक्ति पर नहीं। मिटाने से आपका संकल्प रखने की हमारी क्षमता जाती है, नदी की स्थिति सिद्ध करने की आपकी क्षमता नहीं।",
            "पुष्टि-संदेश में लिखा रहता है कि क्या मिटा और क्या रखा गया, उन रसीदों सहित जो कर-क़ानून माँगता है।",
          ],
        },
        {
          id: "tracking",
          q: "इस साइट पर मुझ पर नज़र क्या रख रहा है?",
          a: [
            "कोई विज्ञापन स्क्रिप्ट नहीं और कोई स्क्रीन-रिकॉर्डिंग स्क्रिप्ट नहीं, कहीं भी, कभी नहीं। जिस पृष्ठ पर आप अपना संकल्प लिखते हैं, उसे कुछ भी रिकॉर्ड नहीं करता।",
            "पूरे उत्पाद में दो ही बाहरी स्क्रिप्ट हैं, और दोनों के नाम हम बताते हैं। Vercel Web Analytics पृष्ठ-दृश्य गिनती है: न कुकी, न दूसरी साइटों तक पीछा, न किसी फ़ॉर्म की सामग्री। भुगतान सेवा की स्क्रिप्ट केवल भुगतान वाले चरण पर चलती है। किसी वचन को तोड़ने से अच्छा है उसे सीमित कर देना।",
          ],
        },
        {
          id: "panchang",
          q: "कुछ समयों पर “अस्थायी” क्यों लिखा रहता है?",
          a: [
            "क्योंकि हमने अभी कोई पंचांग स्रोत तय नहीं किया, और जिस सटीक समय के पीछे कुछ न हो वह गढ़ा हुआ तथ्य है।",
            "जब तक स्रोत तय न हो, हर सटीक समय जहाँ आता है वहीं यह अंकन साथ रहता है, और जहाँ स्रोत कुछ मिनटों से अधिक भिन्न हों, वहाँ हम अपने अनुकूल समय चुनने के बजाय पूरी सीमा दिखाते हैं। स्रोत तय होते ही गणना-पद्धति, अयनांश और घाट के निर्देशांक समयों के साथ प्रकाशित होंगे।",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "उत्तर यहाँ नहीं मिला?",
    body: "हमें लिखिए। यदि यह प्रश्न औरों के मन में भी होगा, तो हम उसे इस पृष्ठ पर जोड़ देंगे, और यदि आपको लगे कि हमसे कहीं चूक हुई है, तो सद्भाव से की गई आपत्तियाँ और उन पर हमारा किया, दोनों हम प्रकाशित करते हैं।",
    mailLabel: "हमें लिखिए",
  },
} } satisfies Record<Lang, typeof faqEn>;
