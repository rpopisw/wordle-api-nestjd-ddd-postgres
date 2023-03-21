import { Test,TestingModule } from "@nestjs/testing";
import { GetNumberGamesByPlayerQueryHandler } from "src/application/queries/get-number-games-by-player.query";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";

let app: TestingModule
let userInfrastructure: UserInfrastructure
let getNumberGamesByPlayerQueryHandler: any

describe('GetNumberGamesByPlayerQuery', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [GetNumberGamesByPlayerQueryHandler, UserInfrastructure]
        }).compile();
        getNumberGamesByPlayerQueryHandler = app.get<GetNumberGamesByPlayerQueryHandler>(GetNumberGamesByPlayerQueryHandler);
        userInfrastructure = app.get<UserInfrastructure>(UserInfrastructure);
    })

    test('should get number games by player', async () => {

        const mockFind = jest
            .spyOn(userInfrastructure, 'findNumberGamesByUserId')
            .mockResolvedValueOnce(1)
        
        const mockFind2 = jest
            .spyOn(userInfrastructure, 'findNumberGamesCorrectByUserId')
            .mockResolvedValueOnce(1)
        
        const query = {
            userId: 'test'
        }


        const result = await getNumberGamesByPlayerQueryHandler.execute(query);

        expect(result).toEqual({
            totalGames: 1,
            winnerGames: 1
        })
    })
})