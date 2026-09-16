# The panchang, checked

**Date of check:** 11 September 2026. **Reference:** Drik Panchang (drikpanchang.com), day panchang for Haridwar (geonames 1270351), Lahiri ayanamsa. **Ours:** `src/lib/sky.ts` (astronomy-engine, Lahiri) and `windowsFor` in `src/lib/riverdata.ts`, at the Har Ki Pauri coordinates in `src/content/rivers.ts`.

## Tithi and nakshatra at sunrise, Haridwar

Tithi and nakshatra end instants do not depend on the place, only their calendar day does.

| Day | Tithi at sunrise | Ends, ours | Ends, Drik | Nakshatra at sunrise | Ends, ours | Ends, Drik |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-09-11 | Krishna Amavasya | 08:57 | 08:56 | Purva Phalguni | 13:15 | 13:16 |
| 2026-09-26 | Shukla Purnima | 22:19 | 22:18 | Purva Bhadrapada | | 11:32 |
| 2026-10-10 | Krishna Amavasya | 21:20 | 21:19 | Hasta | | 21:42 |
| 2026-10-20 | Shukla Navami | 12:51 | 12:50 | Shravana | | 18:02 |
| 2026-11-05 | Krishna Ekadashi | 10:36 | 10:35 | Uttara Phalguni | | 03:55 next day |
| 2026-12-15 | Shukla Shashthi | 21:20 | 21:19 | Dhanishta | | 11:52 |
| 2027-01-14 | Shukla Shashthi | 13:59 | 13:58 | Uttara Bhadrapada | | 23:18 |
| 2027-03-08 | Krishna Amavasya | 15:00 | 14:58 | Shatabhisha | | 08:34 |

Every tithi and every nakshatra name matched. Every tithi end agreed within two minutes; ours runs about a minute later than Drik's, which is consistent with rounding.

## Sunrise, sunset and the windows, Haridwar

| Day | Sunrise ours / Drik | Sunset ours / Drik | Brahma, Drik | Abhijit, Drik | Godhuli, Drik |
| --- | --- | --- | --- | --- | --- |
| 2026-09-11 | 05:59 / 06:00 | 18:27 / 18:28 | 04:28 to 05:14 | 11:49 to 12:39 | 18:28 to 18:51 |
| 2026-10-20 | 06:22 / 06:22 | 17:41 / 17:42 | 04:41 to 05:32 | 11:39 to 12:25 | 17:42 to 18:07 |

Drik reckons a muhurta as a fifteenth of the day or of the night, so Brahma muhurat is longer in winter and Abhijit longer in summer. Until this check the site used a flat 48 minutes, which put Brahma muhurat four minutes late on 11 September and five minutes early on 20 October, and drew Godhuli as 24 minutes either side of sunset where Drik prints sunset to half a night-muhurta after it. `windowsFor` now scales each window by the real day or night length, and Godhuli follows Drik's definition. The one-minute difference in sunrise comes from the ghat elevation the site uses; Drik computes at sea level.

## The occasion days, computed (16 September 2026)

`src/lib/occasions.ts` now resolves every occasion to civil dates at the ghat's own sunrise: the tithi at sunrise with the kshaya fallback, lunar months named by the sankranti each holds, and sign entries under Lahiri. `tests/unit/occasions.test.ts` holds the days Drik confirmed above (Sarva Pitru Amavasya 10 October 2026, Rama Ekadashi 5 November 2026, Somvati Amavasya 8 March 2027, the purnima of 26 September 2026) and the days the resolver gives for the rest, which read as expected: Kartik Purnima 24 November 2026, Yam Dwitiya 11 November 2026, Mahashivratri 6 March 2027, Ganga Dussehra 13 June 2027, Makar Sankranti at 21:00 IST on 14 January 2027. The pages print these and roll the horizon forward daily. Read off Drik Panchang on 16 September 2026; the record is below.

## The occasion days, read off Drik Panchang (16 September 2026)

**Reference:** Drik Panchang for Haridwar (geoname 1270351), the vrat lists for purnima, amavasya and ekadashi, the sankranti list, the Pitru Paksha list and the festival pages for Maha Shivaratri, Ganga Dussehra and the Diwali days. **Ours:** `resolveAll` in `src/lib/occasions.ts` after the fixes this check produced.

### What the check changed

- **The ayanamsa.** Drik prints its Lahiri ayanamsha on every day panchang: 24.003501 (1 January 2010), 24.143189 (2020), 24.199073 (2024), 24.227035 (2026), 24.247917 (1 July 2027). Those lie on one line, 23.8638 degrees at J2000 and 1.3971 degrees a century. Ours was anchored at 23.8531, 38 arcseconds low, which put every sankranti fifteen minutes early. Refitted.
- **Aberration.** The elongation behind every tithi left out the sun's twenty arcseconds of aberration, which ended each tithi about a minute after Drik. Now both bodies are apparent.
- **A sankranti after sunset is kept the next morning.** Makar Sankranti 2027: the sun enters Makara at 21:15 IST on 14 January; the day is 15 January, as Drik has it.
- **An ekadashi that runs at two sunrises is kept on the second.** Vijaya Ekadashi 2027 is 4 March on Drik; the first-sunrise rule gave 3 March.

### Dated occasions

| Occasion | Ours | Drik | |
| --- | --- | --- | --- |
| Pitru Paksha 2026 | 27 September to 10 October | Purnima Shraddha 26 September, Sarva Pitru Amavasya 10 October | Drik counts the purnima shraddha as day one; the fortnight itself agrees |
| Tula Sankramana 2026 | 18 October, the sun crosses 19:58 IST the evening before | 17 October 19:57 IST | Kept the next morning by the after-sunset rule; the moment agrees to the minute |
| Kartik Snan 2026 | 27 October to 24 November | Ashwina Purnima 25 October, Kartika Purnima 24 November | See the purnima note below |
| Yam Dwitiya 2026 | 11 November | Bhaiya Dooj 11 November | Match |
| Kartik Purnima 2026 | 24 November | 24 November | Match |
| Makar Sankranti 2027 | 15 January, the sun crosses 21:15 IST the evening before | 15 January, at 21:14 IST on 14 January | Match |
| Magh Snan 2027 | 23 January to 20 February | Pausha Purnima 22 January, Magha Purnima 20 February | Match |
| Mahashivratri 2027 | 6 March | 6 March, chaturdashi 12:03 on 6 March to 13:46 on 7 March | Match |
| Ganga Dussehra 2027 | 13 June | 13 June, dashami 02:43 on 13 June to 02:11 on 14 June | Match |

### Recurring days, September 2026 to September 2027

- **Sankranti.** Twelve of twelve within one minute of Drik: Kanya 17 September 07:59, Tula 17 October 19:58, Vrishchika 16 November 19:49, Dhanu 16 December 10:30, Makara 14 January 21:15, Kumbha 13 February 10:14, Meena 15 March 07:05, Mesha 14 April 15:34, Vrishabha 15 May 12:25, Mithuna 15 June 19:01, Karka 17 July 05:53, Simha 17 August 02:17 (all IST, ours; Drik prints each a minute earlier or the same).
- **Purnima.** Twelve of thirteen match. The one that differs is Ashwina: ours 26 October, Drik 25 October. The tithi runs from 11:55 on the 25th to 09:41 on the 26th, so it is at sunrise on the 26th and ours says so; Drik's vrat date follows the evening, which is also where Sharad Purnima falls. Both are stated rules; ours is the one the page prints.
- **Amavasya.** Twelve of twelve. Where Drik lists two days (8 and 9 November, 7 and 8 March, 3 and 4 July) ours is the second, the sunrise day, which is also Drik's amavasya day.
- **Ekadashi.** Twenty-four of twenty-five match Drik's Smarta day. The one that differs is Pausha Putrada 2027: Drik Smarta 18 January, Vaishnava 19 January; ours is 19 January, the day the tithi is at sunrise (it ends 07:50, forty minutes after). Recorded, not changed: the page's rule is the tithi at sunrise.

The tests in `tests/unit/occasions.test.ts` pin Makar Sankranti to 15 January 2027 with its moment, Vijaya Ekadashi to 4 March 2027, and the days above.

## Twenty-two more dated pages (16 September 2026)

Added the same evening, each computed by the rule its page states and read against Drik Panchang for Haridwar where Drik has a page. `rule.masa` in the data is the amanta month the resolver names; the dark-fortnight days of the north (Kartika Krishna, Magha Krishna) are therefore filed under the month before, and the page's own label keeps the purnimanta name.

| Occasion | Ours | Drik | |
| --- | --- | --- | --- |
| Sharad Purnima 2026 | 25 October (tithi at midnight) | 25 October, Kojagara | Match |
| Naraka Chaturdashi 2026 | 8 November | Lakshmi puja 8 November; the abhyanga morning is the chaturdashi at arunodaya | By the stated rule; same civil date as Diwali in 2026 |
| Somvati Amavasya, November 2026 | Monday 9 November | Amavasya 8 and 9 November | Match |
| Chhath 2026 | 15 November | 15 November | Match |
| Dev Deepawali 2026 | 24 November | Kartika Purnima 24 November | Match |
| Vaikuntha Ekadashi 2026 | 20 December | Mokshada Ekadashi 20 December | Match |
| Paush Purnima 2027 | 22 January | 22 January | Match |
| Mauni Amavasya 2027 | 6 February | Magha Amavasya 6 February | Match |
| Basant Panchami 2027 | 11 February | not fetched | Computed |
| Magha Purnima 2027 | 20 February | 20 February | Match |
| Somvati Amavasya, March 2027 | Monday 8 March | Amavasya 7 and 8 March | Match |
| Vaisakhi 2027 | 14 April, 15:33 IST | Mesha Sankranti 14 April 15:33 | Match |
| Akshaya Tritiya 2027 | 9 May | 9 May | Match |
| Ganga Saptami 2027 | 12 May | 12 May | Match |
| Vaishakha Purnima 2027 | 20 May | 20 May | Match |
| Guru Purnima 2027 | 18 July | 18 July | Match |
| Kanwar Yatra 2027 | 19 July to 2 August | not fetched | The dark fortnight after Guru Purnima, computed |
| Sawan 2027 | 19 July to 17 August | not fetched | The purnimanta month, computed |
| Hariyali Amavasya 2027 | Monday 2 August | Amavasya 2 August | Match |
| Shravana Purnima 2027 | 17 August | Raksha Bandhan 17 August | Match |
| Janmashtami 2027 | 24 August (tithi at midnight) | not fetched | Computed by the nishita rule |
| Magh Mela 2027 | 15 January to 6 March | its six snan days above | A span, not computed on its own |
