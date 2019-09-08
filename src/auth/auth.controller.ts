import { Controller, Request, UseGuards, Body, Post, Get, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin, UserDTO } from '../users/dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiResponse({ status: 200, description: '```Ok``` JWT token successfully generated' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Post('login')
    async login(@Body() user: UserLogin) {
        const checkedUser = await this.authService.validate(user);
        if (!checkedUser) {
            throw new UnauthorizedException();
        }
        const userTologin = await this.authService.getAllUserParamsFromDB(user);
        return await this.authService.login(userTologin);

    }

    @ApiResponse({ status: 201, description: 'The User has been successfully registered.' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 400, message: "User exists!" }```' })
    @Post('register')
    async register(@Body() newUser: UserDTO) {
        return await this.authService.register(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: '```Ok``` ' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

}
