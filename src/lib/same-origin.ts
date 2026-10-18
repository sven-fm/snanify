/** The page's own origin, by the Origin header or, where a browser leaves it
    off, by Sec-Fetch-Site. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (origin && origin !== "null") {
    try {
      return new URL(origin).host === new URL(req.url).host;
    } catch {
      return false;
    }
  }
  return req.headers.get("sec-fetch-site") === "same-origin";
}
