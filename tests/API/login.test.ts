import { test, expect } from '@playwright/test';

import { getUser, User, existingUser } from '../../src/helpers';

test.describe.configure({ mode: 'parallel' });
let user: User;

const URL = 'http://localhost:3000';

    test.beforeEach(async () => {
    user = getUser();
    });

    test('Should return unauthorized error for invalid login attempts', async ({ request }) => {
    const login = await request.post(`${URL}/api/login`, {
        headers: {
        },
        data: {
            email: user.email,
            password: user.password,
          },
    });
    expect(login.status()).toBe(401);
    expect(await login.json()).toEqual({
            status: 401,
            message: "Incorrect email or password"
        });
    });

    test('Should login with existing user account', async ({ request }) => {
        const login = await request.post(`${URL}/api/login`, {
            headers: {
            },
            data: {
                email: existingUser.email,
                password: existingUser.password,
            },
        });
    
        expect(login.status()).toBe(200);
    });

    test('Should not get login data without token provided', async ({ request }) => {
        const login = await request.get(`${URL}/api/login`, {
            headers: {
            },
            data: {
                email: existingUser.email,
                password: existingUser.password,
            },
        });
    
        expect(login.status()).toBe(401);
        expect(await login.json()).toEqual({
            error: {
              message: "Access token not provided!"
            }
          });
    });