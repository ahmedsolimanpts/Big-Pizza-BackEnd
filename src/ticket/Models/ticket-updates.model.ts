import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { Ticket } from './ticket.model';

@Schema({ timestamps: true })
export class TicketUpdates {
  @Prop({ type: mongoose.Types.ObjectId, ref: Ticket.name })
  ticket: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop()
  description: string;
}

export const TicketUpdatesSchema = SchemaFactory.createForClass(TicketUpdates);
