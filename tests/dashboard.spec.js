// @ts-check
const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pageObjects');

test.use({ storageState: 'pw/admin.json' })

test('verify add to cart functionality in Home page', async ({ page }, testInfo) => {

    await page.goto('https://www.saucedemo.com/inventory.html')
    const dashboardPage = new DashboardPage(page)

    dashboardPage.addToCart(['Sauce Labs Fleece Jacket'])

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1)
    await page.locator('.shopping_cart_link').click()

    await dashboardPage.validateItemDetails({ item1: ["Sauce Labs Fleece Jacket", "49.99"] })
    await page.locator('#checkout').click()

    await dashboardPage.checkOutInfo('viral', 'sojitra', 'n2n2n2')

    await expect(page.locator('.summary_info')).toHaveScreenshot('paymentInformation.png')
    await page.locator('#finish').click()

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')
    await page.locator('#back-to-products').click()
    await page.close()

})