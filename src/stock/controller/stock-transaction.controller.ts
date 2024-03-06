import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { StockTransactionService } from '../service/stock-transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from '../dto/Stock Transaction/create-Transaction.dto';
import { UpdateStockTransactionDto } from '../dto/Stock Transaction/update-Transaction.dto';
import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';
import { Request } from 'express';
import { StockTransactionInterface } from '../interfaces/Stock-Transaction.interface';

@ApiTags('Stock Transaction')
@Controller('stock-transaction')
export class StockTransactionController {
  constructor(
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  @Post()
  create(@Req() req: Request, @Body() createDto: CreateTransactionDto) {
    const data: StockTransactionInterface = {
      createby: (req as any).user._id,
      ...createDto,
    };
    return this.stockTransactionService.Create(data);
  }

  @Post('change-status/:transaction_id')
  ChangeTransactionStatus(
    @Param('transaction_id') transaction_id: string,
    @Body('status') status: StockTransactionStatus,
    @Req() req: Request,
  ) {
    const userid = (req as any).user._id;
    return this.stockTransactionService.ChangeTransactionStatus(
      transaction_id,
      status,
      userid,
    );
  }

  @Get()
  findAll() {
    return this.stockTransactionService.findAll();
  }

  @Get('branch/:branch_id')
  findAllForTransactionForSpecificBranch(
    @Param('branch_id') branch_id: string,
  ) {
    return this.stockTransactionService.findAllForTransactionForSpecificBranch(
      branch_id,
    );
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.stockTransactionService.findByID(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateStockTransactionDto,
  ) {
    return this.stockTransactionService.UpdateById(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockTransactionService.DeleteById(id);
  }
}
