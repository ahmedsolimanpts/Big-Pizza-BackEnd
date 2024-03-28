import { Module } from '@nestjs/common';
import { BillingService } from './service/billing.service';
import { BillingController } from './controller/billing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import {
  SpendingAuthorization,
  SpendingAuthorizationSchema,
} from './Model/Spending Authorization/Spending-Authorization.model';
import {
  EmployeeSpendingAuthorization,
  EmployeeSpendingAuthorizationSchema,
} from './Model/Spending Authorization/Emp-Spending-Auth.model';
import {
  InvoiceSpendingAuthorization,
  InvoiceSpendingAuthorizationSchema,
} from './Model/Spending Authorization/Invoice-Spending-Auth.model';
import { EmployeeModule } from 'src/employee/employee.module';
import { Invoice, InvoiceSchema } from './Model/Invoice.model';
import { SpendingAuthController } from './controller/spending-auth.controller';
import { SpendingAuthService } from './service/spending-auth.service';
import { InvoiceService } from './service/invoice.service';
import { CashierModule } from 'src/cashier/cashier.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SpendingAuthorization.name,
        schema: SpendingAuthorizationSchema,
        discriminators: [
          {
            name: EmployeeSpendingAuthorization.name,
            schema: EmployeeSpendingAuthorizationSchema,
          },
          {
            name: InvoiceSpendingAuthorization.name,
            schema: InvoiceSpendingAuthorizationSchema,
          },
        ],
      },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
    UsersModule,
    EmployeeModule,
    CashierModule,
  ],
  controllers: [BillingController, SpendingAuthController],
  providers: [BillingService, SpendingAuthService, InvoiceService],
})
export class BillingModule {}
