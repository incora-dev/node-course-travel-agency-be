import { Module } from '@nestjs/common';
import { UserSeederService } from './usersSeeder.service';
import {DatabaseModule} from '../../../core/database.module';
import {UsersModule} from '../../../users/users.module';

@Module({
    imports: [DatabaseModule, UsersModule],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}
