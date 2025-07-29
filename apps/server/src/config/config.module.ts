import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import apiConfig from './api.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig],
    }),
  ],
})
export class ConfigModule {}
