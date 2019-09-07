import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule} from '../core/database.module';
import {userProviders} from './user.providers';
import {UserIsExistMiddleware} from '../middlewares/user.isExist.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserIsExistMiddleware)
            .forRoutes(
                { path: 'users/:id', method: RequestMethod.GET },
                    { path: 'users/:id', method: RequestMethod.PUT },
                    { path: 'users/:id', method: RequestMethod.DELETE },
                    );
    }
}
