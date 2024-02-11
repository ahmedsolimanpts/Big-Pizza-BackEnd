import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import * as mongoose from 'mongoose';
import { AccountStatus } from 'src/users/enums/account-status.enums';
import { Roles } from 'src/auth/enums/roles.enums';
import { Attendence } from '../interfaces/attendence.interface';
// import { Branch } from 'src/branch/Model/branch.model';
// import { Department } from '../enums/departments.enums';
import { Location } from 'src/location/Model/location.model';

export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class Employee {
//   @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Branch.name })
//   worksin: string;

//   @Prop({ required: true })
//   department: Department;

//   @Prop({ required: true })
//   startDate: Date;

//   @Prop({ required: true })
//   salary: number;

//   @Prop({ required: true })
//   notes: string;

//   @Prop({ required: true })
//   birthdate: Date;

//   @Prop({ required: true, unique: true })
//   ssn: string;
// }

// export const EmployeeSchema = SchemaFactory.createForClass(Employee);

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Roles.USER })
  roles: Roles[];

  @Prop()
  refreshToken: string;

  @Prop({ default: AccountStatus.ACTIVE, required: true })
  status: AccountStatus;

  @Prop()
  attendence: Attendence[];

  // @Prop({ type: EmployeeSchema })
  // employee: Employee;

  @Prop({ type: mongoose.Types.ObjectId, ref: Location.name })
  locations: Location[];
}

export const UserSchema = SchemaFactory.createForClass(User);
