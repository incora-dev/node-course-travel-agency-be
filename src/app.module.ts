import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { ToursModule } from './tours/tours.module';
import { CompaniesModule } from './companies/companies.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServicesModule } from './services/services.module';
import { AddressModule } from './address/address.module';
import { RatingModule } from './rating/rating.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UsersModule, AuthModule, ToursModule, CompaniesModule, HotelModule, RoomsModule,
  ServicesModule, AddressModule, RatingModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
