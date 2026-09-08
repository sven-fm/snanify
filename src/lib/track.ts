"use client";

import { track as vercelTrack } from "@vercel/analytics";

/* ---------------------------------------------------------------------------
   The eight moments worth counting.

   They are the funnel and nothing else: how many people reach the pack picker,
   how many start a checkout, how many pay, how many finish setting up, how
   many begin a morning, how many finish one, how many open the share sheet,
   and how many complete a share. Everything you would want to know about
   whether this product works is a ratio between two of these.

   NO PERSONAL DATA IN A PROPERTY, EVER. Not a name, not an email, not a
   sitting id, not a sankalp. The properties here are a pack name and a water
   slug, both of which are the same handful of values for everybody. /ethics
   promises no advertising script and no session replay, and a product analytics
   event carrying somebody's identifier would be the same promise broken
   quietly.

   Vercel Web Analytics is cookieless and does not follow anybody between
   sites, which is why it is the only measurement on the site.
   --------------------------------------------------------------------------- */

export type Event =
  | "begin_view"
  | "checkout_start"
  | "purchase"
  | "setup_done"
  | "sitting_start"
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
};

export function track(event: Event, props: Props = {}): void {
  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => typeof v === "string" && v.length > 0),
  );

  try {
    vercelTrack(event, clean as Record<string, string>);
  } catch {
    /* Measurement is never worth an error in front of somebody who is mid
       practice. A blocked analytics script is a normal state, not a fault. */
  }
}
