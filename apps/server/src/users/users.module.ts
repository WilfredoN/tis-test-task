import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { WeatherService } from 'src/weather/weather.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, WeatherService],
  controllers: [UsersController],
})
export class UsersModule {}
