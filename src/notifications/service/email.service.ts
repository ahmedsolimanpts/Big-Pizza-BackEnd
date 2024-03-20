import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private mailService: MailService,
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(options: Mail.Options) {
    try {
      return await this.nodemailerTransport.sendMail(options);
    } catch (err) {
      throw err;
    }
  }

  async hi() {
    return await this.mailService.sendMail(
      ['ibs.ahmed.300383@te.eg', 'ahmedmsoly98@gmail.com'],
      'test nest js',
      ` hello from nest`,
    );
  }
}
