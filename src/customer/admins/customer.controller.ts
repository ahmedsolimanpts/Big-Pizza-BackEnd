import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from '../customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

@ApiTags('Admin Customer')
@Controller('admin-customer')
export class CustomerAdminController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneById(id, updateCustomerDto);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.customerService.removeOneById(id);
  }

  @Post(':customerid/locations')
  AddLocationToCustomer(
    @Param('customerid') customerid: string,
    @Body() new_Location: CreateLocationDto,
  ) {
    return this.customerService.AddLocationToCustomer(customerid, new_Location);
  }

  @Delete(':customerid/:locationid/locations')
  RemoveLocationFromCustomer(
    @Param('customerid') customerid: string,
    @Param('locationid') locationid: string,
  ) {
    return this.customerService.RemoveLocationFromCustomer(
      customerid,
      locationid,
    );
  }
}
