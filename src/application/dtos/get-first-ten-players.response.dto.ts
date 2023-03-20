import { User } from "src/domain/aggregates/user";

export class GetFirstTenPlayersResponseDto {
    userName: string;
    points: number;
}


export class GetFirstResponse{
    static fromDomainToResponse = (domain: User,points:number): GetFirstResponse => {
        return {
            userName: domain.properties().userName,
            points: points
        }
    }
}