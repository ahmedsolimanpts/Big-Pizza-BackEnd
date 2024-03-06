import { OrderType } from '../enums/Order-Types.enums';
import { CreateOrderInterface } from './Create-Order.interface';

export interface TakeAwayOrderInterface extends CreateOrderInterface {
  order_type: OrderType.TAKEAWAY;
}
