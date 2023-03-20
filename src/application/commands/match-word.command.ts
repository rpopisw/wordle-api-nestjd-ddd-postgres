import { Inject } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { UserWord } from "src/domain/aggregates/user-word";
import { UserWordRepository } from "src/domain/repositories/user-word.repository";
import { WordRepository } from "src/domain/repositories/word.repository";
import { UserWordInfrastucture } from "src/infrastructure/user-word.infrastructure";
import { WordInfrastructure } from "src/infrastructure/word.infrastructure";
import { MatchWordResponseDto } from "../dtos/match-word.response.dto";

export class MatchWordCommand implements ICommand {
    constructor(
        public readonly word: string,
        public readonly userId: string
    ) { }
}

@CommandHandler(MatchWordCommand)
export class MatchWordCommandHandler implements ICommandHandler<MatchWordCommand, MatchWordResponseDto[]> {
    constructor(
        @Inject(WordInfrastructure)
        private repository: WordRepository,
        @Inject(UserWordInfrastucture)
        private wordUserRepository: UserWordRepository
    ) { }
    async execute(command: MatchWordCommand): Promise<MatchWordResponseDto[]> {
        const { word, userId } = command;
        let wordSelected = await this.repository.findLastWordByUserId(userId);
        if (!wordSelected) {
            wordSelected = await this.repository.findWordByUserId(userId);
            const userWordSaved = new UserWord({ wordId: wordSelected.properties().id, userId });
            userWordSaved.attemptsCount();
            await this.wordUserRepository.save(userWordSaved);
        } else {
            const userWord = await this.wordUserRepository.findByUserIdAndWordId(userId,wordSelected.properties().id);
            userWord.attemptsCount();
            await this.wordUserRepository.update(userWord);
        }
        console.log(wordSelected.properties().word);
        const response = this.getValue(word, wordSelected.properties().word);
        if(response.length === 0){
            const userWord = await this.wordUserRepository.findByUserIdAndWordId(userId,wordSelected.properties().id);
            userWord.resolve();
            await this.wordUserRepository.update(userWord);   
        }
        return response;
    }

    getValue(word: string, selectedWord: string): [] {
        let response = [] as any;
        let correct = 0;
        for (let i = 0; i < selectedWord.length; i++) {
            if (word[i] === selectedWord[i]) {
                response.push({
                    letter: word[i],
                    value: 1
                });
                correct++;
            }
            else if (selectedWord.includes(word[i])) {
                response.push({
                    letter: word[i],
                    value: 2
                });
            }
            else if (!selectedWord.includes(word[i])) {
                response.push({
                    letter: word[i],
                    value: 3
                });
            }
        }
        if (correct === selectedWord.length) {
            response = [];
        }
        return response;

    }
}