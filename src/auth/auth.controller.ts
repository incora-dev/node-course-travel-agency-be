import { Controller, Request, UseGuards, Body, Post, Get, UnauthorizedException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin, UserDTO } from '../users/dto/user.dto';
import { ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { ILogin } from './interfaces/auth.interface';
import { TokenGuard } from './guards/token.guard';
import { responseConstants } from '../constants/responseConstants';

@ApiUseTags('auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @ApiResponse({ status: 201, description: '```Ok``` JWT token successfully generated' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 400, description: '```Bad Request```' })
    async login(@Body() user: UserLogin): Promise<ILogin> {
        const checkedUser = await this.authService.validate(user);
        if (!checkedUser) {
            throw new UnauthorizedException();
        }
        const userTologin = await this.authService.getAllUserParamsFromDB(user);
        return await this.authService.login(userTologin);

    }

    @Get('logout')
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    @UseGuards(AuthGuard('jwt'), TokenGuard)
    async logout(@Request() req) {
        const header = await this.authService.extractToken(req);
        await this.authService.logout(header);
        return {
            statusCode: 200,
            message: responseConstants.logoutSuccess,
        };
    }

    @Post('refresh/:token')
    @ApiImplicitParam({ name: 'token', type: String })
    @ApiResponse({ status: 201, description: '```Created```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    async refreshToken(@Param('token') token) {
        return await this.authService.refreshToken(token);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: '```Created```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    @ApiResponse({ status: 400, description: '```Bad Request```' })
    async register(@Body() newUser: UserDTO): Promise<ILogin> {
        const createdUser = await this.authService.register(newUser);
        return await this.authService.login(createdUser);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: '```Ok``` ' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    @UseGuards(AuthGuard('jwt'), TokenGuard)
    getProfile(@Request() req) {
        return {
            statusCode: 200,
            message: responseConstants.ok,
            objectId: Number(req.user.userId),
        };
    }

}
