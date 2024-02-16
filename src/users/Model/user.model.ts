import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import * as mongoose from 'mongoose';
import { AccountStatus } from 'src/users/enums/account-status.enums';
import { Roles } from 'src/auth/enums/roles.enums';
import { Location } from 'src/location/Model/location.model';

export type UserDocument = HydratedDocument<User>;

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

  @Prop({ type: mongoose.Types.ObjectId, ref: Location.name })
  locations: Location[];
}

export const UserSchema = SchemaFactory.createForClass(User);
