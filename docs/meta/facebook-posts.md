# Facebook posts

One post a day on the Snanify Page (facebook.com/snanify), scheduled in Facebook for 05:00 in
New York, give or take a quarter hour, so it is waiting when the diaspora wakes. The scheduled
task `snanify-facebook-posts` writes it, renders the card, schedules it and logs it here. Edit
this file to steer it: the task reads it every morning.

**17 October to 15 November 2026 is made.** `docs/meta/facebook-calendar.md` holds thirty
ready posts (words, card or video, link) from `ads/social/calendar.mjs`, in the campaign
print: B1 calendar art, B2 the matchbox, B4 the signboard. On those dates the task publishes
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
