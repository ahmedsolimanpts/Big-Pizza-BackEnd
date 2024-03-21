import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResetPassword } from '../Model/Reset-Password.model';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { SendMailOption } from 'src/mail/type/SendMail-Option.type';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectModel(ResetPassword.name) private resetRepo: Model<ResetPassword>,
    private usersService: UsersService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}
  async GenerateCode() {
    const min = 10000000;
    const max = 99999999;
    return await Math.floor(Math.random() * (max - min + 1) + min);
  }

  async Create(data: { user: string; code: number }) {
    try {
      const newRow = new this.resetRepo(data);
      return await newRow.save();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.resetRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByCode(code: string) {
    try {
      return await this.resetRepo.findOne({ code: code }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByUserId(user_id: string) {
    try {
      return await this.resetRepo.findOne({ user: user_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateOneByUserId(user_id: string, data: object) {
    try {
      return await this.resetRepo
        .findOneAndUpdate({ user: user_id }, data, { new: true })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteOneByUserId(user_id: string) {
    try {
      return await this.resetRepo.findOneAndDelete({ user: user_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async RequestResetPassword(email: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) throw new NotFoundException('Email Not Exist');
      const code = await this.GenerateCode();
      const is_reset = await this.findOneByUserId((user as any)._id);
      if (is_reset) {
        await this.UpdateOneByUserId((user as any)._id, {
          code: code,
        });
      } else {
        await this.Create({
          user: (user as any)._id,
          code: code,
        });
      }

      const EmailBody = `Dear ${user.username},\n
      your Reset Password Link IS:\n
      ${this.configService.get('RESET_PASSWORD_LINK')}${code}`;

      const mailOption: SendMailOption = {
        to: [user.email],
        subject: 'Reset Password Request',
        body: EmailBody,
      };
      await this.mailService.sendMail(mailOption);
      return { message: 'Please Check Your Mail' };
    } catch (err) {
      throw err;
    }
  }

  async IsValidCode(code: number) {
    try {
      const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60000);
      return await this.resetRepo
        .findOne({
          code: code,
          updatedAt: { $gte: fiveMinutesAgo },
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async VerifyAndUpdate(code: number, newPassword: string) {
    try {
      const is_valid_email = await this.IsValidCode(code);
      if (is_valid_email) {
        await this.usersService.updateOneByID(is_valid_email.user, {
          password: newPassword,
        });
        await this.DeleteOneByUserId(is_valid_email.user);
        return { message: 'Success Updated' };
      }
      return new UnauthorizedException(
        'Code Not Valid, Contact with Customer Service Or Try Again',
      );
    } catch (err) {
      throw err;
    }
  }
}
