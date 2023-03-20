import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength, MinLength } from "class-validator";

export class MatchWordRequestDto {
    @ApiProperty()
    @IsString()
    @Length(5, 5, { message: 'word must be 5 characters long' })
    word: string;
}