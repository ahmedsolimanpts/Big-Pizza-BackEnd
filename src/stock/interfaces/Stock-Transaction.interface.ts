import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';
import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockTransactionInterface {
  items_quantity?: StockItemQuantityInterface[];

  stock?: string;

  createby?: string;

  updated_user?: string;

  status?: StockTransactionStatus;
}
