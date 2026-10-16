/* The Facebook calendar, 17 October to 15 November 2026: one post a day on
   the Snanify Page, each with its card (B1 calendar art, B2 the matchbox, B4
   the signboard), its words for the post, and its link.

   Every date and hour below comes from the site's own engine, computed on 16
   October 2026: the occasions from resolveOccasion() in src/lib/occasions.ts,
   the hours from cityDay() in src/lib/city-day.ts and astronomy-engine at
   the ghats' coordinates (ads/social/_sky.json holds the run). The stories
   come from src/content/rivers.ts and src/content/data/muhurat.json. Live
   river figures are left out on purpose: they change each morning, and the
   post sends the reader to read today's.

   Written under CLAUDE.md's two rules and docs/meta/facebook-posts.md: no
   rite claimed, no outcome promised, no negative constructions, no em
   dashes, active voice, nothing that tells readers who they are, nothing
   that asks for likes or shares. Every post ends on the snan. */

export const LINK = (path, date) =>
  `https://www.snanify.com${path}?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=${date}`;

export const caption = (post) => `${post.text.trim()}\n${LINK(post.path, post.date)}`;

const PRICE = "Eleven mornings for $11, £11 or €11.";

export const POSTS = [
  /* ---------------------------------------------------------------- week 1 */
  {
    date: "2026-10-17", day: "Sat", lang: "en", style: "B1", motion: true,
    theme: "Date: Kaveri Sankramana, the sun enters Tula at 19:58 IST",
    cta: "front", path: "/rivers/kaveri-talakaveri",
    card: {
      style: "calendar", scene: "spring", dur: 8,
      sash: "Today, 19:58 IST", kicker: "Saturday 17 October",
      title: "Kaveri|Sankramana", sub: "The Kaveri rises at its source",
      rows: [["The sun enters Tula", "19:58 IST"], ["In London", "15:28"], ["In New York", "10:28"]],
      cta: "Sit with the Kaveri",
    },
    text: `
The sun enters Tula today at 19:58 IST, and Talakaveri keeps the one great day of its year.

On Brahmagiri in Kodagu, the spring that starts the Kaveri is held to well up in its tank at that very moment: the theerthodbhava. Families of Kodagu fix their year on it.

Keep the hour with the river. Three minutes: the Kaveri's flow today, a breath with the water, a sankalp in your own words.

In London the moment falls at 15:28. In New York, at 10:28.

Sit with the Kaveri today:`,
  },
  {
    date: "2026-10-18", day: "Sun", lang: "en", style: "B2", motion: false,
    theme: "Practice: the sankalp, with the three example sankalps from setup",
    cta: "soft", path: "/snan",
    card: {
      style: "matchbox", kicker: "The practice",
      hook: "Say it in|your own words.", brand: "Sankalp brand", number: "No. 02", emblem: "sun",
      name: "Sankalp", tagline: "Eleven seconds, under your thumb",
      seal: { big: "11", small: "seconds" }, cta: "Write yours",
    },
    text: `
Every snan holds a sankalp: one intention, in your own words.

Write it once, when you set up. Each morning it comes back to you, and you hold it under your thumb for eleven seconds while the ink fills. Then a minute of stillness.

Take one of these as it is, or write your own:
For my mother, every morning this month.
For the family, near and far, and a steady mind.
For my father, who first took me to the river.

Write yours and sit this morning:`,
  },
  {
    date: "2026-10-19", day: "Mon", lang: "en", style: "B4", motion: true,
    theme: "River: the Ganga's daily figure, ranked against every day since 1997",
    cta: "soft", path: "/live",
    card: {
      style: "signboard", dur: 7, kicker: "Mon 19 Oct",
      top: "Since", bottom: "1997", seal: { big: "29", small: "years of river" },
      band: "Today's Ganga, ranked against every day since 1997.",
      body: "One number each morning, from Har Ki Pauri. Read it, then breathe with it.",
      cta: "See today's Ganga",
    },
    text: `
The Ganga at Har Ki Pauri gets one number each morning: its flow today, in cubic metres a second.

Snanify ranks that number against every day in the same week of the year since 1997. One glance tells you where this morning stands in almost thirty years of the river: running full, running low, or near its usual.

Read it at dawn, then breathe with it. The water on your screen rises and falls at the river's own amplitude.

See today's Ganga and sit with it:`,
  },
  {
    date: "2026-10-20", day: "Tue", lang: "en", style: "B1", motion: false,
    theme: "Panchang: Brahma muhurat tomorrow in five diaspora cities",
    cta: "soft", path: "/panchang",
    card: {
      style: "calendar", scene: "dawn", kicker: "Tuesday 20 October",
      title: "Brahma|muhurat", sub: "Tomorrow, Wednesday 21 October",
      rows: [["New York", "05:28 to 06:21"], ["Toronto", "05:53 to 06:46"], ["Houston", "05:45 to 06:36"], ["London", "05:45 to 06:40"], ["Dubai", "04:39 to 05:29"]],
      cta: "Find your city",
    },
    text: `
Brahma muhurat is the hour before dawn, the window tradition keeps for prayer, study and the morning snan. It opens about an hour and a half before sunrise and closes about forty-eight minutes before it.

Here it is for tomorrow, Wednesday 21 October:
New York, 05:28 to 06:21
Toronto, 05:53 to 06:46
Houston, 05:45 to 06:36
London, 05:45 to 06:40
Dubai, 04:39 to 05:29

Set an alarm inside the window, open Snanify, and give the river three minutes. Your city's hours, every day:`,
  },
  {
    date: "2026-10-21", day: "Wed", lang: "en", style: "B4", motion: false,
    theme: "Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India",
    cta: "front", path: "/",
    card: {
      style: "signboard", kicker: "Wed 21 Oct",
      top: "Ekadashi", bottom: "two dates",
      band: "Kept by your own sunrise.",
      rows: [["New York, Toronto, Houston", "Wed 21 Oct"], ["London, Dubai, Singapore", "Thu 22 Oct"], ["India", "Thu 22 Oct"]],
      cta: "Sit this morning",
    },
    text: `
Ekadashi falls on two dates this week, and both are right.

A tithi is kept on the day it is running at your own sunrise. In New York, Toronto and Houston that day is today, Wednesday 21 October. In London, Dubai, Singapore and India it is Thursday 22 October.

This is the Ekadashi of the bright half of Ashwin, kept by many as Papankusha Ekadashi. A morning snan belongs to the day. Keep yours with the river, wherever you wake.

Sit with the river on your Ekadashi:`,
  },
  {
    date: "2026-10-22", day: "Thu", lang: "en", style: "B2", motion: true,
    theme: "Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami",
    cta: "soft", path: "/rivers/godavari-nashik",
    card: {
      style: "matchbox", dur: 7, kicker: "Ram Kund, Nashik",
      hook: "The river a sage|brought down.", brand: "Gautami brand", number: "No. 04", emblem: "sun",
      name: "Godavari", tagline: "The longest river of southern India",
      seal: { big: "3 min", small: "with the Godavari" }, cta: "Sit with the Godavari",
    },
    text: `
The Godavari has an older name: Gautami. The sage Gautama brought the river down from Brahmagiri, above Trimbakeshwar, through Shiva's intercession. When the river is invoked, Gautami is still the name people use.

A few tens of kilometres downstream it reaches Ram Kund in Panchavati, Nashik. Tradition holds that Rama and Sita bathed here, and that Rama performed his father Dasharatha's shraddha at this kund.

From there the Godavari crosses the whole peninsula to the Bay of Bengal, the longest river of southern India.

Sit with the Godavari this morning:`,
  },
  {
    date: "2026-10-23", day: "Fri", lang: "en", style: "B4", motion: false,
    theme: "Patra: Send the Ganga home, the specimen in a phone",
    cta: "front", path: "/",
    card: {
      style: "signboard", kicker: "Fri 23 Oct", phone: "ads/out/patra-916-en.png",
      hook: "Send the *Ganga* home.",
      body: "Your family's names beside today's river, on one sheet, straight to the family WhatsApp.",
      cta: "Start now",
    },
    text: `
Every morning you sit, the press pulls a Sankalp Patra for you.

It carries up to five family names, the water you sat with, the river's flow that day and its rank since 1997, the tithi, the distance to the ghat, and the hour in your city and in IST. One prayer, chosen by you. A portrait, if you add one.

The share sheet opens with the Patra attached. Send it to the family group before the chai is ready.

${PRICE} Start this morning:`,
  },
  /* ---------------------------------------------------------------- week 2 */
  {
    date: "2026-10-24", day: "Sat", lang: "hi", style: "B1", motion: false,
    theme: "Hindi: Kartik snan begins Tuesday 27 October",
    cta: "front", path: "/hi",
    card: {
      style: "calendar", scene: "dawn", sash: "मंगलवार से", kicker: "संवत् २०८३",
      title: "कार्तिक|स्नान", sub: "27 अक्टूबर से 24 नवंबर",
      line: "उनतीस सुबहें। हर सुबह तीन मिनट, गंगा के साथ।",
      cta: "आज ही आरंभ कीजिए",
    },
    text: `
कार्तिक स्नान मंगलवार, 27 अक्टूबर से आरंभ होता है और कार्तिक पूर्णिमा, 24 नवंबर तक चलता है।

परंपरा पूरे कार्तिक को एक ऋतु की तरह रखती है: भोर से पहले स्नान, संध्या में दीप, और हल्का भोजन। जो पूरा मास रखते हैं वे हर सुबह उठते हैं। बहुत से लोग पहला दिन, अंतिम दिन और बीच में जितने हो सकें उतने दिन रखते हैं।

इस कार्तिक हर सुबह तीन मिनट गंगा के साथ बैठिए: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार के नामों वाला संकल्प पत्र, सीधे WhatsApp पर।

अपनी पहली सुबह आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-10-25", day: "Sun", lang: "en", style: "B1", motion: true,
    theme: "Date: Sharad Purnima tonight, the bathing morning after",
    cta: "front", path: "/rivers/yamuna-mathura",
    card: {
      style: "calendar", scene: "moon", dur: 8, sash: "Tonight", kicker: "Sunday 25 October",
      title: "Sharad|Purnima", sub: "Kheer under the full moon",
      line: "The morning after is a bathing morning. Sit with the Yamuna at dawn.",
      cta: "Sit with the Yamuna",
    },
    text: `
Tonight is Sharad Purnima, the first clear full moon after the rains.

Families set kheer out under the moon. Kojagara means "who is awake?": tradition holds that Lakshmi walks the earth tonight, asking it. In Braj it is the night of the raas, and the Yamuna is the river of that night.

The morning after is a bathing morning, and Kartik snan begins the day after that.

Set up your snan today, and sit with the Yamuna at dawn:`,
  },
  {
    date: "2026-10-26", day: "Mon", lang: "en", style: "B4", motion: true,
    theme: "Date: Kartik snan starts tomorrow, 29 mornings",
    cta: "front", path: "/",
    card: {
      style: "signboard", dur: 7, kicker: "Starts tomorrow",
      top: "Kartik", bottom: "snan", seal: { big: "29", small: "mornings of Kartik" },
      band: "Tuesday 27 October to Kartik Purnima, 24 November.",
      rows: [["Brahma muhurat, New York", "05:33"], ["Brahma muhurat, London", "04:52"], ["Sunrise, Har Ki Pauri", "06:27 IST"]],
      cta: "Start now",
    },
    text: `
Kartik snan starts tomorrow, Tuesday 27 October, and runs 29 mornings to Kartik Purnima on 24 November.

Start today, so your first morning is ready when you wake. Setup takes about two minutes: your water, your family's names, your prayer, your sankalp, your hour.

Tomorrow, Brahma muhurat opens at 05:33 in New York and at 04:52 in London. The sun rises over Har Ki Pauri at 06:27 IST.

${PRICE} Start now:`,
  },
  {
    date: "2026-10-27", day: "Tue", lang: "en", style: "B1", motion: true,
    theme: "Date: Kartik snan, day 1",
    cta: "front", path: "/",
    card: {
      style: "calendar", scene: "dawn", dur: 8, sash: "Day 1 of 29", kicker: "Tuesday 27 October",
      title: "Kartik|snan", sub: "The first morning is today",
      rows: [["Sunrise, Har Ki Pauri", "06:27 IST"], ["Brahma muhurat, New York", "05:33 to 06:27"], ["Brahma muhurat, London", "04:52 to 05:48"]],
      cta: "Sit your first morning",
    },
    text: `
Kartik snan begins this morning.

For 29 mornings, to the full moon of 24 November, Har Ki Pauri keeps the month as a daily discipline: a bath before dawn, lamps in the evening, a lighter table.

Keep it with the Ganga from wherever you wake. Three minutes: today's flow at Har Ki Pauri, a breath with the river, your sankalp. Then the family gets a Sankalp Patra with their names on it.

Sit your first Kartik morning now:`,
  },
  {
    date: "2026-10-28", day: "Wed", lang: "en", style: "B2", motion: true,
    theme: "Ghat: the Triveni Sangam, two rivers seen and a third held in faith",
    cta: "soft", path: "/rivers/triveni-prayagraj",
    card: {
      style: "matchbox", dur: 7, kicker: "Kartik, day 2",
      hook: "Two you can see.|One held in faith.", brand: "Tirtharaj brand", number: "No. 02", emblem: "two",
      name: "Sangam", tagline: "Prayagraj, where the Ganga meets the Yamuna",
      seal: { big: "3", small: "rivers, one place" }, cta: "Sit at the Sangam",
    },
    text: `
At Prayagraj the Ganga arrives from the north and the Yamuna from the west. For a stretch they run side by side, and you can see the line from a boat: the Yamuna darker and slower, the Ganga paler and quicker.

Tradition holds that the Sarasvati joins them here, unseen. The three give the place its name: Triveni, three braids. Prayag means the place of sacrifice, and the city is called Tirtharaj, the king of tirthas.

Kartik bathing at the Sangam runs the full month.

Sit at the Sangam this morning:`,
  },
  {
    date: "2026-10-29", day: "Thu", lang: "en", style: "B1", motion: false,
    theme: "Kartik custom: deep daan, the lamp at dusk",
    cta: "soft", path: "/",
    card: {
      style: "calendar", scene: "lamps", sash: "Kartik, day 3", kicker: "Thursday 29 October",
      title: "Deep|daan", sub: "A lamp on a leaf, set on the water",
      line: "Dawn belongs to the river. Dusk belongs to the lamp.",
      cta: "Sit with the Ganga",
    },
    text: `
Kartik keeps two hours of the day. Dawn is for the snan. Dusk is for the lamp.

Deep daan is the simplest of the evening customs: a lamp on a leaf, lit and set on the water from the step. Through the month, households light lamps at the door, by the tulsi and on the river.

Sit with the river at dawn. Light one lamp at dusk, at your own door. Two small acts, one day kept.

Your Kartik morning, three minutes:`,
  },
  {
    date: "2026-10-30", day: "Fri", lang: "en", style: "B4", motion: false,
    theme: "Patra: what the sheet carries, line by line",
    cta: "front", path: "/",
    card: {
      style: "signboard", kicker: "Fri 30 Oct",
      top: "Sankalp", bottom: "Patra",
      band: "One sheet for every morning you sit.",
      rows: [["Names", "up to five"], ["The water", "one of six"], ["Today's flow", "and its rank"], ["The tithi", "that morning"], ["The distance", "to the ghat"], ["The hour", "yours and IST"]],
      cta: "Make yours", okp: false,
    },
    text: `
Here is what the Sankalp Patra carries, line by line.

Up to five names from your family. The water you sat with, one of six. That morning's flow and its rank against every day since 1997. The tithi. The distance from your home to the ghat. The hour, in your city and in IST. One prayer you chose. Your portrait, if you add one. And an engraving drawn from that day's flow, so every morning's sheet carries its own water.

One Patra for every morning you complete. Eleven mornings, eleven sheets for the family group.

Make your first one this morning:`,
  },
  /* ---------------------------------------------------------------- week 3 */
  {
    date: "2026-10-31", day: "Sat", lang: "hi", style: "B2", motion: false,
    theme: "Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time",
    cta: "soft", path: "/hi/rivers/shipra-ujjain",
    card: {
      style: "matchbox", kicker: "रामघाट, उज्जैन",
      hook: "जहाँ काल|गिना जाता है", brand: "अवंतिका छाप", number: "नं. 05", emblem: "sun",
      name: "शिप्रा", tagline: "महाकाल की नगरी",
      seal: { big: "0°", small: "देशांतर, यहीं से" }, cta: "शिप्रा के साथ बैठिए",
    },
    text: `
उज्जैन अवंतिका है, सात मोक्षपुरियों में से एक। यहाँ के अधिष्ठाता महाकाल हैं, स्वयं काल के रूप में शिव, और महाकालेश्वर ज्योतिर्लिंग रामघाट से थोड़ी ही दूरी पर है।

यह नगर काल पर एक और दावा रखता है। प्राचीन भारतीय ज्योतिष में शून्य देशांतर उज्जैन से होकर गिना जाता था, और अठारहवीं सदी में बनी वेधशाला आज भी खड़ी है और आज भी सूर्य को पढ़ती है।

रामघाट शिप्रा का सबसे पुराना स्नान घाट है, और सिंहस्थ इसी पर केंद्रित होता है। कार्तिक का पाँचवाँ दिन है।

आज सुबह शिप्रा के साथ तीन मिनट बैठिए:`,
  },
  {
    date: "2026-11-01", day: "Sun", lang: "en", style: "B4", motion: true,
    theme: "Practice: the breath, four in and six out; US and Canadian clocks went back",
    cta: "soft", path: "/snan",
    card: {
      style: "signboard", dur: 21, kicker: "Sun 1 Nov",
      top: "Breathe", bottom: "with it", breath: { in: "In", out: "Out" },
      cta: "Breathe with the Ganga",
    },
    text: `
Forty-five seconds of every snan belong to the breath.

The engraved water on your screen rises for four seconds and falls for six, at the river's own amplitude that morning. Breathe in as it rises. Breathe out as it falls. Four and a half breaths, and the river sets the pace.

Clocks went back last night in the US and Canada. Brahma muhurat in New York tomorrow opens at 04:38, in Toronto at 05:04.

Breathe with the Ganga this morning:`,
  },
  {
    date: "2026-11-02", day: "Mon", lang: "en", style: "B2", motion: false,
    theme: "River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7)",
    cta: "soft", path: "/rivers/kaveri-talakaveri",
    card: {
      style: "matchbox", kicker: "Kartik, day 7",
      hook: "Lopamudra.|Ponni.|Kaveri.", brand: "Kodagu brand", number: "No. 06", emblem: "spring",
      name: "Kaveri", tagline: "She goes underground, and rises again",
      seal: { big: "3", small: "names, one river" }, cta: "Sit with the Kaveri",
    },
    text: `
The Kaveri has three names, and each one tells a story.

In its own literature it is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country it is Ponni, and the delta it makes is most of what that name means to the families who farm it.

At Talakaveri it rises from a spring on Brahmagiri, goes underground almost at once, and comes up again at Bhagamandala, where it meets the Kannike and the Sujyoti.

Day 7 of Kartik. Sit with the Kaveri this morning:`,
  },
  {
    date: "2026-11-03", day: "Tue", lang: "en", style: "B1", motion: false,
    theme: "Panchang: Toronto and Har Ki Pauri, same morning, two clocks",
    cta: "soft", path: "/panchang/toronto",
    card: {
      style: "calendar", scene: "dawn", sash: "Kartik, day 8", kicker: "Tuesday 3 November",
      title: "Two clocks,|one morning", sub: "Wednesday 4 November",
      rows: [["Brahma muhurat, Toronto", "05:06 to 06:01"], ["Har Ki Pauri at that moment", "15:36 IST"], ["Brahma muhurat, Har Ki Pauri", "04:48 to 05:40"]],
      cta: "Find your hour",
    },
    text: `
Same morning, two clocks.

Tomorrow, Wednesday 4 November, Brahma muhurat opens in Toronto at 05:06. At that moment it is 15:36 at Har Ki Pauri, and the river has been running in daylight for nine hours.

The Ganga keeps its day. You keep yours: the river's figure for today, read in your own hour, with the time in Toronto and in IST side by side on your Sankalp Patra.

Find your city's hours, then sit:`,
  },
  {
    date: "2026-11-04", day: "Wed", lang: "en", style: "B4", motion: false,
    theme: "Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days",
    cta: "front", path: "/",
    card: {
      style: "signboard", kicker: "Wed 4 Nov",
      top: "Rama", bottom: "Ekadashi", seal: { big: "4", small: "days to Diwali" },
      band: "Today in New York, Toronto and London. Tomorrow in Dubai and India.",
      body: "The last Ekadashi before Diwali. Keep its morning with the river.",
      cta: "Sit this morning",
    },
    text: `
Rama Ekadashi, the last Ekadashi before Diwali, falls today in New York, Toronto, Houston and London, by your own sunrise. In Dubai, Singapore, Sydney and India it falls tomorrow, Thursday 5 November.

Ekadashi is first a fast kept at home, with its own rules for what is eaten and when the fast is broken. A morning snan is a customary part of the day.

Keep yours with the river. Three minutes, then the day is yours.

Sit with the Ganga this morning:`,
  },
  {
    date: "2026-11-05", day: "Thu", lang: "en", style: "B1", motion: true,
    theme: "Calendar: Diwali week as the panchang sets it in India",
    cta: "front", path: "/muhurat",
    card: {
      style: "calendar", scene: "newmoon", dur: 8, sash: "Diwali week", kicker: "Thursday 5 November",
      title: "Diwali|week", sub: "The dates, as kept in India",
      rows: [["Naraka Chaturdashi, before sunrise", "Sun 8 Nov"], ["Lakshmi puja, at dusk", "Sun 8 Nov"], ["Somvati Amavasya, at dawn", "Mon 9 Nov"], ["Yam Dwitiya, Bhai Dooj", "Wed 11 Nov"]],
      cta: "Plan your mornings",
    },
    text: `
Diwali week, as the panchang sets it in India:

Sunday 8 November, before sunrise: Naraka Chaturdashi, the abhyanga snan, oil and then water.
Sunday 8 November, at dusk: Lakshmi puja, as the new moon holds.
Monday 9 November, at dawn: Somvati Amavasya, the Diwali new moon on a Monday, the fullest morning Har Ki Pauri gets outside a Kumbh.
Wednesday 11 November: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura.

Three of those are mornings at the water. Keep each one with the river, three minutes at a time.

Set up your mornings today:`,
  },
  {
    date: "2026-11-06", day: "Fri", lang: "en", style: "B2", motion: true,
    theme: "Patra: Send Diwali home, three sheets in one week",
    cta: "front", path: "/",
    card: {
      style: "matchbox", dur: 7, kicker: "Diwali week",
      hook: "Send Diwali|home.", brand: "Sankalp brand", number: "No. 11", emblem: "lamp",
      name: "Sankalp|Patra", tagline: "Your family's names beside the river",
      seal: { big: "11", small: "mornings for eleven" }, cta: "Start now",
    },
    text: `
This Diwali, send the family a morning with the river.

Sit three minutes with the Ganga, and the press pulls a Sankalp Patra with up to five family names on it, today's flow at Har Ki Pauri, the tithi, and the hour in your city and in IST. It opens straight into WhatsApp.

Sit on Naraka Chaturdashi. Sit on Somvati Amavasya. Sit on Yam Dwitiya. Three sheets for the family group in one week.

${PRICE} Start this morning:`,
  },
  /* ---------------------------------------------------------------- week 4 */
  {
    date: "2026-11-07", day: "Sat", lang: "hi", style: "B1", motion: false,
    theme: "Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise",
    cta: "front", path: "/hi",
    card: {
      style: "calendar", scene: "newmoon", sash: "कल भोर", kicker: "शनिवार 7 नवंबर",
      title: "नरक|चतुर्दशी", sub: "सूर्योदय से पहले अभ्यंग स्नान",
      line: "परंपरा मानती है: इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।",
      cta: "कल भोर गंगा के साथ",
    },
    text: `
कल, रविवार 8 नवंबर, नरक चतुर्दशी है: दीपावली की अमावस्या से पहले की तिथि, जिसे छोटी दिवाली भी कहते हैं।

वर्ष का यही एक दिन है जब स्नान स्वयं अनुष्ठान है: अभ्यंग स्नान, पहले तेल, फिर जल, सूर्योदय से पहले, जब चंद्रमा अभी आकाश में हो। परंपरा मानती है कि इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।

स्नान के बाद तीन मिनट गंगा के साथ बैठिए, फिर परिवार को संकल्प पत्र भेजिए। उसी शाम लक्ष्मी पूजा है।

अपनी सुबह आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-11-08", day: "Sun", lang: "en", style: "B4", motion: true,
    theme: "Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13)",
    cta: "front", path: "/",
    card: {
      style: "signboard", dur: 7, kicker: "Sun 8 Nov",
      top: "Diwali", bottom: "tonight", seal: { big: "13", small: "of 29 Kartik mornings" },
      band: "Abhyanga snan at dawn. Lakshmi puja at dusk.",
      rows: [["Sunrise, Har Ki Pauri", "06:36 IST"], ["Sunrise, New York", "06:34"], ["Sunrise, London", "07:06"]],
      cta: "Sit before the lamps", okp: "SHUBH DEEPAVALI",
    },
    text: `
Shubh Deepavali.

This morning is Naraka Chaturdashi, the abhyanga snan before sunrise. This evening is Lakshmi puja, as the new moon holds at dusk. Tomorrow at dawn the same new moon gives Har Ki Pauri its Somvati Amavasya.

Give the river three minutes before the house fills. Sit with the Ganga, hold your sankalp, and send the family a Sankalp Patra with their names on it before the first lamp is lit.

Sit with the Ganga this morning:`,
  },
  {
    date: "2026-11-09", day: "Mon", lang: "en", style: "B1", motion: true,
    theme: "Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14)",
    cta: "front", path: "/muhurat/somvati-amavasya-2026",
    card: {
      style: "calendar", scene: "newmoon", dur: 8, sash: "Today", kicker: "Monday 9 November",
      title: "Somvati|Amavasya", sub: "The Diwali new moon, on a Monday",
      rows: [["Sunrise, Har Ki Pauri", "06:37 IST"], ["Brahma muhurat there", "04:51 to 05:44 IST"]],
      cta: "Sit with the Ganga",
    },
    text: `
A new moon on a Monday is Somvati Amavasya, and this one is the Diwali new moon.

At Haridwar it is the greatest of the amavasya bathing days. Har Ki Pauri on a Somvati morning is the fullest the ghat gets outside a Kumbh. The sun rose over the steps today at 06:37 IST.

Amavasya is also the day tradition gives to the departed of one's line. Name them in your sankalp this morning.

Day 14 of Kartik. Sit with the Ganga now:`,
  },
  {
    date: "2026-11-10", day: "Tue", lang: "en", style: "B2", motion: true,
    theme: "Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow",
    cta: "front", path: "/rivers/yamuna-mathura",
    card: {
      style: "matchbox", dur: 7, kicker: "Vishram Ghat, Mathura",
      hook: "Tomorrow:|Yam Dwitiya.", brand: "Braj brand", number: "No. 03", emblem: "two",
      name: "Yamuna", tagline: "Krishna's own river, and Yama's sister",
      seal: { big: "2", small: "names, one river" }, cta: "Sit with the Yamuna",
    },
    text: `
The Yamuna is the daughter of Surya and the sister of Yama.

Tomorrow, Wednesday 11 November, is Yam Dwitiya, the day much of India keeps as Bhai Dooj. The story is of Yamuna receiving her brother Yama at her house. At Vishram Ghat in Mathura, brothers and sisters bathe in the Yamuna together, and the crowd that morning is the ghat's largest of the year.

It is a day built around a sibling, and a family spread across three countries can keep it on the same morning.

Put your brother's or sister's name on your Patra, and sit with the Yamuna tomorrow. Set it up today:`,
  },
  {
    date: "2026-11-11", day: "Wed", lang: "en", style: "B4", motion: false,
    theme: "Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura",
    cta: "front", path: "/",
    card: {
      style: "signboard", kicker: "Wed 11 Nov",
      top: "Bhai", bottom: "Dooj", seal: { big: "2", small: "names on one sheet" },
      band: "Yam Dwitiya at the Yamuna, Mathura.",
      rows: [["Sunrise, Vishram Ghat", "06:36 IST"]],
      cta: "Sit with the Yamuna",
    },
    text: `
Today is Yam Dwitiya, Bhai Dooj.

At Vishram Ghat, brothers and sisters step into the Yamuna together. Siblings today live in different cities and different time zones. The river is the same for both of you.

Sit three minutes with the Yamuna, put both your names on the Sankalp Patra, and send it to your brother or sister before breakfast.

Sit with the Yamuna this morning:`,
  },
  {
    date: "2026-11-12", day: "Thu", lang: "en", style: "B1", motion: false,
    theme: "Calendar: Chhath, the four days (Kartik day 17)",
    cta: "front", path: "/muhurat/chhath-2026",
    card: {
      style: "calendar", scene: "sunset", sash: "Begins tomorrow", kicker: "Thursday 12 November",
      title: "Chhath", sub: "Four days at the water",
      rows: [["Nahay Khay", "Fri 13 Nov"], ["Kharna", "Sat 14 Nov"], ["Sandhya arghya, at sunset", "Sun 15 Nov"], ["Usha arghya, at sunrise", "Mon 16 Nov"]],
      cta: "Sit with the Ganga",
    },
    text: `
Chhath begins tomorrow.

It is the one great festival kept standing in the water: an offering to the setting sun on the evening of Shashthi, a night of vigil, and an offering to the rising sun the next morning.

Nahay Khay, Friday 13 November. Kharna, Saturday 14. Sandhya arghya at sunset, Sunday 15. Usha arghya at sunrise, Monday 16.

Day 17 of Kartik. Keep the four mornings with the river:`,
  },
  {
    date: "2026-11-13", day: "Fri", lang: "en", style: "B2", motion: false,
    theme: "Price: twelve Kartik mornings left, eleven for eleven",
    cta: "front", path: "/",
    card: {
      style: "matchbox", kicker: "Kartik, day 18",
      hook: "Twelve Kartik|mornings left.", brand: "Sankalp brand", number: "No. 11", emblem: "sun",
      name: "Eleven|mornings", tagline: "For eleven, in dollars, pounds or euros",
      seal: { big: "12", small: "mornings to Kartik Purnima" }, cta: "Start now",
    },
    text: `
Twelve mornings of Kartik are left, from today to Kartik Purnima on Tuesday 24 November.

${PRICE} Start today and your eleventh morning lands the day before the full moon. Add one more, and you close the month on Kartik Purnima itself.

Every morning gives the family a Sankalp Patra with their names on it.

Start this morning:`,
  },
  {
    date: "2026-11-14", day: "Sat", lang: "hi", style: "B1", motion: true,
    theme: "Hindi: Chhath tomorrow, the evening and the dawn arghya",
    cta: "front", path: "/hi/muhurat/chhath-2026",
    card: {
      style: "calendar", scene: "sunset", dur: 8, sash: "कल संध्या", kicker: "शनिवार 14 नवंबर",
      title: "छठ पूजा", sub: "डूबते और उगते सूर्य को अर्घ्य",
      rows: [["संध्या अर्घ्य", "रवि 15 नवंबर"], ["उषा अर्घ्य", "सोम 16 नवंबर"]],
      cta: "छठ की भोर नदी के साथ",
    },
    text: `
कल, रविवार 15 नवंबर, छठ की षष्ठी है।

छठ वह महापर्व है जो जल में खड़े होकर रखा जाता है: षष्ठी की शाम डूबते सूर्य को संध्या अर्घ्य, फिर रात भर जागरण, और सप्तमी की भोर उगते सूर्य को उषा अर्घ्य।

कल सूर्यास्त प्रयागराज में 17:14 पर है, हर की पौड़ी पर 17:21 पर।

सोमवार की भोर, उषा अर्घ्य के बाद, तीन मिनट गंगा के साथ बैठिए और परिवार को संकल्प पत्र भेजिए। आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-11-15", day: "Sun", lang: "en", style: "B4", motion: true,
    theme: "Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20)",
    cta: "front", path: "/",
    card: {
      style: "signboard", dur: 7, kicker: "Sun 15 Nov",
      top: "Chhath", bottom: "today", seal: { big: "20", small: "of 29 Kartik mornings" },
      band: "Arghya at sunset. Arghya again at dawn.",
      rows: [["Sunset, New York", "16:37"], ["Sunset, London", "16:11"], ["Sunrise tomorrow, New York", "06:44"]],
      cta: "Sit with the Ganga", okp: false,
    },
    text: `
Today is Chhath. This evening, families stand in the water and offer arghya to the setting sun. Tomorrow at dawn they offer it to the rising one.

Sunset today: 16:37 in New York, 16:11 in London. Sunrise tomorrow in New York: 06:44.

Keep the dawn with the river. After the usha arghya, sit three minutes with the Ganga and send the family a Sankalp Patra with their names, the tithi and the hour in IST.

Sit with the Ganga this morning, and again at tomorrow's dawn:`,
  },
];
