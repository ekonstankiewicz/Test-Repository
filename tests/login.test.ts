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
  });

  test('Should not login without credentials', async ({ page }) => {
    await panel.loginButton.click();
    await expect(panel.loginValidationError).toBeInViewport();
    });

  test('Should not login with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter User Email' }).pressSequentially('test@test');
    await page.getByRole('textbox', { name: 'Enter Password' }).pressSequentially(user.password);
    await panel.loginButton.click();
    await expect(panel.loginValidationError).toBeInViewport();
  });

  test('Should login with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Enter User Email' }).pressSequentially(user.email);
    await page.getByRole('textbox', { name: 'Enter Password' }).pressSequentially(user.password);
    await panel.loginButton.click();
    await expect(page.getByTestId('hello')).toBeInViewport();

    await test.step('Should logout from panel', async () => {
      await panel.logoutButton.click();
      await expect(page.getByRole('heading', { name: 'Login' })).toBeInViewport();
    });

    await test.step('Don`t have account section should transfer to register', async () => {
      await expect(page.getByText('Don\'t have an account?')).toBeInViewport();
      await page.getByRole('link', { name: 'Register' }).click();
      await expect(page.getByRole('heading', { name: 'Register' })).toBeInViewport();
    });
  });
  