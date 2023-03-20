import { UserWord } from "src/domain/aggregates/user-word";
import { UserWordEntity } from "../entities/user-word.entity";

export class UserWordDTO{
    static fromDomainToEntity(userWord: UserWord): UserWordEntity{
        const userWordEntity = new UserWordEntity();
        userWordEntity.id = userWord.properties().id;
        userWordEntity.word = userWord.properties().wordId as any; 
        userWordEntity.user = userWord.properties().userId as any;
        userWordEntity.isResolved = userWord.properties().isResolved;
        userWordEntity.createdAt = userWord.properties().createdAt;
        userWordEntity.updatedAt = userWord.properties().updatedAt;
        return userWordEntity;
    }

    static fromEntityToDomain(userWordEntity: UserWordEntity): UserWord{
        const userWord = new UserWord({
            id: userWordEntity.id,
            wordId: userWordEntity.word.id,
            userId: userWordEntity.user.id,
        });
        return userWord;
    }
}