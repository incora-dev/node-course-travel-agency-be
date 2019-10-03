import {Address} from '../../address/address.entity';
import {User} from '../../users/user.entity';

export interface ICompany {
    id?: number;
    contactEmail: string;
    name: string;
    address: Address;
    owner?: User;
    ownerId?: number;
}
