import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone numbers of the customer',
    example: ['1234567890'],
    type: [String],
    isArray: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  phone: string[];

  @ApiPropertyOptional({
    description: 'Optional notes about the customer',
    example: 'Important client',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Optional Notification Phone for the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  notification_phone?: string;

  @ApiPropertyOptional({
    description: 'Optional Notification Email for the customer',

    required: false,
  })
  @IsOptional()
  @IsString()
  notification_email?: string;
}
