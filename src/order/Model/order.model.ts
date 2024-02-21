import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import * as mongoose from 'mongoose';
import { OrderType } from '../enums/Order-Types.enums';
import { User } from 'src/users/Model/user.model';
import { OrderStatus } from '../enums/Order-Status.enums';
import { Product } from 'src/product/Model/product.model';
import { Customer } from 'src/customer/Model/customer.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';
import { Payment } from 'src/payment/Model/payment.model';
import { Coupon } from 'src/coupon/Model/coupon.model';
import { Offer } from 'src/offers/Model/offer.model';
import { DelivereyOrder } from 'src/delivery/Model/delivery.model';
import { Model } from 'mongoose';

@Schema()
export class OrderItems {
  @Prop()
  verbose_name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  item: Product;

  @Prop()
  quantity: number;

  @Prop()
  note: string;

  @Prop()
  extra: Product[];

  @Prop()
  without_component: ProductComponents[];
}

@Schema()
export class DelivereyType {
  order_type: OrderType = OrderType.DELIVEREY;

  @Prop({ type: DelivereyOrder })
  delivery: DelivereyOrder;
}

export const DelivereyTypeSchema = SchemaFactory.createForClass(DelivereyType);

@Schema()
export class TakeAwayType {
  order_type: OrderType = OrderType.TAKEAWAY;
}

export const TakeAwayTypeSchema = SchemaFactory.createForClass(TakeAwayType);

@Schema()
export class DineinType {
  order_type: OrderType = OrderType.DINEIN;

  @Prop({ default: 30 })
  service_price: number;

  @Prop()
  table_number: string;
}

export const DineinTypeSchema = SchemaFactory.createForClass(DineinType);

@Schema({ timestamps: true, discriminatorKey: 'order_type' })
export class Order {
  @Prop()
  daily_orderid: number;

  @Prop({ type: [OrderItems] })
  items: OrderItems[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name })
  branch: string;

  @Prop({
    type: String,
    required: true,
    enum: [DelivereyType.name, TakeAwayType.name, DineinType.name],
  })
  order_type: OrderType;

  @Prop()
  readyat: Date;

  @Prop({ default: 14, required: true })
  tax_percent: number;

  @Prop()
  discount: number;

  @Prop()
  percent_discount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Offer.name })
  offers: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Coupon.name })
  coupon: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  approvedby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ default: OrderStatus.PREPARING, required: true })
  order_status: OrderStatus;

  @Prop()
  kitchen_notes: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Customer.name })
  customer: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Payment.name })
  payment: Payment;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Assert this.constructor as a Model of the same type as this document
    const model = this.constructor as Model<typeof this>;

    const count = await model
      .countDocuments({
        branch: this.branch,
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      })
      .exec();

    this.daily_orderid = count + 1;
  }

  next();
});

OrderSchema.virtual('total').get(function () {
  let total = 0;
  this.items.forEach((item) => {
    const item_price = item.item.price * item.quantity;
    total += item_price;
  });
  const order_tax = total * (this.tax_percent / 100);

  return total + order_tax;
});

OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });
