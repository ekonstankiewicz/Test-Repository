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
    `playwright_${new Date().getTime()}_${Math.random().toString(36).substring(2, 10)}@mailinator.com`;

export const existingUser: User = {
    firstname: 'Joe',
    lastname: 'Doe',
    email: 'joe@doe.com',
    password: 'Password',
};