import { Body, Controller, Post, Req } from '@nestjs/common';
import { GoogleService } from './google.service';
import TokenVerificationDto from '../dto/tokenVerificationDto';
import { Request } from 'express';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleService) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const { access_token, refresh_token, user } =
      await this.googleAuthService.authenticate(tokenData.token);

    console.log(access_token, refresh_token);
    request.res.setHeader('Set-Cookie', [access_token, refresh_token]);

    return user;
  }
}
