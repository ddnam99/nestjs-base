import { MessageType } from '$enums/chat.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsEnum(MessageType)
  @ApiProperty({ example: MessageType.MESSAGE })
  messageType?: MessageType;
}
