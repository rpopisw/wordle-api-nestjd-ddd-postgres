import { DBProvider } from "src/DBProvider";
import { Word } from "src/domain/aggregates/word";
import { WordRepository } from "src/domain/repositories/word.repository";
import { WordEntity } from "./entities/word.entity";

export class WordInfrastructure implements WordRepository {
    async findWordByUserId(userId: string): Promise<Word> {
        const dateNowLessFiveMinutes = new Date();
        const hours = dateNowLessFiveMinutes.getHours();
        const minutes = dateNowLessFiveMinutes.getMinutes()-5;
        const seconds = dateNowLessFiveMinutes.getSeconds();
        const year = dateNowLessFiveMinutes.getFullYear();
        const month = dateNowLessFiveMinutes.getMonth();
        const day = dateNowLessFiveMinutes.getDate();
        const dateNowLessFiveMinutesString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const word = await DBProvider.manager.getRepository(WordEntity).query(`
        SELECT *
        FROM words
        WHERE LENGTH(word) = 5
        AND id NOT IN (
          SELECT word_id
          FROM user_words
          WHERE created_at > '${dateNowLessFiveMinutesString}'
          AND user_id = '${userId}'
        )
        ORDER BY RANDOM()
        LIMIT 1;
        `);
        if (word.length > 0) {
            return new Word(word[0]);
        }
        return null;
    }

    async findLastWordByUserId(userId: string): Promise<Word> {
        const dateNowLessFiveMinutes = new Date();
        const hours = dateNowLessFiveMinutes.getHours();
        const minutes = dateNowLessFiveMinutes.getMinutes()-5;
        const seconds = dateNowLessFiveMinutes.getSeconds();
        const year = dateNowLessFiveMinutes.getFullYear();
        const month = dateNowLessFiveMinutes.getMonth() + 1 > 9 ? dateNowLessFiveMinutes.getMonth() + 1 : `0${dateNowLessFiveMinutes.getMonth() + 1}`;
        const day = dateNowLessFiveMinutes.getDate();
        const dateNowLessFiveMinutesString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const word = await DBProvider.manager.getRepository(WordEntity).query(`
          SELECT words.word as word,words.id as id from user_words
          join words on words.id = user_words.word_id
          WHERE user_id = '${userId}'
          and created_at > '${dateNowLessFiveMinutesString}'
          ORDER BY created_at DESC;
        `);
        if (word.length > 0) {
            return new Word(word[0]);
        }
        return null;
    }
}