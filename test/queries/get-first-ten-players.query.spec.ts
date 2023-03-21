import { Test, TestingModule } from "@nestjs/testing";
import { GetFirstTenPlayersQueryHandler } from "src/application/queries/get-first-ten-players.query";
import { UserInfrastructure } from "src/infrastructure/user.infrastructure";

let app: TestingModule
let userInfrastructure: UserInfrastructure
let getFirstTenPlayersQueryHandler: any

describe('GetFirstTenPlayersQuery', () => {
    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [GetFirstTenPlayersQueryHandler, UserInfrastructure]
        }).compile();
        getFirstTenPlayersQueryHandler = app.get<GetFirstTenPlayersQueryHandler>(GetFirstTenPlayersQueryHandler);
        userInfrastructure = app.get<UserInfrastructure>(UserInfrastructure);
    })

    test('should get first ten players', async () => {
        const mockFind = jest
            .spyOn(userInfrastructure, 'findFirstUsers')
            .mockResolvedValueOnce([
                {
                    userName: 'test1',
                    count: 1
                },
                {
                    userName: 'test2',
                    count: 1

                },
                {
                    userName: 'test3',
                    count: 1

                },
                {
                    userName: 'test4',
                    count: 1

                }
            ])
        
        const query = {
            number: 10
        }

        const result = await getFirstTenPlayersQueryHandler.execute(query);

        expect(result).toEqual([
            {
                userName: 'test1',
                points: 1
            },
            {
                userName: 'test2',
                points: 1

            },
            {
                userName: 'test3',
                points: 1

            },
            {
                userName: 'test4',
                points: 1

            }
        ])
             
    })
})