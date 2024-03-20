import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../decorator/roles.decorator';
import { AssignRoleDto } from '../dto/AssignRole.dto';

import { Roles } from '../enums/roles.enums';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/service/users.service';

@ApiTags('Auth Admin')
@UseGuards(RolesGuard)
@Controller('admin-auth')
export class AdminController {
  constructor(
    private readonly authService: AuthService,
    private userserivce: UsersService,
  ) {}

  @Post('assign-one-role')
  @Role(Roles.SUPERUSER)
  AddRoleToUser(@Body() asssignRoleDto: AssignRoleDto) {
    return this.authService.AddOneRoleToUser(asssignRoleDto);
  }

  @Post('unassign-one-role')
  @Role(Roles.SUPERUSER)
  RemoveRoleFromUser(@Body() asssignRoleDto: AssignRoleDto) {
    return this.authService.RemoveOneRoleFromUser(asssignRoleDto);
  }

  @Post('block/:id')
  @Role(Roles.SUPERUSER)
  BlockUser(@Param(':id') id: string) {
    return this.userserivce.BlockUser(id);
  }
}
