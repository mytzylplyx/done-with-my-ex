// Render the v1 wedge mock screens to PNGs using the preinstalled Chromium.
// Usage: npm i playwright-core && node render.js
const { chromium } = require('playwright-core');
const path = require('path'), dir = __dirname;
const SCREENS = ['s-landing','s-countdown','s-dash']; // ids in wedge-roll2.html
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args:['--no-sandbox','--disable-dev-shm-usage','--force-color-profile=srgb'] });
  const p = await b.newPage({ deviceScaleFactor: 2 });
  await p.route('**', r => { const u=r.request().url(); (u.startsWith('file:')||u.startsWith('data:')) ? r.continue() : r.abort(); });
  await p.goto('file://'+path.join(dir,'wedge-roll2.html'), { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(700);
  for (const id of SCREENS) await (await p.$('#'+id)).screenshot({ path: path.join(dir, id+'.png') });
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
