import { test, expect } from '@playwright/test';

import { BasePage } from '../src/pages/basePage';
import { getUser, User } from '../src/helpers';

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
    await page.getByTestId('open-articles').click();
    });

    test('Should search article from the list', async ({ page }) => {
    const article = page.getByRole('link', { name: 'What is Playwright and why' })
    await panel.searchInput.pressSequentially('playwright');
    await panel.searchButton.click();
    await expect(article).toBeInViewport();
    

    await test.step('Should open article', async () => {
        await article.click();
        await expect(page.getByTestId('article-title')).toBeInViewport();
    });

    await test.step('Should add comment to article', async () => {
        const comment = `${'comment'+' '+ Math.random().toString(36).substring(2, 10)}`;
        await panel.addNewCommentButton.click();
        await page.getByRole('heading', { name: 'Add New Comment' }).click();
        await page.locator('#body').pressSequentially(comment);
        await panel.saveButton.click();
        await expect(panel.succesToast).toBeInViewport();
        await page.getByText(comment).scrollIntoViewIfNeeded();
        await expect(page.getByText(comment)).toBeInViewport();
    });
});
