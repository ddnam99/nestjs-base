import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SetNicknameDto {
  @IsUUID()
  @ApiProperty({ required: true })
  userId: string;

  @IsOptional()
  @ApiProperty()
  nickname?: string;
}
