import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpendingAuthService } from '../service/spending-auth.service';
import { CreateEmployeeSpendingAuthDto } from '../dto/Spending-Auth/Employee/Create-Emp-Spending-Auth.dto';
import { EmployeeSpendingAuthorization } from '../Model/Spending Authorization/Emp-Spending-Auth.model';
import { Request } from 'express';
import { CreateInvoiceSpendingAuthDto } from '../dto/Spending-Auth/Invoice/Create-Invoice-Spending-Auth.dto';
import { InvoiceSpendingAuthorization } from '../Model/Spending Authorization/Invoice-Spending-Auth.model';
import { UpdateInvoiceSpendingAuthDto } from '../dto/Spending-Auth/Invoice/Update-Invoice-Spending-Auth.dto';
import { UpdateEmployeeSpendingAuthDto } from '../dto/Spending-Auth/Employee/Update-Emp-Spending-Auth.dto';
import { CreateInvoiceSpendingAuthInteface } from '../interface/Spending Authriztion/create/create-Invoice-Spending-Auth.interface';
import { CreateEmployeeSpendingAuthInteface } from '../interface/Spending Authriztion/create/Create-Employee-Spending-Auth.interface';

@ApiTags('Spending Auth')
@Controller('spending-auth')
export class SpendingAuthController {
  constructor(private spendingAuthService: SpendingAuthService) {}

  @Post('employee')
  createEmployeeSpendingAuth(
    @Body() bodyData: CreateEmployeeSpendingAuthDto,
    @Req() req: Request,
  ) {
    const data: CreateEmployeeSpendingAuthInteface = {
      ...bodyData,
      type: EmployeeSpendingAuthorization.name,
      createby: (req as any).user._id,
    };
    return this.spendingAuthService.create(data);
  }

  @Post('invoice')
  createInvoiceSpendingAuth(
    @Body() bodyData: CreateInvoiceSpendingAuthDto,
    @Req() req: Request,
  ) {
    const data: CreateInvoiceSpendingAuthInteface = {
      ...bodyData,
      type: InvoiceSpendingAuthorization.name,
      createby: (req as any).user._id,
    };
    return this.spendingAuthService.create(data);
  }

  @Get()
  findAll() {
    return this.spendingAuthService.findAll();
  }

  @Patch('release/:id')
  ReleaseById(@Param('id') id: string, @Req() req: Request) {
    return this.spendingAuthService.ReleaseSpendingAuthById(
      id,
      (req as any).user._id,
    );
  }

  @Patch(':id')
  updateOneByID(
    @Param('id') id: string,
    @Body()
    updatedData: UpdateInvoiceSpendingAuthDto | UpdateEmployeeSpendingAuthDto,
  ) {
    return this.spendingAuthService.updateOneById(id, updatedData);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.spendingAuthService.removeOneById(id);
  }
}
