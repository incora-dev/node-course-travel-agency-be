import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ratingProviders } from './rating.providers';
import { DatabaseModule } from '../core/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RatingController],
  providers: [RatingService, ...ratingProviders],
})
export class RatingModule {}
