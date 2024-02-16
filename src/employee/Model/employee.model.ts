import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { User } from 'src/users/Model/user.model';
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Department } from '../enums/department.enums';
import { Sex } from 'src/users/enums/Sex.enum';
import { Location } from 'src/location/Model/location.model';
import { Transaction } from '../enums/emp-transaction.enum';

@Schema({ timestamps: true })
export class Attendence {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  action: AttendenceActions;

  @Prop()
  location: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  signby: string;

  @Prop()
  phone: string;

  @Prop()
  note: string;
}

export const AttendenceSchema = SchemaFactory.createForClass(Attendence);

@Schema({ timestamps: true })
export class EmployeeTransactions {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ required: true })
  transaction: Transaction;
  @Prop()
  notes: string;
}

export const EmployeeTransactionsSchema =
  SchemaFactory.createForClass(EmployeeTransactions);

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  join_at: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  working_in: string;

  @Prop({ type: [Attendence] })
  attendence: Attendence[];

  @Prop({ required: true })
  department: Department;

  @Prop({ required: true })
  base_salary: number;

  @Prop({
    type: [EmployeeTransactions],
  })
  transaction: EmployeeTransactions[];

  @Prop({ required: true })
  phones: string[];

  @Prop({ default: Sex.MALE })
  gender: Sex;

  @Prop()
  addrees: Location;

  @Prop()
  ssid: number;

  @Prop()
  birthdate: Date;

  @Prop()
  bank_account: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
