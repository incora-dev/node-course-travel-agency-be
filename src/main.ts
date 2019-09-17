import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
      .addBearerAuth('Authorization', 'header')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
