import { User } from "src/domain/aggregates/user";
import { UserEntity } from "../entities/user.entity";

export class UserDTO{

    static fromDomainToEntity(user: User): UserEntity{
        const userEntity = new UserEntity();
        userEntity.id = user.properties().id;
        userEntity.userName = user.properties().userName;
        userEntity.password = user.properties().password;
        userEntity.rol = user.properties().rol;
        userEntity.createdAt = user.properties().createdAt;
        userEntity.updatedAt = user.properties().updatedAt;
        return userEntity;
    }

    static fromEntityToDomain(userEntity: UserEntity): User{
        const user = new User({
            id: userEntity.id,
            userName: userEntity.userName,
            password: userEntity.password,
            rol: userEntity.rol,
        });
        return user;
    }

    static fromEntityToDomainWithPoints(userEntity: UserEntity, points: number): {
        userName: string;
        points: number;
    }{
        const user = {
            userName: userEntity.userName,
            points: points
        }
        return user;
    }

}