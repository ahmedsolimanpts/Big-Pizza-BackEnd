import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
// import { Options } from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';
import { SendMailOption } from './type/SendMail-Option.type';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}
  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
      this.configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URL'),
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_REFRESH'),
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL_USER'),
        clientId: this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_REFRESH'),
        accessToken: accessToken,
      },
    });
    return transport;
  }

  public async sendMail(mailOption: SendMailOption) {
    try {
      const transport = await this.setTransport();

      const option = {
        to: mailOption.to, // list of receivers
        from: `No Reply <${this.configService.get('EMAIL_USER')}>`,
        subject: mailOption.subject,
        text: mailOption.body,
      };

      return await transport.sendMail(option);
    } catch (err) {
      throw err;
    }
  }
}
