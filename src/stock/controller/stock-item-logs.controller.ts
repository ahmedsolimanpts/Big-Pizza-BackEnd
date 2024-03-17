import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { StockItemLogsService } from '../service/stock-item-logs.service';
import { CreateStockItemLogsDto } from '../dto/Stock Item Logs/create-Stock-Item-Logs.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { StockService } from '../service/stock.service';

@ApiTags('Stock Item Logs')
@Controller('stock-item-logs')
export class StockItemLogsController {
  constructor(
    private readonly stockItemLogsService: StockItemLogsService,
    private stockService: StockService,
  ) {}

  @Post(':stock_id')
  create(
    @Param('stock_id') stock_id: string,
    @Body() createDto: CreateStockItemLogsDto,
    @Req() req: Request,
  ) {
    const data: StockItemLogsInterface = {
      createby: (req as any).user._id,
      stock_id: stock_id,
      ...createDto,
    };
    return this.stockItemLogsService.create(data);
  }

  @Get()
  findOneStockTransactionById(
    @Query('item-log-id') item_log_id: string,
    @Query('stock-id') stock_id: string,
  ) {
    return this.stockItemLogsService.findOneStockTransactionById(
      item_log_id,
      stock_id,
    );
  }

  @Delete()
  remove(
    @Query('item-log-id') item_log_id: string,
    @Query('stock-id') stock_id: string,
  ) {
    return this.stockItemLogsService.DeleteStockItemLogById(
      item_log_id,
      stock_id,
    );
  }
}
