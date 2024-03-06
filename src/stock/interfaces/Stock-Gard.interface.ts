import { StockItemQuantityInterface } from './Stock-Item-quantity.interface';

export interface StockGardInterface {
  stock_items?: StockItemQuantityInterface[];
  branch_id?: string;
  createby?: string;
}
