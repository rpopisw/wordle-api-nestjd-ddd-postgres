import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { SignInUserCommandHandler } from "src/application/commands/sign-in-user.command";
import { User } from "src/domain/aggregates/user";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";

let app: TestingModule;
let signInCommandHandler: any;
let userInfrastructure: UserInfrastructure
let jwtService: JwtService;

describe('SignInUserCommand', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [JwtModule],
            providers: [SignInUserCommandHandler, UserInfrastructure]
        }).compile();
        signInCommandHandler = app.get<SignInUserCommandHandler>(SignInUserCommandHandler);
        userInfrastructure = app.get<UserInfrastructure>(UserInfrastructure);
        jwtService = app.get<JwtService>(JwtService);

    });

    test('should sign in a user', async () => {

        const user = new User({
            userName: 'test',
            password: 'test',
            rol: 'test',
        });

        const mockFindByUserName = jest
            .spyOn(userInfrastructure, 'findByUserName')
            .mockResolvedValueOnce(user);

        const mockComparePassword = jest
            .spyOn(user, 'comparePassword')
            .mockResolvedValueOnce(true as never);

        const mockSign = jest
            .spyOn(jwtService, 'sign')
            .mockReturnValueOnce('token');


        const command = {
            userName: 'test',
            password: 'test'
        }
        const result = await signInCommandHandler.execute(command);
        expect(result).toEqual({
            token: 'token'
        });
    });
});