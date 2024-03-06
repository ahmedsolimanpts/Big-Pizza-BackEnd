import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketCategory } from '../enums/Ticket-category.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketSegment } from '../enums/Ticket-Segment.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsNotEmpty()
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @IsNotEmpty()
  @IsEnum(TicketSegment)
  segment: TicketSegment;

  @IsString()
  @IsNotEmpty()
  description: string;
}
