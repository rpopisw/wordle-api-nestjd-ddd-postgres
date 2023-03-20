import { Module } from '@nestjs/common';
import { HealthController } from './interfaces/http/health.controller';

const controllers = [ HealthController ];

@Module({
  imports: [],
  controllers: [ ...controllers],
  providers: [],
})
export class AppModule {}
