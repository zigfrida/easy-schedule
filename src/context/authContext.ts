import { createContext } from 'react';

import { AuthContextData } from '../types';

export default createContext<AuthContextData | undefined>(undefined);
