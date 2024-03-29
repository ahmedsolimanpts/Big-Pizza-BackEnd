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
import { WalletModule } from './wallet/wallet.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaypalModule } from './paypal/paypal.module';
import { MailModule } from './mail/mail.module';
import { CashierModule } from './cashier/cashier.module';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        mongoCluster: joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: joi.string().required(),
        EMAIL_SERVICE: joi.string().required(),
        EMAIL_USER: joi.string().required(),
        EMAIL_PASSWORD: joi.string().required(),
        GOOGLE_REFRESH: joi.string().required(),
        GOOGLE_REDIRECT_URL: joi.string().required(),
        RESET_PASSWORD_LINK: joi.string().required(),
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
    WalletModule,
    NotificationsModule,
    PaypalModule,
    MailModule,
    CashierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
