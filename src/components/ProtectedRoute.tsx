import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useAuthData from '../hooks/useAuthData';

export interface Props {
    children: ReactElement;
}

function ProtectedRoute({ children }: Props) {
    const { authenticated } = useAuthData();

    if (!authenticated) {
        return <Navigate to='/' replace />;
    }

    return children;
}

export default ProtectedRoute;
