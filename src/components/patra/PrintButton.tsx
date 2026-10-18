"use client";

import { useEffect } from "react";
import { buttonClass } from "@/components/ui";
import { PRINT_WIDTH_VAR, printWidthMm } from "@/lib/patra-print";

/**
 * The owner's sheet goes to paper: a quiet link, never a second press.
 *
 * Just before any print, from this link or from the browser's own menu, the
 * sheet and the sankalp under it are measured and the printed column is
 * sized so both end on one page (src/lib/patra-print.ts).
 */
export function PrintButton({ label }: { label: string }) {
  useEffect(() => {
    const fit = () => {
      const block = document.querySelector<HTMLElement>("[data-patra-print]");
      if (!block || block.offsetWidth === 0) return;
      block.style.setProperty(PRINT_WIDTH_VAR, `${printWidthMm(block.offsetHeight / block.offsetWidth)}mm`);
    };
    window.addEventListener("beforeprint", fit);
    return () => window.removeEventListener("beforeprint", fit);
  }, []);

  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("quiet")}>
      {label}
    </button>
  );
}
