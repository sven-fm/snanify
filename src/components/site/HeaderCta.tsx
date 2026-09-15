"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
   The masthead's account link, on every page, without Clerk in the bundle.

   Somebody signed in has already bought; sending them to the pack picker again
   is the site forgetting who they are. The masthead sits on every page, and
   the earlier version answered this with Clerk's `useAuth`, which meant the
   link could only exist on the (app) pages: importing Clerk's hooks into the
   header would have shipped 115 KB to every marketing page for a button they
   never showed. So on a phone, where the wide button is hidden anyway, a
   signed-in reader had no way to their own register at all.

   Clerk keeps a `__client_uat` cookie on the site's domain: the time of the
   last sign-in, "0" once signed out. It is written by Clerk's browser script,
   so it is readable here, and it outlives the sixty-second session cookie.
   Reading it costs nothing and tells this component the one thing it needs.

   The prerendered HTML carries the signed-out state, which is right for
   everybody arriving from a search, and the browser corrects it a moment
   after paint. `useSyncExternalStore` with a server snapshot of "signed out"
   is how React does that without a mismatch: hydration uses the server
   answer, then re-renders once with the cookie's.
   --------------------------------------------------------------------------- */

function readSignedIn(): boolean {
  try {
    return document.cookie.split(";").some((pair) => {
      const [name, value] = pair.trim().split("=");
      return name.startsWith("__client_uat") && value !== undefined && value !== "0" && value !== "";
    });
  } catch {
    return false;
  }
}

/* The cookie changes only on a sign-in or sign-out, both of which navigate,
   so a re-read on focus is enough to catch a tab that was left open. */
function subscribe(onChange: () => void): () => void {
  window.addEventListener("focus", onChange);
  return () => window.removeEventListener("focus", onChange);
}

function useSignedIn(): boolean {
  return useSyncExternalStore(subscribe, readSignedIn, () => false);
}

/** The wide masthead's one action: "Begin", or "Your mornings" once signed in. */
export function HeaderCta({
  begin,
  account,
  beginLabel,
  accountLabel,
  className,
}: {
  begin: string;
  account: string;
  beginLabel: string;
  accountLabel: string;
  className: string;
}) {
  const signedIn = useSignedIn();
  return (
    <Link href={signedIn ? account : begin} className={className}>
      {signedIn ? accountLabel : beginLabel}
    </Link>
  );
}

/**
 * One more ruled row in the phone menu, present only for somebody signed in.
 * The menu's action underneath stays "Begin", because buying another pack is
 * still the thing to do from anywhere; this row is the way home.
 */
export function AccountMenuRow({ href, label }: { href: string; label: string }) {
  const signedIn = useSignedIn();
  if (!signedIn) return null;
  return (
    <li className="border-b border-rule">
      <Link href={href} className="display flex min-h-[56px] items-center text-[1.25rem] text-ink" data-account-row>
        {label}
      </Link>
    </li>
  );
}
