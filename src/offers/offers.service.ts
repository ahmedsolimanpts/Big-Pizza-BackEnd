import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from './Model/offer.model';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private readonly offerRepo: Model<Offer>,
  ) {}
  async create(createOfferDto: CreateOfferDto) {
    try {
      const newOffer = new this.offerRepo(createOfferDto);
      return await newOffer.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.offerRepo.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.offerRepo.findById(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOfferByName(name: string) {
    try {
      return await this.offerRepo.find({ name }).exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    try {
      return await this.offerRepo.findByIdAndUpdate(id, updateOfferDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.offerRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
