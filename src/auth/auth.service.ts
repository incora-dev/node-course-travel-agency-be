import * as bcrypt from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserLogin, UserDTO } from '../users/dto/user.dto';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async getAllUserParamsFromDB(user: UserLogin): Promise<IUser> {
        const email = user.email;
        return await this.usersService.getOneByParams({ email });
    }

    async register(newUser: UserDTO) {
        return await this.usersService.addToDB(newUser);
    }

    /*--- Local validation ----- */
    async validate(userData: UserLogin): Promise<any> {
        const email = userData.email;
        const user = await this.usersService.getOneByParams({ email });
        if (user) {
            return bcrypt.compare(userData.password, user.password);
        }
        return false;
    }

    /*--- Jwt sign (generates token) ---*/
    async login(user: any) {
        const payload = { role: user.role, email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user_id: user.id,
            status: 200,
        };
    }

}
