import { Inject } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";
import { GetFirstTenPlayersResponseDto } from "../dtos/get-first-ten-players.response.dto";

export class GetFirstTenPlayersQuery implements IQuery {
    constructor(
        public readonly number: number,
    ) { }
}

@QueryHandler(GetFirstTenPlayersQuery)
export class GetFirstTenPlayersQueryHandler implements IQueryHandler<GetFirstTenPlayersQuery,GetFirstTenPlayersResponseDto[]> {
    constructor(
        @Inject(UserInfrastructure)
        private repository: UserInfrastructure
    ){}
    
    async execute(query: GetFirstTenPlayersQuery): Promise<GetFirstTenPlayersResponseDto[]> {
        const { number } = query;
        const users = await this.repository.findFirstUsers(number);
        console.log(users);
        const response = users.map(user => {
            return {
                userName: user.userName,
                points: user.count
            }
        })
        return response;
    }
}