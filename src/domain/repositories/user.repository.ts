import { User } from "../aggregates/user";

export interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findByUserName(userName: string): Promise<User>;
    findFirstUsers(number:number): Promise<{
        userName: string;
        count: number;
    }[]>;
}