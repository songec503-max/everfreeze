const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 2330, height: 1200 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  for (const v of process.argv.slice(3)) {
    await p.goto('file://' + process.argv[2] + '/framework.html?v=' + v, { waitUntil: 'load' });
    await p.waitForSelector('body[data-ready]', { timeout: 15000 });
    await p.waitForTimeout(300);
    await p.locator('#wrap').screenshot({ path: `${process.argv[2]}/EVERFREEZE_08-${{ RM: 'A', GW: 'B', LM: 'C' }[v]}.png` });
  }
  console.log('errors:', errs.filter(e => !/fonts\.g/.test(e)).join(' | ') || 'none');
  await b.close();
})();
