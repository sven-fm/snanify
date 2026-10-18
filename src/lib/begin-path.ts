import { DEFAULT_TIER, isTier } from "@/lib/packs";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   Where a press of Begin goes, decided from what /begin has read.

   Pure, so the whole path is tested without a session or a database
   (tests/unit/begin-path.test.ts). Begin.tsx reads, calls this, and redirects
   or draws what it says.

    1. Signed out: to the sign-in, and back here after it.
    2. Signed in, sheet not made: to /setup. The sheet comes before the packs.
    3. Mornings in hand and no wish to buy: to /account, whose one press is
       today's sitting. Topping up is asked at zero, or when asked for.
    4. A first purchase: the packs beside the specimen with the buyer's own
       names on it (the locked order).
    5. Everyone else who is here to buy: the three packs alone, one chosen.

   A WISH TO BUY is `buy=1` (the menu's "Buy mornings"), a pack picked on a
   price table, or a payment that came back from Stripe unopened or cancelled:
   each of those is somebody mid-purchase, and sending them to /account would
   lose the press they just made.
   --------------------------------------------------------------------------- */

export type BeginQuery = {
  pack?: string;
  buy?: boolean;
  out?: boolean;
  cancelled?: boolean;
  error?: boolean;
};

export type BeginReader =
  | { signedIn: false }
  | { signedIn: true; setUp: boolean; credits: number; bought: boolean };

export type BeginRoute =
  | { to: "sign-in" }
  | { to: "setup" }
  | { to: "account" }
  /** First purchase: the specimen beside the packs. */
  | { to: "first"; pack: TierKey }
  /** The three packs alone, `pack` chosen. */
  | { to: "packs"; pack: TierKey };

export function beginRoute(reader: BeginReader, query: BeginQuery): BeginRoute {
  if (!reader.signedIn) return { to: "sign-in" };
  if (!reader.setUp) return { to: "setup" };

  const picked = query.pack && isTier(query.pack) ? query.pack : undefined;
  const buying = Boolean(query.buy || picked || query.cancelled || query.error);

  if (reader.credits > 0 && !buying) return { to: "account" };

  const pack = picked ?? DEFAULT_TIER;
  if (query.buy || query.out || reader.bought) return { to: "packs", pack };
  return { to: "first", pack };
}
