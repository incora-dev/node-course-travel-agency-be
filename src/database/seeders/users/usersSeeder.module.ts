import { Module } from '@nestjs/common';
import { UserSeederService } from './usersSeeder.service';
import {userProviders} from '../../../users/user.providers';
import {DatabaseModule} from '../../../core/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [...userProviders, UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}
