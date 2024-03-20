import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Token } from './interface/token-payload.interface';
import { SignInByEmailDto } from './dto/SignIn-by-email.dto';
import { AssignRoleDto } from './dto/AssignRole.dto';
import { AccountStatus } from 'src/users/enums/account-status.enums';
import { UserInterface } from 'src/users/interfaces/User.interface';
import { VerifyandGenerateRefreshToken } from './interface/VerifyandGenerateRefreshToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async GenerateTokenandRefresh(userid: string): Promise<Token> {
    try {
      const [token, refresh] = await Promise.all([
        this.jwtService.signAsync(
          { userid: userid },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_TOKEN_EXPIREIN'),
          },
        ),
        this.jwtService.signAsync(
          { userid: userid },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIREIN'),
          },
        ),
      ]);
      return {
        access_token: token,
        refresh_token: refresh,
      };
    } catch (err) {
      throw err;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user && bcrypt.compare(pass, user.password)) {
        return user;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async Usersignup(createUserData: UserInterface): Promise<Token> {
    try {
      const user = await this.userService.create(createUserData);
      const token = await this.GenerateTokenandRefresh((user as any)._id);
      const hashRefresh = await this.userService.hashFunction(
        token.refresh_token,
      );

      await this.userService.updateRefresh((user as any)._id, hashRefresh);
      return token;
    } catch (err) {
      if (err.status == 409) {
        throw new ConflictException(err.response.message);
      }
      throw err;
    }
  }

  async signinByEmail(signinByEmailDto: SignInByEmailDto): Promise<Token> {
    try {
      const user = await this.userService.findOneByEmail(
        signinByEmailDto.email,
      );

      // Check if email exist and not blocked
      if (!user || user.status == AccountStatus.BLOCK)
        throw new ForbiddenException('Accesss Denied!');

      //  Check If Password is valid
      const isMatchPassword = await this.userService.CompareTextWithHash(
        signinByEmailDto.password,
        user.password,
      );
      if (!isMatchPassword) throw new ForbiddenException('Accesss Denied!');

      // Generate New Token
      const tokens = await this.GenerateTokenandRefresh((user as any)._id);

      // Save New Token
      await this.userService.updateRefresh(
        (user as any)._id,
        tokens.refresh_token,
      );

      return tokens;
    } catch (err) {
      throw err;
    }
  }

  async logout(user_id: string) {
    try {
      await this.userService.DeleteOneUserRefreshByUserID(user_id);
    } catch (err) {
      throw err;
    }
  }

  async VerifyandGenerateRefreshToken(
    userIdAndRefreshToken: VerifyandGenerateRefreshToken,
  ) {
    try {
      const user = await this.userService.findOneByid(
        userIdAndRefreshToken.userid,
      );

      if (!user || !user.refreshToken)
        throw new ForbiddenException('Access Denied');

      const IsRefreshMatched = await this.userService.CompareTextWithHash(
        userIdAndRefreshToken.refresh_token,
        user.refreshToken,
      );

      if (!IsRefreshMatched) throw new ForbiddenException('Access Denied');

      const tokens = await this.GenerateTokenandRefresh((user as any)._id);

      await this.userService.updateRefresh(
        (user as any)._id,
        tokens.refresh_token,
      );

      return tokens;
    } catch (err) {
      throw err;
    }
  }

  async AddOneRoleToUser(assignRoleDto: AssignRoleDto) {
    try {
      return await this.userService.AddOneRoleToUser(
        assignRoleDto.userid,
        assignRoleDto.role,
      );
    } catch (err) {
      throw err;
    }
  }

  async RemoveOneRoleFromUser(assignRoleDto: AssignRoleDto) {
    try {
      return await this.userService.UnAssignOneRoleFromUser(
        assignRoleDto.userid,
        assignRoleDto.role,
      );
    } catch (err) {
      throw err;
    }
  }
}
