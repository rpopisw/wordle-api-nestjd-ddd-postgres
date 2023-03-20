import { User } from "src/domain/aggregates/user";

export class CreateUserResponse{
    id: string;
    userName: string;
    password: string;
    rol: string;
    createdAt: Date;
}

export class CreateUserResponseDto{
    static fromDomainToResponse(user: User): CreateUserResponse{
        return {
            id: user.properties().id,
            userName: user.properties().userName,
            password: user.properties().password,
            rol: user.properties().rol,
            createdAt: user.properties().createdAt,
        }
    }
}