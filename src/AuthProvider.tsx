import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged } from './api/auth';
import { createFirebaseDao } from './api/dao';
import AuthContext from './context/authContext';
import { AuthContextData, User } from './types';

const userDao = createFirebaseDao<User>('user');

export interface Props {
    children: ReactElement;
}

function AuthProvider({ children }: Props) {
    const [authUser, setAuthUser] = useState<User>();

    useEffect(() => {
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
        });
    }, []);

    const value = useMemo<AuthContextData>(
        () => ({
            user: authUser,
        }),
        [authUser],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
