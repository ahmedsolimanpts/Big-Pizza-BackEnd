import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EmployeeTransactionDto {
  @ApiProperty({
    example: '1000',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'Boans For attuide',
  })
  @IsString()
  @IsOptional()
  notes: string;
}
