import {CreateCompanyDto} from '../../../companies/dto/company.dto';

export const CompaniesSeeds: CreateCompanyDto[] = [
    {
        contactEmail: 'testCompany1@mail.com',
        name: 'Company1',
        address: null,
    },
    {
        contactEmail: 'testCompany2@mail.com',
        name: 'Company2',
        address: null,
    },
];
