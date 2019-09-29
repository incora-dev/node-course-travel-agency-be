import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {ApiResponse, ApiImplicitParam, ApiUseTags, ApiBearerAuth} from '@nestjs/swagger';
import {CreateCompanyDto, UpdateCompanyDto} from './dto/company.dto';
import {ICompany} from './interface/company.interface';
import {AuthGuard} from '@nestjs/passport';
import {AddressService} from '../address/address.service';
import {responseConstants} from '../constants/responseConstants';

@ApiUseTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly addressService: AddressService,
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Success ```{ statusCode: 201, message: "Create was successful, companyId: id"}```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```' +
            ' { statusCode: 409, message: "Company with this email already exist!" }' +
            ' { statusCode: 409, message: "Company with this owner already exist!" }' +
            ' { statusCode: 409, message: "Address already exists!" }' +
            '```' })
    async create(@Body() company: CreateCompanyDto, @Request() req): Promise<Object> {
        await this.companiesService.checkIfUserHaveCompany(req.user.userId);
        await this.companiesService.checkCompanyByEmail(company.contactEmail);
        await this.addressService.checkAddressIfExist(company.address);
        const newCompany = {
            ...company,
            ownerId: req.user.userId,
        };
        const companyFromDB = await this.companiesService.createCompany(newCompany);
        if ( companyFromDB ) {
            return {
                statusCode: 201,
                message: responseConstants.createSuccess,
                objectId: companyFromDB.id,
            };
        }
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Company Object'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<ICompany> {
        return this.companiesService.getOneByParams({ id });
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of Companies'})
    getAll(): Promise<ICompany[]> {
        return this.companiesService.getAll();
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success ```{ statusCode: 200, message: "Delete was successful"}```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async deleteCompanyById(@Param() params, @Request() req): Promise<Object> {
        await this.companiesService.checkCompanyByOwner(params.id, req.user.userId);
        if (await this.companiesService.deleteCompanyById(params.id)) {
            return {
                statusCode: 200,
                message: responseConstants.deleteSuccess,
            };
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success ```{ statusCode: 200, message: "Update was successful"}```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```' +
            '{ statusCode: 400, message: "Bad request" }' +
            '{ statusCode: 400, message: "Address don`t have id" }' +
            '```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```' +
            '{ statusCode: 409, message: "Company with this email already exist!" }' +
            '{ statusCode: 409, message: "Address already exists!" }' +
            '```' })
    async updateCompany(@Param() params, @Body() company: UpdateCompanyDto, @Request() req): Promise<Object> {
        await this.companiesService.checkCompanyByOwner(params.id, req.user.userId);
        await this.companiesService.checkCompanyByEmail(company.contactEmail, params.id);
        await this.addressService.validateAddressCorrectness(company.address);
        if (await this.companiesService.updateCompany(params.id, company) ) {
            return {
                statusCode: 200,
                message: responseConstants.updateSuccess,
            };
        }
    }

}
