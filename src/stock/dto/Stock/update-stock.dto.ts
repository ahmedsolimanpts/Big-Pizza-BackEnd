import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @ApiPropertyOptional({
    description: 'The ID of the branch to update',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  branch?: string;
}
