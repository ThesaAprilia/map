import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://demo74.energeek.co.id/petrokimia-2ce-v1/');
  await page.fill('input[placeholder="Username"]', 'primedia');
  await page.fill('input[placeholder="Masukkan Sandi"]', 'qwerty123456');
  await page.click('#btn-simpan');
  await page.waitForTimeout(10000); // tunggu sampai login selesai

  await context.storageState({ path: 'storageState.json' });
  await browser.close();

  console.log('✅ Login state saved ke storageState.json');
})();