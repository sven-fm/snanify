import { asZone, type Bilingual, type IanaZone } from "@/content/muhurat";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The cities where the diaspora wakes up, for /panchang/[city].

   Two hundred across the United States, Canada and the United Kingdom, the
   places with the largest Indian-origin communities in each, and a hundred
   more across the Gulf, Australia and New Zealand, Southeast and East Asia,
   Africa and the Indian Ocean, the Caribbean and the Pacific, and Europe.
   Each gets its own page: sunrise,
   Brahma muhurat and the tithi at sunrise, computed for that city's own sky
   and printed on its own clock. The coordinates are the city centre to two
   decimals, which moves sunrise by under a minute.

   A city carries its region (state, province or nation) where the country
   has ones a reader would name, so that Troy, Canton and Columbia read
   unambiguously in a list. Where two cities share a name across countries,
   the name carries the region and the slug carries it too.
   --------------------------------------------------------------------------- */

export interface Country {
  readonly code: string;
  readonly name: Bilingual;
}

/** Roughly by the size of the community, the three largest first. */
export const COUNTRIES: readonly Country[] = [
  { code: "US", name: { en: "United States", hi: "अमेरिका" } },
  { code: "CA", name: { en: "Canada", hi: "कनाडा" } },
  { code: "UK", name: { en: "United Kingdom", hi: "यूनाइटेड किंगडम" } },
  { code: "AE", name: { en: "United Arab Emirates", hi: "संयुक्त अरब अमीरात" } },
  { code: "SA", name: { en: "Saudi Arabia", hi: "सऊदी अरब" } },
  { code: "KW", name: { en: "Kuwait", hi: "कुवैत" } },
  { code: "QA", name: { en: "Qatar", hi: "क़तर" } },
  { code: "OM", name: { en: "Oman", hi: "ओमान" } },
  { code: "BH", name: { en: "Bahrain", hi: "बहरीन" } },
  { code: "AU", name: { en: "Australia", hi: "ऑस्ट्रेलिया" } },
  { code: "NZ", name: { en: "New Zealand", hi: "न्यूज़ीलैंड" } },
  { code: "MY", name: { en: "Malaysia", hi: "मलेशिया" } },
  { code: "SG", name: { en: "Singapore", hi: "सिंगापुर" } },
  { code: "ZA", name: { en: "South Africa", hi: "दक्षिण अफ़्रीका" } },
  { code: "MU", name: { en: "Mauritius", hi: "मॉरीशस" } },
  { code: "TT", name: { en: "Trinidad and Tobago", hi: "त्रिनिदाद और टोबैगो" } },
  { code: "GY", name: { en: "Guyana", hi: "गुयाना" } },
  { code: "SR", name: { en: "Suriname", hi: "सूरीनाम" } },
  { code: "FJ", name: { en: "Fiji", hi: "फ़िजी" } },
  { code: "JM", name: { en: "Jamaica", hi: "जमैका" } },
  { code: "KE", name: { en: "Kenya", hi: "केन्या" } },
  { code: "TZ", name: { en: "Tanzania", hi: "तंज़ानिया" } },
  { code: "UG", name: { en: "Uganda", hi: "युगांडा" } },
  { code: "NG", name: { en: "Nigeria", hi: "नाइजीरिया" } },
  { code: "RE", name: { en: "Réunion", hi: "रेयूनियों" } },
  { code: "DE", name: { en: "Germany", hi: "जर्मनी" } },
  { code: "NL", name: { en: "Netherlands", hi: "नीदरलैंड" } },
  { code: "IE", name: { en: "Ireland", hi: "आयरलैंड" } },
  { code: "IT", name: { en: "Italy", hi: "इटली" } },
  { code: "FR", name: { en: "France", hi: "फ़्रांस" } },
  { code: "PT", name: { en: "Portugal", hi: "पुर्तगाल" } },
  { code: "ES", name: { en: "Spain", hi: "स्पेन" } },
  { code: "CH", name: { en: "Switzerland", hi: "स्विट्ज़रलैंड" } },
  { code: "BE", name: { en: "Belgium", hi: "बेल्जियम" } },
  { code: "AT", name: { en: "Austria", hi: "ऑस्ट्रिया" } },
  { code: "SE", name: { en: "Sweden", hi: "स्वीडन" } },
  { code: "NO", name: { en: "Norway", hi: "नॉर्वे" } },
  { code: "DK", name: { en: "Denmark", hi: "डेनमार्क" } },
  { code: "FI", name: { en: "Finland", hi: "फ़िनलैंड" } },
  { code: "PL", name: { en: "Poland", hi: "पोलैंड" } },
  { code: "LU", name: { en: "Luxembourg", hi: "लक्ज़मबर्ग" } },
  { code: "HK", name: { en: "Hong Kong", hi: "हॉन्ग कॉन्ग" } },
  { code: "TH", name: { en: "Thailand", hi: "थाईलैंड" } },
  { code: "ID", name: { en: "Indonesia", hi: "इंडोनेशिया" } },
  { code: "PH", name: { en: "Philippines", hi: "फ़िलीपींस" } },
  { code: "JP", name: { en: "Japan", hi: "जापान" } },
  { code: "MM", name: { en: "Myanmar", hi: "म्यांमार" } },
  { code: "KR", name: { en: "South Korea", hi: "दक्षिण कोरिया" } },
];

interface Region {
  readonly country: string;
  readonly name: Bilingual;
}

const r = (country: string, en: string, hi: string): Region => ({ country, name: { en, hi } });

const REGIONS = {
  /* United States */
  AZ: r("US", "Arizona", "ऐरिज़ोना"),
  CA: r("US", "California", "कैलिफ़ोर्निया"),
  CO: r("US", "Colorado", "कोलोराडो"),
  CT: r("US", "Connecticut", "कनेक्टिकट"),
  DC: r("US", "District of Columbia", "डिस्ट्रिक्ट ऑफ़ कोलंबिया"),
  FL: r("US", "Florida", "फ़्लोरिडा"),
  GA: r("US", "Georgia", "जॉर्जिया"),
  IL: r("US", "Illinois", "इलिनॉय"),
  IN: r("US", "Indiana", "इंडियाना"),
  KS: r("US", "Kansas", "कैन्सस"),
  MA: r("US", "Massachusetts", "मैसाचुसेट्स"),
  MD: r("US", "Maryland", "मैरीलैंड"),
  MI: r("US", "Michigan", "मिशिगन"),
  MN: r("US", "Minnesota", "मिनेसोटा"),
  MO: r("US", "Missouri", "मिज़ूरी"),
  NC: r("US", "North Carolina", "नॉर्थ कैरोलाइना"),
  NJ: r("US", "New Jersey", "न्यू जर्सी"),
  NV: r("US", "Nevada", "नेवादा"),
  NY: r("US", "New York", "न्यूयॉर्क"),
  OH: r("US", "Ohio", "ओहायो"),
  OR: r("US", "Oregon", "ऑरेगन"),
  PA: r("US", "Pennsylvania", "पेंसिल्वेनिया"),
  TN: r("US", "Tennessee", "टेनेसी"),
  TX: r("US", "Texas", "टेक्सास"),
  VA: r("US", "Virginia", "वर्जीनिया"),
  WA: r("US", "Washington", "वॉशिंगटन"),
  /* Canada */
  AB: r("CA", "Alberta", "अल्बर्टा"),
  BC: r("CA", "British Columbia", "ब्रिटिश कोलंबिया"),
  MB: r("CA", "Manitoba", "मैनिटोबा"),
  NS: r("CA", "Nova Scotia", "नोवा स्कोशिया"),
  ON: r("CA", "Ontario", "ओंटारियो"),
  QC: r("CA", "Quebec", "क्यूबेक"),
  SK: r("CA", "Saskatchewan", "सस्केचवान"),
  /* United Kingdom */
  ENG: r("UK", "England", "इंग्लैंड"),
  SCT: r("UK", "Scotland", "स्कॉटलैंड"),
  WLS: r("UK", "Wales", "वेल्स"),
  /* Australia */
  NSW: r("AU", "New South Wales", "न्यू साउथ वेल्स"),
  VIC: r("AU", "Victoria", "विक्टोरिया"),
  QLD: r("AU", "Queensland", "क्वींसलैंड"),
  WAU: r("AU", "Western Australia", "वेस्टर्न ऑस्ट्रेलिया"),
  SAU: r("AU", "South Australia", "साउथ ऑस्ट्रेलिया"),
  ACT: r("AU", "Australian Capital Territory", "ऑस्ट्रेलियन कैपिटल टेरिटरी"),
  /* Malaysia */
  PEN: r("MY", "Penang", "पेनांग"),
  PRK: r("MY", "Perak", "पेराक"),
  JHR: r("MY", "Johor", "जोहोर"),
  SEL: r("MY", "Selangor", "सेलांगोर"),
  /* South Africa */
  KZN: r("ZA", "KwaZulu-Natal", "क्वाज़ुलु-नटाल"),
  GAU: r("ZA", "Gauteng", "गौतेंग"),
  WCP: r("ZA", "Western Cape", "वेस्टर्न केप"),
} as const;

type RegionKey = keyof typeof REGIONS;

export interface City {
  readonly slug: string;
  readonly name: Bilingual;
  /** The state, province or nation, where the country has ones a reader would name. */
  readonly region?: Bilingual;
  readonly countryCode: string;
  readonly country: Bilingual;
  readonly zone: IanaZone;
  readonly lat: number;
  readonly lon: number;
}

const countryByCode = (code: string): Country => {
  const country = COUNTRIES.find((x) => x.code === code);
  if (!country) throw new Error(`cities: "${code}" is not a listed country`);
  return country;
};

/** A city in a region. */
const c = (slug: string, en: string, hi: string, region: RegionKey, zone: string, lat: number, lon: number): City => {
  const reg = REGIONS[region];
  const country = countryByCode(reg.country);
  return { slug, name: { en, hi }, region: reg.name, countryCode: country.code, country: country.name, zone: asZone(zone), lat, lon };
};

/** A city named by its country alone. */
const k = (slug: string, en: string, hi: string, countryCode: string, zone: string, lat: number, lon: number): City => {
  const country = countryByCode(countryCode);
  return { slug, name: { en, hi }, countryCode: country.code, country: country.name, zone: asZone(zone), lat, lon };
};

const NY = "America/New_York";
const CH = "America/Chicago";
const DEN = "America/Denver";
const PHX = "America/Phoenix";
const LA = "America/Los_Angeles";
const TOR = "America/Toronto";
const VAN = "America/Vancouver";
const EDM = "America/Edmonton";
const WPG = "America/Winnipeg";
const REG = "America/Regina";
const HAL = "America/Halifax";
const LON = "Europe/London";

export const CITIES: readonly City[] = [
  /* ---------------- United States ---------------- */
  /* Northeast */
  c("new-york", "New York", "न्यूयॉर्क", "NY", NY, 40.71, -74.01),
  c("hicksville", "Hicksville", "हिक्सविल", "NY", NY, 40.77, -73.53),
  c("rochester", "Rochester", "रॉचेस्टर", "NY", NY, 43.16, -77.61),
  c("edison", "Edison", "एडिसन", "NJ", NY, 40.52, -74.41),
  c("jersey-city", "Jersey City", "जर्सी सिटी", "NJ", NY, 40.73, -74.08),
  c("iselin", "Iselin", "आइज़लिन", "NJ", NY, 40.57, -74.32),
  c("piscataway", "Piscataway", "पिस्काटवे", "NJ", NY, 40.55, -74.46),
  c("plainsboro", "Plainsboro", "प्लेन्सबरो", "NJ", NY, 40.33, -74.59),
  c("princeton", "Princeton", "प्रिंसटन", "NJ", NY, 40.36, -74.66),
  c("monroe-township", "Monroe Township", "मुनरो टाउनशिप", "NJ", NY, 40.32, -74.43),
  c("east-brunswick", "East Brunswick", "ईस्ट ब्रंज़विक", "NJ", NY, 40.43, -74.42),
  c("south-brunswick", "South Brunswick", "साउथ ब्रंज़विक", "NJ", NY, 40.38, -74.53),
  c("north-brunswick", "North Brunswick", "नॉर्थ ब्रंज़विक", "NJ", NY, 40.45, -74.48),
  c("somerset", "Somerset", "समरसेट", "NJ", NY, 40.5, -74.5),
  c("bridgewater", "Bridgewater", "ब्रिजवॉटर", "NJ", NY, 40.59, -74.62),
  c("hillsborough", "Hillsborough", "हिल्सबरो", "NJ", NY, 40.47, -74.65),
  c("parsippany", "Parsippany", "पार्सिपनी", "NJ", NY, 40.86, -74.43),
  c("philadelphia", "Philadelphia", "फ़िलाडेल्फ़िया", "PA", NY, 39.95, -75.17),
  c("pittsburgh", "Pittsburgh", "पिट्सबर्ग", "PA", NY, 40.44, -79.99),
  c("king-of-prussia", "King of Prussia", "किंग ऑफ़ प्रशिया", "PA", NY, 40.09, -75.38),
  c("stamford", "Stamford", "स्टैमफ़ोर्ड", "CT", NY, 41.05, -73.54),
  c("hartford", "Hartford", "हार्टफ़ोर्ड", "CT", NY, 41.76, -72.69),
  c("boston", "Boston", "बॉस्टन", "MA", NY, 42.36, -71.06),
  c("shrewsbury", "Shrewsbury", "श्रूज़बरी", "MA", NY, 42.3, -71.71),
  c("westborough", "Westborough", "वेस्टबरो", "MA", NY, 42.27, -71.62),
  c("burlington-massachusetts", "Burlington, Massachusetts", "बर्लिंगटन, मैसाचुसेट्स", "MA", NY, 42.5, -71.2),
  /* Washington and around */
  c("washington", "Washington", "वॉशिंगटन", "DC", NY, 38.91, -77.04),
  c("ashburn", "Ashburn", "ऐशबर्न", "VA", NY, 39.04, -77.49),
  c("herndon", "Herndon", "हर्नडन", "VA", NY, 38.97, -77.39),
  c("chantilly", "Chantilly", "शैंटिली", "VA", NY, 38.89, -77.43),
  c("fairfax", "Fairfax", "फ़ेयरफ़ैक्स", "VA", NY, 38.85, -77.31),
  c("reston", "Reston", "रेस्टन", "VA", NY, 38.96, -77.36),
  c("sterling", "Sterling", "स्टर्लिंग", "VA", NY, 39.01, -77.4),
  c("gaithersburg", "Gaithersburg", "गेथर्सबर्ग", "MD", NY, 39.14, -77.2),
  c("rockville", "Rockville", "रॉकविल", "MD", NY, 39.08, -77.15),
  c("columbia", "Columbia", "कोलंबिया", "MD", NY, 39.2, -76.86),
  c("ellicott-city", "Ellicott City", "एलिकॉट सिटी", "MD", NY, 39.27, -76.8),
  /* Southeast */
  c("charlotte", "Charlotte", "शार्लट", "NC", NY, 35.23, -80.84),
  c("raleigh", "Raleigh", "रैली", "NC", NY, 35.78, -78.64),
  c("cary", "Cary", "कैरी", "NC", NY, 35.79, -78.78),
  c("morrisville", "Morrisville", "मॉरिसविल", "NC", NY, 35.82, -78.83),
  c("durham", "Durham", "डरहम", "NC", NY, 35.99, -78.9),
  c("atlanta", "Atlanta", "अटलांटा", "GA", NY, 33.75, -84.39),
  c("alpharetta", "Alpharetta", "अल्फ़ारेटा", "GA", NY, 34.08, -84.29),
  c("johns-creek", "Johns Creek", "जॉन्स क्रीक", "GA", NY, 34.03, -84.2),
  c("cumming", "Cumming", "कमिंग", "GA", NY, 34.21, -84.14),
  c("suwanee", "Suwanee", "सुवानी", "GA", NY, 34.05, -84.07),
  c("tampa", "Tampa", "टैम्पा", "FL", NY, 27.95, -82.46),
  c("orlando", "Orlando", "ऑरलैंडो", "FL", NY, 28.54, -81.38),
  c("miami", "Miami", "मियामी", "FL", NY, 25.76, -80.19),
  c("jacksonville", "Jacksonville", "जैक्सनविल", "FL", NY, 30.33, -81.66),
  c("nashville", "Nashville", "नैशविल", "TN", CH, 36.16, -86.78),
  /* Texas */
  c("dallas", "Dallas", "डलास", "TX", CH, 32.78, -96.8),
  c("houston", "Houston", "ह्यूस्टन", "TX", CH, 29.76, -95.37),
  c("plano", "Plano", "प्लेनो", "TX", CH, 33.02, -96.7),
  c("frisco", "Frisco", "फ़्रिस्को", "TX", CH, 33.15, -96.82),
  c("irving", "Irving", "इरविंग", "TX", CH, 32.81, -96.95),
  c("richardson", "Richardson", "रिचर्डसन", "TX", CH, 32.95, -96.73),
  c("mckinney", "McKinney", "मैकिनी", "TX", CH, 33.2, -96.62),
  c("allen", "Allen", "ऐलन", "TX", CH, 33.1, -96.67),
  c("austin", "Austin", "ऑस्टिन", "TX", CH, 30.27, -97.74),
  c("round-rock", "Round Rock", "राउंड रॉक", "TX", CH, 30.51, -97.68),
  c("san-antonio", "San Antonio", "सैन एंटोनियो", "TX", CH, 29.42, -98.49),
  c("sugar-land", "Sugar Land", "शुगर लैंड", "TX", CH, 29.62, -95.63),
  c("katy", "Katy", "केटी", "TX", CH, 29.79, -95.82),
  c("pearland", "Pearland", "पीयरलैंड", "TX", CH, 29.56, -95.29),
  /* Midwest */
  c("chicago", "Chicago", "शिकागो", "IL", CH, 41.88, -87.63),
  c("naperville", "Naperville", "नेपरविल", "IL", CH, 41.79, -88.15),
  c("schaumburg", "Schaumburg", "शॉमबर्ग", "IL", CH, 42.03, -88.08),
  c("aurora", "Aurora", "ऑरोरा", "IL", CH, 41.76, -88.32),
  c("bolingbrook", "Bolingbrook", "बोलिंगब्रुक", "IL", CH, 41.7, -88.07),
  c("skokie", "Skokie", "स्कोकी", "IL", CH, 42.03, -87.73),
  c("detroit", "Detroit", "डेट्रॉइट", "MI", NY, 42.33, -83.05),
  c("troy", "Troy", "ट्रॉय", "MI", NY, 42.61, -83.15),
  c("novi", "Novi", "नोवाई", "MI", NY, 42.48, -83.48),
  c("canton", "Canton", "कैंटन", "MI", NY, 42.31, -83.48),
  c("farmington-hills", "Farmington Hills", "फ़ार्मिंगटन हिल्स", "MI", NY, 42.49, -83.38),
  c("columbus", "Columbus", "कोलंबस", "OH", NY, 39.96, -83.0),
  c("dublin-ohio", "Dublin, Ohio", "डबलिन, ओहायो", "OH", NY, 40.1, -83.11),
  c("cincinnati", "Cincinnati", "सिनसिनाटी", "OH", NY, 39.1, -84.51),
  c("indianapolis", "Indianapolis", "इंडियानापोलिस", "IN", NY, 39.77, -86.16),
  c("carmel", "Carmel", "कार्मेल", "IN", NY, 39.98, -86.13),
  c("minneapolis", "Minneapolis", "मिनियापोलिस", "MN", CH, 44.98, -93.27),
  c("st-louis", "St. Louis", "सेंट लुइस", "MO", CH, 38.63, -90.2),
  c("overland-park", "Overland Park", "ओवरलैंड पार्क", "KS", CH, 38.98, -94.67),
  /* Mountain and desert */
  c("denver", "Denver", "डेनवर", "CO", DEN, 39.74, -104.99),
  c("phoenix", "Phoenix", "फ़ीनिक्स", "AZ", PHX, 33.45, -112.07),
  c("chandler", "Chandler", "चैंडलर", "AZ", PHX, 33.31, -111.84),
  c("las-vegas", "Las Vegas", "लास वेगास", "NV", LA, 36.17, -115.14),
  /* Pacific Northwest */
  c("seattle", "Seattle", "सिएटल", "WA", LA, 47.61, -122.33),
  c("bellevue", "Bellevue", "बेलव्यू", "WA", LA, 47.61, -122.2),
  c("redmond", "Redmond", "रेडमंड", "WA", LA, 47.67, -122.12),
  c("sammamish", "Sammamish", "सैमामिश", "WA", LA, 47.62, -122.04),
  c("kirkland", "Kirkland", "कर्कलैंड", "WA", LA, 47.68, -122.21),
  c("portland", "Portland", "पोर्टलैंड", "OR", LA, 45.52, -122.68),
  c("hillsboro", "Hillsboro", "हिल्सबोरो", "OR", LA, 45.52, -122.99),
  /* California */
  c("san-francisco", "San Francisco", "सैन फ़्रांसिस्को", "CA", LA, 37.77, -122.42),
  c("san-jose", "San Jose", "सैन होज़े", "CA", LA, 37.34, -121.89),
  c("fremont", "Fremont", "फ़्रीमॉन्ट", "CA", LA, 37.55, -121.99),
  c("sunnyvale", "Sunnyvale", "सनीवेल", "CA", LA, 37.37, -122.04),
  c("santa-clara", "Santa Clara", "सांता क्लारा", "CA", LA, 37.35, -121.95),
  c("cupertino", "Cupertino", "क्यूपर्टीनो", "CA", LA, 37.32, -122.03),
  c("milpitas", "Milpitas", "मिलपीटस", "CA", LA, 37.43, -121.9),
  c("mountain-view", "Mountain View", "माउंटेन व्यू", "CA", LA, 37.39, -122.08),
  c("dublin-california", "Dublin, California", "डबलिन, कैलिफ़ोर्निया", "CA", LA, 37.7, -121.94),
  c("pleasanton", "Pleasanton", "प्लेज़ेंटन", "CA", LA, 37.66, -121.87),
  c("san-ramon", "San Ramon", "सैन रेमन", "CA", LA, 37.78, -121.98),
  c("tracy", "Tracy", "ट्रेसी", "CA", LA, 37.74, -121.43),
  c("sacramento", "Sacramento", "सैक्रामेंटो", "CA", LA, 38.58, -121.49),
  c("folsom", "Folsom", "फ़ोल्सम", "CA", LA, 38.68, -121.18),
  c("elk-grove", "Elk Grove", "एल्क ग्रोव", "CA", LA, 38.41, -121.37),
  c("yuba-city", "Yuba City", "यूबा सिटी", "CA", LA, 39.14, -121.62),
  c("fresno", "Fresno", "फ़्रेज़्नो", "CA", LA, 36.74, -119.79),
  c("bakersfield", "Bakersfield", "बेकर्सफ़ील्ड", "CA", LA, 35.37, -119.02),
  c("los-angeles", "Los Angeles", "लॉस एंजेलेस", "CA", LA, 34.05, -118.24),
  c("artesia", "Artesia", "आर्टीशिया", "CA", LA, 33.87, -118.08),
  c("cerritos", "Cerritos", "सेरिटोस", "CA", LA, 33.86, -118.06),
  c("irvine", "Irvine", "इरवाइन", "CA", LA, 33.68, -117.83),
  c("san-diego", "San Diego", "सैन डिएगो", "CA", LA, 32.72, -117.16),

  /* ---------------- Canada ---------------- */
  c("toronto", "Toronto", "टोरंटो", "ON", TOR, 43.65, -79.38),
  c("scarborough", "Scarborough", "स्कारबरो", "ON", TOR, 43.77, -79.26),
  c("etobicoke", "Etobicoke", "एटोबिको", "ON", TOR, 43.62, -79.51),
  c("brampton", "Brampton", "ब्रैम्पटन", "ON", TOR, 43.73, -79.76),
  c("mississauga", "Mississauga", "मिसिसॉगा", "ON", TOR, 43.59, -79.64),
  c("caledon", "Caledon", "कैलेडन", "ON", TOR, 43.87, -79.86),
  c("markham", "Markham", "मार्कम", "ON", TOR, 43.86, -79.34),
  c("vaughan", "Vaughan", "वॉन", "ON", TOR, 43.84, -79.51),
  c("ajax", "Ajax", "एजैक्स", "ON", TOR, 43.85, -79.02),
  c("pickering", "Pickering", "पिकरिंग", "ON", TOR, 43.84, -79.09),
  c("whitby", "Whitby", "व्हिटबी", "ON", TOR, 43.9, -78.94),
  c("oshawa", "Oshawa", "ओशावा", "ON", TOR, 43.9, -78.86),
  c("oakville", "Oakville", "ओकविल", "ON", TOR, 43.45, -79.68),
  c("milton", "Milton", "मिल्टन", "ON", TOR, 43.52, -79.88),
  c("burlington-ontario", "Burlington, Ontario", "बर्लिंगटन, ओंटारियो", "ON", TOR, 43.33, -79.8),
  c("hamilton", "Hamilton", "हैमिल्टन", "ON", TOR, 43.26, -79.87),
  c("kitchener", "Kitchener", "किचनर", "ON", TOR, 43.45, -80.49),
  c("waterloo", "Waterloo", "वॉटरलू", "ON", TOR, 43.46, -80.52),
  c("cambridge-ontario", "Cambridge, Ontario", "कैम्ब्रिज, ओंटारियो", "ON", TOR, 43.36, -80.31),
  c("guelph", "Guelph", "ग्वेल्फ़", "ON", TOR, 43.55, -80.25),
  c("london-ontario", "London, Ontario", "लंदन, ओंटारियो", "ON", TOR, 42.98, -81.25),
  c("windsor-ontario", "Windsor, Ontario", "विंडसर, ओंटारियो", "ON", TOR, 42.32, -83.04),
  c("barrie", "Barrie", "बैरी", "ON", TOR, 44.39, -79.69),
  c("ottawa", "Ottawa", "ओटावा", "ON", TOR, 45.42, -75.7),
  c("montreal", "Montreal", "मॉन्ट्रियल", "QC", TOR, 45.5, -73.57),
  c("laval", "Laval", "लावाल", "QC", TOR, 45.61, -73.71),
  c("halifax", "Halifax", "हैलिफ़ैक्स", "NS", HAL, 44.65, -63.58),
  c("winnipeg", "Winnipeg", "विनिपेग", "MB", WPG, 49.9, -97.14),
  c("regina", "Regina", "रिजाइना", "SK", REG, 50.45, -104.62),
  c("saskatoon", "Saskatoon", "सस्केटून", "SK", REG, 52.13, -106.67),
  c("calgary", "Calgary", "कैलगरी", "AB", EDM, 51.05, -114.07),
  c("edmonton", "Edmonton", "एडमंटन", "AB", EDM, 53.55, -113.49),
  c("vancouver", "Vancouver", "वैंकूवर", "BC", VAN, 49.28, -123.12),
  c("surrey", "Surrey", "सरे", "BC", VAN, 49.19, -122.85),
  c("burnaby", "Burnaby", "बर्नबी", "BC", VAN, 49.25, -122.98),
  c("richmond-bc", "Richmond, British Columbia", "रिचमंड, ब्रिटिश कोलंबिया", "BC", VAN, 49.17, -123.14),
  c("delta", "Delta", "डेल्टा", "BC", VAN, 49.09, -123.06),
  c("abbotsford", "Abbotsford", "ऐबट्सफ़ोर्ड", "BC", VAN, 49.05, -122.3),
  c("victoria", "Victoria", "विक्टोरिया", "BC", VAN, 48.43, -123.37),
  c("kelowna", "Kelowna", "केलोना", "BC", VAN, 49.89, -119.5),

  /* ---------------- United Kingdom ---------------- */
  c("london", "London", "लंदन", "ENG", LON, 51.51, -0.13),
  c("southall", "Southall", "साउथहॉल", "ENG", LON, 51.51, -0.38),
  c("wembley", "Wembley", "वेम्बली", "ENG", LON, 51.55, -0.3),
  c("harrow", "Harrow", "हैरो", "ENG", LON, 51.58, -0.34),
  c("hounslow", "Hounslow", "हाउंस्लो", "ENG", LON, 51.47, -0.37),
  c("hayes", "Hayes", "हेज़", "ENG", LON, 51.51, -0.42),
  c("ilford", "Ilford", "इलफ़ोर्ड", "ENG", LON, 51.56, 0.07),
  c("east-ham", "East Ham", "ईस्ट हैम", "ENG", LON, 51.53, 0.05),
  c("croydon", "Croydon", "क्रॉयडन", "ENG", LON, 51.37, -0.1),
  c("watford", "Watford", "वॉटफ़ोर्ड", "ENG", LON, 51.66, -0.4),
  c("slough", "Slough", "स्लाउ", "ENG", LON, 51.51, -0.59),
  c("reading", "Reading", "रेडिंग", "ENG", LON, 51.45, -0.97),
  c("luton", "Luton", "ल्यूटन", "ENG", LON, 51.88, -0.42),
  c("milton-keynes", "Milton Keynes", "मिल्टन कीन्स", "ENG", LON, 52.04, -0.76),
  c("gravesend", "Gravesend", "ग्रेव्ज़एंड", "ENG", LON, 51.44, 0.37),
  c("oxford", "Oxford", "ऑक्सफ़र्ड", "ENG", LON, 51.75, -1.26),
  c("cambridge", "Cambridge", "कैम्ब्रिज", "ENG", LON, 52.21, 0.12),
  c("peterborough", "Peterborough", "पीटरबरो", "ENG", LON, 52.57, -0.24),
  c("northampton", "Northampton", "नॉर्थैम्प्टन", "ENG", LON, 52.24, -0.9),
  c("leicester", "Leicester", "लेस्टर", "ENG", LON, 52.64, -1.13),
  c("nottingham", "Nottingham", "नॉटिंघम", "ENG", LON, 52.95, -1.15),
  c("derby", "Derby", "डर्बी", "ENG", LON, 52.92, -1.48),
  c("coventry", "Coventry", "कोवेंट्री", "ENG", LON, 52.41, -1.51),
  c("birmingham", "Birmingham", "बर्मिंघम", "ENG", LON, 52.49, -1.89),
  c("wolverhampton", "Wolverhampton", "वुल्वरहैम्प्टन", "ENG", LON, 52.59, -2.13),
  c("walsall", "Walsall", "वॉल्सॉल", "ENG", LON, 52.59, -1.98),
  c("west-bromwich", "West Bromwich", "वेस्ट ब्रॉमिच", "ENG", LON, 52.52, -1.99),
  c("bristol", "Bristol", "ब्रिस्टल", "ENG", LON, 51.45, -2.59),
  c("manchester", "Manchester", "मैनचेस्टर", "ENG", LON, 53.48, -2.24),
  c("bolton", "Bolton", "बोल्टन", "ENG", LON, 53.58, -2.43),
  c("oldham", "Oldham", "ओल्डम", "ENG", LON, 53.54, -2.11),
  c("preston", "Preston", "प्रेस्टन", "ENG", LON, 53.76, -2.7),
  c("blackburn", "Blackburn", "ब्लैकबर्न", "ENG", LON, 53.75, -2.48),
  c("liverpool", "Liverpool", "लिवरपूल", "ENG", LON, 53.41, -2.98),
  c("leeds", "Leeds", "लीड्स", "ENG", LON, 53.8, -1.55),
  c("bradford", "Bradford", "ब्रैडफ़ोर्ड", "ENG", LON, 53.8, -1.75),
  c("sheffield", "Sheffield", "शेफ़ील्ड", "ENG", LON, 53.38, -1.47),
  c("newcastle", "Newcastle", "न्यूकैसल", "ENG", LON, 54.98, -1.61),
  c("cardiff", "Cardiff", "कार्डिफ़", "WLS", LON, 51.48, -3.18),
  c("glasgow", "Glasgow", "ग्लासगो", "SCT", LON, 55.86, -4.25),
  c("edinburgh", "Edinburgh", "एडिनबरा", "SCT", LON, 55.95, -3.19),

  /* ---------------- The Gulf ---------------- */
  k("dubai", "Dubai", "दुबई", "AE", "Asia/Dubai", 25.2, 55.27),
  k("abu-dhabi", "Abu Dhabi", "अबू धाबी", "AE", "Asia/Dubai", 24.45, 54.38),
  k("sharjah", "Sharjah", "शारजाह", "AE", "Asia/Dubai", 25.35, 55.39),
  k("ajman", "Ajman", "अजमान", "AE", "Asia/Dubai", 25.41, 55.44),
  k("al-ain", "Al Ain", "अल ऐन", "AE", "Asia/Dubai", 24.21, 55.75),
  k("ras-al-khaimah", "Ras Al Khaimah", "रास अल खैमा", "AE", "Asia/Dubai", 25.79, 55.94),
  k("riyadh", "Riyadh", "रियाद", "SA", "Asia/Riyadh", 24.69, 46.72),
  k("jeddah", "Jeddah", "जेद्दा", "SA", "Asia/Riyadh", 21.49, 39.19),
  k("dammam", "Dammam", "दम्माम", "SA", "Asia/Riyadh", 26.43, 50.1),
  k("al-khobar", "Al Khobar", "अल खोबार", "SA", "Asia/Riyadh", 26.28, 50.21),
  k("jubail", "Jubail", "जुबैल", "SA", "Asia/Riyadh", 27.01, 49.66),
  k("kuwait-city", "Kuwait City", "कुवैत सिटी", "KW", "Asia/Kuwait", 29.37, 47.98),
  k("salmiya", "Salmiya", "सालमिया", "KW", "Asia/Kuwait", 29.33, 48.08),
  k("doha", "Doha", "दोहा", "QA", "Asia/Qatar", 25.29, 51.53),
  k("muscat", "Muscat", "मस्कट", "OM", "Asia/Muscat", 23.59, 58.41),
  k("salalah", "Salalah", "सलालाह", "OM", "Asia/Muscat", 17.02, 54.09),
  k("sohar", "Sohar", "सोहार", "OM", "Asia/Muscat", 24.35, 56.71),
  k("manama", "Manama", "मनामा", "BH", "Asia/Bahrain", 26.23, 50.59),

  /* ---------------- Australia and New Zealand ---------------- */
  c("sydney", "Sydney", "सिडनी", "NSW", "Australia/Sydney", -33.87, 151.21),
  c("parramatta", "Parramatta", "पैरामाटा", "NSW", "Australia/Sydney", -33.82, 151.0),
  c("blacktown", "Blacktown", "ब्लैकटाउन", "NSW", "Australia/Sydney", -33.77, 150.91),
  c("melbourne", "Melbourne", "मेलबर्न", "VIC", "Australia/Melbourne", -37.81, 144.96),
  c("dandenong", "Dandenong", "डैंडेनॉन्ग", "VIC", "Australia/Melbourne", -37.99, 145.21),
  c("tarneit", "Tarneit", "टार्नीट", "VIC", "Australia/Melbourne", -37.83, 144.66),
  c("brisbane", "Brisbane", "ब्रिस्बेन", "QLD", "Australia/Brisbane", -27.47, 153.03),
  c("gold-coast", "Gold Coast", "गोल्ड कोस्ट", "QLD", "Australia/Brisbane", -28.02, 153.4),
  c("perth", "Perth", "पर्थ", "WAU", "Australia/Perth", -31.95, 115.86),
  c("adelaide", "Adelaide", "एडिलेड", "SAU", "Australia/Adelaide", -34.93, 138.6),
  c("canberra", "Canberra", "कैनबरा", "ACT", "Australia/Sydney", -35.28, 149.13),
  k("auckland", "Auckland", "ऑकलैंड", "NZ", "Pacific/Auckland", -36.85, 174.76),
  k("wellington", "Wellington", "वेलिंगटन", "NZ", "Pacific/Auckland", -41.29, 174.78),
  k("christchurch", "Christchurch", "क्राइस्टचर्च", "NZ", "Pacific/Auckland", -43.53, 172.64),
  k("hamilton-new-zealand", "Hamilton, New Zealand", "हैमिल्टन, न्यूज़ीलैंड", "NZ", "Pacific/Auckland", -37.79, 175.28),

  /* ---------------- Southeast and East Asia ---------------- */
  k("kuala-lumpur", "Kuala Lumpur", "कुआलालंपुर", "MY", "Asia/Kuala_Lumpur", 3.14, 101.69),
  c("petaling-jaya", "Petaling Jaya", "पेटालिंग जया", "SEL", "Asia/Kuala_Lumpur", 3.11, 101.61),
  c("klang", "Klang", "क्लांग", "SEL", "Asia/Kuala_Lumpur", 3.04, 101.45),
  c("george-town", "George Town", "जॉर्ज टाउन", "PEN", "Asia/Kuala_Lumpur", 5.41, 100.34),
  c("ipoh", "Ipoh", "इपोह", "PRK", "Asia/Kuala_Lumpur", 4.6, 101.08),
  c("johor-bahru", "Johor Bahru", "जोहोर बाहरू", "JHR", "Asia/Kuala_Lumpur", 1.49, 103.74),
  k("singapore", "Singapore", "सिंगापुर", "SG", "Asia/Singapore", 1.35, 103.82),
  k("hong-kong", "Hong Kong", "हॉन्ग कॉन्ग", "HK", "Asia/Hong_Kong", 22.32, 114.17),
  k("bangkok", "Bangkok", "बैंकॉक", "TH", "Asia/Bangkok", 13.76, 100.5),
  k("jakarta", "Jakarta", "जकार्ता", "ID", "Asia/Jakarta", -6.21, 106.85),
  k("manila", "Manila", "मनीला", "PH", "Asia/Manila", 14.6, 120.98),
  k("tokyo", "Tokyo", "टोक्यो", "JP", "Asia/Tokyo", 35.68, 139.69),
  k("yangon", "Yangon", "यांगून", "MM", "Asia/Yangon", 16.87, 96.2),
  k("seoul", "Seoul", "सियोल", "KR", "Asia/Seoul", 37.57, 126.98),

  /* ---------------- Africa and the Indian Ocean ---------------- */
  c("durban", "Durban", "डरबन", "KZN", "Africa/Johannesburg", -29.86, 31.02),
  c("pietermaritzburg", "Pietermaritzburg", "पीटरमैरिट्ज़बर्ग", "KZN", "Africa/Johannesburg", -29.62, 30.39),
  c("johannesburg", "Johannesburg", "जोहान्सबर्ग", "GAU", "Africa/Johannesburg", -26.2, 28.05),
  c("pretoria", "Pretoria", "प्रिटोरिया", "GAU", "Africa/Johannesburg", -25.75, 28.19),
  c("cape-town", "Cape Town", "केप टाउन", "WCP", "Africa/Johannesburg", -33.93, 18.42),
  k("port-louis", "Port Louis", "पोर्ट लुई", "MU", "Indian/Mauritius", -20.16, 57.5),
  k("nairobi", "Nairobi", "नैरोबी", "KE", "Africa/Nairobi", -1.29, 36.82),
  k("mombasa", "Mombasa", "मोम्बासा", "KE", "Africa/Nairobi", -4.04, 39.67),
  k("dar-es-salaam", "Dar es Salaam", "दार एस सलाम", "TZ", "Africa/Dar_es_Salaam", -6.79, 39.28),
  k("kampala", "Kampala", "कंपाला", "UG", "Africa/Kampala", 0.35, 32.58),
  k("lagos", "Lagos", "लागोस", "NG", "Africa/Lagos", 6.52, 3.38),
  k("saint-denis", "Saint-Denis", "सेंट-डेनिस", "RE", "Indian/Reunion", -20.88, 55.45),

  /* ---------------- The Caribbean, South America and the Pacific ---------------- */
  k("port-of-spain", "Port of Spain", "पोर्ट ऑफ़ स्पेन", "TT", "America/Port_of_Spain", 10.65, -61.52),
  k("chaguanas", "Chaguanas", "चागुआनास", "TT", "America/Port_of_Spain", 10.52, -61.41),
  k("san-fernando", "San Fernando", "सैन फ़र्नांडो", "TT", "America/Port_of_Spain", 10.28, -61.47),
  k("georgetown", "Georgetown", "जॉर्जटाउन", "GY", "America/Guyana", 6.8, -58.16),
  k("paramaribo", "Paramaribo", "पारामारिबो", "SR", "America/Paramaribo", 5.85, -55.2),
  k("kingston", "Kingston", "किंग्स्टन", "JM", "America/Jamaica", 17.97, -76.79),
  k("suva", "Suva", "सुवा", "FJ", "Pacific/Fiji", -18.14, 178.44),
  k("nadi", "Nadi", "नादी", "FJ", "Pacific/Fiji", -17.8, 177.42),
  k("lautoka", "Lautoka", "लौटोका", "FJ", "Pacific/Fiji", -17.61, 177.45),

  /* ---------------- Europe ---------------- */
  k("berlin", "Berlin", "बर्लिन", "DE", "Europe/Berlin", 52.52, 13.41),
  k("frankfurt", "Frankfurt", "फ़्रैंकफ़र्ट", "DE", "Europe/Berlin", 50.11, 8.68),
  k("munich", "Munich", "म्यूनिख", "DE", "Europe/Berlin", 48.14, 11.58),
  k("hamburg", "Hamburg", "हैम्बर्ग", "DE", "Europe/Berlin", 53.55, 9.99),
  k("stuttgart", "Stuttgart", "श्टुटगार्ट", "DE", "Europe/Berlin", 48.78, 9.18),
  k("dusseldorf", "Düsseldorf", "डसेलडोर्फ़", "DE", "Europe/Berlin", 51.23, 6.78),
  k("cologne", "Cologne", "कोलोन", "DE", "Europe/Berlin", 50.94, 6.96),
  k("amsterdam", "Amsterdam", "एम्स्टर्डम", "NL", "Europe/Amsterdam", 52.37, 4.9),
  k("the-hague", "The Hague", "द हेग", "NL", "Europe/Amsterdam", 52.08, 4.31),
  k("rotterdam", "Rotterdam", "रॉटरडैम", "NL", "Europe/Amsterdam", 51.92, 4.48),
  k("eindhoven", "Eindhoven", "आइंडहोवन", "NL", "Europe/Amsterdam", 51.44, 5.47),
  k("amstelveen", "Amstelveen", "एम्स्टलवीन", "NL", "Europe/Amsterdam", 52.3, 4.86),
  k("dublin", "Dublin", "डबलिन", "IE", "Europe/Dublin", 53.35, -6.26),
  k("cork", "Cork", "कॉर्क", "IE", "Europe/Dublin", 51.9, -8.47),
  k("rome", "Rome", "रोम", "IT", "Europe/Rome", 41.9, 12.5),
  k("milan", "Milan", "मिलान", "IT", "Europe/Rome", 45.46, 9.19),
  k("brescia", "Brescia", "ब्रेशिया", "IT", "Europe/Rome", 45.54, 10.22),
  k("paris", "Paris", "पेरिस", "FR", "Europe/Paris", 48.86, 2.35),
  k("lisbon", "Lisbon", "लिस्बन", "PT", "Europe/Lisbon", 38.72, -9.14),
  k("barcelona", "Barcelona", "बार्सिलोना", "ES", "Europe/Madrid", 41.39, 2.17),
  k("madrid", "Madrid", "मैड्रिड", "ES", "Europe/Madrid", 40.42, -3.7),
  k("zurich", "Zurich", "ज़्यूरिख", "CH", "Europe/Zurich", 47.38, 8.54),
  k("geneva", "Geneva", "जिनेवा", "CH", "Europe/Zurich", 46.2, 6.14),
  k("basel", "Basel", "बासेल", "CH", "Europe/Zurich", 47.56, 7.59),
  k("brussels", "Brussels", "ब्रसेल्स", "BE", "Europe/Brussels", 50.85, 4.35),
  k("antwerp", "Antwerp", "एंटवर्प", "BE", "Europe/Brussels", 51.22, 4.4),
  k("vienna", "Vienna", "वियना", "AT", "Europe/Vienna", 48.21, 16.37),
  k("stockholm", "Stockholm", "स्टॉकहोम", "SE", "Europe/Stockholm", 59.33, 18.07),
  k("oslo", "Oslo", "ओस्लो", "NO", "Europe/Oslo", 59.91, 10.75),
  k("copenhagen", "Copenhagen", "कोपेनहेगन", "DK", "Europe/Copenhagen", 55.68, 12.57),
  k("helsinki", "Helsinki", "हेलसिंकी", "FI", "Europe/Helsinki", 60.17, 24.94),
  k("warsaw", "Warsaw", "वॉरसॉ", "PL", "Europe/Warsaw", 52.23, 21.01),
  k("luxembourg", "Luxembourg", "लक्ज़मबर्ग", "LU", "Europe/Luxembourg", 49.61, 6.13),
];

export const CITY_SLUGS: readonly string[] = CITIES.map((x) => x.slug);

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((x) => x.slug === slug);
}

export interface CountryGroup {
  readonly country: Country;
  readonly cities: readonly City[];
}

/** The cities by country, in the order of COUNTRIES, each list alphabetical
    in `lang` so a reader can find their own town in a long column. */
export function citiesByCountry(lang: Lang): readonly CountryGroup[] {
  const collator = new Intl.Collator(lang);
  return COUNTRIES.map((country) => ({
    country,
    cities: CITIES.filter((x) => x.countryCode === country.code).sort((a, b) => collator.compare(a.name[lang], b.name[lang])),
  })).filter((g) => g.cities.length > 0);
}
