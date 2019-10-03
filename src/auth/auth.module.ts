import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import * as redis from 'redis';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy, redis.RedisClient],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
