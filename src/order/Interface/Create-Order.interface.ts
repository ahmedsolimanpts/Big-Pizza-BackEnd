import { OrderStatus } from '../enums/Order-Status.enums';
import { OrderType } from '../enums/Order-Types.enums';
import { Product } from 'src/product/Model/product.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';
import { CreatePaymentInterface } from 'src/payment/interface/Create-Payment.interface';

export interface CreateOrderItemsInterface {
  item: string;

  verbose_name?: string;

  quantity: number;

  note?: string;

  extra?: Product[];

  without_component?: ProductComponents[];
}

export interface CreateOrderInterface {
  items: CreateOrderItemsInterface[];

  branch: string;

  order_type: OrderType;

  readyat?: Date;

  tax_percent?: number;

  discount?: number;

  percent_discount?: number;

  offers?: string[];

  coupon?: string;

  approvedby?: string;

  createby: string;

  order_status?: OrderStatus;

  kitchen_notes?: string;

  customer?: string;

  payment?: CreatePaymentInterface;
}
