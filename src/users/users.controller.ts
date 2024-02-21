import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('location')
  AddLocation(
    @Body() createLocationDto: CreateLocationDto,
    @Req() req: Request,
  ) {
    const user_id = (req as any).user._id;
    return this.usersService.AddLocationToUser(user_id, createLocationDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneByid(@Param('id') id: string) {
    return this.usersService.findOneByid(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete('location/:id')
  removeLocation(@Param('id') locationid: string, @Req() req: Request) {
    const user_id = (req as any).user._id;
    return this.usersService.RemoveLocationFromUser(user_id, locationid);
  }
}
