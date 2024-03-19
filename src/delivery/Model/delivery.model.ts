import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Delivery {}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
