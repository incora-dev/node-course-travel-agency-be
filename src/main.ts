import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Travel agency API')
      .setVersion('1.0')
      .addTag('users')
      .addTag('auth')
      .addTag('companies')
      .addTag('tours')
      .addTag('hotel')
      .addTag('address')
      .addTag('rating')
      .addTag('rooms')
      .addTag('image')
      .addBearerAuth('Authorization', 'header')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '/../files'));
  await app.listen(3000);
}
bootstrap();
