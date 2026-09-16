import type { GhatId } from "@/content/muhurat";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The prayers offered on /setup, one of which goes on the Sankalp Patra.

   THE RULE THIS FILE IS WRITTEN UNDER: every verse here is a known text with a
   named source. Nothing is composed, adapted, "inspired by", or generated. A
   verse a reader half remembers from their grandmother has to come back to
   them correctly or not at all, and a wrong syllable on a sheet somebody
   frames is the worst bug this product could ship.

   So the list is short and it is the canon: the snana verse that names the
   seven rivers, the Gayatri, the Mahamrityunjaya, Shankara's Ganga stotram,
   the opening of the Yamunashtakam, and the Shiva panchakshara. Each carries
   the work it comes from in `source`, which the /setup page prints under it.

   ADDING ONE. Name the work and the verse number. If neither can be named, it
   does not go in. Per-water verses for the Godavari, the Shipra and the Kaveri
   are the obvious gap, and they stay a gap until somebody who knows those
   traditions supplies them: plan.md carries that as an open
   item for the owner. Until then those waters are offered the verses that name
   them, which the snana verse does for the Godavari and the Kaveri both.

   The romanisation is a reading aid, not scholarship: macrons and dots are
   dropped so a reader who does not read Devanagari can still say the line.
   --------------------------------------------------------------------------- */

export type Prayer = {
  id: string;
  /** The name people know it by. */
  title: Record<Lang, string>;
  /** The verse itself. Printed on the sheet in this script. */
  devanagari: string[];
  /** A reading aid, not a transliteration scheme. */
  roman: string[];
  /** One sentence, plain. Printed under the verse on /setup, never on the sheet. */
  meaning: Record<Lang, string>;
  /** The work it comes from, printed beside it. */
  source: Record<Lang, string>;
  /** The waters it is offered for. "all" means every water. */
  waters: readonly GhatId[] | "all";
};

export const PRAYERS: readonly Prayer[] = [
  {
    id: "sapta-nadi",
    title: {
      en: "The seven rivers",
      hi: "सप्त नदी",
    },
    devanagari: [
      "गङ्गे च यमुने चैव गोदावरि सरस्वति।",
      "नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥",
    ],
    roman: [
      "gange cha yamune chaiva godavari sarasvati",
      "narmade sindhu kaveri jale'smin sannidhim kuru",
    ],
    meaning: {
      en: "Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu, Kaveri: be present in this water.",
      hi: "गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु, कावेरी: इस जल में सन्निहित होइए।",
    },
    source: {
      en: "The snana verse, said at the bath",
      hi: "स्नान श्लोक",
    },
    waters: "all",
  },
  {
    id: "gayatri",
    title: {
      en: "Gayatri",
      hi: "गायत्री",
    },
    devanagari: [
      "ॐ भूर्भुवः स्वः।",
      "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।",
      "धियो यो नः प्रचोदयात्॥",
    ],
    roman: [
      "om bhur bhuvah svah",
      "tat savitur varenyam bhargo devasya dhimahi",
      "dhiyo yo nah prachodayat",
    ],
    meaning: {
      en: "We hold in mind that radiance of the sun. May it set our thoughts moving.",
      hi: "उस सवितृ देव के वरणीय तेज का हम ध्यान करते हैं। वह हमारी बुद्धि को प्रेरित करे।",
    },
    source: {
      en: "Rigveda 3.62.10",
      hi: "ऋग्वेद ३.६२.१०",
    },
    waters: "all",
  },
  {
    id: "mahamrityunjaya",
    title: {
      en: "Mahamrityunjaya",
      hi: "महामृत्युंजय",
    },
    devanagari: [
      "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।",
      "उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    ],
    roman: [
      "om tryambakam yajamahe sugandhim pushtivardhanam",
      "urvarukam iva bandhanan mrityor mukshiya mamritat",
    ],
    meaning: {
      en: "We worship the three-eyed one, who nourishes. As a ripe cucumber slips its stem, may we slip free.",
      hi: "हम त्र्यम्बक की उपासना करते हैं, जो पोषण करते हैं। जैसे पका खरबूजा बंधन से छूटता है, वैसे ही हम मुक्त हों।",
    },
    source: {
      en: "Rigveda 7.59.12",
      hi: "ऋग्वेद ७.५९.१२",
    },
    waters: "all",
  },
  {
    id: "ganga-stotram",
    title: {
      en: "Ganga stotram",
      hi: "गंगा स्तोत्र",
    },
    devanagari: [
      "देवि सुरेश्वरि भगवति गङ्गे",
      "त्रिभुवनतारिणि तरलतरङ्गे।",
      "शङ्करमौलिविहारिणि विमले",
      "मम मतिरास्तां तव पदकमले॥",
    ],
    roman: [
      "devi sureshvari bhagavati gange",
      "tribhuvanatarini taralatarange",
      "shankaramaulivaharini vimale",
      "mama matir astam tava padakamale",
    ],
    meaning: {
      en: "Ganga, whose restless waves carry the three worlds across: let my mind rest at your feet.",
      hi: "हे गंगे, जिनकी चंचल तरंगें तीनों लोकों को पार लगाती हैं: मेरी मति आपके चरणकमलों में रहे।",
    },
    source: {
      en: "Gangashtakam, attributed to Adi Shankaracharya",
      hi: "गंगाष्टकम्, आदि शंकराचार्य",
    },
    waters: ["ganga-haridwar", "triveni-prayagraj"],
  },
  {
    id: "yamunashtakam",
    title: {
      en: "Yamunashtakam",
      hi: "यमुनाष्टक",
    },
    devanagari: [
      "नमामि यमुनामहं सकलसिद्धिहेतुं मुदा",
      "मुरारिपदपङ्कजस्फुरदमन्दरेणूत्कटाम्॥",
    ],
    roman: [
      "namami yamunam aham sakalasiddhihetum muda",
      "muraripadapankajasphurad amandarenutkatam",
    ],
    meaning: {
      en: "Gladly I bow to the Yamuna, thick with the dust of Murari's lotus feet.",
      hi: "मैं प्रसन्न मन से यमुना को नमन करता हूँ, जो मुरारि के चरणकमलों की रज से भरी हैं।",
    },
    source: {
      en: "Yamunashtakam, Vallabhacharya, verse 1",
      hi: "यमुनाष्टकम्, वल्लभाचार्य, श्लोक १",
    },
    waters: ["yamuna-mathura"],
  },
  {
    id: "panchakshara",
    title: {
      en: "Om Namah Shivaya",
      hi: "ॐ नमः शिवाय",
    },
    devanagari: ["ॐ नमः शिवाय॥"],
    roman: ["om namah shivaya"],
    meaning: {
      en: "The five syllables.",
      hi: "पंचाक्षर मंत्र।",
    },
    source: {
      en: "Yajurveda, Shri Rudram",
      hi: "यजुर्वेद, श्री रुद्रम्",
    },
    waters: ["shipra-ujjain", "godavari-nashik"],
  },
] as const;

export const PRAYER_BY_ID: Readonly<Record<string, Prayer>> = Object.fromEntries(
  PRAYERS.map((p) => [p.id, p]),
);

/** The prayers offered for one water, universal ones first. */
export function prayersFor(water: GhatId): Prayer[] {
  return PRAYERS.filter((p) => p.waters === "all" || p.waters.includes(water));
}

/** Whether a submitted prayer id is one this water actually offers. */
export function isPrayerFor(water: GhatId, id: string | null): boolean {
  if (id === null) return true;
  return prayersFor(water).some((p) => p.id === id);
}
