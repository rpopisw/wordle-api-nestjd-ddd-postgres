import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand, CreateUserCommandHandler } from 'src/application/commands/create-user.command';
import { User } from 'src/domain/aggregates/user';
import { UserInfrastructure } from 'src/infrastructure/user.infrastructure';


let app: TestingModule;
let createUserCommandHandler: any
let userInfrastructure: UserInfrastructure;

describe('CreateUserCommand', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [CreateUserCommandHandler, UserInfrastructure]
        }).compile();
        createUserCommandHandler = app.get<CreateUserCommandHandler>(CreateUserCommandHandler);
        userInfrastructure = app.get<UserInfrastructure>(UserInfrastructure);

    });


    test('should create a user', async () => {

        const date = new Date('2020-01-01');
        global.Date = jest.fn(() => date) as any;
        
        const user = new User({
            userName: 'test',
            password: 'test',
            rol: 'test',
            id: 'test',
        });
    
        const mockFindByUserName = jest
            .spyOn(userInfrastructure, 'findByUserName')
            .mockResolvedValueOnce(null);

        const mockSave = jest
            .spyOn(userInfrastructure, 'save')
            .mockResolvedValueOnce(user)
        const command = new CreateUserCommand('test', 'test', 'test');
        const result = await createUserCommandHandler.execute(command);
        expect(result).toEqual({
            id: 'test',
            userName: 'test',
            password: 'test',
            rol: 'test',
            createdAt: new Date('2020-01-01'),
        })
    });

    test('should throw an error if user already exists', async () => {
        const command = new CreateUserCommand('test', 'test', 'test');
        const user = new User({
            userName: 'test',
            password: 'test',
            rol: 'test',
            id: 'test',
        });
        const mockFindByUserName = jest
            .spyOn(userInfrastructure, 'findByUserName')
            .mockResolvedValueOnce(user);
        await expect(createUserCommandHandler.execute(command)).rejects.toThrowError('User already exists');
    });

});