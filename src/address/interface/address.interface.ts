export interface IAddress {
    _id?: number;
    country: string;
    city: string;
    state: string;
    street: string;
    address1?: string;
    address2?: string;
    zip?: number;
}
