import { StockItemCategory } from 'src/stock/enums/Stock-Item-Category.enum';
import { UpdateStockItemQuantityInterface } from '../Stock Item Quantity/Update-Stock-Item-quantity.interface';

export interface UpdateStockGardInterface {
  items?: UpdateStockItemQuantityInterface[];
  stock?: string;
  createby?: string;
  category?: StockItemCategory;
}
