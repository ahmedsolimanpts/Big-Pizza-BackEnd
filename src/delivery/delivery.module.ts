import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryOrder, DeliveryOrderSchema } from './Model/delivery.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryOrder.name, schema: DeliveryOrderSchema },
    ]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
