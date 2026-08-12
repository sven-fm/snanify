import type { Currency } from "@/lib/currency";

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
