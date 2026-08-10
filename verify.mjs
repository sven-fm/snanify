import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
const hits=[];
p.on('response', async r => { const u=r.url(); if (/script\.js|\/view|vitals|insights/.test(u) && !u.includes('/_next/static')) hits.push(`${r.status()} ${u}`); });
for (const path of ['/','/hi']) {
  await p.goto('https://snanify.vercel.app'+path,{waitUntil:'load'});
  await p.waitForTimeout(4000);
}
console.log(hits.join('\n'));
await b.close();
