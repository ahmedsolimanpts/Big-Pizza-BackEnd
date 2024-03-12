import { CreatePaymentInterface } from 'src/payment/interface/Create-Payment.interface';
import { OrderStatus } from '../enums/Order-Status.enums';
import { Product } from 'src/product/Model/product.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';

export interface OrderItemsInterface {
  verbose_name?: string;

  item?: string;

  quantity?: number;

  note?: string;

  extra?: Product[];

  without_component?: ProductComponents[];
}

export interface OrderInterface {
  daily_orderid?: number;

  items?: OrderItemsInterface[];

  branch?: string;

  order_type?: string;

  readyat?: Date;

  tax_percent?: number;

  percent_discount?: number;

  offers?: string[];

  coupon?: string;

  approvedby?: string;

  createby?: string;

  order_status?: OrderStatus;

  kitchen_notes?: string;

  customer?: string;

  payment?: CreatePaymentInterface;
}
