import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true })
export class TicketUpdates {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  user: string;

  @Prop()
  description: string;
}

export const TicketUpdatesSchema = SchemaFactory.createForClass(TicketUpdates);
