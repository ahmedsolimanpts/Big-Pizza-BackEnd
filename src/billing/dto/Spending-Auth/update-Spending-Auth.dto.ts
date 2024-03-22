import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSpendingAuthDto } from './create-Spending-Auth.dto';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export class UpdateSpendingAuthDto extends PartialType(CreateSpendingAuthDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Note about the authorization', required: false })
  note?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Type of authorization', required: false })
  type?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 100, required: false })
  amount?: number;

  @IsOptional()
  @IsString()
  @IsEnum(SpendingAuthorizationStatus)
  @ApiProperty({
    example: SpendingAuthorizationStatus.OPEN,
    enum: SpendingAuthorizationStatus,
    required: false,
  })
  status?: SpendingAuthorizationStatus;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439011', required: false })
  releasedby?: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439012', required: false })
  createby?: string;
}
