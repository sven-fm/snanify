import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /kumbh, the Nashik and Trimbakeshwar Simhastha, as a reference page.

   Rules this file is written under, inherited from rivers.ts and trust.ts:

   1. Every date is PROVISIONAL. The schedule below is taken from press reports
      of the Government of Maharashtra release and from published guides. No
      government notification has been read directly and no panchang provider
      has been named on this site, so nothing here may render without the
      provisional label beside it. `ScheduleEntry.confidence` exists so that
      shipping a date without its provenance is a type-level omission.
   2. No time of day is stated for any bathing day. The one clock time that
      appears anywhere (the reported dhwajarohan muhurat) is carried in a note
      field, attributed, and marked as reported rather than sourced.
   3. The twelve-year interval is stated as astronomy, in a calendar. It is
      never stated as a reason to hurry: no countdown, no seat count, no "last
      chance" anywhere on this page.
   4. No river is described by reference to another river (rivers.ts rule 4).
      "Dakshin Ganga" and "Ganga of the south" are out; Gautami is in.
   5. The page says what the Kumbh is, when it falls, where, and what a
      traveller should know. It used to also carry a permit block, a register
      of interest and a two-column list of what the site does not do at a
      mela. Those argued with a critic who was not in the room; they are gone
      and stay gone.
   --------------------------------------------------------------------------- */

/** Both locales required, a missing translation is a compile error. */
export type Bilingual = Record<Lang, string>;

export const KUMBH_ROUTE = "/kumbh";

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
  hero: { title: string; kicker: string; standfirst: string; lede: string };
  provenance: { badge: string; badgeShort: string; line: string };
  facts: { rows: { key: string; term: string; value: string }[] };
  what: { title: string; paras: Para[] };
  place: { title: string; paras: Para[] };
  river: { title: string; paras: Para[] };
  calendar: {
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
  /** The Godavari on this site during the mela: what the reader can do. */
  here: { title: string; body: string; cta: string };
  attend: { title: string; lede: string; rows: Row[] };
  sources: {
    title: string;
    lede: string;
    unverifiedTitle: string;
    unverified: string[];
  };
  onward: { title: string; links: { key: string; label: string; note: string }[] };
};

export const kumbhContent = {
  en: {
    meta: {
      title: "Simhastha Kumbh 2027, Nashik and Trimbakeshwar | Snanify",
      description:
        "When the Simhastha Kumbh falls at Nashik and Trimbakeshwar, how it is reckoned, the bathing days published for 2027 at Ram Kund and Kushavarta, and what to know if you are going.",
    },
    hero: {
      title: "The Simhastha Kumbh",
      kicker: "Nashik and Trimbakeshwar, on the Godavari",
      standfirst: "Opens 31 October 2026. Bathing days in August and September 2027.",
      lede: "How a Simhastha is reckoned, why it is kept at these two places, and the bathing days the state has published. Every date is provisional and marked so.",
    },
    provenance: {
      badge: "Provisional dates",
      badgeShort: "Provisional",
      line: "The dates on this page come from press reports of the schedule release and from published guides. We have not read the Government of Maharashtra's own notification, and the tithi for each day is as the guides give it. When a named source is checked, these labels change.",
    },
    facts: {
      rows: [
        { key: "mela", term: "Mela", value: "Simhastha Kumbh, Nashik and Trimbakeshwar" },
        {
          key: "reckoning",
          term: "Reckoned by",
          value: "Jupiter in Simha, the lion. About twelve years between one and the next.",
        },
        { key: "river", term: "River", value: "Godavari, invoked as Gautami" },
        {
          key: "places",
          term: "Bathing places",
          value: "Ram Kund, Panchavati, Nashik. Kushavarta, Trimbakeshwar.",
        },
        { key: "opens", term: "Opens", value: "31 October 2026, dhwajarohan" },
        { key: "peak", term: "Bathing days", value: "2 and 31 August, 11 and 12 September 2027" },
        { key: "closes", term: "Closes", value: "24 July 2028, dhwaja avarohan" },
        {
          key: "authority",
          term: "Authority",
          value: "Nashik-Trimbakeshwar Kumbh Mela Authority, Government of Maharashtra",
        },
      ],
    },
    what: {
      title: "What a Simhastha is",
      paras: [
        "The Kumbh is a cycle of melas at four places on four rivers. Each falls when the sun, the moon and Jupiter stand in a stated relation. Jupiter takes close to twelve years to go once round the zodiac, and that circuit sets the gap between one mela at a place and the next.",
        "Nashik's mela is the Simhastha, named for Simha, the lion, the sign Latin calls Leo. It is kept while Jupiter stands in that sign. A second rule is also given for this mela, that Jupiter, the sun and the moon stand together in Karka at the new moon. The two rules do not always point at the same fortnight. Where they differ, the akhada council and the mela authority settle the dates, and those are the dates on this page.",
        "Ujjain keeps a Simhastha of its own, reckoned on the sun's position as well as Jupiter's, so the two fall near each other without being the same event. Jupiter's year is not exactly twelve of ours, so the gap between one Nashik Simhastha and the next is near twelve years rather than exactly twelve.",
        "The mela is a period rather than a day. Ascetics camp for months, the akhadas arrive in an agreed order, ordinary bathing goes on every morning, and on a few days the akhadas bathe in procession. Those are the Amrit Snan days, which older accounts and much of the press still call Shahi Snan.",
      ],
    },
    place: {
      title: "Nashik and Ram Kund",
      paras: [
        "Ram Kund lies in Panchavati, the quarter of Nashik held to be where Rama spent part of his exile. Tradition holds that Rama and Sita bathed at this kund and that Rama performed his father Dasharatha's shraddha here. That is why Ram Kund is Nashik's asthi visarjan tirth, the place where ashes are given to the water. The stonework standing today is reported to date from 1696 and to have been repaired under the Peshwas. We state that as reported, since we have not seen the record.",
        "The mela has two centres because of a quarrel. Until the late eighteenth century it was kept at Trimbak, upstream, at the Kushavarta kund beside the Trimbakeshwar temple. In 1789 a dispute over the order of bathing between Shaiva sanyasis and Vaishnava bairagis ended in killing on a scale a surviving copperplate puts at twelve thousand ascetics. The Peshwa's settlement moved the Vaishnava bathing place down to Ram Kund at Nashik and left Kushavarta to the Shaiva akhadas.",
        "That settlement is why a Simhastha is held at two places about forty five kilometres apart, why the mela carries both names, and why the September bathing days are split. The Vaishnava akhadas bathe at Ram Kund on the eleventh and the Shaiva akhadas at Kushavarta on the twelfth.",
        "Ram Kund is a working ghat every day of the year. Shraddha and tarpan go on there through the year and heavily through Pitru Paksha, and families come to give their dead to the water on days that have nothing to do with the mela. The ghat sits under the Nashik Municipal Corporation. During a Simhastha the mela is laid over the top of all that, and all of it continues underneath.",
      ],
    },
    river: {
      title: "The Godavari at Nashik",
      paras: [
        "The Godavari rises at Brahmagiri, the hill above Trimbakeshwar, a short way upstream of Nashik. Its older name is Gautami, after the sage Gautama, who by tradition brought the river down through Shiva's grace in expiation of a cow's death. Gautami is still the name used when the river is invoked. It is the longest river of the peninsula, and the Deccan reckons its tirthas by it.",
        "Because the source is so close, the water at Ram Kund is a young river rather than a broad one. The kund is cut into stone so that it holds water even when the river runs low, which keeps the ghat in use through the dry months.",
        "The 2027 bathing days fall in Shravana and Bhadrapada, late in the monsoon. The Godavari at Nashik runs high in August and September, and how much water stands at the kund depends on what is released from the Gangapur dam upstream. The steps can go under, and the administration closes the kund at short notice on a heavy day. For anyone going in person, this matters more than anything else on this page.",
      ],
    },
    calendar: {
      title: "The published days",
      lede: "As released by the Government of Maharashtra and reported in the press. Every line is provisional, and no time of day is given for any bathing day.",
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
        "Amrit Snan is the mela administration's term for what older accounts call Shahi Snan. On those mornings the ghats are given to the akhadas in an agreed order for set hours, and everyone else bathes outside them. The mela runs for well over six hundred days, and five of them are in this table.",
      plateCaption: "Marked days only. Ordinary bathing goes on every morning.",
    },
    here: {
      title: "The Godavari on this site",
      body: "The Godavari at Ram Kund is one of the six waters here. Its modelled flow is on its page every morning of the mela, read from the same public source as on any other day, and you can sit your snan with it at the hour the panchang names, wherever you are.",
      cta: "Begin your snan",
    },
    attend: {
      title: "If you are going to Nashik",
      lede: "The things worth knowing before you travel, for the bathing days and the days around them.",
      rows: [
        {
          key: "two-centres",
          q: "It is two places",
          a: "Nashik and Trimbakeshwar are about forty five kilometres apart, and on the September dates they hold different bathing days. Plan a day for one or the other. Road time between them on a peak day is far longer than on an ordinary one.",
        },
        {
          key: "peak-days",
          q: "The bathing days are the hardest days",
          a: "On an Amrit Snan the ghats are given to the akhada processions for set hours and everyone else bathes around them. The days on either side are far easier, and the water is the same water. If you are going for the river rather than the procession, choose one of those.",
        },
        {
          key: "crowd",
          q: "Plan for the crowd",
          a: "Thirty nine people died in a crush at Ram Kund during the 2003 Simhastha. Melas since have been run with far more control, and the 2027 administration has planned crowd management for years. Still, assume a dense standing crowd at the ghat on a peak morning, movement in one direction only, and no way back the way you came. Agree a meeting point away from the ghat, keep children within arm's reach, and carry nothing into the water you cannot afford to lose.",
        },
        {
          key: "passes",
          q: "Registration and passes",
          a: "As of August 2026 the Maharashtra government had not launched a general e-pass or pilgrim registration, and said the portal would follow closer to the flag hoisting. Check the mela authority's own channels. The contact published at the time of writing is kumbhmela.2027@mah.gov.in and 0253 2461909.",
        },
        {
          key: "river",
          q: "The river in August and September",
          a: "Late monsoon. The Godavari runs high, and the water standing at Ram Kund depends on releases from the Gangapur dam upstream. The steps can be submerged, and the administration closes the kund at short notice when they are. Build a spare day into any trip planned around one morning.",
        },
        {
          key: "pitru",
          q: "Asthi visarjan and shraddha",
          a: "Purohits at Ram Kund perform asthi visarjan and shraddha all year. Ask your own family purohit first about what applies to you, because eligibility and order vary by community and region. If you can choose the date, the Simhastha weeks are the hardest ones.",
        },
        {
          key: "staying",
          q: "Where people stay",
          a: "The state builds a sadhugram, a tent settlement for the akhadas and the ascetics who travel with them. Nashik's own rooms go early around the bathing days, and many visitors travel in for the morning and leave the same day.",
        },
        {
          key: "around",
          q: "What else is there",
          a: "Kapaleshwar temple stands above the kund, Sita Gufa is a short walk into Panchavati, and Trimbakeshwar holds the jyotirlinga, the Kushavarta kund and the climb up Brahmagiri to the river's source. All of it is easy to see on an ordinary morning and none of it on a peak one, so arrive a few days ahead.",
        },
      ],
    },
    sources: {
      title: "Sources",
      lede: "The history on this page is public record, or tradition described as tradition. The dates are from secondary reporting. Both are listed here so you can check them yourself.",
      unverifiedTitle: "Not yet verified",
      unverified: [
        "The Government of Maharashtra's own notification of the schedule. Every date on this page comes from press reports of it and from published guides.",
        "The tithi given for each bathing day, which is as the guides publish it.",
        "The dhwajarohan muhurat of 12:02 in the afternoon, which appears in secondary guides only.",
        "The closing date. Most sources give 24 July 2028 and at least one summary gives 2027. We print 2028, marked provisional.",
        "The 1696 date for the present stonework at Ram Kund and its repair under the Peshwas. Widely repeated, and not checked by us against a record.",
        "The projection of fifteen to twenty crore attendance. It is an estimate made before the event, and this page does not rely on it.",
      ],
    },
    onward: {
      title: "Read next",
      links: [
        {
          key: "river",
          label: "Godavari at Ram Kund",
          note: "The water, the rites that belong there, and who governs the ghat.",
        },
        {
          key: "muhurat",
          label: "The muhurat calendar",
          note: "How days are reckoned here, and why every timing is marked provisional.",
        },
        {
          key: "ethics",
          label: "Ethics and rites",
          note: "What this site commits to, in full.",
        },
      ],
    },
  },

  hi: {
    meta: {
      title: "सिंहस्थ कुंभ २०२७, नासिक एवं त्र्यंबकेश्वर | स्नानिफ़ाई",
      description:
        "सिंहस्थ कुंभ नासिक और त्र्यंबकेश्वर में कब पड़ता है, उसकी गणना कैसे होती है, रामकुंड और कुशावर्त के लिए २०२७ की प्रकाशित स्नान-तिथियाँ, और यदि आप जा रहे हैं तो क्या जानना चाहिए।",
    },
    hero: {
      title: "सिंहस्थ कुंभ",
      kicker: "नासिक एवं त्र्यंबकेश्वर, गोदावरी तट पर",
      standfirst: "आरंभ ३१ अक्टूबर २०२६। स्नान-दिवस अगस्त और सितंबर २०२७ में।",
      lede: "सिंहस्थ की गणना कैसे होती है, वह इन्हीं दो स्थानों पर क्यों होता है, और शासन ने कौन-सी स्नान-तिथियाँ प्रकाशित की हैं। हर तिथि अनंतिम है और वैसी ही अंकित है।",
    },
    provenance: {
      badge: "अनंतिम तिथियाँ",
      badgeShort: "अनंतिम",
      line: "इस पृष्ठ की तिथियाँ कार्यक्रम-विमोचन के समाचारों और प्रकाशित मार्गदर्शिकाओं से ली गई हैं। महाराष्ट्र शासन की अपनी अधिसूचना हमने नहीं पढ़ी है, और हर दिन की तिथि वैसी ही है जैसी मार्गदर्शिकाएँ देती हैं। नामित स्रोत से जाँच होते ही ये अंकन बदल जाएँगे।",
    },
    facts: {
      rows: [
        { key: "mela", term: "मेला", value: "सिंहस्थ कुंभ, नासिक एवं त्र्यंबकेश्वर" },
        {
          key: "reckoning",
          term: "गणना",
          value: "बृहस्पति सिंह राशि में। एक से अगले के बीच लगभग बारह वर्ष।",
        },
        { key: "river", term: "नदी", value: "गोदावरी, आवाहन में गौतमी" },
        {
          key: "places",
          term: "स्नान-स्थल",
          value: "रामकुंड, पंचवटी, नासिक। कुशावर्त, त्र्यंबकेश्वर।",
        },
        { key: "opens", term: "आरंभ", value: "३१ अक्टूबर २०२६, ध्वजारोहण" },
        { key: "peak", term: "स्नान-दिवस", value: "२ एवं ३१ अगस्त, ११ एवं १२ सितंबर २०२७" },
        { key: "closes", term: "समापन", value: "२४ जुलाई २०२८, ध्वज अवरोहण" },
        {
          key: "authority",
          term: "प्राधिकरण",
          value: "नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण, महाराष्ट्र शासन",
        },
      ],
    },
    what: {
      title: "सिंहस्थ क्या है",
      paras: [
        "कुंभ चार नदियों के तट पर चार स्थानों के मेलों का एक चक्र है। हर मेला तब पड़ता है जब सूर्य, चंद्र और बृहस्पति एक निश्चित संबंध में आते हैं। बृहस्पति को राशिचक्र की एक परिक्रमा में लगभग बारह वर्ष लगते हैं, और वही परिक्रमा एक स्थान के दो मेलों के बीच का अंतराल तय करती है।",
        "नासिक का मेला सिंहस्थ कहलाता है, सिंह राशि से, जिसे लैटिन में लियो कहते हैं। वह तब होता है जब बृहस्पति इस राशि में हों। इस मेले के लिए एक दूसरा नियम भी कहा जाता है, कि अमावस्या पर बृहस्पति, सूर्य और चंद्र कर्क राशि में एक साथ हों। दोनों नियम सदा एक ही पक्ष की ओर संकेत नहीं करते। जहाँ वे अलग पड़ते हैं, वहाँ अखाड़ा परिषद और मेला प्राधिकरण तिथियाँ तय करते हैं, और वही तिथियाँ इस पृष्ठ पर हैं।",
        "उज्जैन का अपना सिंहस्थ है, जिसकी गणना में बृहस्पति के साथ सूर्य की स्थिति भी ली जाती है। इसलिए दोनों निकट-निकट पड़ते हैं, पर एक ही आयोजन नहीं हैं। बृहस्पति का वर्ष ठीक हमारे बारह वर्षों के बराबर नहीं है, इसलिए नासिक के एक सिंहस्थ से अगले तक का अंतर ठीक बारह नहीं, लगभग बारह वर्ष होता है।",
        "मेला एक दिन नहीं, एक काल है। साधु महीनों तक डेरा डालते हैं, अखाड़े तय क्रम से आते हैं, सामान्य स्नान हर सुबह चलता रहता है, और कुछ ही दिनों पर अखाड़े शोभायात्रा के साथ स्नान करते हैं। वही अमृत स्नान के दिन हैं, जिन्हें पुराने विवरण और बहुत-से समाचार आज भी शाही स्नान कहते हैं।",
      ],
    },
    place: {
      title: "नासिक और रामकुंड",
      paras: [
        "रामकुंड पंचवटी में है, नासिक का वह भाग जहाँ राम ने वनवास का कुछ काल बिताया माना जाता है। परंपरा है कि राम और सीता ने इसी कुंड पर स्नान किया और राम ने यहीं अपने पिता दशरथ का श्राद्ध किया। इसी कारण रामकुंड नासिक का अस्थि-विसर्जन तीर्थ है, जहाँ अस्थियाँ जल को सौंपी जाती हैं। आज का पत्थर का निर्माण सन् १६९६ का बताया जाता है और पेशवा-काल में उसका जीर्णोद्धार कहा जाता है। वह अभिलेख हमने नहीं देखा, इसलिए हम इसे जैसा कहा जाता है वैसा ही लिख रहे हैं।",
        "मेले के दो केंद्र एक विवाद के कारण हैं। अठारहवीं शताब्दी के अंत तक मेला ऊपर त्र्यंबक में होता था, त्र्यंबकेश्वर मंदिर के पास कुशावर्त कुंड पर। सन् १७८९ में स्नान के क्रम को लेकर शैव संन्यासियों और वैष्णव बैरागियों के बीच ऐसा संघर्ष हुआ जिसमें, एक बचे हुए ताम्रपत्र के अनुसार, बारह हज़ार साधु मारे गए। उसके बाद पेशवा के निर्णय से वैष्णवों का स्नान-स्थल नीचे नासिक के रामकुंड पर कर दिया गया और कुशावर्त शैव अखाड़ों के पास रहा।",
        "उसी निर्णय के कारण सिंहस्थ लगभग पैंतालीस किलोमीटर दूर दो स्थानों पर होता है, मेले के नाम में दोनों नगर हैं, और सितंबर के स्नान-दिवस बँटे हुए हैं। ग्यारह को वैष्णव अखाड़े रामकुंड पर स्नान करते हैं और बारह को शैव अखाड़े कुशावर्त पर।",
        "रामकुंड वर्ष के हर दिन का कार्यरत घाट है। वहाँ वर्ष भर श्राद्ध और तर्पण चलते हैं, पितृ पक्ष में विशेष रूप से, और परिवार ऐसे दिनों पर भी अपने दिवंगतों को जल सौंपने आते हैं जिनका मेले से कोई संबंध नहीं। घाट नासिक महानगरपालिका के अधीन है। सिंहस्थ के दिनों में मेला इस सबके ऊपर बिछ जाता है, और यह सब नीचे चलता रहता है।",
      ],
    },
    river: {
      title: "नासिक में गोदावरी",
      paras: [
        "गोदावरी ब्रह्मगिरि से निकलती है, त्र्यंबकेश्वर के ऊपर की पहाड़ी से, नासिक से थोड़ा ही ऊपर। गोदावरी का प्राचीन नाम गौतमी है, ऋषि गौतम के नाम पर, जो परंपरा के अनुसार गो-हत्या के प्रायश्चित्त में शिव की कृपा से नदी को नीचे लाए। आवाहन में आज भी गौतमी नाम ही लिया जाता है। यह प्रायद्वीप की सबसे लंबी नदी है, और दक्खन अपने तीर्थ इसी से गिनता है।",
        "उद्गम इतना निकट है कि रामकुंड पर गोदावरी चौड़ी नदी नहीं, नई नदी है। कुंड पत्थर में इस तरह कटा है कि नदी घटने पर भी उसमें जल ठहरा रहता है, और इसी से घाट सूखे महीनों में भी उपयोग में रहता है।",
        "२०२७ के स्नान-दिवस श्रावण और भाद्रपद में पड़ते हैं, वर्षा के उत्तरार्ध में। अगस्त और सितंबर में नासिक के पास गोदावरी ऊँची चलती है, और कुंड पर कितना जल ठहरेगा यह ऊपर गंगापुर बाँध के विसर्ग पर निर्भर करता है। सीढ़ियाँ डूब सकती हैं, और भारी दिन पर प्रशासन कुंड को अल्प सूचना पर बंद कर देता है। जो स्वयं जा रहे हैं, उनके लिए इस पृष्ठ पर इससे अधिक काम की बात कोई नहीं है।",
      ],
    },
    calendar: {
      title: "प्रकाशित दिन",
      lede: "जैसा महाराष्ट्र शासन ने जारी किया और समाचारों में आया। हर पंक्ति अनंतिम है, और किसी स्नान-दिवस का समय नहीं दिया गया है।",
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
        "अमृत स्नान मेला प्रशासन का शब्द है उसके लिए जिसे पुराने विवरण शाही स्नान कहते हैं। उन सुबहों में घाट तय क्रम से और तय घंटों के लिए अखाड़ों को सौंप दिए जाते हैं, और शेष सब लोग उनके बाहर स्नान करते हैं। मेला छह सौ से अधिक दिन चलता है, और इस तालिका में उनमें से पाँच हैं।",
      plateCaption: "केवल अंकित दिन। सामान्य स्नान हर सुबह चलता रहता है।",
    },
    here: {
      title: "इस साइट पर गोदावरी",
      body: "रामकुंड पर गोदावरी यहाँ के छह जलों में से एक है। मेले की हर सुबह उसका मॉडल-प्रवाह उसके पृष्ठ पर होता है, उसी सार्वजनिक स्रोत से पढ़ा हुआ जिससे किसी भी और दिन, और आप पंचांग की बताई घड़ी पर उसके साथ अपना स्नान कर सकते हैं, चाहे आप कहीं भी हों।",
      cta: "अपना स्नान आरंभ कीजिए",
    },
    attend: {
      title: "यदि आप नासिक जा रहे हैं",
      lede: "यात्रा से पहले जानने योग्य बातें, स्नान-दिवसों और उनके आसपास के दिनों के लिए।",
      rows: [
        {
          key: "two-centres",
          q: "यह दो स्थान हैं",
          a: "नासिक और त्र्यंबकेश्वर के बीच लगभग पैंतालीस किलोमीटर हैं, और सितंबर की तिथियों में दोनों के स्नान-दिवस अलग हैं। एक दिन में एक ही स्थान चुनिए। भीड़ वाले दिन दोनों के बीच का सफ़र साधारण दिन से कहीं लंबा होता है।",
        },
        {
          key: "peak-days",
          q: "स्नान-दिवस ही सबसे कठिन दिन हैं",
          a: "अमृत स्नान पर घाट तय घंटों के लिए अखाड़ों की शोभायात्रा को सौंप दिए जाते हैं और शेष सब लोग उनके आसपास स्नान करते हैं। आगे-पीछे के दिन कहीं सरल हैं, और जल वही जल है। यदि आप शोभायात्रा नहीं, नदी के लिए जा रहे हैं, तो उन्हीं दिनों में से कोई चुनिए।",
        },
        {
          key: "crowd",
          q: "भीड़ की तैयारी कीजिए",
          a: "सन् २००३ के सिंहस्थ में रामकुंड पर भगदड़ में उनतालीस लोग मारे गए थे। उसके बाद के मेले कहीं अधिक नियंत्रण से चलाए गए हैं, और २०२७ का प्रशासन वर्षों से भीड़-प्रबंधन की योजना बना रहा है। फिर भी भीड़ वाली सुबह घाट पर सघन खड़ी भीड़, एक ही दिशा में गति और लौटने का रास्ता बंद मानकर चलिए। घाट से दूर कोई मिलन-स्थल तय कर लीजिए, बच्चों को हाथ की पहुँच में रखिए, और जल में ऐसा कुछ मत ले जाइए जिसका खोना आप सह न सकें।",
        },
        {
          key: "passes",
          q: "पंजीकरण और पास",
          a: "अगस्त २०२६ तक महाराष्ट्र शासन ने श्रद्धालुओं के लिए कोई सामान्य ई-पास या पंजीकरण आरंभ नहीं किया था और कहा था कि पोर्टल ध्वजारोहण के निकट आएगा। मेला प्राधिकरण के अपने माध्यम देखिए। लेखन के समय प्रकाशित संपर्क kumbhmela.2027@mah.gov.in और ०२५३ २४६१९०९ है।",
        },
        {
          key: "river",
          q: "अगस्त और सितंबर में नदी",
          a: "वर्षा का उत्तरार्ध। गोदावरी ऊँची चलती है, और रामकुंड पर ठहरा जल ऊपर गंगापुर बाँध के विसर्ग पर निर्भर करता है। सीढ़ियाँ डूब सकती हैं, और डूबने पर प्रशासन अल्प सूचना पर कुंड बंद कर देता है। जो यात्रा किसी एक सुबह के लिए हो, उसमें एक अतिरिक्त दिन रखिए।",
        },
        {
          key: "pitru",
          q: "अस्थि-विसर्जन और श्राद्ध",
          a: "रामकुंड के पुरोहित अस्थि-विसर्जन और श्राद्ध वर्ष भर कराते हैं। पहले अपने कुल-पुरोहित से पूछिए कि आप पर क्या लागू होता है, क्योंकि अधिकार और क्रम समुदाय और क्षेत्र के अनुसार भिन्न हैं। यदि तिथि आपके चुनाव में है, तो सिंहस्थ के सप्ताह सबसे कठिन हैं।",
        },
        {
          key: "staying",
          q: "लोग कहाँ ठहरते हैं",
          a: "शासन साधुग्राम बसाता है, अखाड़ों और उनके साथ आने वाले साधुओं के लिए तंबुओं की बस्ती। नासिक के अपने कमरे स्नान-दिवसों के आसपास पहले ही भर जाते हैं, और बहुत-से लोग उसी सुबह आकर उसी दिन लौट जाते हैं।",
        },
        {
          key: "around",
          q: "और क्या देखने योग्य है",
          a: "कुंड के ऊपर कपालेश्वर मंदिर है, पंचवटी में थोड़ी दूर सीता गुफा, और त्र्यंबकेश्वर में ज्योतिर्लिंग, कुशावर्त कुंड और ब्रह्मगिरि की चढ़ाई नदी के उद्गम तक। साधारण सुबह यह सब सहज देखा जा सकता है और भीड़ वाली सुबह कुछ भी नहीं, इसलिए कुछ दिन पहले पहुँचिए।",
        },
      ],
    },
    sources: {
      title: "स्रोत",
      lede: "इस पृष्ठ का इतिहास सार्वजनिक अभिलेख है, या परंपरा है और परंपरा कहकर दी गई है। तिथियाँ द्वितीयक समाचारों से हैं। दोनों यहाँ दिए हैं ताकि आप स्वयं जाँच सकें।",
      unverifiedTitle: "अभी पुष्ट नहीं",
      unverified: [
        "महाराष्ट्र शासन की अपनी कार्यक्रम-अधिसूचना। इस पृष्ठ की हर तिथि उसके समाचारों और प्रकाशित मार्गदर्शिकाओं से आई है।",
        "हर स्नान-दिवस के साथ दी गई तिथि, जो वैसी ही है जैसी मार्गदर्शिकाओं में छपी है।",
        "ध्वजारोहण का दोपहर १२:०२ का मुहूर्त, जो केवल सहायक मार्गदर्शिकाओं में मिलता है।",
        "समापन तिथि। अधिकांश स्रोत २४ जुलाई २०२८ देते हैं और कम से कम एक सारांश २०२७। हम २०२८ छापते हैं, अनंतिम अंकित करके।",
        "रामकुंड के वर्तमान निर्माण का सन् १६९६ और पेशवा-काल का जीर्णोद्धार। व्यापक रूप से दोहराया जाता है, हमने किसी अभिलेख से नहीं जाँचा।",
        "पंद्रह से बीस करोड़ उपस्थिति का अनुमान। वह आयोजन से पहले का आकलन है, और यह पृष्ठ उस पर निर्भर नहीं करता।",
      ],
    },
    onward: {
      title: "आगे पढ़िए",
      links: [
        {
          key: "river",
          label: "रामकुंड पर गोदावरी",
          note: "जल, वहाँ के अपने कर्म, और घाट किसके अधीन है।",
        },
        {
          key: "muhurat",
          label: "मुहूर्त पंचांग",
          note: "यहाँ दिन कैसे गिने जाते हैं, और हर समय अनंतिम क्यों अंकित है।",
        },
        {
          key: "ethics",
          label: "नीति एवं विधि",
          note: "यह साइट किन बातों के लिए वचनबद्ध है, पूरा विवरण।",
        },
      ],
    },
  },
} satisfies Record<Lang, KumbhCopy>;
