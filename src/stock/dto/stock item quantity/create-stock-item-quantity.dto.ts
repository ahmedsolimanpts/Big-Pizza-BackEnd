import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockItemQuantityDto {
  @ApiProperty({
    description: 'The MongoDB ObjectId of the stock item',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  stock_item: string;

  @ApiProperty({
    description: 'The quantity of the stock item',
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
