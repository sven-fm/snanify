/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /kumbh, the Nashik and Trimbakeshwar Simhastha, as a reference page.

   Rules this file is written under, inherited from rivers.ts and trust.ts and
   tightened where a mela makes them tighter:

   1. Every date is PROVISIONAL. The schedule below is taken from press reports
      of the Government of Maharashtra release and from published guides. No
      government notification has been read directly and no panchang provider
      has been named on this site, so nothing here may render without the
      provisional label beside it. `ScheduleEntry.confidence` exists so that
      shipping a date without its provenance is a type-level omission.
   2. No time of day is stated for any bathing day. The one clock time that
      appears anywhere (the reported dhwajarohan muhurat) is carried in a note
      field, attributed, and marked as reported rather than sourced.
   3. Permission is nothing. `PERMIT_STATUS` is "PLACEHOLDER" here for the same
      reason it is PLACEHOLDER in rivers.ts: we hold nothing, at Ram Kund or
      anywhere else, and a bigger occasion is not a reason to soften the line.
   4. The twelve-year interval is stated as astronomy, in a calendar, which is
      exactly where trust.ts §07 says astronomy belongs. It is never stated as
      a reason to hurry, and there is no countdown, no seat count, no "last
      chance" and no "not again until 2039" anywhere on this page.
   5. No river is described by reference to another river (rivers.ts rule 4).
      "Dakshin Ganga" and "Ganga of the south" are out; Gautami is in.
   6. Nothing is sold. There is no price on this page, and the interest
      register holds no place, issues no number and starts no mailing list.
   --------------------------------------------------------------------------- */

/** Both locales required, a missing translation is a compile error. */
export type Bilingual = Record<Lang, string>;

export const KUMBH_ROUTE = "/kumbh";

/**
 * PLACEHOLDER. This alias must exist and be answered by a person before the
 * page ships, because the register is the only thing on it that asks a visitor
 * to act. If it cannot be provisioned, the register section comes out; it does
 * not degrade to an unread inbox.
 */
export const KUMBH_MAIL = "kumbh@snanify.com";

/** What we actually hold at Ram Kund. Same vocabulary as rivers.ts. */
export const PERMIT_STATUS = "PLACEHOLDER" as const;

/* --- the schedule -------------------------------------------------------- */

export type ScheduleKind = "dhwajarohan" | "amrit-snan" | "avarohan";

/** Mirrors muhurat.ts: nothing on this site claims to be sourced yet. */
export type DateConfidence = "provisional" | "sourced";

export type ScheduleEntry = {
  readonly key: string;
  /** Civil date at the ghat, "YYYY-MM-DD". Never an instant, never a time. */
  readonly date: string;
  readonly kind: ScheduleKind;
  readonly title: Bilingual;
  /** The tithi as published in the guides. Not computed by us. */
  readonly tithi: Bilingual;
  readonly place: Bilingual;
  readonly note: Bilingual;
  readonly confidence: DateConfidence;
};

export const KUMBH_SCHEDULE: readonly ScheduleEntry[] = [
  {
    key: "dhwajarohan",
    date: "2026-10-31",
    kind: "dhwajarohan",
    confidence: "provisional",
    title: { en: "Dhwajarohan", hi: "ध्वजारोहण" },
    tithi: {
      en: "Not stated in the sources we have read",
      hi: "जो स्रोत हमने पढ़े, उनमें तिथि नहीं दी गई",
    },
    place: {
      en: "Ram Kund and Panchavati, Nashik; Trimbakeshwar",
      hi: "रामकुंड एवं पंचवटी, नासिक; त्र्यंबकेश्वर",
    },
    note: {
      en: "The flag is raised and the mela period formally opens. Secondary guides report a muhurat of 12:02 in the afternoon, Indian Standard Time. We have not seen that time in a government document and we do not treat it as settled.",
      hi: "ध्वज चढ़ता है और मेला-काल औपचारिक रूप से आरंभ होता है। सहायक मार्गदर्शिकाओं में दोपहर १२:०२ (भारतीय मानक समय) का मुहूर्त बताया गया है। यह समय हमने किसी शासकीय दस्तावेज़ में नहीं देखा, इसलिए हम इसे निश्चित नहीं मानते।",
    },
  },
  {
    key: "amrit-snan-1",
    date: "2027-08-02",
    kind: "amrit-snan",
    confidence: "provisional",
    title: { en: "First Amrit Snan", hi: "प्रथम अमृत स्नान" },
    tithi: { en: "Ashadha Somvati Amavasya", hi: "आषाढ़ सोमवती अमावस्या" },
    place: {
      en: "Ram Kund, Nashik and Kushavarta, Trimbakeshwar",
      hi: "रामकुंड, नासिक तथा कुशावर्त, त्र्यंबकेश्वर",
    },
    note: {
      en: "An amavasya falling on a Monday, which is what somvati names. The first of the days on which the akhadas bathe in procession.",
      hi: "सोमवार को पड़ने वाली अमावस्या, सोमवती का यही अर्थ है। अखाड़ों के शोभायात्रा-सहित स्नान का यह पहला दिन है।",
    },
  },
  {
    key: "amrit-snan-2",
    date: "2027-08-31",
    kind: "amrit-snan",
    confidence: "provisional",
    title: { en: "Second Amrit Snan", hi: "द्वितीय अमृत स्नान" },
    tithi: { en: "Shravana Amavasya", hi: "श्रावण अमावस्या" },
    place: {
      en: "Ram Kund, Nashik and Kushavarta, Trimbakeshwar",
      hi: "रामकुंड, नासिक तथा कुशावर्त, त्र्यंबकेश्वर",
    },
    note: {
      en: "Reported in most published schedules as the heaviest day of the mela. Also written as Mahakumbhasnan.",
      hi: "प्रकाशित अधिकांश कार्यक्रमों में इसे मेले का सर्वाधिक भीड़भाड़ वाला दिन बताया गया है। इसे महाकुंभस्नान भी लिखा जाता है।",
    },
  },
  {
    key: "amrit-snan-3a",
    date: "2027-09-11",
    kind: "amrit-snan",
    confidence: "provisional",
    title: { en: "Third Amrit Snan, Nashik", hi: "तृतीय अमृत स्नान, नासिक" },
    tithi: { en: "Bhadrapada Shukla Ekadashi", hi: "भाद्रपद शुक्ल एकादशी" },
    place: { en: "Ram Kund, Nashik", hi: "रामकुंड, नासिक" },
    note: {
      en: "The published schedules put the Vaishnava akhadas at Ram Kund on this day.",
      hi: "प्रकाशित कार्यक्रमों के अनुसार इस दिन वैष्णव अखाड़े रामकुंड पर स्नान करते हैं।",
    },
  },
  {
    key: "amrit-snan-3b",
    date: "2027-09-12",
    kind: "amrit-snan",
    confidence: "provisional",
    title: {
      en: "Third Amrit Snan, Trimbakeshwar",
      hi: "तृतीय अमृत स्नान, त्र्यंबकेश्वर",
    },
    tithi: { en: "Bhadrapada Shukla Dwadashi", hi: "भाद्रपद शुक्ल द्वादशी" },
    place: { en: "Kushavarta, Trimbakeshwar", hi: "कुशावर्त, त्र्यंबकेश्वर" },
    note: {
      en: "And the Shaiva akhadas at Kushavarta on the following day. The split between the two places is the settlement of 1789, described below.",
      hi: "और अगले दिन शैव अखाड़े कुशावर्त पर। दोनों स्थानों का यह विभाजन सन् १७८९ के निर्णय से चला आ रहा है, जिसका वर्णन नीचे है।",
    },
  },
  {
    key: "avarohan",
    date: "2028-07-24",
    kind: "avarohan",
    confidence: "provisional",
    title: { en: "Dhwaja avarohan", hi: "ध्वज अवरोहण" },
    tithi: {
      en: "Not stated in the sources we have read",
      hi: "जो स्रोत हमने पढ़े, उनमें तिथि नहीं दी गई",
    },
    place: {
      en: "Ram Kund, Nashik; Trimbakeshwar",
      hi: "रामकुंड, नासिक; त्र्यंबकेश्वर",
    },
    note: {
      en: "The flag comes down and the mela period closes. Most published schedules give 2028; at least one summary gives 2027. We print 2028 and mark it provisional rather than choose silently.",
      hi: "ध्वज उतरता है और मेला-काल समाप्त होता है। अधिकांश प्रकाशित कार्यक्रम २०२८ बताते हैं; कम से कम एक सारांश २०२७ कहता है। हम २०२८ छापते हैं और उसे चुपचाप तय करने के बजाय अनंतिम अंकित करते हैं।",
    },
  },
];

/** The months the calendar plates are drawn for: the opening and the two peak months. */
export const KUMBH_MONTHS: readonly {
  readonly year: number;
  readonly month: number;
}[] = [
  { year: 2026, month: 10 },
  { year: 2027, month: 8 },
  { year: 2027, month: 9 },
];

/* --- sources ------------------------------------------------------------- */

export type SourceEntry = {
  readonly key: string;
  readonly href: string;
  readonly label: Bilingual;
  readonly note: Bilingual;
};

export const KUMBH_SOURCES: readonly SourceEntry[] = [
  {
    key: "ntkma",
    href: "https://divcomnashik.maharashtra.gov.in/en/about-nashik-trimbakeshwar-authority/",
    label: {
      en: "Nashik-Trimbakeshwar Kumbh Mela Authority, Divisional Commissioner, Nashik",
      hi: "नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण, विभागीय आयुक्त कार्यालय, नासिक",
    },
    note: {
      en: "The body constituted by the Government of Maharashtra to run the mela. The page names its mandate and its members.",
      hi: "महाराष्ट्र शासन द्वारा मेले के संचालन हेतु गठित निकाय। पृष्ठ पर उसका कार्यक्षेत्र और सदस्य दिए गए हैं।",
    },
  },
  {
    key: "simhastha-2027",
    href: "https://divcomnashik.maharashtra.gov.in/en/simhastha-kumbh-mela-2027/",
    label: {
      en: "Simhastha Kumbh Mela 2027, Divisional Commissioner, Nashik",
      hi: "सिंहस्थ कुंभ मेला २०२७, विभागीय आयुक्त कार्यालय, नासिक",
    },
    note: {
      en: "The administration's own page for the 2027 mela.",
      hi: "प्रशासन का अपना पृष्ठ, २०२७ के मेले के लिए।",
    },
  },
  {
    key: "wikipedia",
    href: "https://en.wikipedia.org/wiki/Nashik-Trimbakeshwar_Simhastha",
    label: {
      en: "Nashik-Trimbakeshwar Simhastha, English Wikipedia",
      hi: "नासिक-त्र्यंबकेश्वर सिंहस्थ, अंग्रेज़ी विकिपीडिया",
    },
    note: {
      en: "The astronomical rule, the 1789 dispute and its settlement, and the record of the 2003 crush. Cited for the history rather than for the dates.",
      hi: "ज्योतिषीय नियम, सन् १७८९ का विवाद और उसका निर्णय, तथा २००३ की भगदड़ का विवरण। यहाँ इतिहास के लिए उद्धृत, तिथियों के लिए नहीं।",
    },
  },
  {
    key: "schedule-press",
    href: "https://www.deccanchronicle.com/nation/nashik-kumbh-mela-2027-to-begin-with-flag-hoisting-on-october-31-2026-1882836",
    label: {
      en: "Press report of the schedule release, Deccan Chronicle",
      hi: "कार्यक्रम-विमोचन का समाचार, डेक्कन क्रॉनिकल",
    },
    note: {
      en: "Where the dhwajarohan date and the three Amrit Snan dates on this page come from. It reports the release; it is not the release.",
      hi: "इस पृष्ठ की ध्वजारोहण-तिथि और तीनों अमृत स्नान तिथियाँ यहीं से ली गई हैं। यह विमोचन का समाचार है, स्वयं विमोचन नहीं।",
    },
  },
];

/* --- copy ---------------------------------------------------------------- */

type Para = string;
type Row = { key: string; q: string; a: string };

type KumbhCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    kicker: string;
    standfirst: string;
    lede: string;
  };
  provenance: { badge: string; badgeShort: string; line: string };
  facts: {
    label: string;
    rows: { key: string; term: string; value: string }[];
  };
  what: {
    eyebrow: string;
    title: string;
    paras: Para[];
    noteLabel: string;
    note: string;
  };
  place: { eyebrow: string; title: string; paras: Para[] };
  river: { eyebrow: string; title: string; paras: Para[] };
  calendar: {
    eyebrow: string;
    title: string;
    lede: string;
    columns: {
      date: string;
      day: string;
      occasion: string;
      tithi: string;
      place: string;
    };
    kinds: Record<ScheduleKind, string>;
    weekdaysShort: string[];
    weekdaysLong: string[];
    months: string[];
    /* Only the two marks a plate can actually carry. The closing falls in July
       2028, which is not one of the months plated, so it has no legend line. */
    legend: { amrit: string; open: string };
    amritNote: string;
    plateCaption: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    lede: string;
    permitLabel: string;
    permitStatus: string;
    permitBody: string;
    authorityLabel: string;
    authority: string;
    cannotTitle: string;
    cannot: string[];
    canTitle: string;
    can: string[];
    closing: string;
  };
  attend: {
    eyebrow: string;
    title: string;
    lede: string;
    rows: Row[];
    closing: string;
  };
  register: {
    eyebrow: string;
    title: string;
    body: string;
    doesTitle: string;
    does: string[];
    notTitle: string;
    not: string[];
    mailLabel: string;
    mailSubject: string;
  };
  sources: {
    eyebrow: string;
    title: string;
    lede: string;
    unverifiedTitle: string;
    unverified: string[];
  };
  onward: {
    eyebrow: string;
    title: string;
    links: { key: string; label: string; note: string }[];
  };
};

export const kumbhContent = {
  en: {
    meta: {
      title: "Simhastha Kumbh 2027, Nashik and Trimbakeshwar | Snanify",
      description:
        "What the Simhastha Kumbh is, why it is kept at Nashik and Trimbakeshwar, the bathing days published for 2027 at Ram Kund and Kushavarta, and what can and cannot honestly be arranged at a mela of that size.",
    },
    hero: {
      eyebrow: "Reference",
      title: "The Simhastha Kumbh",
      kicker: "Nashik and Trimbakeshwar, on the Godavari",
      standfirst:
        "Opens 31 October 2026. Bathing days in August and September 2027.",
      lede: "What a Simhastha is and how it is reckoned, why it is kept here, what the Godavari is at Nashik, when the published bathing days fall, and what a business like ours can honestly do at a gathering that size. Every date is provisional and labelled so.",
    },
    provenance: {
      badge: "Provisional · to be confirmed against a named source",
      badgeShort: "Provisional",
      line: "Every date here is taken from press reporting of the schedule release and from published guides, rather than from the Government of Maharashtra's own notification, and no panchang provider has been named on this site. Tithi based dates remain subject to confirmation by the mela committee. When a source is named and checked here, these labels change and this sentence changes with them.",
    },
    facts: {
      label: "The standing entry",
      rows: [
        {
          key: "mela",
          term: "Mela",
          value: "Simhastha Kumbh, Nashik and Trimbakeshwar",
        },
        {
          key: "reckoning",
          term: "Reckoned by",
          value:
            "Jupiter resident in Simha, the lion. About twelve years between one and the next.",
        },
        { key: "river", term: "River", value: "Godavari, invoked as Gautami" },
        {
          key: "places",
          term: "Bathing places",
          value: "Ram Kund, Panchavati, Nashik. Kushavarta, Trimbakeshwar.",
        },
        { key: "opens", term: "Opens", value: "31 October 2026, dhwajarohan" },
        {
          key: "peak",
          term: "Bathing days",
          value: "2 and 31 August, 11 and 12 September 2027",
        },
        {
          key: "closes",
          term: "Closes",
          value: "24 July 2028, dhwaja avarohan",
        },
        {
          key: "authority",
          term: "Authority",
          value:
            "Nashik-Trimbakeshwar Kumbh Mela Authority, Government of Maharashtra",
        },
        { key: "permit", term: "Our permit", value: "None held" },
      ],
    },
    what: {
      eyebrow: "The reckoning",
      title: "What a Simhastha is.",
      paras: [
        "The Kumbh is not one fair. It is a cycle of them, kept at four places on four rivers, each falling when the sun, the moon and Jupiter stand in a stated relation. Jupiter takes close to twelve of our years to travel once round the zodiac, and that circuit sets the interval between one mela at a given place and the next.",
        "Nashik's is called the Simhastha, from simha, the lion, the sign that Latin names Leo. It is kept while Jupiter is resident in that sign. A second rule is also stated for this mela, that it falls when Jupiter, the sun and the moon stand together in Karka at the lunar conjunction. The two rules do not always point at the same fortnight, and where they part the matter is settled by the assembly of akhadas together with the mela authority rather than by a calculation. The dates further down this page are the ones they have published.",
        "Ujjain keeps a Simhastha of its own, reckoned on the sun's position as well as Jupiter's, which is why the two fall near each other without being the same event. Because Jupiter's year is not exactly twelve of ours, the gap between one Nashik Simhastha and the next is near twelve years rather than exactly twelve, and the arithmetic is done afresh each cycle.",
        "In practice the mela is a period rather than a day: months of ascetic encampment, the akhadas arriving in their agreed order, ordinary bathing every morning as the rest of the year, and a small number of days on which the akhadas bathe in procession. Those are the Amrit Snan days, which older accounts and much of the press still call Shahi Snan.",
      ],
      noteLabel: "On the twelve years",
      note: "We state the interval because it is astronomy, and astronomy belongs in a calendar. There is no countdown on this page, no seat count, and no notice that a day will not return. If a rite here is ever sold, the price will be the same as on any ordinary morning.",
    },
    place: {
      eyebrow: "The place",
      title: "Why Nashik, and why Ram Kund.",
      paras: [
        "Ram Kund lies in Panchavati, the quarter of Nashik held to be where Rama passed part of his exile. Tradition holds that Rama and Sita bathed at this kund, and that Rama performed his father Dasharatha's shraddha here. It is on that account that Ram Kund is Nashik's asthi visarjan tirth: ashes are given to this water, and the kund is held to receive them. The stonework as it now stands is reported to date from 1696 and to have been repaired under the Peshwas. We have not seen that record ourselves and we state it as it is reported, not as a fact we have checked.",
        "The mela has two centres rather than one, and the reason is a quarrel. Until the late eighteenth century it was kept at Trimbak, upstream, at the Kushavarta kund beside the Trimbakeshwar temple. In 1789 a dispute over the order of bathing between Shaiva sanyasis and Vaishnava bairagis ended in killing on a scale that a surviving copperplate puts at twelve thousand ascetics. The Peshwa's settlement afterwards moved the Vaishnava bathing place down to Ram Kund at Nashik and left Kushavarta to the Shaiva akhadas.",
        "That settlement is why a Simhastha today is held at two places about forty five kilometres apart, why the mela is properly named for both towns, and why the September bathing days are split between them: the Vaishnava akhadas at Ram Kund on the eleventh, the Shaiva akhadas at Kushavarta on the twelfth. It is also worth saying plainly that the arrangement was arrived at after a massacre. It is a peace, not a symmetry.",
        "The last thing to know about Ram Kund is the most ordinary. It is a working ghat every day of the year before it is a mela site. Shraddha and tarpan go on there through the year and heavily through Pitru Paksha, families come to give their dead to the water on days that have nothing to do with any calendar, and the ghat is under the Nashik Municipal Corporation. During the Simhastha all of that continues underneath, while the mela is laid over the top of it.",
      ],
    },
    river: {
      eyebrow: "The water",
      title: "Why the Godavari.",
      paras: [
        "The Godavari rises at Brahmagiri, the hill above Trimbakeshwar, a short way upstream of Nashik. Her older name is Gautami, from the sage Gautama; the account is that he brought her down through Shiva's intercession, in expiation of a cow's death, and Gautami is the name still used when she is invoked. She is the longest river of the peninsula and the one by which the Deccan reckons its tirthas. She carries her own account and her own names, and this page describes her by them rather than by another river's.",
        "Because the source is so close, the water at Ram Kund is a young river rather than a broad one, and the kund is cut into stone so that it holds water even when the river runs low. That is why the ghat is usable through the dry months, and it is part of why the rites that belong here belong here.",
        "The 2027 bathing days fall in Shravana and Bhadrapada, which is late monsoon. The Godavari at Nashik runs high in August and September, and how much water stands at the kund depends on what is released from the Gangapur dam upstream. The steps can go under. For anyone planning to be there in person this matters more than anything else on this page, and it is why the administration closes the kund at short notice on a heavy day.",
      ],
    },
    calendar: {
      eyebrow: "The calendar",
      title: "The published days.",
      lede: "As released by the Government of Maharashtra and reported in the press. Every line is provisional, and no time of day is given for any bathing day because we have not sourced a panchang we are willing to name.",
      columns: {
        date: "Date",
        day: "Day",
        occasion: "Occasion",
        tithi: "Tithi",
        place: "Place",
      },
      kinds: {
        dhwajarohan: "Opening",
        "amrit-snan": "Amrit Snan",
        avarohan: "Closing",
      },
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysLong: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      legend: {
        amrit: "Amrit Snan",
        open: "Dhwajarohan, the opening",
      },
      amritNote:
        "Amrit Snan is the term the mela administration now uses for what older accounts still call Shahi Snan. On those mornings the ghats are given over to the akhadas in an agreed order for stated hours, and everyone else bathes outside them. The mela runs for well over six hundred days; five of them are in this table.",
      plateCaption: "Marked days only. Ordinary bathing goes on every morning.",
    },
    offer: {
      eyebrow: "The honest part",
      title: "What this site does at a mela, and what it does not.",
      lede: "A mela is not a quiet dawn at a working ghat. Most of what a company would want to promise about one cannot be promised.",
      permitLabel: "Our presence at Ram Kund",
      permitStatus: "None. We are not there.",
      permitBody:
        "Snanify holds no permission at Ram Kund and needs none, because it does nothing there. During a Simhastha the ghats fall under the mela authority alongside the municipal corporation and the police, and the bathing mornings are settled between them and the akhada council. That is worth knowing if you are going in person. It has no bearing on this site, which reads the Godavari's measured state from a public source and shows it to you.",
      authorityLabel: "Who controls the ghats during the mela",
      authority:
        "The Nashik-Trimbakeshwar Kumbh Mela Authority, constituted by the Government of Maharashtra and sitting under the Divisional Commissioner, Nashik, with the Nashik Municipal Corporation, the Trimbakeshwar temple trust, the police, and the akhada council. Permission at these places is not a municipal formality: the bodies that hold it are trusts, samitis and hereditary purohit families, whose consent is a different thing from a licence.",
      cannotTitle: "What you will not find here",
      cannot: [
        "A camera on the kund steps, or anywhere else. Snanify films nothing, and there is no footage in this product.",
        "A rite, at Ram Kund or at any of the six waters. Nobody stands in the water in your name, during a Simhastha or on an ordinary Tuesday.",
        "A claim that a morning inside the mela carries more than a morning outside it. The reading is the reading, and the sankalp is yours either way.",
        "A claim of association with an akhada, a math, the mela authority or the purohit bodies at the ghat. If one of them ever signs a dated letter, we publish it, and they stay free to withdraw it.",
      ],
      canTitle: "What is here, on every morning of the mela",
      can: [
        "The Godavari's measured state at Ram Kund, read during the Simhastha from the same public source as on any other day.",
        "The mela's own calendar: every bathing day, how each is reckoned, and which of them are settled between the authority and the akhadas rather than derived.",
        "Your own sankalp, at an hour the panchang names, wherever in the world you are.",
      ],
      closing:
        "A Simhastha changes the Godavari, the crowd and the calendar. It changes nothing about how this site reads the river, and reading it from a public record is the whole reason for that.",
    },

    attend: {
      eyebrow: "If you are going",
      title: "For someone travelling to Nashik.",
      lede: "This site exists for people who cannot go. It has never had a word to say against going, and the rest of this section is written for someone who is.",
      rows: [
        {
          key: "two-centres",
          q: "It is two places, not one",
          a: "Nashik and Trimbakeshwar are about forty five kilometres apart, and on the September dates they hold different bathing days. Plan a day for one or the other, not both. Road time between them on a peak day bears no relation to an ordinary one.",
        },
        {
          key: "peak-days",
          q: "The bathing days are the hardest days",
          a: "On an Amrit Snan the ghats are given to the akhada processions for stated hours and everyone else bathes around them. The days on either side are far easier and the water is the same water. If your reason for going is the river rather than the procession, consider deliberately avoiding the peak day.",
        },
        {
          key: "crowd",
          q: "Crowd risk is real, and worth planning for",
          a: "Thirty nine people were killed in a crush at Ram Kund during the 2003 Simhastha. Melas since have been run with far more control and money, and the 2027 administration has been planning crowd management for years. Still, the honest planning assumption at a bathing ghat on a peak morning is dense standing crowd, movement in one direction only, and no way back the way you came. Agree a meeting point away from the ghat, keep children within arm's reach, and carry nothing into the water you cannot afford to lose.",
        },
        {
          key: "passes",
          q: "Registration, passes and the official channels",
          a: "As of August 2026 the Maharashtra government had not launched a general e-pass or pilgrim registration, and indicated the portal would follow closer to the flag hoisting. Check the mela authority's own channels rather than a travel site, ours included. The contact published at the time of writing is kumbhmela.2027@mah.gov.in and 0253 2461909. We list it because it is a government office, and we hold no relationship with it.",
        },
        {
          key: "river",
          q: "The river in August and September",
          a: "Late monsoon. The Godavari runs high and the water standing at Ram Kund depends on release from the Gangapur dam upstream. The steps can be submerged, and the administration closes the kund at short notice when they are. Build a spare day into any trip with a specific morning in it.",
        },
        {
          key: "pitru",
          q: "If you are going for asthi visarjan or shraddha",
          a: "Ram Kund does this work all year, through the purohits at the ghat. Ask your own family purohit first about what applies to you, because eligibility and order vary by community and region. If you have a choice of dates, the Simhastha weeks are the worst of them.",
        },
        {
          key: "staying",
          q: "Where people stay",
          a: "The state builds a sadhugram, a tent settlement for the akhadas and the ascetics who come with them. It is not general accommodation. Nashik's own rooms are finite and go early around the bathing days, and many visitors travel in for the morning and leave the same day.",
        },
        {
          key: "around",
          q: "What else is there, and why to arrive early",
          a: "Kapaleshwar temple stands above the kund, Sita Gufa is a short walk into Panchavati, and Trimbakeshwar holds the jyotirlinga, the Kushavarta kund and the climb up Brahmagiri to where the river rises. None of it is seeable on a peak morning and all of it on an ordinary one, which is the argument for arriving a few days ahead.",
        },
      ],
      closing:
        "Never a word against making the journey yourself. If you can go, go, and this page has done its job if it helped you go better prepared than you would have been.",
    },
    register: {
      eyebrow: "The register",
      title: "There is nothing to buy here.",
      body: "Booking is not open. No permission has been granted at Ram Kund and no price for a rite during the Simhastha has been set, and until both are true there is nothing here that could honestly take your money. What you can do is leave your name and be told, once, when the position changes.",
      doesTitle: "What leaving your name does",
      does: [
        "One message when we have an answer about Ram Kund, whether that answer is yes or no.",
        "One message if and when dates and prices are settled.",
        "Nothing else.",
      ],
      notTitle: "What it does not do",
      not: [
        "It does not hold a place. There are no places, and there will be no counter on this page telling you how many are left.",
        "It does not put you in a queue and there is no number attached to you.",
        "It does not quote you a price or commit you to one.",
        "It does not start a mailing list, a reminder series, or a message on any anniversary.",
        "One reply saying stop, and it stops, permanently, without a question asked back.",
      ],
      mailLabel: "Write to us and we will add you to the register",
      mailSubject: "Simhastha 2027, register of interest",
    },
    sources: {
      eyebrow: "Provenance",
      title: "Where this came from, and what we could not check.",
      lede: "The history on this page is either a matter of public record or a tradition described as a tradition. The dates are secondary reporting. Both are listed here so you can go past us.",
      unverifiedTitle: "What we could not verify",
      unverified: [
        "The Government of Maharashtra's own notification of the schedule. We have not read it. Every date on this page comes from press reporting of it and from published guides.",
        "The tithi attributed to each bathing day. Those are as published in the guides. No panchang provider has been named on this site, and no time of day is stated here for any bathing day.",
        "The dhwajarohan muhurat of 12:02 in the afternoon. It appears in secondary guides only.",
        "The closing date. Most sources give 24 July 2028; at least one summary gives 2027. We print 2028, marked provisional.",
        "The 1696 date for the present stonework at Ram Kund, and the attribution of its repair to the Peshwa family. Widely repeated, not checked by us against a record.",
        "The projection of fifteen to twenty crore attendance. It is an administrative estimate made before the event, not a measurement, and we do not use it for anything.",
        "Any relationship with the mela authority, with any akhada, with the purohit bodies at Ram Kund, or with the Nashik Municipal Corporation. We hold none of these.",
      ],
    },
    onward: {
      eyebrow: "Onward",
      title: "Read next.",
      links: [
        {
          key: "river",
          label: "Godavari at Ram Kund",
          note: "The water itself, the rites that belong there, and who governs the ghat.",
        },
        {
          key: "muhurat",
          label: "The muhurat calendar",
          note: "How days are reckoned here, and why every timing is marked provisional.",
        },
        {
          key: "ethics",
          label: "Ethics and rites",
          note: "The claims we will never make, in full, including the ones a mela invites.",
        },
      ],
    },
  },

  hi: {
    meta: {
      title: "सिंहस्थ कुंभ २०२७, नासिक एवं त्र्यंबकेश्वर | स्नानिफ़ाई",
      description:
        "सिंहस्थ कुंभ क्या है, वह नासिक और त्र्यंबकेश्वर में ही क्यों होता है, रामकुंड तथा कुशावर्त के लिए २०२७ की प्रकाशित स्नान-तिथियाँ, और इतने बड़े मेले में ईमानदारी से क्या किया जा सकता है और क्या नहीं।",
    },
    hero: {
      eyebrow: "संदर्भ",
      title: "सिंहस्थ कुंभ",
      kicker: "नासिक एवं त्र्यंबकेश्वर, गोदावरी तट पर",
      standfirst: "आरंभ ३१ अक्टूबर २०२६। स्नान-दिवस अगस्त और सितंबर २०२७ में।",
      lede: "सिंहस्थ क्या है और उसकी गणना कैसे होती है, वह यहीं क्यों होता है, नासिक में गोदावरी का क्या रूप है, प्रकाशित स्नान-तिथियाँ कब पड़ती हैं, और इतने बड़े समागम में हम जैसा उपक्रम ईमानदारी से क्या कर सकता है और क्या नहीं। इस पृष्ठ की हर तिथि अनंतिम है और वैसी ही अंकित है।",
    },
    provenance: {
      badge: "अनंतिम · नामित स्रोत से पुष्टि होना शेष",
      badgeShort: "अनंतिम",
      line: "महाराष्ट्र शासन की अपनी अधिसूचना हमने नहीं पढ़ी है। यहाँ दी गई हर तिथि कार्यक्रम-विमोचन के समाचारों और प्रकाशित मार्गदर्शिकाओं से ली गई है, और इस साइट पर अभी किसी पंचांग-स्रोत का नाम नहीं दिया गया है। विशेष रूप से तिथि-आधारित दिनांक मेला समिति की पुष्टि के अधीन हैं। जब स्रोत नामित होगा और यहाँ किसी व्यक्ति ने उसे जाँच लिया होगा, तब ये अंकन बदलेंगे और उनके साथ यह वाक्य भी।",
    },
    facts: {
      label: "स्थायी प्रविष्टि",
      rows: [
        {
          key: "mela",
          term: "मेला",
          value: "सिंहस्थ कुंभ, नासिक एवं त्र्यंबकेश्वर",
        },
        {
          key: "reckoning",
          term: "गणना",
          value:
            "बृहस्पति का सिंह राशि में निवास। एक से दूसरे के बीच लगभग बारह वर्ष।",
        },
        { key: "river", term: "नदी", value: "गोदावरी, आवाहन में गौतमी" },
        {
          key: "places",
          term: "स्नान-स्थल",
          value: "रामकुंड, पंचवटी, नासिक। कुशावर्त, त्र्यंबकेश्वर।",
        },
        { key: "opens", term: "आरंभ", value: "३१ अक्टूबर २०२६, ध्वजारोहण" },
        {
          key: "peak",
          term: "स्नान-दिवस",
          value: "२ एवं ३१ अगस्त, ११ एवं १२ सितंबर २०२७",
        },
        { key: "closes", term: "समापन", value: "२४ जुलाई २०२८, ध्वज अवरोहण" },
        {
          key: "authority",
          term: "प्राधिकरण",
          value: "नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण, महाराष्ट्र शासन",
        },
        { key: "permit", term: "हमारी अनुमति", value: "कोई नहीं" },
      ],
    },
    what: {
      eyebrow: "गणना",
      title: "सिंहस्थ क्या है।",
      paras: [
        "कुंभ कोई एक मेला नहीं है। वह मेलों का एक चक्र है, चार स्थानों पर चार नदियों के तट पर, और हर एक तब पड़ता है जब सूर्य, चंद्र और बृहस्पति परस्पर एक निश्चित संबंध में आते हैं। बृहस्पति को राशिचक्र की एक परिक्रमा में हमारे लगभग बारह वर्ष लगते हैं, और वही परिक्रमा किसी एक स्थान के दो मेलों के बीच का अंतराल तय करती है।",
        "नासिक का मेला सिंहस्थ कहलाता है, सिंह से, उसी राशि से जिसे लैटिन में लियो कहते हैं। वह तब होता है जब बृहस्पति उस राशि में निवास करते हैं। इस मेले के लिए एक दूसरा नियम भी कहा जाता है, कि वह तब पड़ता है जब अमावस्या के योग में बृहस्पति, सूर्य और चंद्र कर्क राशि में एक साथ हों। दोनों नियम सदैव एक ही पक्ष की ओर संकेत नहीं करते, और जहाँ वे अलग होते हैं वहाँ निर्णय किसी गणना से नहीं, अखाड़ा परिषद और मेला प्राधिकरण के परस्पर विचार से होता है। इस पृष्ठ पर आगे दी गई तिथियाँ वही हैं जो उन्होंने प्रकाशित की हैं।",
        "उज्जैन का अपना सिंहस्थ है, जिसकी गणना में बृहस्पति के साथ सूर्य की स्थिति भी ली जाती है। इसी कारण दोनों निकट-निकट पड़ते हैं, पर एक ही आयोजन नहीं हैं। और चूँकि बृहस्पति का वर्ष ठीक हमारे बारह वर्षों के बराबर नहीं है, नासिक के एक सिंहस्थ से अगले तक का अंतर ठीक बारह वर्ष नहीं, बारह के आसपास होता है, और हर चक्र में गणना नए सिरे से की जाती है।",
        "व्यवहार में यह मेला एक दिन नहीं, एक काल है। महीनों का साधु-निवास, अखाड़ों का तय क्रम से आगमन, हर सुबह वैसा ही सामान्य स्नान जैसा शेष वर्ष चलता है, और उनके बीच कुछ ही दिन ऐसे जिन पर अखाड़े शोभायात्रा के साथ स्नान करते हैं। वही अमृत स्नान के दिन हैं। पुराने विवरणों में और बहुत-से समाचारों में उन्हें आज भी शाही स्नान कहा जाता है।",
      ],
      noteLabel: "बारह वर्षों के विषय में",
      note: "हम यह अंतराल इसलिए बताते हैं कि वह खगोल है, और खगोल का स्थान पंचांग में है। हम उससे आपको जल्दी में नहीं डालेंगे। इस पृष्ठ पर न कोई उलटी गिनती है, न स्थानों की संख्या, न यह सूचना कि कोई दिन फिर नहीं आएगा, और न आगे होगी। यदि यहाँ कभी कोई कर्म बेचा गया, तो उसका मूल्य किसी साधारण सुबह जितना ही होगा।",
    },
    place: {
      eyebrow: "स्थान",
      title: "नासिक ही क्यों, और रामकुंड ही क्यों।",
      paras: [
        "रामकुंड पंचवटी में है, नासिक का वह भाग जो राम के वनवास-काल से जुड़ा माना जाता है। परंपरा है कि राम और सीता ने इसी कुंड पर स्नान किया था, और राम ने यहीं अपने पिता दशरथ का श्राद्ध किया था। इसी कारण रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है: अस्थियाँ इसी जल को सौंपी जाती हैं, और माना जाता है कि कुंड उन्हें ग्रहण कर लेता है। आज जो पत्थर का निर्माण खड़ा है उसे सन् १६९६ का बताया जाता है और पेशवा-काल में उसका जीर्णोद्धार कहा जाता है। वह अभिलेख हमने स्वयं नहीं देखा, इसलिए हम इसे जाँचे हुए तथ्य की तरह नहीं, जैसा कहा जाता है वैसा ही रख रहे हैं।",
        "इस मेले के दो केंद्र हैं, एक नहीं, और उसका कारण एक विवाद है। अठारहवीं शताब्दी के अंत तक मेला ऊपर त्र्यंबक में ही होता था, त्र्यंबकेश्वर मंदिर के पास कुशावर्त कुंड पर। सन् १७८९ में स्नान के क्रम को लेकर शैव संन्यासियों और वैष्णव बैरागियों के बीच हुआ विवाद ऐसे संहार में बदला जिसे एक शेष बचे ताम्रपत्र में बारह हज़ार साधुओं की मृत्यु कहा गया है। उसके बाद पेशवा के निर्णय से वैष्णवों का स्नान-स्थल नीचे नासिक के रामकुंड पर कर दिया गया और कुशावर्त शैव अखाड़ों के पास रहा।",
        "उसी निर्णय के कारण आज सिंहस्थ लगभग पैंतालीस किलोमीटर दूर दो स्थानों पर होता है, मेले का नाम दोनों नगरों से जुड़ा है, और सितंबर के स्नान-दिवस उनमें बँटे हैं: ग्यारह को वैष्णव अखाड़े रामकुंड पर, बारह को शैव अखाड़े कुशावर्त पर। यह भी स्पष्ट कह देना चाहिए कि यह व्यवस्था एक नरसंहार के बाद बनी थी। यह संतुलन नहीं, संधि है।",
        "रामकुंड के बारे में अंतिम बात सबसे साधारण है। मेला-स्थल होने से पहले वह वर्ष के हर दिन का कार्यरत घाट है। वहाँ वर्ष भर श्राद्ध और तर्पण चलते हैं, पितृ पक्ष में विशेष रूप से, परिवार ऐसे दिनों पर भी अपने दिवंगतों को जल सौंपने आते हैं जिनका किसी पर्व-सूची से कोई संबंध नहीं, और घाट नासिक महानगरपालिका के अधीन है। सिंहस्थ के दिनों में यह सब नीचे यथावत चलता रहता है, और मेला उसके ऊपर बिछ जाता है।",
      ],
    },
    river: {
      eyebrow: "जल",
      title: "गोदावरी ही क्यों।",
      paras: [
        "गोदावरी का उद्गम ब्रह्मगिरि पर है, त्र्यंबकेश्वर के ऊपर की उसी पहाड़ी पर, नासिक से थोड़ा ही ऊपर। उनका प्राचीन नाम गौतमी है, ऋषि गौतम से; कथा है कि गो-हत्या के प्रायश्चित्त में उन्होंने शिव की कृपा से नदी को नीचे उतारा, और आवाहन में आज भी गौतमी नाम ही लिया जाता है। वे प्रायद्वीप की सबसे लंबी नदी हैं और दक्खन अपने तीर्थ उन्हीं से गिनता है। उनकी अपनी कथा है और अपने नाम हैं, और यह पृष्ठ उन्हें किसी दूसरी नदी से नहीं, उन्हीं नामों से बताता है।",
        "उद्गम इतना निकट होने के कारण रामकुंड का जल चौड़ी नहीं, नई नदी का जल है, और कुंड पत्थर में इस तरह कटा है कि नदी घट जाने पर भी उसमें जल ठहरा रहता है। इसी से घाट सूखे महीनों में भी उपयोग में रहता है, और यही एक कारण है कि जो कर्म यहाँ के हैं वे यहीं के हैं।",
        "२०२७ के स्नान-दिवस श्रावण और भाद्रपद में पड़ते हैं, अर्थात वर्षा के उत्तरार्ध में। अगस्त और सितंबर में नासिक के पास गोदावरी ऊँची चलती हैं, और किसी सुबह कुंड पर कितना जल ठहरेगा यह ऊपर गंगापुर बाँध से होने वाले विसर्ग पर निर्भर करता है। सीढ़ियाँ डूब सकती हैं। जो व्यक्ति स्वयं वहाँ जाने की सोच रहे हैं उनके लिए इस पृष्ठ पर इससे अधिक काम की बात कोई नहीं है, और इसी कारण भारी दिनों में स्थानीय प्रशासन कुंड को अल्प सूचना पर बंद कर देता है।",
      ],
    },
    calendar: {
      eyebrow: "पंचांग",
      title: "प्रकाशित दिन।",
      lede: "जैसा महाराष्ट्र शासन ने जारी किया और समाचारों में आया। हर पंक्ति अनंतिम है, और किसी भी स्नान-दिवस के लिए समय नहीं दिया गया है, क्योंकि हमने अब तक ऐसा कोई पंचांग नहीं लिया है जिसका नाम हम ले सकें।",
      columns: {
        date: "दिनांक",
        day: "वार",
        occasion: "अवसर",
        tithi: "तिथि",
        place: "स्थान",
      },
      kinds: {
        dhwajarohan: "आरंभ",
        "amrit-snan": "अमृत स्नान",
        avarohan: "समापन",
      },
      weekdaysShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
      weekdaysLong: [
        "रविवार",
        "सोमवार",
        "मंगलवार",
        "बुधवार",
        "गुरुवार",
        "शुक्रवार",
        "शनिवार",
      ],
      months: [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्त",
        "सितंबर",
        "अक्टूबर",
        "नवंबर",
        "दिसंबर",
      ],
      legend: {
        amrit: "अमृत स्नान",
        open: "ध्वजारोहण, आरंभ",
      },
      amritNote:
        "अमृत स्नान वही है जिसे पुराने विवरण और बहुत-से समाचार आज भी शाही स्नान कहते हैं; मेला प्रशासन अब यही शब्द प्रयोग करता है। उन सुबहों में घाट तय क्रम से और तय घंटों के लिए अखाड़ों को सौंप दिए जाते हैं, और शेष सब लोग उनके बाहर स्नान करते हैं। मेला छह सौ से अधिक दिनों तक चलता है; इस तालिका में उनमें से पाँच हैं।",
      plateCaption: "केवल अंकित दिन। सामान्य स्नान हर सुबह चलता रहता है।",
    },
    offer: {
      eyebrow: "स्पष्ट बात",
      title: "मेले में यह साइट क्या करती है, और क्या नहीं।",
      lede: "मेला किसी कार्यरत घाट की शांत भोर नहीं होता। उसके विषय में कोई उपक्रम जो-जो वचन देना चाहेगा, उनमें से अधिकांश दिए ही नहीं जा सकते।",
      permitLabel: "रामकुंड पर हमारी उपस्थिति",
      permitStatus: "कोई नहीं। हम वहाँ हैं ही नहीं।",
      permitBody:
        "रामकुंड पर स्नानिफ़ाई के पास कोई अनुमति नहीं है, और आवश्यकता भी नहीं, क्योंकि वहाँ वह कुछ करती ही नहीं। सिंहस्थ के दिनों में घाट महानगरपालिका और पुलिस के साथ-साथ मेला प्राधिकरण के अधीन आ जाते हैं, और स्नान की सुबहें उनके तथा अखाड़ा परिषद के बीच तय होती हैं। स्वयं जाने वालों के लिए यह जानना उपयोगी है। इस साइट पर इसका कोई प्रभाव नहीं, जो गोदावरी की मापी हुई अवस्था एक सार्वजनिक स्रोत से पढ़कर आपको दिखाती है।",
      authorityLabel: "मेले के दिनों में घाट किसके नियंत्रण में",
      authority:
        "नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण, जो महाराष्ट्र शासन द्वारा गठित है और विभागीय आयुक्त, नासिक के अधीन बैठता है; उसके साथ नासिक महानगरपालिका, त्र्यंबकेश्वर देवस्थान न्यास, पुलिस और अखाड़ा परिषद। इन स्थानों पर अनुमति कोई नगरपालिका औपचारिकता नहीं है; जिनके पास वह है वे न्यास, समितियाँ और परंपरागत पुरोहित-परिवार हैं, और उनकी सहमति किसी लाइसेंस से भिन्न वस्तु है।",
      cannotTitle: "यहाँ जो आपको नहीं मिलेगा",
      cannot: [
        "कुंड की सीढ़ियों पर, या कहीं भी, कैमरा। स्नानिफ़ाई कुछ भी फ़िल्म नहीं करती, और इस उत्पाद में कोई दृश्य-सामग्री नहीं है।",
        "कोई अनुष्ठान, रामकुंड पर अथवा छह में से किसी भी जल पर। आपके नाम से जल में कोई नहीं उतरता, न सिंहस्थ में, न किसी साधारण मंगलवार को।",
        "यह दावा कि मेले के भीतर की सुबह उसके बाहर की सुबह से अधिक है। पाठ वही पाठ है, और संकल्प दोनों दिन आपका ही है।",
        "किसी अखाड़े, मठ, मेला प्राधिकरण या घाट के पुरोहित-निकाय से संबंध का कोई दावा। यदि उनमें से कोई कभी दिनांकित पत्र पर हस्ताक्षर करेगा, तो हम उसे प्रकाशित करेंगे, और वे जब चाहें उसे वापस ले सकेंगे।",
      ],
      canTitle: "मेले की हर सुबह यहाँ जो है",
      can: [
        "रामकुंड पर गोदावरी की मापी हुई अवस्था, सिंहस्थ में उसी सार्वजनिक स्रोत से पढ़ी हुई जिससे किसी भी और दिन।",
        "मेले का अपना पंचांग: हर स्नान-दिवस, उसका निर्धारण कैसे होता है, और उनमें से कौन-से प्राधिकरण तथा अखाड़ों के बीच तय होते हैं, गणना से नहीं।",
        "आपका अपना संकल्प, पंचांग की बताई घड़ी में, आप संसार में कहीं भी हों।",
      ],
      closing:
        "सिंहस्थ गोदावरी को, भीड़ को और पंचांग को बदलता है। यह साइट नदी को जिस तरह पढ़ती है, उसे वह नहीं बदलता, और सार्वजनिक अभिलेख से पढ़ने का पूरा अर्थ ही यही है।",
    },

    attend: {
      eyebrow: "यदि आप जा रहे हैं",
      title: "नासिक की यात्रा करने वालों के लिए।",
      lede: "यह साइट उनके लिए है जो जा नहीं सकते। जाने के विरुद्ध इसने कभी एक शब्द नहीं कहा, और यह पूरा खंड उन्हीं के लिए लिखा गया है जो जा रहे हैं।",
      rows: [
        {
          key: "two-centres",
          q: "यह दो स्थान हैं, एक नहीं",
          a: "नासिक और त्र्यंबकेश्वर के बीच लगभग पैंतालीस किलोमीटर हैं, और सितंबर की तिथियों में दोनों के स्नान-दिवस अलग-अलग हैं। एक दिन में एक ही चुनें, दोनों नहीं। भीड़ वाले दिन दोनों के बीच लगने वाले समय का साधारण दिनों से कोई संबंध नहीं रहता।",
        },
        {
          key: "peak-days",
          q: "स्नान-दिवस ही सबसे कठिन दिन हैं",
          a: "अमृत स्नान पर घाट तय घंटों के लिए अखाड़ों की शोभायात्रा को सौंप दिए जाते हैं और शेष सब लोग उनके आसपास स्नान करते हैं। आगे-पीछे के दिन कहीं सरल हैं और जल वही जल है। यदि आपका प्रयोजन नदी है, शोभायात्रा नहीं, तो भीड़ वाले दिन जान-बूझकर न जाने पर विचार कीजिए।",
        },
        {
          key: "crowd",
          q: "भीड़ का संकट वास्तविक है, उसकी तैयारी कीजिए",
          a: "सन् २००३ के सिंहस्थ में रामकुंड पर हुई भगदड़ में उनतालीस लोग मारे गए थे। उसके बाद के मेले कहीं अधिक नियंत्रण और कहीं अधिक व्यय के साथ चलाए गए हैं, और २०२७ का प्रशासन वर्षों से भीड़-प्रबंधन तथा निगरानी की योजना बना रहा है। फिर भी भीड़ वाली सुबह घाट पर ईमानदार अनुमान यही है: सघन खड़ी भीड़, एक ही दिशा में गति, और लौटने का कोई रास्ता नहीं। घाट से हटकर कोई मिलन-स्थल तय कर लीजिए, बच्चों को दृष्टि में नहीं, हाथ की पहुँच में रखिए, और जल में वह कुछ मत ले जाइए जिसका खोना आप सह न सकें।",
        },
        {
          key: "passes",
          q: "पंजीकरण, पास और शासकीय माध्यम",
          a: "अगस्त २०२६ तक महाराष्ट्र शासन ने श्रद्धालुओं के लिए कोई सामान्य ई-पास या पंजीकरण आरंभ नहीं किया था, और संकेत दिया था कि पोर्टल ध्वजारोहण के निकट आएगा। किसी पर्यटन-साइट के बजाय मेला प्राधिकरण के अपने माध्यम देखिए, और उसमें हमारी साइट भी सम्मिलित है। प्राधिकरण विभागीय आयुक्त, नासिक के अधीन है; लेखन के समय प्रकाशित संपर्क kumbhmela.2027@mah.gov.in तथा ०२५३ २४६१९०९ है। हम इसे इसलिए दे रहे हैं कि यह एक शासकीय कार्यालय है। उससे हमारा कोई संबंध नहीं है।",
        },
        {
          key: "river",
          q: "अगस्त और सितंबर में नदी",
          a: "वर्षा का उत्तरार्ध। गोदावरी ऊँची चलती हैं और रामकुंड पर ठहरा जल ऊपर गंगापुर बाँध से होने वाले विसर्ग पर निर्भर करता है। सीढ़ियाँ डूब सकती हैं, और डूबने पर प्रशासन अल्प सूचना पर कुंड बंद कर देता है। जिस यात्रा में कोई एक विशेष सुबह बँधी हो, उसमें एक अतिरिक्त दिन अवश्य रखिए।",
        },
        {
          key: "pitru",
          q: "यदि आप अस्थि-विसर्जन या श्राद्ध के लिए जा रहे हैं",
          a: "रामकुंड यह कार्य वर्ष भर करता है और वह घाट के पुरोहितों के माध्यम से होता है। पहले अपने कुल-पुरोहित से पूछिए कि आप पर क्या लागू होता है, क्योंकि अधिकार और क्रम समुदाय तथा क्षेत्र के अनुसार भिन्न हैं। यदि तिथि आपके चुनाव में है, तो सिंहस्थ के सप्ताह उनमें सबसे कठिन हैं, और प्रायः चुनाव आपके पास होता ही है।",
        },
        {
          key: "staying",
          q: "लोग कहाँ ठहरते हैं",
          a: "शासन साधुग्राम बसाता है, अखाड़ों और उनके साथ आने वाले साधुओं के लिए तंबुओं की एक बस्ती। वह सामान्य आवास नहीं है। नासिक के अपने कमरे सीमित हैं और स्नान-दिवसों के आसपास पहले ही भर जाते हैं; बहुत-से लोग दूर से उसी सुबह आते हैं और उसी दिन लौट जाते हैं।",
        },
        {
          key: "around",
          q: "और क्या है, और पहले पहुँचने का कारण",
          a: "कुंड के ऊपर कपालेश्वर मंदिर है, पंचवटी में थोड़ी दूर सीता गुफा, और त्र्यंबकेश्वर में ज्योतिर्लिंग, कुशावर्त कुंड तथा ब्रह्मगिरि की वह चढ़ाई जहाँ नदी उतरती हैं। भीड़ वाली सुबह इनमें से कुछ भी देखा नहीं जा सकता। साधारण सुबह सब देखा जा सकता है, और यही तर्क है कि उसी दिन पहुँचने के बजाय कुछ दिन पहले पहुँचिए।",
        },
      ],
      closing:
        "स्वयं यात्रा करने के विरुद्ध एक शब्द नहीं। यदि आप जा सकते हैं तो जाइए, और यह पृष्ठ अपना काम कर चुका यदि इससे आपकी तैयारी पहले से बेहतर हुई हो।",
    },
    register: {
      eyebrow: "पंजी",
      title: "यहाँ खरीदने को कुछ नहीं है।",
      body: "बुकिंग खुली नहीं है। रामकुंड पर कोई अनुमति नहीं मिली है, सिंहस्थ के किसी कर्म का कोई मूल्य तय नहीं हुआ है, और जब तक ये दोनों सच नहीं होते, इस पृष्ठ पर ऐसा कुछ नहीं है जो ईमानदारी से आपका धन ले सके। आप इतना कर सकते हैं कि अपना नाम छोड़ जाएँ, और स्थिति बदलने पर एक बार सूचित किए जाएँ।",
      doesTitle: "नाम छोड़ने से क्या होता है",
      does: [
        "रामकुंड के विषय में उत्तर मिलने पर एक संदेश, चाहे वह उत्तर हाँ हो या नहीं।",
        "यदि और जब तिथियाँ तथा मूल्य तय होंगे, तब एक संदेश।",
        "इसके अतिरिक्त कुछ नहीं।",
      ],
      notTitle: "और क्या नहीं होता",
      not: [
        "इससे कोई स्थान सुरक्षित नहीं होता। स्थान हैं ही नहीं, और इस पृष्ठ पर ऐसा कोई अंक नहीं आएगा जो बताए कि कितने शेष हैं।",
        "इससे आप किसी पंक्ति में नहीं लगते और आपके साथ कोई क्रमांक नहीं जुड़ता।",
        "इससे न आपको कोई मूल्य बताया जाता है, न आप किसी मूल्य से बँधते हैं।",
        "इससे न कोई मेलिंग सूची आरंभ होती है, न स्मरण-संदेशों की शृंखला, न किसी पुण्यतिथि पर कोई संदेश।",
        "एक उत्तर में 'बंद कीजिए' लिख दीजिए और वह सदा के लिए बंद, बिना कोई प्रश्न पूछे।",
      ],
      mailLabel: "हमें लिखिए, हम आपका नाम पंजी में जोड़ देंगे",
      mailSubject: "सिंहस्थ २०२७, रुचि पंजी",
    },
    sources: {
      eyebrow: "स्रोत",
      title: "यह कहाँ से आया, और क्या हम जाँच नहीं सके।",
      lede: "इस पृष्ठ का इतिहास या तो सार्वजनिक अभिलेख का विषय है, या परंपरा है और परंपरा कहकर ही दी गई है। तिथियाँ द्वितीयक समाचार हैं। दोनों यहाँ दिए हैं ताकि आप हमसे आगे जाकर देख सकें।",
      unverifiedTitle: "जो हम पुष्ट नहीं कर सके",
      unverified: [
        "महाराष्ट्र शासन की अपनी कार्यक्रम-अधिसूचना। वह हमने नहीं पढ़ी। इस पृष्ठ की हर तिथि उसके समाचारों और प्रकाशित मार्गदर्शिकाओं से आई है।",
        "हर स्नान-दिवस के साथ दी गई तिथि। वह वैसी ही है जैसी मार्गदर्शिकाओं में छपी है। इस साइट पर अब तक किसी पंचांग-स्रोत का नाम नहीं है, और यहाँ किसी स्नान-दिवस का समय नहीं दिया गया।",
        "ध्वजारोहण का दोपहर १२:०२ का मुहूर्त। वह केवल सहायक मार्गदर्शिकाओं में मिलता है।",
        "समापन तिथि। अधिकांश स्रोत २४ जुलाई २०२८ देते हैं; कम से कम एक सारांश २०२७ कहता है। हम २०२८ छापते हैं, अनंतिम अंकित करके।",
        "रामकुंड के वर्तमान निर्माण का सन् १६९६ और उसके जीर्णोद्धार का पेशवा-परिवार से संबंध। यह व्यापक रूप से दोहराया जाता है, हमने किसी अभिलेख से नहीं जाँचा।",
        "पंद्रह से बीस करोड़ उपस्थिति का अनुमान। वह आयोजन से पूर्व का प्रशासनिक आकलन है, कोई माप नहीं, और हम उसका कहीं उपयोग नहीं करते।",
        "मेला प्राधिकरण, किसी अखाड़े, रामकुंड के पुरोहित-निकायों अथवा नासिक महानगरपालिका से कोई संबंध। इनमें से एक भी हमारे पास नहीं है।",
      ],
    },
    onward: {
      eyebrow: "आगे",
      title: "आगे पढ़िए।",
      links: [
        {
          key: "river",
          label: "रामकुंड पर गोदावरी",
          note: "जल स्वयं, वहाँ के अपने कर्म, और घाट किसके अधीन है।",
        },
        {
          key: "muhurat",
          label: "मुहूर्त पंचांग",
          note: "यहाँ दिन कैसे गिने जाते हैं, और हर समय अनंतिम क्यों अंकित है।",
        },
        {
          key: "ethics",
          label: "नीति एवं विधि",
          note: "वे दावे जो हम कभी नहीं करेंगे, पूरे, उन सहित जिनका न्योता मेला देता है।",
        },
      ],
    },
  },
} satisfies Record<Lang, KumbhCopy>;
