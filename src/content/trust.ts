/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";
import { SITTING } from "@/lib/sitting-plan";

/**
 * Copy for /ethics and /faq.
 *
 * Every string exists in both locales. The `satisfies Record<Lang, typeof …En>`
 * on each export makes a missing or renamed Hindi key a compile error rather
 * than a page that silently falls back to English.
 *
 * WRITTEN AGAINST THE CODE, NOT AGAINST THE DESIGN DOCS. An earlier edition of
 * this file described a product that was never built: audio stems mixed to the
 * percentile, a gotra field, a bell, two-person approval before a sankalp is
 * read, deletion by key destruction, a tithi reminder once a year, and limb
 * timings that disagreed with src/lib/sitting-plan.ts. Each of those was a
 * promise this repo forbids. Every sentence below now describes something a
 * reader can find in the product today:
 *   · the limbs and their lengths come from SITTING, so a change there changes
 *     the FAQ in the same commit
 *   · what a shared sheet shows is what src/lib/patra-view.ts returns, and the
 *     sankalp is left off it by construction
 *   · deletion is what src/app/[lang]/(app)/account/actions.ts performs
 *   · the only measurement is Vercel Web Analytics, see src/lib/track.ts
 *
 * PROVENANCE, do not loosen:
 *   · Flow is MODELLED discharge from the Copernicus global flood model read
 *     through Open-Meteo, not a gauge reading. "Modelled" appears wherever a
 *     figure does.
 *   · The Central Water Commission is the register of India's gauges and
 *     nothing more. Never imply a gauge exists where one does not.
 *   · The panchang is computed here and ships labelled provisional until a
 *     named source is matched against it.
 *
 * HOW IT IS WRITTEN. Plain sentences: what the thing is, what the reader does,
 * what they get. Nothing here argues with a reader who has doubts, and nothing
 * here promises an outcome. /ethics is the one page on the site that states
 * the commitment in the negative, as CLAUDE.md allows, and it does so once,
 * in the first section, in the voice of a maker showing the workshop.
 *
 * PLACEHOLDER: ethics@snanify.com must be a real, monitored inbox. The domain
 * currently has no MX record, so neither it nor hello@ receives mail.
 */

export const ETHICS_MAIL = "ethics@snanify.com";

/* ------------------------------------------------------------- /ethics --- */

const ethicsEn = {
  meta: {
    title: "How it is made | Snanify",
    description:
      "Where every number on Snanify comes from: modelled river discharge from the Copernicus flood model, a panchang computed offline, and a Sankalp Patra anyone can recompute from its seed.",
  },
  title: "How it is made",
  lede: "Every figure on this site comes from a public source you can check without asking us. This page says where each one comes from, what the sheet records, and who handles your data.",
  version: "Version 4, September 2026.",
  tocLabel: "On this page",

  s1: {
    id: "standard",
    h: "What we sell, and what we do not",
    body: [
      "The practice is yours from start to finish. You choose the water, you say the sankalp in your own words, and you keep the sheet.",
      "Nobody performs a rite for you. There is no priest, no ceremony at a ghat, and nothing offered or recorded on your behalf, and we never say otherwise. We also make no promise about what a morning does for you. The sheet records a river, a day and your own words, and that is what you buy.",
      "Every figure we print can be checked against a public source. The rest of this page says where to look.",
    ],
  },

  s2: {
    id: "river",
    h: "The river",
    body: [
      "The flow shown for each of the six waters is modelled river discharge from the Copernicus Emergency Management Service global flood model. We read it through Open-Meteo at a grid cell on the river's main stem. The model publishes one value a day. The data is licensed CC BY 4.0, and every page that shows a figure names the source.",
      "Each figure is printed with the day it was modelled for. When the feed is quiet, the page shows the median for that time of year over 1997 to 2025, and says that is what it is showing.",
      "It is a model, not a gauge in the water. India's Central Water Commission keeps the register of the country's gauges. Where one sits on one of these reaches, we name it with its agency and coordinates.",
    ],
  },

  s3: {
    id: "sky",
    h: "The sky",
    body: [
      "Tithi, nakshatra and the muhurat windows are computed on our own servers with astronomy-engine, an open astronomy library. We take the moon's position, subtract the Lahiri ayanamsa and divide the sky into twenty-seven parts. No outside service is involved, so the same instant always gives the same answer.",
      "Sunrise and sunset are computed for each ghat's own coordinates. That is why Brahma muhurat in Haridwar differs from Brahma muhurat in Nashik.",
      "A timing we have not yet checked against a named printed panchang is labelled provisional. Where sources disagree, the page prints the range.",
    ],
  },

  s4: {
    id: "patra",
    h: "Your Sankalp Patra",
    body: [
      "The sheet carries the names you added, up to five, the water and the ghat, the moment you sat in your own time zone and in Indian time, the day's river figure with its source, the tithi, and a seed.",
      "The seed is computed from your sitting and that day's published figure, and the engraving is drawn from the seed. Anyone holding the sheet can recompute it and get the same image. To forge a sheet you would first have to forge the public record. The method is in our public code.",
      "Your sankalp is shown to you alone. It is on your own printed copy and nowhere else. Anyone you send the link to sees the names, the water, the day and the figure. You can also make a sheet private from its own page.",
    ],
  },

  s5: {
    id: "hands",
    h: "Who handles what",
    lede: "Five companies touch this product. This is each of them and what it holds.",
    rows: [
      { k: "Payments", v: "Stripe. Card details go to Stripe and never reach us." },
      { k: "Accounts", v: "Clerk. Your email address and your sign-in." },
      { k: "Records", v: "Neon, a Postgres database. Your profile, your register and your sheets." },
      { k: "Files", v: "Vercel Blob. Your portrait and your rendered sheets." },
      { k: "Email", v: "Resend. Your receipt and your morning reminder." },
      { k: "Analytics", v: "Vercel Web Analytics. Page counts, with no cookie and no tracking across sites." },
    ],
    body: ["Write to us about any of it and a person answers."],
    mailLabel: "Write to us",
  },

  closing: {
    title: "Begin tomorrow morning.",
    body: "Set it up tonight. Eleven mornings for eleven, in your own currency.",
    cta: "Begin",
  },
};

export const ethicsContent = { en: ethicsEn, hi: {
  meta: {
    title: "यह कैसे बनी है | Snanify",
    description:
      "स्नानिफ़ाई का हर अंक कहाँ से आता है: कोपरनिकस बाढ़-मॉडल से नदी का मॉडल-प्रवाह, अपने ही सर्वर पर गणना किया पंचांग, और एक संकल्प पत्र जिसे उसके बीज से कोई भी फिर से बना सकता है।",
  },
  title: "यह कैसे बनी है",
  lede: "इस साइट का हर अंक किसी सार्वजनिक स्रोत से आता है, जिसे आप हमसे पूछे बिना जाँच सकते हैं। यह पृष्ठ बताता है कि हर अंक कहाँ से आता है, पत्र पर क्या दर्ज होता है, और आपकी जानकारी किसके हाथ में रहती है।",
  version: "संस्करण ४, सितंबर २०२६।",
  tocLabel: "इस पृष्ठ पर",

  s1: {
    id: "standard",
    h: "हम क्या बेचते हैं, और क्या नहीं",
    body: [
      "साधना आरंभ से अंत तक आपकी है। जल आप चुनते हैं, संकल्प आप अपने शब्दों में कहते हैं, और पत्र आप रखते हैं।",
      "आपके लिए कोई अनुष्ठान नहीं करता। न कोई पुरोहित है, न किसी घाट पर कोई विधि, न आपकी ओर से कुछ अर्पित या दर्ज किया जाता है, और हम कभी इसके विपरीत नहीं कहते। एक सुबह आपके लिए क्या करती है, इसका भी हम कोई वचन नहीं देते। पत्र पर एक नदी, एक दिन और आपके अपने शब्द दर्ज होते हैं, और यही आप खरीदते हैं।",
      "जो भी अंक हम छापते हैं, उसे सार्वजनिक स्रोत से मिलाया जा सकता है। आगे का पृष्ठ बताता है कि कहाँ देखना है।",
    ],
  },

  s2: {
    id: "river",
    h: "नदी",
    body: [
      "छहों जलों का प्रवाह कोपरनिकस एमरजेंसी मैनेजमेंट सर्विस के वैश्विक बाढ़-मॉडल से लिया गया मॉडल-प्रवाह है। हम उसे ओपन-मीटियो के माध्यम से नदी की मुख्य धारा पर पड़ने वाले ग्रिड-कोष्ठ से पढ़ते हैं। मॉडल दिन में एक मान प्रकाशित करता है। आँकड़े CC BY 4.0 के अंतर्गत हैं, और जिस पृष्ठ पर अंक दिखता है, वहाँ स्रोत का नाम भी होता है।",
      "हर अंक के साथ वह दिन छपता है जिसके लिए वह मॉडल किया गया। जब फ़ीड मौन हो, तो पृष्ठ 1997 से २०२५ तक के उसी मौसम का मध्यक दिखाता है, और साथ में यही लिखता है कि वह मध्यक दिखा रहा है।",
      "यह एक मॉडल है, जल में लगा मापक नहीं। भारत के मापक-स्थलों की पंजिका केंद्रीय जल आयोग के पास है। इन धाराओं में जहाँ कोई स्थल है, वहाँ हम उसका नाम, एजेंसी और निर्देशांक देते हैं।",
    ],
  },

  s3: {
    id: "sky",
    h: "आकाश",
    body: [
      "तिथि, नक्षत्र और मुहूर्त हमारे अपने सर्वर पर astronomy-engine नामक खुली खगोल-लाइब्रेरी से गणना होते हैं। हम चंद्रमा की स्थिति लेते हैं, उसमें से लाहिड़ी अयनांश घटाते हैं, और आकाश को सत्ताईस भागों में बाँटते हैं। इसमें कोई बाहरी सेवा नहीं है, इसलिए एक ही क्षण का उत्तर सदा एक ही आता है।",
      "सूर्योदय और सूर्यास्त हर घाट के अपने निर्देशांकों पर गणना होते हैं। इसीलिए हरिद्वार का ब्रह्म मुहूर्त नासिक के ब्रह्म मुहूर्त से अलग होता है।",
      "जिस समय को हमने अभी किसी छपे हुए पंचांग से नहीं मिलाया, उस पर 'अस्थायी' लिखा रहता है। जहाँ स्रोत आपस में भिन्न हों, वहाँ पृष्ठ पूरी सीमा छापता है।",
    ],
  },

  s4: {
    id: "patra",
    h: "आपका संकल्प पत्र",
    body: [
      "पत्र पर आपके जोड़े हुए नाम होते हैं, अधिक से अधिक पाँच, जल और घाट, वह क्षण जब आप बैठे, आपके अपने समय और भारतीय समय में, उस दिन नदी का अंक अपने स्रोत सहित, तिथि, और एक बीज।",
      "बीज आपकी बैठक और उस दिन के प्रकाशित अंक से बनता है, और उत्कीर्णन बीज से बनता है। पत्र रखने वाला कोई भी उसे फिर से बना सकता है और वही चित्र पाता है। पत्र की नकल बनाने के लिए पहले सार्वजनिक अभिलेख की नकल बनानी पड़ेगी। पूरी विधि हमारे सार्वजनिक कोड में है।",
      "आपका संकल्प केवल आपको दिखता है। वह आपकी अपनी छपी प्रति पर होता है और कहीं नहीं। जिसे आप कड़ी भेजते हैं, उसे नाम, जल, दिन और अंक दिखते हैं। आप किसी पत्र को उसके अपने पृष्ठ से निजी भी कर सकते हैं।",
    ],
  },

  s5: {
    id: "hands",
    h: "किसके हाथ में क्या है",
    lede: "इस उत्पाद को पाँच कंपनियाँ छूती हैं। यह रही हर एक, और उसके पास क्या रहता है।",
    rows: [
      { k: "भुगतान", v: "Stripe। कार्ड का विवरण Stripe तक जाता है, हम तक कभी नहीं।" },
      { k: "खाते", v: "Clerk। आपका ईमेल पता और आपका प्रवेश।" },
      { k: "अभिलेख", v: "Neon, एक Postgres डेटाबेस। आपकी प्रोफ़ाइल, आपकी पंजिका और आपके पत्र।" },
      { k: "फ़ाइलें", v: "Vercel Blob। आपका चित्र और आपके बने हुए पत्र।" },
      { k: "ईमेल", v: "Resend। आपकी रसीद और आपकी सुबह की सूचना।" },
      { k: "आँकड़े", v: "Vercel Web Analytics। पृष्ठ-गणना, बिना कुकी और बिना दूसरी साइटों तक पीछा किए।" },
    ],
    body: ["इनमें से किसी भी बात पर हमें लिखिए, उत्तर एक व्यक्ति देता है।"],
    mailLabel: "हमें लिखिए",
  },

  closing: {
    title: "कल सुबह आरंभ कीजिए।",
    body: "आज रात तैयारी कर लीजिए। ग्यारह सुबहें, ग्यारह में, आपकी अपनी मुद्रा में।",
    cta: "आरंभ कीजिए",
  },
} } satisfies Record<Lang, typeof ethicsEn>;

/* ---------------------------------------------------------------- /faq --- */

const faqEn = {
  meta: {
    title: "Questions | Snanify",
    description:
      "What happens during the snan, where the river figures come from, what it costs, and what we hold about you. Plain answers.",
  },
  title: "Questions",
  lede: "About the snan, the river figures, prices and your data. If yours is missing, write to us.",
  indexLabel: "Sections",
  moreLabel: "Read more",
  ctaLabel: "Begin your snan",

  groups: [
    {
      id: "sitting",
      title: "The snan",
      items: [
        {
          id: "what-happens",
          q: "What happens on my screen?",
          a: [
            `Five parts, the same every morning, three minutes in all. ${SITTING.reading} seconds with the river's figure for the day. ${SITTING.breath} seconds of breathing, with a waterline that rises and falls at the river's own pace. Your sankalp, held under your thumb for ${SITTING.hold} seconds while the ink fills. ${SITTING.stillness} seconds of a black screen. Then ${SITTING.mark} seconds while the morning writes itself into your register.`,
            "The waterline is the only clock. Only the river changes from one morning to the next.",
          ],
        },
        {
          id: "black-screen",
          q: "Why does the screen go black for a minute?",
          a: [
            "That minute is the stillness. The screen asks you to put the phone down and goes dark. It cannot be skipped, and it comes back on its own when the minute is over.",
          ],
        },
        {
          id: "when",
          q: "Do I have to sit before sunrise?",
          a: [
            "Sit when you wake. You tell us the hour, and the reminder comes at that hour in your own time zone. Many people sit in the evening.",
            "The muhurat windows are computed for each ghat's own sunrise. Sit inside one if that matters to you.",
          ],
        },
        {
          id: "miss",
          q: "What if I miss a day?",
          a: [
            "Sit the next morning. Your mornings stay on your account until you use them, and your register lists the mornings you kept.",
          ],
        },
        {
          id: "shipping",
          q: "Do you send anything by post?",
          a: [
            "Everything arrives on your screen the moment you finish: the sitting, your Sankalp Patra and your register. It works the same wherever you live.",
          ],
        },
        {
          id: "mark",
          q: "What is the Sankalp Patra?",
          a: [
            "One sheet for each morning. It carries the names you added, your portrait if you added one, the water and the ghat, the moment you sat in your own time and in Indian time, the river's published figure that day, the tithi, and an engraving drawn from that figure. A monsoon morning draws dark and crowded. A January morning draws pale and open.",
            "The sheet also carries its seed, so anyone can recompute the engraving and check the figure against the public source.",
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
          q: "Where does the river figure come from?",
          a: [
            "It is modelled river discharge from the Copernicus Emergency Management Service global flood model, read through Open-Meteo at the grid cell covering that reach. The data is public and licensed CC BY 4.0, and every page that shows a figure names the source.",
            "It is a model, not an instrument in the water, so we write modelled every time.",
            "Sunrise, sunset and rain are read for each ghat's own coordinates. Tithi and the muhurat windows are computed for that sunrise.",
          ],
        },
        {
          id: "percentile",
          q: "What does the percentile mean?",
          a: [
            "Where today's flow sits among every daily value the model produced for the same three weeks of the year, from 1997 to 2025. That is 609 days of the river's own history.",
            "It is the fair way to compare rivers. The Kaveri at Talakaveri is a mountain stream and the Sangam at Prayagraj is a wide river, and the percentile says whether either is high or low for the time of year.",
          ],
        },
        {
          id: "verify",
          q: "How can I check that a sheet is genuine?",
          a: [
            "Every sheet carries its seed. Take that day's figure from the flood model, recompute the seed, and you get the same engraving. The method is in our public code.",
            "To forge a sheet you would first have to forge the public record for that day.",
          ],
        },
        {
          id: "offline",
          q: "What happens when the feed is quiet?",
          a: [
            "The page says so and shows the median for that time of year over 1997 to 2025, labelled as the median. A figure a day old is shown with its real date. We never fill in a guess.",
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
          q: "What am I paying for?",
          a: [
            "A morning: three minutes with the river's published state that day, at the hour you chose, with your own words.",
            "And what it leaves you: a Sankalp Patra with your family's names and that day's figure, and a line in your register.",
          ],
        },
        {
          id: "free",
          q: "Is there a free version?",
          a: [
            "The rivers, the panchang and the muhurat calendar are free to read every day, with no account. The snan is what you pay for.",
          ],
        },
        {
          id: "prices",
          q: "What does it cost?",
          a: [
            "One morning, {price:one}. Eleven mornings, {price:eleven}. Sixty mornings, {price:sixty}.",
            "You pay once. The mornings stay on your account until you use them.",
          ],
        },
        {
          id: "eleven",
          q: "Why eleven?",
          a: [
            "Card fees. A single small charge loses about a third of itself to the card network. Eleven at once loses about six percent. Selling eleven together is what keeps the price per morning low.",
          ],
        },
        {
          id: "india",
          q: "Why is the price different in India?",
          a: [
            "Prices are set in rupees for India, Canadian dollars for Canada, euro for the eurozone and US dollars everywhere else. The mornings are the same in every currency.",
          ],
        },
        {
          id: "refund",
          q: "Can I get a refund?",
          a: [
            "Yes. Mornings you have not used are refunded in full on request. Write to hello@snanify.com.",
            "A morning you have already sat is used and is not refunded. If the site failed you during a sitting, write to us and we refund that morning.",
          ],
        },
        {
          id: "account",
          q: "Do I need an account?",
          a: [
            "For the snan, yes, so that your mornings, your sheets and your register belong to you. Sign in with Google or with a link sent to your email. Reading the site needs no account.",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "Names and family",
      items: [
        {
          id: "names",
          q: "Can I put my family's names on the sheet?",
          a: [
            "Up to five names, your own first. They are printed on every sheet you keep.",
            "Name people who would be glad to see their name there. If someone asks us to remove their name, we remove it.",
          ],
        },
        {
          id: "ancestors",
          q: "Can I sit in memory of someone who has died?",
          a: [
            "Yes, and many people do. Put their name among the five and say what you want to say in your sankalp. The sheet is one to keep and to send to the family.",
          ],
        },
        {
          id: "who-can-book",
          q: "I am not Hindu. Can I use this?",
          a: [
            "Yes. Anyone can sit. People sit for a Hindu parent, for a spouse, or for three quiet minutes of their own.",
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
          q: "Who can read my sankalp?",
          a: [
            "You. It is shown to you every morning and printed on your own copy of the sheet. We do not open it.",
            "It is left off the sheet other people open from your link, and off the link preview. Anyone you send the link to sees the names, the water, the day and the figure.",
          ],
        },
        {
          id: "delete",
          q: "Can I delete everything?",
          a: [
            "Yes. There is a button on your account page. It removes your photograph and your sheets from storage, then your account with every row attached to it, then your sign-in.",
            "Links to your sheets stop working, including ones you have already sent. Database backups are kept for a limited time and then expire, and payment records stay with Stripe for as long as the law requires.",
          ],
        },
        {
          id: "tracking",
          q: "What tracks me on this site?",
          a: [
            "Vercel Web Analytics counts page views. It sets no cookie and does not follow you to other sites. Clerk runs on the sign-in and account pages to keep you signed in. Payment happens on Stripe's own page.",
            "There is no advertising script and no session recording anywhere on the site.",
          ],
        },
        {
          id: "panchang",
          q: "Why are some timings marked provisional?",
          a: [
            "We compute tithi and the muhurat windows ourselves, and we have not yet checked them against a named printed panchang. Until we have, every exact time carries the label. Where sources disagree, we show the range.",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "Another question?",
    body: "Write to us. If others will ask it too, we add it to this page.",
    mailLabel: "Write to us",
  },
};

export const faqContent = { en: faqEn, hi: {
  meta: {
    title: "प्रश्न | Snanify",
    description:
      "स्नान के दौरान क्या होता है, नदी के अंक कहाँ से आते हैं, मूल्य क्या है, और हम आपके विषय में क्या रखते हैं। सीधे उत्तर।",
  },
  title: "प्रश्न",
  lede: "स्नान, नदी के अंक, मूल्य और आपकी जानकारी के विषय में। आपका प्रश्न यहाँ न हो, तो हमें लिखिए।",
  indexLabel: "खंड",
  moreLabel: "और पढ़िए",
  ctaLabel: "अपना स्नान आरंभ कीजिए",

  groups: [
    {
      id: "sitting",
      title: "स्नान",
      items: [
        {
          id: "what-happens",
          q: "मेरी स्क्रीन पर क्या होता है?",
          a: [
            `पाँच भाग, हर सुबह वही, कुल तीन मिनट। ${SITTING.reading} सेकंड उस दिन नदी के अंक के साथ। ${SITTING.breath} सेकंड साँस, जिसमें जल-रेखा नदी की अपनी गति से चढ़ती और उतरती है। आपका संकल्प, ${SITTING.hold} सेकंड अँगूठे के नीचे थामे हुए, जब तक स्याही भर न जाए। ${SITTING.stillness} सेकंड काली स्क्रीन। फिर ${SITTING.mark} सेकंड, जिनमें वह सुबह आपकी पंजिका में लिख जाती है।`,
            "जल-रेखा ही एकमात्र घड़ी है। एक सुबह से दूसरी सुबह के बीच केवल नदी बदलती है।",
          ],
        },
        {
          id: "black-screen",
          q: "स्क्रीन एक मिनट के लिए काली क्यों हो जाती है?",
          a: [
            "वह मिनट स्थिरता का है। स्क्रीन आपसे फ़ोन नीचे रखने को कहती है और अँधेरी हो जाती है। उसे छोड़ा नहीं जा सकता, और मिनट पूरा होते ही वह अपने आप लौट आती है।",
          ],
        },
        {
          id: "when",
          q: "क्या सूर्योदय से पहले बैठना ज़रूरी है?",
          a: [
            "जब आप जागें, तब बैठिए। घड़ी आप बताते हैं, और सूचना उसी घड़ी पर, आपके अपने समय-क्षेत्र में आती है। बहुत लोग शाम को बैठते हैं।",
            "मुहूर्त हर घाट के अपने सूर्योदय से गणना होते हैं। यदि आपके लिए इसका महत्व है, तो मुहूर्त के भीतर बैठिए।",
          ],
        },
        {
          id: "miss",
          q: "यदि कोई दिन छूट जाए तो?",
          a: [
            "अगली सुबह बैठिए। आपकी सुबहें आपके खाते में तब तक रहती हैं जब तक आप उन्हें लेते नहीं, और आपकी पंजिका में वे सुबहें दर्ज होती हैं जो आपने निभाईं।",
          ],
        },
        {
          id: "shipping",
          q: "क्या आप डाक से कुछ भेजते हैं?",
          a: [
            "सब कुछ आपके पूरा करते ही आपकी स्क्रीन पर आ जाता है: बैठक, आपका संकल्प पत्र और आपकी पंजिका। आप कहीं भी रहें, यह एक जैसा चलता है।",
          ],
        },
        {
          id: "mark",
          q: "संकल्प पत्र क्या है?",
          a: [
            "हर सुबह का एक पत्र। उस पर आपके जोड़े हुए नाम होते हैं, आपका चित्र यदि आपने जोड़ा हो, जल और घाट, वह क्षण जब आप बैठे, आपके अपने समय और भारतीय समय में, उस दिन नदी का प्रकाशित अंक, तिथि, और उसी अंक से बना एक उत्कीर्णन। वर्षा की सुबह का चित्र गहरा और भरा हुआ बनता है। जनवरी की सुबह का हल्का और खुला।",
            "पत्र पर उसका बीज भी छपा होता है, इसलिए कोई भी उत्कीर्णन को फिर से बना सकता है और अंक को सार्वजनिक स्रोत से मिला सकता है।",
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
          q: "नदी का अंक कहाँ से आता है?",
          a: [
            "यह कोपरनिकस एमरजेंसी मैनेजमेंट सर्विस के वैश्विक बाढ़-मॉडल का मॉडल-प्रवाह है, जिसे ओपन-मीटियो के माध्यम से उस धारा पर पड़ने वाले ग्रिड-कोष्ठ से पढ़ा जाता है। आँकड़े सार्वजनिक हैं, CC BY 4.0 के अंतर्गत, और जिस पृष्ठ पर अंक दिखता है, वहाँ स्रोत का नाम भी होता है।",
            "यह एक मॉडल है, जल में लगा यंत्र नहीं, इसलिए हम हर बार 'मॉडल' लिखते हैं।",
            "सूर्योदय, सूर्यास्त और वर्षा हर घाट के अपने निर्देशांकों पर पढ़े जाते हैं। तिथि और मुहूर्त उसी सूर्योदय से गणना होते हैं।",
          ],
        },
        {
          id: "percentile",
          q: "प्रतिशतक का अर्थ क्या है?",
          a: [
            "आज का प्रवाह उन सब दैनिक मानों के बीच कहाँ बैठता है जो मॉडल ने वर्ष के इन्हीं तीन सप्ताहों के लिए 1997 से 2025 तक दिए। यानी उस नदी के अपने इतिहास के ६०९ दिन।",
            "नदियों की तुलना का यही उचित ढंग है। तालकावेरी में कावेरी एक पहाड़ी धारा है और प्रयागराज का संगम एक चौड़ी नदी, और प्रतिशतक बताता है कि इस मौसम के हिसाब से कोई भी ऊँची है या नीची।",
          ],
        },
        {
          id: "verify",
          q: "मैं कैसे जाँचूँ कि कोई पत्र असली है?",
          a: [
            "हर पत्र पर उसका बीज होता है। उस दिन का अंक बाढ़-मॉडल से लीजिए, बीज फिर से बनाइए, और वही उत्कीर्णन मिलेगा। पूरी विधि हमारे सार्वजनिक कोड में है।",
            "पत्र की नकल बनाने के लिए पहले उस दिन के सार्वजनिक अभिलेख की नकल बनानी पड़ेगी।",
          ],
        },
        {
          id: "offline",
          q: "जब फ़ीड मौन हो, तब क्या होता है?",
          a: [
            "पृष्ठ यही कहता है और 1997 से 2025 तक के उसी मौसम का मध्यक दिखाता है, 'मध्यक' लिखकर। एक दिन पुराना अंक अपनी सही तिथि के साथ दिखता है। हम कभी अनुमान नहीं भरते।",
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
          q: "मैं किसका भुगतान कर रहा हूँ?",
          a: [
            "एक सुबह का: उस दिन नदी की प्रकाशित स्थिति के साथ तीन मिनट, आपकी चुनी घड़ी पर, आपके अपने शब्दों के साथ।",
            "और जो वह छोड़ जाती है: एक संकल्प पत्र, जिस पर आपके परिवार के नाम और उस दिन का अंक है, और आपकी पंजिका में एक पंक्ति।",
          ],
        },
        {
          id: "free",
          q: "क्या कोई निःशुल्क रूप है?",
          a: [
            "नदियाँ, पंचांग और मुहूर्त-पंचांग हर दिन, बिना खाते के, निःशुल्क पढ़े जा सकते हैं। मूल्य स्नान का है।",
          ],
        },
        {
          id: "prices",
          q: "इसका मूल्य क्या है?",
          a: [
            "एक सुबह, {price:one}। ग्यारह सुबहें, {price:eleven}। साठ सुबहें, {price:sixty}।",
            "भुगतान एक बार होता है। सुबहें आपके खाते में तब तक रहती हैं जब तक आप उन्हें लेते नहीं।",
          ],
        },
        {
          id: "eleven",
          q: "ग्यारह ही क्यों?",
          a: [
            "कार्ड शुल्क के कारण। एक छोटा अकेला भुगतान अपना लगभग एक-तिहाई कार्ड नेटवर्क को दे देता है। ग्यारह एक साथ लगभग छह प्रतिशत। ग्यारह को एक साथ बेचने से ही प्रति सुबह मूल्य कम रहता है।",
          ],
        },
        {
          id: "india",
          q: "भारत में मूल्य अलग क्यों है?",
          a: [
            "मूल्य भारत के लिए रुपये में, कनाडा के लिए कनाडाई डॉलर में, यूरो-क्षेत्र के लिए यूरो में और बाकी सब जगह अमेरिकी डॉलर में तय हैं। सुबहें हर मुद्रा में एक जैसी हैं।",
          ],
        },
        {
          id: "refund",
          q: "क्या राशि वापस मिल सकती है?",
          a: [
            "हाँ। जो सुबहें आपने नहीं लीं, वे कहने पर पूरी लौटा दी जाती हैं। hello@snanify.com पर लिखिए।",
            "जो सुबह आप बैठ चुके, वह ली जा चुकी है और लौटाई नहीं जाती। यदि बैठक के दौरान साइट ने साथ छोड़ दिया हो, तो हमें लिखिए, हम वह सुबह लौटा देते हैं।",
          ],
        },
        {
          id: "account",
          q: "क्या खाता बनाना ज़रूरी है?",
          a: [
            "स्नान के लिए हाँ, ताकि आपकी सुबहें, आपके पत्र और आपकी पंजिका आपकी रहें। Google से या ईमेल पर भेजी कड़ी से प्रवेश कीजिए। साइट पढ़ने के लिए खाते की ज़रूरत नहीं।",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "नाम और परिवार",
      items: [
        {
          id: "names",
          q: "क्या मैं अपने परिवार के नाम पत्र पर रख सकता हूँ?",
          a: [
            "अधिक से अधिक पाँच नाम, पहला आपका अपना। वे आपके हर पत्र पर छपते हैं।",
            "उन्हीं के नाम रखिए जिन्हें अपना नाम वहाँ देखकर अच्छा लगे। यदि कोई अपना नाम हटाने को कहे, तो हम हटा देते हैं।",
          ],
        },
        {
          id: "ancestors",
          q: "क्या मैं किसी दिवंगत के स्मरण में बैठ सकता हूँ?",
          a: [
            "हाँ, और बहुत लोग बैठते हैं। उनका नाम पाँच नामों में रखिए, और जो कहना है, अपने संकल्प में कहिए। यह पत्र सँभालने और परिवार को भेजने योग्य होता है।",
          ],
        },
        {
          id: "who-can-book",
          q: "मैं हिंदू नहीं हूँ। क्या मैं यह कर सकता हूँ?",
          a: [
            "हाँ। कोई भी बैठ सकता है। लोग हिंदू माता-पिता के लिए, जीवनसाथी के लिए, या अपने तीन शांत मिनटों के लिए बैठते हैं।",
          ],
        },
      ],
    },
    {
      id: "data-privacy",
      title: "आपकी जानकारी",
      items: [
        {
          id: "sankalp-private",
          q: "मेरा संकल्प कौन पढ़ सकता है?",
          a: [
            "आप। वह हर सुबह आपको दिखाया जाता है और पत्र की आपकी अपनी प्रति पर छपता है। हम उसे खोलते नहीं।",
            "जो पत्र दूसरे लोग आपकी कड़ी से खोलते हैं, उस पर वह नहीं होता, और कड़ी की झलक में भी नहीं। जिसे आप कड़ी भेजते हैं, उसे नाम, जल, दिन और अंक दिखते हैं।",
          ],
        },
        {
          id: "delete",
          q: "क्या मैं सब कुछ मिटा सकता हूँ?",
          a: [
            "हाँ। आपके खाते के पृष्ठ पर एक बटन है। वह पहले आपका चित्र और आपके पत्र भंडार से हटाता है, फिर आपका खाता उससे जुड़ी हर पंक्ति सहित, फिर आपका प्रवेश।",
            "आपके पत्रों की कड़ियाँ काम करना बंद कर देती हैं, वे भी जो आप पहले भेज चुके हैं। डेटाबेस के बैकअप सीमित समय तक रखे जाते हैं और फिर मिट जाते हैं, और भुगतान के अभिलेख Stripe के पास उतने समय रहते हैं जितना कानून कहता है।",
          ],
        },
        {
          id: "tracking",
          q: "इस साइट पर मुझ पर नज़र क्या रखता है?",
          a: [
            "Vercel Web Analytics पृष्ठ-दृश्य गिनता है। वह कोई कुकी नहीं रखता और दूसरी साइटों तक आपका पीछा नहीं करता। Clerk प्रवेश और खाते के पृष्ठों पर चलता है ताकि आप प्रवेश में बने रहें। भुगतान Stripe के अपने पृष्ठ पर होता है।",
            "साइट पर कहीं भी कोई विज्ञापन-स्क्रिप्ट और कोई स्क्रीन-रिकॉर्डिंग नहीं है।",
          ],
        },
        {
          id: "panchang",
          q: "कुछ समयों पर 'अस्थायी' क्यों लिखा है?",
          a: [
            "तिथि और मुहूर्त हम स्वयं गणना करते हैं, और अभी उन्हें किसी छपे हुए पंचांग से मिलाया नहीं है। जब तक मिला न लें, हर सटीक समय पर यह चिह्न रहता है। जहाँ स्रोत भिन्न हों, वहाँ हम पूरी सीमा दिखाते हैं।",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "कोई और प्रश्न?",
    body: "हमें लिखिए। यदि वह प्रश्न औरों का भी होगा, तो हम उसे इस पृष्ठ पर जोड़ देते हैं।",
    mailLabel: "हमें लिखिए",
  },
} } satisfies Record<Lang, typeof faqEn>;
