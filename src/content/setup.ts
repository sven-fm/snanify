import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /setup, done once.

   Six fields, in the order somebody would fill them if you were sitting next
   to them: which water, a photograph, whose names, which prayer, your own
   sankalp, and when to be reminded. Everything can be changed later.

   THE LABELS DO THE TEACHING. A label, and one short hint only where the
   field needs one (the names, the sankalp, the hour), is the whole
   instruction. The headline and the step line say what the page makes, so
   the page carries no intro paragraph. The owner's words, 18 October 2026.

   `autosave` is the quiet note a field shows when a change on a completed
   sheet saves itself (src/lib/autosave.ts).

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
  title: "Set up your sheet.",
  /** The three-step line at the top: the water, the sheet, the hour. */
  steps: ["Your water", "Your sheet", "Your mornings"],

  water: {
    label: "Select your water",
  },
  portrait: {
    label: "Photo (optional)",
    choose: "Choose a photograph",
    change: "Choose another",
    remove: "Remove it",
  },
  names: {
    label: "Your family's names",
    hint: "Up to five. Your own name first.",
    placeholder: "Name",
    add: "Add a name",
  },
  prayer: {
    label: "Select your prayer",
    none: "Without a prayer",
  },
  sankalp: {
    label: "Your own sankalp",
    hint: "Your own words. Read them back every morning.",
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
    label: "Your morning hour",
    hint: "In your local time. Change it any time.",
  },

  save: "Save and continue",
  saving: "Saving",
  autosave: {
    saving: "Saving",
    saved: "Saved",
    failed: "Saving stopped. Your changes are still here.",
    retry: "Try again",
  },

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
    title: "अपना पत्र तैयार कीजिए | Snanify",
    description: "अपना जल चुनिए, परिवार के नाम जोड़िए, और अपना संकल्प एक बार लिखिए।",
  },
  title: "अपना पत्र तैयार कीजिए।",
  steps: ["आपका जल", "आपका पत्र", "आपकी सुबहें"],

  water: {
    label: "अपना जल चुनिए",
  },
  portrait: {
    label: "फ़ोटो (चाहें तो)",
    choose: "चित्र चुनिए",
    change: "दूसरा चुनिए",
    remove: "हटाइए",
  },
  names: {
    label: "परिवार के नाम",
    hint: "पाँच तक। पहले अपना नाम।",
    placeholder: "नाम",
    add: "एक नाम जोड़िए",
  },
  prayer: {
    label: "अपनी प्रार्थना चुनिए",
    none: "बिना प्रार्थना के",
  },
  sankalp: {
    label: "आपका अपना संकल्प",
    hint: "आपके अपने शब्द। हर सुबह इन्हें फिर से पढ़िए।",
    placeholder: "आपका संकल्प, आपके अपने शब्दों में",
    remaining: "{n} अक्षर बाकी",
    examplesLabel: "या इनमें से एक लीजिए",
    examples: [
      "मेरी माँ के लिए, इस महीने हर सुबह।",
      "परिवार के लिए, पास और दूर, और स्थिर मन के लिए।",
      "मेरे पिता के लिए, जो मुझे पहली बार नदी पर ले गए।",
    ],
  },
  reminder: {
    label: "आपकी सुबह का समय",
    hint: "आपके अपने समय के हिसाब से। जब चाहें बदलिए।",
  },

  save: "सहेजिए और आगे बढ़िए",
  saving: "सहेजा जा रहा है",
  autosave: {
    saving: "सहेजा जा रहा है",
    saved: "सहेज लिया गया",
    failed: "सहेजना रुक गया। आपके बदलाव यहीं हैं।",
    retry: "फिर से सहेजिए",
  },

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
