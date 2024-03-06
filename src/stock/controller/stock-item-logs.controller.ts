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
import { BranchService } from 'src/branch/branch.service';

@ApiTags('Stock Item Logs')
@Controller('stock-item-logs')
export class StockItemLogsController {
  constructor(
    private readonly stockItemLogsService: StockItemLogsService,
    private branchService: BranchService,
  ) {}

  @Post(':branch_id')
  create(
    @Param('branch_id') branch_id: string,
    @Body() createDto: CreateStockItemLogsDto,
    @Req() req: Request,
  ) {
    const branch = this.branchService.findOneByID(branch_id);
    if (!branch) throw new NotFoundException('Error Branch');

    const data: StockItemLogsInterface = {
      createby: (req as any).user._id,
      branch_id: branch_id,
      ...createDto,
    };
    return this.stockItemLogsService.create(data);
  }

  @Get(':branch_id')
  findAllForOneBranch(@Param('branch_id') branch_id: string) {
    return this.stockItemLogsService.findAllForOneBranch(branch_id);
  }

  @Get(':transaction_id/:branch_id')
  findOneBranchTransactionById(
    @Param('transaction_id') transaction_id: string,
    @Param('branch_id') branch_id: string,
  ) {
    return this.stockItemLogsService.findOneBranchTransactionById(
      transaction_id,
      branch_id,
    );
  }

  @Delete(':transaction_id/:branch_id')
  remove(
    @Param('transaction_id') transaction_id: string,
    @Param('branch_id') branch_id: string,
  ) {
    return this.stockItemLogsService.DeleteById(transaction_id, branch_id);
  }
}
