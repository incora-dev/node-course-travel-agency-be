import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {IUser} from './interfaces/user.interface';
import {UpdateUserDto, UserDTO} from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) { }

    async deleteUserById(id: number): Promise<IUser> {
      return await this.userRepository.remove( await this.userRepository.findOne(id) );
    }

    async getAllFromDB(): Promise<IUser[]> {
        return await this.userRepository.find();
    }

    async updateUser(id: number, data: UpdateUserDto ): Promise<IUser> {
        return await this.userRepository.save({ ...data, id: Number(id) });
    }

    async addToDB(user: UserDTO): Promise<IUser> {
        return await this.userRepository.save(user);
    }

    async getOneByParams(params: object): Promise<IUser> {
        return await this.userRepository.findOne(params);
    }
}
