import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { User } from 'src/users/Model/user.model';
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Department } from '../enums/department.enums';
import { Sex } from 'src/users/enums/Sex.enum';
import { Coordinates, Location } from 'src/location/Model/location.model';
import { Transaction } from '../enums/emp-transaction.enum';

@Schema({ timestamps: true })
export class Attendence {
  @Prop()
  action: AttendenceActions;

  @Prop({ type: Coordinates })
  location: Coordinates;

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
export class EmployeePDR {
  @Prop({ required: true })
  pdr: number;

  @Prop()
  details: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;
}

export const EmployeePDRSchema = SchemaFactory.createForClass(EmployeePDR);

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

  @Prop({ type: Location })
  addrees: Location;

  @Prop()
  ssid: number;

  @Prop()
  birthdate: Date;

  @Prop()
  bank_account: string;

  @Prop({ type: [EmployeePDR] })
  monthly_pdr: EmployeePDR[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
