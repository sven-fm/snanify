import { content, type Lang } from "@/lib/content";
import { localeDef, localePath, LOCALES } from "@/lib/i18n";
import { currencyForLang, fillPrices } from "@/content/prices";
import { ETHICS_MAIL } from "@/content/trust";

/* ---------------------------------------------------------------------------
   JSON-LD, the machine-readable edition of the pages.

   Rules this file is written under, and they are the same rules the visible
   copy is written under:

   1. NOTHING IS ASSERTED HERE THAT IS NOT ASSERTED ON THE PAGE. Structured
      data is read by crawlers and by language models, and a claim made only
      to a crawler is still a claim. No prices (nothing is on sale), no
      officiants (none has consented to be named), no aggregateRating, no
      geo coordinates (none of the six ghats has been surveyed), no sameAs
      (no social profile has been verified).
   2. NO INVENTED PRECISION. An occasion whose date we have only to the month
      ships `startDate: "2026-09"`, which is a valid ISO 8601 reduced-precision
      date and is the coarsest correct representation. An occasion with no
      date at all ships as an EventSeries with no startDate rather than as an
      Event with a guessed one. Losing an Event rich result is the correct
      price for not publishing a date we have not sourced.
   3. NO SEARCHACTION. The WebSite node deliberately carries no
      `potentialAction`, because there is no site search to point it at. A
      sitelinks searchbox declared against a URL that does not exist is a lie
      told to a crawler, and it is the kind that gets caught.
   4. EVERY INTERPOLATED STRING IS ESCAPED. See `serializeJsonLd`.
   --------------------------------------------------------------------------- */

export const SITE_ORIGIN = "https://www.snanify.com";

/** Stable graph identifiers, so the same entity is one node across the site. */
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOGO_ID = `${SITE_ORIGIN}/#logo`;

/* --- types --------------------------------------------------------------- */

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | JsonLdNode;

/** A JSON-LD object. `undefined` members are dropped by JSON.stringify, which
 *  is how every optional field below stays out of the payload when unknown. */
export interface JsonLdNode {
  readonly [key: string]: JsonLdValue | undefined;
}

/* --- serialisation ------------------------------------------------------- */

/**
 * The only characters that can end an inline script early or open an HTML
 * comment inside one. Escaping them to their \uXXXX form keeps the payload
 * byte-for-byte valid JSON (a \u escape is legal inside a JSON string) while
 * making `</script>`, `<!--` and `<script` impossible to express, whatever a
 * content author or a future CMS puts in a name. U+2028 and U+2029 are escaped
 * because they terminate a line in JavaScript but not in JSON.
 */
const SCRIPT_UNSAFE = /[<>&\u2028\u2029]/g;

const SCRIPT_ESCAPES: Readonly<Record<string, string>> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

export function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value).replace(SCRIPT_UNSAFE, (c) => SCRIPT_ESCAPES[c] ?? "");
}

/* --- the component ------------------------------------------------------- */

/**
 * Renders one `application/ld+json` block holding a @graph. One block per page
 * rather than several, so the nodes can reference each other by @id and a
 * crawler reads one document instead of four disconnected ones.
 */
export function StructuredData({ graph }: { graph: readonly JsonLdNode[] }) {
  if (graph.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      /* The payload is JSON.stringify output with <, >, & and the two Unicode
         line separators replaced by their escape sequences, so no interpolated
         value can close this element or open a comment inside it. Nothing but
         that string is written here. */
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/* --- shared helpers ------------------------------------------------------ */

/** Absolute URL in the PUBLIC shape: English unprefixed, every other locale
 *  under its own code. Never the internal "/en/..." form. */
export function publicUrl(lang: Lang, path: string): string {
  return `${SITE_ORIGIN}${localePath(lang, path)}`;
}

/**
 * Every language the site publishes in, as BCP 47 tags, read from the registry
 * rather than listed here. This used to be a hand-written `["en", "hi"]`, which
 * is exactly the kind of thing that stays at two while the site goes to twelve.
 */
const SITE_LANGUAGES = LOCALES.map((l) => l.tag);

/* --- organization -------------------------------------------------------- */

/**
 * One Organization node, identical on every page and carrying the same @id, so
 * a crawler merges them instead of inferring six companies.
 *
 * The logo is the site icon, an SVG. Google's logo rich result requires a
 * raster (PNG or JPG) and will ignore this one; a raster export at
 * /logo-512.png is the fix, and it is a shared asset rather than something
 * this file can create.
 */
export function organization(lang: Lang): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Snanify",
    alternateName: "स्नानिफ़ाई",
    url: `${SITE_ORIGIN}/`,
    description: content[lang].meta.description,
    email: ETHICS_MAIL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE_ORIGIN}/icon.svg`,
      contentUrl: `${SITE_ORIGIN}/icon.svg`,
      encodingFormat: "image/svg+xml",
      width: 48,
      height: 48,
      caption: "Snanify",
    },
    image: { "@id": LOGO_ID },
    /* Every locale is declared on the organisation itself and not only on the
       pages, because the entity is multilingual and not merely translated.
       Read from the registry so it cannot fall behind the locales actually
       being served. */
    knowsLanguage: LOCALES.map((l) => ({
      "@type": "Language",
      name: l.english,
      alternateName: l.tag,
    })),
    /* /ethics is the binding published position, so it is named as both the
       ethics policy and the publishing principles rather than left implicit. */
    ethicsPolicy: `${SITE_ORIGIN}/ethics`,
    publishingPrinciples: `${SITE_ORIGIN}/ethics`,
    /* No sameAs: no social profile has been verified as belonging to us.
       No foundingDate, no numberOfEmployees, no aggregateRating. */
  };
}

/** A bare reference to the Organization node, for `publisher` and `mainEntity`. */
export function organizationRef(): JsonLdNode {
  return { "@id": ORGANIZATION_ID };
}

/* --- website ------------------------------------------------------------- */

/**
 * The site as an entity. No `potentialAction`: a SearchAction here would
 * declare a search endpoint that does not exist. When a real /search ships,
 * add it then and not before.
 */
export function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: "Snanify",
    alternateName: "स्नानिफ़ाई",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: SITE_LANGUAGES,
  };
}

/* --- page ---------------------------------------------------------------- */

export interface WebPageOptions {
  readonly lang: Lang;
  /** Route in the internal shape, e.g. "/muhurat/pitru-paksha-2026". */
  readonly path: string;
  readonly name: string;
  readonly description: string;
  /** "WebPage" by default; "FAQPage", "CollectionPage", "AboutPage". */
  readonly type?: string;
  readonly mainEntity?: JsonLdValue;
  readonly about?: JsonLdValue;
  readonly mentions?: readonly JsonLdValue[];
  readonly breadcrumb?: JsonLdValue;
}

export function webPage(o: WebPageOptions): JsonLdNode {
  const url = publicUrl(o.lang, o.path);
  return {
    "@type": o.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: o.name,
    description: o.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: localeDef(o.lang).tag,
    mainEntity: o.mainEntity,
    about: o.about,
    mentions: o.mentions,
    breadcrumb: o.breadcrumb,
  };
}

/* --- breadcrumb ---------------------------------------------------------- */

export interface Crumb {
  readonly name: string;
  readonly path: string;
}

/** The trail ends on the current page, and its @id hangs off that page's URL. */
export function breadcrumbList(lang: Lang, trail: readonly Crumb[]): JsonLdNode {
  const last = trail[trail.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${publicUrl(lang, last.path)}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: publicUrl(lang, crumb.path),
    })),
  };
}

/* --- list ---------------------------------------------------------------- */

export interface ListEntry {
  readonly name: string;
  readonly path: string;
  readonly description?: string;
}

/** An ordered index of pages. Used by /rivers and /muhurat, which are lists. */
export function itemList(lang: Lang, path: string, entries: readonly ListEntry[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${publicUrl(lang, path)}#list`,
    numberOfItems: entries.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      description: entry.description,
      url: publicUrl(lang, entry.path),
    })),
  };
}

/* --- FAQ ----------------------------------------------------------------- */

export interface FaqItem {
  readonly id: string;
  readonly q: string;
  readonly a: readonly string[];
}

export interface FaqGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly FaqItem[];
}

/**
 * Every question on /faq, flattened out of its groups. The answer text is the
 * whole answer, every paragraph of it, because publishing a shortened answer to
 * a crawler and a longer one to a reader is exactly the divergence rule 1
 * forbids. Answers live inside <details> on the page, which is on-page content.
 *
 * `{price:…}` tokens are filled here rather than shipped raw. See the note in
 * src/content/prices.ts for why this one string has to pick a currency.
 */
export function faqQuestions(
  lang: Lang,
  path: string,
  groups: readonly FaqGroup[],
): readonly JsonLdNode[] {
  const url = publicUrl(lang, path);
  const cur = currencyForLang(lang);
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      "@id": `${url}#${item.id}`,
      name: fillPrices(item.q, cur),
      url: `${url}#${item.id}`,
      inLanguage: localeDef(lang).tag,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: fillPrices(item.a.join(" "), cur),
        url: `${url}#${item.id}`,
        inLanguage: localeDef(lang).tag,
      },
    })),
  );
}

/* --- event --------------------------------------------------------------- */

export interface OccasionEventOptions {
  readonly lang: Lang;
  readonly path: string;
  readonly name: string;
  /** The occasion's name in the other locale. */
  readonly alternateName?: string;
  readonly description: string;
  /**
   * The published provenance label, verbatim. An Event whose date is unchecked
   * has to say so where the date is read, and JSON-LD is read.
   */
  readonly provenance: string;
  /**
   * ISO 8601 at the coarsest precision we can defend. Month precision
   * ("2026-09") is what a month-level occurrence is entitled to. Omit both
   * fields entirely when the occasion has no dated instance at all.
   */
  readonly startDate?: string;
  readonly endDate?: string;
  /** IANA zone the occasion's windows are reckoned in. Always the ghat's. */
  readonly scheduleTimezone: string;
  /** ISO 8601 duration, only where the cadence is exactly that regular. */
  readonly repeatFrequency?: string;
  /** Gregorian months the occasion can fall in, 1 to 12. */
  readonly byMonth?: readonly number[];
}

/**
 * One occasion as an Event, or as an EventSeries where there is no dated
 * instance to point at.
 *
 * Attendance is online and only online: the rite is performed at the ghat by an
 * officiant and watched from wherever the reader is, so the attendance mode is
 * OnlineEventAttendanceMode and the location is the virtual one. The ghats are
 * carried on the page node as `mentions`, which links them without claiming
 * anyone attends in person.
 *
 * Deliberately absent: `offers` (nothing is on sale yet), `performer` (no
 * officiant has consented to be named), `eventStatus` (EventScheduled asserts
 * the event happens on `startDate` as scheduled, which is more than a
 * provisional month-precision date can carry).
 */
export function occasionEvent(o: OccasionEventOptions): JsonLdNode {
  const url = publicUrl(o.lang, o.path);
  const dated = Boolean(o.startDate);

  return {
    "@type": dated ? "Event" : "EventSeries",
    "@id": `${url}#occasion`,
    name: o.name,
    alternateName: o.alternateName,
    url,
    inLanguage: localeDef(o.lang).tag,
    description: o.description,
    disambiguatingDescription: o.provenance,
    startDate: o.startDate,
    endDate: o.endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url,
    },
    organizer: { "@id": ORGANIZATION_ID },
    /* The IST offset rides on the schedule rather than on a fabricated
       timestamp: the windows are reckoned at the ghat, in Asia/Kolkata, and
       that is true of every occasion whether or not its date is settled. */
    eventSchedule: {
      "@type": "Schedule",
      scheduleTimezone: o.scheduleTimezone,
      repeatFrequency: o.repeatFrequency,
      byMonth: o.byMonth,
    },
  };
}

/* --- place --------------------------------------------------------------- */

export interface GhatPlaceOptions {
  readonly lang: Lang;
  readonly path: string;
  readonly name: string;
  readonly alternateName?: string;
  readonly description: string;
  /** The honest caveat that belongs beside the name, where there is one. */
  readonly note?: string;
  readonly locality: string;
  readonly region: string;
}

/**
 * A ghat as a place in the world. Typed as both Place and
 * LandmarksOrHistoricalBuildings, which is what these six are.
 *
 * No `geo`: none of the six has surveyed coordinates, and an approximate
 * lat/lon printed as though it were a survey is the same class of error as an
 * unchecked tithi. No `openingHours`, no `provider`, no permit implied: we hold
 * no written permission at any of them and the node says nothing about us.
 */
export function ghatPlace(o: GhatPlaceOptions): JsonLdNode {
  const url = publicUrl(o.lang, o.path);
  return {
    "@type": ["Place", "LandmarksOrHistoricalBuildings"],
    "@id": `${url}#place`,
    name: o.name,
    alternateName: o.alternateName,
    description: o.description,
    disambiguatingDescription: o.note,
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: o.locality,
      addressRegion: o.region,
      addressCountry: "IN",
    },
    containedInPlace: {
      "@type": "City",
      name: o.locality,
    },
  };
}

/** The river herself, as the thing the ghat page is about. */
export function bodyOfWater(
  lang: Lang,
  path: string,
  name: string,
  alternateNames: readonly string[],
): JsonLdNode {
  return {
    "@type": "BodyOfWater",
    "@id": `${publicUrl(lang, path)}#river`,
    name,
    alternateName: alternateNames.length > 0 ? alternateNames : undefined,
  };
}

/** A compact reference to another page's Place node, for `mentions`. */
export function placeReference(lang: Lang, path: string, name: string): JsonLdNode {
  const url = publicUrl(lang, path);
  return { "@type": "Place", "@id": `${url}#place`, name, url };
}
