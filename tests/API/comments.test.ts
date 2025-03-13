import { test, expect } from '@playwright/test';

import { getUser, User } from '../../src/helpers';

test.describe.configure({ mode: 'parallel' });
let user: User;

const URL = 'http://localhost:3000';

    test.beforeEach(async () => {
    user = getUser();
    });

    test('Should get users comments', async ({ request }) => {
    const comments = await request.get(`${URL}/api/comments/`, {
        headers: {
        },
        data: {
          },
    });
    expect(comments.status()).toBe(200);
    const responseBody = JSON.parse(await comments.text());
    const firstCommentFromResponse = responseBody[0];
    expect(comments.status()).toBe(200);
    expect(comments.ok).toBeTruthy();
    expect(await firstCommentFromResponse).toEqual(
        expect.objectContaining({
            id: 1,
            article_id: 1,
            user_id: 3
        }),
    );
});

    test('Should not post new comment without token', async ({ request }) => {
    const comments = await request.post(`${URL}/api/comments/`, {
        headers: {
        },
        data: {
            article_id: 0,
            body: "string",
            date: "2024-06-30T15:44:31Z"
          },
    });
    expect(comments.status()).toBe(401);
        expect(await comments.json()).toEqual({
            error: {
              message: "Access token not provided!"
            }
    });
    });

    test('Should retrieve comment by ID', async ({ request }) => {
    const comments = await request.get(`${URL}/api/comments/59/`, {
        headers: {
        },
        data: {
          },
    });
    expect(comments.status()).toBe(200);
    expect(comments.status()).toBe(200);
    expect(comments.ok).toBeTruthy();
    expect(await comments.json()).toEqual(
        expect.objectContaining({
            id: 59,
            article_id: 43,
            user_id: 5,
        }),
    );
    });