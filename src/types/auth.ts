import { UserCredential } from 'firebase/auth';

import { User } from './user';

export interface AuthContextData {
    authenticated: boolean;
    loading: boolean;

    signIn(email: string, password: string): Promise<UserCredential>;
    signUp(email: string, password: string): Promise<UserCredential>;

    user?: User;
}
