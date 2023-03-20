import { DBProvider } from "src/DBProvider";
import { UserWord } from "src/domain/aggregates/user-word";
import { UserWordRepository } from "src/domain/repositories/user-word.repository";
import { UserWordDTO } from "./dtos/user-word.dto";
import { UserWordEntity } from "./entities/user-word.entity";

export class UserWordInfrastucture implements UserWordRepository{
    async save(userWord:UserWord): Promise<void> {
        const userWordEntity = UserWordDTO.fromDomainToEntity(userWord);
        await DBProvider.manager.getRepository(UserWordEntity).save(userWordEntity);
    }
    async update(userWord:UserWord): Promise<void> {
        const userWordEntity = UserWordDTO.fromDomainToEntity(userWord);
        await DBProvider.manager.getRepository(UserWordEntity).update(userWordEntity.id, userWordEntity);
    }

    async findByUserIdAndWordId(userId: string, wordId: number): Promise<UserWord> {
        const userWord = await DBProvider.manager.getRepository(UserWordEntity).find({
            relations: ['user', 'word'],
            where: {
                user: {
                    id: userId
                },
                word: {
                    id: wordId
                }
            }
        });
        if(userWord.length > 0){
            return UserWordDTO.fromEntityToDomain(userWord[0]);
        }
        return null;
    }
}