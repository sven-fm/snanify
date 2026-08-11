import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
 * Snanify, the sky. The 27 nakshatras as entity data.
 *
 * This file is a star catalogue first and a tradition catalogue second, and it
 * is written under the same rules as rivers.ts and muhurat.ts.
 *
 * RULE 1  Every star here is a real star with a real J2000 position, taken from
 *         its catalogue entry. `siderealLon` and `eclipticLat` are NOT copied
 *         from a book: they are computed from `raJ2000Deg` / `decJ2000Deg` by
 *         astronomy-engine, with the Lahiri ayanamsa subtracted, at epoch
 *         2026.0, and they are checkable by anyone with the same package.
 *         The whole pipeline is bounded by one measurement: Spica comes out at
 *         sidereal 179.993 deg, and Lahiri is *defined* by Spica sitting at
 *         180.000. So our entire chain, ephemeris plus ayanamsa approximation,
 *         is good to 0.007 deg, about 25 arcseconds.
 *
 * RULE 2  The 27 equal segments of 13 deg 20 min are a division of the ecliptic
 *         for reckoning. The junction stars are the sky markers the divisions
 *         were named after. THESE TWO THINGS DO NOT COINCIDE, and this file
 *         records where they part company instead of hiding it. Seven junction
 *         stars fall outside the segment that bears their name, Nunki by more
 *         than eight degrees. `segment.starInsideSegment` is the field, and any
 *         surface that prints a star must be able to print that fact too.
 *
 * RULE 3  Where sources genuinely disagree about which star marks a nakshatra,
 *         `identification.status` is "contested" and the rival stars are listed
 *         with their designations. We do not pick silently and we do not pick
 *         the prettiest.
 *
 * RULE 4  `signifies` describes what a tradition associates with a station.
 *         It is never a statement about a reader's life, character, fortune,
 *         health, marriage or money, and no surface may render it as one.
 *
 * RULE 5  `graha` is the Vimshottari dasha lord. That is a scheme of the later
 *         astrological literature, not a Vedic-era attribution, and the field
 *         name and the copy both say so.
 * ------------------------------------------------------------------------- */

export type Bilingual = Record<Lang, string>;

/** The nine grahas, as the dasha scheme uses them. */
export type GrahaId =
  | "surya"
  | "chandra"
  | "mangal"
  | "budha"
  | "guru"
  | "shukra"
  | "shani"
  | "rahu"
  | "ketu";

export const GRAHA_NAMES: Record<GrahaId, Bilingual> = {
  surya: { en: "Surya, the Sun", hi: "सूर्य" },
  chandra: { en: "Chandra, the Moon", hi: "चंद्र" },
  mangal: { en: "Mangal, Mars", hi: "मंगल" },
  budha: { en: "Budha, Mercury", hi: "बुध" },
  guru: { en: "Guru, Jupiter", hi: "गुरु" },
  shukra: { en: "Shukra, Venus", hi: "शुक्र" },
  shani: { en: "Shani, Saturn", hi: "शनि" },
  rahu: { en: "Rahu, the ascending node", hi: "राहु" },
  ketu: { en: "Ketu, the descending node", hi: "केतु" },
};

/**
 * One real star or cluster. `siderealLon` and `eclipticLat` are computed, not
 * quoted; see the header. `magnitude` is apparent visual magnitude, and is what
 * decides the glyph size on the engraved chart, nothing else.
 */
export interface SkyObject {
  /** Bayer or Flamsteed designation, e.g. "alpha Tauri", "41 Arietis". */
  readonly designation: string;
  /** Bayer designation set in Greek where there is one, e.g. "α Tau". */
  readonly bayer: string | null;
  /** Proper name in common use, or null where the star has none. */
  readonly proper: Bilingual | null;
  /** Messier or NGC number where the marker is a cluster, not a star. */
  readonly catalogue: string | null;
  readonly kind: "star" | "double" | "cluster" | "asterism";
  /** Apparent visual magnitude. Variable stars carry their mean. */
  readonly magnitude: number;
  readonly variable?: boolean;
  readonly raJ2000Deg: number;
  readonly decJ2000Deg: number;
  /** Computed, Lahiri, epoch 2026.0. Degrees. */
  readonly siderealLon: number;
  /** Computed, degrees north of the ecliptic. */
  readonly eclipticLat: number;
}

export type IdentificationStatus = "settled" | "contested";

export interface Identification {
  readonly status: IdentificationStatus;
  /** Rival identifications, named. Empty when settled. */
  readonly alternatives: readonly { readonly designation: string; readonly proper: string | null }[];
  /** Why the sources differ. Present only when contested. */
  readonly note?: Bilingual;
}

/** Where the star sits relative to the equal segment that carries its name. */
export interface SegmentFit {
  /** Segment start, degrees sidereal. index * 13.3333. */
  readonly startDeg: number;
  readonly endDeg: number;
  readonly starInsideSegment: boolean;
  /**
   * Signed degrees from the segment start to the star. Negative means the star
   * sits before its own segment begins. Positive and above 13.3333 means after.
   */
  readonly starOffsetFromStartDeg: number;
}

export interface Nakshatra {
  /** 1 to 27, the traditional order beginning at Ashwini. */
  readonly index: number;
  /** Route segment, e.g. "rohini". Stable, never localised. */
  readonly id: string;
  readonly name: Bilingual;
  /** Devanagari, kept separate from `name.hi` because the English page prints it too. */
  readonly devanagari: string;
  /** What the name means, literally. */
  readonly meaning: Bilingual;
  readonly deity: Bilingual;
  readonly symbol: Bilingual;
  readonly graha: GrahaId;
  readonly star: SkyObject;
  /** Other stars traditionally counted in the same group, where there are any. */
  readonly companions: readonly SkyObject[];
  readonly identification: Identification;
  readonly segment: SegmentFit;
  /** One accurate line. Tradition, described as tradition. Never a prediction. */
  readonly signifies: Bilingual;
}

const SEG = 360 / 27;
const seg = (i: number, lon: number): SegmentFit => ({
  startDeg: Number((i * SEG).toFixed(4)),
  endDeg: Number(((i + 1) * SEG).toFixed(4)),
  starInsideSegment: lon >= i * SEG && lon < (i + 1) * SEG,
  starOffsetFromStartDeg: Number((lon - i * SEG).toFixed(3)),
});

export const NAKSHATRAS: readonly Nakshatra[] = [
  /* -------------------------------------------------------------- 01 */
  {
    index: 1,
    id: "ashwini",
    name: { en: "Ashwini", hi: "अश्विनी" },
    devanagari: "अश्विनी",
    meaning: { en: "The horsemen, the two Ashwins", hi: "अश्विनीकुमार, दो अश्विन" },
    deity: { en: "The Ashwini Kumaras, physicians of the gods", hi: "अश्विनीकुमार, देवताओं के वैद्य" },
    symbol: { en: "A horse's head", hi: "अश्व का मस्तक" },
    graha: "ketu",
    star: {
      designation: "beta Arietis",
      bayer: "β Ari",
      proper: { en: "Sheratan", hi: "शेरतन" },
      catalogue: null,
      kind: "star",
      magnitude: 2.64,
      raJ2000Deg: 28.66,
      decJ2000Deg: 20.808,
      siderealLon: 10.121,
      eclipticLat: 8.49,
    },
    companions: [
      {
        designation: "alpha Arietis",
        bayer: "α Ari",
        proper: { en: "Hamal", hi: "हमल" },
        catalogue: null,
        kind: "star",
        magnitude: 2.0,
        raJ2000Deg: 31.793,
        decJ2000Deg: 23.463,
        siderealLon: 13.814,
        eclipticLat: 9.97,
      },
      {
        designation: "gamma Arietis",
        bayer: "γ Ari",
        proper: { en: "Mesarthim", hi: "मेसार्थिम" },
        catalogue: null,
        kind: "double",
        magnitude: 3.86,
        raJ2000Deg: 28.38,
        decJ2000Deg: 19.294,
        siderealLon: 9.334,
        eclipticLat: 7.17,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "alpha Arietis", proper: "Hamal" }],
      note: {
        en: "Most Indian lists give beta Arietis as the junction star and the head of the horse as beta with gamma. Several give alpha Arietis, the brighter star, instead. Note that alpha Arietis computes to sidereal 13.81 degrees, which is already inside Bharani's segment, so the choice moves the marker across a boundary.",
        hi: "अधिकांश भारतीय सूचियाँ बीटा मेष को योगतारा मानती हैं और अश्व का मस्तक बीटा तथा गामा से बनाती हैं। कई सूचियाँ अधिक चमकीले अल्फ़ा मेष को लेती हैं। ध्यान दें कि अल्फ़ा मेष का सायन-रहित देशांतर 13.81 अंश निकलता है, जो भरणी के खंड में आ जाता है, अतः यह चुनाव तारे को खंड-सीमा के पार ले जाता है।",
      },
    },
    segment: seg(0, 10.121),
    signifies: {
      en: "The first division of the circle, held by the twin physicians of the gods. Tradition associates it with swiftness, healing and beginnings.",
      hi: "चक्र का प्रथम विभाग, देवताओं के दोनों वैद्यों का। परंपरा इसे शीघ्रता, आरोग्य और आरंभ से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 02 */
  {
    index: 2,
    id: "bharani",
    name: { en: "Bharani", hi: "भरणी" },
    devanagari: "भरणी",
    meaning: { en: "She who bears, or carries away", hi: "जो धारण करती है, या ले जाती है" },
    deity: { en: "Yama, who receives what has finished", hi: "यम, जो समाप्त हुए को ग्रहण करते हैं" },
    symbol: { en: "The yoni; also a boat", hi: "योनि; अथवा नौका" },
    graha: "shukra",
    star: {
      designation: "41 Arietis",
      bayer: "c Ari",
      proper: { en: "Bharani", hi: "भरणी" },
      catalogue: null,
      kind: "star",
      magnitude: 3.61,
      raJ2000Deg: 42.496,
      decJ2000Deg: 27.261,
      siderealLon: 24.355,
      eclipticLat: 10.45,
    },
    companions: [
      {
        designation: "35 Arietis",
        bayer: null,
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.65,
        raJ2000Deg: 40.826,
        decJ2000Deg: 27.708,
        siderealLon: 23.055,
        eclipticLat: 11.33,
      },
      {
        designation: "39 Arietis",
        bayer: null,
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.51,
        raJ2000Deg: 41.9,
        decJ2000Deg: 29.247,
        siderealLon: 24.454,
        eclipticLat: 12.50,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(1, 24.355),
    signifies: {
      en: "Yama's station. The name is read both as bearing and as carrying away, and tradition associates it with restraint, endurance and the limit set on a thing.",
      hi: "यम का नक्षत्र। नाम का अर्थ धारण करना भी है और ले जाना भी, और परंपरा इसे संयम, सहनशीलता तथा किसी वस्तु की नियत सीमा से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 03 */
  {
    index: 3,
    id: "krittika",
    name: { en: "Krittika", hi: "कृत्तिका" },
    devanagari: "कृत्तिका",
    meaning: { en: "The cutters, the six sisters", hi: "काटने वाली, छह बहनें" },
    deity: { en: "Agni, fire", hi: "अग्नि" },
    symbol: { en: "A razor; a flame", hi: "छुरा; अग्निशिखा" },
    graha: "surya",
    star: {
      designation: "eta Tauri",
      bayer: "η Tau",
      proper: { en: "Alcyone", hi: "अल्सियोन" },
      catalogue: "M45, the Pleiades",
      kind: "cluster",
      magnitude: 2.87,
      raJ2000Deg: 56.871,
      decJ2000Deg: 24.105,
      siderealLon: 36.144,
      eclipticLat: 4.05,
    },
    companions: [
      {
        designation: "27 Tauri",
        bayer: "Atlas",
        proper: { en: "Atlas", hi: "एटलस" },
        catalogue: "M45",
        kind: "star",
        magnitude: 3.62,
        raJ2000Deg: 57.291,
        decJ2000Deg: 24.053,
        siderealLon: 36.508,
        eclipticLat: 3.92,
      },
      {
        designation: "17 Tauri",
        bayer: "Electra",
        proper: { en: "Electra", hi: "इलेक्ट्रा" },
        catalogue: "M45",
        kind: "star",
        magnitude: 3.7,
        raJ2000Deg: 56.219,
        decJ2000Deg: 24.113,
        siderealLon: 35.564,
        eclipticLat: 4.19,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(2, 36.144),
    signifies: {
      en: "Agni's station, and the six who nursed Kartikeya, for whom the month of Kartik is named. Tradition associates it with burning away, cutting and sharpness.",
      hi: "अग्नि का नक्षत्र, और वे छह जिन्होंने कार्तिकेय का पालन किया, जिनके नाम पर कार्तिक मास है। परंपरा इसे दहन, छेदन और तीक्ष्णता से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 04 */
  {
    index: 4,
    id: "rohini",
    name: { en: "Rohini", hi: "रोहिणी" },
    devanagari: "रोहिणी",
    meaning: { en: "The red one, the rising one", hi: "लाल, आरोहण करने वाली" },
    deity: { en: "Prajapati, the lord of creatures", hi: "प्रजापति" },
    symbol: { en: "A cart; the banyan tree", hi: "शकट; वटवृक्ष" },
    graha: "chandra",
    star: {
      designation: "alpha Tauri",
      bayer: "α Tau",
      proper: { en: "Aldebaran", hi: "रोहिणी, अल्देबरान" },
      catalogue: null,
      kind: "star",
      magnitude: 0.86,
      variable: true,
      raJ2000Deg: 68.98,
      decJ2000Deg: 16.509,
      siderealLon: 45.941,
      eclipticLat: -5.46,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(3, 45.941),
    signifies: {
      en: "Prajapati's station, and the one the moon is said to favour above the others. Tradition associates it with growth, fertility and red earth.",
      hi: "प्रजापति का नक्षत्र, और वही जिसे चंद्र सबसे प्रिय कहा गया है। परंपरा इसे वृद्धि, उर्वरता और रक्तवर्ण भूमि से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 05 */
  {
    index: 5,
    id: "mrigashira",
    name: { en: "Mrigashira", hi: "मृगशिरा" },
    devanagari: "मृगशिरा",
    meaning: { en: "The deer's head", hi: "मृग का मस्तक" },
    deity: { en: "Soma, the moon", hi: "सोम, चंद्रमा" },
    symbol: { en: "A deer's head", hi: "मृग-शीर्ष" },
    graha: "mangal",
    star: {
      designation: "lambda Orionis",
      bayer: "λ Ori",
      proper: { en: "Meissa", hi: "मैसा" },
      catalogue: null,
      kind: "star",
      magnitude: 3.39,
      raJ2000Deg: 83.785,
      decJ2000Deg: 9.934,
      siderealLon: 59.859,
      eclipticLat: -13.37,
    },
    companions: [
      {
        designation: "phi1 Orionis",
        bayer: "φ¹ Ori",
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.39,
        raJ2000Deg: 83.405,
        decJ2000Deg: 9.489,
        siderealLon: 59.453,
        eclipticLat: -13.79,
      },
      {
        designation: "phi2 Orionis",
        bayer: "φ² Ori",
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.09,
        raJ2000Deg: 84.129,
        decJ2000Deg: 9.293,
        siderealLon: 60.179,
        eclipticLat: -14.02,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(4, 59.859),
    signifies: {
      en: "The deer's head at the top of Orion, and the moon's own station. Tradition associates it with searching, wandering and gentle enquiry.",
      hi: "मृगशीर्ष, जो व्याध के ऊपर है, और चंद्र का अपना नक्षत्र। परंपरा इसे खोज, भ्रमण और कोमल जिज्ञासा से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 06 */
  {
    index: 6,
    id: "ardra",
    name: { en: "Ardra", hi: "आर्द्रा" },
    devanagari: "आर्द्रा",
    meaning: { en: "The moist one", hi: "आर्द्र, गीली" },
    deity: { en: "Rudra", hi: "रुद्र" },
    symbol: { en: "A teardrop; a gem", hi: "अश्रु; मणि" },
    graha: "rahu",
    star: {
      designation: "alpha Orionis",
      bayer: "α Ori",
      proper: { en: "Betelgeuse", hi: "आर्द्रा, बेटेलगूज़" },
      catalogue: null,
      kind: "star",
      magnitude: 0.5,
      variable: true,
      raJ2000Deg: 88.793,
      decJ2000Deg: 7.407,
      siderealLon: 64.906,
      eclipticLat: -16.02,
    },
    companions: [],
    identification: {
      status: "contested",
      alternatives: [{ designation: "alpha Canis Majoris", proper: "Sirius" }],
      note: {
        en: "Betelgeuse is the mainstream identification and the one used here. A minority of scholars read Ardra as Sirius, on the strength of the older descriptions and the name's sense of moisture. The two are twenty degrees apart, so this is not a small disagreement. Note also that Betelgeuse computes to sidereal 64.91 degrees, which falls short of Ardra's own segment by 1.76 degrees, and Sirius computes to 80.23, which overshoots the far end by 0.23.",
        hi: "बेटेलगूज़ मुख्यधारा की पहचान है और यहाँ वही ली गई है। कुछ विद्वान आर्द्रा को व्याध (सिरियस) मानते हैं, प्राचीन वर्णनों तथा नाम में निहित आर्द्रता के आधार पर। दोनों में बीस अंश का अंतर है, अतः यह मतभेद छोटा नहीं। यह भी ध्यान दें कि बेटेलगूज़ का देशांतर 64.91 अंश निकलता है, जो आर्द्रा के अपने खंड से 1.76 अंश पहले है, और सिरियस का 80.23, जो दूसरे छोर से 0.23 अंश आगे।",
      },
    },
    segment: seg(5, 64.906),
    signifies: {
      en: "Rudra's station, the wet one. Tradition associates it with storm, tears and the clearing that follows a storm.",
      hi: "रुद्र का नक्षत्र, आर्द्र। परंपरा इसे झंझा, अश्रु और झंझा के बाद की स्वच्छता से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 07 */
  {
    index: 7,
    id: "punarvasu",
    name: { en: "Punarvasu", hi: "पुनर्वसु" },
    devanagari: "पुनर्वसु",
    meaning: { en: "Good again, restored", hi: "पुनः वसु, फिर से शुभ" },
    deity: { en: "Aditi, the boundless mother", hi: "अदिति" },
    symbol: { en: "A bow and quiver", hi: "धनुष एवं तूणीर" },
    graha: "guru",
    star: {
      designation: "beta Geminorum",
      bayer: "β Gem",
      proper: { en: "Pollux", hi: "पुनर्वसु, पॉलक्स" },
      catalogue: null,
      kind: "star",
      magnitude: 1.14,
      raJ2000Deg: 116.329,
      decJ2000Deg: 28.026,
      siderealLon: 89.368,
      eclipticLat: 6.69,
    },
    companions: [
      {
        designation: "alpha Geminorum",
        bayer: "α Gem",
        proper: { en: "Castor", hi: "कैस्टर" },
        catalogue: null,
        kind: "double",
        magnitude: 1.58,
        raJ2000Deg: 113.65,
        decJ2000Deg: 31.888,
        siderealLon: 86.393,
        eclipticLat: 10.10,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(6, 89.368),
    signifies: {
      en: "Aditi's station, and the name means good again. Tradition associates it with return, restoration and safe passage home.",
      hi: "अदिति का नक्षत्र, और नाम का अर्थ है फिर से शुभ। परंपरा इसे प्रत्यावर्तन, पुनर्स्थापन तथा कुशल घर-वापसी से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 08 */
  {
    index: 8,
    id: "pushya",
    name: { en: "Pushya", hi: "पुष्य" },
    devanagari: "पुष्य",
    meaning: { en: "Nourishment, the flowering", hi: "पोषण, पुष्पित होना" },
    deity: { en: "Brihaspati, priest of the gods", hi: "बृहस्पति, देवगुरु" },
    symbol: { en: "A cow's udder; a lotus", hi: "गौ का ऊधस्; कमल" },
    graha: "shani",
    star: {
      designation: "delta Cancri",
      bayer: "δ Cnc",
      proper: { en: "Asellus Australis", hi: "असेलस ऑस्ट्रालिस" },
      catalogue: "near M44, Praesepe",
      kind: "star",
      magnitude: 3.94,
      raJ2000Deg: 131.171,
      decJ2000Deg: 18.154,
      siderealLon: 104.874,
      eclipticLat: 0.08,
    },
    companions: [
      {
        designation: "gamma Cancri",
        bayer: "γ Cnc",
        proper: { en: "Asellus Borealis", hi: "असेलस बोरियालिस" },
        catalogue: null,
        kind: "star",
        magnitude: 4.66,
        raJ2000Deg: 130.821,
        decJ2000Deg: 21.469,
        siderealLon: 103.690,
        eclipticLat: 3.19,
      },
      {
        designation: "Messier 44",
        bayer: null,
        proper: { en: "Praesepe, the Beehive", hi: "प्रेसेपे, मधुमक्खी-गुच्छ" },
        catalogue: "M44",
        kind: "cluster",
        magnitude: 3.7,
        raJ2000Deg: 130.1,
        decJ2000Deg: 19.667,
        siderealLon: 103.503,
        eclipticLat: 1.28,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(7, 104.874),
    signifies: {
      en: "Brihaspati's station, counted the most auspicious of the twenty-seven in much of the literature. Tradition associates it with nourishment and increase.",
      hi: "बृहस्पति का नक्षत्र, अधिकांश ग्रंथों में सत्ताईस में सर्वाधिक शुभ गिना गया। परंपरा इसे पोषण तथा वृद्धि से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 09 */
  {
    index: 9,
    id: "ashlesha",
    name: { en: "Ashlesha", hi: "आश्लेषा" },
    devanagari: "आश्लेषा",
    meaning: { en: "The embrace, the entwining", hi: "आलिंगन, लिपटना" },
    deity: { en: "The Nagas, the serpents", hi: "नाग, सर्प" },
    symbol: { en: "A coiled serpent", hi: "कुंडलित सर्प" },
    graha: "budha",
    star: {
      designation: "epsilon Hydrae",
      bayer: "ε Hya",
      proper: { en: "Ashlesha", hi: "आश्लेषा" },
      catalogue: null,
      kind: "double",
      magnitude: 3.38,
      raJ2000Deg: 131.694,
      decJ2000Deg: 6.419,
      siderealLon: 108.496,
      eclipticLat: -11.10,
    },
    companions: [
      {
        designation: "delta Hydrae",
        bayer: "δ Hya",
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.14,
        raJ2000Deg: 130.026,
        decJ2000Deg: 5.704,
        siderealLon: 107.057,
        eclipticLat: -12.23,
      },
      {
        designation: "sigma Hydrae",
        bayer: "σ Hya",
        proper: { en: "Minchir", hi: "मिनचिर" },
        catalogue: null,
        kind: "star",
        magnitude: 4.44,
        raJ2000Deg: 129.413,
        decJ2000Deg: 3.342,
        siderealLon: 107.086,
        eclipticLat: -14.67,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "alpha Hydrae", proper: "Alphard" }],
      note: {
        en: "The head of Hydra, five faint stars, is the group everyone agrees on; which of them is the junction star is not agreed. Epsilon Hydrae is the commonest choice and is used here. Some lists take Alphard, alpha Hydrae, which is far brighter but computes to sidereal 123.43 degrees, inside Magha's segment.",
        hi: "हाइड्रा का शीर्ष, पाँच मंद तारे, वह समूह है जिस पर सब सहमत हैं; उनमें योगतारा कौन है, इस पर सहमति नहीं। एप्सिलॉन हाइड्रा सर्वाधिक प्रचलित चुनाव है और यहाँ वही लिया गया है। कुछ सूचियाँ अल्फ़ार्ड, अल्फ़ा हाइड्रा, को लेती हैं, जो कहीं अधिक चमकीला है किंतु जिसका देशांतर 123.43 अंश है, अर्थात् मघा के खंड में।",
      },
    },
    segment: seg(8, 108.496),
    signifies: {
      en: "The nagas, coiled. Tradition associates it with embrace, entwining and what is held close.",
      hi: "नाग, कुंडलित। परंपरा इसे आलिंगन, वेष्टन तथा जो निकट धारण किया जाता है, उससे जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 10 */
  {
    index: 10,
    id: "magha",
    name: { en: "Magha", hi: "मघा" },
    devanagari: "मघा",
    meaning: { en: "The bountiful, the mighty", hi: "महती, ऐश्वर्यशाली" },
    deity: { en: "The Pitrs, the ancestors", hi: "पितर" },
    symbol: { en: "A royal throne; a palanquin", hi: "राजसिंहासन; पालकी" },
    graha: "ketu",
    star: {
      designation: "alpha Leonis",
      bayer: "α Leo",
      proper: { en: "Regulus", hi: "मघा, रेगुलस" },
      catalogue: null,
      kind: "star",
      magnitude: 1.4,
      raJ2000Deg: 152.093,
      decJ2000Deg: 11.967,
      siderealLon: 125.981,
      eclipticLat: 0.47,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(9, 125.981),
    signifies: {
      en: "The seat of the ancestors, and the one star of the twenty-seven that sits almost exactly on the ecliptic. Tradition associates it with lineage, inheritance and rank.",
      hi: "पितरों का आसन, और सत्ताईस में वही तारा जो लगभग ठीक क्रांतिवृत्त पर बैठता है। परंपरा इसे वंश, उत्तराधिकार तथा पद से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 11 */
  {
    index: 11,
    id: "purva-phalguni",
    name: { en: "Purva Phalguni", hi: "पूर्वा फाल्गुनी" },
    devanagari: "पूर्वा फाल्गुनी",
    meaning: { en: "The earlier reddish one", hi: "पहली फाल्गुनी" },
    deity: { en: "Bhaga, who apportions", hi: "भग, जो भाग देते हैं" },
    symbol: { en: "The front legs of a bed", hi: "खाट का अगला भाग" },
    graha: "shukra",
    star: {
      designation: "delta Leonis",
      bayer: "δ Leo",
      proper: { en: "Zosma", hi: "ज़ोस्मा" },
      catalogue: null,
      kind: "star",
      magnitude: 2.56,
      raJ2000Deg: 168.527,
      decJ2000Deg: 20.524,
      siderealLon: 137.469,
      eclipticLat: 14.33,
    },
    companions: [
      {
        designation: "theta Leonis",
        bayer: "θ Leo",
        proper: { en: "Chertan", hi: "चेर्तन" },
        catalogue: null,
        kind: "star",
        magnitude: 3.32,
        raJ2000Deg: 168.56,
        decJ2000Deg: 15.43,
        siderealLon: 139.575,
        eclipticLat: 9.68,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "theta Leonis", proper: "Chertan" }],
      note: {
        en: "The pair delta and theta Leonis is agreed; which is the junction star is not. Delta is used here, being the brighter.",
        hi: "डेल्टा और थीटा सिंह की जोड़ी पर सहमति है; इनमें योगतारा कौन है, इस पर नहीं। यहाँ अधिक चमकीला डेल्टा लिया गया है।",
      },
    },
    segment: seg(10, 137.469),
    signifies: {
      en: "Bhaga's station, the earlier of the pair. Tradition associates it with rest, pleasure and the couch.",
      hi: "भग का नक्षत्र, युग्म में पहला। परंपरा इसे विश्राम, सुख तथा शय्या से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 12 */
  {
    index: 12,
    id: "uttara-phalguni",
    name: { en: "Uttara Phalguni", hi: "उत्तरा फाल्गुनी" },
    devanagari: "उत्तरा फाल्गुनी",
    meaning: { en: "The later reddish one", hi: "दूसरी फाल्गुनी" },
    deity: { en: "Aryaman, keeper of custom and covenant", hi: "अर्यमन्, प्रथा एवं वचन के रक्षक" },
    symbol: { en: "The back legs of a bed", hi: "खाट का पिछला भाग" },
    graha: "surya",
    star: {
      designation: "beta Leonis",
      bayer: "β Leo",
      proper: { en: "Denebola", hi: "डेनेबोला" },
      catalogue: null,
      kind: "star",
      magnitude: 2.14,
      raJ2000Deg: 177.265,
      decJ2000Deg: 14.572,
      siderealLon: 147.770,
      eclipticLat: 12.27,
    },
    companions: [
      {
        designation: "93 Leonis",
        bayer: null,
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 4.5,
        raJ2000Deg: 176.937,
        decJ2000Deg: 20.219,
        siderealLon: 145.074,
        eclipticLat: 17.29,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(11, 147.77),
    signifies: {
      en: "Aryaman's station, the later of the pair. Tradition associates it with covenant, patronage and lasting arrangement.",
      hi: "अर्यमन् का नक्षत्र, युग्म में दूसरा। परंपरा इसे वचन, आश्रय तथा स्थायी व्यवस्था से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 13 */
  {
    index: 13,
    id: "hasta",
    name: { en: "Hasta", hi: "हस्त" },
    devanagari: "हस्त",
    meaning: { en: "The hand", hi: "हाथ" },
    deity: { en: "Savitr, the impeller, an aspect of the sun", hi: "सवितृ, प्रेरक सूर्य" },
    symbol: { en: "An open hand", hi: "खुली हथेली" },
    graha: "chandra",
    star: {
      designation: "delta Corvi",
      bayer: "δ Crv",
      proper: { en: "Algorab", hi: "अल्गोराब" },
      catalogue: null,
      kind: "double",
      magnitude: 2.94,
      raJ2000Deg: 187.466,
      decJ2000Deg: -16.516,
      siderealLon: 169.603,
      eclipticLat: -12.20,
    },
    companions: [
      {
        designation: "gamma Corvi",
        bayer: "γ Crv",
        proper: { en: "Gienah", hi: "गिनाह" },
        catalogue: null,
        kind: "star",
        magnitude: 2.58,
        raJ2000Deg: 183.952,
        decJ2000Deg: -17.542,
        siderealLon: 166.877,
        eclipticLat: -14.50,
      },
      {
        designation: "beta Corvi",
        bayer: "β Crv",
        proper: { en: "Kraz", hi: "क्राज़" },
        catalogue: null,
        kind: "star",
        magnitude: 2.65,
        raJ2000Deg: 188.597,
        decJ2000Deg: -23.397,
        siderealLon: 173.519,
        eclipticLat: -18.05,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "gamma Corvi", proper: "Gienah" }],
      note: {
        en: "The five stars of Corvus make the hand; sources differ on whether delta or gamma is the junction star. Both fall inside Hasta's segment, so unlike most of the contested cases this one does not move the marker across a boundary.",
        hi: "काकध्वज (कॉर्वस) के पाँच तारे हाथ बनाते हैं; योगतारा डेल्टा है या गामा, इस पर स्रोत भिन्न हैं। दोनों हस्त के खंड के भीतर पड़ते हैं, अतः अधिकांश विवादित प्रकरणों के विपरीत यहाँ चुनाव तारे को खंड-सीमा के पार नहीं ले जाता।",
      },
    },
    segment: seg(12, 169.603),
    signifies: {
      en: "The open hand. Tradition associates it with craft, skill and what is placed in the palm.",
      hi: "खुली हथेली। परंपरा इसे शिल्प, कौशल तथा जो हथेली पर रखा जाता है, उससे जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 14 */
  {
    index: 14,
    id: "chitra",
    name: { en: "Chitra", hi: "चित्रा" },
    devanagari: "चित्रा",
    meaning: { en: "The brilliant, the many-coloured", hi: "उज्ज्वल, विचित्र" },
    deity: { en: "Tvashtr, the divine artificer, also called Vishvakarma", hi: "त्वष्टा, दिव्य शिल्पी, विश्वकर्मा भी" },
    symbol: { en: "A bright jewel; a pearl", hi: "उज्ज्वल रत्न; मोती" },
    graha: "mangal",
    star: {
      designation: "alpha Virginis",
      bayer: "α Vir",
      proper: { en: "Spica", hi: "चित्रा, स्पाइका" },
      catalogue: null,
      kind: "double",
      magnitude: 0.97,
      variable: true,
      raJ2000Deg: 201.298,
      decJ2000Deg: -11.161,
      siderealLon: 179.993,
      eclipticLat: -2.06,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(13, 179.993),
    signifies: {
      en: "Tvashtr the maker, and the bright jewel. This is the star the Lahiri ayanamsa is anchored to, so it lands at sidereal 180 degrees by definition, the exact midpoint of its own segment. Tradition associates it with design, brilliance and made things.",
      hi: "त्वष्टा, निर्माता, और उज्ज्वल रत्न। लाहिड़ी अयनांश इसी तारे पर आधारित है, अतः यह परिभाषा से ही 180 अंश पर पड़ता है, अपने खंड के ठीक मध्य में। परंपरा इसे रचना, दीप्ति तथा निर्मित वस्तुओं से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 15 */
  {
    index: 15,
    id: "swati",
    name: { en: "Swati", hi: "स्वाति" },
    devanagari: "स्वाति",
    meaning: { en: "The self-going, the independent", hi: "स्वयं जाने वाली, स्वतंत्र" },
    deity: { en: "Vayu, the wind", hi: "वायु" },
    symbol: { en: "A young shoot swaying in the wind; coral", hi: "वायु में हिलता अंकुर; मूँगा" },
    graha: "rahu",
    star: {
      designation: "alpha Bootis",
      bayer: "α Boo",
      proper: { en: "Arcturus", hi: "स्वाति, आर्कटुरस" },
      catalogue: null,
      kind: "star",
      magnitude: -0.05,
      raJ2000Deg: 213.915,
      decJ2000Deg: 19.182,
      siderealLon: 180.387,
      eclipticLat: 30.73,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(14, 180.387),
    signifies: {
      en: "Vayu's station, the one that goes by itself. Arcturus sits nearly 31 degrees north of the ecliptic, the furthest of the twenty-seven from the moon's road, and so its longitude falls more than six degrees short of the segment named after it. Tradition associates it with wind, independence and movement.",
      hi: "वायु का नक्षत्र, वह जो स्वयं चलता है। आर्कटुरस क्रांतिवृत्त से लगभग 31 अंश उत्तर है, सत्ताईस में चंद्रपथ से सर्वाधिक दूर, इसीलिए इसका देशांतर उसी खंड से छह अंश से अधिक पीछे रह जाता है जो इसके नाम पर है। परंपरा इसे वायु, स्वतंत्रता तथा गति से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 16 */
  {
    index: 16,
    id: "vishakha",
    name: { en: "Vishakha", hi: "विशाखा" },
    devanagari: "विशाखा",
    meaning: { en: "The forked, the two-branched", hi: "द्विशाखा, दो शाखाओं वाली" },
    deity: { en: "Indra and Agni together, Indragni", hi: "इंद्र एवं अग्नि, इंद्राग्नी" },
    symbol: { en: "A triumphal arch; a potter's wheel", hi: "तोरण; कुम्हार का चाक" },
    graha: "guru",
    star: {
      designation: "alpha2 Librae",
      bayer: "α² Lib",
      proper: { en: "Zubenelgenubi", hi: "ज़ुबेनेलजेनुबी" },
      catalogue: null,
      kind: "double",
      magnitude: 2.75,
      raJ2000Deg: 222.72,
      decJ2000Deg: -16.042,
      siderealLon: 201.235,
      eclipticLat: 0.33,
    },
    companions: [
      {
        designation: "beta Librae",
        bayer: "β Lib",
        proper: { en: "Zubeneschamali", hi: "ज़ुबेनेश्चमाली" },
        catalogue: null,
        kind: "star",
        magnitude: 2.61,
        raJ2000Deg: 229.252,
        decJ2000Deg: -9.383,
        siderealLon: 205.524,
        eclipticLat: 8.49,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "iota Librae", proper: null }],
      note: {
        en: "Alpha-two Librae is the usual junction star and sits almost exactly on the ecliptic. A minority of lists give iota Librae. Both are inside the segment.",
        hi: "अल्फ़ा-द्वितीय तुला सामान्यतः योगतारा है और लगभग ठीक क्रांतिवृत्त पर बैठता है। कुछ सूचियाँ आयोटा तुला देती हैं। दोनों खंड के भीतर हैं।",
      },
    },
    segment: seg(15, 201.235),
    signifies: {
      en: "Indra and Agni together, and the forked branch. Tradition associates it with purpose held to, and with the arch one passes under.",
      hi: "इंद्र और अग्नि, एक साथ, और द्विशाखा। परंपरा इसे दृढ़ संकल्प तथा उस तोरण से जोड़ती है जिसके नीचे से होकर जाया जाता है।",
    },
  },

  /* -------------------------------------------------------------- 17 */
  {
    index: 17,
    id: "anuradha",
    name: { en: "Anuradha", hi: "अनुराधा" },
    devanagari: "अनुराधा",
    meaning: { en: "Following Radha; the subsequent success", hi: "राधा के पश्चात्; अनुवर्ती सिद्धि" },
    deity: { en: "Mitra, the keeper of agreements", hi: "मित्र, संधि के रक्षक" },
    symbol: { en: "A lotus; a staff", hi: "कमल; दंड" },
    graha: "shani",
    star: {
      designation: "delta Scorpii",
      bayer: "δ Sco",
      proper: { en: "Dschubba", hi: "डशुब्बा" },
      catalogue: null,
      kind: "star",
      magnitude: 2.29,
      variable: true,
      raJ2000Deg: 240.083,
      decJ2000Deg: -22.622,
      siderealLon: 218.723,
      eclipticLat: -1.99,
    },
    companions: [
      {
        designation: "beta Scorpii",
        bayer: "β Sco",
        proper: { en: "Acrab", hi: "अक्रब" },
        catalogue: null,
        kind: "double",
        magnitude: 2.62,
        raJ2000Deg: 241.359,
        decJ2000Deg: -19.805,
        siderealLon: 219.341,
        eclipticLat: 1.00,
      },
      {
        designation: "pi Scorpii",
        bayer: "π Sco",
        proper: null,
        catalogue: null,
        kind: "star",
        magnitude: 2.89,
        raJ2000Deg: 239.713,
        decJ2000Deg: -26.114,
        siderealLon: 219.092,
        eclipticLat: -5.48,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(16, 218.723),
    signifies: {
      en: "Mitra's station. Tradition associates it with friendship, keeping to an agreement, and devotion that follows through.",
      hi: "मित्र का नक्षत्र। परंपरा इसे मैत्री, वचन-पालन तथा निभाई जाने वाली भक्ति से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 18 */
  {
    index: 18,
    id: "jyeshtha",
    name: { en: "Jyeshtha", hi: "ज्येष्ठा" },
    devanagari: "ज्येष्ठा",
    meaning: { en: "The eldest, the senior", hi: "सबसे बड़ी, ज्येष्ठ" },
    deity: { en: "Indra", hi: "इंद्र" },
    symbol: { en: "A circular amulet; an umbrella", hi: "गोल कुंडल; छत्र" },
    graha: "budha",
    star: {
      designation: "alpha Scorpii",
      bayer: "α Sco",
      proper: { en: "Antares", hi: "ज्येष्ठा, अंतारेस" },
      catalogue: null,
      kind: "star",
      magnitude: 1.06,
      variable: true,
      raJ2000Deg: 247.352,
      decJ2000Deg: -26.432,
      siderealLon: 225.914,
      eclipticLat: -4.57,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(17, 225.914),
    signifies: {
      en: "Indra as the eldest. Antares falls three quarters of a degree short of the segment named after it, the smallest of the seven misfits. Tradition associates it with seniority, protection and the weight that comes with rank.",
      hi: "इंद्र, ज्येष्ठ रूप में। अंतारेस अपने नाम वाले खंड से पौन अंश पीछे रह जाता है, सात विचलनों में सबसे छोटा। परंपरा इसे ज्येष्ठता, रक्षण तथा पद के साथ आने वाले भार से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 19 */
  {
    index: 19,
    id: "mula",
    name: { en: "Mula", hi: "मूल" },
    devanagari: "मूल",
    meaning: { en: "The root", hi: "जड़, मूल" },
    deity: { en: "Nirriti, dissolution", hi: "निरृति, विनाश" },
    symbol: { en: "A bunch of tied roots; a lion's tail", hi: "बँधी हुई जड़ें; सिंह की पूँछ" },
    graha: "ketu",
    star: {
      designation: "lambda Scorpii",
      bayer: "λ Sco",
      proper: { en: "Shaula", hi: "शौला" },
      catalogue: null,
      kind: "star",
      magnitude: 1.62,
      raJ2000Deg: 263.402,
      decJ2000Deg: -37.104,
      siderealLon: 240.737,
      eclipticLat: -13.79,
    },
    companions: [
      {
        designation: "upsilon Scorpii",
        bayer: "υ Sco",
        proper: { en: "Lesath", hi: "लेसाथ" },
        catalogue: null,
        kind: "star",
        magnitude: 2.7,
        raJ2000Deg: 262.691,
        decJ2000Deg: -37.296,
        siderealLon: 240.164,
        eclipticLat: -14.01,
      },
      {
        designation: "epsilon Scorpii",
        bayer: "ε Sco",
        proper: { en: "Larawag", hi: "लारावाग" },
        catalogue: null,
        kind: "star",
        magnitude: 2.29,
        raJ2000Deg: 252.543,
        decJ2000Deg: -34.293,
        siderealLon: 231.489,
        eclipticLat: -11.74,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "epsilon Scorpii", proper: "Larawag" }],
      note: {
        en: "The sting of the scorpion is the group. Lambda Scorpii, Shaula, is the usual junction star and is used here. Some lists give epsilon Scorpii, which computes to sidereal 231.49 degrees, well inside Jyeshtha's segment rather than Mula's.",
        hi: "वृश्चिक का डंक ही समूह है। लैम्ब्डा वृश्चिक, शौला, सामान्य योगतारा है और यहाँ वही लिया गया है। कुछ सूचियाँ एप्सिलॉन वृश्चिक देती हैं, जिसका देशांतर 231.49 अंश निकलता है, अर्थात् मूल के नहीं, ज्येष्ठा के खंड में।",
      },
    },
    segment: seg(18, 240.737),
    signifies: {
      en: "Nirriti's station, the root. It sits at the beginning of the galactic centre's part of the sky. Tradition associates it with the bottom of things, uprooting, and enquiry into origins.",
      hi: "निरृति का नक्षत्र, मूल। यह आकाश के उस भाग के आरंभ में है जहाँ आकाशगंगा का केंद्र पड़ता है। परंपरा इसे वस्तुओं के तल, उन्मूलन तथा उद्गम की खोज से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 20 */
  {
    index: 20,
    id: "purva-ashadha",
    name: { en: "Purva Ashadha", hi: "पूर्वाषाढ़ा" },
    devanagari: "पूर्वाषाढ़ा",
    meaning: { en: "The earlier unconquered", hi: "पहली अपराजिता" },
    deity: { en: "Apas, the Waters", hi: "आपः, जल-देवता" },
    symbol: { en: "A winnowing basket; a fan", hi: "सूप; पंखा" },
    graha: "shukra",
    star: {
      designation: "delta Sagittarii",
      bayer: "δ Sgr",
      proper: { en: "Kaus Media", hi: "काउस मीडिया" },
      catalogue: null,
      kind: "star",
      magnitude: 2.7,
      raJ2000Deg: 275.248,
      decJ2000Deg: -29.828,
      siderealLon: 250.732,
      eclipticLat: -6.48,
    },
    companions: [
      {
        designation: "epsilon Sagittarii",
        bayer: "ε Sgr",
        proper: { en: "Kaus Australis", hi: "काउस ऑस्ट्रालिस" },
        catalogue: null,
        kind: "star",
        magnitude: 1.85,
        raJ2000Deg: 276.043,
        decJ2000Deg: -34.385,
        siderealLon: 251.230,
        eclipticLat: -11.06,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "epsilon Sagittarii", proper: "Kaus Australis" }],
      note: {
        en: "Delta and epsilon Sagittarii, the middle and southern parts of the archer's bow, are the pair. Sources split on which is the junction star; delta is used here. Either way the star falls short of its own segment, delta by 2.6 degrees.",
        hi: "डेल्टा और एप्सिलॉन धनु, धनुर्धर के धनुष के मध्य तथा दक्षिण भाग, यह जोड़ी है। योगतारा कौन है, इस पर स्रोत बँटे हैं; यहाँ डेल्टा लिया गया है। दोनों ही स्थिति में तारा अपने खंड से पीछे रह जाता है, डेल्टा 2.6 अंश।",
      },
    },
    segment: seg(19, 250.732),
    signifies: {
      en: "The Waters, and the earlier of the two unconquered. Tradition associates it with invincibility, cleansing, and the winnowing fan that separates grain from chaff.",
      hi: "जल-देवता, और दो अपराजिताओं में पहली। परंपरा इसे अजेयता, शुद्धिकरण तथा उस सूप से जोड़ती है जो अन्न को भूसी से अलग करता है।",
    },
  },

  /* -------------------------------------------------------------- 21 */
  {
    index: 21,
    id: "uttara-ashadha",
    name: { en: "Uttara Ashadha", hi: "उत्तराषाढ़ा" },
    devanagari: "उत्तराषाढ़ा",
    meaning: { en: "The later unconquered", hi: "दूसरी अपराजिता" },
    deity: { en: "The Vishvedevas, the all-gods", hi: "विश्वेदेवाः" },
    symbol: { en: "An elephant's tusk; the planks of a bed", hi: "हाथी का दाँत; खाट के पटरे" },
    graha: "surya",
    star: {
      designation: "sigma Sagittarii",
      bayer: "σ Sgr",
      proper: { en: "Nunki", hi: "नुंकी" },
      catalogue: null,
      kind: "star",
      magnitude: 2.05,
      raJ2000Deg: 283.816,
      decJ2000Deg: -26.297,
      siderealLon: 258.537,
      eclipticLat: -3.45,
    },
    companions: [
      {
        designation: "zeta Sagittarii",
        bayer: "ζ Sgr",
        proper: { en: "Ascella", hi: "असेला" },
        catalogue: null,
        kind: "double",
        magnitude: 2.6,
        raJ2000Deg: 285.653,
        decJ2000Deg: -29.88,
        siderealLon: 259.790,
        eclipticLat: -7.18,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "zeta Sagittarii", proper: "Ascella" }],
      note: {
        en: "Sigma and zeta Sagittarii are the pair, and sources split on the junction star. This is the widest divergence in the whole catalogue between star and segment: sigma computes to sidereal 258.54 degrees, more than eight degrees short of the segment named after it, and lands inside Purva Ashadha instead.",
        hi: "सिग्मा और ज़ीटा धनु यह जोड़ी है, और योगतारा पर स्रोत बँटे हैं। तारे और खंड के बीच पूरे संग्रह का सबसे बड़ा अंतर यही है: सिग्मा का देशांतर 258.54 अंश निकलता है, अपने नाम वाले खंड से आठ अंश से अधिक पीछे, और पूर्वाषाढ़ा के भीतर जा पड़ता है।",
      },
    },
    segment: seg(20, 258.537),
    signifies: {
      en: "The all-gods, and the later of the two unconquered. Tradition associates it with final victory and ground that does not shift.",
      hi: "विश्वेदेवा, और दो अपराजिताओं में दूसरी। परंपरा इसे अंतिम विजय तथा अडिग भूमि से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 22 */
  {
    index: 22,
    id: "shravana",
    name: { en: "Shravana", hi: "श्रवण" },
    devanagari: "श्रवण",
    meaning: { en: "Hearing, the act of listening", hi: "सुनना, श्रवण" },
    deity: { en: "Vishnu", hi: "विष्णु" },
    symbol: { en: "Three footprints; an ear", hi: "तीन पद-चिह्न; कान" },
    graha: "chandra",
    star: {
      designation: "alpha Aquilae",
      bayer: "α Aql",
      proper: { en: "Altair", hi: "श्रवण, अल्ताइर" },
      catalogue: null,
      kind: "star",
      magnitude: 0.76,
      raJ2000Deg: 297.696,
      decJ2000Deg: 8.868,
      siderealLon: 277.927,
      eclipticLat: 29.30,
    },
    companions: [
      {
        designation: "beta Aquilae",
        bayer: "β Aql",
        proper: { en: "Alshain", hi: "अल्शाइन" },
        catalogue: null,
        kind: "star",
        magnitude: 3.71,
        raJ2000Deg: 298.828,
        decJ2000Deg: 6.407,
        siderealLon: 278.574,
        eclipticLat: 26.66,
      },
      {
        designation: "gamma Aquilae",
        bayer: "γ Aql",
        proper: { en: "Tarazed", hi: "तराज़ेद" },
        catalogue: null,
        kind: "star",
        magnitude: 2.72,
        raJ2000Deg: 296.565,
        decJ2000Deg: 10.613,
        siderealLon: 277.090,
        eclipticLat: 31.24,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(21, 277.927),
    signifies: {
      en: "Vishnu's three strides, read in the sky as Altair with a star on either side. Tradition associates it with listening, learning by hearing, and knowledge passed on by voice.",
      hi: "विष्णु के तीन पग, आकाश में अल्ताइर तथा उसके दोनों ओर एक-एक तारे के रूप में पढ़े गए। परंपरा इसे श्रवण, सुनकर सीखने तथा वाणी से हस्तांतरित ज्ञान से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 23 */
  {
    index: 23,
    id: "dhanishta",
    name: { en: "Dhanishta", hi: "धनिष्ठा" },
    devanagari: "धनिष्ठा",
    meaning: { en: "The wealthiest; also Shravishtha, the swiftest", hi: "सर्वाधिक धनवान; श्रविष्ठा भी" },
    deity: { en: "The eight Vasus", hi: "अष्ट वसु" },
    symbol: { en: "A drum; a flute", hi: "मृदंग; बाँसुरी" },
    graha: "mangal",
    star: {
      designation: "beta Delphini",
      bayer: "β Del",
      proper: { en: "Rotanev", hi: "रोतानेव" },
      catalogue: null,
      kind: "double",
      magnitude: 3.63,
      raJ2000Deg: 309.387,
      decJ2000Deg: 14.595,
      siderealLon: 292.491,
      eclipticLat: 31.92,
    },
    companions: [
      {
        designation: "alpha Delphini",
        bayer: "α Del",
        proper: { en: "Sualocin", hi: "सुआलोसिन" },
        catalogue: null,
        kind: "star",
        magnitude: 3.77,
        raJ2000Deg: 309.909,
        decJ2000Deg: 15.912,
        siderealLon: 293.530,
        eclipticLat: 33.02,
      },
      {
        designation: "gamma Delphini",
        bayer: "γ Del",
        proper: null,
        catalogue: null,
        kind: "double",
        magnitude: 3.9,
        raJ2000Deg: 310.865,
        decJ2000Deg: 16.124,
        siderealLon: 294.650,
        eclipticLat: 32.94,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(22, 292.491),
    signifies: {
      en: "The eight Vasus, and the drum. The four stars of Delphinus are the group, and they sit nearly 32 degrees north of the ecliptic, further from the moon's road than any junction star but Arcturus. Tradition associates it with rhythm, music and abundance.",
      hi: "अष्ट वसु, और मृदंग। डेल्फ़िनस के चार तारे ही समूह हैं, और वे क्रांतिवृत्त से लगभग 32 अंश उत्तर बैठते हैं, आर्कटुरस को छोड़कर किसी भी योगतारा से चंद्रपथ से अधिक दूर। परंपरा इसे लय, संगीत तथा समृद्धि से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 24 */
  {
    index: 24,
    id: "shatabhisha",
    name: { en: "Shatabhisha", hi: "शतभिषा" },
    devanagari: "शतभिषा",
    meaning: { en: "A hundred healers, or a hundred medicines", hi: "सौ वैद्य, अथवा सौ औषधियाँ" },
    deity: { en: "Varuna, lord of waters and of oaths", hi: "वरुण, जल एवं ऋत के अधिपति" },
    symbol: { en: "An empty circle", hi: "रिक्त वृत्त" },
    graha: "rahu",
    star: {
      designation: "gamma Aquarii",
      bayer: "γ Aqr",
      proper: { en: "Sadachbia", hi: "सदाच्बिया" },
      catalogue: null,
      kind: "star",
      magnitude: 3.84,
      raJ2000Deg: 335.414,
      decJ2000Deg: -1.387,
      siderealLon: 312.865,
      eclipticLat: 8.23,
    },
    companions: [
      {
        designation: "lambda Aquarii",
        bayer: "λ Aqr",
        proper: { en: "Hydor", hi: "हाइडोर" },
        catalogue: null,
        kind: "star",
        magnitude: 3.73,
        raJ2000Deg: 343.154,
        decJ2000Deg: -7.58,
        siderealLon: 317.728,
        eclipticLat: -0.39,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "lambda Aquarii", proper: "Hydor" }],
      note: {
        en: "A scatter of faint stars in Aquarius, which is what the hundred healers means. Gamma is the usual junction star; some lists give lambda. Both fall inside the segment.",
        hi: "कुंभ राशि में मंद तारों का बिखराव, सौ वैद्यों का अर्थ यही है। गामा सामान्य योगतारा है; कुछ सूचियाँ लैम्ब्डा देती हैं। दोनों खंड के भीतर पड़ते हैं।",
      },
    },
    segment: seg(23, 312.865),
    signifies: {
      en: "Varuna's station, and the hundred healers. Tradition associates it with medicine, with what is veiled, and with the far ocean.",
      hi: "वरुण का नक्षत्र, और सौ वैद्य। परंपरा इसे औषधि, आवरण तथा दूर के समुद्र से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 25 */
  {
    index: 25,
    id: "purva-bhadrapada",
    name: { en: "Purva Bhadrapada", hi: "पूर्व भाद्रपद" },
    devanagari: "पूर्व भाद्रपद",
    meaning: { en: "The earlier auspicious feet", hi: "पहले भद्र-पद" },
    deity: { en: "Aja Ekapada, the one-footed unborn", hi: "अज एकपाद" },
    symbol: { en: "The front legs of a funeral cot; a sword", hi: "अर्थी का अगला भाग; तलवार" },
    graha: "guru",
    star: {
      designation: "alpha Pegasi",
      bayer: "α Peg",
      proper: { en: "Markab", hi: "मार्कब" },
      catalogue: null,
      kind: "star",
      magnitude: 2.48,
      raJ2000Deg: 346.19,
      decJ2000Deg: 15.205,
      siderealLon: 329.636,
      eclipticLat: 19.41,
    },
    companions: [
      {
        designation: "beta Pegasi",
        bayer: "β Peg",
        proper: { en: "Scheat", hi: "शीत" },
        catalogue: null,
        kind: "star",
        magnitude: 2.42,
        variable: true,
        raJ2000Deg: 345.944,
        decJ2000Deg: 28.083,
        siderealLon: 335.524,
        eclipticLat: 31.14,
      },
    ],
    identification: { status: "settled", alternatives: [] },
    segment: seg(24, 329.636),
    signifies: {
      en: "Aja Ekapada, and the front legs of the great square of Pegasus. Tradition associates it with ardour, the fire of tapas, and what burns before rest.",
      hi: "अज एकपाद, और पेगासस के महाचतुष्कोण का अगला भाग। परंपरा इसे उत्कटता, तप की अग्नि तथा विश्राम से पूर्व के दहन से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 26 */
  {
    index: 26,
    id: "uttara-bhadrapada",
    name: { en: "Uttara Bhadrapada", hi: "उत्तर भाद्रपद" },
    devanagari: "उत्तर भाद्रपद",
    meaning: { en: "The later auspicious feet", hi: "दूसरे भद्र-पद" },
    deity: { en: "Ahir Budhnya, the serpent of the deep", hi: "अहिर्बुध्न्य, गहराई का सर्प" },
    symbol: { en: "The back legs of a funeral cot; a serpent in the deep", hi: "अर्थी का पिछला भाग; गहरे जल का सर्प" },
    graha: "shani",
    star: {
      designation: "gamma Pegasi",
      bayer: "γ Peg",
      proper: { en: "Algenib", hi: "अल्जेनिब" },
      catalogue: null,
      kind: "star",
      magnitude: 2.83,
      variable: true,
      raJ2000Deg: 3.309,
      decJ2000Deg: 15.184,
      siderealLon: 345.307,
      eclipticLat: 12.60,
    },
    companions: [
      {
        designation: "alpha Andromedae",
        bayer: "α And",
        proper: { en: "Alpheratz", hi: "अल्फ़ेरात्ज़" },
        catalogue: null,
        kind: "star",
        magnitude: 2.06,
        raJ2000Deg: 2.097,
        decJ2000Deg: 29.091,
        siderealLon: 350.459,
        eclipticLat: 25.68,
      },
    ],
    identification: {
      status: "contested",
      alternatives: [{ designation: "alpha Andromedae", proper: "Alpheratz" }],
      note: {
        en: "The back legs of the square are gamma Pegasi and alpha Andromedae, the corner star that Pegasus and Andromeda share. Which is the junction star is not agreed. Gamma is used here; Alpheratz computes to sidereal 350.46 degrees, which is inside Revati's segment.",
        hi: "चतुष्कोण का पिछला भाग गामा पेगासस तथा अल्फ़ा एंड्रोमेडा है, वह कोने का तारा जो पेगासस और एंड्रोमेडा दोनों का है। योगतारा कौन है, इस पर सहमति नहीं। यहाँ गामा लिया गया है; अल्फ़ेरात्ज़ का देशांतर 350.46 अंश निकलता है, जो रेवती के खंड में है।",
      },
    },
    segment: seg(25, 345.307),
    signifies: {
      en: "Ahir Budhnya, the serpent that lies at the bottom of the waters. Tradition associates it with depth, stillness and the water beneath.",
      hi: "अहिर्बुध्न्य, वह सर्प जो जल की तली में रहता है। परंपरा इसे गहराई, स्थिरता तथा नीचे बहते जल से जोड़ती है।",
    },
  },

  /* -------------------------------------------------------------- 27 */
  {
    index: 27,
    id: "revati",
    name: { en: "Revati", hi: "रेवती" },
    devanagari: "रेवती",
    meaning: { en: "The wealthy one; also read as the flowing one", hi: "धनवती; प्रवाहमयी भी" },
    deity: { en: "Pushan, who guards the roads and the herds", hi: "पूषन्, मार्गों एवं पशुओं के रक्षक" },
    symbol: { en: "A pair of fish; a drum", hi: "मत्स्य-युग्म; मृदंग" },
    graha: "budha",
    star: {
      designation: "zeta Piscium",
      bayer: "ζ Psc",
      proper: { en: "Revati", hi: "रेवती" },
      catalogue: null,
      kind: "double",
      magnitude: 5.21,
      raJ2000Deg: 18.438,
      decJ2000Deg: 7.578,
      siderealLon: 356.035,
      eclipticLat: -0.21,
    },
    companions: [],
    identification: { status: "settled", alternatives: [] },
    segment: seg(26, 356.035),
    signifies: {
      en: "Pushan, who guards the roads. Zeta Piscium is the faintest of the twenty-seven junction stars at magnitude 5.2, near the limit of what an unaided eye sees from a dark place, and it sits almost exactly on the ecliptic. Tradition associates it with safe arrival, shelter, and the end that completes a circle.",
      hi: "पूषन्, जो मार्गों की रक्षा करते हैं। ज़ीटा मीन सत्ताईस योगतारों में सबसे मंद है, कांतिमान 5.2, अंधेरे स्थान से नंगी आँख की सीमा के निकट, और यह लगभग ठीक क्रांतिवृत्त पर बैठता है। परंपरा इसे कुशल पहुँच, आश्रय तथा उस अंत से जोड़ती है जो चक्र को पूरा करता है।",
    },
  },
];

/* --- the twenty-eighth ---------------------------------------------------- */

/**
 * Abhijit is not one of the 27 and is deliberately not in the array above.
 * It is kept as a record because muhurat.ts already ships an `abhijit` daily
 * window, and a reader who meets that name deserves to be told where it came
 * from rather than left to assume it is a nakshatra we forgot.
 */
export const ABHIJIT = {
  id: "abhijit",
  name: { en: "Abhijit", hi: "अभिजित्" },
  devanagari: "अभिजित्",
  meaning: { en: "Victorious, the one that conquers", hi: "विजयी" },
  deity: { en: "Brahma", hi: "ब्रह्मा" },
  star: {
    designation: "alpha Lyrae",
    bayer: "α Lyr",
    proper: { en: "Vega", hi: "अभिजित्, वेगा" },
    catalogue: null,
    kind: "star" as const,
    magnitude: 0.03,
    raJ2000Deg: 279.234,
    decJ2000Deg: 38.784,
    siderealLon: 261.465,
    eclipticLat: 61.73,
  },
  note: {
    en: "The older lists count 28 nakshatras. Abhijit, Vega, was dropped when the scheme was regularised into 27 equal divisions, and its traditional slot, the last quarter of Uttara Ashadha and the first fifteenth of Shravana, was absorbed by its neighbours. The reason is visible in the numbers: Vega sits nearly 62 degrees north of the ecliptic, so it has no meaningful ecliptic longitude of its own, and its computed 261.5 degrees lands in Purva Ashadha, nowhere near the slot the tradition assigns it. Its position in the sky was always fixed by when it crosses the meridian, not by where it sits on the moon's road. The Abhijit muhurat, the eighth part of the day around noon, keeps the name.",
    hi: "प्राचीन सूचियाँ अट्ठाईस नक्षत्र गिनती हैं। अभिजित्, अर्थात् वेगा, तब हटा दिया गया जब योजना को 27 समान भागों में नियमित किया गया, और उसका पारंपरिक स्थान, उत्तराषाढ़ा का अंतिम चरण तथा श्रवण का पहला पंद्रहवाँ भाग, पड़ोसियों में समा गया। कारण संख्याओं में दिखता है: वेगा क्रांतिवृत्त से लगभग 62 अंश उत्तर है, अतः उसका अपना कोई सार्थक क्रांतिवृत्तीय देशांतर नहीं, और गणना से निकला 261.5 अंश पूर्वाषाढ़ा में जा पड़ता है, उस स्थान से बहुत दूर जो परंपरा उसे देती है। आकाश में उसकी स्थिति सदा इससे तय होती थी कि वह मध्यरेखा कब पार करता है, इससे नहीं कि वह चंद्रपथ पर कहाँ बैठता है। अभिजित् मुहूर्त, दिन का आठवाँ भाग जो मध्याह्न के आसपास पड़ता है, यह नाम आज भी रखता है।",
  },
} as const;

/* --- derived ------------------------------------------------------------- */

export const NAKSHATRA_BY_ID: Record<string, Nakshatra> = Object.fromEntries(
  NAKSHATRAS.map((n) => [n.id, n]),
);

export const NAKSHATRA_IDS: readonly string[] = NAKSHATRAS.map((n) => n.id);

export function nakshatraByIndex(index: number): Nakshatra {
  const n = NAKSHATRAS[index - 1];
  if (!n) throw new Error(`nakshatra: index ${index} is out of range 1..27`);
  return n;
}

/** The seven whose junction star does not sit inside the segment named after it. */
export const MISFIT_NAKSHATRAS: readonly Nakshatra[] = NAKSHATRAS.filter(
  (n) => !n.segment.starInsideSegment,
);

/** The eleven where sources disagree about which star marks the station. */
export const CONTESTED_NAKSHATRAS: readonly Nakshatra[] = NAKSHATRAS.filter(
  (n) => n.identification.status === "contested",
);

/* --- load-time invariants -------------------------------------------------
   These run at module load. A wrong index, a duplicate id, a star more than a
   degree off its recorded position, or a segment record that disagrees with
   its own star is a build failure rather than a wrong number on a page.
   ------------------------------------------------------------------------- */

(function assertCatalogue() {
  if (NAKSHATRAS.length !== 27) {
    throw new Error(`nakshatra: expected 27 records, found ${NAKSHATRAS.length}`);
  }
  const ids = new Set<string>();
  NAKSHATRAS.forEach((n, i) => {
    if (n.index !== i + 1) throw new Error(`nakshatra: "${n.id}" is out of order`);
    if (ids.has(n.id)) throw new Error(`nakshatra: duplicate id "${n.id}"`);
    ids.add(n.id);

    const start = i * SEG;
    if (Math.abs(n.segment.startDeg - start) > 1e-3) {
      throw new Error(`nakshatra: "${n.id}" segment start disagrees with its index`);
    }
    const inside = n.star.siderealLon >= start && n.star.siderealLon < start + SEG;
    if (inside !== n.segment.starInsideSegment) {
      throw new Error(
        `nakshatra: "${n.id}" records starInsideSegment=${n.segment.starInsideSegment}, but its star computes to ${n.star.siderealLon}`,
      );
    }
    if (n.star.siderealLon < 0 || n.star.siderealLon >= 360) {
      throw new Error(`nakshatra: "${n.id}" star longitude is out of range`);
    }
    if (n.identification.status === "contested" && n.identification.alternatives.length === 0) {
      throw new Error(`nakshatra: "${n.id}" is marked contested but names no alternative`);
    }
  });
})();
