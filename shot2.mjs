import { chromium } from 'playwright';
const OUT = process.argv[2];
const b = await chromium.launch();
for (const s of [{n:'p-kumbh',u:'/kumbh',t:'light'},{n:'p-panchang',u:'/panchang',t:'dark'},{n:'p-pricing',u:'/#sankalp',t:'light'}]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:1000}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.addInitScript(t => localStorage.setItem('snanify-theme', t), s.t);
  await p.goto('http://localhost:3000'+s.u, {waitUntil:'domcontentloaded'});
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `${OUT}/${s.n}.png` });
  console.log('shot', s.n);
  await ctx.close();
}
await b.close();
