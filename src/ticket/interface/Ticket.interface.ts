import { TicketUpdates } from '../Models/ticket-updates.model';
import { TicketSegment } from '../enums/Ticket-Segment.enum';
import { TicketCategory } from '../enums/Ticket-category.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export interface TicketInterface {
  status: TicketStatus;

  createby: string;

  branch: string;

  category: TicketCategory;

  segment: TicketSegment;

  description: string;

  updates?: TicketUpdates[];
}
