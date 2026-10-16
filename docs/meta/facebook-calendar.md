# Facebook calendar, 17 October to 15 November 2026

Thirty posts for the Snanify Page, one a day, each ready to publish: the words, the card or
video, the link. The daily task `snanify-facebook-posts` reads this file each morning, takes
the day's row and schedules it for about 05:00 New York. Generated from
`ads/social/calendar.mjs` by `node ads/social/make-doc.mjs`: edit the module, not this file.

**The mix.** Three buckets, in turn: the dates (occasions, the panchang, Kartik snan day by
day), the rivers (the six waters, their stories and names) and the practice (the sankalp,
the breath, the Patra, Kartik customs). Hindi every Saturday. Every post ends on the snan:
front and centre on a dated day and on the Friday Patra, lighter on a river or a practice day.

**The look.** B1 calendar art for festival days and the panchang, B2 the matchbox label for
the rivers and the price, B4 the painted signboard for the loud days. Fifteen posts move (an
MP4, 4:5, 7 to 21 seconds, silent, its last frame as `poster.png`); fifteen are still.

**The facts.** Dates from `resolveOccasion()`, hours from `cityDay()` and astronomy-engine at
each ghat, computed 16 October 2026 (`ads/social/_sky.json`). Stories from
`src/content/rivers.ts` and `src/content/data/muhurat.json`. Live river figures are left
out: each post sends the reader to today's. `node ads/social/check.mjs` holds every word to
the copy rules.

**Re-render** after an edit: `node ads/social/render.mjs <date>` (or all, with no date), then
`node ads/social/make-doc.mjs`.

| Date | Theme | Style | Asset | CTA | Link |
| --- | --- | --- | --- | --- | --- |
| Sat 17 Oct | Date: Kaveri Sankramana, the sun enters Tula at 19:58 IST | B1 calendar art | video | front | `/rivers/kaveri-talakaveri` |
| Sun 18 Oct | Practice: the sankalp, with the three example sankalps from setup | B2 matchbox | still | light | `/snan` |
| Mon 19 Oct | River: the Ganga's daily figure, ranked against every day since 1997 | B4 signboard | video | light | `/live` |
| Tue 20 Oct | Panchang: Brahma muhurat tomorrow in five diaspora cities | B1 calendar art | still | light | `/panchang` |
| Wed 21 Oct | Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India | B4 signboard | still | front | `/` |
| Thu 22 Oct | Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami | B2 matchbox | video | light | `/rivers/godavari-nashik` |
| Fri 23 Oct | Patra: Send the Ganga home, the specimen in a phone | B4 signboard | still | front | `/` |
| Sat 24 Oct | Hindi: Kartik snan begins Tuesday 27 October | B1 calendar art, Hindi | still | front | `/hi` |
| Sun 25 Oct | Date: Sharad Purnima tonight, the bathing morning after | B1 calendar art | video | front | `/rivers/yamuna-mathura` |
| Mon 26 Oct | Date: Kartik snan starts tomorrow, 29 mornings | B4 signboard | video | front | `/` |
| Tue 27 Oct | Date: Kartik snan, day 1 | B1 calendar art | video | front | `/` |
| Wed 28 Oct | Ghat: the Triveni Sangam, two rivers seen and a third held in faith | B2 matchbox | video | light | `/rivers/triveni-prayagraj` |
| Thu 29 Oct | Kartik custom: deep daan, the lamp at dusk | B1 calendar art | still | light | `/` |
| Fri 30 Oct | Patra: what the sheet carries, line by line | B4 signboard | still | front | `/` |
| Sat 31 Oct | Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time | B2 matchbox, Hindi | still | light | `/hi/rivers/shipra-ujjain` |
| Sun 1 Nov | Practice: the breath, four in and six out; US and Canadian clocks went back | B4 signboard | video | light | `/snan` |
| Mon 2 Nov | River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7) | B2 matchbox | still | light | `/rivers/kaveri-talakaveri` |
| Tue 3 Nov | Panchang: Toronto and Har Ki Pauri, same morning, two clocks | B1 calendar art | still | light | `/panchang/toronto` |
| Wed 4 Nov | Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days | B4 signboard | still | front | `/` |
| Thu 5 Nov | Calendar: Diwali week as the panchang sets it in India | B1 calendar art | video | front | `/muhurat` |
| Fri 6 Nov | Patra: Send Diwali home, three sheets in one week | B2 matchbox | video | front | `/` |
| Sat 7 Nov | Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise | B1 calendar art, Hindi | still | front | `/hi` |
| Sun 8 Nov | Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13) | B4 signboard | video | front | `/` |
| Mon 9 Nov | Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14) | B1 calendar art | video | front | `/muhurat/somvati-amavasya-2026` |
| Tue 10 Nov | Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow | B2 matchbox | video | front | `/rivers/yamuna-mathura` |
| Wed 11 Nov | Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura | B4 signboard | still | front | `/` |
| Thu 12 Nov | Calendar: Chhath, the four days (Kartik day 17) | B1 calendar art | still | front | `/muhurat/chhath-2026` |
| Fri 13 Nov | Price: twelve Kartik mornings left, eleven for eleven | B2 matchbox | still | front | `/` |
| Sat 14 Nov | Hindi: Chhath tomorrow, the evening and the dawn arghya | B1 calendar art, Hindi | video | front | `/hi/muhurat/chhath-2026` |
| Sun 15 Nov | Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20) | B4 signboard | video | front | `/` |

## Sat 17 Oct: Date: Kaveri Sankramana, the sun enters Tula at 19:58 IST

- Asset: `ads/social/posts/2026-10-17/video.mp4` (poster `ads/social/posts/2026-10-17/poster.png`)
- Style: B1 calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-17/post.txt`):

```text
The sun enters Tula today at 19:58 IST, and Talakaveri keeps the one great day of its year.

On Brahmagiri in Kodagu, the spring that starts the Kaveri is held to well up in its tank at that very moment: the theerthodbhava. Families of Kodagu fix their year on it.

Keep the hour with the river. Three minutes: the Kaveri's flow today, a breath with the water, a sankalp in your own words.

In London the moment falls at 15:28. In New York, at 10:28.

Sit with the Kaveri today:
https://www.snanify.com/rivers/kaveri-talakaveri?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-17
```

## Sun 18 Oct: Practice: the sankalp, with the three example sankalps from setup

- Asset: `ads/social/posts/2026-10-18/card.png`
- Style: B2 matchbox, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-18/post.txt`):

```text
Every snan holds a sankalp: one intention, in your own words.

Write it once, when you set up. Each morning it comes back to you, and you hold it under your thumb for eleven seconds while the ink fills. Then a minute of stillness.

Take one of these as it is, or write your own:
For my mother, every morning this month.
For the family, near and far, and a steady mind.
For my father, who first took me to the river.

Write yours and sit this morning:
https://www.snanify.com/snan?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-18
```

## Mon 19 Oct: River: the Ganga's daily figure, ranked against every day since 1997

- Asset: `ads/social/posts/2026-10-19/video.mp4` (poster `ads/social/posts/2026-10-19/poster.png`)
- Style: B4 signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-19/post.txt`):

```text
The Ganga at Har Ki Pauri gets one number each morning: its flow today, in cubic metres a second.

Snanify ranks that number against every day in the same week of the year since 1997. One glance tells you where this morning stands in almost thirty years of the river: running full, running low, or near its usual.

Read it at dawn, then breathe with it. The water on your screen rises and falls at the river's own amplitude.

See today's Ganga and sit with it:
https://www.snanify.com/live?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-19
```

## Tue 20 Oct: Panchang: Brahma muhurat tomorrow in five diaspora cities

- Asset: `ads/social/posts/2026-10-20/card.png`
- Style: B1 calendar art, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-20/post.txt`):

```text
Brahma muhurat is the hour before dawn, the window tradition keeps for prayer, study and the morning snan. It opens about an hour and a half before sunrise and closes about forty-eight minutes before it.

Here it is for tomorrow, Wednesday 21 October:
New York, 05:28 to 06:21
Toronto, 05:53 to 06:46
Houston, 05:45 to 06:36
London, 05:45 to 06:40
Dubai, 04:39 to 05:29

Set an alarm inside the window, open Snanify, and give the river three minutes. Your city's hours, every day:
https://www.snanify.com/panchang?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-20
```

## Wed 21 Oct: Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India

- Asset: `ads/social/posts/2026-10-21/card.png`
- Style: B4 signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-21/post.txt`):

```text
Ekadashi falls on two dates this week, and both are right.

A tithi is kept on the day it is running at your own sunrise. In New York, Toronto and Houston that day is today, Wednesday 21 October. In London, Dubai, Singapore and India it is Thursday 22 October.

This is the Ekadashi of the bright half of Ashwin, kept by many as Papankusha Ekadashi. A morning snan belongs to the day. Keep yours with the river, wherever you wake.

Sit with the river on your Ekadashi:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-21
```

## Thu 22 Oct: Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami

- Asset: `ads/social/posts/2026-10-22/video.mp4` (poster `ads/social/posts/2026-10-22/poster.png`)
- Style: B2 matchbox, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-22/post.txt`):

```text
The Godavari has an older name: Gautami. The sage Gautama brought the river down from Brahmagiri, above Trimbakeshwar, through Shiva's intercession. When the river is invoked, Gautami is still the name people use.

A few tens of kilometres downstream it reaches Ram Kund in Panchavati, Nashik. Tradition holds that Rama and Sita bathed here, and that Rama performed his father Dasharatha's shraddha at this kund.

From there the Godavari crosses the whole peninsula to the Bay of Bengal, the longest river of southern India.

Sit with the Godavari this morning:
https://www.snanify.com/rivers/godavari-nashik?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-22
```

## Fri 23 Oct: Patra: Send the Ganga home, the specimen in a phone

- Asset: `ads/social/posts/2026-10-23/card.png`
- Style: B4 signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-23/post.txt`):

```text
Every morning you sit, the press pulls a Sankalp Patra for you.

It carries up to five family names, the water you sat with, the river's flow that day and its rank since 1997, the tithi, the distance to the ghat, and the hour in your city and in IST. One prayer, chosen by you. A portrait, if you add one.

The share sheet opens with the Patra attached. Send it to the family group before the chai is ready.

Eleven mornings for $11, £11 or €11. Start this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-23
```

## Sat 24 Oct: Hindi: Kartik snan begins Tuesday 27 October

- Asset: `ads/social/posts/2026-10-24/card.png`
- Style: B1 calendar art, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-24/post.txt`):

```text
कार्तिक स्नान मंगलवार, 27 अक्टूबर से आरंभ होता है और कार्तिक पूर्णिमा, 24 नवंबर तक चलता है।

परंपरा पूरे कार्तिक को एक ऋतु की तरह रखती है: भोर से पहले स्नान, संध्या में दीप, और हल्का भोजन। जो पूरा मास रखते हैं वे हर सुबह उठते हैं। बहुत से लोग पहला दिन, अंतिम दिन और बीच में जितने हो सकें उतने दिन रखते हैं।

इस कार्तिक हर सुबह तीन मिनट गंगा के साथ बैठिए: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार के नामों वाला संकल्प पत्र, सीधे WhatsApp पर।

अपनी पहली सुबह आज ही तैयार कीजिए:
https://www.snanify.com/hi?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-24
```

## Sun 25 Oct: Date: Sharad Purnima tonight, the bathing morning after

- Asset: `ads/social/posts/2026-10-25/video.mp4` (poster `ads/social/posts/2026-10-25/poster.png`)
- Style: B1 calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-25/post.txt`):

```text
Tonight is Sharad Purnima, the first clear full moon after the rains.

Families set kheer out under the moon. Kojagara means "who is awake?": tradition holds that Lakshmi walks the earth tonight, asking it. In Braj it is the night of the raas, and the Yamuna is the river of that night.

The morning after is a bathing morning, and Kartik snan begins the day after that.

Set up your snan today, and sit with the Yamuna at dawn:
https://www.snanify.com/rivers/yamuna-mathura?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-25
```

## Mon 26 Oct: Date: Kartik snan starts tomorrow, 29 mornings

- Asset: `ads/social/posts/2026-10-26/video.mp4` (poster `ads/social/posts/2026-10-26/poster.png`)
- Style: B4 signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-26/post.txt`):

```text
Kartik snan starts tomorrow, Tuesday 27 October, and runs 29 mornings to Kartik Purnima on 24 November.

Start today, so your first morning is ready when you wake. Setup takes about two minutes: your water, your family's names, your prayer, your sankalp, your hour.

Tomorrow, Brahma muhurat opens at 05:33 in New York and at 04:52 in London. The sun rises over Har Ki Pauri at 06:27 IST.

Eleven mornings for $11, £11 or €11. Start now:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-26
```

## Tue 27 Oct: Date: Kartik snan, day 1

- Asset: `ads/social/posts/2026-10-27/video.mp4` (poster `ads/social/posts/2026-10-27/poster.png`)
- Style: B1 calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-27/post.txt`):

```text
Kartik snan begins this morning.

For 29 mornings, to the full moon of 24 November, Har Ki Pauri keeps the month as a daily discipline: a bath before dawn, lamps in the evening, a lighter table.

Keep it with the Ganga from wherever you wake. Three minutes: today's flow at Har Ki Pauri, a breath with the river, your sankalp. Then the family gets a Sankalp Patra with their names on it.

Sit your first Kartik morning now:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-27
```

## Wed 28 Oct: Ghat: the Triveni Sangam, two rivers seen and a third held in faith

- Asset: `ads/social/posts/2026-10-28/video.mp4` (poster `ads/social/posts/2026-10-28/poster.png`)
- Style: B2 matchbox, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-28/post.txt`):

```text
At Prayagraj the Ganga arrives from the north and the Yamuna from the west. For a stretch they run side by side, and you can see the line from a boat: the Yamuna darker and slower, the Ganga paler and quicker.

Tradition holds that the Sarasvati joins them here, unseen. The three give the place its name: Triveni, three braids. Prayag means the place of sacrifice, and the city is called Tirtharaj, the king of tirthas.

Kartik bathing at the Sangam runs the full month.

Sit at the Sangam this morning:
https://www.snanify.com/rivers/triveni-prayagraj?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-28
```

## Thu 29 Oct: Kartik custom: deep daan, the lamp at dusk

- Asset: `ads/social/posts/2026-10-29/card.png`
- Style: B1 calendar art, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-29/post.txt`):

```text
Kartik keeps two hours of the day. Dawn is for the snan. Dusk is for the lamp.

Deep daan is the simplest of the evening customs: a lamp on a leaf, lit and set on the water from the step. Through the month, households light lamps at the door, by the tulsi and on the river.

Sit with the river at dawn. Light one lamp at dusk, at your own door. Two small acts, one day kept.

Your Kartik morning, three minutes:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-29
```

## Fri 30 Oct: Patra: what the sheet carries, line by line

- Asset: `ads/social/posts/2026-10-30/card.png`
- Style: B4 signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-30/post.txt`):

```text
Here is what the Sankalp Patra carries, line by line.

Up to five names from your family. The water you sat with, one of six. That morning's flow and its rank against every day since 1997. The tithi. The distance from your home to the ghat. The hour, in your city and in IST. One prayer you chose. Your portrait, if you add one. And an engraving drawn from that day's flow, so every morning's sheet carries its own water.

One Patra for every morning you complete. Eleven mornings, eleven sheets for the family group.

Make your first one this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-30
```

## Sat 31 Oct: Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time

- Asset: `ads/social/posts/2026-10-31/card.png`
- Style: B2 matchbox, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-10-31/post.txt`):

```text
उज्जैन अवंतिका है, सात मोक्षपुरियों में से एक। यहाँ के अधिष्ठाता महाकाल हैं, स्वयं काल के रूप में शिव, और महाकालेश्वर ज्योतिर्लिंग रामघाट से थोड़ी ही दूरी पर है।

यह नगर काल पर एक और दावा रखता है। प्राचीन भारतीय ज्योतिष में शून्य देशांतर उज्जैन से होकर गिना जाता था, और अठारहवीं सदी में बनी वेधशाला आज भी खड़ी है और आज भी सूर्य को पढ़ती है।

रामघाट शिप्रा का सबसे पुराना स्नान घाट है, और सिंहस्थ इसी पर केंद्रित होता है। कार्तिक का पाँचवाँ दिन है।

आज सुबह शिप्रा के साथ तीन मिनट बैठिए:
https://www.snanify.com/hi/rivers/shipra-ujjain?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-31
```

## Sun 1 Nov: Practice: the breath, four in and six out; US and Canadian clocks went back

- Asset: `ads/social/posts/2026-11-01/video.mp4` (poster `ads/social/posts/2026-11-01/poster.png`)
- Style: B4 signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-01/post.txt`):

```text
Forty-five seconds of every snan belong to the breath.

The engraved water on your screen rises for four seconds and falls for six, at the river's own amplitude that morning. Breathe in as it rises. Breathe out as it falls. Four and a half breaths, and the river sets the pace.

Clocks went back last night in the US and Canada. Brahma muhurat in New York tomorrow opens at 04:38, in Toronto at 05:04.

Breathe with the Ganga this morning:
https://www.snanify.com/snan?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-01
```

## Mon 2 Nov: River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7)

- Asset: `ads/social/posts/2026-11-02/card.png`
- Style: B2 matchbox, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-02/post.txt`):

```text
The Kaveri has three names, and each one tells a story.

In its own literature it is Lopamudra, wife of the sage Agastya, released from his kamandalu to become the river. In Tamil country it is Ponni, and the delta it makes is most of what that name means to the families who farm it.

At Talakaveri it rises from a spring on Brahmagiri, goes underground almost at once, and comes up again at Bhagamandala, where it meets the Kannike and the Sujyoti.

Day 7 of Kartik. Sit with the Kaveri this morning:
https://www.snanify.com/rivers/kaveri-talakaveri?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-02
```

## Tue 3 Nov: Panchang: Toronto and Har Ki Pauri, same morning, two clocks

- Asset: `ads/social/posts/2026-11-03/card.png`
- Style: B1 calendar art, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-03/post.txt`):

```text
Same morning, two clocks.

Tomorrow, Wednesday 4 November, Brahma muhurat opens in Toronto at 05:06. At that moment it is 15:36 at Har Ki Pauri, and the river has been running in daylight for nine hours.

The Ganga keeps its day. You keep yours: the river's figure for today, read in your own hour, with the time in Toronto and in IST side by side on your Sankalp Patra.

Find your city's hours, then sit:
https://www.snanify.com/panchang/toronto?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-03
```

## Wed 4 Nov: Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days

- Asset: `ads/social/posts/2026-11-04/card.png`
- Style: B4 signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-04/post.txt`):

```text
Rama Ekadashi, the last Ekadashi before Diwali, falls today in New York, Toronto, Houston and London, by your own sunrise. In Dubai, Singapore, Sydney and India it falls tomorrow, Thursday 5 November.

Ekadashi is first a fast kept at home, with its own rules for what is eaten and when the fast is broken. A morning snan is a customary part of the day.

Keep yours with the river. Three minutes, then the day is yours.

Sit with the Ganga this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-04
```

## Thu 5 Nov: Calendar: Diwali week as the panchang sets it in India

- Asset: `ads/social/posts/2026-11-05/video.mp4` (poster `ads/social/posts/2026-11-05/poster.png`)
- Style: B1 calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-05/post.txt`):

```text
Diwali week, as the panchang sets it in India:

Sunday 8 November, before sunrise: Naraka Chaturdashi, the abhyanga snan, oil and then water.
Sunday 8 November, at dusk: Lakshmi puja, as the new moon holds.
Monday 9 November, at dawn: Somvati Amavasya, the Diwali new moon on a Monday, the fullest morning Har Ki Pauri gets outside a Kumbh.
Wednesday 11 November: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura.

Three of those are mornings at the water. Keep each one with the river, three minutes at a time.

Set up your mornings today:
https://www.snanify.com/muhurat?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-05
```

## Fri 6 Nov: Patra: Send Diwali home, three sheets in one week

- Asset: `ads/social/posts/2026-11-06/video.mp4` (poster `ads/social/posts/2026-11-06/poster.png`)
- Style: B2 matchbox, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-06/post.txt`):

```text
This Diwali, send the family a morning with the river.

Sit three minutes with the Ganga, and the press pulls a Sankalp Patra with up to five family names on it, today's flow at Har Ki Pauri, the tithi, and the hour in your city and in IST. It opens straight into WhatsApp.

Sit on Naraka Chaturdashi. Sit on Somvati Amavasya. Sit on Yam Dwitiya. Three sheets for the family group in one week.

Eleven mornings for $11, £11 or €11. Start this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-06
```

## Sat 7 Nov: Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise

- Asset: `ads/social/posts/2026-11-07/card.png`
- Style: B1 calendar art, Hindi, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-07/post.txt`):

```text
कल, रविवार 8 नवंबर, नरक चतुर्दशी है: दीपावली की अमावस्या से पहले की तिथि, जिसे छोटी दिवाली भी कहते हैं।

वर्ष का यही एक दिन है जब स्नान स्वयं अनुष्ठान है: अभ्यंग स्नान, पहले तेल, फिर जल, सूर्योदय से पहले, जब चंद्रमा अभी आकाश में हो। परंपरा मानती है कि इस घड़ी का स्नान, जल जहाँ से भी आए, गंगा स्नान है।

स्नान के बाद तीन मिनट गंगा के साथ बैठिए, फिर परिवार को संकल्प पत्र भेजिए। उसी शाम लक्ष्मी पूजा है।

अपनी सुबह आज ही तैयार कीजिए:
https://www.snanify.com/hi?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-07
```

## Sun 8 Nov: Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13)

- Asset: `ads/social/posts/2026-11-08/video.mp4` (poster `ads/social/posts/2026-11-08/poster.png`)
- Style: B4 signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-08/post.txt`):

```text
Shubh Deepavali.

This morning is Naraka Chaturdashi, the abhyanga snan before sunrise. This evening is Lakshmi puja, as the new moon holds at dusk. Tomorrow at dawn the same new moon gives Har Ki Pauri its Somvati Amavasya.

Give the river three minutes before the house fills. Sit with the Ganga, hold your sankalp, and send the family a Sankalp Patra with their names on it before the first lamp is lit.

Sit with the Ganga this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-08
```

## Mon 9 Nov: Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14)

- Asset: `ads/social/posts/2026-11-09/video.mp4` (poster `ads/social/posts/2026-11-09/poster.png`)
- Style: B1 calendar art, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-09/post.txt`):

```text
A new moon on a Monday is Somvati Amavasya, and this one is the Diwali new moon.

At Haridwar it is the greatest of the amavasya bathing days. Har Ki Pauri on a Somvati morning is the fullest the ghat gets outside a Kumbh. The sun rose over the steps today at 06:37 IST.

Amavasya is also the day tradition gives to the departed of one's line. Name them in your sankalp this morning.

Day 14 of Kartik. Sit with the Ganga now:
https://www.snanify.com/muhurat/somvati-amavasya-2026?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-09
```

## Tue 10 Nov: Ghat: the Yamuna at Vishram Ghat, Yam Dwitiya tomorrow

- Asset: `ads/social/posts/2026-11-10/video.mp4` (poster `ads/social/posts/2026-11-10/poster.png`)
- Style: B2 matchbox, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-10/post.txt`):

```text
The Yamuna is the daughter of Surya and the sister of Yama.

Tomorrow, Wednesday 11 November, is Yam Dwitiya, the day much of India keeps as Bhai Dooj. The story is of Yamuna receiving her brother Yama at her house. At Vishram Ghat in Mathura, brothers and sisters bathe in the Yamuna together, and the crowd that morning is the ghat's largest of the year.

It is a day built around a sibling, and a family spread across three countries can keep it on the same morning.

Put your brother's or sister's name on your Patra, and sit with the Yamuna tomorrow. Set it up today:
https://www.snanify.com/rivers/yamuna-mathura?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-10
```

## Wed 11 Nov: Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura

- Asset: `ads/social/posts/2026-11-11/card.png`
- Style: B4 signboard, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-11/post.txt`):

```text
Today is Yam Dwitiya, Bhai Dooj.

At Vishram Ghat, brothers and sisters step into the Yamuna together. Siblings today live in different cities and different time zones. The river is the same for both of you.

Sit three minutes with the Yamuna, put both your names on the Sankalp Patra, and send it to your brother or sister before breakfast.

Sit with the Yamuna this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-11
```

## Thu 12 Nov: Calendar: Chhath, the four days (Kartik day 17)

- Asset: `ads/social/posts/2026-11-12/card.png`
- Style: B1 calendar art, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-12/post.txt`):

```text
Chhath begins tomorrow.

It is the one great festival kept standing in the water: an offering to the setting sun on the evening of Shashthi, a night of vigil, and an offering to the rising sun the next morning.

Nahay Khay, Friday 13 November. Kharna, Saturday 14. Sandhya arghya at sunset, Sunday 15. Usha arghya at sunrise, Monday 16.

Day 17 of Kartik. Keep the four mornings with the river:
https://www.snanify.com/muhurat/chhath-2026?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-12
```

## Fri 13 Nov: Price: twelve Kartik mornings left, eleven for eleven

- Asset: `ads/social/posts/2026-11-13/card.png`
- Style: B2 matchbox, English, still
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-13/post.txt`):

```text
Twelve mornings of Kartik are left, from today to Kartik Purnima on Tuesday 24 November.

Eleven mornings for $11, £11 or €11. Start today and your eleventh morning lands the day before the full moon. Add one more, and you close the month on Kartik Purnima itself.

Every morning gives the family a Sankalp Patra with their names on it.

Start this morning:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-13
```

## Sat 14 Nov: Hindi: Chhath tomorrow, the evening and the dawn arghya

- Asset: `ads/social/posts/2026-11-14/video.mp4` (poster `ads/social/posts/2026-11-14/poster.png`)
- Style: B1 calendar art, Hindi, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-14/post.txt`):

```text
कल, रविवार 15 नवंबर, छठ की षष्ठी है।

छठ वह महापर्व है जो जल में खड़े होकर रखा जाता है: षष्ठी की शाम डूबते सूर्य को संध्या अर्घ्य, फिर रात भर जागरण, और सप्तमी की भोर उगते सूर्य को उषा अर्घ्य।

कल सूर्यास्त प्रयागराज में 17:14 पर है, हर की पौड़ी पर 17:21 पर।

सोमवार की भोर, उषा अर्घ्य के बाद, तीन मिनट गंगा के साथ बैठिए और परिवार को संकल्प पत्र भेजिए। आज ही तैयार कीजिए:
https://www.snanify.com/hi/muhurat/chhath-2026?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-14
```

## Sun 15 Nov: Date: Chhath, the sandhya arghya tonight and the usha arghya at dawn (Kartik day 20)

- Asset: `ads/social/posts/2026-11-15/video.mp4` (poster `ads/social/posts/2026-11-15/poster.png`)
- Style: B4 signboard, English, video
- Post text, exactly as it goes up (also in `ads/social/posts/2026-11-15/post.txt`):

```text
Today is Chhath. This evening, families stand in the water and offer arghya to the setting sun. Tomorrow at dawn they offer it to the rising one.

Sunset today: 16:37 in New York, 16:11 in London. Sunrise tomorrow in New York: 06:44.

Keep the dawn with the river. After the usha arghya, sit three minutes with the Ganga and send the family a Sankalp Patra with their names, the tithi and the hour in IST.

Sit with the Ganga this morning, and again at tomorrow's dawn:
https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-11-15
```
