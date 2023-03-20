import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/domain/repositories/user.repository";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";

export class SignInUserCommand implements ICommand{
    constructor(
        public readonly userName: string,
        public readonly password: string
    ){}
}

@CommandHandler(SignInUserCommand)
export class SignInUserCommandHandler implements ICommandHandler<SignInUserCommand,{
    token: string;
}>{
    constructor(
        @Inject(UserInfrastructure)
        private repository: UserRepository,
        private jwt: JwtService
    ){}
    async execute(command: SignInUserCommand): Promise<{
        token: string;
    }> {
        const { userName, password } = command;
        const user = await this.repository.findByUserName(userName);
        if(!user){
            throw new BadRequestException('User not found');
        }
        if(!user.comparePassword(password)){
            throw new BadRequestException('Password is incorrect');
        }
        const token= this.jwt.sign({
            id: user.properties().id,
            userName: user.properties().userName,
            rol: user.properties().rol
        });
        return {
            token
        }
    }
}
