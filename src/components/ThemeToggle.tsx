"use client";

/** Runs before paint so the first frame is already the right edition. */
export const themeScript = `(function(){document.documentElement.setAttribute("data-js","");try{var s=localStorage.getItem("snanify-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

/**
 * Stateless: the glyph is chosen by the `.dark` class in CSS, so there is
 * nothing to hydrate. Flat forms only, a filled square for the night edition,
 * a hollow one for the day.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("snanify-theme", next);
    } catch {
      /* private mode, the choice just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center border border-rulestrong text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {/* By day a sun, which pressing turns to night; by night a moon. */}
        <g className="dark:hidden">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
        </g>
        <path className="hidden dark:block" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
