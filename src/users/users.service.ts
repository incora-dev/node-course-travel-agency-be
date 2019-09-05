import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllFromDB(): Promise<IUser[]> {
        return await this.userRepository.find();
    }
}
