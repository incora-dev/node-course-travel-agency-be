import {Address} from '../../address/address.entity';
import {User} from '../../users/user.entity';

export interface ICompany {
    _id?: number;
    contactEmail: string;
    name: string;
    address1: Address;
    address2?: Address;
    owner?: User;
}
