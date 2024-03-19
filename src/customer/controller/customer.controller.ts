import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerAdminController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAllCustomers();
  }

  @Get('phone/:number')
  findAllCustomersByPhone(@Param('number') number: string) {
    return this.customerService.findAllCustomersByPhone(number);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerService.findOneCustomerById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneCustomerById(id, updateCustomerDto);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.customerService.removeOneCustomerById(id);
  }
}
