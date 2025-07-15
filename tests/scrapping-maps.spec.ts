import { test, expect , Page, chromium} from '@playwright/test'
import { maps } from './maps'

test.beforeEach(async ({ page }) => {
  await page.waitForTimeout(300000)
})


test('scrapping location', async ({page}) => {
    const location = new maps (page)
    await location.location1()
})

test('scrapping location 2', async ({page}) => {
    const location = new maps (page)
    await location.location2()
})

test('scrapping location 3', async ({page}) => {
    const location = new maps (page)
    await location.location3()
})

test('scrapping location 4', async ({page}) => {
    const location = new maps (page)
    await location.location4()

})

test('scrapping location 5', async ({page}) => {
    const location = new maps (page)
    await location.location5()
})


