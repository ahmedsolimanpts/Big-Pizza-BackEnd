import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierService } from '../service/supplier.service';
import { CreateSupplierDto } from '../dto/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/supplier/update-supplier.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiBody({ type: CreateSupplierDto })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.supplierService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.updateOneSupplierByID(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.removeOneSupplierByID(id);
  }
}
