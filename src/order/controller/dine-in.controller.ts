import { Controller } from '@nestjs/common';

@Controller('dine-in')
export class DineInController {
  // @Post(':branchid/dinein')
  // createDineInOrder(
  //   @Param('branchid') branchid: string,
  //   @Body() createOrderDto: CreateDineInOrderDto,
  //   @Req() req: Request,
  // ) {
  //   const data: CreateOrderInterface = {
  //     branch: branchid,
  //     createby: (req as any).user._id,
  //     order_type: OrderType.DINEIN,
  //     ...createOrderDto,
  //   };
  //   return this.dineInService.CreateOrder(data);
  // }
}
