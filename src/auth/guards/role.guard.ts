import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UserRole } from '../../users/enums/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user && (user.role === UserRole.ADMIN)) {
            return true;
        }
        throw new HttpException('Unathorized access!', HttpStatus.UNAUTHORIZED);
    }
}
