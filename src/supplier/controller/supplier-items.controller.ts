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
import { SupplierItemsService } from '../service/supplier-items.service';
import { UpdateSupplierItemDto } from '../dto/Supplier Items/update-supplier-item.dto';
import { CreateSupplierItemDto } from '../dto/Supplier Items/create-supplier-item.dto';

@ApiTags('Supplier Items')
@Controller('supplier-items')
export class SupplierItemsController {
  constructor(private readonly supplierItemsService: SupplierItemsService) {}

  @Post()
  create(@Body() createSupplieritemDto: CreateSupplierItemDto) {
    return this.supplierItemsService.create(createSupplieritemDto);
  }

  @Get()
  findAll() {
    return this.supplierItemsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.supplierItemsService.findOneById(id);
  }

  @Get('supplier/:id')
  findOneBySupplierId(@Param('id') id: string) {
    return this.supplierItemsService.findAllBySupllier(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierItemDto: UpdateSupplierItemDto,
  ) {
    return this.supplierItemsService.updateOneByID(id, updateSupplierItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierItemsService.removeOneSupplierByID(id);
  }
}
