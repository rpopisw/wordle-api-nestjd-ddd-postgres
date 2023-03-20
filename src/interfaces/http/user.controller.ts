import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/application/commands/create-user.command";
import { SignInUserCommand } from "src/application/commands/sign-in-user.command";
import { GetFirstTenPlayersQuery } from "src/application/queries/get-first-ten-players.query";
import { GetNumberGamesByPlayerQuery } from "src/application/queries/get-number-games-by-player.query";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { CreateUserRequestDto } from "./dtos/crate-user.request.dto";
import { SiginUserRequestDto } from "./dtos/sign-in-user.request.dto";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @ApiResponse({ status: 201, description: 'User created' })
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createUser(@Body() body: CreateUserRequestDto) {
        const { userName, password,rol } = body;
        const command = new CreateUserCommand(userName, password,rol);
        return this.commandBus.execute(command);
    }

    @ApiResponse({ status: 201, description: 'User sign in ' })
    @UseGuards(JwtAuthGuard)
    @Post('/sign-in')
    async signIn(@Body() body: SiginUserRequestDto) {
        const { userName, password } = body;
        const command = new SignInUserCommand(userName, password);
        return this.commandBus.execute(command);
    }

    @ApiResponse({ status:200, description: 'First 10 users with maxim points' })
    @UseGuards(JwtAuthGuard)
    @Get('/max-points')
    async getFirstTenUsers(@Query('number') number: number) {
        const query = new GetFirstTenPlayersQuery(number);
        return await this.queryBus.execute(query);
    }

    @ApiResponse({ status:200, description: 'Get winner games and losser games' })
    @UseGuards(JwtAuthGuard)
    @Get('/report-games/:userId')
    async getNumberGamesByPlayer(@Param('userId') userId: string) {
        const query = new GetNumberGamesByPlayerQuery(userId);
        return await this.queryBus.execute(query);
    }
}