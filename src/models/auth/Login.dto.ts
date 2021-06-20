import { Trim } from '$helpers/transformer.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true, example: 'string@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
