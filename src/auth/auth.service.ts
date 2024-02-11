import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/Model/user.model';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/User-Singup.dto';
import { Token } from './dto/token.payload';
import { SignInByEmailDto } from './dto/SignIn-by-email.dto';
import { VerifyandRefreshTokenDto } from './dto/Verify-and-Refresh-token.dto';
import { CreateAdminUserDto } from './admin/dto/Admin-signup.dto';
import { CreateSuperUserDto } from './admin/dto/SuperUser-SignUP.dto';
import { AssignRoleDto } from './dto/AssignRole.dto';
import { AccountStatus } from 'src/users/enums/account-status.enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async GenerateTokenandRefresh(userid: string): Promise<Token> {
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
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }
  async Usersignup(
    createUserDto: CreateUserDto | CreateAdminUserDto | CreateSuperUserDto,
  ): Promise<Token> {
    try {
      const user: User = await this.userService.create(createUserDto);
      const token = await this.GenerateTokenandRefresh(user._id);
      const hashRefresh = await this.userService.hashFunction(
        token.refresh_token,
      );
      await this.userService.update(user._id, { refreshToken: hashRefresh });
      return token;
    } catch (err) {
      if (err.status == 409) {
        throw new ConflictException(err.response.message);
      }
      console.log(err);
    }
  }

  async signinByEmail(signinByEmailDto: SignInByEmailDto): Promise<Token> {
    try {
      const user = await this.userService.findOneByEmail(
        signinByEmailDto.email,
      );
      if (!user || user.status == AccountStatus.BLOCK)
        throw new ForbiddenException('Accesss Denied!');
      const isMatchPassword = await this.userService.CompareTextWithHash(
        signinByEmailDto.password,
        user.password,
      );
      if (!isMatchPassword) throw new ForbiddenException('Accesss Denied!');
      const tokens = await this.GenerateTokenandRefresh(user._id);
      await this.userService.update(user._id, {
        refreshToken: tokens.refresh_token,
      });
      return tokens;
    } catch (err) {
      if (err.response.statusCode === 404)
        throw new ForbiddenException('Accesss Denied!');
      console.log(err);
    }
  }

  async logout(id: string) {
    try {
      await this.userService.DeleteRefresh(id);
    } catch (err) {
      console.log(err);
    }
  }
  async VerifyandRefreshToken(
    verifyandRefreshTokenDto: VerifyandRefreshTokenDto,
  ) {
    const user = await this.userService.findOneByid(
      verifyandRefreshTokenDto.userid,
    );
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const IsRefreshMatched = await this.userService.CompareTextWithHash(
      verifyandRefreshTokenDto.refresh_token,
      user.refreshToken,
    );
    if (!IsRefreshMatched) throw new ForbiddenException('Access Denied');
    const tokens = await this.GenerateTokenandRefresh(user._id);
    await this.userService.updateRefresh(user._id, tokens.refresh_token);
    return tokens;
  }
  async AddRoleToUser(assignRoleDto: AssignRoleDto) {
    return await this.userService.AddRoleToUser(
      assignRoleDto.userid,
      assignRoleDto.role,
    );
  }
  async RemoveRoleFromUser(assignRoleDto: AssignRoleDto) {
    return await this.userService.UnAssignRoleFromUser(
      assignRoleDto.userid,
      assignRoleDto.role,
    );
  }
}
