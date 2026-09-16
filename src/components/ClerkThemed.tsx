"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useSyncExternalStore, type ReactNode } from "react";
import { clerkAppearance, clerkAppearanceDark } from "@/lib/clerk-look";

/* ---------------------------------------------------------------------------
   Clerk in the edition the page is in.

   The theme is a class on <html>, stamped by a sync script before paint and
   toggled by the switch in the masthead. Clerk's widgets take their colours
   from an appearance object rather than from CSS variables, so the provider
   watches that class and hands Clerk the day or the night palette. Before
   that the sign-in card was paper in a dark room.
   --------------------------------------------------------------------------- */

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function isDark(): boolean {
  return document.documentElement.classList.contains("dark");
}

export function ClerkThemed({
  localization,
  children,
}: {
  localization: Parameters<typeof ClerkProvider>[0]["localization"];
  children: ReactNode;
}) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  return (
    <ClerkProvider appearance={dark ? clerkAppearanceDark : clerkAppearance} localization={localization}>
      {children}
    </ClerkProvider>
  );
}
