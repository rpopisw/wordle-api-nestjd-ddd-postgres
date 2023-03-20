import { Word } from "../aggregates/word";

export interface WordRepository {
    findWordByUserId(userId: string): Promise<Word>;
    findLastWordByUserId(userId: string): Promise<Word>;
}