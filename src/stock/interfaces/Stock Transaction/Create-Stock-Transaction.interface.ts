import { StockTransactionStatus } from '../../enums/Stock-Transaction-Status.enum';
import { CreateStockItemQuantityInterface } from '../Stock Item Quantity/Create-Stock-Item-quantity.interface';

export interface CreateStockTransactionInterface {
  items_quantity: CreateStockItemQuantityInterface[];

  stock: string;

  createby: string;

  updated_user?: string;

  status: StockTransactionStatus;
}
