import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Offer } from './Model/offer.model';
import { BranchService } from 'src/branch/branch.service';
import { ProductService } from 'src/product/product.service';
import { OfferInterface } from './interface/Offer.interface';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private readonly offerRepo: Model<Offer>,
    private branchService: BranchService,
    private productService: ProductService,
  ) {}
  async create(NewOfferData: OfferInterface) {
    try {
      // Check If Branchs IDs Valid
      const is_branchs_available = await this.branchService.IsBranchsAvaliables(
        NewOfferData.branches,
      );
      if (!is_branchs_available) throw new NotFoundException('Wrong Branch ID');

      // Check If Products IDs Valid
      const is_products_available =
        await this.productService.IsProductsAvailable(NewOfferData.items);
      if (!is_products_available)
        throw new NotFoundException('Wrong Products ID');

      // Create New Offer
      const newOffer = new this.offerRepo(NewOfferData);
      return await newOffer.save();
    } catch (err) {
      throw err;
    }
  }

  async findAllOffers() {
    try {
      return await this.offerRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneOfferById(offer_id: string) {
    try {
      return await this.offerRepo.findById(offer_id);
    } catch (err) {
      throw err;
    }
  }

  async SubtractOneFromOfferQuantity(
    offer_id: string,
    session?: ClientSession,
  ) {
    try {
      return await this.offerRepo
        .findByIdAndUpdate(offer_id, { $inc: { quantity: -1 } }, { new: true })
        .session(session);
    } catch (err) {
      throw err;
    }
  }

  async findOfferByName(OfferName: string) {
    try {
      return await this.offerRepo.find({ OfferName }).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneOfferById(offer_id: string, NewUpdatedData: OfferInterface) {
    try {
      if (NewUpdatedData.branches) {
        const is_branchs_available =
          await this.branchService.IsBranchsAvaliables(NewUpdatedData.branches);
        if (!is_branchs_available)
          throw new NotFoundException('Wrong Branch ID');
      }

      if (NewUpdatedData.items) {
        const is_products_available =
          await this.productService.IsProductsAvailable(NewUpdatedData.items);
        if (!is_products_available)
          throw new NotFoundException('Wrong Products ID');
      }
      return await this.offerRepo.findByIdAndUpdate(offer_id, NewUpdatedData);
    } catch (err) {
      throw err;
    }
  }

  async removeOneOfferByID(offer_id: string) {
    try {
      return await this.offerRepo.findByIdAndDelete(offer_id);
    } catch (err) {
      throw err;
    }
  }

  async IsValidCouponByID(offerId: string, session?: ClientSession) {
    try {
      const currentDate = new Date();

      const validOffer = await this.offerRepo
        .findOne({
          _id: offerId,
          quantity: { $gt: 0 },
          from: { $lte: currentDate },
          to: { $gte: currentDate },
        })
        .session(session)
        .exec();

      return !!validOffer;
    } catch (err) {
      throw err;
    }
  }

  async IsValidOfferInBranchByID(
    OfferId: string,
    branchId: string,
    session?: ClientSession,
  ) {
    try {
      const currentDate = new Date();

      const validOffer = await this.offerRepo
        .findOne({
          _id: OfferId,
          quantity: { $gt: 0 },
          $or: [
            { from: { $exists: false }, to: { $exists: false } }, // Neither from nor to dates exist
            { from: { $lte: currentDate }, to: { $gte: currentDate } }, // Current date is within the from and to dates
          ],
          branches: { $in: [branchId] },
        })
        .session(session)
        .exec();

      return !!validOffer;
    } catch (err) {
      throw err;
    }
  }
}
