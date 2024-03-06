import { StockGard } from '../Model/Stock-Gard.model';
import { StockItemslogs } from '../Model/Stock-item-logs.model';

export interface StockInterface {
  branch?: string;

  items?: StockItemslogs[];

  transaction?: string[];

  gard?: StockGard[];
}
