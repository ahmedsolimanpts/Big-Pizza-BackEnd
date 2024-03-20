import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { UsersService } from 'src/users/service/users.service';
import { AuthService } from '../auth.service';
import { User } from 'src/users/Model/user.model';

@Injectable()
export class GoogleService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async getCookiesForUser(user: User) {
    const access_with_refresh =
      await this.authenticationService.GenerateTokenandRefresh(
        (user as any).id,
      );

    await this.usersService.updateRefresh(
      (user as any)._id,
      (await access_with_refresh).refresh_token,
    );

    return access_with_refresh;
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    const { access_token, refresh_token } = await this.getCookiesForUser(user);

    return {
      access_token,
      refresh_token,
      user,
    };
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    const user = await this.usersService.createWithGoogle(email, name);

    return this.handleRegisteredUser(user);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.usersService.findOneByEmail(email);

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }
}
