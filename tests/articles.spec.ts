import { test, expect } from '@playwright/test';

import { BasePage } from '../helpers/pages/basePage';
import { getUser, User } from '../helpers/helpers';

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
    await expect(page.getByTestId('hello')).toBeInViewport();
    await page.getByTestId('open-articles').click();

    test('Should search article from the list', async ({ page }) => {
        await page.getByTestId('search-input').pressSequentially('playwright');
        await page.getByTestId('search-button').click();
        await expect(page.getByRole('link', { name: 'What is Playwright and why' })).toBeInViewport();
    });

    await test.step('Should open article', async () => {
        await page.getByRole('link', { name: 'What is Playwright and why' }).click();
        await expect(page.getByTestId('article-title')).toBeInViewport();
    });

    await test.step('Should add comment to article', async () => {
        const comment = 'Great article!';
        await page.locator('#add-new').click();
        await page.getByRole('heading', { name: 'Add New Comment' }).click();
        await page.locator('#body').pressSequentially(comment);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(panel.succesToast).toBeInViewport();
        await page.getByText(comment).scrollIntoViewIfNeeded();
        await expect(page.getByText(comment)).toBeInViewport();
    });
});