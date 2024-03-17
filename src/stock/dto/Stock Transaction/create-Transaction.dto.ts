import {
  ArrayMinSize,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Array of stock item quantities involved in the transaction',
    type: [CreateStockItemQuantityDto],
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateStockItemQuantityDto)
  items_quantity: CreateStockItemQuantityDto[];

  @ApiProperty({
    description: 'The MongoDB ObjectId of the branch transferring to',
    example: '507f191e810c19729de860ea',
  })
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  stock: string;
}
