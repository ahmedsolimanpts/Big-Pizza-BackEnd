import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomerInterface } from '../interface/Customer.interface';
import { Request } from 'express';

@ApiTags('User Customer')
@Controller('user-customer')
export class CustomerUserController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request) {
    const data: CustomerInterface = {
      ...createCustomerDto,
      user: (req as any).user._id,
    };
    return this.customerService.create(data);
  }

  @Get()
  findOneById(@Req() req: Request) {
    return this.customerService.findOneCustomerById((req as any).user._id);
  }

  updateOneById(
    @Req() req: Request,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneCustomerById(
      (req as any).user._id,
      updateCustomerDto,
    );
  }
}
