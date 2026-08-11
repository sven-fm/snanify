export type Lang = "en" | "hi";

export const LANGS: Lang[] = ["en", "hi"];

export type Content = (typeof content)["en"];

/* ---------------------------------------------------------------------------
   The landing edition, written for the digital product.

   Two rules govern every string in this file and neither of them is negotiable:

   1. Nothing here claims that a rite was performed. Nobody stands at a ghat,
      nobody recites a name, nothing is recorded and nothing is proved to have
      happened, because none of it does. Every sentence that used to say
      otherwise has been deleted rather than softened.
   2. Nothing here promises an outcome. No punya, no dosha, no sins washed, no
      tier that works better than a cheaper tier. Prices differ by how many
      snans they carry and by nothing else.

   What is left is small and entirely true: a real river, its measured flow this
   hour, the panchang, a four and a half minute form, and the user's own words.

   FIGURES. hero.badge and hero.stats carry the owner's placeholder marketing
   figures. The figures are kept; the labels were rewritten so that each one is
   a statement the reader could go and check:
     · 6            the six waters in rivers.ts
     · 48           two upstream reads an hour against the flood model, per day
     · 1,20,000+    daily river values on the public record since 1991, six
                    waters, several series each. Stated as a floor, deliberately
   The badge reading itself is a placeholder shape until the live spine lands;
   it must be replaced by the real reading, never re-dressed to look fresher.

   PRICES. Paid only, three lines, both ladders always printed together:
     Ek Dhara    $2  / Rs 101    one snan
     Gyarah      $11 / Rs 501    eleven, exactly a dollar a snan, the hero SKU
     Varsh Kosh  $48 / Rs 2,100  sixty, eighty cents a snan
   The per snan figures in tiers[].rows are arithmetic on those numbers:
   501/11 = 46, 2100/60 = 35, 48/60 = 0.80. Change a price and change those in
   the same commit, in both locales, or the page starts contradicting itself.
   Content is free. The snan is paid. There is no free snan tier.
   --------------------------------------------------------------------------- */

export const content = {
  en: {
    htmlLang: "en",
    dir: "ltr" as const,
    meta: {
      title: "Snanify, the river comes to you",
      description:
        "A digital snan. No priest, no ghat, nothing performed on your behalf by anyone. Four and a half minutes with a sacred river's real measured flow this hour, and your own sankalp in your own words.",
    },
    switchLabel: "हिंदी",
    switchHref: "/hi",
    themeLabel: "Change theme",
    nav: {
      how: "How it works",
      rivers: "Sacred waters",
      muhurat: "Muhurat",
      pricing: "Tariff",
      cta: "Begin a snan",
      menu: "Menu",
    },
    hero: {
      badge: "Ganga at Haridwar · 1,444 m³/s · read 06:00 IST",
      titleA: "The river",
      titleB: "comes to you.",
      lede: "A digital snan, and nothing more than that. No priest, no ghat, nothing performed for you by anyone. Four and a half minutes with a sacred river's real, measured flow this hour, and your own sankalp, said by you in your own words.",
      ctaPrimary: "Begin a snan",
      ctaSecondary: "What the 4:30 holds",
      offer:
        "One snan is $2, or ₹101. Eleven are $11, or ₹501, which is exactly a dollar a snan. The river's reading, the panchang and all six waters cost nothing and never will.",
      card: {
        label: "The river, now",
        title: "Ganga, Har Ki Pauri",
        rows: [
          { k: "Flow", v: "1,444 m³/s, running as she usually runs" },
          { k: "Ranked", v: "41st percentile against this week since 1991" },
          { k: "Read", v: "06:00 IST, modelled discharge" },
          { k: "Next muhurat", v: "Brahma Muhurat, 04:24 IST" },
        ],
        link: "All six waters, live",
      },
      stats: [
        { n: "6", l: "waters, read every hour" },
        { n: "48", l: "reads a day from the flood model" },
        { n: "1,20,000+", l: "daily river values on record since 1991" },
      ],
    },
    rivers: {
      eyebrow: "Sacred waters",
      title: "Six waters. One sankalp.",
      lede: "The Ganga at Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain, and the Kaveri where she begins. Each water has its own page, its own occasions and its own reading this hour. Nobody is standing in any of them on your behalf, and none of it costs anything to read.",
    },
    how: {
      eyebrow: "How it works",
      title: "Write it once. Come back tomorrow.",
      steps: [
        {
          n: "01",
          t: "Once, at the start",
          d: "Your name, your gotra if your family keeps one, and the thing you came to say, in your own words. You write it once. You never type it again.",
        },
        {
          n: "02",
          t: "Every morning",
          d: "Four and a half minutes at an hour the panchang names. The river's flow this hour, six breaths at its rhythm, your own words held under your thumb, and ninety seconds of dark.",
        },
        {
          n: "03",
          t: "What you keep",
          d: "One ruled line in your register, and a Jal Chihna: a sheet carrying the water, the minute, and the reading the river was published at. A stranger can check that reading against the public record.",
        },
      ],
    },
    form: {
      eyebrow: "The form",
      title: "Four and a half minutes, five limbs, the same every day.",
      lede: "Two hundred and seventy seconds, in the same five parts, in the same order, at the same lengths, forever. Only the river changes, and it changes on its own.",
      limbs: [
        {
          clock: "0:04",
          name: "The Reading",
          alt: "जल-पाठ",
          len: "21 seconds",
          d: "Five almanac lines print themselves, one every four seconds: the water, its flow this hour, where that sits against thirty-five years of the same week, the minute it was read, and how far you are standing from it. A hairline waterline sits at the river's true level.",
        },
        {
          clock: "0:25",
          name: "The Breath",
          alt: "श्वास",
          len: "60 seconds",
          d: "The waterline rises for four seconds and falls for six, six times over. The words in and out appear on the first two breaths and then never again. How far it rises is set by today's flow, so a full river breathes bigger than a thin one.",
        },
        {
          clock: "1:25",
          name: "The Sankalp",
          alt: "संकल्प",
          len: "60 seconds",
          d: "The water stills and your own words are already there, waiting to be read back. Press and hold, and the text fills with vermillion over eleven seconds. Let go early and the ink drains back. Nothing scolds you. You begin again.",
        },
        {
          clock: "2:25",
          name: "The Stillness",
          alt: "मौन",
          len: "90 seconds",
          d: "The screen goes black. Not dimmed, black. Put the phone down, face down if you like. The river keeps running in your ears, and nothing counts you, measures you or watches whether you moved.",
        },
        {
          clock: "3:55",
          name: "The Mark",
          alt: "चिह्न",
          len: "35 seconds",
          d: "The screen returns at a fifth of its brightness and the morning writes itself into your register as one ruled line. Beneath it, the count of mornings kept, and what the river has done since your first one.",
        },
      ],
      pull: {
        label: "The ninety seconds",
        title: "A minute and a half of it is a black screen.",
        body: "For ninety of the two hundred and seventy seconds, this shows you nothing at all. The screen dims itself out, the river keeps playing, and the phone goes face down on the table. The best part of the product is the part where you are not looking at it. Nobody guesses that from the outside, which is why it is printed here.",
      },
      note: "There is no progress bar anywhere in the form and there is no quick mode. A practice you can set to quick is a preference, not a practice. If you are late, do it anyway; it is four and a half minutes.",
    },
    muhurat: {
      eyebrow: "The calendar",
      title: "Days the water listens.",
      lede: "Occasions open months ahead. Timings follow the panchang, printed in IST and in the hours you actually keep, and every occasion has its own page. All of it is free to read.",
      heads: {
        occasion: "Occasion",
        reckoning: "Reckoning",
        window: "Window",
      },
      note: "Provisional until the panchang confirms them. The calendar is free, has no account behind it, and will stay that way.",
    },
    pricing: {
      eyebrow: "The tariff",
      title: "The content is free. The snan is paid.",
      lede: "Everything you can read here costs nothing and always will: the live state of all six waters, the panchang, every muhurat and every occasion in the year. The snan is the paid thing. Two dollars for one, a dollar each if you take eleven. There is no free snan, and no snan on this page works better than any other one.",
      free: {
        label: "Free, and it stays free",
        items: [
          {
            name: "The river, now",
            d: "All six waters, the flow at each this hour, and where that sits against thirty-five years of the same week.",
            href: "/rivers",
          },
          {
            name: "The panchang",
            d: "Tithi, paksha and nakshatra, with the day's windows in IST and in your own hours.",
            href: "/panchang",
          },
          {
            name: "Muhurat",
            d: "Every named occasion in the year, each with its own page and its own reckoning.",
            href: "/muhurat",
          },
        ],
        note: "No account, no card, no trial that runs out.",
      },
      heads: { world: "Vishwa Dar", india: "Bharat Dar" },
      tiers: [
        {
          name: "Ek Dhara",
          alt: "एक धारा",
          sub: "One snan",
          flag: "",
          world: "$2",
          india: "₹101",
          body: "One dhara: the full four and a half minutes, one ruled line in your register, and the Jal Chihna that comes out of it. Take this if you came for a single morning and want to see what this actually is.",
          rows: [
            { k: "Snans", v: "One" },
            { k: "Each snan", v: "$2 · ₹101" },
            { k: "Expiry", v: "None" },
          ],
        },
        {
          name: "Gyarah",
          alt: "ग्यारह",
          sub: "Eleven snans",
          flag: "The one to take",
          world: "$11",
          india: "₹501",
          body: "Eleven snans, bought once, at exactly one dollar each. Spend them the way a year actually runs: one on every amavasya, eleven mornings in a row, or the eleven occasions that matter in your family. They do not expire and nothing renews.",
          rows: [
            { k: "Snans", v: "Eleven" },
            { k: "Each snan", v: "$1 · ₹46" },
            { k: "Expiry", v: "None" },
          ],
        },
        {
          name: "Varsh Kosh",
          alt: "वर्ष कोष",
          sub: "Sixty snans",
          flag: "",
          world: "$48",
          india: "₹2,100",
          body: "Sixty snans, which is five mornings a month for a year, at eighty cents each. This is as low as the price goes. It is a store of snans and not a subscription: nothing renews, and you are never charged a second time.",
          rows: [
            { k: "Snans", v: "Sixty" },
            { k: "Each snan", v: "$0.80 · ₹35" },
            { k: "Expiry", v: "None" },
          ],
        },
      ],
      ladders: {
        label: "Why two prices are printed",
        body: [
          "The morning costs the same to serve whether you are in Ujjain or in New Jersey. The price is not the cost. Five hundred rupees is a considered amount in one place and lunch in the other, and a single number would shut one of them out.",
          "So both ladders are printed above, in full, on the same page. Which one you are charged is decided by the instrument you pay with: an Indian card or a UPI address pays the rupee price, wherever in the world you are standing that morning. We do not read your location, we do not infer it from your name, and the price you were shown before you entered any payment detail is the price you are charged. There is no third price, no code to ask for, and nothing to negotiate.",
        ],
      },
      truth: {
        label: "What you are buying, exactly",
        body: "A digital practice. No priest. No ghat. Nothing performed anywhere, by anyone, on your behalf. The river is real, its reading is real, the words are yours. That is the whole product, and it is enough.",
      },
      note: "Prices are shown before any tax charged where you live. No snan here promises an outcome, and no amount of money buys a better one.",
      cta: "The tariff in full",
    },
    notFound: {
      code: "404",
      title: "This path does not reach the water.",
      lede: "The page you were looking for is not here. The river, however, is exactly where it has always been.",
      cta: "Return home",
    },
    closing: {
      title: "Wherever you stand, the water is already there.",
      lede: "The river is at its own level tonight, whether anyone is watching or not. You can be one of the people watching.",
      cta: "Begin a snan",
    },
    bar: {
      label: "Eleven snans",
      price: "$11 · ₹501",
      cta: "Begin",
    },
    footer: {
      tagline: "A digital snan for Indians everywhere.",
      cols: [
        { h: "Service", links: ["Sacred waters", "The river now", "Muhurat calendar", "Jal Chihna"] },
        { h: "Company", links: ["About", "Manifesto", "Press", "Contact"] },
        { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
      ],
      made: "Made with reverence · Prayagraj & Berlin",
      rights: "© 2026 Snanify",
    },
  },

  hi: {
    htmlLang: "hi",
    dir: "ltr" as const,
    meta: {
      title: "स्नानिफ़ाई, नदी आप तक आती है",
      description:
        "एक डिजिटल स्नान। न कोई पुरोहित, न कोई घाट, आपकी ओर से कहीं कुछ नहीं किया जाता। साढ़े चार मिनट, एक पवित्र नदी के इस घंटे के वास्तविक मापे हुए बहाव के साथ, और आपका अपना संकल्प, आपके ही शब्दों में।",
    },
    switchLabel: "English",
    switchHref: "/",
    themeLabel: "थीम बदलें",
    nav: {
      how: "कैसे काम करता है",
      rivers: "पवित्र जल",
      muhurat: "मुहूर्त",
      pricing: "शुल्क-सूची",
      cta: "स्नान आरंभ करें",
      menu: "मेन्यू",
    },
    hero: {
      badge: "हरिद्वार में गंगा · १,४४४ घन मी/से · ०६:०० भा.मा.स.",
      titleA: "नदी",
      titleB: "आप तक आती है।",
      lede: "एक डिजिटल स्नान, इससे अधिक कुछ नहीं। न कोई पुरोहित, न कोई घाट, आपकी ओर से कोई कुछ नहीं करता। साढ़े चार मिनट, एक पवित्र नदी के इस घंटे के वास्तविक, मापे हुए बहाव के साथ, और आपका अपना संकल्प, आपके ही शब्दों में।",
      ctaPrimary: "स्नान आरंभ करें",
      ctaSecondary: "उन साढ़े चार मिनटों में क्या",
      offer:
        "एक स्नान $2, अर्थात ₹101। ग्यारह स्नान $11, अर्थात ₹501, यानी ठीक एक डॉलर प्रति स्नान। नदी का पाठ, पंचांग और छहों जल निःशुल्क हैं और रहेंगे।",
      card: {
        label: "नदी, इस समय",
        title: "गंगा, हर की पौड़ी",
        rows: [
          { k: "बहाव", v: "१,४४४ घन मी/से, अपने सामान्य बहाव में" },
          { k: "स्थान", v: "१९९१ से इसी सप्ताह के सामने ४१वाँ प्रतिशतक" },
          { k: "पाठ", v: "०६:०० भा.मा.स., मॉडल से आकलित बहाव" },
          { k: "अगला मुहूर्त", v: "ब्रह्म मुहूर्त, ०४:२४" },
        ],
        link: "छहों जल, सजीव",
      },
      stats: [
        { n: "६", l: "जल, हर घंटे पढ़े जाते हैं" },
        { n: "४८", l: "बाढ़ मॉडल से प्रतिदिन पाठ" },
        { n: "१,२०,०००+", l: "१९९१ से अभिलेख में दैनिक जल-मान" },
      ],
    },
    rivers: {
      eyebrow: "पवित्र जल",
      title: "छह जल। एक संकल्प।",
      lede: "हरिद्वार में गंगा, प्रयागराज में संगम, मथुरा में यमुना, नासिक में गोदावरी, उज्जैन में शिप्रा, और अपने उद्गम पर कावेरी। हर जल का अपना पृष्ठ है, अपने पर्व हैं और इस घंटे का अपना पाठ है। आपकी ओर से इनमें कोई खड़ा नहीं होता, और इन्हें पढ़ने का कोई शुल्क नहीं।",
    },
    how: {
      eyebrow: "कैसे काम करता है",
      title: "एक बार लिखिए। कल फिर आइए।",
      steps: [
        {
          n: "०१",
          t: "आरंभ में, एक बार",
          d: "अपना नाम, गोत्र यदि आपके परिवार में चलता हो, और जो कहने आए हैं वह, अपने ही शब्दों में। यह एक बार लिखा जाता है। इसके बाद कभी टाइप नहीं करना पड़ता।",
        },
        {
          n: "०२",
          t: "हर सुबह",
          d: "पंचांग जिस घड़ी को नाम देता है, उसी घड़ी साढ़े चार मिनट। इस घंटे नदी का बहाव, उसी लय में छह साँसें, अपने ही शब्द अंगूठे के नीचे थमे हुए, और नब्बे सेकंड का अंधकार।",
        },
        {
          n: "०३",
          t: "जो आपके पास रहता है",
          d: "आपकी पंजिका में एक पंक्ति, और एक जल चिह्न: वह पत्रक जिस पर जल, वह क्षण और उस समय प्रकाशित पाठ अंकित रहता है। वह पाठ सार्वजनिक अभिलेख से कोई भी मिला सकता है।",
        },
      ],
    },
    form: {
      eyebrow: "स्वरूप",
      title: "साढ़े चार मिनट, पाँच अंग, हर दिन वही।",
      lede: "दो सौ सत्तर सेकंड, उन्हीं पाँच भागों में, उसी क्रम में, उतनी ही अवधि के, सदा। केवल नदी बदलती है, और वह स्वयं बदलती है।",
      limbs: [
        {
          clock: "०:०४",
          name: "जल-पाठ",
          alt: "The Reading",
          len: "२१ सेकंड",
          d: "पाँच पंक्तियाँ पंचांग की तरह छपती हैं, हर चार सेकंड पर एक: जल, इस घंटे का बहाव, वर्ष के इसी सप्ताह के पैंतीस वर्षों के सामने उसका स्थान, पाठ का क्षण, और आप उस जल से कितनी दूर खड़े हैं। एक महीन जलरेखा नदी के वास्तविक स्तर पर ठहरी रहती है।",
        },
        {
          clock: "०:२५",
          name: "श्वास",
          alt: "The Breath",
          len: "६० सेकंड",
          d: "जलरेखा चार सेकंड चढ़ती है और छह सेकंड उतरती है, छह बार। भीतर और बाहर, ये दो शब्द पहली दो साँसों पर दिखते हैं, फिर कभी नहीं। रेखा कितनी ऊपर जाएगी यह आज के बहाव से तय होता है, इसलिए भरी नदी पतली नदी से बड़ी साँस लेती है।",
        },
        {
          clock: "१:२५",
          name: "संकल्प",
          alt: "The Sankalp",
          len: "६० सेकंड",
          d: "जल ठहर जाता है और आपके अपने शब्द पहले से वहीं रहते हैं, दोहराए जाने की प्रतीक्षा में। दबाकर थामिए, और ग्यारह सेकंड में अक्षर सिंदूरी रंग से भर जाते हैं। जल्दी छोड़ दिया तो स्याही लौट जाती है। कोई डाँट नहीं। आप फिर से आरंभ करते हैं।",
        },
        {
          clock: "२:२५",
          name: "मौन",
          alt: "The Stillness",
          len: "९० सेकंड",
          d: "स्क्रीन काली हो जाती है। मंद नहीं, पूरी काली। फ़ोन नीचे रख दीजिए, चाहें तो उल्टा। नदी कानों में बहती रहती है, और कुछ भी आपको गिनता, नापता या यह देखता नहीं कि आप हिले या नहीं।",
        },
        {
          clock: "३:५५",
          name: "चिह्न",
          alt: "The Mark",
          len: "३५ सेकंड",
          d: "स्क्रीन पाँचवें हिस्से की चमक पर लौटती है और वह सुबह आपकी पंजिका में एक पंक्ति बनकर लिख जाती है। नीचे निभाई गई सुबहों की गणना, और यह कि आपकी पहली सुबह से नदी ने क्या किया है।",
        },
      ],
      pull: {
        label: "वे नब्बे सेकंड",
        title: "इसमें डेढ़ मिनट केवल काली स्क्रीन है।",
        body: "दो सौ सत्तर में से नब्बे सेकंड यह आपको कुछ भी नहीं दिखाता। स्क्रीन स्वयं बुझ जाती है, नदी बजती रहती है, और फ़ोन मेज़ पर उल्टा रख दिया जाता है। इस उत्पाद का सबसे अच्छा हिस्सा वही है जब आप स्क्रीन देख ही नहीं रहे होते। बाहर से इसका अनुमान कोई नहीं लगाता, इसीलिए यह यहाँ छपा है।",
      },
      note: "इस पूरे स्वरूप में कहीं कोई प्रगति-पट्टी नहीं है, और कोई शीघ्र रूप नहीं है। जिस विधि को आप छोटा कर सकें वह पसंद होती है, साधना नहीं। देर हो गई हो तो भी कर लीजिए; यह साढ़े चार मिनट का है।",
    },
    muhurat: {
      eyebrow: "पंचांग",
      title: "जिन दिनों जल सुनता है।",
      lede: "पर्व महीनों पहले खुलते हैं। समय पंचांग के अनुसार, भा.मा.स. और आपके अपने घंटों दोनों में छपा हुआ, और हर पर्व का अपना पृष्ठ। यह सब पढ़ने के लिए निःशुल्क है।",
      heads: {
        occasion: "पर्व",
        reckoning: "विवरण",
        window: "काल",
      },
      note: "पंचांग से पुष्ट होने तक अस्थायी। यह पंचांग निःशुल्क है, इसके पीछे कोई खाता नहीं है, और ऐसा ही रहेगा।",
    },
    pricing: {
      eyebrow: "शुल्क-सूची",
      title: "पढ़ने की सामग्री निःशुल्क। स्नान सशुल्क।",
      lede: "यहाँ जो कुछ पढ़ा जा सकता है वह निःशुल्क है और सदा रहेगा: छहों जलों की सजीव स्थिति, पंचांग, हर मुहूर्त और वर्ष का हर पर्व। स्नान सशुल्क है। एक के लिए दो डॉलर, और ग्यारह लें तो एक-एक डॉलर। कोई निःशुल्क स्नान नहीं है, और इस पृष्ठ पर कोई स्नान किसी दूसरे से बढ़कर काम नहीं करता।",
      free: {
        label: "निःशुल्क, और निःशुल्क ही रहेगा",
        items: [
          {
            name: "नदी, इस समय",
            d: "छहों जल, हर एक का इस घंटे का बहाव, और पैंतीस वर्षों के इसी सप्ताह के सामने उसका स्थान।",
            href: "/rivers",
          },
          {
            name: "पंचांग",
            d: "तिथि, पक्ष और नक्षत्र, तथा दिन के काल भा.मा.स. और आपके अपने घंटों में।",
            href: "/panchang",
          },
          {
            name: "मुहूर्त",
            d: "वर्ष का हर नामित पर्व, हर एक का अपना पृष्ठ और अपनी गणना।",
            href: "/muhurat",
          },
        ],
        note: "न खाता, न कार्ड, न कोई परीक्षण अवधि जो समाप्त हो जाए।",
      },
      heads: { world: "विश्व दर", india: "भारत दर" },
      tiers: [
        {
          name: "एक धारा",
          alt: "Ek Dhara",
          sub: "एक स्नान",
          flag: "",
          world: "$2",
          india: "₹101",
          body: "एक धारा: पूरे साढ़े चार मिनट, पंजिका में एक पंक्ति, और उससे निकला जल चिह्न। यदि आप एक ही सुबह के लिए आए हैं और देखना चाहते हैं कि यह वास्तव में क्या है, तो यही लीजिए।",
          rows: [
            { k: "स्नान", v: "एक" },
            { k: "प्रति स्नान", v: "$2 · ₹101" },
            { k: "अवधि", v: "समाप्त नहीं होता" },
          ],
        },
        {
          name: "ग्यारह",
          alt: "Gyarah",
          sub: "ग्यारह स्नान",
          flag: "यही लेना चाहिए",
          world: "$11",
          india: "₹501",
          body: "ग्यारह स्नान, एक ही बार में, ठीक एक डॉलर प्रति स्नान। इन्हें वैसे ही खर्च कीजिए जैसे वर्ष चलता है: हर अमावस्या पर एक, लगातार ग्यारह सुबहें, अथवा वे ग्यारह पर्व जो आपके परिवार में मायने रखते हैं। ये समाप्त नहीं होते और कुछ भी स्वतः नवीनीकृत नहीं होता।",
          rows: [
            { k: "स्नान", v: "ग्यारह" },
            { k: "प्रति स्नान", v: "$1 · ₹46" },
            { k: "अवधि", v: "समाप्त नहीं होता" },
          ],
        },
        {
          name: "वर्ष कोष",
          alt: "Varsh Kosh",
          sub: "साठ स्नान",
          flag: "",
          world: "$48",
          india: "₹2,100",
          body: "साठ स्नान, अर्थात महीने में पाँच सुबहें, पूरे वर्ष, अस्सी सेंट प्रति स्नान। मूल्य इससे नीचे नहीं जाता। यह सदस्यता नहीं, स्नानों का कोष है: कुछ भी नवीनीकृत नहीं होता और दोबारा कोई शुल्क नहीं लिया जाता।",
          rows: [
            { k: "स्नान", v: "साठ" },
            { k: "प्रति स्नान", v: "$0.80 · ₹35" },
            { k: "अवधि", v: "समाप्त नहीं होता" },
          ],
        },
      ],
      ladders: {
        label: "दो मूल्य क्यों छपे हैं",
        body: [
          "वह सुबह पहुँचाने में उतना ही लगता है, चाहे आप उज्जैन में हों या न्यू जर्सी में। मूल्य लागत नहीं है। पाँच सौ रुपये एक जगह सोच-समझकर दी जाने वाली राशि है और दूसरी जगह दोपहर का भोजन, और एक ही अंक रखने पर इनमें से एक के लिए द्वार बंद हो जाता।",
          "इसलिए दोनों सूचियाँ ऊपर, एक ही पृष्ठ पर, पूरी छपी हैं। आपसे कौन सी ली जाएगी, यह भुगतान के माध्यम से तय होता है: भारतीय कार्ड या UPI पते से भुगतान पर रुपये वाला मूल्य लगता है, उस सुबह आप संसार में कहीं भी खड़े हों। हम आपका स्थान नहीं पढ़ते, आपके नाम से अनुमान नहीं लगाते, और भुगतान का विवरण भरने से पहले जो मूल्य आपको दिखाया गया, वही लिया जाता है। न कोई तीसरा मूल्य, न माँगने पर मिलने वाला कोड, न मोल-भाव।",
        ],
      },
      truth: {
        label: "आप वास्तव में क्या खरीद रहे हैं",
        body: "एक डिजिटल साधना। कोई पुरोहित नहीं। कोई घाट नहीं। आपकी ओर से कहीं, किसी के द्वारा, कुछ नहीं किया जाता। नदी वास्तविक है, उसका पाठ वास्तविक है, शब्द आपके हैं। यही पूरा उत्पाद है, और यही पर्याप्त है।",
      },
      note: "मूल्य आपके देश में लगने वाले कर से पहले के हैं। यहाँ कोई स्नान किसी फल का वचन नहीं देता, और कोई राशि बेहतर फल नहीं खरीदती।",
      cta: "पूरी शुल्क-सूची",
    },
    notFound: {
      code: "404",
      title: "यह मार्ग जल तक नहीं पहुँचता।",
      lede: "जिस पृष्ठ की आप खोज कर रहे थे, वह यहाँ नहीं है। नदी, किंतु, वहीं है जहाँ सदा से थी।",
      cta: "मुखपृष्ठ पर लौटें",
    },
    closing: {
      title: "आप जहाँ भी हों, जल वहीं है।",
      lede: "आज रात नदी अपने ही स्तर पर बह रही है, कोई देखे या न देखे। आप उन लोगों में हो सकते हैं जो देख रहे हैं।",
      cta: "स्नान आरंभ करें",
    },
    bar: {
      label: "ग्यारह स्नान",
      price: "$11 · ₹501",
      cta: "आरंभ",
    },
    footer: {
      tagline: "विश्वभर के भारतीयों के लिए डिजिटल स्नान।",
      cols: [
        { h: "सेवा", links: ["पवित्र जल", "नदी, इस समय", "मुहूर्त पंचांग", "जल चिह्न"] },
        { h: "कंपनी", links: ["परिचय", "घोषणा", "प्रेस", "संपर्क"] },
        { h: "कानूनी", links: ["गोपनीयता", "शर्तें", "वापसी"] },
      ],
      made: "श्रद्धा के साथ निर्मित · प्रयागराज एवं बर्लिन",
      rights: "© 2026 स्नानिफ़ाई",
    },
  },
} satisfies Record<Lang, unknown>;
