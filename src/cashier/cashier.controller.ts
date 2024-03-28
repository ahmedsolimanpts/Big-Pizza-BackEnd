import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { Request } from 'express';
import { CreateCashierShiftInterface } from './interface/Create-Cashier-Shift.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enums/roles.enums';

@UseGuards(RolesGuard)
@Role(Roles.SUPERUSER)
@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Role(Roles.CASHIER)
  @Post()
  create(@Body() createCashierDto: CreateCashierDto, @Req() req: Request) {
    const data: CreateCashierShiftInterface = {
      ...createCashierDto,
      create_by: (req as any).user._id,
    };
    return this.cashierService.create(data);
  }

  @Get()
  findAll() {
    return this.cashierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashierService.findOneById(id);
  }

  @Get('user/:user-id')
  findOneByUser(@Param('user-id') user_id: string) {
    return this.cashierService.findOneByUser(user_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashierService.update(id, updateCashierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashierService.remove(id);
  }
}
