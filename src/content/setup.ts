/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /setup, done once.

   Six fields, in the order somebody would fill them if you were sitting next
   to them: which water, a photograph, whose names, which prayer, your own
   sankalp, and when to be reminded. Everything can be changed later.

   THE LABELS DO THE TEACHING. A label and one short hint is the whole
   instruction for a field: somebody here has already paid and read /snan.

   `errors` holds one line per failure key returned by src/lib/profile-input.ts.
   Those keys are the contract between the validator and this file: the
   validator never holds English, and this file never holds logic. An error
   says what went wrong and what to do about it.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Set up your sheet | Snanify",
    description: "Choose your water, add your family's names, and write your sankalp once.",
  },
  title: "Set up your sheet",
  lede: "You do this once. Every morning after it takes three minutes.",
  /** The three-step line at the top: the water, the sheet, the hour. */
  steps: ["Your water", "Your sheet", "Your hour"],

  water: {
    label: "Your water",
    hint: "The one you are from, or the one you are drawn to. You can change it later.",
  },
  portrait: {
    label: "A photograph",
    hint: "Optional. It prints in grey on the sheet.",
    choose: "Choose a photograph",
    change: "Choose another",
    remove: "Remove it",
  },
  names: {
    label: "Names on the sheet",
    hint: "Up to five. Your own name first, then your family.",
    placeholder: "Name",
    add: "Add a name",
  },
  prayer: {
    label: "A prayer",
    hint: "Optional. It is printed under the names, in Devanagari.",
    none: "Without a prayer",
  },
  sankalp: {
    label: "Your sankalp",
    hint: "Your own words, in any language. You read them back every morning.",
    placeholder: "Your sankalp, in your own words",
    remaining: "{n} characters left",
    /** Three to take as they are, or to start from. Tap one and it fills the field. */
    examplesLabel: "Or take one of these",
    examples: [
      "For my mother, every morning this month.",
      "For the family, near and far, and a steady mind.",
      "For my father, who first took me to the river.",
    ],
  },
  reminder: {
    label: "Reminder hour",
    hint: "In your local time. You can change it or stop it on your account page.",
    zone: "Your time zone: {zone}",
  },

  save: "Save and continue",
  saving: "Saving",

  errors: {
    water: "Choose one of the six waters.",
    namesEmpty: "Add at least one name.",
    namesMany: "The sheet holds five names. Remove one.",
    nameLong: "That name is too long for the sheet. Shorten it.",
    nameShape: "Write the name on one line.",
    prayer: "That prayer belongs to another water. Choose one from the list.",
    sankalpEmpty: "Write your sankalp.",
    sankalpLong: "Shorten your sankalp a little so it fits the sheet.",
    hour: "Choose an hour.",
    zone: "Your browser did not send a time zone. Reload the page and save again.",
    portrait: {
      tooLarge: "That photograph is too large. One straight from a phone camera works.",
      notAnImage: "Choose a JPEG, PNG or HEIC photograph.",
      tooManyPixels: "That photograph is too large. One straight from a phone camera works.",
      badCrop: "The photograph could not be read. Choose it again.",
    },
    unknown: "The form did not save. Try once more.",
  },
};

const hi = {
  meta: {
    title: "अपना पत्र तय कीजिए | Snanify",
    description: "अपना जल चुनिए, परिवार के नाम जोड़िए, और अपना संकल्प एक बार लिखिए।",
  },
  title: "अपना पत्र तय कीजिए",
  lede: "यह एक बार करना है। उसके बाद हर सुबह तीन मिनट की है।",
  steps: ["आपका जल", "आपका पत्र", "आपकी घड़ी"],

  water: {
    label: "आपका जल",
    hint: "वही जिससे आप हैं, या जिसकी ओर मन जाता है। बाद में बदला जा सकता है।",
  },
  portrait: {
    label: "एक चित्र",
    hint: "ऐच्छिक। पत्र पर यह श्वेत-श्याम में छपता है।",
    choose: "चित्र चुनिए",
    change: "दूसरा चुनिए",
    remove: "हटाइए",
  },
  names: {
    label: "पत्र पर नाम",
    hint: "अधिकतम पाँच। पहले अपना नाम, फिर अपने परिवार के।",
    placeholder: "नाम",
    add: "एक नाम जोड़िए",
  },
  prayer: {
    label: "एक प्रार्थना",
    hint: "ऐच्छिक। यह नामों के नीचे, देवनागरी में छपती है।",
    none: "बिना प्रार्थना के",
  },
  sankalp: {
    label: "आपका संकल्प",
    hint: "आपके अपने शब्द, किसी भी भाषा में। हर सुबह आप इन्हें पढ़ते हैं।",
    placeholder: "आपका संकल्प, आपके अपने शब्दों में",
    remaining: "{n} अक्षर शेष",
    examplesLabel: "या इनमें से एक लीजिए",
    examples: [
      "मेरी माँ के लिए, इस महीने हर सुबह।",
      "परिवार के लिए, पास और दूर, और स्थिर मन के लिए।",
      "मेरे पिता के लिए, जो मुझे पहली बार नदी पर ले गए।",
    ],
  },
  reminder: {
    label: "सूचना की घड़ी",
    hint: "आपके स्थानीय समय में। खाते के पृष्ठ पर इसे बदल या रोक सकते हैं।",
    zone: "आपका समयक्षेत्र: {zone}",
  },

  save: "सहेजिए और आगे बढ़िए",
  saving: "सहेजा जा रहा है",

  errors: {
    water: "छह जलों में से एक चुनिए।",
    namesEmpty: "कम से कम एक नाम जोड़िए।",
    namesMany: "पत्र पर पाँच नाम आते हैं। एक हटाइए।",
    nameLong: "यह नाम पत्र के लिए बहुत लंबा है। इसे छोटा कीजिए।",
    nameShape: "नाम एक ही पंक्ति में लिखिए।",
    prayer: "यह प्रार्थना दूसरे जल की है। सूची में से एक चुनिए।",
    sankalpEmpty: "अपना संकल्प लिखिए।",
    sankalpLong: "संकल्प थोड़ा छोटा कीजिए, ताकि पत्र पर आ जाए।",
    hour: "एक घड़ी चुनिए।",
    zone: "आपके ब्राउज़र ने समय-क्षेत्र नहीं भेजा। पृष्ठ फिर से खोलकर सहेजिए।",
    portrait: {
      tooLarge: "यह चित्र बहुत बड़ा है। फ़ोन के कैमरे का चित्र चल जाता है।",
      notAnImage: "JPEG, PNG या HEIC चित्र चुनिए।",
      tooManyPixels: "यह चित्र बहुत बड़ा है। फ़ोन के कैमरे का चित्र चल जाता है।",
      badCrop: "चित्र पढ़ा नहीं जा सका। इसे फिर से चुनिए।",
    },
    unknown: "फ़ॉर्म सहेजा नहीं गया। एक बार और कोशिश कीजिए।",
  },
};

export const setupContent = { en, hi } satisfies Record<Lang, typeof en>;
