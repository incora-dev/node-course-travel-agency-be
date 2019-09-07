import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import { IUser } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllFromDB(): Promise<IUser[]> {
        return await this.userRepository.find();
    }

    async getOneByParams(params: object): Promise<IUser> {
        return await this.userRepository.findOne(params);
    }

    async addToDB(user: UserDTO): Promise<IUser> {
        return await this.userRepository.save(user);
    }

    async getOneByParams(params: object): Promise<IUser> {
        const user = await this.userRepository.findOne(params);
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
