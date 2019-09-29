import {Injectable} from '@nestjs/common';
import { UsersSeeds } from './data';
import {UserDTO} from '../../../users/dto/user.dto';
import {IUser} from '../../../users/interfaces/user.interface';
import {UsersService} from '../../../users/users.service';

@Injectable()
export class UserSeederService {
    constructor( private readonly usersService: UsersService) {}

    create(): Array<Promise<IUser>> {
        return UsersSeeds.map(async (user: UserDTO) => {
            const userExist = await this.usersService.getOneByParams({ email: user.email });

            if (userExist) {
                return null;
            }

            return await this.usersService.addToDB(user);
        });
    }
}
