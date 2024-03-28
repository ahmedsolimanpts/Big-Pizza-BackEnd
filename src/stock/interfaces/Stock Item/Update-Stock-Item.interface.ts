import { StockItemCategory } from '../../enums/Stock-Item-Category.enum';

export interface UpdateStockItemInterface {
  name?: string;
  category?: StockItemCategory;
  description?: string;
}
