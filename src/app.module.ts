import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserCommandHandler } from './application/commands/create-user.command';
import { SignInUserCommandHandler } from './application/commands/sign-in-user.command';
import { DBProvider } from './DBProvider';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { HealthController } from './interfaces/http/health.controller';
import { UserController } from './interfaces/http/user.controller';

const controllers = [ HealthController,UserController ];
const application = [ CreateUserCommandHandler, SignInUserCommandHandler];
const infrastructure = [ UserInfrastructure];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ ...controllers],
  providers: [DBProvider, ...application, ...infrastructure],
})
export class AppModule {}
