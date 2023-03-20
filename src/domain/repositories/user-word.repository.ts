import { UserWord } from "../aggregates/user-word";

export interface UserWordRepository {
    save(userWord:UserWord): Promise<void>;
    update(userWord:UserWord): Promise<void>;
    findByUserIdAndWordId(userId: string, wordId: number): Promise<UserWord>;
}