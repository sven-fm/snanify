/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Privacy and terms.

   THESE ARE DRAFTS, AND THEY DESCRIBE WHAT THE CODE ACTUALLY DOES. Every
   sentence here was written against a real line in the repo: the processors
   are the five that hold data, the deletion promise is what
   src/app/[lang]/account/actions.ts performs, the portrait claim is what
   src/lib/portrait.ts and src/lib/blob.ts do, and the sankalp claim is what
   src/lib/patra-view.ts makes structurally true. If any of those change, this
   changes in the same commit.

   They still want a lawyer's eye before launch, and two questions in
   particular are the owner's to answer rather than mine: whether an
   Indian GST registration is needed for selling a digital service to consumers
   in India, and which entity's name and address belong at the foot of these
   pages. Both are marked in build-plan.md section 4.

   WRITTEN TO BE READ. Short sentences, no defined terms, no "the Company".
   Somebody who wants to know whether we keep their photograph should find that
   out in one screen, not by parsing a definition.
   --------------------------------------------------------------------------- */

const en = {
  privacy: {
    meta: {
      title: "Privacy | Snanify",
      description:
        "What Snanify holds, who processes it, how long it stays, and how to have all of it deleted.",
    },
    title: "What we hold",
    lede: "In short: your email address, what you chose to put on your sheet, and one line for each morning you kept. One button deletes all of it.",
    updated: "Version 1, September 2026.",

    sections: [
      {
        h: "What you give us",
        body: [
          "An email address, so you can sign in and so your receipt and your morning reminder reach you.",
          "What goes on your Sankalp Patra: the water you chose, the names you added, a prayer if you picked one, your sankalp, and a photograph if you uploaded one.",
          "Your time zone and the hour you want the river brought to you. The time zone comes from your browser when you fill the form, and it decides when your morning is.",
        ],
      },
      {
        h: "What we make",
        body: [
          "One row for each morning you keep: the date, the water, the river's published figure that day, the sky computed for that instant, and a seed.",
          "A record of what you bought, in which currency, and a ledger of the mornings added and spent. That ledger is how a question about a missing morning gets answered, and how a refund is made.",
        ],
      },
      {
        h: "Your photograph",
        body: [
          "The photograph you upload is never stored as you sent it. It is cropped, turned grey and stripped of its metadata, including the location a phone camera writes into a file, and only that version is kept.",
          "It is stored at a web address nobody can guess, and it appears on your own Sankalp Patra. It is deliberately left off the card that unfurls when somebody pastes your link into a chat.",
        ],
      },
      {
        h: "Your sankalp",
        body: [
          "Your own words are shown to you and to nobody else. They are not on the sheet anyone else can open, not in the link preview, and not returned by any lookup.",
          "We do not open it.",
        ],
      },
      {
        h: "Who else touches it",
        rows: [
          { k: "Stripe", v: "Payments. Card details go to them and never reach us." },
          { k: "Clerk", v: "Sign-in. Holds your email address and your session." },
          { k: "Neon", v: "The database: your profile, your register and your sheets." },
          { k: "Vercel", v: "Hosting, file storage, and page counts with no cookies." },
          { k: "Resend", v: "Your receipt and your morning reminder, and nothing else." },
        ],
      },
      {
        h: "What we never do",
        body: [
          "No advertising script and no session replay anywhere on this site. Nothing records the screen where you type your sankalp.",
          "Your email address is not sold, rented, or given to anybody for their own purposes.",
        ],
      },
      {
        h: "Deleting everything",
        body: [
          "There is a button on your account page. It removes your photograph and your rendered sheets from storage, then your account and every row attached to it, then your sign-in.",
          "Links to your Sankalp Patras stop working, including ones you have already sent. That is the trade, and it is worth knowing before you press it.",
          "Some of it lives on in backups for a short period before those expire, and payment records stay with Stripe for as long as the law requires them to.",
        ],
      },
      {
        h: "Asking us anything",
        body: [
          "Write to hello@snanify.com. If you are in the UK or the EU you have the right to a copy of what we hold, to have it corrected, and to have it deleted, and the delete button is the fastest way to the last one.",
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: "Terms | Snanify",
      description: "What you are buying, what it costs, and how a refund works.",
    },
    title: "What you are buying",
    lede: "A pack of mornings. Each one is three minutes with a river's published figure for the day, and the Sankalp Patra it leaves you.",
    updated: "Version 1, September 2026.",

    sections: [
      {
        h: "What a morning is",
        body: [
          "You choose a water, write your own sankalp, and sit for about three minutes. At the end, a Sankalp Patra is made: a sheet carrying the names you added, the river's published figure for that day, the panchang for that instant, and a seed anyone can recompute.",
          "The practice is yours from start to finish. No rite is performed by anybody, at any ghat, on your behalf, and we claim nothing about what a morning does beyond what is printed on the sheet.",
        ],
      },
      {
        h: "The mornings you buy",
        body: [
          "Packs of one, eleven and sixty. They sit on your account until you use them. Nothing expires and nothing renews itself.",
          "One morning a day per water. Prices are shown in your own currency and before any local tax.",
        ],
      },
      {
        h: "Refunds",
        body: [
          "Any mornings you have not used are refunded in full, on request, without being asked why. Write to hello@snanify.com.",
          "A morning you have already sat is used and is not refundable.",
        ],
      },
      {
        h: "The figures on your sheet",
        body: [
          "River flow is modelled discharge from the Copernicus Emergency Management Service global flood model, read through Open-Meteo, published once a day and licensed CC BY 4.0. It is a model at a calibrated grid cell, not an instrument at the ghat, and every surface says so.",
          "Tithi, nakshatra and the muhurat windows are computed here from the moon's position. Where a timing has no named source behind it yet, it is labelled provisional.",
          "We do not guarantee that an upstream source stays available. If a feed is quiet, your sheet stands on the 1997 to 2025 seasonal median for that week and says that is what it is showing.",
        ],
      },
      {
        h: "Your account",
        body: [
          "Keep your sign-in to yourself. Tell us at hello@snanify.com if you think somebody else has reached it.",
          "We may close an account that is used to harass somebody, to impersonate them, or to break the law. We will say why.",
        ],
      },
      {
        h: "What we can be held to",
        body: [
          "We will run the service with reasonable care. If something goes wrong that is our fault, what we owe you is limited to what you paid us in the twelve months before it.",
          "Nothing here limits anything that cannot be limited by law, including liability for death, personal injury, or fraud.",
        ],
      },
      {
        h: "Changes",
        body: [
          "If these terms change, the version and date at the top change with them, and the mornings you have already bought keep the terms they were bought under.",
          "Write to hello@snanify.com about anything here.",
        ],
      },
    ],
  },
};

const hi = {
  privacy: {
    meta: {
      title: "गोपनीयता | Snanify",
      description:
        "स्नानिफ़ाई क्या रखती है, कौन उसे संभालता है, कितने समय तक, और सब कुछ कैसे मिटाया जाए।",
    },
    title: "हम क्या रखते हैं",
    lede: "संक्षेप में: आपका ईमेल, जो आपने अपने पत्र पर रखना चुना, और हर निभाई हुई सुबह के लिए एक पंक्ति। एक बटन यह सब मिटा देता है।",
    updated: "संस्करण १, सितंबर २०२६।",

    sections: [
      {
        h: "जो आप देते हैं",
        body: [
          "एक ईमेल पता, ताकि आप प्रवेश कर सकें और आपकी रसीद तथा प्रातःकालीन सूचना आप तक पहुँचे।",
          "जो आपके संकल्प पत्र पर जाता है: चुना हुआ जल, जोड़े हुए नाम, कोई प्रार्थना यदि आपने चुनी, आपका संकल्प, और चित्र यदि आपने चढ़ाया।",
          "आपका समय-क्षेत्र और वह घड़ी जिस पर नदी आप तक लाई जाए। समय-क्षेत्र फ़ॉर्म भरते समय आपके ब्राउज़र से आता है, और वही तय करता है कि आपकी सुबह कब है।",
        ],
      },
      {
        h: "जो हम बनाते हैं",
        body: [
          "हर निभाई हुई सुबह के लिए एक पंक्ति: दिनांक, जल, उस दिन नदी का प्रकाशित अंक, उस क्षण का गणना किया आकाश, और एक बीज।",
          "आपने क्या खरीदा और किस मुद्रा में, इसका अभिलेख, तथा जोड़ी और खर्च हुई सुबहों की एक पंजिका। किसी छूटी हुई सुबह का उत्तर उसी पंजिका से मिलता है, और वापसी भी वहीं से होती है।",
        ],
      },
      {
        h: "आपका चित्र",
        body: [
          "आपका चढ़ाया चित्र वैसा कभी नहीं रखा जाता जैसा आपने भेजा। उसे काटा जाता है, श्वेत-श्याम किया जाता है, और उसका मेटाडेटा हटा दिया जाता है, जिसमें वह स्थान भी है जो फ़ोन का कैमरा फ़ाइल में लिख देता है। केवल वही रूप रखा जाता है।",
          "वह ऐसे पते पर रहता है जिसका अनुमान कोई नहीं लगा सकता, और आपके अपने संकल्प पत्र पर दिखता है। जो कार्ड किसी चैट में कड़ी चिपकाने पर खुलता है, उस पर वह जानबूझकर नहीं रखा जाता।",
        ],
      },
      {
        h: "आपका संकल्प",
        body: [
          "आपके अपने शब्द केवल आपको दिखते हैं। वे उस पत्र पर नहीं जो कोई और खोल सकता है, न कड़ी की झलक में, और न किसी खोज के उत्तर में।",
          "हम उसे खोलते नहीं।",
        ],
      },
      {
        h: "और कौन इसे छूता है",
        rows: [
          { k: "Stripe", v: "भुगतान। कार्ड का विवरण उन तक जाता है, हम तक कभी नहीं।" },
          { k: "Clerk", v: "प्रवेश। आपका ईमेल पता और आपका सत्र।" },
          { k: "Neon", v: "आँकड़ा-कोष: आपकी प्रोफ़ाइल, आपकी पंजिका और आपके पत्र।" },
          { k: "Vercel", v: "होस्टिंग, फ़ाइल भंडारण, और बिना कुकी के पृष्ठ-गणना।" },
          { k: "Resend", v: "आपकी रसीद और प्रातःकालीन सूचना, इसके अतिरिक्त कुछ नहीं।" },
        ],
      },
      {
        h: "जो हम कभी नहीं करते",
        body: [
          "इस स्थल पर कहीं कोई विज्ञापन-स्क्रिप्ट नहीं और कोई सत्र-रिकॉर्डिंग नहीं। जिस स्क्रीन पर आप संकल्प लिखते हैं, उसे कुछ भी दर्ज नहीं करता।",
          "आपका ईमेल पता न बेचा जाता है, न किराए पर दिया जाता है, न किसी को उनके अपने प्रयोजन के लिए दिया जाता है।",
        ],
      },
      {
        h: "सब कुछ मिटाना",
        body: [
          "आपके खाते के पृष्ठ पर एक बटन है। वह पहले आपका चित्र और बने हुए पत्र भंडार से हटाता है, फिर आपका खाता और उससे जुड़ी हर पंक्ति, फिर आपका प्रवेश।",
          "आपके संकल्प पत्रों की कड़ियाँ काम करना बंद कर देती हैं, वे भी जो आपने पहले भेजी हैं। यही सौदा है, और दबाने से पहले यह जान लेना ठीक है।",
          "कुछ अंश थोड़े समय तक बैकअप में रहते हैं और फिर समाप्त हो जाते हैं, और भुगतान के अभिलेख Stripe के पास उतने समय रहते हैं जितना कानून कहता है।",
        ],
      },
      {
        h: "कुछ भी पूछना हो",
        body: [
          "hello@snanify.com पर लिखिए। यदि आप ब्रिटेन या यूरोपीय संघ में हैं, तो आपको अधिकार है कि हम जो रखते हैं उसकी प्रति लें, उसे सुधरवाएँ, और मिटवाएँ; मिटाने का सबसे तेज़ रास्ता वही बटन है।",
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: "शर्तें | Snanify",
      description: "आप क्या खरीद रहे हैं, उसका मूल्य क्या है, और वापसी कैसे होती है।",
    },
    title: "आप क्या खरीद रहे हैं",
    lede: "सुबहों का एक पैक। हर सुबह उस दिन नदी के प्रकाशित अंक के साथ तीन मिनट, और जो संकल्प पत्र वह छोड़ जाती है।",
    updated: "संस्करण १, सितंबर २०२६।",

    sections: [
      {
        h: "एक सुबह क्या है",
        body: [
          "आप जल चुनते हैं, अपना संकल्प लिखते हैं, और लगभग तीन मिनट बैठते हैं। अंत में एक संकल्प पत्र बनता है: एक पत्र जिस पर आपके जोड़े हुए नाम, उस दिन नदी का प्रकाशित अंक, उस क्षण का पंचांग, और एक बीज होता है जिसे कोई भी पुनः बना सकता है।",
          "साधना आदि से अंत तक आपकी है। किसी घाट पर, किसी के द्वारा, आपकी ओर से कोई अनुष्ठान नहीं होता, और पत्र पर जो छपा है उससे आगे कुछ नहीं कहा जाता।",
        ],
      },
      {
        h: "जो सुबहें आप खरीदते हैं",
        body: [
          "एक, ग्यारह और साठ के पैक। जब तक आप उन्हें लेते नहीं, वे आपके खाते में रहती हैं। कुछ भी समाप्त नहीं होता और कुछ भी अपने आप नवीनीकृत नहीं होता।",
          "एक जल पर दिन में एक सुबह। मूल्य आपकी अपनी मुद्रा में और स्थानीय कर से पहले दिखाए जाते हैं।",
        ],
      },
      {
        h: "वापसी",
        body: [
          "जो सुबहें आपने ली नहीं, वे कहने भर से पूरी लौटा दी जाती हैं, बिना कारण पूछे। hello@snanify.com पर लिखिए।",
          "जो सुबह आप बैठ चुके, वह ली जा चुकी है और लौटाई नहीं जाती।",
        ],
      },
      {
        h: "आपके पत्र के अंक",
        body: [
          "नदी का प्रवाह कोपरनिकस एमरजेंसी मैनेजमेंट सर्विस के वैश्विक बाढ़-मॉडल से आता है, ओपन-मीटियो के माध्यम से पढ़ा जाता है, दिन में एक बार प्रकाशित होता है, और CC BY 4.0 के अंतर्गत है। वह घाट पर लगे यंत्र का पाठ नहीं, बल्कि एक बैठाए हुए ग्रिड-कोष्ठ पर मॉडल है, और हर जगह यही कहा जाता है।",
          "तिथि, नक्षत्र और मुहूर्त यहीं चंद्रमा की स्थिति से गणना होते हैं। जिस समय के पीछे अभी कोई नामित स्रोत नहीं, वह 'अस्थायी' अंकित रहता है।",
          "हम यह नहीं कह सकते कि कोई बाहरी स्रोत सदा उपलब्ध रहेगा। यदि फ़ीड मौन हो, तो आपका पत्र उस सप्ताह के १९९७ से २०२५ के ऋतु-मध्यक पर टिकता है और यही बताता है कि वह क्या दिखा रहा है।",
        ],
      },
      {
        h: "आपका खाता",
        body: [
          "अपना प्रवेश अपने पास रखिए। यदि लगे कि कोई और उस तक पहुँच गया है, तो hello@snanify.com पर बताइए।",
          "जिस खाते का उपयोग किसी को परेशान करने, किसी का रूप धरने, या कानून तोड़ने के लिए हो, उसे हम बंद कर सकते हैं। कारण भी बताएँगे।",
        ],
      },
      {
        h: "हम किसके लिए उत्तरदायी हैं",
        body: [
          "हम सेवा उचित सावधानी से चलाएँगे। यदि हमारी चूक से कुछ बिगड़े, तो हम पर उतना ही दायित्व है जितना आपने पिछले बारह महीनों में हमें दिया।",
          "यहाँ लिखा कुछ भी उन बातों को सीमित नहीं करता जिन्हें कानून सीमित नहीं होने देता, जिनमें मृत्यु, शारीरिक क्षति या कपट का दायित्व सम्मिलित है।",
        ],
      },
      {
        h: "परिवर्तन",
        body: [
          "ये शर्तें बदलें तो ऊपर का संस्करण और तिथि भी बदलते हैं, और जो सुबहें आप पहले खरीद चुके हैं, वे उन्हीं शर्तों पर रहती हैं जिन पर खरीदी गईं।",
          "इनमें से किसी बात पर hello@snanify.com पर लिखिए।",
        ],
      },
    ],
  },
};

export const legalContent = { en, hi } satisfies Record<Lang, typeof en>;
