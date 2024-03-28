import { StockTransactionTYPE } from '../../enums/Stock-Transactions.enum';
import { CreateStockItemQuantityInterface } from '../Stock Item Quantity/Create-Stock-Item-quantity.interface';

export interface CreateStockItemLogsInterface {
  item: CreateStockItemQuantityInterface;

  createby: string;

  transaction: StockTransactionTYPE;

  stock: string;

  transaction_id?: string;
}
