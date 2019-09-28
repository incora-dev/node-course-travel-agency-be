import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const header = await this.authService.extractToken(request);
        const compareKey = await this.authService.compareKey(header);
        if (compareKey) {
            return false;
        }
        return true;
    }
}
