import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PagingQuery {
  @ApiProperty({ default: 0, format: 'int32' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  @ApiProperty({ default: 10, format: 'int32' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  take: number;
  @ApiProperty({ required: false })
  @IsOptional()
  search: string;
}
