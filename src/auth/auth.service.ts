import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserLogin, UserDTO } from '../users/dto/user.dto';
import { IUser } from '../users/interfaces/user.interface';
import { ILogin } from './interfaces/auth.interface';
import { getRepository } from 'typeorm';
import { User } from '../users/user.entity';
import Redis from './redis/redis';
import * as redis from 'redis';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly redis: Redis;
    constructor(
        private readonly usersService: UsersService,
        private readonly redisClient: redis.RedisClient,
    ) { this.redis = new Redis(redisClient); }

    async getAllUserParamsFromDB(user: UserLogin): Promise<IUser> {
        const email = user.email;
        return await this.usersService.getOneByParams({ email });
    }

    async register(newUser: UserDTO): Promise<IUser> {
        return await this.usersService.addToDB(newUser);
    }

    /*--- Local validation ----- */
    async validate(userData: UserLogin): Promise<boolean> {
        const user = await getRepository(User)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email: userData.email })
            .getRawOne();
        if (user) {
            return bcrypt.compare(userData.password, user.password);
        }
        return false;
    }

    /*--- Jwt sign (generates token) ---*/
    async login(user: any): Promise<ILogin> {
        const payload = { email: user.email, id: user.id };
        const accessToken = jwt.sign(payload, jwtConstants.accessTokenSecret, { expiresIn: jwtConstants.accessTokenExpTime });
        const refreshToken = jwt.sign(payload, jwtConstants.refreshTokenSecret, { expiresIn: jwtConstants.refreshTokenExpTime });
        await this.redis.setExp(user.id, refreshToken, 'EX', jwtConstants.redisRefreshTokenExpTime);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            objectId: user.id,
            status: 200,
        };
    }

    /*--- Jwt logout --- */
    async extractToken(req): Promise<string> {
        const header = req.headers.authorization;
        if (typeof header !== undefined) {
            const bearer = header.split(' ');
            const token = bearer[1];
            return String(token);
        }
    }
    async compareKey(firstKey: string): Promise<boolean> {
        const findKeyInRedis = await this.redis.get(firstKey);
        if (findKeyInRedis == null) {
            return false;
        } else {
            return true;
        }
    }
    async logout(token: string): Promise<void> {
        return await this.redis.setExp(token, 'true', 'EX', jwtConstants.redisAccessTokenExpTime);
    }
    /* --- Refresh token --- */
    async refreshToken(token: string): Promise<Object> {
        const decoded = jwt.verify(token, jwtConstants.refreshTokenSecret);
        /* tslint:disable:no-string-literal */
        const user = {
            id: decoded['id'],
            email: decoded['email'],
        };
        /* tslint:enable:no-string-literal */
        if (token && (await this.redis.get(user.id) === token)) {
            return await this.login(user);
        }
        throw new HttpException('Invalid refresh token!', HttpStatus.FORBIDDEN);
    }
}
