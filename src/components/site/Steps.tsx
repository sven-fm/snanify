import { Bindu } from "@/components/marks";

/**
 * The three-step line over sign-in, setup and the pay step: the water, the
 * sheet, the mornings (spec 6.3). The step this page covers carries the
 * sindoor bindu and its name in bold ink; every other step is an open ink
 * ring with its name in ink-2. Set in space, with no rules. On sign-in no
 * step is current yet: all three rings are still ahead.
 */
export function Steps({
  steps,
  here,
  label,
  className = "",
}: {
  steps: readonly string[];
  /** Indexes of the steps this page covers. */
  here: readonly number[];
  label: string;
  className?: string;
}) {
  return (
    <ol className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`} aria-label={label}>
      {steps.map((step, i) => {
        const on = here.includes(i);
        return (
          <li key={step} className="flex items-center gap-2 whitespace-nowrap" aria-current={on ? "step" : undefined}>
            {on ? (
              <Bindu className="shrink-0 text-[1.1rem]" />
            ) : (
              <svg aria-hidden="true" viewBox="0 0 10 10" className="h-[0.55rem] w-[0.55rem] shrink-0">
                <circle cx="5" cy="5" r="4.25" fill="none" stroke="var(--ink-2)" strokeWidth="1.5" />
              </svg>
            )}
            <span className={`text-sm ${on ? "font-bold text-ink" : "text-ink2"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
