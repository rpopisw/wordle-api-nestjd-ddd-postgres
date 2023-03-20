import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { MatchWordCommand } from "src/application/commands/match-word.command";
import { MatchWordResponseDto } from "src/application/dtos/match-word.response.dto";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { MatchWordRequestDto } from "./dtos/match-word.reques.dto";

@Controller('word')
@ApiTags('word')
export class WordController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Word' })
    @Post('/match')
    async matchWord(@Body() body: MatchWordRequestDto,@Req() req:any): Promise<MatchWordResponseDto[]> {
        const { word } = body;
        const { id } = req.user;
        const command = new MatchWordCommand(word,id);
        return this.commandBus.execute(command);
    }

}