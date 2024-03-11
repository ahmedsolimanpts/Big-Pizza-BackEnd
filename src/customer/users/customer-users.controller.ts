import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CustomerService } from '../customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
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
    return this.customerService.findOneById((req as any).user._id);
  }

  updateOneById(
    @Req() req: Request,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneById(
      (req as any).user._id,
      updateCustomerDto,
    );
  }

  @Delete()
  removeOneById(@Req() req: Request) {
    return this.customerService.removeOneById((req as any).user._id);
  }

  @Post('/locations')
  AddLocationToCustomer(
    @Req() req: Request,
    @Body() new_Location: CreateLocationDto,
  ) {
    return this.customerService.AddLocationToCustomer(
      (req as any).user._id,
      new_Location,
    );
  }

  @Delete(':locationid/locations')
  RemoveLocationFromCustomer(
    @Req() req: Request,
    @Param('locationid') locationid: string,
  ) {
    return this.customerService.RemoveLocationFromCustomer(
      (req as any).user._id,
      locationid,
    );
  }
}
