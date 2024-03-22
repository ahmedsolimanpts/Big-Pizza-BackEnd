import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export class CreateSpendingAuthDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'This is a note about the spending authorization',
    required: false,
  })
  note?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 250,
    description: 'The amount for the spending authorization',
    required: true,
  })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SpendingAuthorizationStatus)
  @ApiProperty({
    example: SpendingAuthorizationStatus.CLOSE,
    enum: SpendingAuthorizationStatus,
    description: 'The status of the spending authorization',
    required: true,
  })
  status: SpendingAuthorizationStatus;
}
