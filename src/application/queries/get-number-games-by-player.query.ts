import { Inject } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";

export class GetNumberGamesByPlayerQuery implements IQuery {
    constructor(
        public readonly userId: string
    ) { }
}

@QueryHandler(GetNumberGamesByPlayerQuery)
export class GetNumberGamesByPlayerQueryHandler implements IQueryHandler<GetNumberGamesByPlayerQuery, {
    losserGames: number;
    winnerGames: number;
}> {
    constructor(
        @Inject(UserInfrastructure)
        private repository: UserInfrastructure
    ) { }
    async execute(query: GetNumberGamesByPlayerQuery): Promise<{
        losserGames: number;
        winnerGames: number;
    }> {
        const { userId } = query;
        const winnerGames = await this.repository.findNumberGamesCorrectByUserId(userId);
        const losserGames = await this.repository.findNumberGamesIncorrectByUserId(userId);
        return {
            winnerGames,
            losserGames 
        }
    }
}