import { Module } from '@nestjs/common';
import { WalletService } from './service/wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './Model/wallet.model';
import {
  WalletTransaction,
  WalletTransactionSchema,
} from './Model/Wallet-Transaction.model';
import { UsersModule } from 'src/users/users.module';
import { WalletTransactionService } from './service/wallet-transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: WalletTransaction.name, schema: WalletTransactionSchema },
    ]),
    UsersModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletTransactionService],
})
export class WalletModule {}
