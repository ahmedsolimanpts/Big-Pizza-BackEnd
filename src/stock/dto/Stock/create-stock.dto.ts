import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({
    description: 'The ID of the branch',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  branch: string;
}
