import { test, expect } from '@playwright/test';

import { getUser, User } from '../src/helpers';

test.describe.configure({ mode: 'parallel' });
let user: User;

  test.beforeEach(async ({ page }) => {
    user = getUser();
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'Practice Pages Special' }).click();

  });

    test('Should fill the iFrame Form', async ({ page }) => {
        const iFrameContentFrame = page.locator('[data-testid="dti-simple-iframe"]').contentFrame();
        await page.getByRole('button', { name: 'Forms' }).click();
        await expect(iFrameContentFrame.getByRole('heading', { name: 'Hello from IFrame!' })).toBeInViewport(); 
        await iFrameContentFrame.getByTestId('name-input').pressSequentially(user.firstname);
        await iFrameContentFrame.getByTestId('submit').click();
        await expect(iFrameContentFrame.getByTestId('results')).toBeInViewport();
        await iFrameContentFrame.locator('#simple-select').selectOption('option-3');
        await iFrameContentFrame.getByRole('checkbox', { name: 'Checkbox 1' }).check();
        await iFrameContentFrame.locator('#simple-range').fill('98');
        await expect(iFrameContentFrame.getByText('098')).toBeInViewport();
        await iFrameContentFrame.locator('#simple-submit').click();
        await expect(iFrameContentFrame.getByTestId('new-results')).toBeInViewport();
  });