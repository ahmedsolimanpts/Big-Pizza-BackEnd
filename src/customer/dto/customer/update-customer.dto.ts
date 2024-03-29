import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsString, ArrayMinSize } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiPropertyOptional({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The phone numbers of the customer',
    example: ['1234567890'],
    type: [String],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  phone?: string[];

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
