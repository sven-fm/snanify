/* The Facebook calendar, 17 October to 15 November 2026: one post a day on
   the Snanify Page, each with its card, its words and its link. The cards
   follow the brand kit (brand/README.md; DESIGNSYSTEM.md is canonical):
   PLAIN marigold is the default, calendar art is for festival days, the
   signboard for a few loud days, the matchbox for the eleven-morning pack
   only.

   Every date and hour below comes from the site's own engine, computed on 16
   October 2026: the occasions from resolveOccasion() in src/lib/occasions.ts,
   the hours from cityDay() in src/lib/city-day.ts and astronomy-engine at
   the ghats' coordinates (ads/social/_sky.json holds the run). The stories
   come from src/content/rivers.ts and src/content/data/muhurat.json. Live
   river figures stay out: they change each morning, and the post sends the
   reader to read today's.

   The voice (brand/README.md): lead with the verb, second person, short,
   numbers as digits, the river's name in sindoor (*starred* on the card).
   Under CLAUDE.md's two rules: no rite claimed, no outcome promised, no
   negative constructions, no em dashes, nothing that tells readers who they
   are, nothing that asks for likes or shares. Every post ends on the snan. */

export const LINK = (path, date) =>
  `https://www.snanify.com${path}?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=${date}`;

/* Facebook gives the Page 2 link posts a month for free, and a third stalls
   on a Meta One dialog (found 18 October 2026). So the post carries no URL:
   its last line turns from a colon into a full stop, and it ends on the
   Page's Sign up button, which links to /begin. The card shows snanify.com.
   LINK stays for the record of where each post points. */
const SIGN_UP = { en: "Tap Sign up on the Page.", hi: "पेज पर Sign up दबाइए।" };
export const caption = (post) => {
  const text = post.text.trim().replace(/:$/, post.lang === "hi" ? "।" : ".");
  return `${text}\n${SIGN_UP[post.lang]}`;
};

const PRICE = "Eleven mornings for $11, £11 or €11.";
const OFFER = "Eleven mornings for eleven.";
const PATRA = "brand/examples/patra.png";

export const POSTS = [
  /* ---------------------------------------------------------------- week 1 */
  {
    date: "2026-10-17", day: "Sat", lang: "en", style: "calendar", motion: true,
    theme: "Date: Kaveri Sankramana, the sun entered Tula at 19:58 IST (posted on 18 Oct, after the 17th's run missed it)",
    cta: "front", path: "/rivers/kaveri-talakaveri",
    card: {
      style: "calendar", scene: "spring", dur: 7, kick: "Saturday 17 October",
      title: "Kaveri Sankramana", sub: "The Kaveri rises at its source",
      rows: [["The sun entered Tula", "19:58 IST"], ["In London", "15:28"], ["In New York", "10:28"]],
      cta: "Sit with the Kaveri",
    },
    text: `
Yesterday at 19:58 IST the sun entered Tula, and Talakaveri kept the one great day of its year.

On Brahmagiri in Kodagu, the spring that starts the Kaveri is held to well up in its tank at that moment: the theerthodbhava. Families of Kodagu fix their year on it.

The Kaveri's own season runs on through the weeks after. Sit with it for 3 minutes: today's flow, a breath with the river, your own sankalp.

Sit with the Kaveri today:`,
  },
  {
    date: "2026-10-18", day: "Sun", lang: "en", style: "plain", motion: false, posted: true,
    theme: "Practice: the sankalp, with the three example sankalps from setup (went out 18 Oct in the first design)",
    cta: "soft", path: "/snan",
    card: {
      style: "plain", when: "Sunday 18 October",
      head: "Say it in|*your own*|words.", sub: "1 sankalp. Held under your thumb for 11 seconds.",
      offer: OFFER, cta: "Write yours",
    },
    text: `
Every snan holds a sankalp: one intention, in your own words.

Write it once, when you set up. Each morning it comes back to you. Hold it under your thumb for 11 seconds while the ink fills. Then 1 minute of stillness.

Take one of these as it is, or write your own:
For my mother, every morning this month.
For the family, near and far, and a steady mind.
For my father, who first took me to the river.

Write yours and sit this morning:`,
  },
  {
    date: "2026-10-19", day: "Mon", lang: "en", style: "plain", motion: true,
    theme: "River: the Ganga's daily figure, ranked against every day since 1997",
    cta: "soft", path: "/live",
    card: {
      style: "plain", when: "Monday 19 October",
      head: "Read the|*Ganga*|this morning.", sub: "1 number a day. Ranked against every day since 1997.",
      seal: { a: "29", b: "years of river" }, sealRoom: 250,
      cta: "See today's Ganga",
    },
    text: `
Read the Ganga this morning. Har Ki Pauri gets 1 number each day: its flow today, in cubic metres a second.

Snanify ranks that number against every day in the same week of the year since 1997. One glance shows where this morning stands in 29 years of the river: running full, running low, or about as usual for this time of year.

Read it at dawn. Then breathe with it.

See today's Ganga and sit with it:`,
  },
  {
    date: "2026-10-20", day: "Tue", lang: "en", style: "plain", motion: false,
    theme: "Panchang: Brahma muhurat tomorrow in five diaspora cities",
    cta: "soft", path: "/panchang",
    card: {
      style: "plain", when: "Tuesday 20 October",
      head: "Brahma muhurat.|*Tomorrow.*", sub: "Wednesday 21 October. The hour before dawn.",
      rows: [["New York", "05:28 to 06:21"], ["Toronto", "05:53 to 06:46"], ["Houston", "05:45 to 06:36"], ["London", "05:45 to 06:40"], ["Dubai", "04:39 to 05:29"]],
      cta: "Find your city",
    },
    text: `
Set your alarm for Brahma muhurat: the hour before dawn, kept by tradition for prayer, study and the morning snan. It opens about 96 minutes before sunrise and closes about 48 minutes before it.

Tomorrow, Wednesday 21 October:
New York, 05:28 to 06:21
Toronto, 05:53 to 06:46
Houston, 05:45 to 06:36
London, 05:45 to 06:40
Dubai, 04:39 to 05:29

Wake inside the window. Open Snanify. Give the river 3 minutes.`,
  },
  {
    date: "2026-10-21", day: "Wed", lang: "en", style: "plain", motion: false,
    theme: "Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India",
    cta: "front", path: "/",
    card: {
      style: "plain", when: "Wednesday 21 October",
      head: "Ekadashi.|*2 dates.*", sub: "Keep it by your own sunrise.",
      rows: [["New York, Toronto, Houston", "Wed 21 Oct"], ["London, Dubai, Singapore", "Thu 22 Oct"], ["India", "Thu 22 Oct"]],
      cta: "Sit this morning",
    },
    text: `
Keep Ekadashi by your own sunrise. This week it falls on 2 dates, and both are right.

A tithi belongs to the day it is running at sunrise where you are. In New York, Toronto and Houston that day is today, Wednesday 21 October. In London, Dubai, Singapore and India it is Thursday 22 October.

This is the Ekadashi of the bright half of Ashwin, kept by many as Papankusha Ekadashi. A morning snan is a customary part of the day. Keep yours with the river.

Sit with the river on your Ekadashi:`,
  },
  {
    date: "2026-10-22", day: "Thu", lang: "en", style: "plain", motion: true,
    theme: "Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami",
    cta: "soft", path: "/rivers/godavari-nashik",
    card: {
      style: "plain", when: "Ram Kund, Nashik",
      head: "The *Godavari*.|A sage|brought it down.", sub: "Its older name is Gautami.",
      cta: "Sit with the Godavari",
    },
    text: `
Meet the Godavari by its older name: Gautami. The sage Gautama brought the river down from Brahmagiri, above Trimbakeshwar, through Shiva's intercession. When the river is invoked, Gautami is still the name people use.

A few tens of kilometres on, it reaches Ram Kund in Panchavati, Nashik. Tradition holds that Rama and Sita bathed here, and that Rama performed his father Dasharatha's shraddha at this kund.

From there the Godavari crosses the whole peninsula to the Bay of Bengal: the longest river of southern India.

Sit with the Godavari this morning:`,
  },
  {
    date: "2026-10-23", day: "Fri", lang: "en", style: "plain", motion: false,
    theme: "Patra: Send the Ganga home, the Sankalp Patra beside the headline",
    cta: "front", path: "/",
    card: {
      style: "plain", when: "Friday 23 October", sheet: PATRA,
      head: "Send the|*Ganga*|home.", sub: "Your family's names, at the river.",
      offer: OFFER, cta: "Start now",
    },
    text: `
Send the Ganga home. Every morning you sit, the press pulls a Sankalp Patra for you.

It carries up to 5 family names, the water you sat with, how the river runs that day, the tithi, the distance to the ghat, and the hour in your city and in IST. One prayer, chosen by you. A portrait, if you add one.

The share sheet opens with the Patra attached. Send it to the family group before the chai is ready.

${PRICE} Start this morning:`,
  },
  /* ---------------------------------------------------------------- week 2 */
  {
    date: "2026-10-24", day: "Sat", lang: "hi", style: "calendar", motion: false,
    theme: "Hindi: Kartik snan begins Tuesday 27 October",
    cta: "front", path: "/hi",
    card: {
      style: "calendar", scene: "dawn", kick: "संवत् २०८३",
      title: "कार्तिक स्नान", sub: "२७ अक्टूबर से २४ नवंबर",
      line: "२९ सुबहें। हर सुबह ३ मिनट, गंगा के साथ।",
      cta: "आज ही शुरू कीजिए",
    },
    text: `
कार्तिक स्नान मंगलवार, २७ अक्टूबर से शुरू होता है और कार्तिक पूर्णिमा, २४ नवंबर तक चलता है।

परंपरा पूरे कार्तिक को एक ऋतु की तरह रखती है: भोर से पहले स्नान, शाम को दीप, और हल्का भोजन। बहुत से लोग पहला दिन, आख़िरी दिन और बीच में जितने हो सकें उतने दिन रखते हैं।

इस कार्तिक हर सुबह ३ मिनट गंगा के साथ बैठिए: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार के नामों वाला संकल्प पत्र, सीधे WhatsApp पर।

अपनी पहली सुबह आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-10-25", day: "Sun", lang: "en", style: "calendar", motion: true,
    theme: "Date: Sharad Purnima tonight, the bathing morning after",
    cta: "front", path: "/rivers/yamuna-mathura",
    card: {
      style: "calendar", scene: "moon", dur: 7, kick: "Sunday 25 October",
      title: "Sharad Purnima", sub: "Tonight, the full moon",
      line: "Kheer under the moon. Sit with the Yamuna at dawn.",
      cta: "Sit with the Yamuna",
    },
    text: `
Set out the kheer tonight. It is Sharad Purnima, the first clear full moon after the rains.

Kojagara means "who is awake?": tradition holds that Lakshmi walks the earth tonight, asking it. In Braj it is the night of the raas, and the Yamuna is the river of that night.

The morning after is a bathing morning. Kartik snan begins the day after that.

Set up your snan today. Sit with the Yamuna at dawn:`,
  },
  {
    date: "2026-10-26", day: "Mon", lang: "en", style: "signboard", motion: true,
    theme: "Date: Kartik snan starts tomorrow, 29 mornings",
    cta: "front", path: "/",
    card: {
      style: "signboard", when: "Monday 26 October",
      top: "Kartik", bottom: "tomorrow", seal: { a: "29", b: "mornings" },
      sub: "Tuesday 27 October to Kartik Purnima, 24 November.",
      rows: [["New York", "05:33"], ["London", "04:52"], ["Har Ki Pauri", "06:27 IST"]],
      offer: OFFER, cta: "Start now",
    },
    text: `
Start today, and your first Kartik morning is ready when you wake. Kartik snan begins tomorrow, Tuesday 27 October, and runs 29 mornings to Kartik Purnima on 24 November.

Setup takes about 2 minutes: your river, your family's names, your prayer, your sankalp, your hour.

Tomorrow, Brahma muhurat opens at 05:33 in New York and at 04:52 in London. The sun rises over Har Ki Pauri at 06:27 IST.

${PRICE} Start now:`,
  },
  {
    date: "2026-10-27", day: "Tue", lang: "en", style: "calendar", motion: true,
    theme: "Date: Kartik snan, day 1",
    cta: "front", path: "/",
    card: {
      style: "calendar", scene: "dawn", dur: 7, kick: "Tuesday 27 October",
      title: "Kartik snan", sub: "Day 1 of 29. Today.",
      rows: [["Sunrise, Har Ki Pauri", "06:27 IST"], ["Brahma muhurat, New York", "05:33 to 06:27"], ["Brahma muhurat, London", "04:52 to 05:48"]],
      cta: "Do your first snan",
    },
    text: `
Do your first Kartik snan today!

For 29 mornings, to the full moon of 24 November, Har Ki Pauri keeps the month as a daily discipline: the river before dawn, lamps in the evening, a lighter table.

Keep it with the Ganga from wherever you wake. 3 minutes: today's flow at Har Ki Pauri, a breath with the river, your sankalp. Then the family gets a Sankalp Patra with their names on it.

Sit your first Kartik morning now:`,
  },
  {
    date: "2026-10-28", day: "Wed", lang: "en", style: "plain", motion: true,
    theme: "Ghat: the Triveni Sangam, two rivers seen and a third held in faith",
    cta: "soft", path: "/rivers/triveni-prayagraj",
    card: {
      style: "plain", when: "Kartik, day 2",
      head: "2 rivers|you can see.|*1 in faith.*", sub: "The Triveni Sangam, Prayagraj.",
      cta: "Sit at the Sangam",
    },
    text: `
Look for the line at Prayagraj. The Ganga arrives from the north and the Yamuna from the west, and for a stretch they run side by side: the Yamuna darker and slower, the Ganga paler and quicker.

Tradition holds that the Sarasvati joins them here, unseen. The 3 give the place its name: Triveni, 3 braids. Prayag means the place of sacrifice, and the city is called Tirtharaj, the king of tirthas.

Kartik bathing at the Sangam runs the full month.

Sit at the Sangam this morning:`,
  },
  {
    date: "2026-10-29", day: "Thu", lang: "en", style: "plain", motion: false,
    theme: "Kartik custom: deep daan, the lamp at dusk",
    cta: "soft", path: "/",
    card: {
      style: "plain", when: "Kartik, day 3",
      head: "Dawn for|the *river*.|Dusk for|the lamp.", sub: "Deep daan: a lamp on a leaf, set on the water.",
      cta: "Sit with the Ganga",
    },
    text: `
Keep both hours of Kartik. Dawn is for the snan. Dusk is for the lamp.

Deep daan is the simplest of the evening customs: a lamp on a leaf, lit and set on the water from the step. Through the month, households light lamps at the door, by the tulsi and on the river.

Sit with the river at dawn. Light 1 lamp at dusk, at your own door. 2 small acts, 1 day kept.

Your Kartik morning, 3 minutes:`,
  },
  {
    date: "2026-10-30", day: "Fri", lang: "en", style: "plain", motion: false,
    theme: "Patra: what the sheet carries, line by line",
    cta: "front", path: "/",
    card: {
      style: "plain", when: "Friday 30 October",
      head: "Your *Sankalp*|*Patra*.",
      rows: [["Names", "up to 5"], ["The river", "1 of 6"], ["Today's flow", "and how it runs"], ["The tithi", "that morning"], ["The distance", "to the ghat"], ["The hour", "yours and IST"]],
      offer: OFFER, cta: "Make yours",
    },
    text: `
Make your first Sankalp Patra this morning. Here is what it carries.

Up to 5 names from your family. The river you sat with, 1 of 6. That morning's flow and how it runs for this time of year. The tithi. The distance from your home to the ghat. The hour, in your city and in IST. 1 prayer you chose. Your portrait, if you add one. And an engraving drawn from that day's flow, so every morning's sheet carries its own water.

1 Patra for every morning you sit. 11 mornings, 11 sheets for the family group.

Make yours this morning:`,
  },
  /* ---------------------------------------------------------------- week 3 */
  {
    date: "2026-10-31", day: "Sat", lang: "hi", style: "plain", motion: false,
    theme: "Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time",
    cta: "soft", path: "/hi/rivers/shipra-ujjain",
    card: {
      style: "plain", when: "रामघाट, उज्जैन",
      head: "*शिप्रा*।|जहाँ काल|गिना जाता है।", sub: "महाकाल की नगरी। कार्तिक का ५वाँ दिन।",
      seal: { a: "०°", b: "देशांतर, यहीं से" }, sealRoom: 250,
      cta: "शिप्रा के साथ बैठिए",
    },
    text: `
उज्जैन अवंतिका है, सात मोक्षपुरियों में से एक। यहाँ के अधिष्ठाता महाकाल हैं, स्वयं काल के रूप में शिव, और महाकालेश्वर ज्योतिर्लिंग रामघाट से थोड़ी ही दूरी पर है।

यह नगर काल पर एक और दावा रखता है। प्राचीन भारतीय ज्योतिष में शून्य देशांतर उज्जैन से होकर गिना जाता था। अठारहवीं सदी में बनी वेधशाला आज भी खड़ी है, और आज भी सूर्य को पढ़ती है।

रामघाट शिप्रा का सबसे पुराना स्नान घाट है, और सिंहस्थ इसी पर केंद्रित होता है।

आज सुबह शिप्रा के साथ ३ मिनट बैठिए:`,
  },
  {
    date: "2026-11-01", day: "Sun", lang: "en", style: "plain", motion: true,
    theme: "Practice: the breath, 4 in and 6 out; US and Canadian clocks went back",
    cta: "soft", path: "/snan",
    card: {
      style: "plain", dur: 21, when: "Sunday 1 November",
      head: "Breathe with|the *Ganga*.", breath: { in: "Breathe in", out: "Breathe out" },
      cta: "Breathe with the Ganga",
    },
    text: `
Breathe with the river. 45 seconds of every snan belong to the breath.

The water on your screen rises for 4 seconds and falls for 6, at the river's own amplitude that morning. Breathe in as it rises. Breathe out as it falls. 4 and a half breaths, at the river's pace.

Clocks went back last night in the US and Canada. Tomorrow, Brahma muhurat opens at 04:38 in New York and at 05:04 in Toronto.

Breathe with the Ganga this morning:`,
  },
  {
    date: "2026-11-02", day: "Mon", lang: "en", style: "plain", motion: false,
    theme: "River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7)",
    cta: "soft", path: "/rivers/kaveri-talakaveri",
    card: {
      style: "plain", when: "Kartik, day 7",
      head: "Lopamudra.|Ponni.|*Kaveri.*", sub: "3 names. 1 river. It goes underground, and rises again.",
      cta: "Sit with the Kaveri",
    },
    text: `
Know the Kaveri by all 3 of its names.

In its own literature it is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country it is Ponni, and the delta it makes is most of what that name means to the families who farm it.

At Talakaveri it rises from a spring on Brahmagiri, goes underground almost at once, and comes up again at Bhagamandala, where it meets the Kannike and the Sujyoti.

Day 7 of Kartik. Sit with the Kaveri this morning:`,
  },
  {
    date: "2026-11-03", day: "Tue", lang: "en", style: "plain", motion: false,
    theme: "Panchang: Toronto and Har Ki Pauri, same morning, two clocks",
    cta: "soft", path: "/panchang/toronto",
    card: {
      style: "plain", when: "Kartik, day 8",
      head: "2 clocks.|*1 morning.*", sub: "Wednesday 4 November.",
      rows: [["Toronto", "05:06 to 06:01"], ["Har Ki Pauri then", "15:36 IST"], ["Har Ki Pauri", "04:48 to 05:40 IST"]],
      cta: "Find your hour",
    },
    text: `
Read the same morning on 2 clocks.

Tomorrow, Wednesday 4 November, Brahma muhurat opens in Toronto at 05:06. At that moment it is 15:36 at Har Ki Pauri, and the river has run in daylight for 9 hours.

The Ganga keeps its day. You keep yours: the river's figure for today, read in your own hour, with the time in Toronto and in IST side by side on your Sankalp Patra.

Find your city's hours, then sit:`,
  },
  {
    date: "2026-11-04", day: "Wed", lang: "en", style: "plain", motion: false,
    theme: "Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days",
    cta: "front", path: "/",
    card: {
      style: "plain", when: "Wednesday 4 November",
      head: "Rama|*Ekadashi*", sub: "The last Ekadashi before Diwali.",
      seal: { a: "4", b: "days to Diwali" }, sealRoom: 250,
      rows: [["New York, Toronto, London", "Today"], ["Dubai, Singapore, India", "Thu 5 Nov"]],
      cta: "Sit this morning",
    },
    text: `
Keep Rama Ekadashi, the last Ekadashi before Diwali. By your own sunrise it falls today in New York, Toronto, Houston and London. In Dubai, Singapore, Sydney and India it falls tomorrow, Thursday 5 November.

Ekadashi is first a fast kept at home, with its own rules for what is eaten and when the fast is broken. A morning snan is a customary part of the day.

Keep yours with the river. 3 minutes, then the day is yours.

Sit with the Ganga this morning:`,
  },
  {
    date: "2026-11-05", day: "Thu", lang: "en", style: "calendar", motion: true,
    theme: "Calendar: Diwali week as the panchang sets it in India",
    cta: "front", path: "/muhurat",
    card: {
      style: "calendar", scene: "newmoon", dur: 7, kick: "Thursday 5 November",
      title: "Diwali week", sub: "The dates, as kept in India",
      rows: [["Naraka Chaturdashi, before sunrise", "Sun 8 Nov"], ["Lakshmi puja, at dusk", "Sun 8 Nov"], ["Somvati Amavasya, at dawn", "Mon 9 Nov"], ["Yam Dwitiya, Bhai Dooj", "Wed 11 Nov"]],
      cta: "Plan your mornings",
    },
    text: `
Plan Diwali week. Here it is as the panchang sets it in India:

Sunday 8 November, before sunrise: Naraka Chaturdashi, the abhyanga snan, oil and then water.
Sunday 8 November, at dusk: Lakshmi puja, as the new moon holds.
Monday 9 November, at dawn: Somvati Amavasya, the Diwali new moon on a Monday, the fullest morning Har Ki Pauri gets outside a Kumbh.
Wednesday 11 November: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura.

3 of those are mornings at the water. Keep each one with the river, 3 minutes at a time.

Set up your mornings today:`,
  },
  {
    date: "2026-11-06", day: "Fri", lang: "en", style: "plain", motion: true,
    theme: "Patra: Send Diwali home, three sheets in one week",
    cta: "front", path: "/",
    card: {
      style: "plain", when: "Diwali week", sheet: PATRA,
      head: "Send|*Diwali*|home.", sub: "3 mornings this week. 3 sheets for the family.",
      offer: OFFER, cta: "Start now",
    },
    text: `
Send the family a morning with the river this Diwali.

Sit 3 minutes with the Ganga, and the press pulls a Sankalp Patra with up to 5 family names on it, today's flow at Har Ki Pauri, the tithi, and the hour in your city and in IST. It opens straight into WhatsApp.

Sit on Naraka Chaturdashi. Sit on Somvati Amavasya. Sit on Yam Dwitiya. 3 sheets for the family group in 1 week.

${PRICE} Start this morning:`,
  },
  /* ---------------------------------------------------------------- week 4 */
  {
    date: "2026-11-07", day: "Sat", lang: "hi", style: "calendar", motion: false,
    theme: "Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise",
    cta: "front", path: "/hi",
    card: {
      style: "calendar", scene: "newmoon", kick: "शनिवार ७ नवंबर",
      title: "नरक चतुर्दशी", sub: "कल, सूर्योदय से पहले",
      line: "परंपरा मानती है: इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।",
      cta: "कल भोर गंगा के साथ",
    },
    text: `
कल, रविवार ८ नवंबर, नरक चतुर्दशी है: दीपावली की अमावस्या से पहले की तिथि, जिसे छोटी दिवाली भी कहते हैं।

वर्ष का यही एक दिन है जब स्नान स्वयं अनुष्ठान है: अभ्यंग स्नान, पहले तेल, फिर जल, सूर्योदय से पहले, जब चंद्रमा अभी आकाश में हो। परंपरा मानती है कि इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।

स्नान के बाद ३ मिनट गंगा के साथ बैठिए, फिर परिवार को संकल्प पत्र भेजिए। उसी शाम लक्ष्मी पूजा है।

अपनी सुबह आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-11-08", day: "Sun", lang: "en", style: "signboard", motion: true,
    theme: "Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13)",
    cta: "front", path: "/",
    card: {
      style: "signboard", when: "Sunday 8 November",
      top: "Diwali", bottom: "tonight", seal: { a: "13", b: "of 29 Kartik mornings" },
      sub: "Abhyanga snan at dawn. Lakshmi puja at dusk.",
      rows: [["Har Ki Pauri", "06:36 IST"], ["New York", "06:34"], ["London", "07:06"]],
      cta: "Sit before the lamps",
    },
    text: `
Shubh Deepavali.

This morning is Naraka Chaturdashi, the abhyanga snan before sunrise. This evening is Lakshmi puja, as the new moon holds at dusk. Tomorrow at dawn the same new moon gives Har Ki Pauri its Somvati Amavasya.

Give the river 3 minutes before the house fills. Sit with the Ganga, hold your sankalp, and send the family a Sankalp Patra with their names on it before the first lamp is lit.

Sit with the Ganga this morning:`,
  },
  {
    date: "2026-11-09", day: "Mon", lang: "en", style: "calendar", motion: true,
    theme: "Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14)",
    cta: "front", path: "/muhurat/somvati-amavasya-2026",
    card: {
      style: "calendar", scene: "newmoon", dur: 7, kick: "Monday 9 November",
      title: "Somvati Amavasya", sub: "The Diwali new moon, on a Monday",
      rows: [["Sunrise, Har Ki Pauri", "06:37 IST"], ["Brahma muhurat there", "04:51 to 05:44 IST"]],
      cta: "Sit with the Ganga",
    },
    text: `
Sit with the Ganga on Somvati Amavasya. A new moon on a Monday carries that name, and this one is the Diwali new moon.

At Haridwar it is the greatest of the amavasya bathing days. Har Ki Pauri on a Somvati morning is the fullest the ghat gets outside a Kumbh. The sun rose over the steps today at 06:37 IST.

Amavasya is also the day tradition gives to the departed of one's line. Name them in your sankalp this morning.

Day 14 of Kartik. Sit with the Ganga now:`,
  },
  {
    date: "2026-11-10", day: "Tue", lang: "en", style: "plain", motion: true,
    theme: "Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow",
    cta: "front", path: "/rivers/yamuna-mathura",
    card: {
      style: "plain", when: "Vishram Ghat, Mathura",
      head: "*Yamuna*.|Tomorrow,|Yam Dwitiya.", sub: "Brother and sister. 1 river. 1 morning.",
      cta: "Sit with the Yamuna",
    },
    text: `
Put your brother's or sister's name on tomorrow's Patra. Wednesday 11 November is Yam Dwitiya, the day much of India keeps as Bhai Dooj.

The Yamuna is the daughter of Surya and the sister of Yama. The story is of Yamuna receiving her brother at her house. At Vishram Ghat in Mathura, brothers and sisters step into the Yamuna together, and the crowd that morning is the ghat's largest of the year.

It is a day built around a sibling, and a family spread across 3 countries can keep it on the same morning.

Set it up today, and sit with the Yamuna tomorrow:`,
  },
  {
    date: "2026-11-11", day: "Wed", lang: "en", style: "signboard", motion: false,
    theme: "Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura",
    cta: "front", path: "/",
    card: {
      style: "signboard", when: "Wednesday 11 November",
      top: "Bhai", bottom: "Dooj", seal: { a: "2", b: "names, 1 sheet" },
      box: { h: "Yam Dwitiya at the *Yamuna*.", p: "Put both your names on the Sankalp Patra. Send it before breakfast." },
      cta: "Sit with the Yamuna",
    },
    text: `
Today is Yam Dwitiya, Bhai Dooj.

At Vishram Ghat, brothers and sisters step into the Yamuna together. Siblings today live in different cities and different time zones. The river is the same for both of you.

Sit 3 minutes with the Yamuna, put both your names on the Sankalp Patra, and send it to your brother or sister before breakfast.

Sit with the Yamuna this morning:`,
  },
  {
    date: "2026-11-12", day: "Thu", lang: "en", style: "calendar", motion: false,
    theme: "Calendar: Chhath, the four days (Kartik day 17)",
    cta: "front", path: "/muhurat/chhath-2026",
    card: {
      style: "calendar", scene: "sunset", kick: "Thursday 12 November",
      title: "Chhath", sub: "4 days at the water, from tomorrow",
      rows: [["Nahay Khay", "Fri 13 Nov"], ["Kharna", "Sat 14 Nov"], ["Sandhya arghya, at sunset", "Sun 15 Nov"], ["Usha arghya, at sunrise", "Mon 16 Nov"]],
      cta: "Sit with the Ganga",
    },
    text: `
Get ready for Chhath. It begins tomorrow.

It is the one great festival kept standing in the water: an offering to the setting sun on the evening of Shashthi, a night of vigil, and an offering to the rising sun the next morning.

Nahay Khay, Friday 13 November. Kharna, Saturday 14. Sandhya arghya at sunset, Sunday 15. Usha arghya at sunrise, Monday 16.

Day 17 of Kartik. Keep the 4 mornings with the river:`,
  },
  {
    date: "2026-11-13", day: "Fri", lang: "en", style: "matchbox", motion: false,
    theme: "Price: 12 Kartik mornings left, eleven mornings for eleven",
    cta: "front", path: "/",
    card: {
      style: "matchbox", when: "Kartik, day 18",
      name: "Eleven mornings", tagline: "$11, £11 or €11",
      head: "*12* Kartik|mornings left.", seal: { a: "11", b: "for 11" },
      cta: "Start now",
    },
    text: `
Start today: 12 mornings of Kartik are left, to Kartik Purnima on Tuesday 24 November.

${PRICE} Start this morning and your 11th morning lands the day before the full moon. Add 1 more, and you close the month on Kartik Purnima itself.

Every morning gives the family a Sankalp Patra with their names on it.

Start this morning:`,
  },
  {
    date: "2026-11-14", day: "Sat", lang: "hi", style: "calendar", motion: true,
    theme: "Hindi: Chhath tomorrow, the evening and the dawn arghya",
    cta: "front", path: "/hi/muhurat/chhath-2026",
    card: {
      style: "calendar", scene: "sunset", dur: 7, kick: "शनिवार १४ नवंबर",
      title: "छठ पूजा", sub: "डूबते और उगते सूर्य को अर्घ्य",
      rows: [["संध्या अर्घ्य", "रवि १५ नवंबर"], ["उषा अर्घ्य", "सोम १६ नवंबर"]],
      cta: "छठ की भोर नदी के साथ",
    },
    text: `
कल, रविवार १५ नवंबर, छठ की षष्ठी है।

छठ वह महापर्व है जो जल में खड़े होकर रखा जाता है: षष्ठी की शाम डूबते सूर्य को संध्या अर्घ्य, फिर रात भर जागरण, और सप्तमी की भोर उगते सूर्य को उषा अर्घ्य।

कल सूर्यास्त प्रयागराज में १७:१४ पर है, हर की पौड़ी पर १७:२१ पर।

सोमवार की भोर, उषा अर्घ्य के बाद, ३ मिनट गंगा के साथ बैठिए और परिवार को संकल्प पत्र भेजिए। आज ही तैयार कीजिए:`,
  },
  {
    date: "2026-11-15", day: "Sun", lang: "en", style: "signboard", motion: true,
    theme: "Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20)",
    cta: "front", path: "/",
    card: {
      style: "signboard", when: "Sunday 15 November",
      top: "Chhath", bottom: "today", seal: { a: "20", b: "of 29 Kartik mornings" },
      sub: "Arghya at sunset. Arghya again at dawn.",
      rows: [["Sunset, New York", "16:37"], ["Sunset, London", "16:11"], ["Sunrise tomorrow, NY", "06:44"]],
      cta: "Sit with the Ganga",
    },
    text: `
Today is Chhath. This evening, families stand in the water and offer arghya to the setting sun. Tomorrow at dawn they offer it to the rising one.

Sunset today: 16:37 in New York, 16:11 in London. Sunrise tomorrow in New York: 06:44.

Keep the dawn with the river. After the usha arghya, sit 3 minutes with the Ganga and send the family a Sankalp Patra with their names, the tithi and the hour in IST.

Sit with the Ganga this morning, and again at tomorrow's dawn:`,
  },
];
