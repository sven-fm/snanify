import { AstroTime, Body, Observer, SearchRiseSet } from "astronomy-engine";
import { readTithi, readNakshatra } from "../src/lib/sky";
import { getGhat } from "../src/content/rivers";

const g = getGhat("ganga-haridwar")!;
const anyG = g as unknown as { ghat?: [number, number]; coordinates?: { lat: number; lon: number }; lat?: number; lon?: number };
const lat = anyG.coordinates?.lat ?? anyG.lat ?? 29.9457;
const lon = anyG.coordinates?.lon ?? anyG.lon ?? 78.1642;
const obs = new Observer(lat, lon, 300);
const DATES = process.argv.slice(2);
for (const day of DATES) {
  const start = new AstroTime(new Date(`${day}T00:00:00+05:30`));
  const rise = SearchRiseSet(Body.Sun, obs, +1, start, 1)!;
  const set = SearchRiseSet(Body.Sun, obs, -1, start, 1)!;
  const ist = (d: Date) => new Date(d.getTime() + 5.5 * 3600_000).toISOString().slice(11, 16);
  const t = readTithi(rise.date);
  const n = readNakshatra(rise.date);
  const endsIst = t.endsAt ? ist(new Date(t.endsAt)) : "?";
  const endsDay = t.endsAt ? new Date(new Date(t.endsAt).getTime() + 5.5 * 3600_000).toISOString().slice(0, 10) : "?";
  console.log(`${day} sunrise ${ist(rise.date)} sunset ${ist(set.date)} | tithi ${t.paksha} ${t.numberInPaksha} (${t.name.en}) ends ${endsDay} ${endsIst} | nakshatra ${(n as any).name?.en ?? JSON.stringify(n).slice(0,60)} pada ${n.pada}`);
}
