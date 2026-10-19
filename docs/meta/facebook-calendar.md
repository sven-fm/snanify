# Facebook calendar, 17 October to 15 November 2026

Thirty posts for the Snanify Page, one a day, each ready to publish: the words, the card or
video, the link. Each is scheduled in Facebook's own scheduler for 05:00 New York, so Meta
publishes it; the daily task `snanify-facebook-posts` checks every morning that the next 3
days are in the Planner and schedules any that are missing. Generated from
`ads/social/calendar.mjs` by `node ads/social/make-doc.mjs`: edit the module, not this file.

**The mix.** Three buckets, in turn: the dates (occasions, the panchang, Kartik snan day by
day), the rivers (the six waters, their stories and names) and the practice (the sankalp,
the breath, the Patra, Kartik customs). Hindi every Saturday. Every post ends on the snan:
front and centre on a dated day and on the Friday Patra, lighter on a river or a practice day.

**The look.** The brand kit (`brand/README.md`; `DESIGNSYSTEM.md` is canonical). PLAIN by
default: solid marigold, ink capitals with the river's name in sindoor, the press on its ink
wall, the seal, the river at the foot. Calendar art for festival days, the signboard for a
few loud days, the matchbox label for the eleven-morning pack only. Hindi on the cards in
Noto Serif Devanagari with Devanagari numerals. Fifteen posts move (an MP4, 4:5, 7 seconds,
the breath 21, silent, its last frame as `poster.png`), in the brand's own motions only:
flow, pull, stamp, sink, breathe and count. Facebook publishes a Page video as a reel.

**The facts.** Dates from `resolveOccasion()`, hours from `cityDay()` and astronomy-engine at
each ghat, computed 16 October 2026 (`ads/social/_sky.json`). Stories from
`src/content/rivers.ts` and `src/content/data/muhurat.json`. Live river figures are left
out: each post sends the reader to today's. `node ads/social/check.mjs` holds every word to
the copy rules.

**Re-render** after an edit: `node ads/social/render.mjs <date>` (or all, with no date), then
`node ads/social/make-doc.mjs`.

| Date | Theme | Style | Asset | CTA | Link |
| --- | --- | --- | --- | --- | --- |
| Sat 17 Oct | Date: Kaveri Sankramana, the sun entered Tula at 19:58 IST (posted on 18 Oct, after the 17th's run missed it) | calendar art | video | front | `/rivers/kaveri-talakaveri` |
| Sun 18 Oct | Practice: the sankalp, with the three example sankalps from setup (went out 18 Oct in the first design) | PLAIN | still | light | `/snan` |
| Mon 19 Oct | River: the Ganga's daily figure, ranked against every day since 1997 | PLAIN | video | light | `/live` |
| Tue 20 Oct | Panchang: Brahma muhurat tomorrow in five diaspora cities | PLAIN | still | light | `/panchang` |
| Wed 21 Oct | Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India | PLAIN | still | front | `/` |
| Thu 22 Oct | Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami | PLAIN | video | light | `/rivers/godavari-nashik` |
| Fri 23 Oct | Patra: Send the Ganga home, the Sankalp Patra beside the headline | PLAIN | still | front | `/` |
| Sat 24 Oct | Hindi: Kartik snan begins Tuesday 27 October | calendar art, Hindi | still | front | `/hi` |
| Sun 25 Oct | Date: Sharad Purnima tonight, the bathing morning after | calendar art | video | front | `/rivers/yamuna-mathura` |
| Mon 26 Oct | Date: Kartik snan starts tomorrow, 29 mornings | signboard | video | front | `/` |
| Tue 27 Oct | Date: Kartik snan, day 1 | calendar art | video | front | `/` |
| Wed 28 Oct | Ghat: the Triveni Sangam, two rivers seen and a third held in faith | PLAIN | video | light | `/rivers/triveni-prayagraj` |
| Thu 29 Oct | Kartik custom: deep daan, the lamp at dusk | PLAIN | still | light | `/` |
| Fri 30 Oct | Patra: what the sheet carries, line by line | PLAIN | still | front | `/` |
| Sat 31 Oct | Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time | PLAIN, Hindi | still | light | `/hi/rivers/shipra-ujjain` |
| Sun 1 Nov | Practice: the breath, 4 in and 6 out; US and Canadian clocks went back | PLAIN | video | light | `/snan` |
| Mon 2 Nov | River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7) | PLAIN | still | light | `/rivers/kaveri-talakaveri` |
| Tue 3 Nov | Panchang: Toronto and Har Ki Pauri, same morning, two clocks | PLAIN | still | light | `/panchang/toronto` |
| Wed 4 Nov | Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days | PLAIN | still | front | `/` |
| Thu 5 Nov | Calendar: Diwali week as the panchang sets it in India | calendar art | video | front | `/muhurat` |
| Fri 6 Nov | Patra: Send Diwali home, three sheets in one week | PLAIN | video | front | `/` |
| Sat 7 Nov | Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise | calendar art, Hindi | still | front | `/hi` |
| Sun 8 Nov | Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13) | signboard | video | front | `/` |
| Mon 9 Nov | Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14) | calendar art | video | front | `/muhurat/somvati-amavasya-2026` |
| Tue 10 Nov | Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow | PLAIN | video | front | `/rivers/yamuna-mathura` |
| Wed 11 Nov | Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura | signboard | still | front | `/` |
| Thu 12 Nov | Calendar: Chhath, the four days (Kartik day 17) | calendar art | still | front | `/muhurat/chhath-2026` |
| Fri 13 Nov | Price: 12 Kartik mornings left, eleven mornings for eleven | matchbox | still | front | `/` |
| Sat 14 Nov | Hindi: Chhath tomorrow, the evening and the dawn arghya | calendar art, Hindi | video | front | `/hi/muhurat/chhath-2026` |
| Sun 15 Nov | Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20) | signboard | video | front | `/` |

## Sat 17 Oct: Date: Kaveri Sankramana, the sun entered Tula at 19:58 IST (posted on 18 Oct, after the 17th's run missed it)

- Asset: `ads/social/posts/2026-10-17/video.mp4` (poster `ads/social/posts/2026-10-17/poster.png`)
- Style: calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-17/post.txt`):

```text
Yesterday at 19:58 IST the sun entered Tula, and Talakaveri kept the one great day of its year.

On Brahmagiri in Kodagu, the spring that starts the Kaveri is held to well up in its tank at that moment: the theerthodbhava. Families of Kodagu fix their year on it.

The Kaveri's own season runs on through the weeks after. Sit with it for 3 minutes: today's flow, a breath with the river, your own sankalp.

Sit with the Kaveri today.
Tap Sign up on the Page.
```

## Sun 18 Oct: Practice: the sankalp, with the three example sankalps from setup (went out 18 Oct in the first design)

- Asset: `ads/social/posts/2026-10-18/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-18/post.txt`):

```text
Every snan holds a sankalp: one intention, in your own words.

Write it once, when you set up. Each morning it comes back to you. Hold it under your thumb for 11 seconds while the ink fills. Then 1 minute of stillness.

Take one of these as it is, or write your own:
For my mother, every morning this month.
For the family, near and far, and a steady mind.
For my father, who first took me to the river.

Write yours and sit this morning.
Tap Sign up on the Page.
```

## Mon 19 Oct: River: the Ganga's daily figure, ranked against every day since 1997

- Asset: `ads/social/posts/2026-10-19/video.mp4` (poster `ads/social/posts/2026-10-19/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-19/post.txt`):

```text
Read the Ganga this morning. Har Ki Pauri gets 1 number each day: its flow today, in cubic metres a second.

Snanify ranks that number against every day in the same week of the year since 1997. One glance shows where this morning stands in 29 years of the river: running full, running low, or about as usual for this time of year.

Read it at dawn. Then breathe with it.

See today's Ganga and sit with it.
Tap Sign up on the Page.
```

## Tue 20 Oct: Panchang: Brahma muhurat tomorrow in five diaspora cities

- Asset: `ads/social/posts/2026-10-20/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-20/post.txt`):

```text
Set your alarm for Brahma muhurat: the hour before dawn, kept by tradition for prayer, study and the morning snan. It opens about 96 minutes before sunrise and closes about 48 minutes before it.

Tomorrow, Wednesday 21 October:
New York, 05:28 to 06:21
Toronto, 05:53 to 06:46
Houston, 05:45 to 06:36
London, 05:45 to 06:40
Dubai, 04:39 to 05:29

Wake inside the window. Open Snanify. Give the river 3 minutes.
Tap Sign up on the Page.
```

## Wed 21 Oct: Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India

- Asset: `ads/social/posts/2026-10-21/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-21/post.txt`):

```text
Keep Ekadashi by your own sunrise. This week it falls on 2 dates, and both are right.

A tithi belongs to the day it is running at sunrise where you are. In New York, Toronto and Houston that day is today, Wednesday 21 October. In London, Dubai, Singapore and India it is Thursday 22 October.

This is the Ekadashi of the bright half of Ashwin, kept by many as Papankusha Ekadashi. A morning snan is a customary part of the day. Keep yours with the river.

Sit with the river on your Ekadashi.
Tap Sign up on the Page.
```

## Thu 22 Oct: Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami

- Asset: `ads/social/posts/2026-10-22/video.mp4` (poster `ads/social/posts/2026-10-22/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-22/post.txt`):

```text
Meet the Godavari by its older name: Gautami. The sage Gautama brought the river down from Brahmagiri, above Trimbakeshwar, through Shiva's intercession. When the river is invoked, Gautami is still the name people use.

A few tens of kilometres on, it reaches Ram Kund in Panchavati, Nashik. Tradition holds that Rama and Sita bathed here, and that Rama performed his father Dasharatha's shraddha at this kund.

From there the Godavari crosses the whole peninsula to the Bay of Bengal: the longest river of southern India.

Sit with the Godavari this morning.
Tap Sign up on the Page.
```

## Fri 23 Oct: Patra: Send the Ganga home, the Sankalp Patra beside the headline

- Asset: `ads/social/posts/2026-10-23/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-23/post.txt`):

```text
Send the Ganga home. Every morning you sit, the press pulls a Sankalp Patra for you.

It carries up to 5 family names, the water you sat with, how the river runs that day, the tithi, the distance to the ghat, and the hour in your city and in IST. One prayer, chosen by you. A portrait, if you add one.

The share sheet opens with the Patra attached. Send it to the family group before the chai is ready.

Eleven mornings for $11, £11 or €11. Start this morning.
Tap Sign up on the Page.
```

## Sat 24 Oct: Hindi: Kartik snan begins Tuesday 27 October

- Asset: `ads/social/posts/2026-10-24/card.png`
- Style: calendar art, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-24/post.txt`):

```text
कार्तिक स्नान मंगलवार, २७ अक्टूबर से शुरू होता है और कार्तिक पूर्णिमा, २४ नवंबर तक चलता है।

परंपरा पूरे कार्तिक को एक ऋतु की तरह रखती है: भोर से पहले स्नान, शाम को दीप, और हल्का भोजन। बहुत से लोग पहला दिन, आख़िरी दिन और बीच में जितने हो सकें उतने दिन रखते हैं।

इस कार्तिक हर सुबह ३ मिनट गंगा के साथ बैठिए: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार के नामों वाला संकल्प पत्र, सीधे WhatsApp पर।

अपनी पहली सुबह आज ही तैयार कीजिए।
पेज पर Sign up दबाइए।
```

## Sun 25 Oct: Date: Sharad Purnima tonight, the bathing morning after

- Asset: `ads/social/posts/2026-10-25/video.mp4` (poster `ads/social/posts/2026-10-25/poster.png`)
- Style: calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-25/post.txt`):

```text
Set out the kheer tonight. It is Sharad Purnima, the first clear full moon after the rains.

Kojagara means "who is awake?": tradition holds that Lakshmi walks the earth tonight, asking it. In Braj it is the night of the raas, and the Yamuna is the river of that night.

The morning after is a bathing morning. Kartik snan begins the day after that.

Set up your snan today. Sit with the Yamuna at dawn.
Tap Sign up on the Page.
```

## Mon 26 Oct: Date: Kartik snan starts tomorrow, 29 mornings

- Asset: `ads/social/posts/2026-10-26/video.mp4` (poster `ads/social/posts/2026-10-26/poster.png`)
- Style: signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-26/post.txt`):

```text
Start today, and your first Kartik morning is ready when you wake. Kartik snan begins tomorrow, Tuesday 27 October, and runs 29 mornings to Kartik Purnima on 24 November.

Setup takes about 2 minutes: your river, your family's names, your prayer, your sankalp, your hour.

Tomorrow, Brahma muhurat opens at 05:33 in New York and at 04:52 in London. The sun rises over Har Ki Pauri at 06:27 IST.

Eleven mornings for $11, £11 or €11. Start now.
Tap Sign up on the Page.
```

## Tue 27 Oct: Date: Kartik snan, day 1

- Asset: `ads/social/posts/2026-10-27/video.mp4` (poster `ads/social/posts/2026-10-27/poster.png`)
- Style: calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-27/post.txt`):

```text
Do your first Kartik snan today!

For 29 mornings, to the full moon of 24 November, Har Ki Pauri keeps the month as a daily discipline: the river before dawn, lamps in the evening, a lighter table.

Keep it with the Ganga from wherever you wake. 3 minutes: today's flow at Har Ki Pauri, a breath with the river, your sankalp. Then the family gets a Sankalp Patra with their names on it.

Sit your first Kartik morning now.
Tap Sign up on the Page.
```

## Wed 28 Oct: Ghat: the Triveni Sangam, two rivers seen and a third held in faith

- Asset: `ads/social/posts/2026-10-28/video.mp4` (poster `ads/social/posts/2026-10-28/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-28/post.txt`):

```text
Look for the line at Prayagraj. The Ganga arrives from the north and the Yamuna from the west, and for a stretch they run side by side: the Yamuna darker and slower, the Ganga paler and quicker.

Tradition holds that the Sarasvati joins them here, unseen. The 3 give the place its name: Triveni, 3 braids. Prayag means the place of sacrifice, and the city is called Tirtharaj, the king of tirthas.

Kartik bathing at the Sangam runs the full month.

Sit at the Sangam this morning.
Tap Sign up on the Page.
```

## Thu 29 Oct: Kartik custom: deep daan, the lamp at dusk

- Asset: `ads/social/posts/2026-10-29/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-29/post.txt`):

```text
Keep both hours of Kartik. Dawn is for the snan. Dusk is for the lamp.

Deep daan is the simplest of the evening customs: a lamp on a leaf, lit and set on the water from the step. Through the month, households light lamps at the door, by the tulsi and on the river.

Sit with the river at dawn. Light 1 lamp at dusk, at your own door. 2 small acts, 1 day kept.

Your Kartik morning, 3 minutes.
Tap Sign up on the Page.
```

## Fri 30 Oct: Patra: what the sheet carries, line by line

- Asset: `ads/social/posts/2026-10-30/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-30/post.txt`):

```text
Make your first Sankalp Patra this morning. Here is what it carries.

Up to 5 names from your family. The river you sat with, 1 of 6. That morning's flow and how it runs for this time of year. The tithi. The distance from your home to the ghat. The hour, in your city and in IST. 1 prayer you chose. Your portrait, if you add one. And an engraving drawn from that day's flow, so every morning's sheet carries its own water.

1 Patra for every morning you sit. 11 mornings, 11 sheets for the family group.

Make yours this morning.
Tap Sign up on the Page.
```

## Sat 31 Oct: Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time

- Asset: `ads/social/posts/2026-10-31/card.png`
- Style: PLAIN, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-31/post.txt`):

```text
उज्जैन अवंतिका है, सात मोक्षपुरियों में से एक। यहाँ के अधिष्ठाता महाकाल हैं, स्वयं काल के रूप में शिव, और महाकालेश्वर ज्योतिर्लिंग रामघाट से थोड़ी ही दूरी पर है।

यह नगर काल पर एक और दावा रखता है। प्राचीन भारतीय ज्योतिष में शून्य देशांतर उज्जैन से होकर गिना जाता था। अठारहवीं सदी में बनी वेधशाला आज भी खड़ी है, और आज भी सूर्य को पढ़ती है।

रामघाट शिप्रा का सबसे पुराना स्नान घाट है, और सिंहस्थ इसी पर केंद्रित होता है।

आज सुबह शिप्रा के साथ ३ मिनट बैठिए।
पेज पर Sign up दबाइए।
```

## Sun 1 Nov: Practice: the breath, 4 in and 6 out; US and Canadian clocks went back

- Asset: `ads/social/posts/2026-11-01/video.mp4` (poster `ads/social/posts/2026-11-01/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-01/post.txt`):

```text
Breathe with the river. 45 seconds of every snan belong to the breath.

The water on your screen rises for 4 seconds and falls for 6, at the river's own amplitude that morning. Breathe in as it rises. Breathe out as it falls. 4 and a half breaths, at the river's pace.

Clocks went back last night in the US and Canada. Tomorrow, Brahma muhurat opens at 04:38 in New York and at 05:04 in Toronto.

Breathe with the Ganga this morning.
Tap Sign up on the Page.
```

## Mon 2 Nov: River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7)

- Asset: `ads/social/posts/2026-11-02/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-02/post.txt`):

```text
Know the Kaveri by all 3 of its names.

In its own literature it is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country it is Ponni, and the delta it makes is most of what that name means to the families who farm it.

At Talakaveri it rises from a spring on Brahmagiri, goes underground almost at once, and comes up again at Bhagamandala, where it meets the Kannike and the Sujyoti.

Day 7 of Kartik. Sit with the Kaveri this morning.
Tap Sign up on the Page.
```

## Tue 3 Nov: Panchang: Toronto and Har Ki Pauri, same morning, two clocks

- Asset: `ads/social/posts/2026-11-03/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-03/post.txt`):

```text
Read the same morning on 2 clocks.

Tomorrow, Wednesday 4 November, Brahma muhurat opens in Toronto at 05:06. At that moment it is 15:36 at Har Ki Pauri, and the river has run in daylight for 9 hours.

The Ganga keeps its day. You keep yours: the river's figure for today, read in your own hour, with the time in Toronto and in IST side by side on your Sankalp Patra.

Find your city's hours, then sit.
Tap Sign up on the Page.
```

## Wed 4 Nov: Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days

- Asset: `ads/social/posts/2026-11-04/card.png`
- Style: PLAIN, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-04/post.txt`):

```text
Keep Rama Ekadashi, the last Ekadashi before Diwali. By your own sunrise it falls today in New York, Toronto, Houston and London. In Dubai, Singapore, Sydney and India it falls tomorrow, Thursday 5 November.

Ekadashi is first a fast kept at home, with its own rules for what is eaten and when the fast is broken. A morning snan is a customary part of the day.

Keep yours with the river. 3 minutes, then the day is yours.

Sit with the Ganga this morning.
Tap Sign up on the Page.
```

## Thu 5 Nov: Calendar: Diwali week as the panchang sets it in India

- Asset: `ads/social/posts/2026-11-05/video.mp4` (poster `ads/social/posts/2026-11-05/poster.png`)
- Style: calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-05/post.txt`):

```text
Plan Diwali week. Here it is as the panchang sets it in India:

Sunday 8 November, before sunrise: Naraka Chaturdashi, the abhyanga snan, oil and then water.
Sunday 8 November, at dusk: Lakshmi puja, as the new moon holds.
Monday 9 November, at dawn: Somvati Amavasya, the Diwali new moon on a Monday, the fullest morning Har Ki Pauri gets outside a Kumbh.
Wednesday 11 November: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura.

3 of those are mornings at the water. Keep each one with the river, 3 minutes at a time.

Set up your mornings today.
Tap Sign up on the Page.
```

## Fri 6 Nov: Patra: Send Diwali home, three sheets in one week

- Asset: `ads/social/posts/2026-11-06/video.mp4` (poster `ads/social/posts/2026-11-06/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-06/post.txt`):

```text
Send the family a morning with the river this Diwali.

Sit 3 minutes with the Ganga, and the press pulls a Sankalp Patra with up to 5 family names on it, today's flow at Har Ki Pauri, the tithi, and the hour in your city and in IST. It opens straight into WhatsApp.

Sit on Naraka Chaturdashi. Sit on Somvati Amavasya. Sit on Yam Dwitiya. 3 sheets for the family group in 1 week.

Eleven mornings for $11, £11 or €11. Start this morning.
Tap Sign up on the Page.
```

## Sat 7 Nov: Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise

- Asset: `ads/social/posts/2026-11-07/card.png`
- Style: calendar art, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-07/post.txt`):

```text
कल, रविवार ८ नवंबर, नरक चतुर्दशी है: दीपावली की अमावस्या से पहले की तिथि, जिसे छोटी दिवाली भी कहते हैं।

वर्ष का यही एक दिन है जब स्नान स्वयं अनुष्ठान है: अभ्यंग स्नान, पहले तेल, फिर जल, सूर्योदय से पहले, जब चंद्रमा अभी आकाश में हो। परंपरा मानती है कि इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।

स्नान के बाद ३ मिनट गंगा के साथ बैठिए, फिर परिवार को संकल्प पत्र भेजिए। उसी शाम लक्ष्मी पूजा है।

अपनी सुबह आज ही तैयार कीजिए।
पेज पर Sign up दबाइए।
```

## Sun 8 Nov: Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13)

- Asset: `ads/social/posts/2026-11-08/video.mp4` (poster `ads/social/posts/2026-11-08/poster.png`)
- Style: signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-08/post.txt`):

```text
Shubh Deepavali.

This morning is Naraka Chaturdashi, the abhyanga snan before sunrise. This evening is Lakshmi puja, as the new moon holds at dusk. Tomorrow at dawn the same new moon gives Har Ki Pauri its Somvati Amavasya.

Give the river 3 minutes before the house fills. Sit with the Ganga, hold your sankalp, and send the family a Sankalp Patra with their names on it before the first lamp is lit.

Sit with the Ganga this morning.
Tap Sign up on the Page.
```

## Mon 9 Nov: Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14)

- Asset: `ads/social/posts/2026-11-09/video.mp4` (poster `ads/social/posts/2026-11-09/poster.png`)
- Style: calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-09/post.txt`):

```text
Sit with the Ganga on Somvati Amavasya. A new moon on a Monday carries that name, and this one is the Diwali new moon.

At Haridwar it is the greatest of the amavasya bathing days. Har Ki Pauri on a Somvati morning is the fullest the ghat gets outside a Kumbh. The sun rose over the steps today at 06:37 IST.

Amavasya is also the day tradition gives to the departed of one's line. Name them in your sankalp this morning.

Day 14 of Kartik. Sit with the Ganga now.
Tap Sign up on the Page.
```

## Tue 10 Nov: Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow

- Asset: `ads/social/posts/2026-11-10/video.mp4` (poster `ads/social/posts/2026-11-10/poster.png`)
- Style: PLAIN, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-10/post.txt`):

```text
Put your brother's or sister's name on tomorrow's Patra. Wednesday 11 November is Yam Dwitiya, the day much of India keeps as Bhai Dooj.

The Yamuna is the daughter of Surya and the sister of Yama. The story is of Yamuna receiving her brother at her house. At Vishram Ghat in Mathura, brothers and sisters step into the Yamuna together, and the crowd that morning is the ghat's largest of the year.

It is a day built around a sibling, and a family spread across 3 countries can keep it on the same morning.

Set it up today, and sit with the Yamuna tomorrow.
Tap Sign up on the Page.
```

## Wed 11 Nov: Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura

- Asset: `ads/social/posts/2026-11-11/card.png`
- Style: signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-11/post.txt`):

```text
Today is Yam Dwitiya, Bhai Dooj.

At Vishram Ghat, brothers and sisters step into the Yamuna together. Siblings today live in different cities and different time zones. The river is the same for both of you.

Sit 3 minutes with the Yamuna, put both your names on the Sankalp Patra, and send it to your brother or sister before breakfast.

Sit with the Yamuna this morning.
Tap Sign up on the Page.
```

## Thu 12 Nov: Calendar: Chhath, the four days (Kartik day 17)

- Asset: `ads/social/posts/2026-11-12/card.png`
- Style: calendar art, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-12/post.txt`):

```text
Get ready for Chhath. It begins tomorrow.

It is the one great festival kept standing in the water: an offering to the setting sun on the evening of Shashthi, a night of vigil, and an offering to the rising sun the next morning.

Nahay Khay, Friday 13 November. Kharna, Saturday 14. Sandhya arghya at sunset, Sunday 15. Usha arghya at sunrise, Monday 16.

Day 17 of Kartik. Keep the 4 mornings with the river.
Tap Sign up on the Page.
```

## Fri 13 Nov: Price: 12 Kartik mornings left, eleven mornings for eleven

- Asset: `ads/social/posts/2026-11-13/card.png`
- Style: matchbox, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-13/post.txt`):

```text
Start today: 12 mornings of Kartik are left, to Kartik Purnima on Tuesday 24 November.

Eleven mornings for $11, £11 or €11. Start this morning and your 11th morning lands the day before the full moon. Add 1 more, and you close the month on Kartik Purnima itself.

Every morning gives the family a Sankalp Patra with their names on it.

Start this morning.
Tap Sign up on the Page.
```

## Sat 14 Nov: Hindi: Chhath tomorrow, the evening and the dawn arghya

- Asset: `ads/social/posts/2026-11-14/video.mp4` (poster `ads/social/posts/2026-11-14/poster.png`)
- Style: calendar art, Hindi, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-14/post.txt`):

```text
कल, रविवार १५ नवंबर, छठ की षष्ठी है।

छठ वह महापर्व है जो जल में खड़े होकर रखा जाता है: षष्ठी की शाम डूबते सूर्य को संध्या अर्घ्य, फिर रात भर जागरण, और सप्तमी की भोर उगते सूर्य को उषा अर्घ्य।

कल सूर्यास्त प्रयागराज में १७:१४ पर है, हर की पौड़ी पर १७:२१ पर।

सोमवार की भोर, उषा अर्घ्य के बाद, ३ मिनट गंगा के साथ बैठिए और परिवार को संकल्प पत्र भेजिए। आज ही तैयार कीजिए।
पेज पर Sign up दबाइए।
```

## Sun 15 Nov: Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20)

- Asset: `ads/social/posts/2026-11-15/video.mp4` (poster `ads/social/posts/2026-11-15/poster.png`)
- Style: signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-15/post.txt`):

```text
Today is Chhath. This evening, families stand in the water and offer arghya to the setting sun. Tomorrow at dawn they offer it to the rising one.

Sunset today: 16:37 in New York, 16:11 in London. Sunrise tomorrow in New York: 06:44.

Keep the dawn with the river. After the usha arghya, sit 3 minutes with the Ganga and send the family a Sankalp Patra with their names, the tithi and the hour in IST.

Sit with the Ganga this morning, and again at tomorrow's dawn.
Tap Sign up on the Page.
```
