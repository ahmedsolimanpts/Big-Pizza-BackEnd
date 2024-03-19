import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import * as mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { OrderStatus } from '../enums/Order-Status.enums';
import { Customer } from 'src/customer/Model/customer.model';
import { Coupon } from 'src/coupon/Model/coupon.model';
import { Offer } from 'src/offers/Model/offer.model';
import { OrderItems } from './Order-Items.model';
import { Model } from 'mongoose';
import { TakeAwayOrder } from './TakeAway.model';
import { DineinOrder } from './DineIn.model';
import { DeliveryOrder } from './Delivery.model';

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
    enum: [DeliveryOrder.name, TakeAwayOrder.name, DineinOrder.name],
  })
  order_type: string;

  @Prop()
  readyat: Date;

  @Prop({ default: 14, required: true })
  tax_percent: number;

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
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Set Daily Order Id For Branch
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
// const ProductModel = mongoose.model(Product.name, ProductSchema);

// OrderSchema.virtual('total').get(async function () {
//   let total = 0;

//   for (const item of this.items) {
//     const product = await ProductModel.findById(item.product).exec();

//     const item_price = product.price * item.quantity;
//     total += item_price;
//   }

//   if (this.offers) {
//     for (const offerid of this.offers) {
//       const offer = await OfferModel.findById(offerid).exec();
//       total += offer.price;
//     }
//   }

//   if (this.coupon) {
//     const coupon = await CouponModel.findById(this.coupon).exec();
//     const couponDiscount = total * (coupon.percent_discount / 100);
//     total -= couponDiscount;
//   }

//   if (this.percent_discount) {
//     const percent = total * (this.percent_discount / 100);
//     total -= percent;
//   }
//   return total;
// });

// OrderSchema.set('toJSON', { virtuals: true });
// OrderSchema.set('toObject', { virtuals: true });
