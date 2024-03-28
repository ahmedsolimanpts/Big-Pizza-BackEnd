import { StockTransactionStatus } from '../../enums/Stock-Transaction-Status.enum';
import { UpdateStockItemQuantityInterface } from '../Stock Item Quantity/Update-Stock-Item-quantity.interface';

export interface UpdateStockTransactionInterface {
  items_quantity?: UpdateStockItemQuantityInterface[];

  stock?: string;

  createby?: string;

  updated_user?: string;

  status?: StockTransactionStatus;
}
