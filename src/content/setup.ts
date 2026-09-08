/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /setup, done once.

   Six fields, in the order somebody would fill them if you were sitting next
   to them: which water, a photograph, whose names, which words, your own vow,
   and when to be reminded. Everything except the vow can be changed later.

   THE LABELS DO THE TEACHING. There is no help text, no tooltip and no
   paragraph explaining what a sankalp is: somebody here has already paid and
   read /snan. A label and one short hint is the whole instruction for a field.

   `errors` holds one line per failure key returned by src/lib/profile-input.ts.
   Those keys are the contract between the validator and this file: the
   validator never holds English, and this file never holds logic.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Set up your sheet · Snanify",
    description: "Choose your water, add your family's names, and write your sankalp once.",
  },
  eyebrow: "Once, at the start",
  title: "What goes on your sheet.",
  lede: "Two minutes, once. Every morning after this takes three.",

  water: {
    label: "Your water",
    hint: "The one you are from, or the one you are drawn to. You can change it later.",
  },
  portrait: {
    label: "A photograph",
    hint: "Optional. It is set in grey on the sheet, the way a printed almanac sets a portrait.",
    choose: "Choose a photograph",
    change: "Choose another",
    remove: "Take it off",
    pending: "Pressing the photograph",
  },
  names: {
    label: "Kept in the name of",
    hint: "Up to five. Your own name first, then whoever else the morning is for.",
    placeholder: "A name",
    add: "Add another name",
  },
  prayer: {
    label: "A prayer for the sheet",
    hint: "Optional. It is printed under the names, in Devanagari.",
    none: "None",
  },
  sankalp: {
    label: "Your sankalp",
    hint: "Your own words, in any language. You will read them back every morning.",
    placeholder: "What you came to say.",
    remaining: "{n} left",
  },
  reminder: {
    label: "Bring me the river at",
    hint: "In your own time, wherever you are. Change it or stop it whenever you like.",
    zone: "Your time zone",
  },

  save: "Save, and begin",
  saving: "Saving",

  errors: {
    water: "Choose one of the six waters.",
    namesEmpty: "At least one name.",
    namesMany: "Five names at most.",
    nameLong: "That name is too long for the sheet.",
    nameShape: "A name goes on one line.",
    prayer: "That prayer is not offered for this water.",
    sankalpEmpty: "Write your sankalp.",
    sankalpLong: "A little shorter, so it fits the sheet.",
    hour: "Choose an hour.",
    zone: "We could not read your time zone. Choose one.",
    portrait: {
      tooLarge: "That photograph is too large. Anything from a phone camera is fine.",
      notAnImage: "That file is not a photograph. JPEG, PNG or HEIC.",
      tooManyPixels: "That photograph is too large. Anything from a phone camera is fine.",
      badCrop: "Something went wrong with the crop. Try again.",
    },
    unknown: "Something went wrong. Try once more.",
  },
};

const hi = {
  meta: {
    title: "अपना पत्र तय कीजिए · Snanify",
    description: "अपना जल चुनिए, परिवार के नाम जोड़िए, और अपना संकल्प एक बार लिखिए।",
  },
  eyebrow: "आरंभ में, एक बार",
  title: "आपके पत्र पर क्या जाएगा।",
  lede: "दो मिनट, एक बार। उसके बाद हर सुबह तीन मिनट की है।",

  water: {
    label: "आपका जल",
    hint: "वही जिससे आप हैं, या जिसकी ओर मन जाता है। बाद में बदला जा सकता है।",
  },
  portrait: {
    label: "एक चित्र",
    hint: "ऐच्छिक। पत्र पर वह श्वेत-श्याम में बैठता है, जैसे छपे पंचांग में चित्र बैठता है।",
    choose: "चित्र चुनिए",
    change: "दूसरा चुनिए",
    remove: "हटा दीजिए",
    pending: "चित्र तैयार हो रहा है",
  },
  names: {
    label: "जिनके नाम से",
    hint: "अधिकतम पाँच। पहले अपना नाम, फिर वे जिनके लिए यह सुबह है।",
    placeholder: "एक नाम",
    add: "एक और नाम जोड़िए",
  },
  prayer: {
    label: "पत्र के लिए एक प्रार्थना",
    hint: "ऐच्छिक। वह नामों के नीचे, देवनागरी में छपती है।",
    none: "कोई नहीं",
  },
  sankalp: {
    label: "आपका संकल्प",
    hint: "आपके अपने शब्द, किसी भी भाषा में। हर सुबह आप इन्हें पढ़ेंगे।",
    placeholder: "जो कहने आए हैं।",
    remaining: "{n} शेष",
  },
  reminder: {
    label: "नदी मेरे पास लाइए",
    hint: "आपके अपने समय पर। जब चाहें बदल दीजिए या रोक दीजिए।",
    zone: "आपका समय-क्षेत्र",
  },

  save: "सहेजिए, और आरंभ कीजिए",
  saving: "सहेजा जा रहा है",

  errors: {
    water: "छह जलों में से एक चुनिए।",
    namesEmpty: "कम से कम एक नाम।",
    namesMany: "अधिकतम पाँच नाम।",
    nameLong: "यह नाम पत्र के लिए बहुत लंबा है।",
    nameShape: "नाम एक ही पंक्ति में आता है।",
    prayer: "यह प्रार्थना इस जल के लिए नहीं है।",
    sankalpEmpty: "अपना संकल्प लिखिए।",
    sankalpLong: "थोड़ा छोटा कीजिए, ताकि पत्र पर बैठ जाए।",
    hour: "एक घड़ी चुनिए।",
    zone: "आपका समय-क्षेत्र पढ़ा नहीं जा सका। एक चुन लीजिए।",
    portrait: {
      tooLarge: "यह चित्र बहुत बड़ा है। फ़ोन के कैमरे का कोई भी चित्र चल जाएगा।",
      notAnImage: "यह फ़ाइल चित्र नहीं है। JPEG, PNG या HEIC।",
      tooManyPixels: "यह चित्र बहुत बड़ा है। फ़ोन के कैमरे का कोई भी चित्र चल जाएगा।",
      badCrop: "काट-छाँट में कुछ गड़बड़ हुई। फिर कोशिश कीजिए।",
    },
    unknown: "कुछ गड़बड़ हुई। एक बार और कोशिश कीजिए।",
  },
};

export const setupContent = { en, hi } satisfies Record<Lang, typeof en>;
