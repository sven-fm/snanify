/* The launch video's sound, synthesised so every second of it is ours: a
   tanpura drone on D (Pa, Sa, Sa, low Sa, plucked as a player would) and a
   small bell at the given moments, through a plain Schroeder room.
     writeTanpura(path, seconds, [bellAt, ...]) -> a 48 kHz stereo WAV */
import { writeFileSync } from "node:fs";

const SR = 48000;

/* Karplus-Strong with a bright loop filter, so the upper partials ring on
   the way a tanpura's jawari keeps them. */
function pluck(out, at, f, amp, seed, bright = 0.22, ring = 5) {
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  /* Each pluck rings about `ring` seconds to -60 dB; the loop length moves a
     sample either way so repeated strings never lock in phase. */
  const n = Math.round(SR / f) + (seed % 3) - 1, buf = new Float64Array(n);
  const decay = Math.pow(0.001, 1 / ((SR / n) * ring));
  let prev = 0;
  for (let i = 0; i < n; i++) { const x = rnd(); buf[i] = (x + prev) * 0.5 * amp; prev = x; }
  let i = 0;
  for (let k = Math.round(at * SR); k < out.length; k++) {
    const j = i % n, nx = (i + 1) % n;
    out[k] += buf[j];
    buf[j] = decay * ((1 - bright) * buf[j] + bright * buf[nx]);
    i++;
  }
}

/* A small brass bell: inharmonic partials, each with its own fall. */
function bell(out, at, f0, amp) {
  const parts = [[1, 1, 3.2], [2.32, 0.55, 2.1], [4.25, 0.3, 1.3], [6.63, 0.18, 0.8], [9.38, 0.1, 0.5]];
  const a = Math.round(at * SR);
  for (let k = a; k < out.length; k++) {
    const t = (k - a) / SR, att = Math.min(1, t / 0.002);
    let v = 0;
    for (const [r, g, d] of parts) v += g * Math.exp(-t / d) * Math.sin(2 * Math.PI * f0 * r * t + r);
    out[k] += amp * att * v;
  }
}

function reverb(x, spread) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356].map((d) => Math.round((d + spread) * SR / 44100));
  const y = new Float64Array(x.length);
  for (const d of combs) {
    const b = new Float64Array(d); let idx = 0, lp = 0;
    for (let k = 0; k < x.length; k++) {
      const o = b[idx]; lp = o * 0.6 + lp * 0.4;
      b[idx] = x[k] + lp * 0.83; idx = (idx + 1) % d; y[k] += o / combs.length;
    }
  }
  for (const d of [225, 556, 441].map((d) => Math.round((d + spread) * SR / 44100))) {
    const b = new Float64Array(d); let idx = 0;
    for (let k = 0; k < y.length; k++) { const o = b[idx], v = y[k]; b[idx] = v + o * 0.5; y[k] = o - v * 0.5; idx = (idx + 1) % d; }
  }
  return y;
}

export function writeTanpura(path, seconds, bells = []) {
  const len = Math.round(seconds * SR), dry = new Float64Array(len);
  const SA = 146.83, PA = 110.0, LOW = 73.42, CYCLE = 2.6;
  let seed = 7;
  for (let c = -1; c * CYCLE < seconds; c++) {
    const t = c * CYCLE;
    [[0, PA, 0.8], [0.65, SA, 0.7], [1.3, SA, 0.7], [1.95, LOW, 1]].forEach(([o, f, g]) => {
      if (t + o >= 0) pluck(dry, t + o, f, g, seed++);
    });
  }
  for (const b of bells) bell(dry, b, 587.33 * 2, 0.22);

  const L = reverb(dry, 0), R = reverb(dry, 23);
  const mixL = new Float64Array(len), mixR = new Float64Array(len);
  for (let k = 0; k < len; k++) {
    const t = k / SR, env = Math.min(1, t / 0.6) * Math.min(1, (seconds - t) / 1.6);
    mixL[k] = (dry[k] * 0.8 + L[k] * 0.9) * env;
    mixR[k] = (dry[k] * 0.8 + R[k] * 0.9) * env;
  }
  let peak = 0;
  for (let k = 0; k < len; k++) peak = Math.max(peak, Math.abs(mixL[k]), Math.abs(mixR[k]));
  const g = Math.pow(10, -6 / 20) / peak;

  const data = Buffer.alloc(len * 4);
  for (let k = 0; k < len; k++) {
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, mixL[k] * g)) * 32767), k * 4);
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, mixR[k] * g)) * 32767), k * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([h, data]));
}
