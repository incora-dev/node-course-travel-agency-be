import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import { IUser } from './interfaces/user.interface';
import {UpdateUserDto} from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) {}

    async updateUser(id: number, data: UpdateUserDto ): Promise<IUser> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.save({ ...data, id: Number(id) });
    }
}
