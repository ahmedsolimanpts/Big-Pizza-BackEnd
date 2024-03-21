import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Model/user.model';
import { LocationModule } from 'src/location/location.module';
import { VerifyEmailService } from './service/verify-email.service';
import {
  VerifyUserEmail,
  VerifyUserEmailSchema,
} from './Model/verify-user-email.model';
import { MailModule } from 'src/mail/mail.module';
import {
  ResetPassword,
  ResetPasswordSchema,
} from './Model/Reset-Password.model';
import { ConfigModule } from '@nestjs/config';
import { ResetPasswordService } from './service/reset-password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: VerifyUserEmail.name,
        schema: VerifyUserEmailSchema,
      },
      { name: ResetPassword.name, schema: ResetPasswordSchema },
    ]),
    LocationModule,
    MailModule,
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, VerifyEmailService, ResetPasswordService],
  exports: [UsersService, ResetPasswordService],
})
export class UsersModule {}
