import { Bindu } from "@/components/marks";

/**
 * The three-step line over setup and the pay step: the water, the sheet, the
 * mornings. The steps in hand are marked with the vermillion bindu; the one
 * still ahead is a faint dot. Set in space, with no rules.
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
            <Bindu tone={on ? "sindoor" : "faint"} className="shrink-0 text-[1.1rem]" />
            <span className={`text-sm ${on ? "font-bold text-ink" : "text-ink2"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
