import { User } from "src/domain/aggregates/user";
import { UserRepository } from "src/domain/repositories/user.repository";

export class UserInfrastructure implements UserRepository{
    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
     
}