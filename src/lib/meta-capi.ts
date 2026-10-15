import "server-only";
import { createHash } from "node:crypto";
import { META_PIXEL_ID } from "@/lib/meta";

/* ---------------------------------------------------------------------------
   Purchase, told to Meta from the server through the Conversions API.

   THE WEBHOOK IS WHERE A SALE IS CERTAIN, so that is where Meta hears about
   it. The buyer's browser reaches the paid page through two redirects
   (Stripe, /begin/done, then /setup or /today), and a browser-side Purchase
   there would need its own bookkeeping to be counted once. The server event
   carries what Meta matches on instead: the `_fbp` and `_fbc` cookies, the IP
   and the user agent, all captured when the checkout began (see
   src/app/[lang]/begin/actions.ts), plus the email and the account id,
   hashed with SHA-256 as Meta requires.

   ONLY WHERE META MAY MEASURE. The checkout records whether the buyer was in
   a country Meta may measure without consent (src/lib/meta.ts); anybody else
   is never sent.

   A FAILED SEND IS NOT A FAILED SALE. Errors are logged and swallowed, with a
   five second ceiling, after the mornings are booked and the receipt is out.

   `event_id` is the Stripe session id, so a redelivered webhook is the same
   event to Meta and is counted once.

   CompleteRegistration is sent from here too, by the first save of /setup
   (src/app/[lang]/(app)/setup/actions.ts), under the same consent rule as the
   checkout and with an event id the browser's pixel repeats, so Meta keeps
   one of the two.
   --------------------------------------------------------------------------- */

/** Graph API version. Meta keeps each one for about two years; v26.0 is from 2026. */
const GRAPH_VERSION = "v26.0";

/** Who the event is about: matched by Meta, the email and the account id hashed. */
type Matching = {
  email: string | null;
  userId: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
};

export type MetaPurchase = Matching & {
  sessionId: string;
  /** In the currency's minor unit, as Stripe reports it. */
  amountMinor: number;
  currency: string;
  sourceUrl: string;
  /** Unix seconds; the moment the session completed. */
  at: number;
};

function hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** What Meta matches an event on, the email and the account id hashed. */
function userData(p: Matching): Record<string, unknown> {
  const user_data: Record<string, unknown> = {
    external_id: [hash(p.userId)],
  };
  if (p.email) user_data.em = [hash(p.email)];
  if (p.fbp) user_data.fbp = p.fbp;
  if (p.fbc) user_data.fbc = p.fbc;
  if (p.ip) user_data.client_ip_address = p.ip;
  if (p.ua) user_data.client_user_agent = p.ua;
  return user_data;
}

/** One event to the Graph API: logged and swallowed on failure, five seconds at most. */
async function post(label: string, event: Record<string, unknown>): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!META_PIXEL_ID || !token) return;

  const body: Record<string, unknown> = { data: [event] };
  /* Set in Events Manager's "Test events" tab to watch an event arrive. */
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) {
      console.error(`meta capi: ${label} refused`, event.event_id, res.status, await res.text());
    }
  } catch (error) {
    console.error(`meta capi: ${label} not sent`, event.event_id, error);
  }
}

export async function sendPurchase(p: MetaPurchase): Promise<void> {
  await post("purchase", {
    event_name: "Purchase",
    event_time: p.at,
    event_id: p.sessionId,
    action_source: "website",
    event_source_url: p.sourceUrl,
    user_data: userData(p),
    custom_data: {
      currency: p.currency.toUpperCase(),
      value: p.amountMinor / 100,
    },
  });
}

export type MetaRegistration = Matching & {
  /** The id the browser repeats the event under, so Meta keeps one of the pair. */
  eventId: string;
  sourceUrl: string;
  /** Unix seconds; the moment setup was first saved. */
  at: number;
};

/**
 * CompleteRegistration, sent once per account, on the first save of /setup.
 * Later saves are the same form used as settings and are never sent.
 */
export async function sendRegistration(p: MetaRegistration): Promise<void> {
  await post("registration", {
    event_name: "CompleteRegistration",
    event_time: p.at,
    event_id: p.eventId,
    action_source: "website",
    event_source_url: p.sourceUrl,
    user_data: userData(p),
  });
}
