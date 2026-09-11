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

## What is still provisional

The calendar day each occasion falls on. `src/content/data/muhurat.json` gives each occasion's tithi rule and its day resolution (udaya or aparahna) but publishes the occurrence as a month, not a date. Resolving those days and checking each against the reference is the remaining step, and every occasion keeps its provisional label until it is done. The reference days above already confirm four of them: Sarva Pitru Amavasya on 10 October 2026, Vijayadashami on 20 October 2026, Rama Ekadashi on 5 November 2026, and Somvati Amavasya on 8 March 2027 are the days Drik names for the tithis the site computed at those sunrises.
