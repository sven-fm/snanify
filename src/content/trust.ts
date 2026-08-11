/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/**
 * Copy for the trust layer: /ethics (the manifesto), /how-it-works, /faq.
 *
 * Every string exists in both locales. The `satisfies Record<Lang, typeof …En>`
 * on each export is deliberate, it makes a missing or renamed Hindi key a
 * compile error rather than a page that silently falls back to English.
 *
 * THE PRODUCT THIS FILE DESCRIBES: a purely digital snan. No priest, no ghat
 * performance, no camera, no recording, nothing done on anyone's behalf. The
 * user sits for four and a half minutes with the live measured state of a
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
    title: "Manifesto: what a digital snan is, and what it is not · Snanify",
    description:
      "No priest, no ghat, no performance, nothing done on your behalf by anyone. A digital snan is the real measured state of a sacred river, the real panchang, and words only you say. What we will never claim, exactly what runs on this site, and what we have not settled.",
  },
  eyebrow: "Manifesto",
  title: "A digital snan is a real thing to do.",
  lede: "Snanify is not a recording of somebody else's ritual. Nobody stands in the river for you. You sit, wherever you are, at an hour the panchang names, with a river whose actual condition that day is on the screen in front of you, and you say what you came to say. That is the whole product, and we think it is enough.",
  version:
    "Version 2, written at the pivot to a purely digital snan. The date of publication is recorded on the day this page goes live, and every later revision is kept and dated beside it. This page is not edited silently.",
  tocLabel: "On this page",

  s1: {
    n: "01",
    id: "position",
    h: "The plain statement",
    body: [
      "There is no priest here. There is no ceremony at a ghat. Nothing is performed on your behalf, anywhere, by anyone, and nothing on this site is a recording of a rite.",
      "What there is: the real state of a real river, read today from the public flood model that watches it. The real panchang, so the hour you sit in is an hour that means something. The sound of moving water. And a form of words that you, and only you, say.",
      "We are not a temple and we are not standing in for one. We are a place to sit, at four in the morning, with the river you are from.",
    ],
    pull: "We describe what is on the screen. We do not describe what it does to your soul.",
  },

  s2: {
    n: "02",
    id: "river",
    h: "Our servers are in the river",
    body: [
      "It sounds like a line. It is a specification.",
      "The Ganga at Haridwar carried about 1,444 cubic metres a second on the eleventh of August, which is an ordinary flow for that week of the year. The Godavari at Nashik was at the ninety-fifth percentile of everything it has done in that week since 1991. Both numbers went into this site the day they existed, and the Godavari sounded like it.",
      "So when the Ganga rises, this website rises with it. When the Shipra runs thin in April, it runs thin here. Nothing on this site is a loop, a stock clip, or a mood video with a filter on it. There is no generated water anywhere in this product and there never will be.",
    ],
    specH: "Exactly what the number is",
    spec: [
      {
        k: "What is measured",
        v: "Modelled river discharge, in cubic metres a second, at the grid cell covering that reach of the river.",
      },
      {
        k: "Where it comes from",
        v: "The Copernicus Emergency Management Service global flood model, read through Open-Meteo. Public data, licensed CC BY 4.0. It is a model, not a gauge reading, and we write “modelled” every single time.",
      },
      {
        k: "What the percentile means",
        v: "Where today sits against every daily value that same cell has produced in this same week of the year from 1997 to 2025. Four hundred and thirty-five days of that river's own history, and the only honest way to compare a river to anything.",
      },
      {
        k: "How old it is",
        v: "Updated daily. Every page prints the hour of the reading it is showing, never the hour you happened to load the page.",
      },
      {
        k: "When we cannot reach it",
        v: "The page says so, and prints the thirty-five year median for today's date, labelled as exactly that. We never interpolate, and we never invent a plausible number.",
      },
      {
        k: "The named stations",
        v: "Where a government gauge exists we name it: station, agency, coordinates and datum, from the Central Water Commission's own registry. Four of the six waters have no CWC river level telemetry published at all, and those pages say so rather than borrow a number from elsewhere.",
      },
      {
        k: "What we measure ourselves",
        v: "Nothing. We have no camera, no microphone and no device at any ghat, and there is no video anywhere on this site.",
      },
    ],
    coda: "The river is not a theme here. It is the input.",
    credit:
      "River data by the Copernicus Emergency Management Service via Open-Meteo, CC BY 4.0. Station registry: Central Water Commission, National Water Data Portal.",
  },

  s3: {
    n: "03",
    id: "precedent",
    h: "The oldest argument for this is not ours",
    body: [
      "Before you tell us that a river cannot travel, look at what your own household already does every morning.",
    ],
    verse: ["गङ्गे च यमुने चैव गोदावरि सरस्वति।", "नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥"],
    verseGloss: "Ganga and Yamuna, Godavari, Saraswati, Narmada, Sindhu, Kaveri: be present in this water.",
    after: [
      "That is said over a bucket in Lucknow. Over a shower in Leicester. Over a tap in New Jersey, by people who have not seen any of those seven rivers in twenty years. It is not a metaphor that got out of hand. It is a protocol, and an old one, for making a distant river present in the water in front of you, and the tradition has never treated it as a lesser act.",
      "We did not invent bringing the river to you. Your grandmother does it before breakfast. We built a better instrument for it, one that can tell you what the Ganga is actually doing today.",
    ],
  },

  s4: {
    n: "04",
    id: "is-not",
    h: "What a digital snan is not",
    items: [
      {
        t: "It is not a bath",
        d: "Your body does not enter the Ganga, and no arrangement of pixels will put it there.",
      },
      {
        t: "It is not a rite performed for you",
        d: "Nobody is at the ghat. Nobody is paid to say your name into a camera. We think that is an improvement, and we explain why a few lines down.",
      },
      {
        t: "It is not a claim on your soul",
        d: "We do not know what happens to anyone's karma. Neither does anybody selling you the alternative, though they charge more for the confidence.",
      },
      {
        t: "It is not a replacement for going",
        d: "If you can go, go. Book the flight, take the train, walk down the steps. We will still be here in the eleven years between.",
      },
    ],
  },

  s5: {
    n: "05",
    id: "wifi",
    h: "“You cannot wash sins over wifi”",
    body: [
      "Correct. You cannot. Neither can we, and we have never said we could.",
      "Look at what is actually being sold here: an hour, a water, a true reading of that water, a form of words, and a mark to keep. Read every price on this site and you will not find one promised outcome. No sins washed. No punya counted. No dosha discovered and removed for a small additional fee. If that is what you came for, we are genuinely the wrong shop, and there are many, many others.",
      "The rest of the objection is usually not about plumbing. It is about seriousness, and that is a fair thing to worry about. So here is the test, and it is not ours.",
      "Nobody has ever complained that a mala is only string. Or that a diya is only a wick in oil. Or that a temple is only granite that people carried up a hill. The instrument was never the point.",
    ],
    pull: "Attention is the point, and attention has always needed somewhere to stand.",
    close:
      "We built somewhere. It opens at four in the morning, it knows what the river is doing, and it does not require a visa.",
  },

  s6: {
    n: "06",
    id: "for",
    h: "Who this is for",
    items: [
      "The person whose passport says one country and whose calendar says another. The grandson in Frankfurt who knows the tithi by heart and has never seen the ghat. The mother in Toronto with three weeks of leave a year and a father whose shraddh falls in none of them.",
      "Anyone in India for whom the ghat is not far but unreachable. A night on a train and thirty wet steps have kept more people from the water than distance ever has.",
      "People who want the practice and not the institution. No intermediary, no queue, no counter to hand your name across, and nobody deciding whether your gotra qualifies you.",
      "And people who are simply curious, for the price of a coffee, without being told first that something is wrong with their lives.",
    ],
  },

  s7: {
    n: "07",
    id: "not-for",
    h: "Who this is not for",
    items: [
      {
        t: "If you can get to the water, go",
        d: "We mean this, and we have put it at the top of every version of this page we have ever written. This is not a competitor to a pilgrimage and it loses that comparison every single time.",
      },
      {
        t: "If you want a guarantee",
        d: "We do not sell one, and you will not talk us into it.",
      },
      {
        t: "If a rite counts only when a qualified man performs it for you at the tirth",
        d: "That is a coherent position, held by serious people, and this product is not built for you. We are not going to argue you out of it, and we are not going to write copy pretending you do not exist. Go with our respect.",
      },
    ],
  },

  s8: {
    n: "08",
    id: "never",
    h: "Claims we will never make",
    lede: "This list is binding on us, on anyone we pay, and on anyone who writes about us on our behalf. We will never state, imply, or allow a partner, an email or an advertisement to state:",
    items: [
      "That anything was performed on your behalf. Nothing is. Nobody is at the ghat, and there is no priest in this product.",
      "That your sins are washed away.",
      "That this grants moksha, mukti, or any measure of punya.",
      "That it is equal to bathing in the river yourself.",
      "That merit can be counted, multiplied, or accumulated in a plan. Eleven snans are eleven sittings, not more merit per sitting.",
      "That your ancestors are restless, unfulfilled or waiting, or that anything will befall your family if you do not buy.",
      "That any dosha exists in your chart, or that we can find one or remove one.",
      "That this produces any outcome in your life, health, a child, a visa, a marriage, a case, an examination, work, money.",
      "That it replaces a rite your own tradition asks you to perform yourself.",
      "That any acharya, math, akhara, temple trust or ghat authority endorses us, unless they have signed a dated letter that we publish, and that they can withdraw whenever they wish.",
      "That the water at any ghat is clean, safe to drink, or medicinal.",
      "That your body has been purified.",
      "That a muhurat is the last one, or that it will not return in your lifetime. Astronomy belongs in a calendar; it will never appear inside a payment page.",
      "That any image on this site is a live view of a river. There is no video anywhere in this product, no generative footage, no synthetic voice, and no simulated river data. A reading we could not fetch is printed as a reading we could not fetch.",
      "That a person who has died received anything, or was affected by anything.",
      "Any use of a person who has died in an advertisement, a case study, or a testimonial.",
      "Any sentence built on a threat, that time is running out, that something will come to your family, that you will regret not having done this.",
      "We will never quote your sankalp in our marketing, not named, not anonymised, not paraphrased.",
      "We will never sell, share, license, or build a product out of the names, gotras and intentions people entrust to us.",
    ],
    report:
      "If you ever see us make one of these claims, write to us. We will take it down, say so publicly, and keep the correction on the record with its date. We publish the corrections, including the ones that were embarrassing.",
  },

  s9: {
    n: "09",
    id: "never-do",
    h: "Things we will not do to you",
    items: [
      "No countdown on a muhurat. A real hour is a fact about the sky, not a device for hurrying you.",
      "No invented scarcity. Nothing here has a queue, a waiting list or a last remaining place, because nothing here could.",
      "No message on the anniversary of a death unless you asked us for one, and one tap in that message stops it forever.",
      "No streaks, no badges, no levels, no “you have not sat since March”. Your register is a record, not a score, which is exactly why it is worth keeping.",
      "No advertising placed against grief, funerals, obituaries or illness.",
      "No price that rises because a day is auspicious, and none that changes because of who you appear to be.",
      "No box ticked for you, not an add-on, not a renewal, not a mailing list.",
      "Cancelling costs no more clicks than starting, with no interstitial and no offer.",
      "One click to unsubscribe, honoured at once, with no “how about fewer emails” step.",
      "No quiz that tells you what is wrong with your chart.",
      "No confirmation dialogue that asks whether you are sure, and no invoking of anyone you have lost in order to keep your money.",
      "No AI writing your sankalp, and no suggestions in that box, suggestions steer people toward grief.",
      "Never a word against making the journey yourself.",
    ],
  },

  s10: {
    n: "10",
    id: "data",
    h: "Your name, your gotra, your sankalp",
    body: [
      "A gotra is lineage. A sankalp may hold an illness, a death, a fear. This is not ordinary customer data, and we do not treat it as such, not in law, where it is special-category religious data, and not in practice.",
    ],
    gotraH: "Gotra is optional here",
    gotra: [
      "Many families do not keep a gotra, and a form that insists on one is a form that sorts people by caste. Ours does not insist. Leave it blank and the sankalp says that the gotra is not stated, or uses the customary Kashyapa gotra, or your family's own convention if you tell us what it is.",
      "Where you name several people, each name may carry its own gotra, because households are not uniform, a woman who married in, an adopted child, an inter-caste marriage. One gotra for six names would produce a sankalp that is simply wrong for most families.",
    ],
    sankalpH: "The sankalp text",
    sankalp: [
      "Your sankalp is shown to you and to nobody else. It is never spoken aloud, by anyone, anywhere, because there is nobody in this product to speak it. You read your own words, in your own head or out loud in your own room, and that is the whole of it.",
      "It is never printed on anything public. It is not in the register line, it is not on the mark you keep, and the verification page will not return it to anyone holding the identifier.",
      "Nobody at Snanify browses sankalps. Reading one requires two approvals and a written reason, it is logged permanently, and you are emailed within a day telling you that it was read, by whom, and why. That costs us something, which is why it is worth believing.",
      "One automated safety check runs over the text. No person sees it as a result of that check. If the text suggests someone may be in danger, you receive a message with places you can call, written so that nothing in it implies a person read your words, because none did. We will not hold a sankalp intended to harm a named person, and that refusal is one of the very few reasons a human would ever be shown the text.",
      "We never train anything on it. We never advertise from it. We never quote it, and we never turn it into a testimonial.",
    ],
    othersH: "Names that are not yours",
    others: [
      "When you name a living relative you are handing us their information, not your own. We ask you to confirm they would not object. We will remove any living person's details at that person's own request, without asking your permission first and without telling you who asked. Naming a child requires you to say that you are their guardian.",
    ],
    retentionH: "What is kept, and for how long",
    retention: [
      { k: "Your account", v: "as long as you keep it; invoices only where tax law requires" },
      { k: "Names, gotra, relationships", v: "24 months by default, 3 months or indefinite if you prefer" },
      { k: "Your sankalp", v: "kept while you keep sitting with it, because re-reading it is the practice; deleted the moment you ask, and always within seven days" },
      { k: "Your marks and your register", v: "kept until you delete them" },
      { k: "The river readings", v: "kept permanently, and they hold no name, gotra or sankalp, because they are readings of a river" },
    ],
    eraseH: "Erasure",
    erase: [
      "One button deletes everything, across copies and backups, within seven days. It works by destroying the key your record was encrypted with, which is why it holds even where the storage itself cannot be overwritten.",
      "The mark you downloaded keeps working afterwards, because what it stands on is a public river reading and not a row in our database. Deleting removes our ability to hold your sankalp, not your ability to prove what the river was doing.",
      "The confirmation lists what was deleted, what was kept, and why, including the invoices the law requires.",
    ],
    trackingH: "What runs on this site",
    tracking: [
      "No advertising script and no session-replay script runs anywhere on this site, ever. Nothing records the screen where you type your sankalp.",
      "One analytics script counts page views: Vercel Web Analytics. It sets no cookies, follows you to no other site, and never sees the contents of a form. We would rather name it than claim a zero we do not hold.",
      "The only other third-party script in the product is the payment processor's, on the payment step alone, named on that page.",
      "From the first paid sitting this page will carry a plain count of the secret demands for data we have received. If that sentence is ever removed rather than updated, read the removal.",
    ],
  },

  s11: {
    n: "11",
    id: "unsettled",
    h: "What we have not settled yet",
    lede: "What was verified, and what was not, applied to ourselves. Weigh what follows accordingly.",
    rows: [
      {
        q: "The panchang",
        a: "We have not yet named a source. Until we do, every exact time on this site is labelled provisional where it appears, and where sources disagree we show the range rather than a false precision. When a source is named, the method, the ayanamsa and the coordinates of the ghat itself are published beside the times.",
      },
      {
        q: "The river data licence",
        a: "Copernicus flood data is CC BY 4.0 and we carry the attribution. What is not settled is the commercial tier and the rate limits of the service we read it through, and the exact attribution wording that service requires. Until it is, this line is the honest state of it.",
      },
      {
        q: "Which waters have a named gauge",
        a: "The Central Water Commission's public portal carries no river level telemetry for the Ganga or the Yamuna basins, so four of the six waters have no named government station we can print. We would rather show a modelled figure and say it is modelled than name a station that is not there.",
      },
      {
        q: "The sound",
        a: "Every stem needs a licence and a named recordist before it plays. A water we have no honest recording of ships silent, and its page says so. Nothing here is generated audio and nothing is a live feed from any ghat.",
      },
      {
        q: "The verse in section 03",
        a: "It is quoted from ordinary daily use rather than from a named published edition. It is the load-bearing paragraph on this page, so it should be the best-sourced line on the site, and it is not yet. The edition will be cited here when it is fixed.",
      },
      {
        q: "Money, tax and jurisdiction",
        a: "Where the company sits, how this is taxed, and which law governs your data are real questions with real answers that we are still taking from counsel. Your data is meant to sit in India, with a European copy for those who ask. Until that is settled, this sentence is the honest state of it.",
      },
    ],
  },

  s12: {
    n: "12",
    id: "ask",
    h: "Ask someone whose judgement you trust",
    body: [
      "Before you pay us anything, ask someone whose judgement you trust in these matters, your own purohit, your family's acharya, your elders. If they tell you this is not the right thing for you, they are right, and we are not offended.",
      "And if you think we have got any of this wrong, the shastra, the price, the data, write to us. We publish objections made in good faith and what we did about them, including the ones we decided not to act on, and why.",
    ],
    mailLabel: "Write to us",
  },

  closing: {
    title: "The river is at its own level tonight, whether anyone is watching or not.",
    body: "You can be one of the people watching.",
    cta: "Sit with the river",
  },
};

export const ethicsContent = { en: ethicsEn, hi: {
  meta: {
    title: "घोषणा: डिजिटल स्नान क्या है, और क्या नहीं · स्नानिफ़ाई",
    description:
      "न पुरोहित, न घाट पर अनुष्ठान, न कोई प्रदर्शन, न आपकी ओर से किसी के द्वारा कुछ किया जाना। डिजिटल स्नान अर्थात किसी पवित्र नदी की वास्तविक मापी हुई स्थिति, सच्चा पंचांग, और वे शब्द जिन्हें केवल आप कहते हैं। जो दावे हम कभी नहीं करेंगे, इस साइट पर ठीक-ठीक क्या चलता है, और क्या अभी तय नहीं हुआ।",
  },
  eyebrow: "घोषणा",
  title: "डिजिटल स्नान करने योग्य सच्चा कर्म है।",
  lede: "स्नानिफ़ाई किसी और के अनुष्ठान की रिकॉर्डिंग नहीं है। कोई आपके बदले नदी में नहीं उतरता। आप जहाँ हैं वहीं बैठते हैं, उस घड़ी में जिसे पंचांग नाम देता है, सामने उस नदी की उसी दिन की वास्तविक स्थिति होती है, और आप स्वयं वही कहते हैं जो कहने आए थे। यही पूरा उत्पाद है, और हमारे मत में यह पर्याप्त है।",
  version:
    "संस्करण २, जो पूर्णतः डिजिटल स्नान की ओर मुड़ते समय लिखा गया। प्रकाशन की तिथि उसी दिन दर्ज होती है जिस दिन यह पृष्ठ सार्वजनिक होता है, और हर बाद का संशोधन तिथि सहित साथ रखा जाता है। यह पृष्ठ चुपचाप नहीं बदला जाता।",
  tocLabel: "इस पृष्ठ पर",

  s1: {
    n: "०१",
    id: "position",
    h: "सीधी बात",
    body: [
      "यहाँ कोई पुरोहित नहीं है। किसी घाट पर कोई अनुष्ठान नहीं होता। आपकी ओर से, कहीं भी, कोई कुछ नहीं करता, और इस साइट पर कुछ भी किसी विधि की रिकॉर्डिंग नहीं है।",
      "जो है, वह यह: एक सच्ची नदी की सच्ची स्थिति, आज उसी सार्वजनिक बाढ़-मॉडल से पढ़ी हुई जो उस पर दृष्टि रखता है। सच्चा पंचांग, ताकि जिस घड़ी में आप बैठें उसका अर्थ हो। बहते जल की ध्वनि। और वे शब्द, जिन्हें केवल आप कहते हैं।",
      "हम न मंदिर हैं, न किसी मंदिर की जगह ले रहे हैं। हम बैठने का एक स्थान हैं, तड़के चार बजे, उसी नदी के साथ जहाँ से आप हैं।",
    ],
    pull: "हम बताते हैं कि स्क्रीन पर क्या है। यह नहीं बताते कि उससे आपकी आत्मा का क्या होगा।",
  },

  s2: {
    n: "०२",
    id: "river",
    h: "हमारे सर्वर नदी में हैं",
    body: [
      "यह वाक्य नारे जैसा लगता है। असल में यह एक तकनीकी विवरण है।",
      "ग्यारह अगस्त को हरिद्वार में गंगा लगभग १,४४४ घन मीटर प्रति सेकंड बह रही थीं, जो वर्ष के उस सप्ताह के लिए सामान्य बहाव है। उसी दिन नासिक में गोदावरी उस सप्ताह के अपने ३५ वर्षों के इतिहास के ९५वें प्रतिशतक पर थीं। दोनों अंक उसी दिन इस साइट में आए, और गोदावरी वैसी ही सुनाई भी दीं।",
      "तो जब गंगा चढ़ती हैं, यह वेबसाइट भी उन्हीं के साथ चढ़ती है। अप्रैल में शिप्रा क्षीण होती हैं, तो यहाँ भी क्षीण होती हैं। इस साइट पर कुछ भी लूप नहीं है, न कोई तैयार दृश्य, न कोई सजाया हुआ वीडियो। इस उत्पाद में कहीं कोई कृत्रिम रूप से बनाया गया जल नहीं है, और कभी होगा भी नहीं।",
    ],
    specH: "वह अंक ठीक-ठीक है क्या",
    spec: [
      {
        k: "क्या मापा जाता है",
        v: "प्रतिरूपित नदी-प्रवाह, घन मीटर प्रति सेकंड में, उस ग्रिड-खंड पर जो नदी की उस धारा को ढकता है।",
      },
      {
        k: "कहाँ से आता है",
        v: "कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़ मॉडल से, Open-Meteo के माध्यम से पढ़ा हुआ। सार्वजनिक आँकड़ा, CC BY 4.0 अनुज्ञप्ति के अंतर्गत। यह एक मॉडल है, गेज का पाठ नहीं, और हम हर बार “प्रतिरूपित” ही लिखते हैं।",
      },
      {
        k: "प्रतिशतक का अर्थ",
        v: "आज का मान उसी खंड के उन सब दैनिक मानों के सामने कहाँ बैठता है जो वर्ष के इसी सप्ताह में १९९१ से २०२५ तक आए। उस नदी के अपने इतिहास के चार सौ पैंतीस दिन, और किसी नदी की तुलना करने का एकमात्र सच्चा ढंग।",
      },
      {
        k: "वह कितना पुराना है",
        v: "प्रतिदिन नवीनीकृत। हर पृष्ठ उसी पाठ का समय छापता है जो वह दिखा रहा है, वह समय नहीं जब आपने पृष्ठ खोला।",
      },
      {
        k: "जब हम नदी तक न पहुँच सकें",
        v: "पृष्ठ यही कहता है, और आज की तिथि का पैंतीस-वर्षीय मध्यमान छापता है, ठीक इसी नाम से। हम न बीच के मान गढ़ते हैं, न कोई विश्वसनीय दिखने वाला अंक बनाते हैं।",
      },
      {
        k: "नामित मापक केंद्र",
        v: "जहाँ सरकारी गेज है, वहाँ हम उसे नाम देते हैं: केंद्र, संस्था, निर्देशांक और शून्य-तल, केंद्रीय जल आयोग की अपनी सूची से। छह में से चार जलों के लिए इस पोर्टल पर कोई नदी-जलस्तर दूरमापी है ही नहीं, और वे पृष्ठ यही कहते हैं, कहीं और से अंक उधार नहीं लेते।",
      },
      {
        k: "हम स्वयं क्या मापते हैं",
        v: "कुछ भी नहीं। किसी भी घाट पर हमारा कोई कैमरा, कोई माइक्रोफ़ोन और कोई यंत्र नहीं है, और इस साइट पर कहीं कोई वीडियो नहीं है।",
      },
    ],
    coda: "नदी यहाँ सजावट नहीं है। वही निवेश है।",
    credit:
      "नदी-आँकड़े: कोपरनिकस आपातकालीन प्रबंधन सेवा, Open-Meteo के माध्यम से, CC BY 4.0। स्टेशन सूची: केंद्रीय जल आयोग, राष्ट्रीय जल आँकड़ा पोर्टल।",
  },

  s3: {
    n: "०३",
    id: "precedent",
    h: "इसका सबसे पुराना तर्क हमारा नहीं है",
    body: [
      "इससे पहले कि आप कहें कि नदी यात्रा नहीं कर सकती, देखिए कि आपके अपने घर में हर सुबह क्या होता है।",
    ],
    verse: ["गङ्गे च यमुने चैव गोदावरि सरस्वति।", "नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥"],
    verseGloss: "गंगा और यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु, कावेरी: इस जल में सन्निधि कीजिए।",
    after: [
      "यह लखनऊ में बाल्टी पर कहा जाता है। लेस्टर में शॉवर के नीचे। न्यू जर्सी में नल पर, उन लोगों के द्वारा जिन्होंने इनमें से एक भी नदी बीस वर्षों से नहीं देखी। यह कोई बहकी हुई उपमा नहीं है। यह एक विधि है, और बहुत पुरानी, जिससे दूर की नदी सामने रखे जल में सन्निहित होती है, और परंपरा ने इसे कभी छोटा कर्म नहीं माना।",
      "नदी को आप तक लाना हमने नहीं गढ़ा। आपकी दादी नाश्ते से पहले यही करती हैं। हमने उसके लिए एक बेहतर यंत्र बनाया है, जो आपको बता सकता है कि गंगा आज वास्तव में क्या कर रही हैं।",
    ],
  },

  s4: {
    n: "०४",
    id: "is-not",
    h: "डिजिटल स्नान क्या नहीं है",
    items: [
      {
        t: "यह स्नान नहीं है",
        d: "आपकी देह गंगा में नहीं उतरती, और पिक्सल की कोई सजावट उसे वहाँ नहीं पहुँचाएगी।",
      },
      {
        t: "यह आपके लिए किया गया अनुष्ठान नहीं है",
        d: "घाट पर कोई नहीं है। किसी को इसका पैसा नहीं मिलता कि वह कैमरे के सामने आपका नाम बोले। हम इसे सुधार मानते हैं, और क्यों, यह कुछ ही पंक्तियों बाद बताते हैं।",
      },
      {
        t: "यह आपकी आत्मा पर कोई दावा नहीं है",
        d: "किसी के कर्म का क्या होता है, हम नहीं जानते। जो इसका विकल्प बेच रहे हैं, वे भी नहीं जानते, यद्यपि उस आत्मविश्वास का मूल्य वे अधिक लेते हैं।",
      },
      {
        t: "यह जाने का विकल्प नहीं है",
        d: "यदि आप जा सकते हैं, अवश्य जाइए। टिकट लीजिए, रेल पकड़िए, सीढ़ियाँ उतरिए। बीच के ग्यारह वर्षों में हम यहीं मिलेंगे।",
      },
    ],
  },

  s5: {
    n: "०५",
    id: "wifi",
    h: "“वाई-फ़ाई से पाप नहीं धुलते”",
    body: [
      "सही बात है। नहीं धुलते। हमसे भी नहीं धुलते, और हमने कभी कहा भी नहीं कि धुलते हैं।",
      "देखिए कि यहाँ बेचा क्या जा रहा है: एक घड़ी, एक जल, उस जल का सच्चा पाठ, कुछ शब्द, और रखने योग्य एक चिह्न। इस साइट का हर मूल्य पढ़ जाइए, आपको एक भी वचन नहीं मिलेगा। न पाप धुलने का। न पुण्य गिनने का। न किसी दोष का, जो थोड़े और शुल्क पर खोजकर हटा दिया जाए। यदि आप इसी के लिए आए हैं, तो हम सचमुच ग़लत दुकान हैं, और दुकानें और भी बहुत हैं।",
      "बाक़ी आपत्ति प्रायः तकनीक की नहीं होती। वह गंभीरता की होती है, और यह चिंता उचित है। तो यह रही कसौटी, और यह हमारी बनाई हुई नहीं है।",
      "किसी ने कभी शिकायत नहीं की कि माला केवल धागा है। या दीया केवल तेल में बाती है। या मंदिर केवल वह पत्थर है जिसे लोग पहाड़ी पर ढो लाए। साधन कभी मुद्दा नहीं था।",
    ],
    pull: "मुद्दा ध्यान है, और ध्यान को सदा खड़े होने के लिए कोई जगह चाहिए रही है।",
    close:
      "हमने एक जगह बनाई है। वह तड़के चार बजे खुलती है, उसे पता होता है कि नदी क्या कर रही है, और उसके लिए वीज़ा नहीं चाहिए।",
  },

  s6: {
    n: "०६",
    id: "for",
    h: "यह किसके लिए है",
    items: [
      "उस व्यक्ति के लिए जिसका पासपोर्ट एक देश कहता है और कैलेंडर दूसरा। फ़्रैंकफ़र्ट के उस पोते के लिए जिसे तिथि कंठस्थ है और जिसने घाट कभी नहीं देखा। टोरंटो की उस माँ के लिए जिनके पास वर्ष में तीन सप्ताह की छुट्टी है और जिनके पिता का श्राद्ध उनमें से किसी में नहीं पड़ता।",
      "भारत में भी उन सबके लिए जिनके लिए घाट दूर नहीं, पहुँच के बाहर है। रात भर की रेल और तीस गीली सीढ़ियों ने लोगों को जल से उतना रोका है जितना दूरी ने कभी नहीं रोका।",
      "उनके लिए जिन्हें साधना चाहिए, संस्था नहीं। कोई बिचौलिया नहीं, कोई पंक्ति नहीं, नाम थमाने के लिए कोई काउंटर नहीं, और यह तय करने वाला कोई नहीं कि आपका गोत्र आपको पात्र बनाता है या नहीं।",
      "और उनके लिए भी जो बस जिज्ञासु हैं, एक चाय के मूल्य पर, यह सुने बिना कि उनके जीवन में कुछ गड़बड़ है।",
    ],
  },

  s7: {
    n: "०७",
    id: "not-for",
    h: "यह किसके लिए नहीं है",
    items: [
      {
        t: "यदि आप जल तक पहुँच सकते हैं, जाइए",
        d: "यह हम गंभीरता से कहते हैं और इस पृष्ठ के हर रूप में इसे सबसे ऊपर रखा है। यह तीर्थयात्रा का प्रतिद्वंद्वी नहीं है और उस तुलना में हर बार हारता है।",
      },
      {
        t: "यदि आपको कोई गारंटी चाहिए",
        d: "हम नहीं बेचते, और आप हमें मना भी नहीं पाएँगे।",
      },
      {
        t: "यदि आपके मत में अनुष्ठान तभी मान्य है जब कोई योग्य व्यक्ति तीर्थ पर आपकी ओर से उसे संपन्न करे",
        d: "वह एक सुसंगत मत है, गंभीर लोगों का मत है, और यह उत्पाद आपके लिए नहीं बना। हम आपसे बहस नहीं करेंगे, और ऐसा लिखेंगे भी नहीं मानो आप हैं ही नहीं। हमारे आदर सहित जाइए।",
      },
    ],
  },

  s8: {
    n: "०८",
    id: "never",
    h: "जो दावे हम कभी नहीं करेंगे",
    lede: "यह सूची हम पर बाध्यकारी है, हम पर, हमारे हर सहयोगी पर, और हमारी ओर से लिखने वाले हर व्यक्ति पर। हम कभी यह न कहेंगे, न संकेत करेंगे, न किसी साझेदार, ईमेल या विज्ञापन को कहने देंगे:",
    items: [
      "कि आपकी ओर से कुछ संपन्न किया गया। कुछ नहीं किया जाता। घाट पर कोई नहीं है, और इस उत्पाद में कोई पुरोहित है ही नहीं।",
      "कि आपके पाप धुल गए।",
      "कि इससे मोक्ष या मुक्ति मिलती है, या पुण्य की कोई माप।",
      "कि यह स्वयं नदी में स्नान करने के बराबर है।",
      "कि पुण्य गिना, गुणा या किसी योजना में संचित किया जा सकता है। ग्यारह स्नान ग्यारह बैठकें हैं, प्रति बैठक अधिक पुण्य नहीं।",
      "कि आपके पूर्वज अतृप्त हैं, भटक रहे हैं या प्रतीक्षा में हैं, या यह कि न ख़रीदने से आपके परिवार पर कुछ बीतेगा।",
      "कि आपकी कुंडली में कोई दोष है, या हम उसे खोज या दूर कर सकते हैं।",
      "कि इससे आपके जीवन में कोई परिणाम आता है, स्वास्थ्य, संतान, वीज़ा, विवाह, मुक़दमा, परीक्षा, नौकरी या धन।",
      "कि यह उस विधि का स्थान ले लेता है जिसे आपकी परंपरा स्वयं करने को कहती है।",
      "कि कोई आचार्य, मठ, अखाड़ा, मंदिर न्यास या घाट संस्था हमारा समर्थन करती है, जब तक उनका तिथि-अंकित हस्ताक्षरित पत्र हम प्रकाशित न करें, जिसे वे जब चाहें वापस ले सकें।",
      "कि किसी घाट का जल स्वच्छ, पीने योग्य या औषधीय है।",
      "कि आपकी देह शुद्ध हो गई।",
      "कि कोई मुहूर्त अंतिम है, या आपके जीवन में फिर नहीं आएगा। खगोल का स्थान पंचांग है; भुगतान के पृष्ठ पर वह कभी नहीं आएगा।",
      "कि इस साइट का कोई चित्र किसी नदी का सजीव दृश्य है। इस उत्पाद में कहीं कोई वीडियो नहीं है, न कृत्रिम रूप से बनाया गया दृश्य, न कृत्रिम स्वर, न गढ़े हुए नदी-आँकड़े। जो पाठ हम नहीं ला सके, वह “नहीं ला सके” ही छपता है।",
      "कि किसी दिवंगत व्यक्ति को कुछ प्राप्त हुआ, या उन पर कुछ प्रभाव पड़ा।",
      "किसी दिवंगत व्यक्ति का उपयोग विज्ञापन, उदाहरण या प्रशंसापत्र में।",
      "कोई भी वाक्य जो भय पर टिका हो, कि समय बीता जा रहा है, कि आपके घर पर कुछ आ पड़ेगा, कि न करने का पछतावा रहेगा।",
      "आपका संकल्प हम अपने विज्ञापन में कभी उद्धृत नहीं करेंगे, न नाम के साथ, न अनाम, न बदले हुए शब्दों में।",
      "जो नाम, गोत्र और संकल्प लोग हमें सौंपते हैं, उन्हें हम न बेचेंगे, न साझा करेंगे, न उनसे कोई उत्पाद बनाएँगे।",
    ],
    report:
      "यदि कभी हमें इनमें से कोई दावा करते देखें, हमें लिखिए। हम उसे हटाएँगे, सार्वजनिक रूप से स्वीकार करेंगे, और सुधार को तिथि सहित अभिलेख में रखेंगे। सुधार हम प्रकाशित करते हैं, वे भी जो हमारे लिए असहज थे।",
  },

  s9: {
    n: "०९",
    id: "never-do",
    h: "जो हम आपके साथ नहीं करेंगे",
    items: [
      "मुहूर्त पर कोई उलटी गिनती नहीं। सच्ची घड़ी आकाश का तथ्य है, आपको हड़बड़ाने का यंत्र नहीं।",
      "गढ़ी हुई कमी नहीं। यहाँ न कोई पंक्ति है, न प्रतीक्षा-सूची, न “अंतिम स्थान शेष”, क्योंकि यहाँ हो ही नहीं सकता।",
      "किसी की पुण्यतिथि पर संदेश तभी, जब आपने माँगा हो, और उसी संदेश में एक स्पर्श से वह सदा के लिए बंद।",
      "न कोई शृंखला, न बैज, न स्तर, न “आपने मार्च से कुछ नहीं किया”। आपकी पंजिका अभिलेख है, अंक-तालिका नहीं, और इसीलिए वह रखने योग्य है।",
      "शोक, अंत्येष्टि, श्रद्धांजलि या रोग से जुड़े पन्नों पर कोई विज्ञापन नहीं।",
      "शुभ दिन देखकर बढ़ता मूल्य नहीं, और यह देखकर बदलता मूल्य भी नहीं कि आप कौन लगते हैं।",
      "कोई डिब्बी पहले से चुनी हुई नहीं, न अतिरिक्त सेवा, न नवीनीकरण, न सूचना-सूची।",
      "रोकने में उतने ही क्लिक जितने आरंभ करने में; बीच में न कोई पर्दा, न कोई प्रस्ताव।",
      "सूची से हटने के लिए एक क्लिक, तुरंत मान्य, और “कम ईमेल कैसे रहेंगे” वाला चरण नहीं।",
      "कोई ऐसी प्रश्नावली नहीं जो आपको बताए कि आपकी कुंडली में क्या दोष है।",
      "कोई ऐसा पुष्टि-पर्दा नहीं जो पूछे कि आप निश्चित हैं, और आपकी राशि रोकने के लिए किसी बिछड़े हुए का नाम कभी नहीं।",
      "आपका संकल्प कोई AI नहीं लिखेगा, और उस खाने में कोई सुझाव नहीं, सुझाव लोगों को शोक की ओर मोड़ते हैं।",
      "स्वयं यात्रा करने के विरुद्ध एक शब्द भी नहीं।",
    ],
  },

  s10: {
    n: "१०",
    id: "data",
    h: "आपका नाम, आपका गोत्र, आपका संकल्प",
    body: [
      "गोत्र वंश है। संकल्प में कोई रोग हो सकता है, कोई मृत्यु, कोई भय। यह सामान्य ग्राहक-सूचना नहीं है, और हम इसे वैसा नहीं मानते, न क़ानून में, जहाँ यह विशेष श्रेणी की धार्मिक सूचना है, न व्यवहार में।",
    ],
    gotraH: "यहाँ गोत्र वैकल्पिक है",
    gotra: [
      "बहुत से परिवार गोत्र नहीं मानते, और जो फ़ॉर्म गोत्र पर अड़ता है वह लोगों को जाति से छाँटने वाला फ़ॉर्म है। हमारा नहीं अड़ता। रिक्त छोड़िए और संकल्प में लिखा जाएगा कि गोत्र अनुक्त है, या प्रचलित कश्यप गोत्र लिया जाएगा, या आपके परिवार की अपनी परिपाटी, यदि आप बता दें।",
      "जहाँ आप कई नाम लिखते हैं, वहाँ हर नाम का अपना गोत्र हो सकता है, क्योंकि घर एकरूप नहीं होते, विवाह कर आई स्त्री, गोद लिया बच्चा, अंतर्जातीय विवाह। छह नामों पर एक ही गोत्र अधिकांश परिवारों के लिए ग़लत संकल्प बनाता।",
    ],
    sankalpH: "संकल्प-पाठ",
    sankalp: [
      "आपका संकल्प केवल आपको दिखता है, और किसी को नहीं। उसे कहीं भी, कोई भी, ऊँचे स्वर में नहीं पढ़ता, क्योंकि इस उत्पाद में पढ़ने वाला कोई है ही नहीं। आप अपने ही शब्द पढ़ते हैं, मन में या अपने कमरे में स्वर के साथ, और बस इतना ही होता है।",
      "वह कहीं सार्वजनिक रूप से नहीं छपता। न पंजिका की पंक्ति में, न उस चिह्न पर जो आप रखते हैं, और सत्यापन पृष्ठ उसे किसी को नहीं दिखाता, चाहे उसके पास पहचान-संख्या हो।",
      "स्नानिफ़ाई में कोई संकल्प यूँ ही नहीं पढ़ता। पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह स्थायी रूप से दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया, किसने और क्यों। इसकी क़ीमत हमें चुकानी पड़ती है, इसीलिए यह विश्वास योग्य है।",
      "पाठ पर एक स्वचालित सुरक्षा-जाँच चलती है। उस जाँच के कारण कोई व्यक्ति उसे नहीं देखता। यदि पाठ से लगे कि कोई संकट में हो सकता है, तो आपको एक संदेश मिलता है जिसमें वे स्थान लिखे होते हैं जहाँ आप बात कर सकते हैं, और वह इस तरह लिखा जाता है कि उससे यह संकेत न मिले कि किसी ने आपके शब्द पढ़े, क्योंकि किसी ने नहीं पढ़े। किसी नामित व्यक्ति की हानि के उद्देश्य से लिखा संकल्प हम नहीं रखेंगे, और वही उन गिने-चुने कारणों में है जिनमें कोई व्यक्ति पाठ देख सकता है।",
      "हम इस पर कुछ प्रशिक्षित नहीं करते। इससे विज्ञापन नहीं करते। इसे उद्धृत नहीं करते। प्रशंसापत्र नहीं बनाते।",
    ],
    othersH: "वे नाम जो आपके अपने नहीं",
    others: [
      "जब आप किसी जीवित संबंधी का नाम देते हैं, तो आप हमें उनकी सूचना सौंप रहे हैं, अपनी नहीं। हम आपसे पुष्टि माँगते हैं कि उन्हें आपत्ति न होगी। किसी भी जीवित व्यक्ति की सूचना उन्हीं के कहने पर हटा दी जाती है, आपकी अनुमति लिए बिना, और यह बताए बिना कि किसने कहा। किसी बच्चे का नाम देने के लिए आपको यह कहना होता है कि आप उनके संरक्षक हैं।",
    ],
    retentionH: "क्या रखा जाता है, और कितने समय",
    retention: [
      { k: "आपका खाता", v: "जब तक आप रखें; रसीदें केवल जहाँ कर-क़ानून माँगे" },
      { k: "नाम, गोत्र, संबंध", v: "सामान्यतः 24 माह, आप चाहें तो 3 माह, या अनिश्चित काल" },
      { k: "आपका संकल्प", v: "जब तक आप उसके साथ बैठते रहें, क्योंकि उसे दोबारा पढ़ना ही साधना है; कहते ही मिटा दिया जाता है, और सात दिन के भीतर तो अवश्य" },
      { k: "आपके चिह्न और पंजिका", v: "जब तक आप स्वयं न हटाएँ" },
      { k: "नदी के पाठ", v: "स्थायी, और उनमें कोई नाम, गोत्र या संकल्प नहीं होता, क्योंकि वे नदी के पाठ हैं" },
    ],
    eraseH: "सब कुछ मिटाना",
    erase: [
      "एक बटन सब कुछ मिटा देता है, प्रतियों और बैकअप सहित, सात दिन के भीतर। यह उस कुंजी को नष्ट करके होता है जिससे आपका अभिलेख एन्क्रिप्ट किया गया था, इसीलिए यह वहाँ भी चलता है जहाँ भंडारण स्वयं मिटाया नहीं जा सकता।",
      "आपका उतारा हुआ चिह्न उसके बाद भी काम करता रहता है, क्योंकि वह जिस पर टिका है वह नदी का सार्वजनिक पाठ है, हमारी तालिका की कोई पंक्ति नहीं। मिटाने से आपका संकल्प रखने की हमारी क्षमता जाती है, नदी की स्थिति सिद्ध करने की आपकी क्षमता नहीं।",
      "पुष्टि-संदेश में लिखा होता है कि क्या मिटा, क्या रखा गया, और क्यों, उन रसीदों सहित जो क़ानून माँगता है।",
    ],
    trackingH: "इस साइट पर क्या चलता है",
    tracking: [
      "इस साइट पर कोई विज्ञापन या स्क्रीन-रिकॉर्डिंग स्क्रिप्ट नहीं चलती, कभी नहीं। जिस पृष्ठ पर आप अपना संकल्प लिखते हैं, उसे कुछ भी रिकॉर्ड नहीं करता।",
      "एक विश्लेषण स्क्रिप्ट पृष्ठ-दृश्य गिनती है: Vercel Web Analytics। वह कोई कुकी नहीं रखती, आपका पीछा किसी दूसरी साइट तक नहीं करती, और किसी फ़ॉर्म की सामग्री कभी नहीं देखती। जो शून्य हमारे पास नहीं है, उसका दावा करने से अच्छा है उसका नाम बता देना।",
      "उत्पाद में केवल एक और बाहरी स्क्रिप्ट है: भुगतान सेवा की, केवल भुगतान वाले चरण पर, और उसी पृष्ठ पर उसका नाम लिखा रहता है।",
      "पहली सशुल्क बैठक से यह पृष्ठ यह गिनती भी रखेगा कि सूचना के लिए कितनी गुप्त माँगें हमें मिलीं। यदि वह वाक्य कभी बदलने के बजाय हटा दिया जाए, तो हटाए जाने को ही पढ़िए।",
    ],
  },

  s11: {
    n: "११",
    id: "unsettled",
    h: "जो अभी तय नहीं हुआ",
    lede: "क्या सत्यापित हुआ और क्या नहीं, यही कसौटी इस बार अपने ऊपर लागू। आगे जो है, उसे इसी तराज़ू पर तौलिए।",
    rows: [
      {
        q: "पंचांग",
        a: "हमने अभी कोई स्रोत तय नहीं किया। जब तक न हो, इस साइट का हर सटीक समय जहाँ आता है वहीं “अस्थायी” अंकित रहता है, और जहाँ स्रोत भिन्न हों वहाँ झूठी सटीकता के बजाय हम पूरी सीमा दिखाते हैं। स्रोत तय होते ही गणना-पद्धति, अयनांश और घाट के अपने निर्देशांक समयों के साथ प्रकाशित होंगे।",
      },
      {
        q: "नदी-आँकड़ों की अनुज्ञप्ति",
        a: "कोपरनिकस के बाढ़-आँकड़े CC BY 4.0 हैं और हम उनका श्रेय देते हैं। जो तय नहीं है वह यह कि जिस सेवा के माध्यम से हम उन्हें पढ़ते हैं उसका वाणिज्यिक स्तर, उसकी सीमाएँ, और श्रेय का ठीक-ठीक वाक्य क्या होगा। जब तक तय न हो, यही वाक्य इसकी सच्ची स्थिति है।",
      },
      {
        q: "किन जलों का नामित गेज है",
        a: "केंद्रीय जल आयोग के सार्वजनिक पोर्टल पर गंगा और यमुना बेसिन के लिए नदी-जलस्तर दूरमापी है ही नहीं, इसलिए छह में से चार जलों के लिए हम कोई नामित सरकारी केंद्र नहीं छाप सकते। हम प्रतिरूपित अंक दिखाकर उसे प्रतिरूपित कहना अधिक ठीक मानते हैं, बनिस्बत ऐसे केंद्र का नाम लेने के जो है ही नहीं।",
      },
      {
        q: "ध्वनि",
        a: "हर ध्वनि-खंड के लिए बजने से पहले अनुज्ञप्ति और रिकॉर्ड करने वाले का नाम चाहिए। जिस जल की हमारे पास सच्ची रिकॉर्डिंग नहीं, वह मौन ही आता है, और उसका पृष्ठ यही कहता है। यहाँ कुछ भी कृत्रिम रूप से बनाई गई ध्वनि नहीं है और न किसी घाट से कोई सजीव प्रसारण।",
      },
      {
        q: "खंड ०३ का श्लोक",
        a: "वह रोज़ के प्रचलन से उद्धृत है, किसी नामित प्रकाशित संस्करण से नहीं। इस पृष्ठ का सबसे भार उठाने वाला अनुच्छेद वही है, इसलिए उसे साइट की सबसे अच्छी तरह स्रोत-सहित पंक्ति होना चाहिए, और अभी वह नहीं है। संस्करण तय होते ही यहीं उद्धृत होगा।",
      },
      {
        q: "धन, कर और अधिकार-क्षेत्र",
        a: "कंपनी कहाँ बैठेगी, इस पर कर कैसे लगेगा, और आपकी सूचना पर कौन-सा क़ानून चलेगा, ये वास्तविक प्रश्न हैं जिनके उत्तर हम अभी विधि-सलाहकारों से ले रहे हैं। आपकी सूचना भारत में रहनी है, और जो चाहें उनके लिए यूरोप में एक प्रति। जब तक यह तय न हो, यही वाक्य इसकी सच्ची स्थिति है।",
      },
    ],
  },

  s12: {
    n: "१२",
    id: "ask",
    h: "जिनका विवेक आप मानते हैं, उनसे पूछिए",
    body: [
      "हमें कुछ भी देने से पहले किसी ऐसे व्यक्ति से पूछिए जिनके विवेक पर आप इन विषयों में भरोसा करते हैं, अपने पुरोहित, अपने परिवार के आचार्य, अपने बड़े। यदि वे कहें कि यह आपके लिए उचित नहीं, तो वे ठीक कहते हैं, और हमें बुरा नहीं लगेगा।",
      "और यदि आपको लगे कि हमसे कहीं चूक हुई है, शास्त्र में, मूल्य में, आँकड़ों में, हमें लिखिए। सद्भाव से की गई आपत्तियाँ और उन पर हमारा किया, दोनों हम प्रकाशित करते हैं, वे भी जिन पर हमने कुछ नहीं किया, और क्यों नहीं किया।",
    ],
    mailLabel: "हमें लिखिए",
  },

  closing: {
    title: "आज रात नदी अपने ही स्तर पर है, कोई देखे या न देखे।",
    body: "आप देखने वालों में हो सकते हैं।",
    cta: "नदी के साथ बैठिए",
  },
} } satisfies Record<Lang, typeof ethicsEn>;

/* --------------------------------------------------------- how it works --- */

const howEn = {
  meta: {
    title: "How it works: four and a half minutes, five limbs · Snanify",
    description:
      "Jal Sankalp, the digital snan, at full length: the reading, the breath, the vow held for eleven seconds, ninety seconds of black screen, and the mark. What is on the screen, what you do, where the river figures come from, and what the whole thing costs.",
  },
  eyebrow: "How it works",
  title: "Four and a half minutes. The same five limbs, every day.",
  lede: "The form never changes. Only the river changes, and it changes on its own. Here is every second of it, what is on the screen, what you do, and what is written down at the end.",

  shipping: {
    eyebrow: "Read this first",
    title: "Nothing is shipped to you, and nothing is done for you.",
    body: [
      "Everything Snanify gives you is on a screen: four and a half minutes with the river, a mark that the day leaves behind, and one ruled line in a register you keep. No water, no prasad, no thread, no ash, no parcel, nothing that needs a customs form.",
      "And nothing is performed on your behalf. There is no priest in this product, nobody stands at any ghat for you, there is no camera on any water, and no part of this is a recording of a ceremony. If what you want is Ganga jal in your hand, or a rite done for you by somebody at the river, we are not that service, and we would rather say so here than take your money and disappoint you later.",
    ],
  },

  first: {
    n: "00",
    id: "first",
    label: "Before the first one",
    lede: "The first time you open it, before anything else happens, you are shown this. Once, and never again.",
    screen: [
      "No priest does anything for you here. No rite is performed at any ghat in your name. There is no camera on the water.",
      "What is real: the river, its flow today, modelled by the Copernicus global flood model and ranked against thirty-five years of its own history. The panchang. And your own words.",
      "That is the whole of it, and it is enough.",
    ],
    setupH: "Then three questions, asked once",
    setup: [
      { k: "Your name", v: "In Latin or in Devanagari, whichever you would rather read at six in the morning." },
      { k: "Your gotra", v: "Not every family keeps one. Leave it and the sankalp says so, plainly, with no apology in it." },
      { k: "What you carry", v: "Your sankalp, in your own words. Nothing is suggested to you and no machine writes it. You will read it back every morning, which is the reason you only type it once." },
      { k: "Which water", v: "Ganga at Har Ki Pauri, Triveni at Prayagraj, Yamuna at Mathura, Godavari at Nashik, Shipra at Ujjain, Kaveri at Talakaveri." },
      { k: "When you wake", v: "We bring the river to that hour, in your own timezone, against the muhurat computed for that ghat's true sunrise." },
    ],
  },

  formH: "The form, end to end",
  formLede:
    "Two hundred and seventy seconds, in the same order, at the same lengths, forever. There is no quick mode and there will never be one.",
  formHeads: { clock: "Clock", limb: "Limb", length: "Length" },

  limbs: [
    {
      id: "reading",
      n: "01",
      clock: "0:04",
      length: "21 seconds",
      label: "The reading",
      deva: "जल-पाठ · Jal Path",
      body: [
        "All the chrome leaves the screen and five almanac lines arrive, one every four seconds, set as a printed entry rather than an interface. The last line is the one people talk about afterwards, because it is about you rather than the river.",
        "Behind the type, a single hairline waterline sits at the river's real position between its own low water and its own high water for this week of the year. On a day the Godavari is in spate the phone is nearly all dark water above a thin band of paper. In February it sits near the bottom. Nobody has to explain this, and within a week you read it without looking.",
      ],
      specimenH: "A specimen, with the figures the Ganga actually carried on the eleventh of August",
      specimen: [
        "GANGA · HAR KI PAURI · HARIDWAR",
        "FLOW 1,444 cumec, MODELLED",
        "HIGHER THAN 41 DAYS IN 100 AT THIS TURN OF THE YEAR",
        "READ 04:00 IST · COPERNICUS EMS VIA OPEN-METEO",
        "YOU ARE 6,714 km FROM THIS WATER",
      ],
      note: "If we could not reach the river, the fourth line says so and prints the thirty-five year median for the date instead, labelled as exactly that. A stale honest number is completely fine. A fabricated fresh one would be the end of this business.",
    },
    {
      id: "breath",
      n: "02",
      clock: "0:25",
      length: "60 seconds",
      label: "The breath",
      deva: "श्वास · Shwas",
      body: [
        "The waterline rises for four seconds and falls for six, six times over. That is six breaths a minute with the exhale longer than the inhale, which is the rate the body settles at, and it is the only instruction in the whole product.",
        "The words “in” and “out” appear on the first two cycles and then never again. The instruction removes itself once your body has the pattern, which is the difference between a ritual and an interface.",
        "How far the line travels is set by today's flow. A river in spate breathes bigger. Same sixty seconds, physically different every morning, and neither of us did anything to make that happen.",
      ],
      specimenH: "On the screen",
      specimen: ["Breathe with the water.", "in", "out"],
      note: "With reduced motion turned on, the line holds still and the two words alternate on the same four and six second timing. The limb is never shortened.",
    },
    {
      id: "sankalp",
      n: "03",
      clock: "1:25",
      length: "60 seconds",
      label: "The vow",
      deva: "संकल्प · Sankalp",
      body: [
        "The water goes still and one line appears: say who you are. Beneath it, the sankalp, already filled in from what the site knows. The masa, the paksha and the tithi, your name, your gotra if you keep one, the city your phone is in, and the water you chose. Your own words sit in the last line, exactly as you typed them on the first day.",
        "Then you press and hold anywhere on the screen. While you hold, the text fills with vermillion from left to right, the way ink soaks into paper, over eleven seconds. Let go early and the ink drains back. There is no error, no red, and no scolding. You simply begin again.",
        "Eleven seconds of holding a thumb still while reading your own words is a long time, and it is meant to be. It cannot be hurried and it cannot be skipped, which is the whole reason this is not a form.",
      ],
      specimenH: "What appears when the eleven seconds are up",
      specimen: ["Spoken."],
      note: "Not “recorded”, not “offered”, not “accepted”. Spoken, because that is the only thing that happened, and it is true. If the tithi has no sourced panchang behind it, that line is left out of the sankalp entirely rather than guessed at.",
    },
    {
      id: "stillness",
      n: "04",
      clock: "2:25",
      length: "90 seconds",
      label: "The stillness",
      deva: "मौन · Maun",
      body: [
        "The screen tells you to put the phone down, and then the screen goes away. Fully black, brightness dropped, the river still running in your ears, for ninety of the two hundred and seventy seconds.",
        "If you pick the phone up nothing happens. No counter, no penalty, no note that you moved. A practice does not police you. One bell at ninety seconds brings you back.",
      ],
      specimenH: "On the screen, and then not on the screen",
      specimen: ["Put the phone down. Face down, if you like.", "The river runs for ninety seconds."],
      note: "The best minute of this product is the minute your screen is off. A screen reader is told the same thing in words: ninety seconds of stillness, the screen is dark on purpose.",
    },
    {
      id: "mark",
      n: "05",
      clock: "3:55",
      length: "35 seconds",
      label: "The mark",
      deva: "चिह्न · Chihn",
      body: [
        "The screen returns at a fifth of its brightness and the day writes itself into your register as one ruled line, the way an almanac sets an entry. Beneath it, the count, stated as an almanac would state it and never as a game.",
        "Then the mark itself: one engraving drawn from that day's actual reading, so a monsoon morning is a dark, crowded, high-horizoned sheet and a January morning is a pale and open one. You can tell what the river was doing from across the room, and nobody had to tell you.",
      ],
      specimenH: "The register line and the count",
      specimen: [
        "11 Aug · Shravan Shu. Ekadashi · Ganga 1,444 cumec · 04:38 · stillness 90 s",
        "Forty-first consecutive morning.",
        "The Ganga is carrying 300 cumec more than she did on your first.",
      ],
      note: "That second sentence is why people stay. Your practice is measured against the river's own year, so you are not collecting a streak, you are watching a river change while you keep showing up. Miss a week and nothing is lost, because a record is not a score.",
    },
  ],

  after: {
    id: "keep",
    n: "06",
    label: "What you keep",
    steps: [
      {
        t: "The mark, one per sitting",
        d: [
          "An engraving generated from the exact reading you sat with: the water, the station or the model cell, the flow, the percentile, the minute, your name and gotra. Two colours, no photograph, nothing generative in the modern sense of the word, just an old plate drawn by arithmetic.",
          "Anyone can recompute it. The page publishes the exact string the image was made from, so a stranger can hash it themselves and redraw the identical sheet. Forging one would mean forging a public river record.",
        ],
      },
      {
        t: "The register, one line per morning",
        d: [
          "A ruled column of your own mornings, set as an almanac page, kept for as long as you want it. At the end of a year it prints as a single sheet: your vow at the head, the river's high and low water for the year marked in the spot colour, and your kept mornings counted at the foot.",
        ],
      },
      {
        t: "What the mark does not say",
        d: [
          "It never says a rite was performed, because none was. The line at the foot of every sheet reads: no rite was performed for you, this sheet records a river, a minute, and the words you chose to say into it.",
          "It is set at the same weight as everything else on the sheet. It is not a disclaimer, it is the thesis.",
        ],
      },
    ],
  },

  sound: {
    label: "About the sound",
    body: [
      "Four recordings of moving water are mixed live against the river's actual percentile, so a river in spate is broken and urgent and a slack river is wide and slow. Rain fades in when it is raining at that ghat.",
      "The sound is real water and it is not live. It is recorded, licensed and credited, and nothing in it is generated. There is no microphone at any ghat, no live feed from anywhere, and no video in this product at all. A water we have no honest recording of ships silent, and its page says so rather than borrowing somebody else's river.",
    ],
  },

  price: {
    eyebrow: "What it costs",
    title: "The content is free. The snan is paid.",
    lede: "There is no free snan and there is no trial. Everything that is a page rather than a practice stays free forever: the live state of all six waters, the panchang, the muhurat calendar with its occasions, and the six waters themselves.",
    heads: { name: "Line", what: "What it is", world: "Vishwa Dar", india: "Bharat Dar" },
    rows: [
      { name: "Ek Dhara", alt: "एक धारा", what: "One snan. The whole four and a half minutes, one mark, one register line.", world: "$2", india: "₹101" },
      { name: "Gyarah", alt: "ग्यारह", what: "Eleven snans, held on your account until you use them. One dollar a snan, and the line most people take.", world: "$11", india: "₹501" },
      { name: "Varsh Kosh", alt: "वर्ष कोश", what: "Sixty snans. A year of most mornings, at the lowest price we can hold.", world: "$48", india: "₹2,100" },
    ],
    note: "Eleven at a time rather than one at a time for an unglamorous reason we would rather print than hide: a single dollar handed across a card network loses about a third of itself to fees, and eleven handed across at once loses about six percent. Buying eleven is what keeps a snan at a dollar. Nothing expires, nothing renews itself, and no box is ticked for you.",
    cta: "Sit with the river",
  },

  closing: {
    title: "The longer answer to “is this legitimate?”",
    body: "The manifesto: what a digital snan is, what it is not, what we will never claim, exactly what runs on this site, and what we have not settled yet.",
    ethicsLabel: "Read the manifesto",
    faqLabel: "Questions people ask",
  },
};

export const howItWorksContent = { en: howEn, hi: {
  meta: {
    title: "कैसे काम करता है: साढ़े चार मिनट, पाँच अंग · स्नानिफ़ाई",
    description:
      "जल संकल्प, अर्थात डिजिटल स्नान, पूरे विस्तार से: पाठ, श्वास, ग्यारह सेकंड तक थामा गया संकल्प, नब्बे सेकंड की अंधेरी स्क्रीन, और चिह्न। स्क्रीन पर क्या है, आप क्या करते हैं, नदी के अंक कहाँ से आते हैं, और पूरा मूल्य क्या है।",
  },
  eyebrow: "कैसे काम करता है",
  title: "साढ़े चार मिनट। वही पाँच अंग, हर दिन।",
  lede: "रूप कभी नहीं बदलता। केवल नदी बदलती है, और वह अपने आप बदलती है। यह रहा उसका हर सेकंड, स्क्रीन पर क्या है, आप क्या करते हैं, और अंत में क्या दर्ज होता है।",

  shipping: {
    eyebrow: "पहले यह पढ़िए",
    title: "आपके पास कुछ भेजा नहीं जाता, और आपके लिए कुछ किया नहीं जाता।",
    body: [
      "स्नानिफ़ाई जो देती है वह सब स्क्रीन पर है: नदी के साथ साढ़े चार मिनट, उस दिन का छोड़ा हुआ एक चिह्न, और एक पंजिका में एक पंक्ति जो आपकी रहती है। न जल, न प्रसाद, न मौली, न भस्म, न कोई पार्सल, न कोई ऐसी वस्तु जिसके लिए सीमा-शुल्क फ़ॉर्म चाहिए।",
      "और आपकी ओर से कुछ भी संपन्न नहीं किया जाता। इस उत्पाद में कोई पुरोहित नहीं है, कोई आपके लिए किसी घाट पर खड़ा नहीं होता, किसी जल पर कोई कैमरा नहीं है, और इसका कोई अंश किसी अनुष्ठान की रिकॉर्डिंग नहीं है। यदि आपको हाथ में गंगाजल चाहिए, या नदी पर किसी के द्वारा आपके लिए किया गया अनुष्ठान चाहिए, तो हम वह सेवा नहीं हैं, और यह हम यहीं कह देना चाहेंगे, बजाय इसके कि आपकी राशि लेकर बाद में निराश करें।",
    ],
  },

  first: {
    n: "००",
    id: "first",
    label: "पहली बार से पहले",
    lede: "पहली बार खोलने पर, किसी और चीज़ से पहले, आपको यही दिखाया जाता है। एक बार, और फिर कभी नहीं।",
    screen: [
      "यहाँ कोई पुरोहित आपके लिए कुछ नहीं करता। आपके नाम से किसी घाट पर कोई अनुष्ठान नहीं होता। जल पर कोई कैमरा नहीं है।",
      "जो सत्य है: नदी, आज उसका प्रवाह, कोपरनिकस के वैश्विक बाढ़ मॉडल से प्रतिरूपित और उसी नदी के पैंतीस वर्षों के इतिहास के सामने तौला हुआ। पंचांग। और आपके अपने शब्द।",
      "बस इतना ही है, और इतना पर्याप्त है।",
    ],
    setupH: "फिर तीन प्रश्न, केवल एक बार",
    setup: [
      { k: "आपका नाम", v: "देवनागरी में या रोमन में, जो सुबह छह बजे पढ़ना आपको सहज लगे।" },
      { k: "आपका गोत्र", v: "हर परिवार गोत्र नहीं रखता। छोड़ दीजिए और संकल्प में सीधे लिखा जाएगा कि गोत्र अनुक्त है, बिना किसी सफ़ाई के।" },
      { k: "आप क्या लेकर चलते हैं", v: "आपका संकल्प, आपके अपने शब्दों में। कोई सुझाव नहीं दिया जाता और कोई यंत्र उसे नहीं लिखता। इन्हें आप हर सुबह दोहराएँगे, और इसीलिए लिखना केवल एक बार पड़ता है।" },
      { k: "कौन-सा जल", v: "हर की पौड़ी की गंगा, प्रयागराज की त्रिवेणी, मथुरा की यमुना, नासिक की गोदावरी, उज्जैन की शिप्रा, तालकावेरी की कावेरी।" },
      { k: "आप कब उठते हैं", v: "हम नदी उसी घड़ी तक लाते हैं, आपके अपने समय में, उस घाट के वास्तविक सूर्योदय से गणना किए गए मुहूर्त के सामने।" },
    ],
  },

  formH: "पूरा रूप, आरंभ से अंत तक",
  formLede:
    "दो सौ सत्तर सेकंड, उसी क्रम में, उन्हीं अवधियों में, सदा। यहाँ कोई “जल्दी वाला” रूप नहीं है और कभी होगा भी नहीं।",
  formHeads: { clock: "घड़ी", limb: "अंग", length: "अवधि" },

  limbs: [
    {
      id: "reading",
      n: "०१",
      clock: "०:०४",
      length: "२१ सेकंड",
      label: "पाठ",
      deva: "जल-पाठ · Jal Path",
      body: [
        "स्क्रीन से सब कुछ हट जाता है और पंचांग की पाँच पंक्तियाँ आती हैं, हर चार सेकंड में एक, किसी छपी हुई प्रविष्टि की तरह, किसी इंटरफ़ेस की तरह नहीं। अंतिम पंक्ति ही वह है जिसकी चर्चा लोग बाद में करते हैं, क्योंकि वह नदी के बारे में नहीं, आपके बारे में है।",
        "अक्षरों के पीछे एक महीन जल-रेखा ठीक उस स्थान पर रहती है जहाँ नदी वर्ष के इस सप्ताह के अपने न्यूनतम और अधिकतम के बीच आज है। जिस दिन गोदावरी उफान पर हों, फ़ोन लगभग पूरा गहरा जल होता है और काग़ज़ की एक पतली पट्टी बचती है। फ़रवरी में वह रेखा नीचे बैठती है। यह किसी को समझाना नहीं पड़ता, और सप्ताह भर में आप उसे बिना देखे पढ़ने लगते हैं।",
      ],
      specimenH: "एक नमूना, उन्हीं अंकों के साथ जो ग्यारह अगस्त को गंगा में थे",
      specimen: [
        "गंगा · हर की पौड़ी · हरिद्वार",
        "प्रवाह १,४४४ क्यूमेक, प्रतिरूपित",
        "वर्ष के इस मोड़ पर सौ में से ४१ दिनों से ऊपर",
        "पाठ ०४:०० भा.मा.स. · कोपरनिकस EMS, Open-Meteo के माध्यम से",
        "आप इस जल से ६,७१४ किमी दूर हैं",
      ],
      note: "यदि हम नदी तक न पहुँच सके, तो चौथी पंक्ति यही कहती है और उसकी जगह उस तिथि का पैंतीस-वर्षीय मध्यमान छापती है, ठीक इसी नाम से। पुराना पर सच्चा अंक पूर्णतः ठीक है। गढ़ा हुआ ताज़ा अंक इस व्यापार का अंत होगा।",
    },
    {
      id: "breath",
      n: "०२",
      clock: "०:२५",
      length: "६० सेकंड",
      label: "श्वास",
      deva: "श्वास · Shwas",
      body: [
        "जल-रेखा चार सेकंड चढ़ती है और छह सेकंड उतरती है, छह बार। यह एक मिनट में छह साँसें हैं, जिनमें छोड़ना लेने से लंबा है, और यही वह गति है जिस पर देह शांत होती है। पूरे उत्पाद में निर्देश बस यही एक है।",
        "“भीतर” और “बाहर” पहले दो चक्रों में दिखते हैं और फिर कभी नहीं। जैसे ही देह को लय मिल जाती है, निर्देश स्वयं हट जाता है, और यही अंतर है साधना और इंटरफ़ेस में।",
        "रेखा कितनी दूर तक जाती है, यह आज के प्रवाह से तय होता है। उफान पर बहती नदी बड़ी साँस लेती है। वही साठ सेकंड, हर सुबह भौतिक रूप से अलग, और इसके लिए हममें से किसी ने कुछ नहीं किया।",
      ],
      specimenH: "स्क्रीन पर",
      specimen: ["जल के साथ साँस लीजिए।", "भीतर", "बाहर"],
      note: "यदि आपके फ़ोन पर गति कम करने का विकल्प चालू है, तो रेखा स्थिर रहती है और वही दो शब्द उसी चार तथा छह सेकंड की लय पर बदलते हैं। अंग कभी छोटा नहीं किया जाता।",
    },
    {
      id: "sankalp",
      n: "०३",
      clock: "१:२५",
      length: "६० सेकंड",
      label: "संकल्प",
      deva: "संकल्प · Sankalp",
      body: [
        "जल स्थिर हो जाता है और एक पंक्ति आती है: कहिए, आप कौन हैं। उसके नीचे संकल्प, जो साइट के पास जो है उससे पहले ही भरा हुआ है। मास, पक्ष और तिथि, आपका नाम, गोत्र यदि आप रखते हैं, वह नगर जहाँ आपका फ़ोन है, और आपका चुना हुआ जल। अंतिम पंक्ति में आपके अपने शब्द, ठीक वैसे जैसे आपने पहले दिन लिखे थे।",
        "फिर आप स्क्रीन पर कहीं भी दबाकर थामे रहते हैं। जब तक आप थामे हैं, अक्षर बाएँ से दाएँ सिंदूरी रंग से भरते जाते हैं, जैसे काग़ज़ में स्याही उतरती है, ग्यारह सेकंड में। पहले छोड़ देंगे तो स्याही लौट जाएगी। न कोई त्रुटि, न लाल रंग, न कोई डाँट। आप बस फिर से आरंभ करते हैं।",
        "अपने ही शब्द पढ़ते हुए ग्यारह सेकंड तक अंगूठा स्थिर रखना लंबा समय है, और उसे लंबा ही होना है। उसे न जल्दी किया जा सकता है, न छोड़ा जा सकता है, और यही पूरा कारण है कि यह कोई फ़ॉर्म नहीं है।",
      ],
      specimenH: "ग्यारह सेकंड पूरे होने पर क्या आता है",
      specimen: ["उच्चारित।"],
      note: "न “रिकॉर्ड हुआ”, न “अर्पित हुआ”, न “स्वीकृत”। उच्चारित, क्योंकि केवल यही हुआ, और यह सच है। यदि तिथि के पीछे कोई स्रोत-सहित पंचांग नहीं है, तो वह पंक्ति संकल्प से पूरी हटा दी जाती है, अनुमान से भरी नहीं जाती।",
    },
    {
      id: "stillness",
      n: "०४",
      clock: "२:२५",
      length: "९० सेकंड",
      label: "मौन",
      deva: "मौन · Maun",
      body: [
        "स्क्रीन कहती है कि फ़ोन नीचे रख दीजिए, और फिर स्क्रीन स्वयं चली जाती है। पूरी तरह काली, चमक घटी हुई, कानों में नदी बहती हुई, दो सौ सत्तर में से नब्बे सेकंड तक।",
        "यदि आप फ़ोन उठा लें तो कुछ नहीं होता। न कोई गिनती, न दंड, न यह टिप्पणी कि आप हिले। साधना पहरा नहीं देती। नब्बे सेकंड पर एक घंटी आपको वापस बुला लेती है।",
      ],
      specimenH: "स्क्रीन पर, और फिर स्क्रीन पर कुछ नहीं",
      specimen: ["फ़ोन नीचे रख दीजिए। चाहें तो उल्टा।", "नब्बे सेकंड नदी बहती रहेगी।"],
      note: "इस उत्पाद का सबसे अच्छा मिनट वही है जब आपकी स्क्रीन बंद रहती है। स्क्रीन रीडर को यही बात शब्दों में बताई जाती है: नब्बे सेकंड का मौन, स्क्रीन जानबूझकर अंधेरी है।",
    },
    {
      id: "mark",
      n: "०५",
      clock: "३:५५",
      length: "३५ सेकंड",
      label: "चिह्न",
      deva: "चिह्न · Chihn",
      body: [
        "स्क्रीन पाँचवें हिस्से की चमक पर लौटती है और वह दिन आपकी पंजिका में एक पंक्ति बनकर स्वयं लिख जाता है, ठीक वैसे जैसे पंचांग अपनी प्रविष्टि रखता है। उसके नीचे गिनती, वैसे ही कही हुई जैसे पंचांग कहेगा, किसी खेल की तरह कभी नहीं।",
        "फिर चिह्न स्वयं: उसी दिन के वास्तविक पाठ से खींची गई एक कृति, इसलिए वर्षा की सुबह गहरी, भरी हुई और ऊँचे क्षितिज वाली होती है, और जनवरी की सुबह हल्की और खुली। कमरे के दूसरे छोर से देखकर भी आप जान लेते हैं कि उस दिन नदी क्या कर रही थी, और यह किसी ने आपको बताया नहीं।",
      ],
      specimenH: "पंजिका की पंक्ति और गिनती",
      specimen: [
        "११ अग. · श्रावण शु. एकादशी · गंगा १,४४४ क्यूमेक · ०४:३८ · मौन ९० से.",
        "इकतालीसवीं लगातार सुबह।",
        "आपकी पहली सुबह से गंगा ३०० क्यूमेक अधिक ले जा रही हैं।",
      ],
      note: "दूसरा वाक्य ही वह कारण है जिससे लोग टिके रहते हैं। आपकी साधना नदी के अपने वर्ष के सामने तौली जाती है, इसलिए आप कोई शृंखला नहीं जोड़ रहे, आप एक नदी को बदलते हुए देख रहे हैं और साथ-साथ आते रहते हैं। एक सप्ताह छूट जाए तो कुछ नहीं खोता, क्योंकि अभिलेख अंक-तालिका नहीं है।",
    },
  ],

  after: {
    id: "keep",
    n: "०६",
    label: "आपके पास क्या रहता है",
    steps: [
      {
        t: "चिह्न, हर बैठक पर एक",
        d: [
          "ठीक उसी पाठ से बनी एक कृति जिसके साथ आप बैठे: जल, मापक केंद्र अथवा मॉडल का खंड, प्रवाह, प्रतिशतक, वह मिनट, आपका नाम और गोत्र। दो ही रंग, कोई छायाचित्र नहीं, आज के अर्थ में कुछ भी कृत्रिम रूप से रचा हुआ नहीं, केवल गणित से खींची गई एक पुरानी प्लेट।",
          "इसे कोई भी दोबारा गिन सकता है। पृष्ठ पर वह पूरी पंक्ति छपी रहती है जिससे चित्र बना, इसलिए कोई अपरिचित स्वयं उसका हैश निकालकर वही चित्र फिर से खींच सकता है। इसे नक़ली बनाने का अर्थ होगा नदी का सार्वजनिक अभिलेख नक़ली बनाना।",
        ],
      },
      {
        t: "पंजिका, हर सुबह की एक पंक्ति",
        d: [
          "आपकी अपनी सुबहों का एक पंक्तिबद्ध स्तंभ, पंचांग के पन्ने की तरह, जब तक आप चाहें। वर्ष के अंत में वह एक ही पत्र बनकर छपता है: शीर्ष पर आपका संकल्प, वर्ष भर के नदी के उच्चतम और निम्नतम जल सिंदूरी रंग में अंकित, और पाद पर आपकी निभाई हुई सुबहें गिनी हुई।",
        ],
      },
      {
        t: "चिह्न क्या नहीं कहता",
        d: [
          "वह कभी नहीं कहता कि कोई अनुष्ठान हुआ, क्योंकि हुआ ही नहीं। हर पत्र के पाद पर यही पंक्ति रहती है: आपके लिए कोई अनुष्ठान नहीं किया गया। यह पत्र एक नदी, एक क्षण, और वे शब्द अंकित करता है जो आपने उसमें कहे।",
          "वह पत्र की बाक़ी हर चीज़ जितने ही भार में छपी है। वह कोई अस्वीकरण नहीं, वही मूल बात है।",
        ],
      },
    ],
  },

  sound: {
    label: "ध्वनि के विषय में",
    body: [
      "बहते जल की चार रिकॉर्डिंग नदी के वास्तविक प्रतिशतक के सामने सजीव रूप से मिलाई जाती हैं, इसलिए उफान पर बहती नदी टूटी हुई और तेज़ सुनाई देती है और मंद नदी चौड़ी और धीमी। जब उस घाट पर वर्षा हो रही होती है, तब वर्षा भी घुल आती है।",
      "ध्वनि सच्चे जल की है और वह सजीव नहीं है। वह रिकॉर्ड की हुई, अनुज्ञप्त और श्रेय सहित है, और उसमें कुछ भी कृत्रिम रूप से बनाया हुआ नहीं। किसी घाट पर कोई माइक्रोफ़ोन नहीं है, कहीं से कोई सजीव प्रसारण नहीं है, और इस उत्पाद में वीडियो है ही नहीं। जिस जल की हमारे पास सच्ची रिकॉर्डिंग नहीं, वह मौन ही आता है, और उसका पृष्ठ यही कहता है, किसी और की नदी उधार नहीं लेता।",
    ],
  },

  price: {
    eyebrow: "मूल्य",
    title: "पढ़ने की सामग्री निःशुल्क है। स्नान सशुल्क है।",
    lede: "कोई निःशुल्क स्नान नहीं है और कोई आज़माइश नहीं है। जो पृष्ठ है, साधना नहीं, वह सदा निःशुल्क रहेगा: छहों जलों की सजीव स्थिति, पंचांग, मुहूर्त और उसके पर्व, और छहों जलों के अपने पृष्ठ।",
    heads: { name: "पंक्ति", what: "यह क्या है", world: "विश्व दर", india: "भारत दर" },
    rows: [
      { name: "एक धारा", alt: "Ek Dhara", what: "एक स्नान। पूरे साढ़े चार मिनट, एक चिह्न, पंजिका की एक पंक्ति।", world: "$2", india: "₹१०१" },
      { name: "ग्यारह", alt: "Gyarah", what: "ग्यारह स्नान, जो आपके खाते में तब तक रहते हैं जब तक आप उन्हें लें। एक स्नान एक डॉलर का, और अधिकांश लोग यही लेते हैं।", world: "$11", india: "₹५०१" },
      { name: "वर्ष कोश", alt: "Varsh Kosh", what: "साठ स्नान। वर्ष की अधिकांश सुबहें, उस न्यूनतम मूल्य पर जो हम निभा सकते हैं।", world: "$48", india: "₹२,१००" },
    ],
    note: "एक-एक करके नहीं, ग्यारह एक साथ, और इसका कारण साधारण है जिसे हम छिपाने के बजाय छाप देना ठीक समझते हैं: कार्ड नेटवर्क से गुज़रता एक अकेला डॉलर अपना लगभग एक तिहाई शुल्क में गँवा देता है, और एक साथ गुज़रते ग्यारह लगभग छह प्रतिशत। एक स्नान एक डॉलर पर इसीलिए टिकता है। कुछ भी समाप्त नहीं होता, कुछ भी स्वयं नवीनीकृत नहीं होता, और कोई डिब्बी आपके लिए पहले से चुनी हुई नहीं होती।",
    cta: "नदी के साथ बैठिए",
  },

  closing: {
    title: "“क्या यह सचमुच वैध है?”, विस्तृत उत्तर",
    body: "घोषणा: डिजिटल स्नान क्या है, क्या नहीं, कौन-से दावे हम कभी नहीं करेंगे, इस साइट पर ठीक-ठीक क्या चलता है, और क्या अभी तय नहीं हुआ।",
    ethicsLabel: "घोषणा पढ़िए",
    faqLabel: "लोग जो पूछते हैं",
  },
} } satisfies Record<Lang, typeof howEn>;

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
      id: "hard",
      title: "The hard questions",
      items: [
        {
          id: "does-it-work",
          q: "Does this actually work?",
          a: [
            "Define works.",
            "If you mean does the flow on your screen match what the river is doing, yes, and the source is public, linked, and checkable by you without asking us anything.",
            "If you mean does it change your fate, we have no idea, and neither does anyone charging you more. What we sell is an hour, a river, a true reading of it, and words you say yourself. Everything after that is between you and your tradition.",
          ],
        },
        {
          id: "priest",
          q: "Is there a priest? Who performs it?",
          a: [
            "There is no priest. There never is, and that is the point rather than a shortcut.",
            "Nobody stands at a ghat for you, nobody says your name into a camera, and nothing is recorded. What happens is that you sit for four and a half minutes with the real state of a real river and say your own sankalp. That is a smaller claim than the alternative, and it is the only one we can make truthfully.",
            "If you hold that a rite counts only when a qualified person performs it for you at the tirth, that is a coherent position and this product is not built for you. We are not going to argue you out of it.",
          ],
        },
        {
          id: "religious",
          q: "Is this religious? Am I doing a puja?",
          a: [
            "You are taking a sankalp, which is a naming: it fixes the place, the time, the lineage and the person. That is a Hindu form and we use it as one, in Devanagari and in Latin.",
            "Nothing else is asserted. There is no deity invoked on your behalf, no puja performed for you, no ceremony of any kind, because there is nobody here to perform one. People use it as a practice, people use it as four minutes of attention before the day starts, and both are fine by us.",
          ],
        },
        {
          id: "same-as-bathing",
          q: "Is this the same as bathing in the river myself?",
          a: [
            "No. Not close, and we will never say otherwise.",
            "Snan is an act of the body, and it is not happening to your body. The journey is part of the pilgrimage and we cannot give you the journey.",
            "If you can make the journey, make it. We will not say a word against it.",
          ],
        },
        {
          id: "scam",
          q: "How do I know this is not a scam?",
          a: [
            "Partly by what you can check yourself, and partly by what we refuse to say.",
            "What you can check: the river figure on any page is modelled discharge from the Copernicus global flood model, public and open, and every page prints the hour it was read. The mark you keep carries the exact string it was generated from, so a stranger can recompute the image and confirm the numbers against the source. There is nothing in that chain you have to take our word for.",
            "The refusal is the stronger signal. We publish a list of claims we will never make, no washed-away sins, no moksha, no dosha in your chart, no restless ancestors, no outcome in your life, and an address to report us if we ever break it. A business selling fake punya would not publish that list, because the list is the whole product they would be selling.",
          ],
        },
        {
          id: "punya",
          q: "Do I get more punya if I pay more?",
          a: [
            "No, and anyone who tells you otherwise is selling the thing we refuse to sell.",
            "The three lines differ in how many snans they hold and what each one costs us to process. They do not differ in what a sitting is. Eleven snans are eleven sittings, not more merit per sitting.",
          ],
        },
        {
          id: "who-for",
          q: "Who is this actually for?",
          a: [
            "People who cannot get to the water on the calendar's schedule: a tithi that falls on a Tuesday in Frankfurt, three weeks of leave a year, a shraddh in the middle of none of them.",
            "People in India for whom the ghat is not far but unreachable. Old knees have kept more people from the water than distance ever has.",
            "People who want the practice without the institution, and people who are simply curious for two dollars without being told first that something is wrong with their lives.",
            "It is not for anyone who can get to the water. Go.",
          ],
        },
      ],
    },
    {
      id: "sitting",
      title: "What actually happens",
      items: [
        {
          id: "what-happens",
          q: "What is actually on my screen?",
          a: [
            "Five limbs, always the same, four and a half minutes end to end. Twenty-one seconds of the river's reading set as an almanac entry. Sixty seconds of breathing with a waterline that rises for four and falls for six. Sixty seconds with your own sankalp, which you finish by pressing and holding for eleven seconds while the words fill with vermillion. Ninety seconds of a completely black screen with the river still running. Thirty-five seconds in which the day writes itself into your register and your mark is drawn.",
            "There is no progress bar anywhere in it, and no quick mode. The waterline is the only thing telling you time is passing, and it is busy doing something else.",
          ],
        },
        {
          id: "black-screen",
          q: "Ninety seconds of a black screen? Really?",
          a: [
            "Yes, and it is the best part. The screen tells you to put the phone down, and then it goes away.",
            "If you pick it up, nothing happens. No counter, no penalty, no note that you moved. One bell brings you back at ninety seconds.",
            "A digital product whose best minute is the minute the screen is off is a strange thing to build and an easy thing to defend.",
          ],
        },
        {
          id: "when",
          q: "Do I have to be awake at four in the morning?",
          a: [
            "No. You tell us when you wake, and the river is brought to that hour in your own timezone. Many people sit in the evening.",
            "The muhurat windows are computed against that ghat's true sunrise, so they are genuinely different for Haridwar and Nashik. Sit inside one if it matters to you, and outside one if it does not.",
          ],
        },
        {
          id: "miss",
          q: "What if I miss a day?",
          a: [
            "Nothing happens. Your register is a record, not a streak: it shows the mornings you kept, it does not scold you for the ones you did not.",
            "There are no badges, no levels, and no message telling you that you have not sat since March. We think that is precisely why people break it less.",
          ],
        },
        {
          id: "sound",
          q: "Is the sound real? Is it live?",
          a: [
            "It is real water, and it is not live.",
            "Four recordings of moving water are mixed against the river's actual percentile, so a river in spate sounds broken and urgent and a slack river sounds wide and slow. Rain fades in when it is raining at that ghat. Every recording is licensed and credited.",
            "There is no microphone at any ghat, no live feed from anywhere, and no generated audio. A water we have no honest recording of ships silent, and its page says so rather than borrowing somebody else's river.",
          ],
        },
        {
          id: "shipping",
          q: "Do you send me Ganga jal, or prasad?",
          a: [
            "No. Nothing is shipped to you, ever.",
            "Everything Snanify gives you is on a screen: the sitting, the mark, and your register. No water, no prasad, no thread, no ash, no parcel, no customs form.",
            "If what you want is Ganga jal in your hand, we are not the service for that.",
          ],
        },
        {
          id: "mark",
          q: "What is the mark I keep?",
          a: [
            "One engraving per sitting, drawn from the exact reading you sat with: the water, the flow, where that flow sits against thirty-five years of the same week, the minute, and your name and gotra. A monsoon morning is dark and crowded. A January morning is pale and open.",
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
            "Modelled river discharge from the Copernicus Emergency Management Service global flood model, read through Open-Meteo at the grid cell covering that reach of the river. It is public data, licensed CC BY 4.0, and we carry the attribution on every page that shows a number.",
            "It is a model, not a gauge reading, and we write “modelled” every single time rather than letting you assume there is an instrument in the water with our name on it.",
            "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates. Tithi and the muhurat windows are computed from the panchang against that ghat's true sunrise.",
          ],
        },
        {
          id: "percentile",
          q: "What does the percentile mean?",
          a: [
            "Where today's flow sits against every daily value that same cell has produced in this same week of the year from 1997 to 2025. Four hundred and thirty-five days of that river's own history.",
            "It is the only honest way to compare a river to anything. The Kaveri at Talakaveri runs at about six cubic metres a second and the Sangam at five thousand, and neither number tells you whether either river is behaving unusually. The percentile does.",
          ],
        },
        {
          id: "offline",
          q: "What happens when you cannot reach the river?",
          a: [
            "The page says so and prints the thirty-five year median for today's date, labelled as exactly that: this is what this river usually does on the eleventh of August, taken from thirty-five years of Augusts.",
            "We never interpolate and we never invent a plausible number. A reading a day old is served with its true timestamp and no apology, because a river moves on the scale of days.",
            "The one time the model goes quiet and the page says the model has gone quiet is worth more to us than a year of marketing.",
          ],
        },
        {
          id: "gauge",
          q: "Is there a government gauge at each ghat?",
          a: [
            "No, and we will not pretend there is. The Central Water Commission's public portal carries no river level telemetry for the Ganga or Yamuna basins at all, so four of the six waters have no named government station we can honestly print.",
            "Where a station does exist we name it: station, agency, coordinates and datum, from the Commission's own registry. Where it does not, the page shows the modelled figure and says that is what it is.",
          ],
        },
        {
          id: "camera",
          q: "Is there a camera on the river?",
          a: [
            "No. There is no video anywhere in this product, no live feed, no embedded stream, and no photograph pretending to be one.",
            "A live picture of a ghat on a page selling a digital snan invites exactly the inference that something is being performed for you. Nothing is. Sound and ink, nothing else.",
          ],
        },
        {
          id: "temperature",
          q: "Why do you not show the water temperature?",
          a: [
            "Because we could not find a live water temperature for these six waters from any source we can actually reach, and we will not print a number we cannot stand behind.",
            "Air temperature at the ghat is real and we show that instead. If a genuine water temperature feed appears for at least three of the six, we will add it and say where it came from.",
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
            "A sitting. Four and a half minutes with a river read that day, the panchang behind the hour, the sound, the mark that sitting leaves, and a line in a register you keep.",
            "Not a blessing, not an outcome, not a quantity of merit, and not somebody's labour at a ghat, because nobody is at a ghat.",
          ],
        },
        {
          id: "free",
          q: "Is there a free version?",
          a: [
            "Not of the snan. There is no free snan and no trial.",
            "Everything that is a page rather than a practice is free forever, with no account: the live state of all six waters, the panchang, the muhurat calendar and its occasions, and the six waters themselves. Read all of it, every day, and pay nothing.",
            "We would rather charge two dollars for the thing itself than dress a free tier up as generosity and sell your attention instead.",
          ],
        },
        {
          id: "prices",
          q: "What does it cost?",
          a: [
            "Ek Dhara, one snan, $2 or ₹101.",
            "Gyarah, eleven snans, $11 or ₹501, which is a dollar a snan and the line most people take.",
            "Varsh Kosh, sixty snans, $48 or ₹2,100.",
            "Snans sit on your account until you use them. Nothing expires, nothing renews itself, and no box is ticked for you.",
          ],
        },
        {
          id: "eleven",
          q: "Why eleven at a time and not one?",
          a: [
            "An unglamorous reason we would rather print than hide. A single dollar handed across a card network loses about a third of itself to processing fees. Eleven dollars handed across at once loses about six percent.",
            "Buying eleven at a time is the only way a single snan stays at a dollar. If we sold them one at a time at that price, a third of what you paid would go to the card network and the price would have to go up.",
          ],
        },
        {
          id: "india",
          q: "Why is the India price different?",
          a: [
            "Because a price that ignores where someone lives is not one price, it is a wall. The Bharat Dar is printed beside the Vishwa Dar everywhere, never swapped in behind your back based on where your connection appears to be.",
            "Nothing differs between them except the number. The same sittings, the same waters, the same marks.",
          ],
        },
        {
          id: "refund",
          q: "Can I get a refund?",
          a: [
            "Yes. Any snans you have not used are refunded in full, on one click, without being asked why.",
            "A sitting you have already done is not refundable, and we would rather say that plainly than pretend otherwise. Nothing was consumed except four and a half minutes of your own attention, and we cannot give those back either.",
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
            "If the field is empty the sankalp says the gotra is not stated, plainly, with no apology in it. If you would rather use the customary Kashyapa gotra, or your family's own convention, tell us and we will use that instead.",
          ],
        },
        {
          id: "names",
          q: "Can I include several people? What if they have different gotras?",
          a: [
            "Yes, and yes. Each name may carry its own gotra, because households are not uniform, a woman who married in, an adopted child, an inter-caste marriage. One gotra imposed on six names would produce a sankalp that is simply wrong for most families.",
            "You will be asked to confirm that anyone living whom you name would not object. If they later ask us to remove their details, we do it, without asking your permission first.",
          ],
        },
        {
          id: "ancestors",
          q: "Can I do this in memory of someone who has died?",
          a: [
            "You can name them in your own sankalp, in your own words, and sit with them in mind. We will label that as remembrance and nothing more.",
            "It is not a shraddh and it is not a tarpan. No rite is performed here at all, by anyone, so nothing is being offered on anyone's behalf. We will never say that a person who has died received anything, was affected by anything, or is waiting for anything.",
            "If a tithi matters to you, tell us and we will bring the river on that tithi, once a year, and never mention it otherwise.",
          ],
        },
        {
          id: "who-can-book",
          q: "I am not Hindu, or my family is inter-faith, or my name is not a Hindu name. Can I use this?",
          a: [
            "Yes. Nobody vets you, because there is nobody here to vet you. There is no counter, no queue and no gotra check.",
            "People use it for a Hindu parent, for a spouse, for a friend, for themselves, and for four quiet minutes with a river they have never seen.",
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
            "Nobody. It is shown to you and to no one else, and it is never spoken aloud by anyone anywhere, because there is nobody in this product to speak it.",
            "It is not printed on your mark, it is not in your register line, and the verification page will not return it to anyone holding the identifier.",
            "Nobody at Snanify browses sankalps. Reading one requires two approvals and a written reason, it is logged permanently, and you are emailed within a day telling you that it was read, by whom, and why. One automated safety check runs over the text; no person sees it as a result of that check.",
          ],
        },
        {
          id: "delete",
          q: "Can I delete everything?",
          a: [
            "Yes. One button, across copies and backups, within seven days. It works by destroying the key your record was encrypted with, which is why it holds even where storage cannot be overwritten.",
            "The mark you downloaded keeps working afterwards, because what it stands on is a public river reading rather than a row in our database. Deleting removes our ability to hold your sankalp, not your ability to prove what the river was doing.",
            "The confirmation lists what was deleted and what was kept, including the invoices tax law requires.",
          ],
        },
        {
          id: "tracking",
          q: "What is tracking me on this site?",
          a: [
            "No advertising script and no session-replay script, anywhere, ever. Nothing records the screen where you type your sankalp.",
            "Two third-party scripts exist in the whole product, and we name both. Vercel Web Analytics counts page views: no cookies, no cross-site following, no sight of any form. The payment processor's script runs on the payment step alone. We would rather qualify an absolute than break one.",
          ],
        },
        {
          id: "panchang",
          q: "Why are some timings marked provisional?",
          a: [
            "Because we have not yet named a panchang source, and a precise time with nothing behind it is an invented fact.",
            "Until a source is named, every exact time carries that label where it appears, and where sources disagree by more than a few minutes we show the range rather than pick the one that suits us. When a source is named, the method, the ayanamsa and the coordinates of the ghat are published beside the times.",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "Not answered here?",
    body: "Write to us. If it is a question others will have, we will add it to this page, and if you think we have got something wrong, we publish objections made in good faith along with what we did about them.",
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
      id: "hard",
      title: "कठिन प्रश्न",
      items: [
        {
          id: "does-it-work",
          q: "क्या इससे सचमुच कुछ होता है?",
          a: [
            "पहले यह तय कीजिए कि “होना” क्या है।",
            "यदि आपका अर्थ यह है कि आपकी स्क्रीन पर दिखता प्रवाह वही है जो नदी वास्तव में कर रही है, तो हाँ, और उसका स्रोत सार्वजनिक है, कड़ी सहित है, और आप उसे हमसे कुछ पूछे बिना स्वयं जाँच सकते हैं।",
            "यदि आपका अर्थ यह है कि इससे आपका भाग्य बदलेगा, तो हमें नहीं मालूम, और जो इसका अधिक मूल्य ले रहे हैं उन्हें भी नहीं मालूम। हम एक घड़ी, एक नदी, उसका सच्चा पाठ, और वे शब्द बेचते हैं जो आप स्वयं कहते हैं। उसके आगे जो है, वह आपके और आपकी परंपरा के बीच है।",
          ],
        },
        {
          id: "priest",
          q: "क्या कोई पुरोहित है? इसे संपन्न कौन करता है?",
          a: [
            "कोई पुरोहित नहीं है। कभी नहीं होता, और यही मूल बात है, कोई छोटा रास्ता नहीं।",
            "कोई आपके लिए किसी घाट पर खड़ा नहीं होता, कोई कैमरे के सामने आपका नाम नहीं बोलता, और कुछ भी रिकॉर्ड नहीं होता। जो होता है वह यह कि आप साढ़े चार मिनट किसी सच्ची नदी की सच्ची स्थिति के साथ बैठते हैं और अपना संकल्प स्वयं कहते हैं। यह दावा विकल्प से छोटा है, और केवल यही दावा हम सच्चाई से कर सकते हैं।",
            "यदि आपका मत यह है कि अनुष्ठान तभी मान्य है जब कोई योग्य व्यक्ति तीर्थ पर आपके लिए उसे संपन्न करे, तो वह सुसंगत मत है और यह उत्पाद आपके लिए नहीं बना। हम आपसे बहस नहीं करेंगे।",
          ],
        },
        {
          id: "religious",
          q: "क्या यह धार्मिक है? क्या मैं पूजा कर रहा हूँ?",
          a: [
            "आप संकल्प ले रहे हैं, जो एक नामकरण है: वह देश, काल, गोत्र और व्यक्ति को निश्चित करता है। यह हिंदू विधि का रूप है और हम उसे उसी रूप में रखते हैं, देवनागरी में भी और रोमन में भी।",
            "इसके आगे कुछ नहीं कहा जाता। आपकी ओर से किसी देवता का आवाहन नहीं होता, आपके लिए कोई पूजा नहीं होती, किसी प्रकार का कोई अनुष्ठान नहीं होता, क्योंकि करने वाला यहाँ कोई है ही नहीं। कुछ लोग इसे साधना की तरह लेते हैं, कुछ दिन आरंभ होने से पहले चार मिनट के ध्यान की तरह, और हमें दोनों स्वीकार हैं।",
          ],
        },
        {
          id: "same-as-bathing",
          q: "क्या यह स्वयं नदी में स्नान करने के समान है?",
          a: [
            "नहीं। कहीं से नहीं, और हम कभी इसका उलटा नहीं कहेंगे।",
            "स्नान देह का कर्म है, और वह आपकी देह पर नहीं हो रहा। यात्रा भी तीर्थ का अंग है, और यात्रा हम आपको नहीं दे सकते।",
            "यदि आप यात्रा कर सकते हैं, अवश्य कीजिए। हम उसके विरुद्ध एक शब्द नहीं कहेंगे।",
          ],
        },
        {
          id: "scam",
          q: "मुझे कैसे पता चले कि यह ठगी नहीं है?",
          a: [
            "कुछ इससे कि आप स्वयं क्या जाँच सकते हैं, और कुछ इससे कि हम क्या कहने से इनकार करते हैं।",
            "जो आप जाँच सकते हैं: किसी भी पृष्ठ पर दिखता नदी का अंक कोपरनिकस के वैश्विक बाढ़ मॉडल से लिया गया प्रतिरूपित प्रवाह है, जो सार्वजनिक और खुला है, और हर पृष्ठ उसके पढ़े जाने का समय छापता है। जो चिह्न आप रखते हैं, उस पर वही पंक्ति छपी होती है जिससे वह बना, इसलिए कोई अपरिचित चित्र दोबारा बनाकर अंकों को स्रोत से मिला सकता है। इस पूरी शृंखला में ऐसा कुछ नहीं जिसके लिए आपको हम पर विश्वास करना पड़े।",
            "पर इनकार अधिक बड़ा संकेत है। हम उन दावों की सूची प्रकाशित करते हैं जो हम कभी नहीं करेंगे, न धुले पाप, न मोक्ष, न कुंडली का दोष, न अतृप्त पूर्वज, न आपके जीवन में कोई परिणाम, और साथ में वह पता भी जहाँ हमारी शिकायत की जा सके। नक़ली पुण्य बेचने वाला व्यापार यह सूची कभी नहीं छापेगा, क्योंकि वही सूची उसका पूरा माल है।",
          ],
        },
        {
          id: "punya",
          q: "अधिक राशि देने पर अधिक पुण्य मिलता है क्या?",
          a: [
            "नहीं। और जो आपसे इसका उलटा कहे, वह ठीक वही बेच रहा है जिसे बेचने से हम इनकार करते हैं।",
            "तीनों पंक्तियाँ इसमें भिन्न हैं कि उनमें कितने स्नान हैं और हर एक पर हमें कितना शुल्क लगता है। वे इसमें भिन्न नहीं कि एक बैठक क्या है। ग्यारह स्नान ग्यारह बैठकें हैं, प्रति बैठक अधिक पुण्य नहीं।",
          ],
        },
        {
          id: "who-for",
          q: "यह वास्तव में किसके लिए है?",
          a: [
            "उनके लिए जो कैलेंडर की घड़ी पर जल तक नहीं पहुँच सकते: फ़्रैंकफ़र्ट में मंगलवार को पड़ती तिथि, वर्ष में तीन सप्ताह की छुट्टी, और उनमें से किसी में न पड़ने वाला श्राद्ध।",
            "भारत में भी उनके लिए जिनके लिए घाट दूर नहीं, पहुँच के बाहर है। बूढ़े घुटनों ने लोगों को जल से उतना रोका है जितना दूरी ने कभी नहीं रोका।",
            "उनके लिए जिन्हें साधना चाहिए, संस्था नहीं; और उनके लिए भी जो बस जिज्ञासु हैं, दो डॉलर में, यह सुने बिना कि उनके जीवन में कुछ गड़बड़ है।",
            "जो जल तक पहुँच सकते हैं, यह उनके लिए नहीं है। जाइए।",
          ],
        },
      ],
    },
    {
      id: "sitting",
      title: "वास्तव में होता क्या है",
      items: [
        {
          id: "what-happens",
          q: "मेरी स्क्रीन पर वास्तव में क्या होता है?",
          a: [
            "पाँच अंग, सदा वही, आरंभ से अंत तक साढ़े चार मिनट। इक्कीस सेकंड नदी का पाठ, पंचांग की प्रविष्टि की तरह रखा हुआ। साठ सेकंड श्वास, जिसमें जल-रेखा चार सेकंड चढ़ती और छह सेकंड उतरती है। साठ सेकंड आपके अपने संकल्प के साथ, जिसे आप ग्यारह सेकंड तक दबाकर थामे रहते हैं और अक्षर सिंदूरी रंग से भर जाते हैं। नब्बे सेकंड पूरी तरह अंधेरी स्क्रीन, नदी बहती हुई। और पैंतीस सेकंड, जिनमें वह दिन आपकी पंजिका में लिख जाता है और आपका चिह्न खिंचता है।",
            "इसमें कहीं कोई प्रगति-पट्टी नहीं है, और कोई “जल्दी वाला” रूप नहीं। समय बीतने का एकमात्र संकेत जल-रेखा है, और वह अपने में व्यस्त है।",
          ],
        },
        {
          id: "black-screen",
          q: "नब्बे सेकंड अंधेरी स्क्रीन? सचमुच?",
          a: [
            "हाँ, और वही सबसे अच्छा भाग है। स्क्रीन कहती है कि फ़ोन नीचे रख दीजिए, और फिर वह स्वयं चली जाती है।",
            "यदि आप उसे उठा लें तो कुछ नहीं होता। न कोई गिनती, न दंड, न यह टिप्पणी कि आप हिले। नब्बे सेकंड पर एक घंटी आपको वापस बुला लेती है।",
            "जिस डिजिटल वस्तु का सबसे अच्छा मिनट वही हो जब स्क्रीन बंद रहे, उसे बनाना विचित्र है और उसका बचाव सरल।",
          ],
        },
        {
          id: "when",
          q: "क्या तड़के चार बजे जागना आवश्यक है?",
          a: [
            "नहीं। आप बताते हैं कि आप कब उठते हैं, और नदी उसी घड़ी तक, आपके अपने समय में, लाई जाती है। बहुत लोग संध्या में बैठते हैं।",
            "मुहूर्त उस घाट के वास्तविक सूर्योदय से गणना किए जाते हैं, इसलिए हरिद्वार और नासिक के मुहूर्त सचमुच भिन्न होते हैं। यदि आपके लिए इसका महत्व है तो मुहूर्त के भीतर बैठिए, और न हो तो बाहर।",
          ],
        },
        {
          id: "miss",
          q: "यदि कोई दिन छूट जाए तो?",
          a: [
            "कुछ नहीं होता। आपकी पंजिका अभिलेख है, शृंखला नहीं: वह उन सुबहों को दिखाती है जो आपने निभाईं, उन पर डाँटती नहीं जो छूट गईं।",
            "यहाँ न बैज हैं, न स्तर, और न ऐसा कोई संदेश कि आप मार्च से नहीं बैठे। हमारे मत में यही कारण है कि लोग इसे कम तोड़ते हैं।",
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
            "नहीं। आपके पास कुछ भी नहीं भेजा जाता, कभी नहीं।",
            "स्नानिफ़ाई जो देती है वह सब स्क्रीन पर है: बैठक, चिह्न, और आपकी पंजिका। न जल, न प्रसाद, न मौली, न भस्म, न पार्सल, न कोई सीमा-शुल्क फ़ॉर्म।",
            "यदि आपको हाथ में गंगाजल चाहिए, तो हम उसकी सेवा नहीं हैं।",
          ],
        },
        {
          id: "mark",
          q: "जो चिह्न मुझे मिलता है, वह क्या है?",
          a: [
            "हर बैठक पर एक कृति, ठीक उसी पाठ से खींची हुई जिसके साथ आप बैठे: जल, प्रवाह, वह प्रवाह उसी सप्ताह के पैंतीस वर्षों के सामने कहाँ बैठता है, वह मिनट, और आपका नाम तथा गोत्र। वर्षा की सुबह गहरी और भरी हुई होती है। जनवरी की सुबह हल्की और खुली।",
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
            "आज का प्रवाह उन सब दैनिक मानों के सामने कहाँ बैठता है जो उसी खंड पर वर्ष के इसी सप्ताह में १९९१ से २०२५ तक आए। उस नदी के अपने इतिहास के चार सौ पैंतीस दिन।",
            "किसी नदी की तुलना करने का यही एकमात्र सच्चा ढंग है। तालकावेरी में कावेरी लगभग छह घन मीटर प्रति सेकंड बहती हैं और संगम पर पाँच हज़ार, और इनमें से कोई अंक यह नहीं बताता कि कोई नदी असामान्य व्यवहार कर रही है या नहीं। प्रतिशतक बताता है।",
          ],
        },
        {
          id: "offline",
          q: "जब आप नदी तक न पहुँच सकें तब क्या होता है?",
          a: [
            "पृष्ठ यही कहता है और आज की तिथि का पैंतीस-वर्षीय मध्यमान छापता है, ठीक इसी नाम से: यह वह है जो यह नदी सामान्यतः ग्यारह अगस्त को करती है, पैंतीस वर्षों के अगस्त से लिया गया।",
            "हम न बीच के मान गढ़ते हैं, न कोई विश्वसनीय दिखने वाला अंक बनाते हैं। एक दिन पुराना पाठ अपने सच्चे समय के साथ दिखाया जाता है, बिना किसी सफ़ाई के, क्योंकि नदी दिनों की गति से बदलती है।",
            "जिस दिन मॉडल चुप हो जाए और पृष्ठ कह दे कि मॉडल चुप है, वह दिन हमारे लिए वर्ष भर के विज्ञापन से अधिक मूल्यवान है।",
          ],
        },
        {
          id: "gauge",
          q: "क्या हर घाट पर कोई सरकारी गेज है?",
          a: [
            "नहीं, और हम ऐसा दिखावा नहीं करेंगे। केंद्रीय जल आयोग के सार्वजनिक पोर्टल पर गंगा और यमुना बेसिन के लिए नदी-जलस्तर दूरमापी है ही नहीं, इसलिए छह में से चार जलों के लिए हम कोई नामित सरकारी केंद्र सच्चाई से नहीं छाप सकते।",
            "जहाँ केंद्र है, वहाँ हम उसे नाम देते हैं: केंद्र, संस्था, निर्देशांक और शून्य-तल, आयोग की अपनी सूची से। जहाँ नहीं है, वहाँ पृष्ठ प्रतिरूपित अंक दिखाता है और यही कहता है कि वह प्रतिरूपित है।",
          ],
        },
        {
          id: "camera",
          q: "क्या नदी पर कोई कैमरा है?",
          a: [
            "नहीं। इस उत्पाद में कहीं कोई वीडियो नहीं है, न कोई सजीव प्रसारण, न कोई जुड़ा हुआ स्ट्रीम, और न ऐसा कोई चित्र जो सजीव होने का भ्रम दे।",
            "डिजिटल स्नान बेचते पृष्ठ पर घाट का सजीव चित्र ठीक वही अनुमान जगाता है कि आपके लिए कुछ किया जा रहा है। कुछ नहीं किया जाता। केवल ध्वनि और स्याही, और कुछ नहीं।",
          ],
        },
        {
          id: "temperature",
          q: "आप जल का तापमान क्यों नहीं दिखाते?",
          a: [
            "क्योंकि इन छह जलों के लिए किसी ऐसे स्रोत से सजीव जल-तापमान हमें नहीं मिला जहाँ तक हम वास्तव में पहुँच सकें, और जिस अंक के पीछे हम खड़े न हो सकें उसे हम नहीं छापेंगे।",
            "घाट पर वायु का तापमान सच्चा है और हम वही दिखाते हैं। यदि छह में से कम से कम तीन के लिए सच्चा जल-तापमान उपलब्ध होगा, तो हम उसे जोड़ देंगे और बता देंगे कि वह कहाँ से आया।",
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
            "एक बैठक का। उस दिन पढ़ी गई नदी के साथ साढ़े चार मिनट, उस घड़ी के पीछे का पंचांग, ध्वनि, उस बैठक का छोड़ा हुआ चिह्न, और आपकी पंजिका में एक पंक्ति।",
            "किसी आशीर्वाद का नहीं, किसी परिणाम का नहीं, पुण्य की किसी मात्रा का नहीं, और घाट पर किसी के श्रम का भी नहीं, क्योंकि घाट पर कोई है ही नहीं।",
          ],
        },
        {
          id: "free",
          q: "क्या कोई निःशुल्क रूप है?",
          a: [
            "स्नान का नहीं। कोई निःशुल्क स्नान नहीं है और कोई आज़माइश नहीं है।",
            "जो पृष्ठ है, साधना नहीं, वह बिना खाते के सदा निःशुल्क है: छहों जलों की सजीव स्थिति, पंचांग, मुहूर्त और उसके पर्व, और छहों जलों के अपने पृष्ठ। सब पढ़िए, हर दिन पढ़िए, और कुछ मत दीजिए।",
            "हम वस्तु के दो डॉलर लेना अधिक ठीक मानते हैं, बनिस्बत इसके कि एक निःशुल्क स्तर को उदारता कहकर सजाएँ और बदले में आपका ध्यान बेच दें।",
          ],
        },
        {
          id: "prices",
          q: "इसका मूल्य क्या है?",
          a: [
            "एक धारा, एक स्नान, $2 अथवा ₹१०१।",
            "ग्यारह, ग्यारह स्नान, $11 अथवा ₹५०१, अर्थात एक स्नान एक डॉलर का, और अधिकांश लोग यही लेते हैं।",
            "वर्ष कोश, साठ स्नान, $48 अथवा ₹२,१००।",
            "स्नान आपके खाते में तब तक रहते हैं जब तक आप उन्हें लें। कुछ भी समाप्त नहीं होता, कुछ भी स्वयं नवीनीकृत नहीं होता, और कोई डिब्बी आपके लिए पहले से चुनी हुई नहीं होती।",
          ],
        },
        {
          id: "eleven",
          q: "एक-एक क्यों नहीं, ग्यारह एक साथ क्यों?",
          a: [
            "इसका कारण साधारण है जिसे हम छिपाने के बजाय छाप देना ठीक समझते हैं। कार्ड नेटवर्क से गुज़रता एक अकेला डॉलर अपना लगभग एक तिहाई शुल्क में गँवा देता है। एक साथ गुज़रते ग्यारह डॉलर लगभग छह प्रतिशत।",
            "एक स्नान एक डॉलर पर केवल इसी तरह टिक सकता है। यदि हम उसी मूल्य पर एक-एक बेचते, तो आपके दिए हुए का एक तिहाई कार्ड नेटवर्क को जाता और मूल्य बढ़ाना पड़ता।",
          ],
        },
        {
          id: "india",
          q: "भारत का मूल्य अलग क्यों है?",
          a: [
            "क्योंकि जो मूल्य यह नहीं देखता कि व्यक्ति कहाँ रहता है, वह एक मूल्य नहीं, एक दीवार है। भारत दर हर जगह विश्व दर के साथ छपी रहती है, आपकी जानकारी के बिना, आपके संपर्क के आधार पर, चुपचाप बदली नहीं जाती।",
            "अंक के अतिरिक्त दोनों में कुछ भी भिन्न नहीं। वही बैठकें, वही जल, वही चिह्न।",
          ],
        },
        {
          id: "refund",
          q: "क्या राशि वापस मिल सकती है?",
          a: [
            "हाँ। जो स्नान आपने नहीं लिए, उनकी पूरी राशि एक क्लिक पर वापस, बिना यह पूछे कि क्यों।",
            "जो बैठक आप कर चुके हैं, वह वापसी योग्य नहीं है, और यह हम साफ़ कह देना चाहेंगे। उसमें आपके अपने ध्यान के साढ़े चार मिनट के अतिरिक्त कुछ ख़र्च नहीं हुआ, और वे मिनट हम भी लौटा नहीं सकते।",
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
            "आप उनका नाम अपने संकल्प में, अपने शब्दों में लिख सकते हैं, और उन्हें मन में रखकर बैठ सकते हैं। हम उसे स्मरण कहेंगे, इससे अधिक कुछ नहीं।",
            "यह न श्राद्ध है, न तर्पण। यहाँ किसी के द्वारा कोई अनुष्ठान होता ही नहीं, इसलिए किसी की ओर से कुछ अर्पित भी नहीं होता। हम कभी नहीं कहेंगे कि किसी दिवंगत को कुछ प्राप्त हुआ, उन पर कुछ प्रभाव पड़ा, या वे किसी की प्रतीक्षा में हैं।",
            "यदि कोई तिथि आपके लिए महत्व रखती है, तो बता दीजिए, हम उसी तिथि पर, वर्ष में एक बार, नदी ले आएँगे, और उसके अतिरिक्त कभी उसका उल्लेख नहीं करेंगे।",
          ],
        },
        {
          id: "who-can-book",
          q: "मैं हिंदू नहीं हूँ, या मेरा परिवार अंतर-धार्मिक है, या मेरा नाम हिंदू नाम नहीं है। क्या मैं यह कर सकता हूँ?",
          a: [
            "हाँ। कोई आपकी जाँच नहीं करता, क्योंकि जाँच करने वाला यहाँ कोई है ही नहीं। न कोई काउंटर, न पंक्ति, न गोत्र की परख।",
            "लोग इसे अपने हिंदू माता-पिता के लिए करते हैं, जीवनसाथी के लिए, मित्र के लिए, अपने लिए, और उस नदी के साथ चार शांत मिनटों के लिए जिसे उन्होंने कभी देखा नहीं।",
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
            "कोई नहीं। वह केवल आपको दिखता है, और किसी को नहीं, और उसे कहीं भी कोई ऊँचे स्वर में नहीं पढ़ता, क्योंकि इस उत्पाद में पढ़ने वाला कोई है ही नहीं।",
            "वह न आपके चिह्न पर छपता है, न पंजिका की पंक्ति में आता है, और सत्यापन पृष्ठ उसे किसी को नहीं दिखाता, चाहे उसके पास पहचान-संख्या हो।",
            "स्नानिफ़ाई में कोई संकल्प यूँ ही नहीं पढ़ता। पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह स्थायी रूप से दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया, किसने और क्यों। पाठ पर एक स्वचालित सुरक्षा-जाँच चलती है; उसके कारण कोई व्यक्ति उसे नहीं देखता।",
          ],
        },
        {
          id: "delete",
          q: "क्या मैं सब कुछ मिटा सकता हूँ?",
          a: [
            "हाँ। एक बटन, प्रतियों और बैकअप सहित, सात दिन के भीतर। यह उस कुंजी को नष्ट करके होता है जिससे आपका अभिलेख एन्क्रिप्ट किया गया था, इसीलिए यह वहाँ भी चलता है जहाँ भंडारण मिटाया नहीं जा सकता।",
            "आपका उतारा हुआ चिह्न उसके बाद भी काम करता रहता है, क्योंकि वह जिस पर टिका है वह नदी का सार्वजनिक पाठ है, हमारी तालिका की कोई पंक्ति नहीं। मिटाने से आपका संकल्प रखने की हमारी क्षमता जाती है, नदी की स्थिति सिद्ध करने की आपकी क्षमता नहीं।",
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
