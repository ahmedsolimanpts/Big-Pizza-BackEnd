import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/User-Singup.dto';
import { Token } from './dto/token.payload';
import { SignInByEmailDto } from './dto/SignIn-by-email.dto';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

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
  async Logout(@Body('id') id: string): Promise<any> {
    return await this.authService.logout(id);
  }
}
