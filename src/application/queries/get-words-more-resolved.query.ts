import { Inject } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Word } from "src/domain/aggregates/word";
import { WordInfrastructure } from "src/infrastructure/word.infrastructure";

export class GetWordsMoreResolvedQuery implements IQuery {
    constructor(
        public readonly limit: number
    ) { }
}

@QueryHandler(GetWordsMoreResolvedQuery)
export class GetWordsMoreResolvedQueryHandler implements IQueryHandler<GetWordsMoreResolvedQuery, Word[]> {
    constructor(
        @Inject(WordInfrastructure)
        private repository: WordInfrastructure
    ) { }
    async execute(query: GetWordsMoreResolvedQuery): Promise<Word[]> {
        const { limit } = query;
        const words = await this.repository.findWordsMoreResolved(limit);
        return words;
    }
}