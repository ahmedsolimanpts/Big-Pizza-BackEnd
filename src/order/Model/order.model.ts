import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import * as mongoose from 'mongoose';
import { OrderType } from '../enums/Order-Types.enums';
import { User } from 'src/users/Model/user.model';
import { OrderStatus } from '../enums/Order-Status.enums';
import { Product } from 'src/product/Model/product.model';
import { Model } from 'mongoose';
import { DeliveryOrder } from 'src/delivery/Model/delivery.model';
import { Customer } from 'src/customer/Model/customer.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';
import { Payment } from 'src/payment/Model/payment.model';
import { Coupon } from 'src/coupon/Model/coupon.model';
import { Offer } from 'src/offers/Model/offer.model';
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

@Schema({ timestamps: true })
export class Order {
  @Prop()
  daily_orderid: number;

  @Prop({ type: [OrderItems] })
  items: OrderItems[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name })
  branch: Branch;

  @Prop({ required: true })
  order_type: OrderType;

  @Prop()
  readyat: Date;

  @Prop({ default: 14, required: true })
  tax_percent: number;

  @Prop({ default: 0 })
  service: number;

  @Prop()
  discount: number;

  @Prop()
  percent_discount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Offer.name })
  offer: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Coupon.name })
  coupon: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  approvedby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ default: OrderStatus.COMPELETED, required: true })
  order_status: OrderStatus;

  @Prop()
  notes: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: DeliveryOrder.name })
  delivery: DeliveryOrder;

  @Prop({ type: mongoose.Types.ObjectId, ref: Customer.name })
  customer: Customer;

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

  if (this.delivery && 'delivery_price' in this.delivery) {
    return total + order_tax + this.delivery.delivery_price + this.service;
  }
  return total + order_tax + this.service;
});

OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });
