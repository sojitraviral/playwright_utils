import { expect } from "@playwright/test";

export default class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async login() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await this.page.getByPlaceholder("Username").fill("Admin")
        await this.page.getByPlaceholder("Password").fill("admin123")
        await this.page.getByRole("button", { name: "Login" }).click()
    }
}