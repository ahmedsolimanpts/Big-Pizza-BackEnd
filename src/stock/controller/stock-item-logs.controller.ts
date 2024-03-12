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
    const stock = this.stockService.findOneByID(stock_id);
    if (!stock) throw new NotFoundException('Error Branch');

    const data: StockItemLogsInterface = {
      createby: (req as any).user._id,
      stock_id: stock_id,
      ...createDto,
    };
    return this.stockItemLogsService.create(data);
  }

  @Get(':branch_id')
  findAllForOneBranch(@Param('branch_id') branch_id: string) {
    return this.stockItemLogsService.findAllForOneBranch(branch_id);
  }

  @Get(':item-log-id/:stock-id')
  findOneBranchTransactionById(
    @Param('item-log-id') item_log_id: string,
    @Param('stock-id') stock_id: string,
  ) {
    return this.stockItemLogsService.findOneStockTransactionById(
      item_log_id,
      stock_id,
    );
  }

  @Delete(':item-log-id/:stock_id')
  remove(
    @Param('item-log-id') item_log_id: string,
    @Param('stock_id') stock_id: string,
  ) {
    return this.stockItemLogsService.DeleteStockItemLogById(
      item_log_id,
      stock_id,
    );
  }
}
