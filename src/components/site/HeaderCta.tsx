"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
   The account, in the masthead, for somebody signed in.

   Everybody sees "Begin". Somebody signed in also gets the silhouette, and
   under it the four places their account lives: the register of mornings,
   the snan they set up, the pack picker, and the way out. It is a <details>,
   so it needs no script to open, and it decides whether to exist at all from
   Clerk's `__client_uat` cookie rather than from Clerk's hooks, which keeps
   Clerk's bundle off the marketing pages. See the note in the earlier
   version of this file, kept here in short: the cookie is written by Clerk's
   browser script, is "0" once signed out, and outlives the session cookie.

   The prerendered HTML carries the signed-out state, and the browser corrects
   it after paint through useSyncExternalStore, so hydration sees no
   mismatch.
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

function subscribe(onChange: () => void): () => void {
  window.addEventListener("focus", onChange);
  return () => window.removeEventListener("focus", onChange);
}

function useSignedIn(): boolean {
  return useSyncExternalStore(subscribe, readSignedIn, () => false);
}

export type ProfileRow = { href: string; label: string };

/**
 * The silhouette and its menu, from the tablet width up. On a phone the
 * masthead has no room for one more control without folding the wordmark,
 * so the same rows live in the phone menu instead: see ProfileRows.
 */
export function ProfileMenu({ label, rows }: { label: string; rows: ProfileRow[] }) {
  const signedIn = useSignedIn();
  if (!signedIn) return null;

  return (
    <details className="group relative hidden sm:block" data-profile-menu>
      <summary
        className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center border border-rulestrong text-ink transition-colors hover:bg-ink hover:text-paper group-open:bg-ink group-open:text-paper [&::-webkit-details-marker]:hidden"
        aria-label={label}
        title={label}
      >
        {/* The silhouette everybody reads as "me": a head over shoulders. */}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </summary>
      <ul className="absolute right-0 top-full z-50 mt-2 w-60 border-2 border-rulestrong bg-paper">
        {rows.map((r) => (
          <li key={r.href} className="border-b border-rule last:border-b-0">
            <Link href={r.href} className="display flex min-h-[48px] items-center px-4 text-[1.05rem] text-ink transition-colors hover:bg-paper2">
              {r.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * The phone bar's one action: "Begin", or "Your mornings" once signed in,
 * beside the menu button. Hidden from the tablet width up, where the wide
 * masthead has Begin and the silhouette.
 */
export function MobileCta({
  begin,
  account,
  beginLabel,
  accountLabel,
}: {
  begin: string;
  account: string;
  beginLabel: string;
  accountLabel: string;
}) {
  const signedIn = useSignedIn();
  return (
    <Link
      href={signedIn ? account : begin}
      className="label flex min-h-[44px] items-center whitespace-nowrap bg-spot px-3 text-paper transition-colors hover:bg-ink sm:hidden"
      data-mobile-cta
    >
      {signedIn ? accountLabel : beginLabel}
    </Link>
  );
}

/** The same four rows, as a ruled group at the foot of the phone menu. */
export function ProfileRows({ rows }: { rows: ProfileRow[] }) {
  const signedIn = useSignedIn();
  if (!signedIn) return null;
  return (
    <>
      {rows.map((r, i) => (
        <li key={r.href} className={`border-b border-rule ${i === 0 ? "border-t-2 border-t-rulestrong" : ""}`} data-profile-row>
          <Link href={r.href} className="display flex min-h-[56px] items-center text-[1.25rem] text-ink">
            {r.label}
          </Link>
        </li>
      ))}
    </>
  );
}
