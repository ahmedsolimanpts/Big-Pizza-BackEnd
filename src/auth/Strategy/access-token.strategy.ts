import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/Model/user.model';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    try {
      // Assuming you have a method to find a user by ID in your UsersService
      const user = await this.userService.findOneByid(payload.userid);

      if (!user) {
        // Handle case when user is not found
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
}
