import { Locator, Page, TestInfo, expect } from '@playwright/test';

export class BasePage {

    loginButton = this.page.getByRole('button', { name: 'LogIn' });

    logoutButton = this.page.getByTestId('logoutButton');

    registerButton = this.page.getByTestId('register-button');

    firstnameInput = this.page.getByTestId('firstname-input');

    lastnameInput = this.page.getByTestId('lastname-input');

    emailInput = this.page.getByTestId('email-input');

    passwordInput = this.page.getByTestId('password-input');

    loginValidationError = this.page.getByTestId('login-error');

    succesToast = this.page.getByTestId('alert-popup');

    constructor(protected page: Page) {
        this.page = page;
    }


    async registerIntoPanel(firstname: string, lastname:string, email: string, password: string) {
        await this.firstnameInput.pressSequentially(firstname);
        await this.lastnameInput.pressSequentially(lastname);
        await this.emailInput.pressSequentially(email);
        await this.passwordInput.pressSequentially(password);
        await this.registerButton.click();
        await expect(this.succesToast).toBeInViewport();
    }

    async loginIntoPanel(email: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Enter User Email' }).pressSequentially(email);
        await this.page.getByRole('textbox', { name: 'Enter Password' }).pressSequentially(password);
        await this.loginButton.click();
        await expect(this.page.getByTestId('hello')).toBeInViewport();
    }
}
