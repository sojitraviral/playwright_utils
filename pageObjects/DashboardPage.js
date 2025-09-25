import { expect } from "@playwright/test";

export default class DashboardPage {

    constructor(page) {
        this.page = page;
    }

    searchLocator() {
        return this.page.locator("#query-builder-test")
    }

    async addToCart(itemName = []) {
        for (let i = 0; i < itemName.length; i++) {
            const item = this.page.locator('.inventory_item_description').filter({ hasText: `${itemName[i]}` })
            await expect((item.getByRole('button', { name: 'Add to cart' })).or(item.getByRole('button', { name: 'Remove' }))).toBeVisible()
            await item.getByText('Add to cart').click()
        }
    }

    async validateItemDetails(itemDetails = {}) {
        await expect(this.page.locator('span:has-text("Your Cart")')).toBeVisible()
        const itemCount = Object.values(itemDetails).length
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText(`${itemCount}`)

        for (let i = 0; i < itemCount; i++) {

            const itemBloack = this.page.locator('.cart_item > .cart_item_label').nth(i)
            const itemValue = Object.values(itemDetails)[i];

            await expect(itemBloack.locator('.inventory_item_name')).toHaveText(itemValue[0])
            await expect(itemBloack.locator('.inventory_item_price')).toContainText(itemValue[1])
        }
    }

    async checkOutInfo(firstName, lastName, postalCode) {
        await expect(this.page.locator('span:has-text("Checkout: Your Information")')).toBeVisible()

        // await expect(this.page.locator('#first-name')).toBeEditable()
        await this.page.locator('#first-name').fill(firstName)
        await this.page.locator('#last-name').fill(lastName)
        await this.page.locator('#postal-code').fill(postalCode)
        await this.page.locator('#continue').click()
    }
}


