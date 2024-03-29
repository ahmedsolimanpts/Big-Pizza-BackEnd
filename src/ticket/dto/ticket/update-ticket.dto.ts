import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { TicketSegment } from '../../enums/Ticket-Segment.enum';
import { TicketCategory } from '../../enums/Ticket-category.enum';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { TicketsPool } from '../../enums/Ticket-Pool.enum';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({
    enum: TicketStatus,
    description: 'The status of the ticket',
  })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({
    enum: TicketCategory,
    description: 'The category of the ticket',
  })
  @IsOptional()
  @IsEnum(TicketCategory)
  category?: TicketCategory;

  @ApiPropertyOptional({
    enum: TicketSegment,
    description: 'The segment of the ticket',
  })
  @IsOptional()
  @IsEnum(TicketSegment)
  segment?: TicketSegment;

  @ApiPropertyOptional({
    enum: TicketsPool,
    description: 'The Pool of the ticket',
  })
  @IsOptional()
  @IsEnum(TicketsPool)
  pool?: TicketsPool;

  @ApiPropertyOptional({
    description: 'The Mongo ID of the user who created the ticket',
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  createby?: string;

  @ApiPropertyOptional({ description: 'The Mongo ID of the branch' })
  @IsOptional()
  @IsMongoId()
  @IsString()
  branch?: string;

  @ApiPropertyOptional({ description: 'The description of the ticket' })
  @IsString()
  @IsOptional()
  description?: string;
}
