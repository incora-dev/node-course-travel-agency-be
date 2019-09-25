import { Module, Logger } from '@nestjs/common';
import { Seeder } from './seeder';
import { UserSeederModule } from './users/usersSeeder.module';
import {DatabaseModule} from '../../core/database.module';

@Module({
    imports: [
        DatabaseModule,
        UserSeederModule,
    ],
    providers: [Logger, Seeder],
})
export class SeederModule {}
