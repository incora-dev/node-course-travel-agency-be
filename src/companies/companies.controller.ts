import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {ApiResponse, ApiImplicitParam, ApiUseTags} from '@nestjs/swagger';
import {CreateCompanyDto} from './dto/company.dto';
import {ICompany} from './interface/company.interface';

@ApiUseTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Company has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Company already exists!" }```' })
    async create(@Body() company: CreateCompanyDto): Promise<ICompany> {
        const contactEmail = company.contactEmail;
        const companyFromDB = await this.companiesService.getOneByParams({ contactEmail });
        if (companyFromDB) {
            throw new HttpException('Company already exists!', HttpStatus.CONFLICT);
        }
        return await this.companiesService.createCompany(company);
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Company Object'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<ICompany> {
        return this.companiesService.getOneByParams({ id });
    }
}
