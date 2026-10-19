# Facebook posts

One post a day on the Snanify Page (facebook.com/snanify), scheduled in Facebook for 05:00 in
New York, give or take a quarter hour, so it is waiting when the diaspora wakes. The scheduled
task `snanify-facebook-posts` writes it, renders the card, schedules it and logs it here. Edit
this file to steer it: the task reads it every morning.

**17 October to 15 November 2026 is made.** `docs/meta/facebook-calendar.md` holds thirty
ready posts (words, card or video, link) from `ads/social/calendar.mjs`, in the campaign
print of the brand kit (`brand/README.md`): PLAIN marigold by default, calendar art for
festival days, the signboard for a few loud days, the matchbox for the eleven-morning pack. On those dates the task publishes
the prepared post as it is; the weekday themes below are for the days after.

## The rules every post is written under

The two rules from `CLAUDE.md` hold here too:

1. Never claim a physical rite happened. Nothing is performed, offered or witnessed for anyone.
2. Never make a promise that is not true. Nothing about karma, sins, blessings or the soul.

And the house style: proud, warm, plain. Short sentences built on a noun and a verb. No
negative constructions, no em dashes, no apologies, no hedging. The practice is "the snan", the
sheet is the "Sankalp Patra", a pack is its count.

Facts:

- Every figure comes from www.snanify.com that same morning: /live and /rivers/[river] for flow
  and rank, /panchang/[city] for sunrise, Brahma muhurat and tithi, /muhurat for the calendar.
  Never invent or round a figure into something new. The flow is "today's flow" or "as it runs
  today", never "measured".
- Pictures: our own cards from `ads/src/render-post.mjs`, the specimen sheet at
  https://www.snanify.com/specimen, the six engraved ghats in `public/waters/` (credits in
  `src/content/live/pictures.ts`), or a Wikimedia Commons picture under CC BY or CC BY-SA, with
  the author and licence on the card or in the text. Nothing else: no stock, no screenshots of
  other people's posts, no AI pictures of gods, ghats or people.

Meta's rules: never tell readers who they are ("Hindus abroad, ..."), never ask for likes,
shares or tags, never "comment AMEN". A plain question is fine once a week.

Every post ends with one link, tagged:
`https://www.snanify.com/<path>?utm_source=facebook&utm_medium=organic&utm_campaign=daily`

## The week

| Day | Theme | Card | Link |
| --- | --- | --- | --- |
| Monday | **The river today.** One of the six waters, its flow and rank this morning, in a sentence with the state word the site uses (running full, low, near its usual). Rotate the six in order. | figure | /rivers/[river] |
| Tuesday | **Panchang in a city.** Brahma muhurat, sunrise, tithi, tithi end and sunset for one diaspora city. Rotate: New York, London, Toronto, Dubai, Houston, Sydney, Edison, Leicester, Jersey City, Singapore, Chicago, Birmingham, Bay Area (San Jose), Abu Dhabi. | rows | /panchang/[city] |
| Wednesday | **A ghat.** One of the six places: two or three sentences from its page on snanify.com (the story of the place, in the third person), with its engraved picture and credit. | plate | /rivers/[river] |
| Thursday | **The calendar.** The next snan day or festival on /muhurat: its name, its date, the days left, the hour at the ghat. | rows or figure | /muhurat/[occasion] |
| Friday | **The Sankalp Patra.** Today's specimen sheet, as it is, with one line on what the sheet carries and that it goes to the family group. | the specimen | / |
| Saturday | **हिंदी में.** A Hindi post: the river today or a ghat, written in idiomatic Hindi (not a translation of the English). | figure or plate, Hindi | /hi/... |
| Sunday | **The practice.** One part of the three minutes (the reading, the breath, the sankalp, the stillness, the mark), or one example sankalp from the setup page, or the six waters. | text card | /snan |

**Occasion days come first.** On a day /muhurat names (Ekadashi, Purnima, Amavasya, Sankranti,
Kartik snan, Diwali, Chhath, Dev Deepawali, Kartik Purnima, Makar Sankranti, Mauni Amavasya,
Maha Shivratri and the rest), post about that day instead: its name, what the day is kept for in
tradition (third person), its hour at the ghat, and the river that morning. During Kartik snan
(27 October to 24 November 2026) mention it in the Monday and Thursday posts too.

## Ideas to draw on

- The rank as news: "The Godavari at Nashik is running in its top tenth for October."
- Same morning, two clocks: "Brahma muhurat in Toronto is 05:41. At Har Ki Pauri it is 15:11."
- Distance: "Edison to Haridwar: 12,000 km. Three minutes."
- The six waters as a set, one line each.
- An example sankalp to take as it is, from the setup page.
- What the Patra carries, line by line: the names, the water, the figure, the tithi, the hour.
- The record: "Every day since 1997" and what the archive shows for this week.
- Occasion countdowns: "Kartik Purnima in 11 days."
- A ghat's own calendar: what each place keeps on its days.

## Posted

| Date (NY) | Time (NY) | Theme | Headline | Card | Link |
| --- | --- | --- | --- | --- | --- |
| 2026-10-14 | 05:00 | A ghat: Ganga at Har Ki Pauri (Wednesday; scheduled on 13 Oct after 05:00 had passed) | Where the Ganga leaves the mountains | ads/posts/2026-10-14/card.png | https://www.snanify.com/rivers/ganga-haridwar?utm_source=facebook&utm_medium=organic&utm_campaign=daily |
| 2026-10-15 | 04:45 | The calendar: Kaveri Sankramana, Sat 17 Oct, 19:58 IST (Thursday) | The Kaveri rises at its source | ads/posts/2026-10-15/card.png | https://www.snanify.com/muhurat/tula-sankramana-2026?utm_source=facebook&utm_medium=organic&utm_campaign=daily |
| 2026-10-16 | 05:10 | The Sankalp Patra: today's specimen, Ganga at Har Ki Pauri, running full, 732 m³/s, 86th percentile (Friday; Tula Sankranti tomorrow is mentioned in one line, the occasion post itself falls to Saturday) | Today's Sankalp Patra, as it came off the press | ads/posts/2026-10-16/specimen.png | https://www.snanify.com/?utm_source=facebook&utm_medium=organic&utm_campaign=daily |
| 2026-10-18 | 05:00 | Practice: the sankalp, with the three example sankalps from setup (Sunday; ready from the calendar, B2 matchbox) | Every snan holds a sankalp: one intention, in your own words. | ads/social/posts/2026-10-18/card.png | https://www.snanify.com/snan?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-18 |
| 2026-10-18 | 17:05 | Date: Kaveri Sankramana (the 17 Oct post, published on 18 Oct by hand after the 17th's run lost the Chrome extension; worded "yesterday"; new brand design, calendar art; went up as a reel) | Yesterday at 19:58 IST the sun entered Tula | ads/social/posts/2026-10-17/video.mp4 | https://www.snanify.com/rivers/kaveri-talakaveri?utm_source=facebook&utm_medium=organic&utm_campaign=daily&utm_content=2026-10-17 |
| 2026-10-19 | 05:00 | River: the Ganga's daily figure, ranked against every day since 1997 (scheduled 19 Oct in Business Suite, a reel) | Read the Ganga this morning. Har Ki Pauri gets 1 number each day: its flow today, in cubic metres a second. | ads/social/posts/2026-10-19/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-20 | 05:00 | Panchang: Brahma muhurat tomorrow in five diaspora cities (scheduled 19 Oct in Business Suite) | Set your alarm for Brahma muhurat: the hour before dawn, kept by tradition for prayer, study and the morning snan. It opens about 96 minutes before sunrise and closes about 48 minutes before it. | ads/social/posts/2026-10-20/card.png | none in the post; the Page Sign up button |
| 2026-10-21 | 05:00 | Date: Ashwin Shukla Ekadashi falls on 21 Oct in the Americas, 22 Oct in London, the Gulf and India (scheduled 19 Oct in Business Suite) | Keep Ekadashi by your own sunrise. This week it falls on 2 dates, and both are right. | ads/social/posts/2026-10-21/card.png | none in the post; the Page Sign up button |
| 2026-10-22 | 05:00 | Ghat: the Godavari at Ram Kund, Nashik, and its older name Gautami (scheduled 19 Oct in Business Suite, a reel) | Meet the Godavari by its older name: Gautami. The sage Gautama brought the river down from Brahmagiri, above Trimbakeshwar, through Shiva's intercession. When the river is invoked, Gautami is still the name people use. | ads/social/posts/2026-10-22/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-23 | 05:00 | Patra: Send the Ganga home, the Sankalp Patra beside the headline (scheduled 19 Oct in Business Suite) | Send the Ganga home. Every morning you sit, the press pulls a Sankalp Patra for you. | ads/social/posts/2026-10-23/card.png | none in the post; the Page Sign up button |
| 2026-10-24 | 05:00 | Hindi: Kartik snan begins Tuesday 27 October (scheduled 19 Oct in Business Suite) | कार्तिक स्नान मंगलवार, २७ अक्टूबर से शुरू होता है और कार्तिक पूर्णिमा, २४ नवंबर तक चलता है। | ads/social/posts/2026-10-24/card.png | none in the post; the Page Sign up button |
| 2026-10-25 | 05:00 | Date: Sharad Purnima tonight, the bathing morning after (scheduled 19 Oct in Business Suite, a reel) | Set out the kheer tonight. It is Sharad Purnima, the first clear full moon after the rains. | ads/social/posts/2026-10-25/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-26 | 05:00 | Date: Kartik snan starts tomorrow, 29 mornings (scheduled 19 Oct in Business Suite, a reel) | Start today, and your first Kartik morning is ready when you wake. Kartik snan begins tomorrow, Tuesday 27 October, and runs 29 mornings to Kartik Purnima on 24 November. | ads/social/posts/2026-10-26/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-27 | 05:00 | Date: Kartik snan, day 1 (scheduled 19 Oct in Business Suite, a reel) | Do your first Kartik snan today! | ads/social/posts/2026-10-27/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-28 | 05:00 | Ghat: the Triveni Sangam, two rivers seen and a third held in faith (scheduled 19 Oct in Business Suite, a reel) | Look for the line at Prayagraj. The Ganga arrives from the north and the Yamuna from the west, and for a stretch they run side by side: the Yamuna darker and slower, the Ganga paler and quicker. | ads/social/posts/2026-10-28/video.mp4 | none in the post; the Page Sign up button |
| 2026-10-29 | 05:00 | Kartik custom: deep daan, the lamp at dusk (scheduled 19 Oct in Business Suite) | Keep both hours of Kartik. Dawn is for the snan. Dusk is for the lamp. | ads/social/posts/2026-10-29/card.png | none in the post; the Page Sign up button |
| 2026-10-30 | 05:00 | Patra: what the sheet carries, line by line (scheduled 19 Oct in Business Suite) | Make your first Sankalp Patra this morning. Here is what it carries. | ads/social/posts/2026-10-30/card.png | none in the post; the Page Sign up button |
| 2026-10-31 | 05:00 | Hindi: the Shipra at Ram Ghat, Ujjain, the city that reckons time (scheduled 19 Oct in Business Suite) | उज्जैन अवंतिका है, सात मोक्षपुरियों में से एक। यहाँ के अधिष्ठाता महाकाल हैं, स्वयं काल के रूप में शिव, और महाकालेश्वर ज्योतिर्लिंग रामघाट से थोड़ी ही दूरी पर है। | ads/social/posts/2026-10-31/card.png | none in the post; the Page Sign up button |
| 2026-11-01 | 05:00 | Practice: the breath, 4 in and 6 out; US and Canadian clocks went back (scheduled 19 Oct in Business Suite, a reel) | Breathe with the river. 45 seconds of every snan belong to the breath. | ads/social/posts/2026-11-01/video.mp4 | none in the post; the Page Sign up button |
| 2026-11-02 | 05:00 | River: the Kaveri's three names, Lopamudra, Ponni, Kaveri (Kartik day 7) (scheduled 19 Oct in Business Suite) | Know the Kaveri by all 3 of its names. | ads/social/posts/2026-11-02/card.png | none in the post; the Page Sign up button |
| 2026-11-03 | 05:00 | Panchang: Toronto and Har Ki Pauri, same morning, two clocks (scheduled 19 Oct in Business Suite) | Read the same morning on 2 clocks. | ads/social/posts/2026-11-03/card.png | none in the post; the Page Sign up button |
| 2026-11-04 | 05:00 | Date: Rama Ekadashi, 4 Nov in the Americas and London, 5 Nov in the Gulf and India; Diwali in 4 days (scheduled 19 Oct in Business Suite) | Keep Rama Ekadashi, the last Ekadashi before Diwali. By your own sunrise it falls today in New York, Toronto, Houston and London. In Dubai, Singapore, Sydney and India it falls tomorrow, Thursday 5 November. | ads/social/posts/2026-11-04/card.png | none in the post; the Page Sign up button |
| 2026-11-05 | 05:00 | Calendar: Diwali week as the panchang sets it in India (scheduled 19 Oct in Business Suite, a reel) | Plan Diwali week. Here it is as the panchang sets it in India: | ads/social/posts/2026-11-05/video.mp4 | none in the post; the Page Sign up button |
| 2026-11-06 | 05:00 | Patra: Send Diwali home, three sheets in one week (scheduled 19 Oct in Business Suite, a reel) | Send the family a morning with the river this Diwali. | ads/social/posts/2026-11-06/video.mp4 | none in the post; the Page Sign up button |
| 2026-11-07 | 05:00 | Hindi: Naraka Chaturdashi tomorrow, the abhyanga snan before sunrise (scheduled 19 Oct in Business Suite) | कल, रविवार ८ नवंबर, नरक चतुर्दशी है: दीपावली की अमावस्या से पहले की तिथि, जिसे छोटी दिवाली भी कहते हैं। | ads/social/posts/2026-11-07/card.png | none in the post; the Page Sign up button |
| 2026-11-08 | 05:00 | Date: Naraka Chaturdashi this morning, Lakshmi puja tonight (Kartik day 13) (scheduled 19 Oct in Business Suite, a reel) | Shubh Deepavali. | ads/social/posts/2026-11-08/video.mp4 | none in the post; the Page Sign up button |
| 2026-11-09 | 05:00 | Date: Somvati Amavasya, the Diwali new moon on a Monday (Kartik day 14) (scheduled 19 Oct in Business Suite, a reel) | Sit with the Ganga on Somvati Amavasya. A new moon on a Monday carries that name, and this one is the Diwali new moon. | ads/social/posts/2026-11-09/video.mp4 | none in the post; the Page Sign up button |
| 2026-11-11 | 05:00 | Date: Yam Dwitiya, Bhai Dooj, at the Yamuna in Mathura (scheduled 19 Oct in Business Suite) | Today is Yam Dwitiya, Bhai Dooj. | ads/social/posts/2026-11-11/card.png | none in the post; the Page Sign up button |
| 2026-11-12 | 05:00 | Calendar: Chhath, the four days (Kartik day 17) (scheduled 19 Oct in Business Suite) | Get ready for Chhath. It begins tomorrow. | ads/social/posts/2026-11-12/card.png | none in the post; the Page Sign up button |
| 2026-11-13 | 05:00 | Price: 12 Kartik mornings left, eleven mornings for eleven (scheduled 19 Oct in Business Suite) | Start today: 12 mornings of Kartik are left, to Kartik Purnima on Tuesday 24 November. | ads/social/posts/2026-11-13/card.png | none in the post; the Page Sign up button |
