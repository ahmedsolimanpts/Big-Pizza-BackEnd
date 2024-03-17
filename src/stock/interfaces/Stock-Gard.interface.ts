import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockGardInterface {
  items?: StockItemQuantityInterface[];
  stock_id?: string;
  createby?: string;
}
