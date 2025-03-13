import { test, expect } from '@playwright/test';

import { getUser, User } from '../../src/helpers';

test.describe.configure({ mode: 'parallel' });
let user: User;

const URL = 'http://localhost:3000';

    test.beforeEach(async () => {
    user = getUser();
    });

    test('Should get users data', async ({ request }) => {
    const users = await request.get(`${URL}/api/users`, {
        headers: {
        },
        data: {
          },
    });
    expect(users.status()).toBe(200);
    const responseBody = JSON.parse(await users.text());
    const firstUserFromResponse = responseBody[0];
    expect(users.status()).toBe(200);
    expect(users.ok).toBeTruthy();
    expect(await firstUserFromResponse).toEqual(
        expect.objectContaining({
            id: 1,
            email: "****",
            firstname: "Moses",
            lastname: "****",
            password: "****",
        }),
    );
    });

    test('Should create user with valid data', async ({ request }) => {
         const users = await request.post(`${URL}/api/users`, {
            headers: {
            },
            data: {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password,
                    avatar: "string"
              },
        });
        expect(users.status()).toBe(201);
    });

    test('Should not create user without all data provided', async ({ request }) => {
        const users = await request.post(`${URL}/api/users`, {
            headers: {
            },
            data: {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password
              },
        });
        expect(users.status()).toBe(422);
        expect(await users.json()).toEqual({
            error: {
                message: "One of mandatory field is missing",
                details: [  
                    "firstname",
                    "lastname",
                    "email",
                    "avatar"
                ]
            }
        });
    });

    test('Should get specific user data', async ({ request }) => {
        const users = await request.get(`${URL}/api/users/1`, {
            headers: {
            },
            data: {
              },
        });
        expect(users.status()).toBe(200);
        expect(await users.json()).toEqual(
            expect.objectContaining({
                id: 1,
                email: "****",
                firstname: "Moses",
                lastname: "****",
                password: "****",
            }),
        );
    });

    test('Should not update specific user data without token', async ({ request }) => {
        const users = await request.put(`${URL}/api/users/1`, {
            headers: {
            },
            data: {
              },
        });
        expect(users.status()).toBe(401);
        expect(await users.json()).toEqual({
            error: {
              message: "Access token not provided!"
            }
        });
    });