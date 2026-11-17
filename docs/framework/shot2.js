const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 2210, height: 1200 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  for (const [f, out] of [['fw09.html', 'EVERFREEZE_09.png'], ['fw10.html', 'EVERFREEZE_10.png']]) {
    await p.goto('file://' + process.argv[2] + '/' + f, { waitUntil: 'load' });
    await p.waitForSelector('body[data-ready]', { timeout: 15000 });
    await p.waitForTimeout(300);
    await p.locator('#wrap').screenshot({ path: process.argv[2] + '/' + out });
  }
  console.log('errors:', errs.filter(e => !/fonts\.g/.test(e)).join(' | ') || 'none');
  await b.close();
})();
