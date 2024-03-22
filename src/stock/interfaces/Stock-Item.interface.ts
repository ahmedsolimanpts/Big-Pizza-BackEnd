import { StockItemCategory } from '../enums/Stock-Item-Category.enum';

export interface StockItemInterface {
  name?: string;
  category?: StockItemCategory;
  description?: string;
}
