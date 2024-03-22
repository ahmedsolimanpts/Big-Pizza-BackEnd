import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Invoice {}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
