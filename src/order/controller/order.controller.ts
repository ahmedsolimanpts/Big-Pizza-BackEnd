import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDineInOrderDto } from '../dto/dinein/create-dinein-order.dto';
import { OrderInterface } from '../Interface/Order.interface';
import { Request } from 'express';
import { DineinOrder } from '../Model/DineIn.model';
import { CreateTakeAwayOrderDto } from '../dto/takeaway/create-takeaway-order.dto';
import { TakeAwayOrder } from '../Model/TakeAway.model';
import { CreateDeliveryOrderDto } from '../dto/delivery/create-delivery-order.dto';
import { DeliveryOrder } from '../Model/Delivery.model';

@ApiTags('order')
// @UseGuards(IsEmployeeGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':branchid/dinein')
  createDineInOrder(
    @Body()
    createOrderDto: CreateDineInOrderDto,

    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: DineinOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }

  @Post(':branchid/takeaway')
  createTakeAwayOrder(
    @Body()
    createOrderDto: CreateTakeAwayOrderDto,
    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: TakeAwayOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }

  @Post(':branchid/delivery')
  createDeliveryOrder(
    @Body()
    createOrderDto: CreateDeliveryOrderDto,
    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: DeliveryOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrderByID(id);
  }

  @Delete(':id')
  removeOneOrderByID(@Param('id') id: string) {
    return this.orderService.removeOneOrderByID(id);
  }
}
