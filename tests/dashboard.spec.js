// @ts-check
const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pageObjects');

test.use({ storageState: 'pw/admin.json' })

test('verify add to cart functionality in Home page', async ({ page }, testInfo) => {

    await page.goto('https://www.saucedemo.com/inventory.html')
    const dashboardPage = new DashboardPage(page)

    await expect(page).toHaveTitle('Swag Labs');

    dashboardPage.addToCart(['Sauce Labs Fleece Jacket'])

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1)
    await page.locator('.shopping_cart_link').click()

    await dashboardPage.validateItemDetails({ item1: ["Sauce Labs Fleece Jacket", "49.99"] })
    await page.locator('#checkout').click()

    // await page.getByRole('text', { name: "firstName" }).fill("abc")

    await dashboardPage.checkOutInfo('viral', 'sojitra', 'n2n2n2')

    await expect(page.locator('.summary_info')).toHaveScreenshot('paymentInformation.png')
    await page.locator('#finish').click()

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')
    await page.locator('#back-to-products').click()
    await page.close()

})


test('verify reverse string', async ({ page }) => {

    const text = ["Twitter", "Facebook", "LinkedIn", 'x']
    await page.goto('https://www.saucedemo.com/inventory.html')
    const listItem = page.locator('.social').getByRole('listitem');
    await expect(listItem.first()).toBeVisible()
    await expect(listItem).toHaveCount(text.length)
    for (let i = 0; i < await listItem.count(); i++) {
        await expect(listItem.nth(i)).toHaveText(text[i])
    }
    // for (let locator of await listItem.all()) {
    //     const a = await expect(locator).toHaveText(text)
    //     console.log(a)
    // }

    const texts = await listItem.evaluateAll(
        list => list.map(element => element.textContent));
    console.log(texts)

    const checkbox = await page.locator('abc')
    const isChecked = await checkbox.getAttribute('value') == '1' ? true : false

    if (!isChecked) {
        //we will do check action
        await checkbox.check()
    }
    // 1 ==checked => true, 2 ==not checked =>false
    await page.pause()
})