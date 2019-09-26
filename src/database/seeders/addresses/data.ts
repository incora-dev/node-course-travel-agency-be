import {AddressDTO} from '../../../address/dto/address.dto';

export const AddressesSeeds: AddressDTO[] = [
    {
        country: 'Ukraine',
        city: 'Lviv',
        state: 'Lviv',
        street: 'Chornovola',
        address1: '125',
        address2: '25',
        zip: 79065,
    },
    {
        country: 'Ukraine',
        city: 'Kyiv',
        state: 'Kyiv',
        street: 'Shevchenka',
        address1: '252',
        address2: '13',
        zip: 85035,
    },
    {
        country: 'Ukraine',
        city: 'Kyiv',
        state: 'Kyiv',
        street: 'Shevchenka',
        address1: '252',
        address2: '13',
        zip: 85035,
        location: {
            latitude: '13.5435',
            longtitude: '124.345',
        },
    },
    {
        country: 'Ukraine',
        city: 'Kyiv',
        state: 'Kyiv',
        street: 'Shevchenka',
        address1: '252',
        address2: '13',
        zip: 85035,
        location: {
            latitude: '154.543',
            longtitude: '174.575',
        },
    },
];
