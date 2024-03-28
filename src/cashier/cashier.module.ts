import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashierShift, CashierShiftSchema } from './Model/Cashier-shift.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CashierShift.name,
        schema: CashierShiftSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [CashierController],
  providers: [CashierService],
  exports: [CashierService],
})
export class CashierModule {}
