"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

/** Signs out on mount and goes to `to`. Renders nothing worth reading. */
export function SignOutNow({ to }: { to: string }) {
  const { signOut } = useClerk();
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void signOut({ redirectUrl: to });
  }, [signOut, to]);
  return <main className="min-h-[50vh]" aria-busy="true" />;
}
