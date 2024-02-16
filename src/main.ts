import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { EmployeeModule } from './employee/employee.module';
import { CouponModule } from './coupon/coupon.module';
import { OffersModule } from './offers/offers.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { LocationModule } from './location/location.module';
import { MaterialModule } from './material/material.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { BranchModule } from './branch/branch.module';
import { CartModule } from './cart/cart.module';
import { SupplierModule } from './supplier/supplier.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({ origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('BigPizza BackEnd')
    .setDescription('The Docs For Big Pizza Backend System')
    .setVersion('1.0')
    .addTag('#BigPizza')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UsersModule,
      OrderModule,
      EmployeeModule,
      CouponModule,
      OffersModule,
      ProductModule,
      PaymentModule,
      LocationModule,
      MaterialModule,
      CustomerModule,
      DeliveryModule,
      BranchModule,
      CartModule,
      SupplierModule,
    ],
  });
  SwaggerModule.setup('swagger', app, document);
  const PORT = 3000 || process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
