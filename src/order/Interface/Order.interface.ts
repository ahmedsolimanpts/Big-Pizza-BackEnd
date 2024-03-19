import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';
import { OrderStatus } from '../enums/Order-Status.enums';
import { ProductComponents } from 'src/product/enums/product-components.enum';
import { DelivereyMethod } from 'src/delivery/enums/Deliverey-method.enums';

export interface OrderItemsInterface {
  verbose_name?: string;

  product?: string;

  quantity?: number;

  note?: string;

  extra?: string[];

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

  delivery_price?: DeliveryPrice;

  delivery_status?: DeliveryStatus;

  end_location?: string;

  pilot?: string;

  deliverey_method?: DelivereyMethod;

  service_price?: number;

  table_number?: string;
}
