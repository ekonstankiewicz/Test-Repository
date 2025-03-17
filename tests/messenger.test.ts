import { test, expect } from '@playwright/test';

import { BasePage } from '../src/pages/basePage';
import { getUser, User, existingUser } from '../src/helpers';

test.describe.configure({ mode: 'parallel' });
let user: User;
let panel: BasePage;

    test.beforeEach(async ({ page }) => {
    user = getUser();
    panel = new BasePage(page);
    await page.goto('http://localhost:3000/register.html');
    await panel.registerIntoPanel(user.firstname, user.lastname, user.email, user.password);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeInViewport();
    await panel.loginIntoPanel(user.email, user.password);
    await page.getByTestId('btn-dropdown').hover();
    await page.getByRole('link', { name: 'Message center' }).click();
    await expect(page.getByText('Click contact from contact')).toBeInViewport();
    });

    test('Should not find a non-existent user', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search contacts' }).pressSequentially('Test');
    await panel.searchContactsButton.click();
    await expect(page.getByText('No contacts found')).toBeInViewport();
    });

    test('Should not send an invitaion to a not-existing user', async ({ page }) => {
    await panel.sendFriendRequestButton.click();
    await expect(panel.sendFriendRequestHeader).toBeInViewport();
    await panel.enterFriendEmailField.click();
    await panel.friendRequestInputButton.click();
    await expect(page.getByText('Invalid email: ""')).toBeInViewport();
    });

    test('Should send message and verify delivery', async ({ browser, page }) => {
    const message = 'Hello, Joe!';
    const friendName = 'Joe Doe';

        await test.step('Should send a friend request to an existing user', async () => {
        await panel.sendFriendRequestButton.click();
        await expect(panel.sendFriendRequestHeader).toBeInViewport();
        await panel.enterFriendEmailField.pressSequentially(existingUser.email);
        await panel.friendRequestInputButton.click();
        await expect(page.getByText((`Friend request sent to "${existingUser.email}"`))).toBeInViewport();
        });

        await test.step('Should send a message to a newly added friend', async () => {
        await page.getByRole('button', { name: 'Contacts and Messages' }).click();
        await expect(page.getByText(friendName)).toBeInViewport();
        await page.getByText(friendName).click();
        await expect(page.getByText('This is the beginning of your')).toBeInViewport();
        await page.getByRole('textbox', { name: 'Type your message (max 128' }).pressSequentially(message)
        await panel.sendMessageButton.click();
        await expect(page.getByText('You', { exact: true })).toBeInViewport();
        await expect(page.getByText(message)).toBeInViewport();
        });

        await test.step('Should verify that the recipient received the message', async () => {
        const secondContext = await browser.newContext();
        const secondPage = await secondContext.newPage();
            
        await secondPage.goto('http://localhost:3000/login/');
        await expect(secondPage.getByRole('heading', { name: 'Login' })).toBeInViewport();
        await secondPage.getByRole('textbox', { name: 'Enter User Email' }).pressSequentially(existingUser.email);
        await secondPage.getByRole('textbox', { name: 'Enter Password' }).pressSequentially(existingUser.password);
        await secondPage.getByRole('button', { name: 'LogIn' }).click();

        await secondPage.getByTestId('btn-dropdown').hover();
        await secondPage.getByRole('link', { name: 'Message center' }).click();
        await expect(secondPage.getByText('Click contact from contact')).toBeInViewport();

        await secondPage.locator('.contact').first().click();
        await expect(secondPage.getByText(message)).toBeInViewport();
        });
});