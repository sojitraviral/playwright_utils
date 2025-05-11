import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.context().storageState({ path: 'pw/admin.json' }); // Save auth state
    await browser.close();

}

export default globalSetup;
