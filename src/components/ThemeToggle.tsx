"use client";

/** Runs before paint so the first frame is already the right theme. */
export const themeScript = `(function(){try{var s=localStorage.getItem("snanify-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

/**
 * Stateless on purpose: the icon is chosen by the `.dark` class in CSS, so
 * there is nothing to hydrate and nothing to keep in sync with the DOM.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("snanify-theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line/70 text-ink transition-colors hover:border-gold hover:text-gold"
    >
      {/* sun — shown in light */}
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] dark:hidden" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.6" fill="currentColor" />
        {/* Rounded so server and client serialize these identically. */}
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI * 2) / 8;
            const p = (r: number) => (12 + Math.cos(a) * r).toFixed(3);
            const q = (r: number) => (12 + Math.sin(a) * r).toFixed(3);
            return <line key={i} x1={p(7.4)} y1={q(7.4)} x2={p(9.6)} y2={q(9.6)} />;
          })}
        </g>
      </svg>

      {/* moon — the same disc, eclipsed */}
      <svg viewBox="0 0 24 24" className="hidden h-[18px] w-[18px] dark:block" fill="none" aria-hidden="true">
        <path
          d="M20.2 14.6A8.6 8.6 0 1 1 9.4 3.8a6.9 6.9 0 0 0 10.8 10.8Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
