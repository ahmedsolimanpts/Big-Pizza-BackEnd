import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/Singup.dto';
import { Token } from './interface/token-payload.interface';
import { SignInByEmailDto } from './dto/SignIn-by-email.dto';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return await this.authService.Usersignup(createUserDto);
  }

  @Post('signin-by-email')
  async signinByEmail(
    @Body() signInByEmailDto: SignInByEmailDto,
  ): Promise<any> {
    return await this.authService.signinByEmail(signInByEmailDto);
  }

  @Post('logout')
  @HttpCode(200)
  async Logout(@Req() req: Request): Promise<any> {
    return await this.authService.logout((req as any).user._id);
  }
}
