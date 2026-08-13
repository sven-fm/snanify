import { DEFAULT_CURRENCY, type Currency } from "@/lib/currency";

/* ---------------------------------------------------------------------------
   The tariff, in four currencies.

   Prices live here and not in the locale files, because a price is not a
   translation. A Tamil reader in Toronto pays Canadian dollars and a Tamil
   reader in Chennai pays rupees; the language follows the reader and the
   currency follows the body. Keeping them here also means a price change is one
   edit rather than twelve.

   THE SHAPE OF THE OFFER. Eleven mornings cost eleven, one for each morning, in
   whatever currency the reader is in. That is the whole hook and it is why
   `eleven` is the tier most people take. The other two lines exist to make it
   obvious: one morning costs more than one of eleven, and sixty costs less.

   Change a price and change `each` in the same commit. `each` is arithmetic on
   `price`, and nothing recomputes it.
   --------------------------------------------------------------------------- */

export type Prices = Record<Currency, string>;

export type TierKey = "one" | "eleven" | "sixty";

/** What the tier costs, once. */
export const PRICE: Record<TierKey, Prices> = {
  one: { USD: "$2", EUR: "€2", CAD: "C$3", INR: "₹101" },
  eleven: { USD: "$11", EUR: "€11", CAD: "C$11", INR: "₹501" },
  sixty: { USD: "$48", EUR: "€45", CAD: "C$48", INR: "₹2,100" },
};

/** What one morning works out at. Arithmetic on PRICE; keep them in step. */
export const PER_SNAN: Record<TierKey, Prices> = {
  one: { USD: "$2", EUR: "€2", CAD: "C$3", INR: "₹101" },
  eleven: { USD: "$1", EUR: "€1", CAD: "C$1", INR: "₹46" },
  sixty: { USD: "$0.80", EUR: "€0.75", CAD: "C$0.80", INR: "₹35" },
};

/* ---------------------------------------------------------------------------
   Prices inside a sentence.

   Copy writes `{price:eleven}` rather than a figure, and <PriceText> fills it
   with every currency at render, the same way the tariff does. Structured data
   cannot do that: JSON-LD is one static string per page, with no reader and no
   `data-cur` to key off, so it has to commit to a currency. It commits to the
   edition's own: rupees on the Hindi pages, US dollars elsewhere.

   That is the one place a crawler and a reader can see different figures, and
   it is a figure rather than a claim. Nothing else about the answer changes.
   --------------------------------------------------------------------------- */

/** The currency to write into static JSON-LD for a given edition. */
export function currencyForLang(lang: string): Currency {
  return lang === "hi" ? "INR" : DEFAULT_CURRENCY;
}

/** Replace every `{price:tier}` token in a string with one currency's figure. */
export function fillPrices(text: string, currency: Currency): string {
  return text.replace(
    /\{price:(one|eleven|sixty)\}/g,
    (_, tier: string) => PRICE[tier as TierKey][currency],
  );
}
