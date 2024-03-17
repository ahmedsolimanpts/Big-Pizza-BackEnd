import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Model/coupon.model';
import { ClientSession, Model } from 'mongoose';
import { BranchService } from 'src/branch/branch.service';
import { CouponInterface } from './interface/Coupon.interface';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponRepo: Model<Coupon>,
    private branchService: BranchService,
  ) {}

  async create(createCouponData: CouponInterface) {
    try {
      const is_branchavailable = await this.branchService.IsBranchsAvaliables(
        createCouponData.branches,
      );

      if (!is_branchavailable) throw new NotFoundException('Wrong Branch IDs');

      const coupon = new this.couponRepo(createCouponData);

      return await coupon.save();
    } catch (err) {
      throw err;
    }
  }

  async findByCouponName(name: string) {
    try {
      return await this.couponRepo.findOne({ name });
    } catch (err) {
      throw err;
    }
  }
  async findAll() {
    try {
      return await this.couponRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(coupon_id: string) {
    try {
      return await this.couponRepo.findById(coupon_id);
    } catch (err) {
      throw err;
    }
  }

  async updateOneCouponByID(
    coupon_id: string,
    updatedCouponData: CouponInterface,
  ) {
    try {
      if (updatedCouponData.branches) {
        const is_branchavailable = await this.branchService.IsBranchsAvaliables(
          updatedCouponData.branches,
        );
        if (!is_branchavailable)
          throw new NotFoundException('Wrong Branch IDs');
      }
      return await this.couponRepo.findByIdAndUpdate(
        coupon_id,
        updatedCouponData,
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async removeOneCouponByID(coupon_id: string) {
    try {
      return await this.couponRepo.findByIdAndDelete(coupon_id);
    } catch (err) {
      throw err;
    }
  }

  async IsValidCouponByName(couponName: string, session?: ClientSession) {
    try {
      const currentDate = new Date();

      const validCoupon = await this.couponRepo
        .findOne({
          name: couponName,
          quantity: { $gt: 0 },
          from: { $lte: currentDate },
          to: { $gte: currentDate },
        })
        .session(session)
        .exec();

      return !!validCoupon;
    } catch (err) {
      throw err;
    }
  }

  async IsValidCouponInBranchByCouponName(
    couponName: string,
    branchId: string,
    session?: ClientSession,
  ) {
    try {
      const currentDate = new Date();

      const validCoupon = await this.couponRepo
        .findOne({
          name: couponName,
          quantity: { $gt: 0 },
          from: { $lte: currentDate },
          to: { $gte: currentDate },
          branches: branchId,
        })
        .session(session)
        .exec();

      return !!validCoupon;
    } catch (err) {
      throw err;
    }
  }

  async IsValidCouponInBranchByCouponID(
    couponID: string,
    branchId: string,
    session?: ClientSession,
  ) {
    try {
      const currentDate = new Date();

      const validCoupon = await this.couponRepo
        .findOne({
          _id: couponID,
          quantity: { $gt: 0 },
          $or: [
            { from: { $exists: false }, to: { $exists: false } }, // Neither from nor to dates exist
            { from: { $lte: currentDate }, to: { $gte: currentDate } }, // Current date is within the from and to dates
          ],
          branches: { $in: [branchId] },
        })
        .session(session)
        .exec();

      return !!validCoupon;
    } catch (err) {
      throw err;
    }
  }

  async SubtractOneFromCouponQuantity(
    couponID: string,
    session?: ClientSession,
  ) {
    try {
      return await this.couponRepo
        .findByIdAndUpdate(couponID, { $inc: { quantity: -1 } }, { new: true })
        .session(session);
    } catch (err) {
      throw err;
    }
  }
}
