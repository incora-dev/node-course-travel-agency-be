import {MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule} from '../core/database.module';
import {userProviders} from './user.providers';
import {UserIsExistMiddleware} from '../middlewares/user.isExist.middleware';
import {CompaniesModule} from '../companies/companies.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, CompaniesModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserIsExistMiddleware)
            .forRoutes(
                { path: 'users/:id', method: RequestMethod.GET },
                    // { path: 'users', method: RequestMethod.PUT },
                    // { path: 'users/password', method: RequestMethod.PUT },
                    // { path: 'users', method: RequestMethod.DELETE },
                    );
    }
}
