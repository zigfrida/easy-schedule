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
    const [authUser, setAuthUser] = useState<User>();
    const [loading, setLoading] = useState(false);

    const signIn: AuthContextData['signIn'] = useCallback((email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(email, password).then((user) => {
            setLoading(false);
            return user;
        });
    }, []);

    const signUp: AuthContextData['signUp'] = useCallback((email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(email, password).then((registeredUser) => {
            setLoading(false);
            return registeredUser;
        });
    }, []);

    useEffect(() => {
        setLoading(true);

        onAuthStateChanged((authInfo) => {
            if (authInfo) {
                userDao.get(authInfo.uid).then((userData) => {
                    if (userData) {
                        setAuthUser(userData);
                    }
                });
            } else {
                setAuthUser(undefined);
            }

            setLoading(false);
        });
    }, []);

    const value = useMemo<AuthContextData>(
        () => ({
            loading,
            signIn,
            signUp,
            user: authUser,
        }),
        [authUser, loading, signIn],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
