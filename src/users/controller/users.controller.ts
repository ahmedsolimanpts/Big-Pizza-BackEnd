import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enums/roles.enums';
import { VerifyEmailService } from '../service/verify-email.service';
import { UsersService } from '../service/users.service';
import { Request } from 'express';
import { ResetPasswordService } from '../service/reset-password.service';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private verifyEmailService: VerifyEmailService,
    private resetPasswordService: ResetPasswordService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneByid(@Param('id') id: string) {
    return this.usersService.findOneByid(id);
  }

  @Post('verify-email')
  verifyEmail(@Req() req: Request) {
    return this.verifyEmailService.VerifyRequest((req as any).user._id);
  }

  @Post('confirm-verify-email')
  ConfirmverifyEmail(@Req() req: Request, @Body('code') code: number) {
    return this.verifyEmailService.VerifyAndUpdate((req as any).user._id, code);
  }

  @Public()
  @Post('forget-password')
  async ResetPassword(@Body('email') email: string): Promise<any> {
    return await this.resetPasswordService.RequestResetPassword(email);
  }
  @Public()
  @Post('update-forget-password')
  async UpdatePassword(
    @Body('code') code: number,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.resetPasswordService.VerifyAndUpdate(code, password);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.SUPERUSER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneByID(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.SUPERUSER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeOneUserByID(id);
  }
}
