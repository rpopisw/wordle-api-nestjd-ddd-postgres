import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class CreateUserRequestDto {
    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty({ enum: ['admin', 'user'] })
    @IsEnum(['admin', 'user'], { message: 'rol must be admin or user' })
    @IsString()
    rol: string;
}