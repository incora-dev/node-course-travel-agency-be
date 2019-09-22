import {Injectable, Inject, HttpException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {IUser} from './interfaces/user.interface';
import {UserDTO, UpdateUserDTO, UpdatePasswordDTO} from './dto/user.dto';
import * as bcrypt from 'bcrypt';

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

    async updateUser(id: number, data: UpdateUserDTO ): Promise<IUser> {
        return await this.userRepository.save({ ...data, id: Number(id) });
    }

    async updatePassword(id: number, data: UpdatePasswordDTO): Promise<IUser> {
    /*If user changes his password, we'll crypt it, before sending to DB */
        data.password = await bcrypt.hash(data.password, 10);
        return this.userRepository.save({ ...data, id: Number(id) });
    }

    async addToDB(user: UserDTO): Promise<IUser> {
        const email = user.email;
        const userFromDB = await this.getOneByParams({ email });
        if (userFromDB) {
            throw new HttpException('User exists!', 400);
        }
        const entity = Object.assign(new User(), user);
        return await this.userRepository.save(entity);
    }

    async getOneByParams(params: object): Promise<IUser> {
        return await this.userRepository.findOne(params);
    }
}
