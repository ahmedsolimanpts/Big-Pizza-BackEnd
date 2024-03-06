import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { BranchModule } from './branch/branch.module';
import { SupplierModule } from './supplier/supplier.module';
import { MaterialModule } from './material/material.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { DeliveryModule } from './delivery/delivery.module';
import { LocationModule } from './location/location.module';
import { CustomerModule } from './customer/customer.module';
import { OffersModule } from './offers/offers.module';
import { CouponModule } from './coupon/coupon.module';
import { EmployeeModule } from './employee/employee.module';
import { StockModule } from './stock/stock.module';
import { BillingModule } from './billing/billing.module';
import { TicketModule } from './ticket/ticket.module';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        mongoCluster: joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoCluster'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
    BranchModule,
    SupplierModule,
    MaterialModule,
    CartModule,
    PaymentModule,
    DeliveryModule,
    LocationModule,
    CustomerModule,
    OffersModule,
    CouponModule,
    EmployeeModule,
    StockModule,
    BillingModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
