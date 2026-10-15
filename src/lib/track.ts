"use client";


/* ---------------------------------------------------------------------------
   The eight moments worth counting.

   They are the funnel and nothing else: how many people reach the pack picker,
   how many start a checkout, how many pay, how many finish setting up, how
   many begin a morning, how many finish one, how many open the share sheet,
   and how many complete a share. Everything you would want to know about
   whether this product works is a ratio between two of these.

   NO PERSONAL DATA IN A PROPERTY, EVER. Not a name, not an email, not a
   sitting id, not a sankalp. The properties here are a pack name and a water
   slug, both of which are the same handful of values for everybody. A
   product analytics event carrying somebody's identifier is a person followed
   around the funnel, which this file exists to avoid.

   Vercel Web Analytics is cookieless and does not follow anybody between
   sites, and it counts every reader. Three of these moments are also told to
   the Meta Pixel, for readers Meta may measure (src/lib/meta.ts), so the ads
   can be judged on what people do after the click; the privacy page says
   so. Purchase is sent from the Stripe webhook instead, through
   the Conversions API, because the webhook is where a sale is certain.
   CompleteRegistration goes both ways, once per account: the server sends it
   on the first save of /setup and the browser repeats it under the same
   event id, so Meta keeps one of the pair.

   THE LIBRARY IS LOADED WHEN AN EVENT IS SENT, NOT WHEN THIS MODULE IS
   IMPORTED. Importing `@vercel/analytics` at the top of a client component
   made that component fail to hydrate: the sitting, of all pages, was being
   torn down and rebuilt in the browser roughly one load in three. A dynamic
   import inside the function means nothing is evaluated during the server
   render and nothing is in the bundle until somebody does something worth
   counting.
   --------------------------------------------------------------------------- */

export type Event =
  | "begin_view"
  | "sign_in_view"
  | "checkout_start"
  | "purchase"
  | "setup_done"
  | "sitting_start"
  | "sitting_next"
  | "sitting_done"
  | "share_open"
  | "share_done";

/** Values small enough and few enough that none of them identifies anybody. */
export type Props = {
  /** "one" | "eleven" | "sixty". */
  pack?: string;
  /** A water slug, one of six. */
  water?: string;
  /** "en" | "hi". */
  lang?: string;
  /** How the share went: "files", "link", "copied". */
  how?: string;
  /** The part "next" was pressed on: "reading" | "breath". */
  from?: string;
};

/** What travels to Meta alongside an event and never to Vercel. */
export type MetaOptions = {
  /**
   * The id the server sent the same event under through the Conversions API,
   * so Meta counts the pair once. CompleteRegistration carries one; see
   * src/app/[lang]/(app)/setup/actions.ts.
   */
  eventId?: string;
};

export function track(event: Event, props: Props = {}, options: MetaOptions = {}): void {
  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => typeof v === "string" && v.length > 0),
  );

  /* Fire and forget, and never awaited: measurement is not worth a millisecond
     in front of somebody who is mid practice, and a blocked analytics script
     is a normal state rather than a fault. */
  void import("@vercel/analytics")
    .then(({ track: send }) => send(event, clean as Record<string, string>))
    .catch(() => {});

  /* Meta's own names for the same moments. `window.fbq` exists only where the
     pixel was allowed to load, so everywhere else this is a no-op. */
  const meta = META_EVENTS[event];
  if (meta && typeof window !== "undefined" && window.fbq) {
    const data = clean.pack ? { content_name: clean.pack } : {};
    if (options.eventId) window.fbq("track", meta, data, { eventID: options.eventId });
    else window.fbq("track", meta, data);
  }
}

/** The funnel moments Meta is told about, by Meta's standard event names. */
const META_EVENTS: Partial<Record<Event, string>> = {
  begin_view: "ViewContent",
  setup_done: "CompleteRegistration",
  checkout_start: "InitiateCheckout",
};
