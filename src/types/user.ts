export type UserType = 'nurse' | 'senior';

export interface SeniorUser {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    uid: string;
}

export type NurseUser = Omit<SeniorUser, 'address'>;

export type User = SeniorUser | NurseUser;
