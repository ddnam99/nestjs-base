import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPresignedUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  filename: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  contentType: string;
}
