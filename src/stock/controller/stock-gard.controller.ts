import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
    const stock = await this.stockService.findOneByID(stock_id);
    if (!stock) throw new NotFoundException('No Stock With This ID');
    const createby = (req as any).user._id;
    const data = {
      createby,
      stock_id,
      ...createDto,
    };
    return this.stockGardService.create(data);
  }

  @Get(':stockid')
  findAllForOneBranch(@Param('stockid') stockid: string) {
    return this.stockGardService.findAllForOneStock(stockid);
  }

  @Get(':gard_id/:stockid')
  async findOneBranchGardById(
    @Param('gard_id') gard_id: string,
    @Param('stockid') stockid: string,
  ) {
    const stock = await this.stockService.findOneByID(stockid);
    if (!stock) throw new NotFoundException('No Stock With This ID');
    return this.stockGardService.findOneStockGardById(gard_id, stockid);
  }

  @Delete(':gard_id/:stockid')
  remove(@Param('gard_id') gard_id: string, @Param('stockid') stockid: string) {
    return this.stockGardService.DeleteStockGardById(gard_id, stockid);
  }
}
