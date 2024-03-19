import { Controller, Get, Param, Delete, Patch, Req } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { ApiTags } from '@nestjs/swagger';
import { OrderStatus } from '../enums/Order-Status.enums';
import { Request } from 'express';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Patch('aprove-order/:orderid')
  approveOrder(@Param('orderid') orderid: string, @Req() req: Request) {
    return this.orderService.ApproveOrderByOrderID(
      orderid,
      OrderStatus.PREPARING,
      (req as any).user._id,
    );
  }

  @Get('pending')
  findAllPendingOrder() {
    return this.orderService.findAllPendingOrder();
  }

  @Get('pending/:branch_id')
  findAllPendingOrderByBranchID(@Param('branch_id') branch_id: string) {
    return this.orderService.findAllPendingOrderByBranchID(branch_id);
  }

  @Get('pending/:user_id')
  findAllPendingOrderByUserID(@Param('user_id') user_id: string) {
    return this.orderService.findAllPendingOrderByUserID(user_id);
  }

  @Get('all/:branch_id')
  findAllOrderInBranch(@Param('branch_id') branch_id: string) {
    return this.orderService.findAllOrderInBranch(branch_id);
  }

  @Get('compeleted/:branch_id')
  findAllCompeletedOrderByBranchId(@Param('branch_id') branch_id: string) {
    return this.orderService.findAllCompeletedOrderByBranchId(branch_id);
  }

  @Get('preparing')
  findAllPreparingOrder() {
    return this.orderService.findAllPreparingOrder();
  }

  @Get('preparing/:branch_id')
  findAllPreparingdOrderByBranchId(@Param('branch_id') branch_id: string) {
    return this.orderService.findAllPreparingOrderByBranchID(branch_id);
  }

  @Get('approveby/:user_id')
  findAllOrdersApprovedByUserID(@Param('user_id') user_id: string) {
    return this.orderService.findAllOrdersApprovedByUserID(user_id);
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
