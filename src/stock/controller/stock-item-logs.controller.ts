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
import { CreateStockItemLogsInterface } from '../interfaces/Stock Item Logs/Create-Stock-Item-logs.interface';

@ApiTags('Stock Item Logs')
@Controller('stock-item-logs')
export class StockItemLogsController {
  constructor(private readonly stockItemLogsService: StockItemLogsService) {}

  @Post(':stock_id')
  create(
    @Param('stock_id') stock_id: string,
    @Body() createDto: CreateStockItemLogsDto,
    @Req() req: Request,
  ) {
    const data: CreateStockItemLogsInterface = {
      createby: (req as any).user._id,
      stock: stock_id,
      ...createDto,
    };
    return this.stockItemLogsService.create(data);
  }

  @Get()
  findOneStockItemLogById(@Query('item-log-id') item_log_id: string) {
    return this.stockItemLogsService.findOneStockItemLogById(item_log_id);
  }

  @Get('stock/:id')
  findOneStockItemLogByStock(@Param('id') id: string) {
    return this.stockItemLogsService.findOneStockItemLogByStock(id);
  }

  @Delete()
  remove(@Query('item-log-id') item_log_id: string) {
    return this.stockItemLogsService.DeleteStockItemLogById(item_log_id);
  }
}
