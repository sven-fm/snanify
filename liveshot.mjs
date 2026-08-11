import { chromium } from 'playwright';
const b = await chromium.launch();
for (const s of [{n:'live-home',u:'/',t:'light',w:1440,h:900},{n:'live-rivers',u:'/rivers',t:'dark',w:1440,h:900},{n:'live-muhurat',u:'/muhurat',t:'light',w:1440,h:900}]) {
  const ctx = await b.newContext({ viewport:{width:s.w,height:s.h}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.addInitScript(t => localStorage.setItem('snanify-theme', t), s.t);
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('https://www.snanify.com'+s.u, {waitUntil:'load'});
  await p.waitForTimeout(2500);
  await p.screenshot({ path: process.argv[2]+'/'+s.n+'.png' });
  console.log(s.n, 'errors:', errs.length);
  await ctx.close();
}
await b.close();
