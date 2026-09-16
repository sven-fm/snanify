import { asZone, type Bilingual, type IanaZone } from "@/content/muhurat";

/* ---------------------------------------------------------------------------
   Twenty cities where the diaspora wakes up, for /panchang/[city].

   Each gets its own page: sunrise, Brahma muhurat and the tithi at sunrise,
   computed for that city's own sky and printed on its own clock. The
   coordinates are the city centre to two decimals, which moves sunrise by
   under a minute. Ordered west to east, the way the morning arrives.
   --------------------------------------------------------------------------- */

export interface City {
  readonly slug: string;
  readonly name: Bilingual;
  readonly country: Bilingual;
  readonly zone: IanaZone;
  readonly lat: number;
  readonly lon: number;
}

const c = (slug: string, en: string, hi: string, cen: string, chi: string, zone: string, lat: number, lon: number): City => ({
  slug,
  name: { en, hi },
  country: { en: cen, hi: chi },
  zone: asZone(zone),
  lat,
  lon,
});

export const CITIES: readonly City[] = [
  c("vancouver", "Vancouver", "वैंकूवर", "Canada", "कनाडा", "America/Vancouver", 49.28, -123.12),
  c("seattle", "Seattle", "सिएटल", "United States", "अमेरिका", "America/Los_Angeles", 47.61, -122.33),
  c("san-jose", "San Jose", "सैन होज़े", "United States", "अमेरिका", "America/Los_Angeles", 37.34, -121.89),
  c("los-angeles", "Los Angeles", "लॉस एंजेलेस", "United States", "अमेरिका", "America/Los_Angeles", 34.05, -118.24),
  c("dallas", "Dallas", "डलास", "United States", "अमेरिका", "America/Chicago", 32.78, -96.8),
  c("houston", "Houston", "ह्यूस्टन", "United States", "अमेरिका", "America/Chicago", 29.76, -95.37),
  c("chicago", "Chicago", "शिकागो", "United States", "अमेरिका", "America/Chicago", 41.88, -87.63),
  c("toronto", "Toronto", "टोरंटो", "Canada", "कनाडा", "America/Toronto", 43.65, -79.38),
  c("new-york", "New York", "न्यूयॉर्क", "United States", "अमेरिका", "America/New_York", 40.71, -74.01),
  c("edison", "Edison", "एडिसन", "United States", "अमेरिका", "America/New_York", 40.52, -74.41),
  c("london", "London", "लंदन", "United Kingdom", "यूनाइटेड किंगडम", "Europe/London", 51.51, -0.13),
  c("birmingham", "Birmingham", "बर्मिंघम", "United Kingdom", "यूनाइटेड किंगडम", "Europe/London", 52.49, -1.89),
  c("leicester", "Leicester", "लेस्टर", "United Kingdom", "यूनाइटेड किंगडम", "Europe/London", 52.64, -1.13),
  c("manchester", "Manchester", "मैनचेस्टर", "United Kingdom", "यूनाइटेड किंगडम", "Europe/London", 53.48, -2.24),
  c("dubai", "Dubai", "दुबई", "United Arab Emirates", "संयुक्त अरब अमीरात", "Asia/Dubai", 25.2, 55.27),
  c("doha", "Doha", "दोहा", "Qatar", "क़तर", "Asia/Qatar", 25.29, 51.53),
  c("singapore", "Singapore", "सिंगापुर", "Singapore", "सिंगापुर", "Asia/Singapore", 1.35, 103.82),
  c("kuala-lumpur", "Kuala Lumpur", "कुआलालंपुर", "Malaysia", "मलेशिया", "Asia/Kuala_Lumpur", 3.14, 101.69),
  c("melbourne", "Melbourne", "मेलबर्न", "Australia", "ऑस्ट्रेलिया", "Australia/Melbourne", -37.81, 144.96),
  c("sydney", "Sydney", "सिडनी", "Australia", "ऑस्ट्रेलिया", "Australia/Sydney", -33.87, 151.21),
];

export const CITY_SLUGS: readonly string[] = CITIES.map((x) => x.slug);

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((x) => x.slug === slug);
}
