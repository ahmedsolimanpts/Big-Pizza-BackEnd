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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: VerifyUserEmail.name,
        schema: VerifyUserEmailSchema,
      },
    ]),
    LocationModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, VerifyEmailService],
  exports: [UsersService],
})
export class UsersModule {}
