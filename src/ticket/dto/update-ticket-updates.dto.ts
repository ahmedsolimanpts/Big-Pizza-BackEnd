import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { CreateTicketUpdateDto } from './Create-Ticket-updates.dto';
import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTicketUpdatesDto extends PartialType(CreateTicketUpdateDto) {
  @ApiPropertyOptional({
    description: 'The Id of the User That Create Update',
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  createby?: string;

  @ApiPropertyOptional({
    description: 'The Id of the ticket',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  ticket?: string;

  @ApiPropertyOptional({ description: 'The description of the ticket' })
  @IsString()
  @IsOptional()
  description?: string;
}
