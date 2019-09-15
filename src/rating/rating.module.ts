import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ratingProviders } from './rating.providers';
import { DatabaseModule } from '../core/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RatingController],
  providers: [RatingService, ...ratingProviders],
})
export class RatingModule {}
