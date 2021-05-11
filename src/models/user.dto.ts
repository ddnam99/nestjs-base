import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Trim } from "utils/transformers";

export class RegisterDto {
    @IsEmail()
    @IsString()
    @ApiProperty({ required: true })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Trim()
    @ApiProperty({ required: true })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Trim()
    @ApiProperty({ required: true })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @ApiProperty({ required: true })
    password: string;
}