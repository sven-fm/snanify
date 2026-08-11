import { OCCASIONS, type GhatId, type Occasion } from "@/content/muhurat";
import type { Ghat } from "@/content/rivers";
import { DEFAULT_LANG, isFullLang, type FullLang, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Proper nouns, in every locale the site serves.

   The deep content in rivers.ts and muhurat.ts is written in English and Hindi
   only, and that is deliberate: a page of prose about the Godavari at Nashik
   should not exist in a language nobody has written it in. Names are different.
   "গঙ্গা", "கங்கை" and "ಗಂಗಾ" are not translations of "Ganga", they are the
   thing itself as that reader writes it, and they are the words that reader
   would type into a search box. A twelve-locale landing page listing six waters
   in English is leaving the keyword on the table and, worse, telling a Tamil
   reader this river is not theirs.

   So this file carries the names, and only the names. It is the ten locales the
   deep content does not cover; English and Hindi keep living in rivers.ts and
   muhurat.ts, which stay the single source of truth for them.

   TRANSCREATED, NOT TRANSLITERATED. Where a language has its own name for a
   thing, that name is used and a phonetic respelling of the Hindi is not:

     · Tamil calls the Kaveri காவிரி and her source தலைக்காவேரி.
     · Malayalam calls Kodagu കുടക്, which is what Kerala has always called it.
     · Kannada says ಹುಣ್ಣಿಮೆ for a full moon, not a borrowed पूर्णिमा.
     · Gujarati says પૂનમ and અમાસ, which is what a Gujarati almanac prints.
     · Punjabi says ਪੂਰਨਮਾਸ਼ੀ, ਮੱਸਿਆ, ਸੰਗਰਾਂਦ and ਮਾਘੀ, and keeps ਕੱਤਕ for the
       month of Kartik.
     · Assamese keeps কাতি, its own name for that month.
     · Marathi says पौर्णिमा and संक्रांत, never the Hindi forms.

   ADDING AN OCCASION to muhurat.ts without adding it here fails the build. See
   the check at the bottom of this file; a name silently falling back to English
   on nine pages is exactly the sort of thing nobody notices for a year.
   --------------------------------------------------------------------------- */

/** The ten locales that carry names here. English and Hindi live upstream. */
export type SurfaceLang = Exclude<Lang, FullLang>;

/** The four naming fields on a water. Prose fields are not localised here. */
export type WaterField = "river" | "ghat" | "city" | "state";

type Names = Record<SurfaceLang, string>;

const WATERS: Record<GhatId, Record<WaterField, Names>> = {
  "ganga-haridwar": {
    river: {
      bn: "গঙ্গা", mr: "गंगा", te: "గంగా", ta: "கங்கை", gu: "ગંગા",
      kn: "ಗಂಗಾ", ml: "ഗംഗ", or: "ଗଙ୍ଗା", pa: "ਗੰਗਾ", as: "গঙ্গা",
    },
    ghat: {
      bn: "হর কি পৌড়ী", mr: "हर की पौडी", te: "హర్ కీ పౌడీ", ta: "ஹர் கீ பௌடி",
      gu: "હર કી પૌડી", kn: "ಹರ್ ಕಿ ಪೌಡಿ", ml: "ഹർ കി പൗഡി", or: "ହର କି ପଉଡ଼ୀ",
      pa: "ਹਰ ਕੀ ਪੌੜੀ", as: "হৰ কি পৌড়ী",
    },
    city: {
      bn: "হরিদ্বার", mr: "हरिद्वार", te: "హరిద్వార్", ta: "ஹரித்வார்", gu: "હરિદ્વાર",
      kn: "ಹರಿದ್ವಾರ", ml: "ഹരിദ്വാർ", or: "ହରିଦ୍ୱାର", pa: "ਹਰਿਦੁਆਰ", as: "হৰিদ্বাৰ",
    },
    state: {
      bn: "উত্তরাখণ্ড", mr: "उत्तराखंड", te: "ఉత్తరాఖండ్", ta: "உத்தராகண்ட்",
      gu: "ઉત્તરાખંડ", kn: "ಉತ್ತರಾಖಂಡ", ml: "ഉത്തരാഖണ്ഡ്", or: "ଉତ୍ତରାଖଣ୍ଡ",
      pa: "ਉੱਤਰਾਖੰਡ", as: "উত্তৰাখণ্ড",
    },
  },

  "triveni-prayagraj": {
    river: {
      bn: "ত্রিবেণী সঙ্গম", mr: "त्रिवेणी संगम", te: "త్రివేణి సంగమం",
      ta: "திரிவேணி சங்கமம்", gu: "ત્રિવેણી સંગમ", kn: "ತ್ರಿವೇಣಿ ಸಂಗಮ",
      ml: "ത്രിവേണി സംഗമം", or: "ତ୍ରିବେଣୀ ସଙ୍ଗମ", pa: "ਤ੍ਰਿਵੇਣੀ ਸੰਗਮ",
      as: "ত্ৰিবেণী সঙ্গম",
    },
    ghat: {
      bn: "সঙ্গম", mr: "संगम", te: "సంగమం", ta: "சங்கமம்", gu: "સંગમ",
      kn: "ಸಂಗಮ", ml: "സംഗമം", or: "ସଙ୍ଗମ", pa: "ਸੰਗਮ", as: "সঙ্গম",
    },
    city: {
      bn: "প্রয়াগরাজ", mr: "प्रयागराज", te: "ప్రయాగ్‌రాజ్", ta: "பிரயாக்ராஜ்",
      gu: "પ્રયાગરાજ", kn: "ಪ್ರಯಾಗರಾಜ", ml: "പ്രയാഗ്‌രാജ്", or: "ପ୍ରୟାଗରାଜ",
      pa: "ਪ੍ਰਯਾਗਰਾਜ", as: "প্ৰয়াগৰাজ",
    },
    state: {
      bn: "উত্তরপ্রদেশ", mr: "उत्तर प्रदेश", te: "ఉత్తర ప్రదేశ్", ta: "உத்தரப் பிரதேசம்",
      gu: "ઉત્તર પ્રદેશ", kn: "ಉತ್ತರ ಪ್ರದೇಶ", ml: "ഉത്തർ പ്രദേശ്", or: "ଉତ୍ତର ପ୍ରଦେଶ",
      pa: "ਉੱਤਰ ਪ੍ਰਦੇਸ਼", as: "উত্তৰ প্ৰদেশ",
    },
  },

  "yamuna-mathura": {
    river: {
      bn: "যমুনা", mr: "यमुना", te: "యమునా", ta: "யமுனை", gu: "યમુના",
      kn: "ಯಮುನಾ", ml: "യമുന", or: "ଯମୁନା", pa: "ਯਮੁਨਾ", as: "যমুনা",
    },
    ghat: {
      bn: "বিশ্রাম ঘাট", mr: "विश्राम घाट", te: "విశ్రామ్ ఘాట్", ta: "விஸ்ராம் படித்துறை",
      gu: "વિશ્રામ ઘાટ", kn: "ವಿಶ್ರಾಮ ಘಟ್ಟ", ml: "വിശ്രാം ഘട്ട്", or: "ବିଶ୍ରାମ ଘାଟ",
      pa: "ਵਿਸ਼ਰਾਮ ਘਾਟ", as: "বিশ্ৰাম ঘাট",
    },
    city: {
      bn: "মথুরা", mr: "मथुरा", te: "మథుర", ta: "மதுரா", gu: "મથુરા",
      kn: "ಮಥುರಾ", ml: "മഥുര", or: "ମଥୁରା", pa: "ਮਥੁਰਾ", as: "মথুৰা",
    },
    state: {
      bn: "উত্তরপ্রদেশ", mr: "उत्तर प्रदेश", te: "ఉత్తర ప్రదేశ్", ta: "உத்தரப் பிரதேசம்",
      gu: "ઉત્તર પ્રદેશ", kn: "ಉತ್ತರ ಪ್ರದೇಶ", ml: "ഉത്തർ പ്രദേശ്", or: "ଉତ୍ତର ପ୍ରଦେଶ",
      pa: "ਉੱਤਰ ਪ੍ਰਦੇਸ਼", as: "উত্তৰ প্ৰদেশ",
    },
  },

  "godavari-nashik": {
    river: {
      bn: "গোদাবরী", mr: "गोदावरी", te: "గోదావరి", ta: "கோதாவரி", gu: "ગોદાવરી",
      kn: "ಗೋದಾವರಿ", ml: "ഗോദാവരി", or: "ଗୋଦାବରୀ", pa: "ਗੋਦਾਵਰੀ", as: "গোদাবৰী",
    },
    ghat: {
      bn: "রাম কুণ্ড", mr: "रामकुंड", te: "రామ్ కుండ్", ta: "ராம் குண்டம்",
      gu: "રામ કુંડ", kn: "ರಾಮ ಕುಂಡ", ml: "രാം കുണ്ഡ്", or: "ରାମ କୁଣ୍ଡ",
      pa: "ਰਾਮ ਕੁੰਡ", as: "ৰাম কুণ্ড",
    },
    city: {
      bn: "নাসিক", mr: "नाशिक", te: "నాసిక్", ta: "நாசிக்", gu: "નાસિક",
      kn: "ನಾಸಿಕ್", ml: "നാസിക്", or: "ନାସିକ", pa: "ਨਾਸਿਕ", as: "নাচিক",
    },
    state: {
      bn: "মহারাষ্ট্র", mr: "महाराष्ट्र", te: "మహారాష్ట్ర", ta: "மகாராஷ்டிரா",
      gu: "મહારાષ્ટ્ર", kn: "ಮಹಾರಾಷ್ಟ್ರ", ml: "മഹാരാഷ്ട്ര", or: "ମହାରାଷ୍ଟ୍ର",
      pa: "ਮਹਾਰਾਸ਼ਟਰ", as: "মহাৰাষ্ট্ৰ",
    },
  },

  "shipra-ujjain": {
    river: {
      bn: "শিপ্রা", mr: "शिप्रा", te: "శిప్రా", ta: "ஷிப்ரா", gu: "શિપ્રા",
      kn: "ಶಿಪ್ರಾ", ml: "ശിപ്ര", or: "ଶିପ୍ରା", pa: "ਸ਼ਿਪਰਾ", as: "শিপ্ৰা",
    },
    ghat: {
      bn: "রাম ঘাট", mr: "रामघाट", te: "రామ్ ఘాట్", ta: "ராம் படித்துறை",
      gu: "રામ ઘાટ", kn: "ರಾಮ ಘಟ್ಟ", ml: "രാം ഘട്ട്", or: "ରାମ ଘାଟ",
      pa: "ਰਾਮ ਘਾਟ", as: "ৰাম ঘাট",
    },
    city: {
      bn: "উজ্জয়িনী", mr: "उज्जैन", te: "ఉజ్జయిని", ta: "உஜ்ஜயினி", gu: "ઉજ્જૈન",
      kn: "ಉಜ್ಜಯಿನಿ", ml: "ഉജ്ജയിനി", or: "ଉଜ୍ଜୟିନୀ", pa: "ਉਜੈਨ", as: "উজ্জয়িনী",
    },
    state: {
      bn: "মধ্যপ্রদেশ", mr: "मध्य प्रदेश", te: "మధ్య ప్రదేశ్", ta: "மத்தியப் பிரதேசம்",
      gu: "મધ્ય પ્રદેશ", kn: "ಮಧ್ಯ ಪ್ರದೇಶ", ml: "മധ്യപ്രദേശ്", or: "ମଧ୍ୟପ୍ରଦେଶ",
      pa: "ਮੱਧ ਪ੍ਰਦੇਸ਼", as: "মধ্য প্ৰদেশ",
    },
  },

  "kaveri-talakaveri": {
    river: {
      /* Tamil has called her காவிரி for two thousand years of poetry; a
         phonetic respelling of the Hindi would be the wrong word. */
      bn: "কাবেরী", mr: "कावेरी", te: "కావేరి", ta: "காவிரி", gu: "કાવેરી",
      kn: "ಕಾವೇರಿ", ml: "കാവേരി", or: "କାବେରୀ", pa: "ਕਾਵੇਰੀ", as: "কাবেৰী",
    },
    ghat: {
      bn: "তলকাবেরী", mr: "तलकावेरी", te: "తలకావేరి", ta: "தலைக்காவேரி",
      gu: "તલકાવેરી", kn: "ತಲಕಾವೇರಿ", ml: "തലക്കാവേരി", or: "ତଳକାବେରୀ",
      pa: "ਤਲਕਾਵੇਰੀ", as: "তলকাবেৰী",
    },
    city: {
      /* Kerala's own name for Kodagu is കുടക്, and has been long enough that
         the transliteration would read as a foreign place. */
      bn: "কোডাগু", mr: "कोडगू", te: "కొడగు", ta: "கொடகு", gu: "કોડાગુ",
      kn: "ಕೊಡಗು", ml: "കുടക്", or: "କୋଡ଼ଗୁ", pa: "ਕੋਡਗੂ", as: "কোডাগু",
    },
    state: {
      bn: "কর্ণাটক", mr: "कर्नाटक", te: "కర్ణాటక", ta: "கர்நாடகா", gu: "કર્ણાટક",
      kn: "ಕರ್ನಾಟಕ", ml: "കർണാടക", or: "କର୍ଣ୍ଣାଟକ", pa: "ਕਰਨਾਟਕ", as: "কৰ্ণাটক",
    },
  },
};

/**
 * Occasion names. Keyed by the slugs in muhurat.ts; the check at the bottom of
 * this file fails the build if one is missing.
 */
const OCCASION_NAMES: Record<string, Names> = {
  purnima: {
    bn: "পূর্ণিমা", mr: "पौर्णिमा", te: "పౌర్ణమి", ta: "பௌர்ணமி", gu: "પૂનમ",
    kn: "ಹುಣ್ಣಿಮೆ", ml: "പൗർണമി", or: "ପୂର୍ଣ୍ଣିମା", pa: "ਪੂਰਨਮਾਸ਼ੀ", as: "পূৰ্ণিমা",
  },
  amavasya: {
    bn: "অমাবস্যা", mr: "अमावस्या", te: "అమావాస్య", ta: "அமாவாசை", gu: "અમાસ",
    kn: "ಅಮಾವಾಸ್ಯೆ", ml: "അമാവാസി", or: "ଅମାବାସ୍ୟା", pa: "ਮੱਸਿਆ", as: "অমাৱস্যা",
  },
  ekadashi: {
    bn: "একাদশী", mr: "एकादशी", te: "ఏకాదశి", ta: "ஏகாதசி", gu: "એકાદશી",
    kn: "ಏಕಾದಶಿ", ml: "ഏകാദശി", or: "ଏକାଦଶୀ", pa: "ਇਕਾਦਸ਼ੀ", as: "একাদশী",
  },
  sankranti: {
    bn: "সংক্রান্তি", mr: "संक्रांत", te: "సంక్రాంతి", ta: "சங்கராந்தி", gu: "સંક્રાંતિ",
    kn: "ಸಂಕ್ರಾಂತಿ", ml: "സംക്രാന്തി", or: "ସଂକ୍ରାନ୍ତି", pa: "ਸੰਗਰਾਂਦ", as: "সংক্ৰান্তি",
  },
  "pitru-paksha-2026": {
    bn: "পিতৃপক্ষ", mr: "पितृपक्ष", te: "పితృ పక్షం", ta: "பித்ரு பட்சம்",
    gu: "પિતૃ પક્ષ", kn: "ಪಿತೃ ಪಕ್ಷ", ml: "പിതൃപക്ഷം", or: "ପିତୃ ପକ୍ଷ",
    pa: "ਪਿਤਰ ਪੱਖ", as: "পিতৃপক্ষ",
  },
  "tula-sankramana-2026": {
    bn: "তুলা সংক্রমণ", mr: "तुला संक्रमण", te: "తులా సంక్రమణం", ta: "துலா சங்கிரமணம்",
    gu: "તુલા સંક્રમણ", kn: "ತುಲಾ ಸಂಕ್ರಮಣ", ml: "തുലാ സംക്രമം", or: "ତୁଳା ସଂକ୍ରମଣ",
    pa: "ਤੁਲਾ ਸੰਕ੍ਰਮਣ", as: "তুলা সংক্ৰমণ",
  },
  "kartik-snan-2026": {
    bn: "কার্তিক স্নান", mr: "कार्तिक स्नान", te: "కార్తీక స్నానం",
    ta: "கார்த்திகை நீராடல்", gu: "કારતક સ્નાન", kn: "ಕಾರ್ತಿಕ ಸ್ನಾನ",
    ml: "കാർത്തിക സ്നാനം", or: "କାର୍ତ୍ତିକ ସ୍ନାନ", pa: "ਕੱਤਕ ਇਸ਼ਨਾਨ", as: "কাতি স্নান",
  },
  "yam-dwitiya-2026": {
    bn: "যম দ্বিতীয়া", mr: "यम द्वितीया", te: "యమ ద్వితీయ", ta: "யம துவிதியை",
    gu: "યમ દ્વિતીયા", kn: "ಯಮ ದ್ವಿತೀಯ", ml: "യമ ദ്വിതീയ", or: "ଯମ ଦ୍ୱିତୀୟା",
    pa: "ਯਮ ਦੁਤੀਆ", as: "যম দ্বিতীয়া",
  },
  "kartik-purnima-2026": {
    bn: "কার্তিক পূর্ণিমা", mr: "कार्तिक पौर्णिमा", te: "కార్తీక పౌర్ణమి",
    ta: "கார்த்திகை பௌர்ணமி", gu: "કારતકી પૂનમ", kn: "ಕಾರ್ತಿಕ ಹುಣ್ಣಿಮೆ",
    ml: "കാർത്തിക പൗർണമി", or: "କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା", pa: "ਕੱਤਕ ਦੀ ਪੂਰਨਮਾਸ਼ੀ",
    as: "কাতি পূৰ্ণিমা",
  },
  "makar-sankranti-2027": {
    bn: "মকর সংক্রান্তি", mr: "मकर संक्रांत", te: "మకర సంక్రాంతి", ta: "மகர சங்கராந்தி",
    gu: "મકર સંક્રાંતિ", kn: "ಮಕರ ಸಂಕ್ರಾಂತಿ", ml: "മകര സംക്രാന്തി",
    or: "ମକର ସଂକ୍ରାନ୍ତି", pa: "ਮਾਘੀ ਸੰਗਰਾਂਦ", as: "মকৰ সংক্ৰান্তি",
  },
  "magh-snan-2027": {
    bn: "মাঘ স্নান", mr: "माघ स्नान", te: "మాఘ స్నానం", ta: "மாக நீராடல்",
    gu: "માઘ સ્નાન", kn: "ಮಾಘ ಸ್ನಾನ", ml: "മാഘ സ്നാനം", or: "ମାଘ ସ୍ନାନ",
    pa: "ਮਾਘ ਇਸ਼ਨਾਨ", as: "মাঘ স্নান",
  },
  "mahashivratri-2027": {
    bn: "মহাশিবরাত্রি", mr: "महाशिवरात्री", te: "మహాశివరాత్రి", ta: "மகா சிவராத்திரி",
    gu: "મહાશિવરાત્રી", kn: "ಮಹಾಶಿವರಾತ್ರಿ", ml: "മഹാശിവരാത്രി", or: "ମହାଶିବରାତ୍ରି",
    pa: "ਮਹਾਂਸ਼ਿਵਰਾਤਰੀ", as: "মহাশিৱৰাত্ৰি",
  },
  "ganga-dussehra-2027": {
    bn: "গঙ্গা দশহরা", mr: "गंगा दसरा", te: "గంగా దసరా", ta: "கங்கா தசரா",
    gu: "ગંગા દશેરા", kn: "ಗಂಗಾ ದಸರಾ", ml: "ഗംഗാ ദസറ", or: "ଗଙ୍ଗା ଦଶହରା",
    pa: "ਗੰਗਾ ਦੁਸਹਿਰਾ", as: "গঙ্গা দশহৰা",
  },
};

/**
 * The four daily muhurat windows. They appear on /live beside every water, so
 * they are named rather than left in English on nine of the twelve editions.
 */
const WINDOW_NAMES: Record<string, Names> = {
  brahma: {
    bn: "ব্রহ্ম মুহূর্ত", mr: "ब्रह्म मुहूर्त", te: "బ్రహ్మ ముహూర్తం", ta: "பிரம்ம முகூர்த்தம்",
    gu: "બ્રહ્મ મુહૂર્ત", kn: "ಬ್ರಹ್ಮ ಮುಹೂರ್ತ", ml: "ബ്രഹ്മ മുഹൂർത്തം", or: "ବ୍ରହ୍ମ ମୁହୂର୍ତ୍ତ",
    pa: "ਬ੍ਰਹਮ ਮੁਹੂਰਤ", as: "ব্ৰহ্ম মুহূৰ্ত",
  },
  pratah: {
    bn: "প্রাতঃ স্নান", mr: "प्रातः स्नान", te: "ప్రాతః స్నానం", ta: "பிராதః நீராடல்",
    gu: "પ્રાતઃ સ્નાન", kn: "ಪ್ರಾತಃ ಸ್ನಾನ", ml: "പ്രാതഃ സ്നാനം", or: "ପ୍ରାତଃ ସ୍ନାନ",
    pa: "ਪ੍ਰਾਤਃ ਇਸ਼ਨਾਨ", as: "প্ৰাতঃ স্নান",
  },
  abhijit: {
    bn: "অভিজিৎ মুহূর্ত", mr: "अभिजित मुहूर्त", te: "అభిజిత్ ముహూర్తం", ta: "அபிஜித் முகூர்த்தம்",
    gu: "અભિજિત મુહૂર્ત", kn: "ಅಭಿಜಿತ್ ಮುಹೂರ್ತ", ml: "അഭിജിത് മുഹൂർത്തം", or: "ଅଭିଜିତ ମୁହୂର୍ତ୍ତ",
    pa: "ਅਭਿਜਿਤ ਮੁਹੂਰਤ", as: "অভিজিৎ মুহূৰ্ত",
  },
  godhuli: {
    bn: "গোধূলি মুহূর্ত", mr: "गोधूली मुहूर्त", te: "గోధూళి ముహూర్తం", ta: "கோதூளி முகூர்த்தம்",
    gu: "ગોધૂલિ મુહૂર્ત", kn: "ಗೋಧೂಳಿ ಮುಹೂರ್ತ", ml: "ഗോധൂളി മുഹൂർത്തം", or: "ଗୋଧୂଳି ମୁହୂର୍ତ୍ତ",
    pa: "ਗੋਧੂਲੀ ਮੁਹੂਰਤ", as: "গোধূলি মুহূৰ্ত",
  },
};

/* --- readers -------------------------------------------------------------- */

/**
 * A water's name in any locale. English and Hindi come from rivers.ts, which
 * stays their single source of truth; the other ten come from the table above.
 */
export function waterName(ghat: Ghat, field: WaterField, lang: Lang): string {
  if (isFullLang(lang)) return ghat[field][lang];
  return WATERS[ghat.slug as GhatId][field][lang];
}

/** An occasion's name in any locale. */
export function occasionName(occasion: Occasion, lang: Lang): string {
  if (isFullLang(lang)) return occasion.name[lang];
  return OCCASION_NAMES[occasion.slug][lang];
}

/**
 * A daily muhurat window's name in any locale. Takes the bilingual name so the
 * caller keeps its existing lookup and the English and Hindi editions still
 * read from muhurat.ts.
 */
export function windowName(id: string, name: Record<FullLang, string>, lang: Lang): string {
  if (isFullLang(lang)) return name[lang];
  return WINDOW_NAMES[id]?.[lang] ?? name[DEFAULT_LANG];
}

/* --- the guard ------------------------------------------------------------ */

/**
 * An occasion added to muhurat.ts without a row here would print its English
 * name on nine pages and nobody would notice for a year. This runs when the
 * module is first imported, which is during `next build`, so the build fails
 * instead.
 */
const missing = OCCASIONS.filter((o) => !OCCASION_NAMES[o.slug]).map((o) => o.slug);
if (missing.length > 0) {
  throw new Error(
    `content/names: no localised name for occasion(s) ${missing.join(", ")}. ` +
      `Add a row to OCCASION_NAMES for each, in all ten locales.`,
  );
}
