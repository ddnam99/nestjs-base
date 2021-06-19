import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  thumbnail: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  members: string[];
}
