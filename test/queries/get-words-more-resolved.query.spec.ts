import { Test, TestingModule } from "@nestjs/testing";
import { GetWordsMoreResolvedQueryHandler } from "src/application/queries/get-words-more-resolved.query";
import { Word } from "src/domain/aggregates/word";
import { WordInfrastructure } from "src/infrastructure/word.infrastructure";

let app: TestingModule;
let wordInfrastructure: WordInfrastructure;
let getWordsMoreResolvedQueryHandler: any;

describe('GetWordsMoreResolvedQuery', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [GetWordsMoreResolvedQueryHandler, WordInfrastructure]
        }).compile();
        getWordsMoreResolvedQueryHandler = app.get<GetWordsMoreResolvedQueryHandler>(GetWordsMoreResolvedQueryHandler);
        wordInfrastructure = app.get<WordInfrastructure>(WordInfrastructure);
    })

    test('should get words more resolved', async () => {
        
        const word = new Word({
            id: 1,
            word: 'test',
        })
        
        const mockFind = jest
            .spyOn(wordInfrastructure, 'findWordsMoreResolved')
            .mockResolvedValueOnce([
                word
            ])
        
        const query = {
            limit: 10
        }

        const result = await getWordsMoreResolvedQueryHandler.execute(query);

        expect(result).toEqual([
            word
        ])
})
})
