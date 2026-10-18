"use client";

import { buttonClass } from "@/components/ui";

/** The owner's copy goes to paper: a quiet link, never a second press. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("quiet")}>
      {label}
    </button>
  );
}
