import { Auth, NextFn } from 'firebase/auth';

import { ArrayElement } from '../../types';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from '../auth';

const mockUsers = [
    {
        email: 'valid@mail.com',
        password: 'test',
    },
];

jest.mock('firebase/auth', () => {
    let authStateCallback: NextFn<ArrayElement<typeof mockUsers>> = () => {};

    return {
        createUserWithEmailAndPassword: (_auth: Auth, email: string, password: string) => {
            const user = { email, password };
            mockUsers.push(user);

            authStateCallback?.(user);
        },
        signInWithEmailAndPassword: (_auth: Auth, email: string, password: string) =>
            new Promise((resolve, reject) => {
                const found = mockUsers.find(
                    (user) => user.email === email && user.password === password,
                );
                if (found) {
                    resolve(found);
                    authStateCallback?.(found);
                } else {
                    /* This is just some dummy code */
                    reject(new Error('no user found'));
                }
            }),
        onAuthStateChanged: (_auth: Auth, callback: NextFn<ArrayElement<typeof mockUsers>>) => {
            authStateCallback = callback;
        },
        getAuth: jest.fn(),
    };
});

describe('createUserWithEmailAndPassword', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    test('Unit test failure', () => {
        expect(1).toBe(3);
    });

    test('should successfully create user', () => {
        createUserWithEmailAndPassword('new@new.com', 'test test');
        expect(mockUsers.length).toBe(2);
        expect(mockUsers.find((user) => user.email === 'new@new.com')).toBeDefined();
    });
});

describe('signInWithEmailAndPassword', () => {
    test('should successfully sign in valid user', () => {
        signInWithEmailAndPassword('valid@mail.com', 'test').then((user) => {
            expect(user).toEqual({ email: 'valid@mail.com', password: 'test' });
        });
    });

    test('should successfully handle invalid user', () => {
        signInWithEmailAndPassword('invalid@mail.com', 'invalid').catch((error) => {
            expect(error.message).toBe('no user found');
        });
    });
});

describe('onAuthStateChanged', () => {
    test('should invoke onAuthStateChanged if a user is created', () => {
        const callback = jest.fn();

        onAuthStateChanged(callback);
        createUserWithEmailAndPassword('new@new.com', 'test test');

        expect(callback).toBeCalled();
    });

    test('should invoke onAuthStateChanged if a user is signed in', () => {
        const callback = jest.fn();

        onAuthStateChanged(callback);
        signInWithEmailAndPassword('valid@mail.com', 'test');

        expect(callback).toBeCalled();
    });
});
