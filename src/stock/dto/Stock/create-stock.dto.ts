import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStockItemLogsDto } from '../Stock Item Logs/create-Stock-Item-Logs.dto';

export class CreateStockDto {
  @ApiProperty({
    description: 'The ID of the branch',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  branch: string;

  @ApiProperty({
    description: 'List of stock item logs',
    type: CreateStockItemLogsDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateStockItemLogsDto)
  items?: CreateStockItemLogsDto[];
}
