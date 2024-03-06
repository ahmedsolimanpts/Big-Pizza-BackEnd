import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DelivereyOrderType,
  DelivereyOrderTypeSchema,
  DineinOrder,
  DineinOrderSchema,
  Order,
  OrderSchema,
  TakeAwayOrder,
  TakeAwayOrderSchema,
} from './Model/order.model';
import { BranchModule } from 'src/branch/branch.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { OffersModule } from 'src/offers/offers.module';
import { OrderType } from './enums/Order-Types.enums';

@Module({
  imports: [
    MongooseModule.forFeature([
      // {
      //   name: Order.name,
      //   schema: OrderSchema,
      //   discriminators: [
      //     {
      //       name: DineinOrder.name,
      //       schema: DineinOrderSchema,
      //     },
      //     {
      //       name: TakeAwayOrder.name,
      //       schema: TakeAwayOrderSchema,
      //     },
      //     {
      //       name: DelivereyOrderType.name,
      //       schema: DelivereyOrderTypeSchema,
      //     },
      //   ],
      // },
      { name: Order.name, schema: OrderSchema },
      {
        name: DineinOrder.name,
        schema: DineinOrderSchema,
        discriminators: [{ name: OrderType.DINEIN, schema: DineinOrderSchema }],
      },
      {
        name: TakeAwayOrder.name,
        schema: TakeAwayOrderSchema,
        discriminators: [
          { name: OrderType.TAKEAWAY, schema: TakeAwayOrderSchema },
        ],
      },
      {
        name: DelivereyOrderType.name,
        schema: DelivereyOrderTypeSchema,
        discriminators: [
          { name: OrderType.DELIVEREY, schema: DelivereyOrderTypeSchema },
        ],
      },
    ]),
    BranchModule,
    EmployeeModule,
    OffersModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
