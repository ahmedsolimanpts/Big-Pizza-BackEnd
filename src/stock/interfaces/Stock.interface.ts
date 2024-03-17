import { StockGardInterface } from './Stock-Gard.interface';
import { StockItemLogsInterface } from './Stock-Item-logs.interface';

export interface StockInterface {
  branch?: string;

  items?: StockItemLogsInterface[];

  transaction?: string[];

  gard?: StockGardInterface[];
}
