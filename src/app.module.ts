import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserCommandHandler } from './application/commands/create-user.command';
import { MatchWordCommandHandler } from './application/commands/match-word.command';
import { SignInUserCommandHandler } from './application/commands/sign-in-user.command';
import { GetFirstTenPlayersQueryHandler } from './application/queries/get-first-ten-players.query';
import { DBProvider } from './DBProvider';
import { UserWordInfrastucture } from './infrastructure/user-word.infrastructure';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { WordInfrastructure } from './infrastructure/word.infrastructure';
import { HealthController } from './interfaces/http/health.controller';
import { UserController } from './interfaces/http/user.controller';
import { WordController } from './interfaces/http/word.controller';

const controllers = [ HealthController,UserController,WordController ];
const application = [ CreateUserCommandHandler, SignInUserCommandHandler, MatchWordCommandHandler, GetFirstTenPlayersQueryHandler];
const infrastructure = [ UserInfrastructure,WordInfrastructure, UserWordInfrastucture];

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
