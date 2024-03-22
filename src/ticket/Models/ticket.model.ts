import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TicketStatus } from '../enums/ticket-status.enum';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { Branch } from 'src/branch/Model/branch.model';
import { TicketCategory } from '../enums/Ticket-category.enum';
import { TicketSegment } from '../enums/Ticket-Segment.enum';
import { TicketsPool } from '../enums/Ticket-Pool.enum';

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  branch: string;

  @Prop({ required: true, defalt: TicketsPool.HR })
  pool: TicketsPool;

  @Prop({ required: true, default: TicketCategory.IMPROVE })
  category: TicketCategory;

  @Prop({ required: true, default: TicketSegment.NORMAL })
  segment: TicketSegment;

  @Prop({ required: true })
  description: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
