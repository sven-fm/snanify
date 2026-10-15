import Link from "next/link";
import { CURRENCIES } from "@/lib/currency";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";
import type { Prices, TierKey } from "@/content/prices";
import { PRICE } from "@/content/prices";

/* Shared primitives. Everything here is flat: solid fills, square boxes,
   vermillion for the action. See DESIGNSYSTEM.md. */

/**
 * A section of a page. Space divides one section from the next, never a rule.
 * `ground` changes the rhythm: paper, the cool tint for reference data, the
 * warm haldi block for anything personal. `tinted` is the older spelling of
 * `ground="tint"`.
 */
export function Section({
  id,
  tinted = false,
  ground,
  children,
  className = "",
}: {
  id?: string;
  tinted?: boolean;
  ground?: "paper" | "tint" | "warm";
  children: React.ReactNode;
  className?: string;
}) {
  const fill = ground ?? (tinted ? "tint" : "paper");
  return (
    <section
      id={id}
      className={`scroll-mt-16 ${fill === "paper" ? "" : fill} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

const buttonBase =
  "label impress inline-flex items-center justify-center gap-2 px-6 py-3.5 select-none";

/* Every variant has a pressed state as well as a hover, because a phone has
   no hover: the press is the only feedback a thumb ever gets. `impress` in
   globals.css moves the plate; these set its ink. */
const buttonVariants = {
  /* The press impression: solid spot colour, inverted type. */
  solid: "bg-spot text-paper hover:bg-ink hover:text-paper active:bg-ink active:text-paper disabled:opacity-60",
  /* A ruled box that fills with ink on hover and on press. Opaque, not
     transparent: the hero sits this button on top of the river, and ripples
     reading through the type made the label almost unreadable. */
  ghost:
    "border border-rulestrong bg-paper text-ink hover:bg-ink hover:text-paper active:bg-ink active:text-paper disabled:opacity-60",
  quiet:
    "text-ink underline decoration-spot decoration-2 hover:text-spot active:text-spot px-0 py-1",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "solid", className = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${className}`;
}

/**
 * Visual-only button surface, for wrapping in an <a> or <Link>.
 *
 * A <span>, deliberately: it is a skin, not a control. Putting one inside a
 * <form> and expecting it to submit is the bug it invites, and it did exactly
 * that on the pack picker once, where three buy buttons rendered perfectly and
 * did nothing at all. Inside a form, reach for <SubmitButton>.
 */
export function CTA({
  children,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return <span className={buttonClass(variant, className)}>{children}</span>;
}

/**
 * A real <button type="submit">, wearing the same surface as CTA. Every form on
 * the site submits through one of these: a server action needs a control that
 * can actually submit, and a disabled state while it is in flight.
 */
export function SubmitButton({
  children,
  variant = "solid",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button type="submit" className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  hrefLang,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  /** Set when the target is in another language. */
  hrefLang?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} hrefLang={hrefLang} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/**
 * A boxed label. The square only fills with the spot colour when something is
 * genuinely live, it must never decorate a static line.
 */
export function StatusBadge({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  return (
    <p className="label inline-flex items-center gap-2.5 border border-rulestrong px-3 py-2 text-ink">
      <span className={`h-2 w-2 ${live ? "bg-spot" : "border border-ink2"}`} />
      {children}
    </p>
  );
}

/**
 * One price, in the reader's own currency.
 *
 * Every currency is written into the markup and CSS shows exactly one, keyed
 * off `data-cur` on <html>. That is what lets a page carrying prices stay fully
 * prerendered: no request-time render, no client fetch, and no flash of the
 * wrong number. See src/lib/currency.ts.
 */
export function Price({ prices, className = "" }: { prices: Prices; className?: string }) {
  return (
    <>
      {CURRENCIES.map((c) => (
        <span key={c} className={`cur cur-${c} ${className}`}>
          {prices[c]}
        </span>
      ))}
    </>
  );
}

/**
 * The tax line beside a price: "Tax included." everywhere but the United
 * States, where a price is read before sales tax. Same mechanism as <Price>:
 * every line is in the markup, CSS shows the reader's own.
 */
export function TaxNote({ lang }: { lang: Lang }) {
  const t = content[lang].pricing.tax;
  return (
    <>
      {CURRENCIES.map((c) => (
        <span key={c} className={`cur cur-${c}`}>
          {c === "USD" ? t.exclusive : t.inclusive}
        </span>
      ))}
    </>
  );
}

/**
 * A sentence with a price in it, filled from prices.ts at render.
 *
 * Copy writes `{price:eleven}` and gets the reader's own currency, the same
 * way `{price}` works on the landing hero. A locale file that spells a figure
 * out ships one currency to every audience, which is the bug this exists to
 * prevent: a rupee price read in Toronto is simply the wrong number.
 */
export function PriceText({ children }: { children: string }) {
  const parts = children.split(/(\{price:(?:one|eleven|sixty)\})/);
  return (
    <>
      {parts.map((part, i) => {
        const tier = /^\{price:(one|eleven|sixty)\}$/.exec(part);
        return tier ? (
          <span key={i} className="tabular-nums">
            <Price prices={PRICE[tier[1] as TierKey]} />
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
