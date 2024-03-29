import { Module } from '@nestjs/common';
import { SupplierService } from './service/supplier.service';
import { SupplierController } from './controller/supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './Model/supplier.Model';
import { LocationModule } from 'src/location/location.module';
import {
  SupplierItems,
  SupplierItemsSchema,
} from './Model/Supplier-Items.model';
import { SupplierItemsService } from './service/supplier-items.service';
import { SupplierItemsController } from './controller/supplier-items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
      { name: SupplierItems.name, schema: SupplierItemsSchema },
    ]),
    LocationModule,
  ],
  controllers: [SupplierController, SupplierItemsController],
  providers: [SupplierService, SupplierItemsService],
})
export class SupplierModule {}
