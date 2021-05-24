import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ required: true })
  newPassword: string;
}
