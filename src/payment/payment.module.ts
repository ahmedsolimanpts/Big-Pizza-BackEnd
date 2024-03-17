import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './Model/payment.model';
import { BranchModule } from 'src/branch/branch.module';
import { UsersModule } from 'src/users/users.module';
import {
  PayPalPayment,
  PayPalPaymentSchema,
} from './Model/PayPal.payment.model';
import { CashPayment, CashPaymentSchema } from './Model/Cash.payment.model';
import { CashService } from './service/cash.service';
import { PaypalService } from './service/paypal.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
        discriminators: [
          {
            name: PayPalPayment.name,
            schema: PayPalPaymentSchema,
          },
          {
            name: CashPayment.name,
            schema: CashPaymentSchema,
          },
        ],
      },
    ]),
    BranchModule,
    UsersModule,
    OrderModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, CashService, PaypalService],
})
export class PaymentModule {}
