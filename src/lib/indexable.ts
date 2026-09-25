import { OCCASIONS, occasionBySlug, type Occasion } from "@/content/muhurat";

/* ---------------------------------------------------------------------------
   Which pages ask to be indexed. The one source of truth: the sitemap, every
   page's robots tag and hreflang, and scripts/indexnow.mjs (through the live
   sitemap) all read it.

   A new domain with no links gets its crawl spent on the pages it offers
   first. Seven hundred templated city pages read as a doorway set and held
   back the whole site in Bing, so the index is a short list of strong pages,
   grown in batches as coverage comes in:

     · every core page, always;
     · the four monthly occasions, always;
     · a dated occasion while it falls within the next 180 days, or earlier
       if it already earns search traffic (EARNING_OCCASIONS);
     · a city page when its slug is in INDEXABLE_CITIES.

   The rest stay live, return 200 and are linked as before; they carry
   `noindex, follow` and stay out of the sitemap. `/privacy` and `/terms` are
   noindex for good. Both locales follow the same rule, so an hreflang pair is
   always indexable on both sides or on neither.

   To grow the index: give a city its own content first, then add its slug.
   --------------------------------------------------------------------------- */

export const INDEXABLE_CITIES = [
  "new-york", "edison", "jersey-city", "chicago", "houston", "dallas", "atlanta",
  "san-francisco", "san-jose", "fremont", "seattle", "los-angeles", "washington", "boston",
  "toronto", "brampton", "mississauga", "vancouver", "surrey",
  "london", "leicester", "birmingham",
  "dubai", "singapore", "sydney", "melbourne", "auckland", "kuala-lumpur", "durban", "port-of-spain",
] as const;

const CITY_SET: ReadonlySet<string> = new Set(INDEXABLE_CITIES);

export const MUHURAT_INDEX_WINDOW_DAYS = 180;

/**
 * Dated occasions outside the window that already earn Google impressions
 * (Search Console, 25 September 2026). A page that is ranking keeps its place
 * until its day is past; take a slug out only once it has.
 */
export const EARNING_OCCASIONS: ReadonlySet<string> = new Set(["ganga-dussehra-2027"]);

const NEVER_INDEXED: ReadonlySet<string> = new Set(["/privacy", "/terms"]);

const DAY_MS = 86_400_000;

export const isIndexableCity = (slug: string): boolean => CITY_SET.has(slug);

/**
 * A monthly occasion is always in. A dated one is in from the moment its first
 * possible month is within the window until its last possible month is over,
 * so a season like Pitru Paksha stays indexed while it is running.
 */
export function isIndexableOccasion(o: Occasion, now = new Date()): boolean {
  if (o.cadence === "monthly") return true;
  const months = o.occurrence.months;
  if (!months.length) return false;
  const [fy, fm] = months[0].split("-").map(Number);
  const [ly, lm] = months[months.length - 1].split("-").map(Number);
  const opens = Date.UTC(fy, fm - 1, 1);
  const closes = Date.UTC(ly, lm, 1); // the first day after the last month
  if (closes <= now.getTime()) return false;
  return EARNING_OCCASIONS.has(o.slug) || opens <= now.getTime() + MUHURAT_INDEX_WINDOW_DAYS * DAY_MS;
}

/** For a locale-independent path in the public English shape ("/panchang/edison"). */
export function isIndexable(path: string, now = new Date()): boolean {
  if (NEVER_INDEXED.has(path)) return false;
  const city = path.match(/^\/panchang\/([^/]+)$/)?.[1];
  if (city && city !== "shraddha") return isIndexableCity(city);
  const occasion = path.match(/^\/muhurat\/([^/]+)$/)?.[1];
  if (occasion) {
    const o = occasionBySlug(occasion);
    return o ? isIndexableOccasion(o, now) : false;
  }
  return true;
}

/** The dated occasions indexed today, for the tests and the check script. */
export const indexableOccasions = (now = new Date()): readonly Occasion[] =>
  OCCASIONS.filter((o) => isIndexableOccasion(o, now));
