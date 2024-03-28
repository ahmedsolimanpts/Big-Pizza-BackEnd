import { StockItemCategory } from '../../enums/Stock-Item-Category.enum';

export interface CreateStockItemInterface {
  name: string;
  category: StockItemCategory;
  description?: string;
}
