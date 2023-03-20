import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DBProvider } from './DBProvider';
import { HealthController } from './interfaces/http/health.controller';

const controllers = [ HealthController ];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ ...controllers],
  providers: [DBProvider],
})
export class AppModule {}
