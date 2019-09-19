import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
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
import {Company} from './company.entity';

@ApiUseTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Company has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 401, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Company already exists!" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Address already exists!" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Company with this owner already exist!" }```' })
    async create(@Body() company: CreateCompanyDto, @Request() req): Promise<ICompany> {
        const checkCompanyByEmail = await this.companiesService.getOneByParams({ contactEmail: company.contactEmail });
        const checkCompanyByOwner = await this.companiesService.getOneByParams({ ownerId: req.user.userId });
        if (checkCompanyByEmail) {
            throw new HttpException('Company already exists!', HttpStatus.CONFLICT);
        } else if (checkCompanyByOwner) {
            throw new HttpException('Company with this owner already exist!', HttpStatus.CONFLICT);
        }
        const newCompany = new Company();
        Object.assign(newCompany, company);
        newCompany.ownerId = req.user.userId;
        return await this.companiesService.createCompany(newCompany);
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
    @ApiResponse({ status: 200, description: 'Company Object ```deleted Company()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async deleteCompanyById(@Param() params, @Request() req): Promise<ICompany> {
        const checkCompanyByOwner = await this.companiesService.getOneByParams({ id: Number(params.id) });
        if (checkCompanyByOwner.ownerId !== req.user.userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.companiesService.deleteCompanyById(params.id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Company Object ```updated Company()```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Address don`t have id" }```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Company with this email already exists!" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "First address can`t delete" }```' })
    @ApiResponse({ status: 409, description: 'Error Exception ```{ statusCode: 409, message: "Address already exists, change address!" }```' })
    async updateCompany(@Param() params, @Body() company: UpdateCompanyDto, @Request() req): Promise<ICompany> {
        const checkCompanyByOwner = await this.companiesService.getOneByParams({ id: Number(params.id) });
        if (checkCompanyByOwner.ownerId !== req.user.userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else if (company.contactEmail && await this.companiesService.getOneByParams({ contactEmail: company.contactEmail })) {
            throw new HttpException('Company with this email already exists!', HttpStatus.CONFLICT);
        }
        return this.companiesService.updateCompany(params.id, company);
    }

}
