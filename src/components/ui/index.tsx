import Link from "next/link";
import { CURRENCIES } from "@/lib/currency";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";
import type { Prices, TierKey } from "@/content/prices";
import { PRICE } from "@/content/prices";
import { Bindu } from "@/components/marks";

/* Shared primitives. Everything here is flat: solid fills, square boxes,
   sindoor for the action. See DESIGNSYSTEM.md. */

/**
 * A section of a page. Space divides one section from the next, never a rule.
 * `ground` changes the rhythm: paper, or the tint for reference data.
 * `tinted` is the older spelling of `ground="tint"`.
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
  ground?: "paper" | "tint";
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

/* The press (globals.css): every primary action is the top of a solid ink
   box and sinks flush under the thumb, which is the only feedback a phone
   gives. One block per screen; a secondary action is a plain underlined
   link, never a second block. */
const quiet =
  "inline-flex min-h-[44px] items-center gap-2 font-bold text-ink underline decoration-ink decoration-2 underline-offset-4 active:text-sindoor disabled:opacity-60";

const buttonVariants = {
  /* Sindoor face, white type, an arrow at the right. */
  solid: "press",
  /* Marigold face, ink type: "Send it to the family", and nothing else. */
  share: "press press-share",
  /* A plain ink-underlined link. */
  quiet,
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "solid", className = "") {
  return `${buttonVariants[variant]} ${className}`.trim();
}

/** The press sized for the masthead's Begin: a 44px target, Martel 700 at the label size. */
export const MASTHEAD_PRESS = "min-h-[44px] px-2 py-0 text-[0.875rem]";

/** The arrow at the right of a primary press. */
function Arrow({ variant, arrow }: { variant: ButtonVariant; arrow?: boolean }) {
  if (!(arrow ?? variant === "solid")) return null;
  return (
    <span aria-hidden="true" className="shrink-0">
      →
    </span>
  );
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
  arrow,
  className = "",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  /** The arrow at the right; on by default for the solid press. */
  arrow?: boolean;
  className?: string;
}) {
  return (
    <span className={buttonClass(variant, className)}>
      <span>{children}</span>
      <Arrow variant={variant} arrow={arrow} />
    </span>
  );
}

/**
 * A real <button type="submit">, wearing the same surface as CTA. Every form on
 * the site submits through one of these: a server action needs a control that
 * can actually submit, and a disabled state while it is in flight.
 */
export function SubmitButton({
  children,
  variant = "solid",
  arrow,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button type="submit" className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      <Arrow variant={variant} arrow={arrow} />
    </button>
  );
}

export function LinkButton({
  href,
  hrefLang,
  children,
  variant = "solid",
  arrow,
  className = "",
}: {
  href: string;
  /** Set when the target is in another language. */
  hrefLang?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} hrefLang={hrefLang} className={buttonClass(variant, className)}>
      <span>{children}</span>
      <Arrow variant={variant} arrow={arrow} />
    </Link>
  );
}

/**
 * A status line led by a bindu. The bindu is vermillion only when something is
 * genuinely live; on a static line it is the faint dot, so it never asserts a
 * thing is running when it is not.
 */
export function StatusBadge({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  return (
    <p className="label inline-flex min-h-[44px] items-center gap-2.5 text-ink">
      <Bindu tone={live ? "sindoor" : "faint"} className="shrink-0 text-[1.1rem]" />
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
 * A line whose claim holds in some currencies only. "Eleven for eleven" is
 * true in dollars, euros, pounds and Canadian dollars; in rupees eleven
 * mornings cost ₹501, so a rupee reader gets `inr`, with its `{price:…}`
 * filled through <Price>. Same mechanism as <TaxNote>: every line is in the
 * markup and CSS shows the reader's own.
 */
export function CurrencyLine({ other, inr }: { other: string; inr: string }) {
  return (
    <>
      {CURRENCIES.map((c) => (
        <span key={c} className={`cur cur-${c}`}>
          {c === "INR" ? <PriceText>{inr}</PriceText> : other}
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
