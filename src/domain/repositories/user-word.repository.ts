import { UserWord } from "../aggregates/user-word";

export interface UserWordRepository {
    save(userWord:UserWord): Promise<void>;
}