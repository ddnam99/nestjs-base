import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  message: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  height?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  width?: number;

  @IsOptional()
  @ApiProperty()
  mimeType?: string;

  @IsOptional()
  @ApiProperty()
  urlMeta?: string;

  @IsOptional()
  @ApiProperty()
  shareMeta?: string;

  @IsOptional()
  @ApiProperty()
  shareType?: string;
}
