import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { SpendingAuthorizationStatus } from '../../enum/SpendingAuthorization-status.enum';
import { EmployeeSpendingAuthorization } from './Emp-Spending-Auth.model';
import { InvoiceSpendingAuthorization } from './Invoice-Spending-Auth.model';

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class SpendingAuthorization {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  note: string;

  @Prop({ required: true, default: SpendingAuthorizationStatus.CLOSE })
  status: SpendingAuthorizationStatus;

  @Prop({
    required: true,
    enum: [
      EmployeeSpendingAuthorization.name,
      InvoiceSpendingAuthorization.name,
    ],
  })
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  releasedby: string;
}

export const SpendingAuthorizationSchema = SchemaFactory.createForClass(
  SpendingAuthorization,
);
