import {Module, forwardRef} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule} from '../core/database.module';
import {userProviders} from './user.providers';
import {CompaniesModule} from '../companies/companies.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, CompaniesModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
