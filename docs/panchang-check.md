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

`src/lib/occasions.ts` now resolves every occasion to civil dates at the ghat's own sunrise: the tithi at sunrise with the kshaya fallback, lunar months named by the sankranti each holds, and sign entries under Lahiri. `tests/unit/occasions.test.ts` holds the days Drik confirmed above (Sarva Pitru Amavasya 10 October 2026, Rama Ekadashi 5 November 2026, Somvati Amavasya 8 March 2027, the purnima of 26 September 2026) and the days the resolver gives for the rest, which read as expected: Kartik Purnima 24 November 2026, Yam Dwitiya 11 November 2026, Mahashivratri 6 March 2027, Ganga Dussehra 13 June 2027, Makar Sankranti at 21:00 IST on 14 January 2027. The pages print these and roll the horizon forward daily. Still to do: read each of the dated ones off Drik Panchang and note the match here.
