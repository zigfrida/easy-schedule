export type UserType = 'nurse' | 'senior';

export type User = {
    uid: string;
    address?: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: UserType;
};
