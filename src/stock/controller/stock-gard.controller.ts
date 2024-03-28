import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { StockGardService } from '../service/stock-gard.service';
import { CreateStockGardDto } from '../dto/Stock Gard/create-stock-gard.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from '../service/stock.service';

@ApiTags('Stock Gard')
@Controller('stock-gard')
export class StockGardController {
  constructor(
    private readonly stockGardService: StockGardService,
    private stockService: StockService,
  ) {}

  @Post(':stock_id')
  async create(
    @Body() createDto: CreateStockGardDto,
    @Param('stock_id') stock_id: string,
    @Req() req: Request,
  ) {
    const createby = (req as any).user._id;
    const data = {
      createby,
      stock: stock_id,
      ...createDto,
    };
    return this.stockGardService.create(data);
  }

  @Get(':stockid')
  findAllForOneStock(@Param('stockid') stockid: string) {
    return this.stockGardService.findAllForOneStock(stockid);
  }

  @Get(':id')
  async findOneStockGardById(@Param('id') id: string) {
    return this.stockGardService.findOneStockGardById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockGardService.DeleteStockGardById(id);
  }
}
