import type { Lang } from "@/lib/content";
import type { FlowBand, Trend, WaterSlug, WeatherId } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /live, the copy.

   Rules this file is written under:

   1. NOTHING IS PERFORMED. No priest stands anywhere, no rite is held, nothing
      happens at any ghat on anyone's behalf, and no sentence here may imply
      that it does. The page reports a river. That is the whole of it.
   2. NOTHING IS PROMISED. No outcome, spiritual or otherwise, is attached to
      reading this page or to anything sold elsewhere on the site.
   3. EVERY NUMBER SAYS WHERE IT CAME FROM. The word "modelled" appears beside
      the flow every time the flow appears, because it is a model output and not
      an instrument reading, and the difference is the difference between a
      publication and a liability.
   4. THE ARCHIVE STARTS IN 1997. The Copernicus reanalysis returns nulls before
      that, so 1997 is the honest floor and no string here says 1991.
   5. HINDI IS WRITTEN, NOT CONVERTED. Rivers take the respectful plural, as
      they do in speech.
   --------------------------------------------------------------------------- */

/**
 * Fill a `{token}` template. A token with no value is left standing rather than
 * blanked, so a missing substitution shows up in review instead of shipping as
 * a hole in a sentence.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

export const liveContent = {
  en: {
    meta: {
      title: "The river, now, six waters live | Snanify",
      description:
        "Modelled discharge, sun, weather and the day's muhurat windows at the Ganga in Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain and the Kaveri at her source. Read fresh, ranked against 1997 to 2025, free to read.",
    },

    badges: {
      live: "Live from six waters",
      cached: "Six waters, the most recent readings",
      normal: "Six waters, the feed did not answer",
    },
    eyebrow: "The river, now",
    title: "Six waters, as they are running.",
    standfirst:
      "The Ganga at Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain, and the Kaveri where she rises. Flow, light, weather and the day's windows, set out here in full, each with the date it carries.",
    subline:
      "Nothing on this page is performed by anyone. It is the river, reported. Reading it costs nothing and always will.",

    assembled: "This edition assembled {time} IST",
    modelledEvery: "The flood model publishes one value per cell per day",

    index: {
      label: "The six, at a glance",
      note: "Each water reads against its own record, never against another water.",
    },

    section: {
      cellLabel: "Grid cell",
      cellNote: "{km} km from the ghat, on the main stem",
      ghatLabel: "Ghat",
    },

    flow: {
      label: "Flow, modelled",
      unit: "m³/s",
      modelledFor: "Modelled for {date}",
      rankLabel: "Where that sits",
      rankSuffix: "against this same week of the year, 1997 to 2025",
      cappedBelow: "at or under the lowest 5 per cent of the record",
      cappedAbove: "at or over the highest 5 per cent of the record",
      normalLabel: "Usual for this week",
      normalBody:
        "Eight of every ten daily values recorded here in this week since 1997 fall between {p10} and {p90} {unit}. The median is {median} {unit}.",
      scaleLabel: "Slack, low, usual, full, spate",
      seriesLabel: "The last eleven model days",
      seriesNote: "One rule per day, oldest at the left. The tallest is the highest of the eleven.",
      trendSince: "against seven days back",
      archiveLine: "{samples} daily values behind every week of the year, {from} to {to}",
    },

    units: {
      mm: "mm",
      kmh: "km/h",
      celsius: "°C",
    },

    bands: {
      slack:
        "{river} is running thin, lower than she runs on nine days out of ten at this turn of the year.",
      low: "{river} is running low, below what this week usually brings her.",
      usual: "{river} is running as she usually runs at this turn of the year.",
      full: "{river} is running full, above what this week usually brings her.",
      spate:
        "{river} is in spate, higher than she runs on nine days out of ten at this turn of the year.",
    } satisfies Record<FlowBand, string>,

    bandWords: {
      slack: "Thin",
      low: "Low",
      usual: "Usual",
      full: "Full",
      spate: "In spate",
    } satisfies Record<FlowBand, string>,

    trends: {
      rising: "Rising {pct} per cent {since}",
      steady: "Steady {since}",
      falling: "Falling {pct} per cent {since}",
    } satisfies Record<Trend, string>,

    trendPlain: {
      rising: "Rising",
      steady: "Steady",
      falling: "Falling",
    } satisfies Record<Trend, string>,

    feed: {
      liveLabel: "Read today",
      staleLabel: "{days} days behind",
      normalLabel: "Not read today",
      liveNote:
        "Published today by the flood model at this cell. The model runs once a day, so this is the newest value that exists.",
      staleNote:
        "The newest value the model has published for this cell is {days} days old. River discharge moves on a scale of days, so it still holds, and the date above is the real one rather than a fresh stamp on an old number.",
      normalNote:
        "We could not reach the flood model. The figure beside this water is what it usually does in this week of the year, taken from 1997 to 2025. It is not a reading, and nothing here pretends it is.",
      normalHeading: "Seasonal normal, not a reading",
    },

    sky: {
      label: "At the ghat",
      sunrise: "Sunrise",
      sunset: "Sunset",
      readAt: "Read {time} IST at the ghat",
      computed: "Computed here from solar geometry. No weather feed reached us this hour.",
      day: "It is day at the ghat",
      night: "It is night at the ghat",
      air: "Air",
      humidity: "Humidity",
      rainHour: "Rain, this hour",
      rainToday: "Rain today",
      cloud: "Cloud",
      wind: "Wind",
      condition: "Sky",
      noWater:
        "No source we can reach publishes water temperature at any of these six places, so none is printed.",
    },

    windows: {
      next: "Next window",
      openNow: "Open now",
      until: "until {time}",
      tomorrow: "tomorrow",
      basis: "Resolved against this ghat's own sunrise, so it differs from the others.",
    },

    weather: {
      clear: "Clear",
      mainlyClear: "Mainly clear",
      partlyCloudy: "Partly cloudy",
      overcast: "Overcast",
      fog: "Fog",
      drizzle: "Drizzle",
      rain: "Rain",
      heavyRain: "Heavy rain",
      showers: "Showers",
      thunder: "Thunderstorm",
      thunderHail: "Thunderstorm with hail",
      snow: "Snow",
      unknown: "Not reported",
    } satisfies Record<WeatherId, string>,

    subjects: {
      "ganga-haridwar": "The Ganga",
      "triveni-prayagraj": "The Ganga below the Sangam",
      "yamuna-mathura": "The Yamuna",
      "godavari-nashik": "The Godavari",
      "shipra-ujjain": "The Shipra",
      "kaveri-talakaveri": "The Kaveri",
    } satisfies Record<WaterSlug, string>,

    reaches: {
      "ganga-haridwar":
        "The Ganga main stem below Har Ki Pauri, where she has finished her descent from the hills.",
      "triveni-prayagraj":
        "The Ganga main stem below the confluence, so this figure carries the Ganga and the Yamuna together.",
      "yamuna-mathura": "The Yamuna main stem below Vishram Ghat.",
      "godavari-nashik": "The Godavari main stem below Ram Kund.",
      "shipra-ujjain": "The Shipra main stem near Ram Ghat.",
      "kaveri-talakaveri": "The Kaveri in her first kilometres below the spring at Talakaveri.",
    } satisfies Record<WaterSlug, string>,

    talakaveri: {
      label: "Read this one differently",
      body: "At Talakaveri the Kaveri is not a river yet. She is a spring in a temple tank, and her figure sits three orders of magnitude under the others because that is the truth of the place and not a fault in the reading. She is compared here only with herself, as every water on this page is.",
    },

    provenance: {
      heading: "How this page knows",
      paras: [
        "Flow is modelled river discharge from the Copernicus Emergency Management Service global flood model, read at the grid cell covering each reach and published once a day. It is a model, not a gauge reading, and this page says modelled every time it prints a number.",
        "The grid cell is not the ghat. Asking the model for a ghat's own coordinates returns whatever hill stream occupies that cell, so each cell here was found by scanning the lattice around the ghat for the trunk river and is then fixed. Every cell is printed above with its distance from the ghat, so you can check where the number was taken.",
        "We rank each value against every daily value that same cell has produced in this same week of the year from 1997 to 2025, six hundred and nine values behind each week. That is what the percentile means. It is a comparison of one water with itself, which is the only honest one: the Kaveri at her source and the Ganga below Haridwar cannot usefully be set side by side.",
        "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates rather than at the grid cell, because weather belongs at the ghat and discharge belongs on the main stem. The muhurat windows are the panchang's rules resolved against that ghat's true sunrise, which is why Haridwar's and Nashik's do not agree.",
        "The Central Water Commission's National Water Data Portal is the register of India's own gauges. We could not obtain a current gauge reading for any of these six reaches from it, so nothing on this page is a CWC measurement, and we would rather write that sentence than let you assume otherwise.",
        "We measure nothing ourselves. We have no camera, no microphone and no device at any ghat, and nobody performs anything for anyone here or anywhere else on this site.",
      ],
      attributionLabel: "Attribution",
      attribution: [
        "River discharge: Copernicus Emergency Management Service, GloFAS, served by Open-Meteo, CC BY 4.0.",
        "Sun and weather: Open-Meteo, CC BY 4.0.",
        "Gauge register: Central Water Commission, National Water Data Portal.",
      ],
    },

    close: {
      eyebrow: "What is free and what is not",
      title: "The reading is free. The snan is not.",
      body: "This page, the panchang, the muhurat calendar and all six waters cost nothing to read and always will. What is sold is a four and a half minute digital snan against this same river data, and nothing else is sold anywhere on this site.",
      links: {
        rivers: "The six waters",
        muhurat: "The muhurat calendar",
        panchang: "The panchang",
      },
    },
  },

  hi: {
    meta: {
      title: "नदी, इस समय, छह जल सीधे | Snanify",
      description:
        "हरिद्वार में गंगा, प्रयागराज में संगम, मथुरा में यमुना, नासिक में गोदावरी, उज्जैन में शिप्रा और अपने उद्गम पर कावेरी: प्रतिरूपित प्रवाह, सूर्य, मौसम और दिन के मुहूर्त। ताज़ा पढ़े गए, 1997 से 2025 के सापेक्ष क्रमित, पढ़ने के लिए निःशुल्क।",
    },

    badges: {
      live: "छह जलों से, इसी क्षण",
      cached: "छह जल, नवीनतम उपलब्ध पाठ",
      normal: "छह जल, स्रोत ने उत्तर नहीं दिया",
    },
    eyebrow: "नदी, इस समय",
    title: "छह जल, जैसे वे बह रहे हैं।",
    standfirst:
      "हरिद्वार में गंगा, प्रयागराज में संगम, मथुरा में यमुना, नासिक में गोदावरी, उज्जैन में शिप्रा, और जहाँ से कावेरी निकलती हैं। बहाव, प्रकाश, मौसम और दिन की बेलाएँ, यहाँ पूरे दर्ज, और हर पाठ के साथ उसकी अपनी तिथि।",
    subline:
      "इस पृष्ठ पर कुछ भी किसी के द्वारा नहीं किया जा रहा है। यह नदी है, जैसी है, वैसी दर्ज। इसे पढ़ना निःशुल्क है और सदा रहेगा।",

    assembled: "यह संस्करण {time} IST पर संकलित",
    modelledEvery: "बाढ़-मॉडल प्रति खंड प्रतिदिन एक मान प्रकाशित करता है",

    index: {
      label: "छहों, एक दृष्टि में",
      note: "प्रत्येक जल की तुलना उसके अपने अभिलेख से है, किसी दूसरे जल से नहीं।",
    },

    section: {
      cellLabel: "ग्रिड खंड",
      cellNote: "घाट से {km} किमी, मुख्य धारा पर",
      ghatLabel: "घाट",
    },

    flow: {
      label: "बहाव, प्रतिरूपित",
      unit: "घन मी/से",
      modelledFor: "{date} के लिए प्रतिरूपित",
      rankLabel: "यह कहाँ बैठता है",
      rankSuffix: "वर्ष के इसी सप्ताह के सापेक्ष, 1997 से 2025 तक",
      cappedBelow: "अभिलेख के निम्नतम 5 प्रतिशत में या उससे नीचे",
      cappedAbove: "अभिलेख के उच्चतम 5 प्रतिशत में या उससे ऊपर",
      normalLabel: "इस सप्ताह का सामान्य",
      normalBody:
        "1997 से इस सप्ताह में यहाँ दर्ज हर दस दैनिक मानों में से आठ {p10} और {p90} {unit} के बीच रहे हैं। मध्यमान {median} {unit} है।",
      scaleLabel: "पतली, कम, सामान्य, भरी, उफान",
      seriesLabel: "पिछले ग्यारह प्रतिरूपित दिन",
      seriesNote: "प्रति दिन एक रेखा, बायीं ओर सबसे पुराना। सबसे ऊँची रेखा ग्यारह में सर्वोच्च है।",
      trendSince: "सात दिन पहले के सापेक्ष",
      archiveLine: "वर्ष के प्रत्येक सप्ताह के पीछे {samples} दैनिक मान, {from} से {to} तक",
    },

    units: {
      mm: "मिमी",
      kmh: "किमी/घंटा",
      celsius: "°से",
    },

    bands: {
      slack: "{river} पतली धार में बह रही हैं, वर्ष के इस मोड़ पर दस में से नौ दिनों से भी कम।",
      low: "{river} कम पानी में बह रही हैं, इस सप्ताह जो सामान्यतः आता है उससे नीचे।",
      usual: "{river} वर्ष के इस मोड़ पर अपने सामान्य बहाव में बह रही हैं।",
      full: "{river} भरी हुई बह रही हैं, इस सप्ताह जो सामान्यतः आता है उससे ऊपर।",
      spate: "{river} उफान पर हैं, वर्ष के इस मोड़ पर दस में से नौ दिनों से भी ऊँची।",
    } satisfies Record<FlowBand, string>,

    bandWords: {
      slack: "पतली",
      low: "कम",
      usual: "सामान्य",
      full: "भरी",
      spate: "उफान",
    } satisfies Record<FlowBand, string>,

    trends: {
      rising: "{since} {pct} प्रतिशत चढ़ी हुई",
      steady: "{since} स्थिर",
      falling: "{since} {pct} प्रतिशत उतरी हुई",
    } satisfies Record<Trend, string>,

    trendPlain: {
      rising: "चढ़ रही",
      steady: "स्थिर",
      falling: "उतर रही",
    } satisfies Record<Trend, string>,

    feed: {
      liveLabel: "आज पढ़ा गया",
      staleLabel: "{days} दिन पीछे",
      normalLabel: "आज नहीं पढ़ा गया",
      liveNote:
        "इस खंड के लिए बाढ़-मॉडल ने आज ही यह मान प्रकाशित किया है। मॉडल दिन में एक बार चलता है, अतः यही नवीनतम उपलब्ध मान है।",
      staleNote:
        "इस खंड के लिए मॉडल का नवीनतम प्रकाशित मान {days} दिन पुराना है। नदी का बहाव दिनों के पैमाने पर बदलता है, इसलिए यह अब भी सही है, और ऊपर दी गई तिथि वास्तविक है, पुराने अंक पर नई मुहर नहीं।",
      normalNote:
        "हम बाढ़-मॉडल तक नहीं पहुँच सके। इस जल के सामने का अंक वह है जो वर्ष के इस सप्ताह में सामान्यतः रहता है, 1997 से 2025 तक से लिया गया। यह कोई पाठ नहीं है, और यहाँ इसे पाठ बताया भी नहीं जा रहा।",
      normalHeading: "ऋतु-सामान्य, पाठ नहीं",
    },

    sky: {
      label: "घाट पर",
      sunrise: "सूर्योदय",
      sunset: "सूर्यास्त",
      readAt: "घाट पर {time} IST पर पढ़ा गया",
      computed: "यहीं सौर ज्यामिति से गणना किया गया। इस घंटे कोई मौसम-स्रोत हम तक नहीं पहुँचा।",
      day: "घाट पर अभी दिन है",
      night: "घाट पर अभी रात है",
      air: "वायु",
      humidity: "आर्द्रता",
      rainHour: "इस घंटे वर्षा",
      rainToday: "आज की वर्षा",
      cloud: "बादल",
      wind: "पवन",
      condition: "आकाश",
      noWater:
        "इन छह में से किसी भी स्थान पर जल का तापमान कोई भी सुलभ स्रोत प्रकाशित नहीं करता, इसलिए वह यहाँ नहीं छापा गया है।",
    },

    windows: {
      next: "अगली बेला",
      openNow: "अभी चल रही",
      until: "{time} तक",
      tomorrow: "कल",
      basis: "इसी घाट के अपने सूर्योदय के सापेक्ष निकाली गई, इसलिए यह शेष से भिन्न है।",
    },

    weather: {
      clear: "स्वच्छ",
      mainlyClear: "प्रायः स्वच्छ",
      partlyCloudy: "आंशिक बादल",
      overcast: "घने बादल",
      fog: "कोहरा",
      drizzle: "फुहार",
      rain: "वर्षा",
      heavyRain: "भारी वर्षा",
      showers: "बौछारें",
      thunder: "गरज के साथ वर्षा",
      thunderHail: "गरज के साथ ओले",
      snow: "हिमपात",
      unknown: "सूचित नहीं",
    } satisfies Record<WeatherId, string>,

    subjects: {
      "ganga-haridwar": "गंगा",
      "triveni-prayagraj": "संगम के नीचे गंगा",
      "yamuna-mathura": "यमुना",
      "godavari-nashik": "गोदावरी",
      "shipra-ujjain": "शिप्रा",
      "kaveri-talakaveri": "कावेरी",
    } satisfies Record<WaterSlug, string>,

    reaches: {
      "ganga-haridwar":
        "हर की पौड़ी के नीचे गंगा की मुख्य धारा, जहाँ वे पर्वतों से अपना उतरना पूरा कर चुकी हैं।",
      "triveni-prayagraj":
        "संगम के नीचे गंगा की मुख्य धारा, अतः यह अंक गंगा और यमुना दोनों को एक साथ लिए हुए है।",
      "yamuna-mathura": "विश्राम घाट के नीचे यमुना की मुख्य धारा।",
      "godavari-nashik": "रामकुंड के नीचे गोदावरी की मुख्य धारा।",
      "shipra-ujjain": "रामघाट के समीप शिप्रा की मुख्य धारा।",
      "kaveri-talakaveri": "तलकावेरी में उद्गम के नीचे कावेरी के पहले कुछ किलोमीटर।",
    } satisfies Record<WaterSlug, string>,

    talakaveri: {
      label: "इसे भिन्न दृष्टि से पढ़िए",
      body: "तलकावेरी में कावेरी अभी नदी नहीं हैं। वे एक मंदिर-कुंड में उद्गम हैं, और उनका अंक शेष जलों से हज़ार गुना छोटा है, क्योंकि स्थान का सत्य यही है, पाठ की चूक नहीं। यहाँ उनकी तुलना केवल उन्हीं से की गई है, जैसे इस पृष्ठ के हर जल की।",
    },

    provenance: {
      heading: "यह पृष्ठ कैसे जानता है",
      paras: [
        "बहाव कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़-मॉडल से लिया गया प्रतिरूपित नदी-प्रवाह है, जो प्रत्येक धारा को ढकने वाले ग्रिड-खंड पर पढ़ा जाता है और दिन में एक बार प्रकाशित होता है। यह एक मॉडल है, गेज का पाठ नहीं, और यह पृष्ठ जब भी कोई अंक छापता है, साथ में प्रतिरूपित कहता है।",
        "ग्रिड-खंड घाट नहीं है। मॉडल से घाट के अपने निर्देशांक पूछने पर वही पहाड़ी नाला मिलता है जो उस खंड में पड़ता है, इसलिए यहाँ हर खंड घाट के चारों ओर की जाली में मुख्य धारा खोजकर निकाला गया और फिर स्थिर कर दिया गया। हर खंड ऊपर घाट से उसकी दूरी सहित छपा है, ताकि आप देख सकें कि अंक कहाँ से लिया गया।",
        "हम प्रत्येक मान की तुलना उसी खंड के उन सभी दैनिक मानों से करते हैं जो 1997 से 2025 तक वर्ष के इसी सप्ताह में आए, प्रत्येक सप्ताह के पीछे छह सौ नौ मान। प्रतिशतक का यही अर्थ है। यह एक जल की तुलना उसी जल से है, और यही एकमात्र ईमानदार तुलना है: अपने उद्गम पर कावेरी और हरिद्वार के नीचे गंगा को आमने-सामने रखना निरर्थक है।",
        "सूर्योदय, सूर्यास्त, वायु का तापमान और वर्षा ग्रिड-खंड पर नहीं, घाट के अपने निर्देशांक पर पढ़े जाते हैं, क्योंकि मौसम घाट का विषय है और प्रवाह मुख्य धारा का। मुहूर्त की बेलाएँ पंचांग के नियमों को उसी घाट के वास्तविक सूर्योदय पर हल करके निकाली गई हैं, इसीलिए हरिद्वार और नासिक की बेलाएँ एक-सी नहीं हैं।",
        "केंद्रीय जल आयोग का राष्ट्रीय जल आँकड़ा पोर्टल भारत के अपने गेजों का रजिस्टर है। हम उससे इन छह में से किसी भी धारा का वर्तमान गेज-पाठ प्राप्त नहीं कर सके, अतः इस पृष्ठ पर कुछ भी केंद्रीय जल आयोग का माप नहीं है, और हम यह वाक्य लिख देना बेहतर समझते हैं बजाय इसके कि आप कुछ और मान लें।",
        "हम स्वयं कुछ नहीं मापते। किसी भी घाट पर हमारा कोई कैमरा, कोई माइक्रोफ़ोन और कोई यंत्र नहीं है, और यहाँ या इस साइट पर कहीं भी कोई व्यक्ति किसी के लिए कुछ नहीं करता।",
      ],
      attributionLabel: "श्रेय",
      attribution: [
        "नदी-प्रवाह: Copernicus Emergency Management Service, GloFAS, Open-Meteo के माध्यम से, CC BY 4.0.",
        "सूर्य एवं मौसम: Open-Meteo, CC BY 4.0.",
        "गेज रजिस्टर: केंद्रीय जल आयोग, राष्ट्रीय जल आँकड़ा पोर्टल।",
      ],
    },

    close: {
      eyebrow: "क्या निःशुल्क है और क्या नहीं",
      title: "पाठ निःशुल्क है। स्नान नहीं।",
      body: "यह पृष्ठ, पंचांग, मुहूर्त-सूची और छहों जल पढ़ने के लिए निःशुल्क हैं और सदा रहेंगे। जो बिकता है वह इन्हीं नदी-आँकड़ों पर चलने वाला साढ़े चार मिनट का डिजिटल स्नान है, और इस साइट पर इसके अतिरिक्त कुछ नहीं बिकता।",
      links: {
        rivers: "छह जल",
        muhurat: "मुहूर्त-सूची",
        panchang: "पंचांग",
      },
    },
  },
} satisfies Record<Lang, unknown>;

export type LiveCopy = (typeof liveContent)["en"];
