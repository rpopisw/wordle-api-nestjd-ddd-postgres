import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { User } from "src/domain/aggregates/user";
import { UserRepository } from "src/domain/repositories/user.repository";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";
import { CreateUserResponseDto } from "../dtos/create-user.response.dto";

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly userName: string,
        public readonly password: string,
        public readonly rol: string,
    ){}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand,CreateUserResponseDto> {
    constructor(
        @Inject(UserInfrastructure)
        private repository: UserRepository
    ){}
    async execute(command: CreateUserCommand): Promise<CreateUserResponseDto> {
        const { userName, password, rol } = command;
        const userExists = await this.repository.findByUserName(userName);
        if(userExists){
            throw new BadRequestException('User already exists');
        }
        const user = new User({ userName, password, rol });
        user.encryptPassword();
        const userCreated = await this.repository.save(user);
        return CreateUserResponseDto.fromDomainToResponse(userCreated);
    }
}