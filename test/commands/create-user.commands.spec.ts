import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand, CreateUserCommandHandler } from 'src/application/commands/create-user.command';
import { UserInfrastructure } from 'src/infrastructure/user.infrastructure';


let app: TestingModule;
let createUserCommandHandler: any
jest.mock('src/infrastructure/user.infrastructure', () => ({
    UserInfrastructure: jest.fn().mockImplementation(() => ({
        findByUserName: jest.fn().mockImplementation(() => null),
        save: jest.fn().mockImplementation(() => (
            {
                properties: ()  => ({
                    userName: 'test',
                    password: 'test',
                    rol: 'test',
                    id: 'test',
                    createdAt: 'test',
                }),
            }
        ))  
    }))  
}));

describe('CreateUserCommand', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [CreateUserCommandHandler,UserInfrastructure]
        }).compile();
        createUserCommandHandler = app.get<CreateUserCommandHandler>(CreateUserCommandHandler);
    });
    

    test('should create a user', async () => {
        const command = new CreateUserCommand('test','test','test');
        const result = await createUserCommandHandler.execute(command);
        expect(result).toEqual({
            id: 'test',
            userName: 'test',
            password: 'test',
            rol: 'test',
            createdAt: 'test',
        })
    });
    
});