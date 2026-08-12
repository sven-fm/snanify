import { isFullLang, type FullLang, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Gregorian month names, in the ten locales the deep content does not cover.

   This lives apart from content/names.ts, which is where every other proper
   noun lives, for one reason: names.ts imports the occasion list from
   muhurat.ts, and muhurat.ts needs these month names for `monthLabel`. Putting
   them together makes a require cycle, and the symptom is a
   "Cannot access before initialization" at build time rather than anything
   that points at the cause. This module imports nothing but the registry.

   Written out rather than taken from `Intl.DateTimeFormat`, which yields a
   different (and sometimes odd) transliteration per runtime and cannot be
   reviewed here.
   --------------------------------------------------------------------------- */

type SurfaceLang = Exclude<Lang, FullLang>;

/** The muhurat calendar is a twelve-month spine, so these are the most
 *  repeated words on the page and the least excusable to leave in English. */
const MONTHS: Record<SurfaceLang, readonly string[]> = {
  bn: ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
  mr: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"],
  te: ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబరు","అక్టోబరు","నవంబరు","డిసెంబరు"],
  ta: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],
  gu: ["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઓગસ્ટ","સપ્ટેમ્બર","ઓક્ટોબર","નવેમ્બર","ડિસેમ્બર"],
  kn: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],
  ml: ["ജനുവരി","ഫെബ്രുവരി","മാർച്ച്","ഏപ്രിൽ","മേയ്","ജൂൺ","ജൂലൈ","ഓഗസ്റ്റ്","സെപ്റ്റംബർ","ഒക്ടോബർ","നവംബർ","ഡിസംബർ"],
  or: ["ଜାନୁଆରୀ","ଫେବୃଆରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ","ମେ","ଜୁନ","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","ଡିସେମ୍ବର"],
  pa: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ"],
  as: ["জানুৱাৰী","ফেব্ৰুৱাৰী","মাৰ্চ","এপ্ৰিল","মে","জুন","জুলাই","আগষ্ট","ছেপ্তেম্বৰ","অক্টোবৰ","নৱেম্বৰ","ডিচেম্বৰ"],
};

/**
 * A Gregorian month name in any locale. `index` is 0 for January. English and
 * Hindi come from the caller, which keeps muhurat.ts their source of truth.
 */
export function monthName(
  index: number,
  lang: Lang,
  full: Record<FullLang, readonly string[]>,
): string {
  return isFullLang(lang) ? full[lang][index] : MONTHS[lang][index];
}
