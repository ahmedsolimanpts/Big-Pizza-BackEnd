import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderType } from '../enums/Order-Types.enums';

@Schema()
export class TakeAwayOrder {
  order_type: OrderType = OrderType.TAKEAWAY;
}

export const TakeAwayOrderSchema = SchemaFactory.createForClass(TakeAwayOrder);
