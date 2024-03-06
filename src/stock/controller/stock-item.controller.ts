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
import { StockItemService } from '../service/stock-item.service';
import { CreateStockItemDto } from '../dto/Stock Item/create-stock-item.dto';
import { UpdateStockItemDto } from '../dto/Stock Item/update-Stock-Item.dto';

@ApiTags('Stock Item')
@Controller('stock-item')
export class StockItemController {
  constructor(private readonly stockItemService: StockItemService) {}

  @Post()
  create(@Body() createDto: CreateStockItemDto) {
    return this.stockItemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.stockItemService.findAll();
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.stockItemService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateStockItemDto) {
    return this.stockItemService.UpdateById(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockItemService.DeleteById(id);
  }
}
