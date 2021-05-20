import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'utils/transformers';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true })
  titleEmail: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  typeEmail: string;
}
