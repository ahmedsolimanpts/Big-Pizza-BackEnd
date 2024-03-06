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
import { Coupon, CouponSchema } from 'src/coupon/Model/coupon.model';
import { Offer, OfferSchema } from 'src/offers/Model/offer.model';
import { DelivereyOrder } from 'src/delivery/Model/delivery.model';
import { Model } from 'mongoose';

@Schema()
export class OrderItems {
  @Prop()
  verbose_name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  item: string;

  @Prop()
  quantity: number;

  @Prop()
  note: string;

  @Prop()
  extra: Product[];

  @Prop()
  without_component: ProductComponents[];
}

@Schema({ timestamps: true, discriminatorKey: 'order_type' })
export class Order {
  @Prop()
  daily_orderid: number;

  @Prop({ type: [OrderItems] })
  items: OrderItems[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name })
  branch: string;

  @Prop({
    required: true,
    enum: Object.values(OrderType),
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

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  approvedby?: string;

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

@Schema()
export class DelivereyOrderType extends Order {
  @Prop({ type: DelivereyOrder })
  delivery: DelivereyOrder;
}

export const DelivereyOrderTypeSchema =
  SchemaFactory.createForClass(DelivereyOrderType);

@Schema()
export class TakeAwayOrder extends Order {}

export const TakeAwayOrderSchema = SchemaFactory.createForClass(TakeAwayOrder);

@Schema()
export class DineinOrder extends Order {
  @Prop({ default: 30 })
  service_price: number;

  @Prop()
  table_number: string;
}

export const DineinOrderSchema = SchemaFactory.createForClass(DineinOrder);

OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

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

// const OfferModel = mongoose.model(Offer.name, OfferSchema);
// const CouponModel = mongoose.model(Coupon.name, CouponSchema);

// OrderSchema.virtual('total_without_tax').get(async function () {
//   let total = 0;
//   this.items.forEach((item) => {
//     const item_price = item.item.price * item.quantity;
//     total += item_price;
//   });
//   if (this.offers) {
//     this.offers.forEach(async (offerid) => {
//       const offer = await OfferModel.findById(offerid).exec();
//       total += offer.price;
//     });
//   }

//   if (this.coupon) {
//     const coupon = await CouponModel.findById(this.coupon).exec();
//     const couponDiscount = total * (coupon.percent_discount / 100);
//     total -= couponDiscount;
//   }

//   if (this.discount) {
//     total -= this.discount;
//   }
//   if (this.percent_discount) {
//     const percent = total * (this.percent_discount / 100);
//     total -= percent;
//   }
//   return total;
// });

// // And also use it within the virtual for total, including the tax calculation
// OrderSchema.virtual('total').get(function () {
//   let total = 0;
//   this.items.forEach((item) => {
//     const item_price = item.item.price * item.quantity;
//     total += item_price;
//   });
//   const orderTax = total * (this.tax_percent / 100);
//   return total + orderTax;
// });

OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });
