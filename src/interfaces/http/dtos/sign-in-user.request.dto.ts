import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SiginUserRequestDto {
    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    password: string;

}