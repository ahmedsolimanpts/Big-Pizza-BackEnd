import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  // UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTakeAwayOrderDto } from './dto/takeaway/create-takeaway-order.dto';
import { CreateDineInOrderDto } from './dto/dinein/create-dinein-order.dto';
import { CreateDelivereyOrderDto } from './dto/delivery/create-deliverey-order.dto';
import { IsEmployeeGuard } from 'src/employee/guards/IsEmployee.guard';
import { CreateOrderInterface } from './Interface/Create-Order.interface';
import { OrderType } from './enums/Order-Types.enums';
import { BranchService } from 'src/branch/branch.service';
import { TakeAwayOrderInterface } from './Interface/TakeAway-Order.interfce';

@ApiTags('order')
// @UseGuards(IsEmployeeGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private branchService: BranchService,
  ) {}

  @Post(':branchid/takeaway')
  async createTakeAwayOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateTakeAwayOrderDto,
    @Req() req: Request,
  ) {
    const branch = await this.branchService.findOneByID(branchid);
    if (!branch) throw new NotFoundException('Not Valid Branch');
    const data: TakeAwayOrderInterface = {
      branch: branchid,
      createby: (req as any).user._id,
      order_type: OrderType.TAKEAWAY,
      ...createOrderDto,
    };
    return this.orderService.CreateTakeAwayOrder(data);
  }

  @Post(':branchid/deliverey')
  createDelivereyOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateDelivereyOrderDto,
    @Req() req: Request,
  ) {
    const data: CreateOrderInterface = {
      branch: branchid,
      createby: (req as any).user._id,
      order_type: OrderType.DELIVEREY,
      ...createOrderDto,
    };
    return this.orderService.CreateOrder(data);
  }

  @Post(':branchid/dinein')
  createDineInOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateDineInOrderDto,
    @Req() req: Request,
  ) {
    const data: CreateOrderInterface = {
      branch: branchid,
      createby: (req as any).user._id,
      order_type: OrderType.DINEIN,
      ...createOrderDto,
    };
    return this.orderService.CreateOrder(data);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneByID(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
