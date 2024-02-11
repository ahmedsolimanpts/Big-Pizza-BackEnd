import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Model/coupon.model';
import { Model } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponRepo: Model<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      const coupon = new this.couponRepo(createCouponDto);
      return await coupon.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findByCouponName(name: string) {
    try {
      return await this.couponRepo.find({ name }).exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async findAll() {
    try {
      return await this.couponRepo.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOneByID(id: string) {
    try {
      return await this.couponRepo.findById(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    try {
      return await this.couponRepo.findByIdAndUpdate(id, updateCouponDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.couponRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
