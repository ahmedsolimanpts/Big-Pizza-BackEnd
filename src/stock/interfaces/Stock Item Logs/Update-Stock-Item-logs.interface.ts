import { StockTransactionTYPE } from '../../enums/Stock-Transactions.enum';
import { UpdateStockItemQuantityInterface } from '../Stock Item Quantity/Update-Stock-Item-quantity.interface';

export interface UpdateStockItemLogsInterface {
  item?: UpdateStockItemQuantityInterface;

  createby?: string;

  transaction?: StockTransactionTYPE;

  stock?: string;

  transaction_id?: string;
}
