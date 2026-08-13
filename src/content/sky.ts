/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair and not the twelve locales the
   site serves; see the tier note at the top of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Copy for /sky and /sky/[nakshatra].

   THE RULE THIS FILE IS WRITTEN UNDER. Several traditions in India reckon by
   the moon. They do not reckon by it in the same way, they do not agree about
   what a full moon is for, and two of them do not use the astronomical moon at
   all. This page states each tradition in its own terms and then states, in a
   section of its own, exactly where they part company. It never says "all
   faiths celebrate the moon". They do not. Some of them keep the same date for
   entirely different reasons, and that is a more interesting fact than the
   flattened one.

   The page also never predicts a religious date. It reports an astronomical
   position and names the rules that other people apply to it. The crescent
   sighting that opens a Hijri month is decided by a sighting committee, not by
   an ephemeris, and the moon that fixes Easter is a tabular fiction that is
   deliberately not the real one. Both are said so, in both languages.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "The moon tonight, and the star it stands in",
    description:
      "Where the moon is right now, computed offline: its nakshatra, the real star that marks it, its tithi and phase. And what that lunar moment means in the Hindu, Buddhist, Jain, Sikh, Muslim and Christian calendars kept in India, stated separately, because they do not agree.",
    listTitle: "The 27 nakshatras, and the stars that mark them",
    listDescription:
      "All 27 nakshatras with their deity, symbol, presiding graha and, for each, the real star or cluster that marks it, with its Bayer designation and computed sidereal position.",
  },

  nav: { back: "All 27 nakshatras", river: "The river now", muhurat: "The calendar" },

  hero: {
    eyebrow: "The sky",
    title: "The river comes to you.",
    titleB: "So does the sky above it.",
    lede: "Two public, checkable things meet at a single instant: the level and flow of a real river, and the position of the moon against the fixed stars. Neither is ours and both can be verified. Everything here is computed on our own server from an ephemeris, with no network call and no astrology service, and the arithmetic is published.",
    liveBadge: "Computed now, offline",
  },

  tonight: {
    eyebrow: "This moment",
    title: "Where the moon is.",
    labels: {
      nakshatra: "Nakshatra",
      pada: "Pada",
      star: "Marked by",
      tithi: "Tithi",
      paksha: "Paksha",
      illumination: "Disc lit",
      phase: "Phase",
      sidereal: "Sidereal longitude",
      latitude: "Ecliptic latitude",
      moonrise: "Moonrise",
      moonset: "Moonset",
      ayanamsa: "Ayanamsa",
      entered: "Entered this nakshatra",
      leaves: "Leaves it",
      tithiEnds: "This tithi ends",
    },
    boundaryHeading: "This reading is near a boundary",
    boundaryBody:
      "The moon is close to the edge of its segment. Panchangs in ordinary use disagree about where that edge is by up to 1.37 degrees, which the moon crosses in about two and a half hours. Both names are printed above, and neither is wrong.",
    contestedHeading: "Two traditions would name this moment differently",
  },

  star: {
    eyebrow: "The marker",
    title: "A real star, not a symbol.",
    lede: "Each of the 27 divisions is named after a star or cluster you can go outside and find. Rohini is Aldebaran, Chitra is Spica, Jyeshtha is Antares, Krittika is the Pleiades. Positions are computed from catalogue coordinates rather than copied from a table.",
    labels: {
      designation: "Designation",
      bayer: "Bayer",
      magnitude: "Magnitude",
      kind: "Kind",
      catalogue: "Catalogue",
      deity: "Deity",
      symbol: "Symbol",
      graha: "Presiding graha",
      meaning: "The name means",
      segment: "Segment",
    },
    grahaNote:
      "The presiding graha comes from the Vimshottari dasha scheme of the later astrological literature. It is recorded here because it is part of how the station is named and taught, not as a claim about anybody.",
  },

  drift: {
    eyebrow: "Where the scheme and the sky part company",
    title: "Seven stars are not in their own segment.",
    lede: "The 27 divisions are equal arcs of 13 degrees 20 minutes, and the stars are where they are. The two were close when the scheme was fixed and are not identical now: seven junction stars fall outside the segment that carries their name. Nunki misses by more than eight degrees, Arcturus by six. We publish the gap rather than rounding it away.",
    columns: { nakshatra: "Nakshatra", star: "Star", starAt: "Star at", segment: "Its segment", gap: "Short by" },
    contestedHeading: "Eleven where the sources disagree about the star",
    contestedLede:
      "For eleven of the 27, lists in ordinary use name different junction stars. Where that happens the rival is named in the data with its designation, and where the choice moves the marker across a segment boundary that is said too.",
  },

  calendars: {
    eyebrow: "The same moon, six reckonings",
    title: "What this lunar moment is, in the calendars kept in India.",
    lede: "Every tradition below turns on the moon, but not on the same feature of it and not by the same rule. Read them separately. Two are here precisely because their moon is not the one we just computed.",
    usesLabel: "Turns on",
    ruleLabel: "The rule",
    thisMomentLabel: "At this moment",
    cautionLabel: "What we will not do",

    entries: [
      {
        id: "hindu",
        tradition: "Hindu",
        uses: "Tithi and nakshatra together",
        rule: "A tithi is 12 degrees of the moon's elongation from the sun, so it is not a day and runs from about 19 to about 26 hours. Most festivals are fixed by tithi, some by nakshatra instead, a few by both, Janmashtami being the known case of Ashtami falling with Rohini. Purnimanta and amanta reckoning name the same lunar month differently in the north and the south, and the ghat pages carry which scheme each place keeps.",
        moment:
          "The tithi and the nakshatra are both printed above, with the instant each one turns.",
        caution:
          "We compute the position. We do not rule on which civil day an observance falls on, because that needs a sunrise, a sunrise needs surveyed coordinates for the place, and we do not have them.",
      },
      {
        id: "buddhist",
        tradition: "Buddhist",
        uses: "The four lunar quarters",
        rule: "Uposatha is observed on the new moon, the full moon and the two quarter days. Vesak, Buddha Purnima, falls on the full moon of Vaisakha and is a gazetted holiday in India. Ashadha Purnima is Dhamma Chakra Pravartana Day, kept as the anniversary of the first sermon at Sarnath, and opens Vassa. The Ambedkarite tradition in Maharashtra keeps these days alongside the Theravada lineages and adds days of its own that are not lunar at all.",
        moment: "The phase and the days to the next full and new moon are printed above.",
        caution:
          "Buddhist countries settle the calendar differently, and the Indian, Sri Lankan, Thai and Tibetan reckonings do not always give the same date for Vesak.",
      },
      {
        id: "jain",
        tradition: "Jain",
        uses: "Tithi, and four parva days each month",
        rule: "The two Ashtamis and the two Chaturdashis of each month are parva tithis, widely kept as days of fasting and pratikraman. Mahavir Janma Kalyanak falls on Chaitra Shukla Trayodashi. Diwali is kept as the nirvana of Mahavira, on the Kartik amavasya. Paryushan in the Shvetambara tradition ends on Samvatsari; Das Lakshana in the Digambara tradition ends on Ananta Chaturdashi, and the two do not coincide.",
        moment: "Whether this tithi is one of the four parva tithis is stated in the panel above.",
        caution:
          "Shvetambara and Digambara calendars differ, including on the date of Paryushan and on Mahavir Jayanti in some years. We report the tithi and name the difference, we do not resolve it.",
      },
      {
        id: "sikh",
        tradition: "Sikh",
        uses: "Puranmashi, the full moon, for part of the calendar",
        rule: "Guru Nanak Dev Ji's Prakash Purab is kept on Kattak di Puranmashi, the full moon of Kartik. Bandi Chhor Divas falls with Diwali on the Kartik amavasya, and Hola Mohalla follows Holi. Most other gurpurabs were moved to fixed solar dates by the Nanakshahi calendar adopted in 1999, and the later revisions are themselves disputed between the SGPC and other bodies, so which gurpurabs are lunar today depends on which calendar a gurdwara keeps.",
        moment: "Whether this is Puranmashi or the amavasya is printed above.",
        caution:
          "The Nanakshahi calendar is a live disagreement inside the Panth. We state that it exists. We do not take a side in it and we do not print a gurpurab date.",
      },
      {
        id: "muslim",
        tradition: "Muslim, in India",
        uses: "The first sighting of the crescent",
        rule: "A Hijri month begins when the new crescent is actually seen, not when the astronomical conjunction happens. The earliest possible sighting is roughly fifteen to thirty hours after conjunction, depending on elongation, the moon's altitude at sunset and the sky. In India the decision is announced by local Ruet-e-Hilal committees, and the announced date can differ between cities and from the date kept in Saudi Arabia.",
        moment:
          "We print the moon's age since conjunction and its elongation from the sun. That is astronomy. It is an input a committee may consider; it is not a date.",
        caution:
          "That decision belongs to the committees that make it, and we have no standing in it.",
      },
      {
        id: "christian",
        tradition: "Christian, in India",
        uses: "A tabular moon, not this one",
        rule: "Easter is the first Sunday after the ecclesiastical full moon falling on or after 21 March. That full moon is computed from a table, the epact, built on a 19-year cycle, and is deliberately not the astronomical one; the two can differ by up to about two days. The Gregorian computus gives one date and the Julian another, so the Syriac and Orthodox churches in Kerala keep Easter on a different Sunday from the Latin and Protestant churches in most years.",
        moment:
          "Nothing on this page feeds the computus. The moon we compute is the real one, and the moon that fixes Easter is not.",
        caution:
          "Treating the astronomical full moon as the paschal one is the commonest error made about this calendar.",
      },
      {
        id: "parsi",
        tradition: "Parsi Zoroastrian",
        uses: "Nothing on this page",
        rule: "The Shahenshahi calendar in general use among Parsis in India is a 365-day calendar with no intercalation at all, so it drifts against the seasons by about a day every four years. It is neither lunar nor astronomically solar, and the Fasli and Qadimi calendars in use by smaller communities differ again.",
        moment: "No reading on this page has any bearing on it.",
        caution:
          "This entry is here because a page about the moon in India that quietly left out a community for whom the moon does nothing would be making a claim by omission.",
      },
    ],

    disagreementHeading: "Where they do not agree, said plainly",
    disagreements: [
      "A full moon is not one thing. For a Hindu it closes the bright half of a month; for a Theravada Buddhist it is an uposatha day; for a Sikh, Kattak di Puranmashi is the Prakash Purab of Guru Nanak Dev Ji; for a Jain, Kartik Purnima is a day of pilgrimage to Shatrunjaya. Four observances that land on the same night, not four versions of one.",
      "Kartik Purnima is the clearest case. Hindus, Sikhs and Jains all keep that night, for reasons that have nothing to do with one another, so they are printed as separate entries with separate reasons.",
      "Two of the six do not use the moon we compute. The Hijri month waits on a human sighting, and Easter uses a tabular moon deliberately not the astronomical one. Presenting either as an output of an ephemeris would be wrong on the astronomy and disrespectful of the practice.",
      "Even inside a single tradition the calendar is contested: purnimanta against amanta among Hindus, Shvetambara against Digambara among Jains, the Nanakshahi revisions among Sikhs. We name the disagreement and stop there.",
    ],
  },

  join: {
    eyebrow: "Water and sky, one instant",
    title: "A snan moment has two coordinates.",
    lede: "The river gives a level and a flow. The sky gives a nakshatra, a pada, a tithi and a lit fraction. Together they name a moment far more tightly than either does alone, and both halves are public data that anybody can go and check against the source.",
    riverLabel: "The water",
    skyLabel: "The sky",
    seedLabel: "Seed",
    mudraLabel: "Mudra",
    rarityLabel: "Return period",
    rarityNote:
      "How often this pairing of water and sky recurs at this ghat, computed from a 200-year ephemeris census and the gauge station's own record. It is a fact about the world on that day. It is not a claim that the day is more auspicious, and nothing here should be read as one.",
  },

  method: {
    eyebrow: "How this is computed",
    title: "The arithmetic, and its limits.",
    items: [
      {
        n: "01",
        t: "Offline and deterministic",
        d: "Positions come from an ephemeris that runs on our own server. There is no astrology API, no key and nothing to fail on a festival night. The same instant produces the same reading on any machine, and it will still produce it in ten years.",
      },
      {
        n: "02",
        t: "One measurable check",
        d: "The Lahiri ayanamsa is defined by Spica sitting at sidereal 180 degrees exactly. Run through our pipeline, Spica comes out at 179.993. So the whole chain, ephemeris and ayanamsa together, is inside about 25 arcseconds, which the moon crosses in half a minute.",
      },
      {
        n: "03",
        t: "The ayanamsa is the real error bar",
        d: "Those 25 arcseconds are not what limits us. Lahiri, Krishnamurti and Raman, all in ordinary Indian use, span 1.37 degrees, about two and a half hours of lunar motion. A nakshatra ingress is knowable to a second within one tradition and to two and a half hours across them. When the moon is inside that margin we say so and print both names.",
      },
      {
        n: "04",
        t: "No moonrise without a survey",
        d: "Moonrise and moonset need the exact position of the ghat. None of the six has been surveyed, so no rise time is printed for them. An approximate lat and lon would give an answer that looks precise and is not, which is the one thing this site is built not to do.",
      },
    ],
    provenanceHeading: "Provenance",
    provenanceBody:
      "Every reading here is labelled provisional. In this codebase provisional means computed but not checked against a named almanac by a named person, and computing a thing exactly is not the same as having it checked. When a panchang provider is contracted and a sample of days has been reconciled, the label changes and this paragraph changes with it.",
  },

  notClaimed: {
    eyebrow: "What this is not",
    title: "Four things this page does not do.",
    items: [
      "It does not tell you anything about your life. The line under each nakshatra says what a tradition associates with that station. It is not a reading, a prediction, or a statement about anyone's character, health, marriage or money, and it never will be.",
      "It does not perform anything. Nothing on this page is a rite and nobody has stood in any water on your behalf. Snanify is a digital experience and says so.",
      "It does not announce religious dates. It reports where the moon is and names the rules other people apply to it. Deciding a date is the business of the committees, the panchang makers and the priests who do that work.",
      "It does not claim the traditions agree. Six reckonings are set out separately above, and the section on where they part company is longer than most of them.",
    ],
  },

  list: {
    eyebrow: "The whole circle",
    title: "Twenty-seven stations, twenty-seven stars.",
    lede: "The moon crosses one of these roughly every day, taking about 24 hours and 20 minutes over each, and returns to the first in 27.3 days. Each entry gives the deity, the symbol, the presiding graha and the real star that marks it, with its designation and its computed position.",
    columns: {
      n: "No.",
      name: "Nakshatra",
      span: "Span",
      star: "Star",
      magnitude: "Mag.",
      deity: "Deity",
    },
    misfitFlag: "Star outside its segment",
    contestedFlag: "Star identification contested",
  },

  detail: {
    signifiesTitle: "What tradition associates with it",
    starTitle: "The star that marks it",
    companionsTitle: "The others in the group",
    identificationTitle: "Which star, and who disagrees",
    segmentTitle: "The segment, and where the star actually is",
    insideSegment: "The junction star falls inside the segment named after it.",
    outsideSegment:
      "The junction star does not fall inside the segment named after it. The gap is printed above and is not an error in the data.",
    prev: "Previous station",
    next: "Next station",
  },

  abhijit: {
    eyebrow: "The twenty-eighth",
    title: "Abhijit, and why it is not here.",
  },

  cta: {
    title: "The water, and the star above it.",
    lede: "Pick a river. The sky is computed for whichever one you pick, at whichever moment you pick.",
    primary: "The six waters",
    secondary: "The calendar",
  },
};

const hi: typeof en = {
  meta: {
    title: "आज रात का चंद्रमा, और वह तारा जिसमें वह खड़ा है",
    description:
      "इस क्षण चंद्रमा कहाँ है, बिना नेटवर्क के गणना किया हुआ: उसका नक्षत्र, उसे चिह्नित करने वाला वास्तविक तारा, तिथि और कला। और भारत में रखे जाने वाले हिंदू, बौद्ध, जैन, सिख, मुस्लिम तथा ईसाई पंचांगों में उस चांद्र क्षण का क्या अर्थ है, अलग-अलग बताया गया, क्योंकि उनमें सहमति नहीं है।",
    listTitle: "सत्ताईस नक्षत्र, और उन्हें चिह्नित करने वाले तारे",
    listDescription:
      "सभी 27 नक्षत्र, उनके देवता, प्रतीक, अधिपति ग्रह, और प्रत्येक के लिए वह वास्तविक तारा या तारागुच्छ जो उसे चिह्नित करता है, बायर पदनाम तथा गणना की गई निरयन स्थिति सहित।",
  },

  nav: { back: "सभी 27 नक्षत्र", river: "अभी की नदी", muhurat: "पंचांग" },

  hero: {
    eyebrow: "आकाश",
    title: "नदी आप तक आती है।",
    titleB: "उसके ऊपर का आकाश भी।",
    lede: "दो सार्वजनिक, जाँची जा सकने वाली वस्तुएँ एक ही क्षण पर मिलती हैं: एक वास्तविक नदी का जलस्तर तथा प्रवाह, और स्थिर तारों के सापेक्ष चंद्रमा की स्थिति। दोनों में से कोई हमारी नहीं, और दोनों कोई भी जाँच सकता है। हर बात हमारे अपने सर्वर पर एक ephemeris से गणना की जाती है, बिना किसी नेटवर्क अनुरोध और बिना किसी ज्योतिष सेवा के, और गणित प्रकाशित है।",
    liveBadge: "अभी गणना किया गया, बिना नेटवर्क",
  },

  tonight: {
    eyebrow: "यह क्षण",
    title: "चंद्रमा कहाँ है।",
    labels: {
      nakshatra: "नक्षत्र",
      pada: "चरण",
      star: "चिह्नक तारा",
      tithi: "तिथि",
      paksha: "पक्ष",
      illumination: "प्रकाशित भाग",
      phase: "कला",
      sidereal: "निरयन देशांतर",
      latitude: "क्रांतिवृत्तीय अक्षांश",
      moonrise: "चंद्रोदय",
      moonset: "चंद्रास्त",
      ayanamsa: "अयनांश",
      entered: "इस नक्षत्र में प्रवेश",
      leaves: "निर्गम",
      tithiEnds: "यह तिथि समाप्त",
    },
    boundaryHeading: "यह गणना सीमा के निकट है",
    boundaryBody:
      "चंद्रमा अपने खंड के किनारे के पास है। प्रचलित पंचांग उस किनारे की स्थिति पर 1.37 अंश तक असहमत हैं, जिसे चंद्रमा लगभग ढाई घंटे में पार करता है। ऊपर दोनों नाम छापे गए हैं, और दोनों में से कोई ग़लत नहीं।",
    contestedHeading: "इस क्षण को दो परंपराएँ भिन्न नाम देंगी",
  },

  star: {
    eyebrow: "चिह्नक",
    title: "एक वास्तविक तारा, प्रतीक नहीं।",
    lede: "सत्ताईस विभागों में से प्रत्येक का नाम उस तारे या तारागुच्छ पर है जिसे कोई भी बाहर निकलकर ढूँढ सकता है। रोहिणी अल्देबरान, चित्रा स्पाइका, ज्येष्ठा अंतारेस, कृत्तिका प्लीएडीज़। यहाँ की स्थितियाँ सूची-निर्देशांकों से गणना की गई हैं, किसी तालिका से उतारी नहीं गईं।",
    labels: {
      designation: "पदनाम",
      bayer: "बायर",
      magnitude: "कांतिमान",
      kind: "प्रकार",
      catalogue: "सूची",
      deity: "देवता",
      symbol: "प्रतीक",
      graha: "अधिपति ग्रह",
      meaning: "नाम का अर्थ",
      segment: "खंड",
    },
    grahaNote:
      "अधिपति ग्रह परवर्ती ज्योतिष साहित्य की विंशोत्तरी दशा पद्धति से आता है। यह यहाँ इसलिए दर्ज है कि नक्षत्र का नामकरण और शिक्षण इसी के साथ होता है, किसी व्यक्ति के विषय में कोई दावा करने के लिए नहीं।",
  },

  drift: {
    eyebrow: "जहाँ योजना और आकाश अलग हो जाते हैं",
    title: "सात तारे अपने ही खंड में नहीं हैं।",
    lede: "सत्ताईस विभाग 13 अंश 20 कला के समान चाप हैं, और तारे जहाँ हैं वहीं हैं। योजना जब निश्चित हुई तब ये निकट थे, आज समरूप नहीं: सात योगतारे उस खंड के बाहर पड़ते हैं जो उनका नाम धारण करता है। नुंकी आठ अंश से अधिक चूकता है, आर्कटुरस छह से। हम इस अंतर को गोल करने के बजाय प्रकाशित करते हैं।",
    columns: { nakshatra: "नक्षत्र", star: "तारा", starAt: "तारा यहाँ", segment: "उसका खंड", gap: "इतना पीछे" },
    contestedHeading: "ग्यारह, जहाँ तारे को लेकर स्रोत असहमत हैं",
    contestedLede:
      "सत्ताईस में से ग्यारह के लिए प्रचलित सूचियाँ भिन्न योगतारे बताती हैं। जहाँ ऐसा है, प्रतिद्वंद्वी तारा अपने पदनाम सहित आँकड़ों में नामित है, और जहाँ यह चुनाव चिह्नक को खंड-सीमा के पार ले जाता है, वह भी लिखा है।",
  },

  calendars: {
    eyebrow: "वही चंद्रमा, छह गणनाएँ",
    title: "भारत में रखे जाने वाले पंचांगों में इस चांद्र क्षण का क्या अर्थ है।",
    lede: "नीचे की हर परंपरा चंद्रमा पर चलती है, किंतु उसके एक ही लक्षण पर नहीं, और एक ही नियम से नहीं। इन्हें अलग-अलग पढ़िए। इनमें से दो इस पृष्ठ पर ठीक इसलिए हैं कि उनका चंद्रमा वह नहीं है जिसकी हमने अभी गणना की।",
    usesLabel: "किस पर चलता है",
    ruleLabel: "नियम",
    thisMomentLabel: "इस क्षण",
    cautionLabel: "जो हम नहीं करेंगे",

    entries: [
      {
        id: "hindu",
        tradition: "हिंदू",
        uses: "तिथि और नक्षत्र, दोनों साथ",
        rule: "तिथि सूर्य से चंद्रमा की 12 अंश की दूरी है, अतः वह दिन नहीं है और उसकी अवधि लगभग 19 से 26 घंटे चलती है। अधिकांश पर्व तिथि से निश्चित होते हैं, कुछ नक्षत्र से, कुछ दोनों से, जन्माष्टमी वह प्रसिद्ध स्थिति है जहाँ अष्टमी रोहिणी के साथ पड़ती है। पूर्णिमांत और अमांत गणना उत्तर और दक्षिण में एक ही चांद्र मास को भिन्न नाम देती है, और कौन-सा स्थान कौन-सी पद्धति रखता है यह घाट के पृष्ठों पर अंकित है।",
        moment: "तिथि और नक्षत्र दोनों ऊपर छपे हैं, उनके बदलने के क्षण सहित।",
        caution:
          "हम स्थिति की गणना करते हैं। कौन-सा पर्व किस सिविल दिन पड़ेगा, इसका निर्णय हम नहीं देते, क्योंकि उसके लिए सूर्योदय चाहिए, सूर्योदय के लिए स्थान के सर्वेक्षित निर्देशांक चाहिए, और वे हमारे पास नहीं हैं।",
      },
      {
        id: "buddhist",
        tradition: "बौद्ध",
        uses: "चंद्रमा के चार चरण",
        rule: "उपोसथ अमावस्या, पूर्णिमा तथा दोनों अष्टमियों को रखा जाता है। वेसाक, बुद्ध पूर्णिमा, वैशाख की पूर्णिमा को पड़ती है और भारत में राजपत्रित अवकाश है। आषाढ़ पूर्णिमा धम्मचक्र प्रवर्तन दिवस है, सारनाथ के प्रथम उपदेश की स्मृति में, और वर्षावास का आरंभ। महाराष्ट्र की आंबेडकरवादी परंपरा इन दिनों को थेरवाद परंपराओं के साथ रखती है, और अपने कुछ दिन जोड़ती है जो चांद्र हैं ही नहीं।",
        moment: "कला तथा अगली पूर्णिमा और अमावस्या तक के दिन ऊपर छपे हैं।",
        caution:
          "भिन्न बौद्ध देश पंचांग भिन्न रूप से निश्चित करते हैं, और भारतीय, श्रीलंकाई, थाई तथा तिब्बती गणनाएँ वेसाक की एक ही तिथि सदा नहीं देतीं।",
      },
      {
        id: "jain",
        tradition: "जैन",
        uses: "तिथि, और प्रत्येक मास के चार पर्व दिन",
        rule: "प्रत्येक मास की दोनों अष्टमियाँ तथा दोनों चतुर्दशियाँ पर्व तिथियाँ हैं, व्यापक रूप से उपवास तथा प्रतिक्रमण के दिन। महावीर जन्म कल्याणक चैत्र शुक्ल त्रयोदशी को पड़ता है। दीपावली महावीर के निर्वाण के रूप में कार्तिक अमावस्या को रखी जाती है। श्वेतांबर परंपरा में पर्युषण संवत्सरी पर समाप्त होता है; दिगंबर परंपरा में दस लक्षण अनंत चतुर्दशी पर, और दोनों एक साथ नहीं पड़ते।",
        moment: "यह तिथि चार पर्व तिथियों में से है या नहीं, यह ऊपर के पटल में लिखा है।",
        caution:
          "श्वेतांबर और दिगंबर पंचांग भिन्न हैं, पर्युषण की तिथि सहित और कुछ वर्षों में महावीर जयंती पर भी। हम तिथि बताते हैं और अंतर नामित करते हैं, उसका निपटारा नहीं करते।",
      },
      {
        id: "sikh",
        tradition: "सिख",
        uses: "पूरनमाशी, पूर्णिमा, पंचांग के एक भाग के लिए",
        rule: "गुरु नानक देव जी का प्रकाश पुरब कत्तक दी पूरनमाशी को, कार्तिक की पूर्णिमा को रखा जाता है। बंदी छोड़ दिवस दीपावली के साथ कार्तिक अमावस्या को पड़ता है, और होला मोहल्ला होली के पश्चात्। शेष अधिकांश गुरपुरब 1999 में स्वीकृत नानकशाही पंचांग द्वारा स्थिर सौर तिथियों पर ले जाए गए, और उसके बाद के संशोधन स्वयं शिरोमणि गुरुद्वारा प्रबंधक कमेटी तथा अन्य संस्थाओं के बीच विवादित हैं, अतः आज कौन-से गुरपुरब चांद्र हैं यह इस पर निर्भर है कि गुरुद्वारा कौन-सा पंचांग रखता है।",
        moment: "यह पूरनमाशी है या अमावस्या, ऊपर छपा है।",
        caution:
          "नानकशाही पंचांग पंथ के भीतर एक जीवंत असहमति है। हम इतना कहते हैं कि वह है। हम उसमें पक्ष नहीं लेते और कोई गुरपुरब तिथि नहीं छापते।",
      },
      {
        id: "muslim",
        tradition: "मुस्लिम, भारत में",
        uses: "नए चाँद का पहला दीदार",
        rule: "हिजरी मास तब आरंभ होता है जब नया चाँद वास्तव में देखा जाता है, तब नहीं जब खगोलीय युति होती है। सबसे पहला संभव दीदार युति के लगभग पंद्रह से तीस घंटे बाद होता है, जो दूरी, सूर्यास्त के समय चंद्रमा की ऊँचाई तथा आकाश पर निर्भर है। भारत में यह निर्णय स्थानीय रूयत-ए-हिलाल कमेटियाँ घोषित करती हैं, और घोषित तिथि नगर-नगर में तथा सऊदी अरब की तिथि से भिन्न हो सकती है।",
        moment:
          "हम युति के बाद से चंद्रमा की आयु और सूर्य से उसकी दूरी छापते हैं। यह खगोल है। यह वह सामग्री है जिस पर कोई कमेटी विचार कर सकती है; यह तिथि नहीं है।",
        caution:
          "वह निर्णय उन कमेटियों का है जो उसे करती हैं, और उसमें हमारा कोई स्थान नहीं।",
      },
      {
        id: "christian",
        tradition: "ईसाई, भारत में",
        uses: "एक तालिका का चंद्रमा, यह नहीं",
        rule: "ईस्टर उस पहले रविवार को है जो 21 मार्च को अथवा उसके बाद पड़ने वाली कलीसियाई पूर्णिमा के पश्चात् आता है। वह पूर्णिमा एक तालिका से, एपैक्ट से, 19 वर्ष के चक्र पर गणना होती है, और जानबूझकर खगोलीय पूर्णिमा नहीं है; दोनों में लगभग दो दिन तक का अंतर हो सकता है। ग्रेगोरियन गणना एक तिथि देती है और जूलियन दूसरी, अतः केरल की सिरियाई एवं ऑर्थोडॉक्स कलीसियाएँ अधिकांश वर्षों में लैटिन तथा प्रोटेस्टेंट कलीसियाओं से भिन्न रविवार को ईस्टर रखती हैं।",
        moment:
          "इस पृष्ठ की कोई वस्तु उस गणना में नहीं जाती। हम जिस चंद्रमा की गणना करते हैं वह वास्तविक है, और जो चंद्रमा ईस्टर तय करता है वह नहीं।",
        caution:
          "हम ईस्टर की तिथि नहीं छापते और खगोलीय पूर्णिमा को पास्का की पूर्णिमा के रूप में प्रस्तुत नहीं करते। इन दोनों को एक बता देना इस पंचांग के विषय में की जाने वाली सबसे आम भूल है।",
      },
      {
        id: "parsi",
        tradition: "पारसी ज़रथुष्ट्री",
        uses: "इस पृष्ठ की कोई वस्तु नहीं",
        rule: "भारत के पारसियों में सामान्यतः प्रचलित शहंशाही पंचांग 365 दिन का है और उसमें कोई अधिमास नहीं, अतः वह ऋतुओं के सापेक्ष प्रति चार वर्ष में लगभग एक दिन खिसकता है। वह न चांद्र है न खगोलीय रूप से सौर। छोटे समुदायों में प्रचलित फ़सली तथा क़दीमी पंचांग पुनः भिन्न हैं।",
        moment: "इस पृष्ठ की किसी गणना का इससे कोई संबंध नहीं।",
        caution:
          "यह प्रविष्टि इसलिए है कि भारत में चंद्रमा पर बना ऐसा पृष्ठ जो चुपचाप उस समुदाय को छोड़ दे जिसके लिए चंद्रमा कुछ नहीं करता, वह छोड़ने से ही एक दावा कर रहा होगा।",
      },
    ],

    disagreementHeading: "जहाँ वे सहमत नहीं, स्पष्ट शब्दों में",
    disagreements: [
      "पूर्णिमा एक वस्तु नहीं है। हिंदू के लिए वह मास के शुक्ल पक्ष को पूर्ण करती है; थेरवाद बौद्ध के लिए वह उपोसथ दिवस है; सिख के लिए कत्तक दी पूरनमाशी गुरु नानक देव जी का प्रकाश पुरब है; जैन के लिए कार्तिक पूर्णिमा शत्रुंजय की यात्रा का दिन है। ये चार भिन्न अनुष्ठान हैं जो संयोग से एक ही रात पड़ते हैं। ये एक ही वस्तु के चार रूप नहीं हैं।",
      "कार्तिक पूर्णिमा सबसे स्पष्ट उदाहरण है। हिंदू, सिख और जैन तीनों वह रात रखते हैं, और कारणों का एक-दूसरे से कोई संबंध नहीं। उन्हें एक शीर्षक के नीचे छापना वही सपाटीकरण होगा जिससे बचने के लिए यह पृष्ठ बना है, अतः वे अलग-अलग प्रविष्टियों में, अलग-अलग कारणों सहित छपे हैं।",
      "छह में से दो उस चंद्रमा का प्रयोग नहीं करतीं जिसकी हम गणना करते हैं। हिजरी मास मानवीय दीदार की प्रतीक्षा करता है, और ईस्टर एक तालिका के चंद्रमा का प्रयोग करता है जो जानबूझकर खगोलीय नहीं है। इनमें से किसी को ephemeris का परिणाम बताना खगोल की दृष्टि से भी ग़लत होगा और व्यवहार के प्रति अनादर भी।",
      "एक ही परंपरा के भीतर भी पंचांग विवादित है। हिंदुओं में पूर्णिमांत बनाम अमांत, जैनों में श्वेतांबर बनाम दिगंबर, और सिखों में नानकशाही संशोधन, तीनों जीवंत हैं। हम असहमति को नामित करते हैं और वहीं रुक जाते हैं।",
    ],
  },

  join: {
    eyebrow: "जल और आकाश, एक क्षण",
    title: "स्नान के क्षण के दो निर्देशांक होते हैं।",
    lede: "नदी एक स्तर और एक प्रवाह देती है। आकाश एक नक्षत्र, एक चरण, एक तिथि और प्रकाशित अंश देता है। दोनों मिलकर उस क्षण को अकेले किसी एक से कहीं अधिक कसकर नामित करते हैं, और दोनों भाग सार्वजनिक आँकड़े हैं जिन्हें कोई भी स्रोत पर जाकर जाँच सकता है।",
    riverLabel: "जल",
    skyLabel: "आकाश",
    seedLabel: "बीज",
    mudraLabel: "मुद्रा",
    rarityLabel: "पुनरावृत्ति काल",
    rarityNote:
      "जल और आकाश का यह संयोग इस घाट पर कितने अंतराल पर लौटता है, 200 वर्ष की ephemeris गणना तथा गेज स्टेशन के अपने अभिलेख से निकाला गया। यह उस दिन के संसार के विषय में एक तथ्य है। यह दावा नहीं है कि वह दिन अधिक शुभ है, और यहाँ की किसी बात को वैसा नहीं पढ़ा जाना चाहिए।",
  },

  method: {
    eyebrow: "यह कैसे गणना होती है",
    title: "गणित, और उसकी सीमाएँ।",
    items: [
      {
        n: "०१",
        t: "बिना नेटवर्क, और नियत",
        d: "स्थितियाँ हमारे अपने सर्वर पर चलने वाले ephemeris से आती हैं। कोई ज्योतिष API नहीं, कोई कुंजी नहीं, और पर्व की रात विफल होने को कुछ नहीं। एक ही क्षण किसी भी मशीन पर वही गणना देता है, और दस वर्ष बाद भी वही देगा।",
      },
      {
        n: "०२",
        t: "एक नापी जा सकने वाली जाँच",
        d: "लाहिड़ी अयनांश की परिभाषा ही यह है कि चित्रा ठीक 180 अंश निरयन पर पड़े। हमारी शृंखला से निकलकर चित्रा 179.993 पर आती है। अतः पूरी शृंखला, ephemeris और अयनांश दोनों मिलकर, लगभग 25 विकला के भीतर है, जिसे चंद्रमा आधे मिनट में पार करता है।",
      },
      {
        n: "०३",
        t: "असली त्रुटि-सीमा अयनांश है",
        d: "वे 25 विकला हमारी सीमा नहीं हैं। लाहिड़ी, कृष्णमूर्ति और रमन, तीनों भारत में प्रचलित, 1.37 अंश तक फैले हैं, अर्थात् लगभग ढाई घंटे की चंद्र गति। नक्षत्र प्रवेश एक परंपरा के भीतर सेकंड तक ज्ञात है और परंपराओं के बीच ढाई घंटे तक। जब चंद्रमा इस सीमा के भीतर होता है, हम यह कहते हैं और दोनों नाम छापते हैं।",
      },
      {
        n: "०४",
        t: "सर्वेक्षण के बिना चंद्रोदय नहीं",
        d: "चंद्रोदय तथा चंद्रास्त के लिए घाट की ठीक स्थिति चाहिए। छह में से किसी का सर्वेक्षण नहीं हुआ, इसलिए उनके लिए कोई उदय समय नहीं छापा जाता। अनुमानित अक्षांश-देशांतर ऐसा उत्तर देता जो सटीक दिखता और होता नहीं, और यही एक बात है जो न करने के लिए यह स्थल बना है।",
      },
    ],
    provenanceHeading: "स्रोत",
    provenanceBody:
      "यहाँ की हर गणना अनुमानित अंकित है। इस कोडबेस में अनुमानित का अर्थ है गणना की गई किंतु किसी नामित पंचांग से किसी नामित व्यक्ति द्वारा जाँची नहीं गई, और किसी वस्तु की ठीक गणना कर लेना उसे जँचवा लेने के समान नहीं है। जब कोई पंचांग स्रोत नियुक्त होगा और कुछ तिथियों का मिलान हो चुका होगा, तब यह अंकन बदलेगा और यह अनुच्छेद भी।",
  },

  notClaimed: {
    eyebrow: "यह क्या नहीं है",
    title: "चार बातें, जो यह पृष्ठ नहीं करता।",
    items: [
      "यह आपके जीवन के विषय में कुछ नहीं बताता। हर नक्षत्र के नीचे की पंक्ति यह बताती है कि परंपरा उस नक्षत्र से क्या जोड़ती है। वह भविष्यवाणी नहीं है, फलादेश नहीं है, और किसी के स्वभाव, स्वास्थ्य, विवाह या धन के विषय में कोई कथन नहीं है, और कभी नहीं होगी।",
      "यह कुछ संपन्न नहीं करता। इस पृष्ठ पर कुछ भी अनुष्ठान नहीं है और आपकी ओर से कोई किसी जल में नहीं उतरा है। स्नानिफ़ाई एक डिजिटल अनुभव है और यही कहता है।",
      "यह धार्मिक तिथियाँ घोषित नहीं करता। यह बताता है कि चंद्रमा कहाँ है और उन नियमों को नामित करता है जो अन्य लोग उस पर लगाते हैं। तिथि का निर्णय उन कमेटियों, पंचांगकारों तथा पुरोहितों का काम है जो वह काम करते हैं।",
      "यह दावा नहीं करता कि परंपराएँ सहमत हैं। ऊपर छह गणनाएँ अलग-अलग रखी गई हैं, और वे कहाँ अलग होती हैं, उस भाग की लंबाई उनमें से अधिकांश से अधिक है।",
    ],
  },

  list: {
    eyebrow: "पूरा चक्र",
    title: "सत्ताईस स्थान, सत्ताईस तारे।",
    lede: "चंद्रमा लगभग प्रतिदिन इनमें से एक पार करता है, प्रत्येक पर लगभग 24 घंटे 20 मिनट लगाकर, और 27.3 दिन में पहले पर लौट आता है। हर प्रविष्टि में देवता, प्रतीक, अधिपति ग्रह और वह वास्तविक तारा है जो उसे चिह्नित करता है, उसके पदनाम तथा गणना की गई स्थिति सहित।",
    columns: {
      n: "क्रम",
      name: "नक्षत्र",
      span: "विस्तार",
      star: "तारा",
      magnitude: "कांति",
      deity: "देवता",
    },
    misfitFlag: "तारा अपने खंड के बाहर",
    contestedFlag: "तारे की पहचान विवादित",
  },

  detail: {
    signifiesTitle: "परंपरा इससे क्या जोड़ती है",
    starTitle: "वह तारा जो इसे चिह्नित करता है",
    companionsTitle: "समूह के शेष तारे",
    identificationTitle: "कौन-सा तारा, और कौन असहमत है",
    segmentTitle: "खंड, और तारा वास्तव में कहाँ है",
    insideSegment: "योगतारा उसी खंड के भीतर पड़ता है जो उसका नाम धारण करता है।",
    outsideSegment:
      "योगतारा उस खंड के भीतर नहीं पड़ता जो उसका नाम धारण करता है। अंतर ऊपर छपा है और यह आँकड़ों की त्रुटि नहीं है।",
    prev: "पिछला नक्षत्र",
    next: "अगला नक्षत्र",
  },

  abhijit: {
    eyebrow: "अट्ठाईसवाँ",
    title: "अभिजित्, और वह यहाँ क्यों नहीं है।",
  },

  cta: {
    title: "जल, और उसके ऊपर का तारा।",
    lede: "एक नदी चुनिए। आकाश की गणना उसी के लिए होगी जो आप चुनें, उसी क्षण के लिए जो आप चुनें।",
    primary: "छह पवित्र जल",
    secondary: "पंचांग",
  },
};

export const skyContent = { en, hi } satisfies Record<Lang, typeof en>;
export type SkyCopy = typeof en;
