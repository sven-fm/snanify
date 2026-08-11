"use client";

/** Runs before paint so the first frame is already the right edition. */
export const themeScript = `(function(){try{var s=localStorage.getItem("snanify-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

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
      className="grid h-8 w-8 place-items-center border border-rulestrong text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        {/* day: hollow square. night: the same square, inked in. */}
        <rect
          x="2.5"
          y="2.5"
          width="11"
          height="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="dark:hidden"
        />
        <rect x="2.5" y="2.5" width="11" height="11" fill="currentColor" className="hidden dark:block" />
      </svg>
    </button>
  );
}
