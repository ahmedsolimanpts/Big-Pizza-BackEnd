import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { CreateStockDto } from '../dto/Stock/create-stock.dto';
import { UpdateStockDto } from '../dto/Stock/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStock(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.stockService.findOneByID(id);
  }

  @Get('item-count/:stockid')
  async GetItemsCountAtStock(@Param('stockid') stockid: string) {
    const stock = await this.stockService.findOneByID(stockid);
    if (!stock) throw new NotFoundException('No Stock With This ID');
    return this.stockService.GetItemsCountAtStock(stockid);
  }

  @Patch(':id')
  async updateOnebyID(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    const stock = await this.stockService.findOneByID(id);
    if (!stock) throw new NotFoundException('No Stock With This ID');
    return this.stockService.updateOnebyID(id, updateStockDto);
  }

  @Delete(':id')
  async removeOnebyID(@Param('id') id: string) {
    const stock = await this.stockService.findOneByID(id);
    if (!stock) throw new NotFoundException('No Stock With This ID');
    return this.stockService.removeOnebyID(id);
  }
}
