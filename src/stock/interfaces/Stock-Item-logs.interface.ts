import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockItemLogsInterface {
  item?: StockItemQuantityInterface;

  createby?: string;

  transaction?: StockTransactionTYPE;

  stock_id?: string;
}
