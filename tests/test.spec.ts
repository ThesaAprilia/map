import { test, expect, Page, chromium} from '@playwright/test';
test.skip('location1', async ({page}) => {
    const placeUrl = 'https://www.google.com/maps/place/Taman+Mayangkara/@-7.3086387,112.7311169,17z/data=!4m6!3m5!1s0x2dd7fb9e2e33845f:0x455409e45d94f7da!8m2!3d-7.3069994!4d112.7355235!16s%2Fg%2F11g6mdhl44?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D'

    await page.goto(placeUrl, { waitUntil: 'networkidle' })

    await page.waitForTimeout(10000)
    const label = page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]')
    await label.hover()
    await label.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    const popularTimesLocator = page.locator('.fontHeadlineSmall').nth(1).filter({ hasText: 'Jam Ramai' })
    await popularTimesLocator.waitFor({ timeout: 10000 });
    const liveStatus = await page.locator('div.UgBNB.fontBodySmall').textContent()
    console.log('Status keramaian lokasi 1:', liveStatus?.trim());
})

test('location2', async ({page}) => {
        // const browser = await chromium.launch({ headless: false });
        // const context = await browser.newContext()
        // const page2 = await context.newPage()
        const placeUrl = 'https://www.google.com/maps/place/Bungkul+Park/@-7.2913415,112.7372469,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fbbe1837258d:0x6de4060b6596563f!8m2!3d-7.2913468!4d112.7398218!16s%2Fg%2F121_bvsv?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D'

        await page.goto(placeUrl)

        await page.waitForTimeout(10000)
        const label = page.locator('div[jsaction="mouseover:pane.wfvdle0; mouseout:pane.wfvdle1"]')
        await label.hover()
        await label.scrollIntoViewIfNeeded()
        await page.waitForTimeout(2000)

        const popularTimesLocator = page.locator('.fontHeadlineSmall').nth(1).filter({ hasText: 'Jam Ramai' })
        await popularTimesLocator.waitFor({ timeout: 10000 })
        const liveStatus = await page.locator('div.UgBNB.fontBodySmall').textContent()
        console.log('Status keramaian Taman Bungkul:', liveStatus?.trim());
        await page.waitForTimeout(60_000)
    
})
