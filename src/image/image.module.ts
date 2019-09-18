import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { DatabaseModule } from '../core/database.module';
import { imageProviders } from './image.providers';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DatabaseModule, MulterModule.register({
    dest: './files',
  })],
  controllers: [ImageController],
  providers: [ImageService, ...imageProviders],
})
export class ImageModule {}
