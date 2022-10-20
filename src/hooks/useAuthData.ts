import { useContext } from 'react';

import AuthContext from '../context/authContext';
import { AuthContextData } from '../types';

export default function useAuthData(): AuthContextData {
    // Non-null assertion is safe. Auth Context will always be assigend a value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return useContext(AuthContext)!;
}
