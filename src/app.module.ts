import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { ToursModule } from './tours/tours.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [UsersModule, AuthModule, ToursModule, CompaniesModule, HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
