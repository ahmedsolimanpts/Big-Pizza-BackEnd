import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './Model/order.model';
import { BranchModule } from 'src/branch/branch.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { OffersModule } from 'src/offers/offers.module';
import { TakeAwayController } from './controller/take-away.controller';
import { DeliveryController } from './controller/delivery.controller';
import { DineInController } from './controller/dine-in.controller';
import { OnlineController } from './controller/online.controller';
import { TakeAwayService } from './service/take-away.service';
import { DeliveryService } from './service/delivery.service';
import { DineInService } from './service/dine-in.service';
import { OnlineService } from './service/online.service';

import { DineinOrder, DineinOrderSchema } from './Model/DineIn.model';
import { TakeAwayOrder, TakeAwayOrderSchema } from './Model/TakeAway.model';
import { DeliveryOrder, DeliveryOrderSchema } from './Model/Delivery.model';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
        discriminators: [
          {
            name: DineinOrder.name,
            schema: DineinOrderSchema,
          },
          {
            name: TakeAwayOrder.name,
            schema: TakeAwayOrderSchema,
          },
          {
            name: DeliveryOrder.name,
            schema: DeliveryOrderSchema,
          },
        ],
      },
    ]),
    BranchModule,
    EmployeeModule,
    OffersModule,
    ProductModule,
  ],
  controllers: [
    OrderController,
    TakeAwayController,
    DeliveryController,
    DineInController,
    OnlineController,
  ],
  providers: [
    OrderService,
    TakeAwayService,
    DeliveryService,
    DineInService,
    OnlineService,
  ],
  exports: [OrderService],
})
export class OrderModule {}
