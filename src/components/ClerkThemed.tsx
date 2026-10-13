"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { clerkAppearance } from "@/lib/clerk-look";

/* ---------------------------------------------------------------------------
   Clerk in the edition the page is in.

   The theme is a class on <html>, stamped by a sync script before paint and
   toggled by the switch in the masthead. The appearance reads the site's CSS
   variables, and that class redefines them, so the card turns with the page
   on its own. One appearance serves the day and the night edition.
   --------------------------------------------------------------------------- */

export function ClerkThemed({
  localization,
  children,
}: {
  localization: Parameters<typeof ClerkProvider>[0]["localization"];
  children: ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance} localization={localization}>
      {children}
    </ClerkProvider>
  );
}
