import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountStatus } from 'src/users/enums/account-status.enums';
import { Roles } from 'src/auth/enums/roles.enums';

@Schema({
  timestamps: true,
})
export class User {
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

  @Prop({ required: true, default: false })
  is_valid_email: boolean;

  @Prop({ required: true, default: false })
  is_verified: boolean;

  @Prop({ required: true, default: false })
  isRegisteredWithGoogle: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
