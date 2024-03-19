import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerLocationsService } from '../service/customer-locations.service';
import { CreateCustomerLocationDto } from '../dto/customer locations/Create-Customer-Location.dto';
import { UpdateCustomerLocationDto } from '../dto/customer locations/Update-Customer-Location.dto';

@ApiTags('Customer Locations')
@Controller('customer-locations')
export class CustomerLocationsController {
  constructor(
    private readonly customerLocationService: CustomerLocationsService,
  ) {}

  @Post()
  create(@Body() data: CreateCustomerLocationDto) {
    return this.customerLocationService.create(data);
  }

  @Get()
  findAll() {
    return this.customerLocationService.findAllLocations();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerLocationService.findOneCustomerLocationById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerLocationDto,
  ) {
    return this.customerLocationService.updateOneCustomerLocationById(
      id,
      updateCustomerDto,
    );
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string) {
    return this.customerLocationService.removeOneCustomerLocationById(id);
  }
}
