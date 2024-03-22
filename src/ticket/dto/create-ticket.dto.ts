import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketCategory } from '../enums/Ticket-category.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketSegment } from '../enums/Ticket-Segment.enum';
import { ApiProperty } from '@nestjs/swagger';
import { TicketsPool } from '../enums/Ticket-Pool.enum';

export class CreateTicketDto {
  @ApiProperty({ enum: TicketStatus, description: 'The status of the ticket' })
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @ApiProperty({
    enum: TicketCategory,
    description: 'The category of the ticket',
  })
  @IsNotEmpty()
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @ApiProperty({
    enum: TicketsPool,
    description: 'The Pool of the ticket',
  })
  @IsNotEmpty()
  @IsEnum(TicketsPool)
  pool: TicketsPool;

  @ApiProperty({
    enum: TicketSegment,
    description: 'The segment of the ticket',
  })
  @IsNotEmpty()
  @IsEnum(TicketSegment)
  segment: TicketSegment;

  @ApiProperty({ description: 'The description of the ticket' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
