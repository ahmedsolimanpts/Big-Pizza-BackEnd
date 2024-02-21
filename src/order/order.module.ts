import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DelivereyType,
  DelivereyTypeSchema,
  DineinType,
  DineinTypeSchema,
  Order,
  OrderSchema,
  TakeAwayType,
  TakeAwayTypeSchema,
} from './Model/order.model';
import { BranchModule } from 'src/branch/branch.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
        discriminators: [
          {
            name: DineinType.name,
            schema: DineinTypeSchema,
          },
          {
            name: TakeAwayType.name,
            schema: TakeAwayTypeSchema,
          },
          {
            name: DelivereyType.name,
            schema: DelivereyTypeSchema,
          },
        ],
      },
    ]),
    BranchModule,
    EmployeeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
