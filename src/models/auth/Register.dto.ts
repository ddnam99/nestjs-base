import { Trim } from '$helpers/transformer.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true, example: 'string@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @ApiProperty({ required: true, example: 'Nam' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @ApiProperty({ required: true, example: 'Dương Đức' })
  lastName: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
