import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {CompaniesService} from '../companies.service';

@Injectable()
export class CompanyIsExistMiddleware implements NestMiddleware {
    constructor(private readonly companyService: CompaniesService) {}

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const company = await this.companyService.getOneByParams({id});
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
