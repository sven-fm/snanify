/* ---------------------------------------------------------------------------
   One price, in the reader's own money.

   The site used to print two ladders side by side and explain, at length, why
   there were two. That explanation was the product arguing with itself on its
   own sales page. There is one price now, and which currency it is shown in is
   decided by where the reader is:

     India          rupees
     Canada         Canadian dollars
     the eurozone   euro
     everywhere else US dollars

   HOW IT IS PICKED, AND WHY IT STAYS STATIC. Vercel puts the visitor's country
   on `x-vercel-ip-country`. src/proxy.ts reads it and writes a cookie; a sync
   script in <head> reads that cookie and stamps `data-cur` on <html>; CSS then
   shows the one price and hides the other three. Every price is in the markup,
   so the page is still fully prerendered, there is no request-time render and
   no flash of the wrong number. It is the same trick the theme already uses.

   Prices are NOT locale content. A Tamil reader in Toronto sees Canadian
   dollars, and a Tamil reader in Chennai sees rupees, so currency follows the
   body and language follows the reader. See src/content/prices.ts.
   --------------------------------------------------------------------------- */

export const CURRENCIES = ["USD", "EUR", "CAD", "INR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = "USD";

/** The cookie src/proxy.ts writes and the head script reads. */
export const CURRENCY_COOKIE = "snf-cur";

/** Eurozone members, which is not the same list as the EU. */
const EUROZONE = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

export function currencyForCountry(country: string | undefined | null): Currency {
  if (!country) return DEFAULT_CURRENCY;
  const c = country.toUpperCase();
  if (c === "IN") return "INR";
  if (c === "CA") return "CAD";
  if (EUROZONE.has(c)) return "EUR";
  return DEFAULT_CURRENCY;
}

/**
 * Runs synchronously in <head>, before first paint, so the right price is the
 * only one ever painted. Falls back to the browser's own time zone when there
 * is no cookie yet, which covers local development and any host that does not
 * set a geo header. Wrapped in try/catch: a thrown error here would block the
 * document, and a wrong currency is a smaller problem than a blank page.
 */
export const currencyScript = `
(function(){try{
  var m=document.cookie.match(/(?:^|; )${CURRENCY_COOKIE}=([^;]+)/);
  var c=m&&m[1];
  if(!c){
    var z=(Intl.DateTimeFormat().resolvedOptions().timeZone||"");
    c=/Calcutta|Kolkata/.test(z)?"INR":/Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns/.test(z)?"CAD":/Berlin|Paris|Madrid|Rome|Amsterdam|Brussels|Vienna|Lisbon|Dublin|Helsinki|Athens|Bratislava|Ljubljana|Riga|Vilnius|Tallinn|Luxembourg|Malta|Zagreb|Nicosia/.test(z)?"EUR":"${DEFAULT_CURRENCY}";
  }
  if(["USD","EUR","CAD","INR"].indexOf(c)<0)c="${DEFAULT_CURRENCY}";
  document.documentElement.setAttribute("data-cur",c);
}catch(e){document.documentElement.setAttribute("data-cur","${DEFAULT_CURRENCY}");}})();
`;
