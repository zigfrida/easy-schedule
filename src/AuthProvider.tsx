import { User as FirebaseUser } from 'firebase/auth';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from './api/auth';
import { createFirebaseDao } from './api/dao';
import AuthContext from './context/authContext';
import { AuthContextData, User } from './types';

const userDao = createFirebaseDao<User>('user');

export interface Props {
    children: ReactElement;
}

function AuthProvider({ children }: Props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [authUser, setAuthUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    const signIn: AuthContextData['signIn'] = useCallback(
        (email, password) =>
            new Promise((resolve, reject) => {
                signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        resolve(user);
                    })
                    .catch(reject);
            }),
        [],
    );

    const signUp: AuthContextData['signUp'] = useCallback(
        (email, password) =>
            new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(email, password)
                    .then((registeredUser) => {
                        setLoading(false);
                        resolve(registeredUser);
                    })
                    .catch(reject);
            }),
        [],
    );

    useEffect(() => {
        setLoading(true);

        function fetchAuthUser(authInfo: FirebaseUser | null): void {
            if (authInfo) {
                setAuthenticated(true);

                userDao.get(authInfo.uid).then((userData) => {
                    if (userData) {
                        setAuthUser(userData);
                    }
                });
            } else {
                setAuthUser(undefined);
                setAuthenticated(false);
            }

            setLoading(false);
        }

        onAuthStateChanged(fetchAuthUser);
    }, []);

    const value = useMemo<AuthContextData>(
        () => ({ authenticated, loading, signIn, signUp, user: authUser }),
        [authUser, authenticated, loading, signIn],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
