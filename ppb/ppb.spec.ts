import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

interface DataItem {
  loading_plan_id: number;
  ppb_code: string;
}

test.use({ storageState: 'storageState.json' });

test('download PPB in batch of 20 with delay', async ({ page }) => {
  test.setTimeout(5400_000); // timeout 1 jam

  const downloadDir = path.resolve(__dirname, 'downloads');
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

  const raw = fs.readFileSync(path.resolve(__dirname, 'list_ppb.json'), 'utf-8');
  const data: DataItem[] = JSON.parse(raw);

  const batchSize = 20;
  const delayBetweenItems = 3000;     // 3 detik antar download (dalam batch)
  const delayBetweenBatches = 60000;  // 60 detik antar batch

  const totalBatches = Math.ceil(data.length / batchSize);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const start = batchIndex * batchSize;
    const end = Math.min(start + batchSize, data.length);
    const batch = data.slice(start, end);

    console.log(`🔁 Processing batch ${batchIndex + 1}/${totalBatches} (data ${start + 1} - ${end})`);

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i];
      const url = `https://demo74.energeek.co.id/petrokimia-2ce-v1/rencana-pemuatan/data-ppb/${item.loading_plan_id}/cetak-baru?code=${item.ppb_code}`;
      console.log(`  → [${start + i + 1}] Downloading: ${url}`);

      try {
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }),
        ]);

        const filename = download.suggestedFilename();
        const savePath = path.join(downloadDir, filename);
        await download.saveAs(savePath);

        console.log(`    ✅ File saved: ${filename}`);
      } catch (error) {
        console.error(`    ❌ Failed to download from: ${url}`);
        console.error(error);
      }

      await page.waitForTimeout(delayBetweenItems); // jeda antar item
    }

    if (batchIndex < totalBatches - 1) {
      console.log(`⏳ Waiting ${delayBetweenBatches / 1000} seconds before next batch...`);
      await page.waitForTimeout(delayBetweenBatches);
    }
  }

  console.log('✅ Selesai semua batch.');
});
