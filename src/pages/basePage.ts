import { Page, expect } from '@playwright/test';

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

    saveButton = this.page.getByRole('button', { name: 'Save' });

    flashPostTextArea = this.page.getByRole('textbox', { name: 'Enter your flashpost here' });

    addFlashPostButton = this.page.getByRole('button', { name: 'Create Flashpost', exact: true });

    deleteButton = this.page.getByRole('button', { name: 'Delete' });

    updateButton = this.page.getByRole('button', { name: 'Update' });

    editButton = this.page.getByRole('button', { name: 'Edit' });

    searchInput = this.page.getByTestId('search-input');

    searchButton = this.page.getByTestId('search-button');

    addNewCommentButton = this.page.locator('#add-new');

    createFlashPostButton = this.page.getByRole('button', { name: 'Create', exact: true });

    sendFriendRequestButton = this.page.getByRole('button', { name: 'Send Friend Requests' });

    friendRequestInputButton = this.page.locator("//input[@id='friendRequestInput']/following-sibling::button");

    sendMessageButton = this.page.locator("//textarea[@id='messageInput']/following-sibling::button");

    searchContactsButton = this.page.locator("//input[@id='searchInput']/following-sibling::button");

    sendFriendRequestHeader = this.page.getByText('Provide friends valid email:');

    enterFriendEmailField = this.page.getByRole('textbox', { name: 'Enter friend\'s email' });

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

    async clickAndVerifyResponse(clickSelector: string, endpointURL: string, errorMessage: string) {
        const [, response] = await Promise.all([
            this.page.locator(clickSelector).click(),
            this.page.waitForResponse(endpointURL),
        ]);
        if (!response.ok) {
            throw new Error(errorMessage);
        }
    }
}
