import { StockItemCategory } from 'src/stock/enums/Stock-Item-Category.enum';
import { CreateStockItemQuantityInterface } from '../Stock Item Quantity/Create-Stock-Item-quantity.interface';

export interface CreateStockGardInterface {
  items: CreateStockItemQuantityInterface[];
  stock: string;
  createby: string;
  category: StockItemCategory;
}
