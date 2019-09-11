import { UserRole } from '../enums/user-role.enum';

export interface IUser {
    _id?: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
}
