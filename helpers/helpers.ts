import { BrowserContext, Page, TestInfo, expect } from '@playwright/test';

export type User = {
    firstname: string;  
    lastname: string;
    email: string;
    password: string;
};

export const getUser = (): User => ({
    firstname: 'Joe',
    lastname: 'Doe',
    email: getNewEmail(),
    password: 'Password',
});

export const getNewEmail = (): string =>
    `playwright_${new Date().getTime()}_${Math.random()}@mailinator.com`;
