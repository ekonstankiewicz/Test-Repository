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
    await page.getByTestId('open-stats').click();
});

    test('Should display statistics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Show statistics of:' })).toBeInViewport();
    await page.locator('#btnUserStats').click();
    await expect(page.getByRole('cell', { name: 'Articles per User' })).toBeInViewport();
    await page.getByRole('button', { name: 'Pie Chart' }).click();
    await expect(page.getByText('20.3%', { exact: true })).toBeInViewport();
    });