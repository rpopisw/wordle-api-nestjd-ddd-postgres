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
}