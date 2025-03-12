import { test, expect } from '@playwright/test';

import { getUser, User } from '../helpers/helpers';

import { BasePage } from '../helpers/pages/basePage';

test.describe.configure({ mode: 'parallel' });
let user: User;
let panel: BasePage;

    test.beforeEach(async ({ page }) => {
    user = getUser();
    panel = new BasePage(page);
    await page.goto('http://localhost:3000/register.html');
    await expect(page.getByRole('heading', { name: 'Register' })).toBeInViewport();
    });

    test('Should register with valid data', async ({ page }) => {
    const panel = new BasePage(page);
    await panel.firstnameInput.pressSequentially(user.firstname);
    await panel.lastnameInput.pressSequentially(user.lastname);
    await panel.emailInput.pressSequentially(user.email);
    await panel.passwordInput.pressSequentially(user.password);
    await panel.registerButton.click();
    await expect(panel.succesToast).toBeInViewport();
    });

    test('Should not register without data', async ({ page }) => {
    await panel.registerButton.click();
    await expect(page.locator('#octavalidate_firstname')).toBeInViewport();
    });

    test('Should not register with invalid user data', async ({ page }) => {
    const dummyData = '123';
    await panel.firstnameInput.pressSequentially(dummyData);
    await panel.lastnameInput.pressSequentially(dummyData);
    await panel.emailInput.pressSequentially(user.email);
    await panel.passwordInput.pressSequentially(user.password);
    await panel.registerButton.click();
    await expect(page.locator('#registerForm div').filter({ hasText: 'Please enter only Letters!' })).toBeInViewport();
    });
    
    test('Should not register with invalid email', async ({ page }) => {
    await panel.firstnameInput.pressSequentially(user.firstname);
    await panel.lastnameInput.pressSequentially(user.lastname);
    await panel.emailInput.pressSequentially('test@test');
    await panel.passwordInput.pressSequentially(user.password);
    await panel.registerButton.click();
    await expect(page.getByText('Please provide a valid email')).toBeInViewport();
    });  