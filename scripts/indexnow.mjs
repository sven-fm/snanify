/* ---------------------------------------------------------------------------
   Tell the IndexNow engines (Bing, Yandex, Naver, Seznam, Yep) which URLs to
   recrawl.

     node scripts/indexnow.mjs                 every URL in the live sitemap
     node scripts/indexnow.mjs /live /hi/live  only these paths

   One key, verified by the file at public/<key>.txt, which src/proxy.ts
   serves as a static file. The endpoint at api.indexnow.org fans the list out
   to every participating engine, so one POST is the whole job. A batch may
   hold 10,000 URLs; the site is far inside that, so the whole sitemap goes in
   one request.

   Run it after a deploy that adds or changes public pages. Submitting an
   unchanged URL is harmless and does nothing, so there is no need to be
   precise about which ones moved.

   The reply is a status with an empty body: 200 or 202 means accepted, 403 is
   a key mismatch, 422 is a URL outside the host, 429 is too many requests.
   --------------------------------------------------------------------------- */

const ORIGIN = "https://www.snanify.com";
const HOST = new URL(ORIGIN).host;
const KEY = "8b6cc2fb2f124d6a8955bba929f94f10";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const BATCH = 10_000;

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : "";
  if (body !== KEY) {
    throw new Error(`${KEY_LOCATION} answered ${res.status} with "${body.slice(0, 40)}", expected the key`);
  }
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => new URL(p, ORIGIN).href) : await urlsFromSitemap();
const outside = urlList.filter((u) => new URL(u).host !== HOST);
if (outside.length) throw new Error(`URLs outside ${HOST}: ${outside.join(", ")}`);

await verifyKeyFile();
console.log(`key verified at ${KEY_LOCATION}`);

for (let i = 0; i < urlList.length; i += BATCH) {
  const slice = urlList.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: slice }),
  });
  const text = (await res.text()).trim();
  console.log(`submitted ${slice.length} URLs: ${res.status}${text ? ` ${text}` : ""}`);
  if (res.status >= 400) process.exitCode = 1;
}
