import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useAuthData from '../hooks/useAuthData';

export interface Props {
    children: ReactElement;
}

function ProtectedRoute({ children }: Props) {
    const { user } = useAuthData();

    /* No user means the user is not authenticated  */
    if (!user) {
        return <Navigate to='/' replace />;
    }

    return children;
}

export default ProtectedRoute;
