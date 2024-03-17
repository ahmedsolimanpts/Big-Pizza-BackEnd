import { Module } from '@nestjs/common';
import { StockService } from './service/stock.service';
import { StockController } from './controller/stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StockItem, StockItemSchema } from './Model/Stock-Item.model';
import { Stock, StockSchema } from './Model/stock.model';
import {
  StockTransactionSchema,
  StockTransaction,
} from './Model/Stock-Transaction.model';
import { StockGard, StockGardSchema } from './Model/Stock-Gard.model';
import {
  StockItemQuantity,
  StockItemQuantitySchema,
} from './Model/Stock-item-quantity.model';
import {
  StockItemslogs,
  StockItemslogsSchema,
} from './Model/Stock-item-logs.model';
import { BranchModule } from 'src/branch/branch.module';
import { UsersModule } from 'src/users/users.module';
import { StockItemService } from './service/stock-item.service';
import { StockTransactionService } from './service/stock-transaction.service';
import { StockItemLogsService } from './service/stock-item-logs.service';
import { StockItemController } from './controller/stock-item.controller';
import { StockTransactionController } from './controller/stock-transaction.controller';
import { StockItemLogsController } from './controller/stock-item-logs.controller';
import { StockGardController } from './controller/stock-gard.controller';
import { StockGardService } from './service/stock-gard.service';
import { StockItemQuantityService } from './service/stock-item-quantity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stock.name,
        schema: StockSchema,
      },
      {
        name: StockItemQuantity.name,
        schema: StockItemQuantitySchema,
      },
      {
        name: StockItem.name,
        schema: StockItemSchema,
      },
      {
        name: StockItemslogs.name,
        schema: StockItemslogsSchema,
      },
      {
        name: StockTransaction.name,
        schema: StockTransactionSchema,
      },
      {
        name: StockGard.name,
        schema: StockGardSchema,
      },
    ]),
    BranchModule,
    UsersModule,
  ],
  controllers: [
    StockController,
    StockItemController,
    StockTransactionController,
    StockItemLogsController,
    StockGardController,
  ],
  providers: [
    StockService,
    StockItemService,
    StockTransactionService,
    StockItemLogsService,
    StockGardService,
    StockItemQuantityService,
  ],
  exports: [StockService, StockItemService, StockTransactionService],
})
export class StockModule {}
