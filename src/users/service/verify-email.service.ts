import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VerifyUserEmail } from '../Model/verify-user-email.model';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { MailService } from 'src/mail/mail.service';
import { SendMailOption } from 'src/mail/type/SendMail-Option.type';

@Injectable()
export class VerifyEmailService {
  constructor(
    @InjectModel(VerifyUserEmail.name)
    private verifyUserEmailRepo: Model<VerifyUserEmail>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async GenerateCode() {
    const min = 10000000;
    const max = 99999999;
    return await Math.floor(Math.random() * (max - min + 1) + min);
  }

  async Create(data: { user: string; code: number }) {
    try {
      const newRow = new this.verifyUserEmailRepo(data);
      return await newRow.save();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.verifyUserEmailRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByUserId(user_id: string) {
    try {
      return await this.verifyUserEmailRepo.findOne({ user: user_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateOneByUserId(user_id: string, data: object) {
    try {
      return await this.verifyUserEmailRepo
        .findOneAndUpdate({ user: user_id }, data, { new: true })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteOneByUserId(user_id: string) {
    try {
      return await this.verifyUserEmailRepo
        .findOneAndDelete({ user: user_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async VerifyRequest(user_id: string) {
    try {
      const user = await this.usersService.findOneByid(user_id);
      if (!user) throw new NotFoundException('User not found');

      if (user.is_valid_email)
        throw new ConflictException('User Already Verified');
      const GeneratedCode = await this.GenerateCode();

      const verifyCodeRow = await this.findOneByUserId(user_id);
      if (verifyCodeRow) {
        await this.UpdateOneByUserId(user_id, { code: GeneratedCode });
      } else {
        await this.Create({ user: user_id, code: GeneratedCode });
      }

      const body = `Hello ${user.username}\n
      your verification Code is : ${GeneratedCode} \n
      Code Is Valid For 5 Mintue Only.`;

      const Mailoption: SendMailOption = {
        to: [user.email],
        subject: 'Verify Email',
        body: body,
      };
      return await this.mailService.sendMail(Mailoption);
    } catch (err) {
      throw err;
    }
  }

  async IsValidCode(user_id: string, code: number) {
    try {
      const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60000);
      const is_Valid = await this.verifyUserEmailRepo
        .findOne({
          user: user_id,
          code: code,
          updatedAt: { $gte: fiveMinutesAgo },
        })
        .exec();

      if (is_Valid) return true;
      return false;
    } catch (err) {
      throw err;
    }
  }

  async VerifyAndUpdate(user_id: string, code: number) {
    try {
      const is_valid_email = await this.IsValidCode(user_id, code);
      if (is_valid_email) {
        await this.usersService.updateOneByID(user_id, {
          is_valid_email: true,
        });
        await this.DeleteOneByUserId(user_id);
        return { message: 'Success Verify' };
      }
      return new UnauthorizedException('Code Not Valid');
    } catch (err) {
      throw err;
    }
  }
}
