import { DBProvider } from "src/DBProvider";
import { User } from "src/domain/aggregates/user";
import { UserRepository } from "src/domain/repositories/user.repository";
import { UserDTO } from "./dtos/user.dto";
import { UserWordEntity } from "./entities/user-word.entity";
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
    async findByUserName(userName: string): Promise<User> {
        const user = await DBProvider.manager.getRepository(UserEntity).find({
            where: {
                userName
            }
        });
        if(user.length > 0){
            return UserDTO.fromEntityToDomain(user[0]);
        }
        return null;
    }

    async findFirstUsers(number: number): Promise<{
        userName: string;
        count: number;
    }[]> {
        const users = await DBProvider.manager.getRepository(UserWordEntity).createQueryBuilder("userWord")
        .select("userWord.user", "user")
        .addSelect("user.userName", "userName")
        .addSelect("COUNT(userWord.user)", "count")
        .innerJoin("userWord.user", "user")
        .where("userWord.isResolved = :isResolved", {isResolved: true})
        .groupBy("userWord.user")
        .addGroupBy("user.userName")
        .orderBy("count", "DESC")
        .limit(number)
        .getRawMany();
        return users.map(user => {
            return {
                userName: user.userName,
                count: user.count
            }
        });
    }

    async findNumberGamesCorrectByUserId(userId: string): Promise<number> {
        const user = await DBProvider.manager.getRepository(UserEntity).find({
            relations: ['userWords'],
            where: {
                id: userId,
                userWords: {
                    isResolved: true
                }
            }
        });
        if(user.length > 0){
            return user[0].userWords.length;
        }
        return 0;
    }

    async findNumberGamesByUserId(userId: string): Promise<number> {
        const user = await DBProvider.manager.getRepository(UserEntity).find({
            relations: ['userWords'],
            where: {
                id: userId
            }
        });
        if(user.length > 0){
            return user[0].userWords.length;
        }
        return 0;
    }
     
}