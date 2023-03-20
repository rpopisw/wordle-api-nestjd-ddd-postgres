import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './application/commands/create-user.command';
import { DBProvider } from './DBProvider';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { HealthController } from './interfaces/http/health.controller';
import { UserController } from './interfaces/http/user.controller';

const controllers = [ HealthController,UserController ];
const application = [ CreateUserCommandHandler];
const infrastructure = [ UserInfrastructure];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ ...controllers],
  providers: [DBProvider, ...application, ...infrastructure],
})
export class AppModule {}
