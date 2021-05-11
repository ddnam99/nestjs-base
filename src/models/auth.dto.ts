import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { Trim } from "utils/transformers";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({ required: true })
    username: string;

    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({ required: true })
    password: string;
}