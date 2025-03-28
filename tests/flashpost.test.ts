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
    await page.getByTestId('open-flashposts').click();
    await expect(page.getByRole('button', { name: 'My Flashposts' })).toBeInViewport();
    });

    test('Should create Flashpost', async ({ page }) => {
        const flashpostText = `${'New flashpost'+' '+ Math.random().toString(36).substring(2, 10)}`;
        const editedFlashpostText = `${'Edited flashpost'+' '+ Math.random().toString(36).substring(2, 10)}`;
        await panel.addFlashPostButton.click();
        await panel.flashPostTextArea.pressSequentially(flashpostText);
        await page.getByRole('checkbox', { name: 'is public?' }).check();
        await panel.createFlashPostButton.click();
        await expect(page.getByText(flashpostText)).toBeInViewport();

        await test.step('Should edit Flashpost', async () => {
        await page.getByText(flashpostText).click();
        await panel.editButton.click();
        await panel.flashPostTextArea.clear();
        await panel.flashPostTextArea.pressSequentially(editedFlashpostText);
        await panel.updateButton.click();
        await expect(page.getByText(editedFlashpostText)).toBeInViewport();
        });

        await test.step('Added flashpost should be visible in My Flashposts', async () => {
        await page.getByRole('button', { name: 'My Flashposts' }).click();
        await expect(page.getByText(editedFlashpostText)).toBeInViewport();
        });

        await test.step('Should delete Flashpost', async () => {
        await page.getByText(editedFlashpostText).click();
        await panel.deleteButton.click();
        await page.reload();
        await expect(page.getByText(editedFlashpostText)).toBeHidden();
        await expect(panel.addFlashPostButton).toBeInViewport();
    });
});