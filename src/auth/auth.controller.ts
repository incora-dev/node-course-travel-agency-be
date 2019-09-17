import { Controller, Request, UseGuards, Body, Post, Get, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin, UserDTO } from '../users/dto/user.dto';
import { ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ILogin } from './interfaces/auth.interface';

@ApiUseTags('auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiResponse({ status: 201, description: '```Ok``` JWT token successfully generated' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 400, description: '```Bad Request```' })
    @Post('login')
    async login(@Body() user: UserLogin): Promise<ILogin> {
        const checkedUser = await this.authService.validate(user);
        if (!checkedUser) {
            throw new UnauthorizedException();
        }
        const userTologin = await this.authService.getAllUserParamsFromDB(user);
        return await this.authService.login(userTologin);

    }

    @ApiResponse({ status: 201, description: '```Created```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    @ApiResponse({ status: 400, description: '```Bad Request```' })
    @Post('register')
    async register(@Body() newUser: UserDTO): Promise<ILogin> {
        const createdUser = await this.authService.register(newUser);
        return await this.authService.login(createdUser);
    }

    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: '```Ok``` ' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

}
