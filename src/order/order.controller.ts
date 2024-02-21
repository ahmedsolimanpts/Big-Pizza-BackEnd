import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTakeAwayOrderDto } from './dto/takeaway/create-takeaway-order.dto';
import { CreateDineInOrderDto } from './dto/dinein/create-dinein-order.dto';
import { CreateDelivereyOrderDto } from './dto/delivery/create-deliverey-order.dto';
import { IsEmployeeGuard } from 'src/employee/guards/IsEmployee.guard';

@ApiTags('order')
@UseGuards(IsEmployeeGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':branchid/takeaway')
  createTakeAwayOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateTakeAwayOrderDto,
    @Req() req: Request,
  ) {
    const data: CreateTakeAwayOrderDto = {
      ...createOrderDto,
      branch: branchid,
      createby: (req as any).user._id,
    };
    return this.orderService.CreateOrder(data);
  }

  @Post(':branchid/deliverey')
  createDelivereyOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateDelivereyOrderDto,
    @Req() req: Request,
  ) {
    const data: CreateDelivereyOrderDto = {
      ...createOrderDto,
      branch: branchid,
      createby: (req as any).user._id,
    };
    return this.orderService.CreateOrder(data);
  }

  @Post(':branchid/dinein')
  createDineInOrder(
    @Param('branchid') branchid: string,
    @Body() createOrderDto: CreateDineInOrderDto,
    @Req() req: Request,
  ) {
    const data: CreateDineInOrderDto = {
      ...createOrderDto,
      branch: branchid,
      createby: (req as any).user._id,
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
