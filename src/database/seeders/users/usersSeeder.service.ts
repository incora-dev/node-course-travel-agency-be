import {Inject, Injectable} from '@nestjs/common';
import { UsersSeeds } from './data';
import { User } from '../../../users/user.entity';
import { Repository } from 'typeorm';
import {UserDTO} from '../../../users/dto/user.dto';
import {IUser} from '../../../users/interfaces/user.interface';

@Injectable()
export class UserSeederService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) { }

    create(): Array<Promise<IUser>> {
        return UsersSeeds.map(async (user: UserDTO) => {
            const userExist = await this.userRepository.findOne({ email: user.email });

            if (userExist) {
                return null;
            }

            return await this.userRepository.save(user);
        });
    }
}
