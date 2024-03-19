import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerAdminController } from './controller/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './Model/customer.model';
import { UsersModule } from 'src/users/users.module';
import { LocationModule } from 'src/location/location.module';
import { CustomerUserController } from './controller/customer-users.controller';
import { CustomerLocationsService } from './service/customer-locations.service';
import { CustomerLocationsController } from './controller/customer-locations.controller';
import {
  CustomerLocations,
  CustomerLocationsSchema,
} from './Model/customer-locations.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: CustomerSchema, name: Customer.name },
      { schema: CustomerLocationsSchema, name: CustomerLocations.name },
    ]),
    UsersModule,
    LocationModule,
  ],
  controllers: [
    CustomerAdminController,
    CustomerUserController,
    CustomerLocationsController,
  ],
  providers: [CustomerService, CustomerLocationsService],
  exports: [CustomerService, CustomerLocationsService],
})
export class CustomerModule {}
