import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockGardInterface {
  stock_items?: StockItemQuantityInterface[];
  stock_id?: string;
  createby?: string;
}
