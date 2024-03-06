import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';
import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockTransactionInterface {
  stock_items?: StockItemQuantityInterface[];

  transfer_to?: string;
  createby?: string;
  status?: StockTransactionStatus;
}
