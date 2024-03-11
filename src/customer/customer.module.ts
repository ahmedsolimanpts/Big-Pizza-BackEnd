import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerAdminController } from './admins/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './Model/customer.model';
import { UsersModule } from 'src/users/users.module';
import { LocationModule } from 'src/location/location.module';
import { CustomerUserController } from './users/customer-users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: CustomerSchema, name: Customer.name },
    ]),
    UsersModule,
    LocationModule,
  ],
  controllers: [CustomerAdminController, CustomerUserController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
