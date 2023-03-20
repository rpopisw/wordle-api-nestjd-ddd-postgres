import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/application/commands/create-user.command";
import { CreateUserRequestDto } from "./dtos/crate-user.request.dto";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @ApiResponse({ status: 201, description: 'User created' })
    @Post('/')
    async createUser(@Body() body: CreateUserRequestDto) {
        const { userName, password,rol } = body;
        const command = new CreateUserCommand(userName, password,rol);
        return this.commandBus.execute(command);
    }
}