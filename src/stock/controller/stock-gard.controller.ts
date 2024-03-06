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

@ApiTags('Stock Gard')
@Controller('stock-gard')
export class StockGardController {
  constructor(private readonly stockGardService: StockGardService) {}

  @Post(':branch_id')
  create(
    @Body() createDto: CreateStockGardDto,
    @Param('branch_id') branch_id: string,
    @Req() req: Request,
  ) {
    const createby = (req as any).user._id;
    const data = {
      createby,
      branch_id,
      ...createDto,
    };
    return this.stockGardService.create(data);
  }

  @Get(':branch_id')
  findAllForOneBranch(@Param('branch_id') branch_id: string) {
    return this.stockGardService.findAllForOneBranch(branch_id);
  }

  @Get(':gard_id/:branch_id')
  findOneBranchGardById(
    @Param('gard_id') gard_id: string,
    @Param('branch_id') branch_id: string,
  ) {
    return this.stockGardService.findOneBranchGardById(gard_id, branch_id);
  }

  @Delete(':gard_id/:branch_id')
  remove(
    @Param('gard_id') gard_id: string,
    @Param('branch_id') branch_id: string,
  ) {
    return this.stockGardService.DeleteById(gard_id, branch_id);
  }
}
