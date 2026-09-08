"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

/* ---------------------------------------------------------------------------
   The masthead's one action, which changes for somebody signed in.

   THIS IS A CLIENT COMPONENT FOR A RENDERING REASON, NOT A UI ONE. The header
   sits on every page, and asking `auth()` inside it, as a server component,
   opted the entire site out of static generation: the landing page, the six
   waters, the calendar and the panchang all became per-request functions. That
   is the free, crawlable, daily-return surface, and it should be prerendered
   HTML served from the edge.

   `useAuth` decides in the browser instead, so the page stays static and the
   button is right a moment after paint. "Begin" is what the prerendered HTML
   carries, because that is the correct answer for everybody who is not signed
   in, which is everybody arriving from a search.

   Not `<SignedIn>` and `<SignedOut>`: those exist in this version but throw
   during prerendering ("not available in @clerk/nextjs Core 3"), which fails
   the build on every static page. The hook has no such requirement and reports
   `isLoaded: false` until the browser knows.
   --------------------------------------------------------------------------- */

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
  const { isLoaded, isSignedIn } = useAuth();
  const signedIn = isLoaded && isSignedIn;

  return (
    <Link href={signedIn ? account : begin} className={className}>
      {signedIn ? accountLabel : beginLabel}
    </Link>
  );
}
