import {Address} from '../../address/address.entity';

export interface ICompany {
    _id?: number;
    contactEmail: string;
    name: string;
    address1: Address;
    address2?: Address;
}
