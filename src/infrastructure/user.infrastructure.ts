import { DBProvider } from "src/DBProvider";
import { User } from "src/domain/aggregates/user";
import { UserRepository } from "src/domain/repositories/user.repository";
import { UserDTO } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository{
    async save(user: User): Promise<User> {
        const userEntity = UserDTO.fromDomainToEntity(user);
        const userSaved = await DBProvider.manager.getRepository(UserEntity).save(userEntity);
        const userDomain = UserDTO.fromEntityToDomain(userSaved);
        return userDomain;
    }
    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
     
}