import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { HotelModule } from './hotel/hotel.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const optionsUsers = new DocumentBuilder()
      .setTitle('Travel agency API')
      .setVersion('1.0')
      .addTag('users')
      .addBearerAuth('Authorization', 'header')
      .build();
  const documentUsers = SwaggerModule.createDocument(app, optionsUsers, {
    include: [UsersModule]
  });
  SwaggerModule.setup('api/users', app, documentUsers);

  const optionsHotel = new DocumentBuilder()
    .setTitle('Travel agency API')
    .setVersion('1.0')
    .addTag('Hotel')
    .addBearerAuth('Authorization', 'header')
    .build();
  const documentHotel = SwaggerModule.createDocument(app, optionsHotel, {
    include: [HotelModule]
  });
  SwaggerModule.setup('api/hotel', app, documentHotel);


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
