import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './Model/customer.model';
import { Model } from 'mongoose';
import { CustomerInterface } from './interface/Customer.interface';
import { LocationInterface } from 'src/location/interface/Location.interface';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerRepo: Model<Customer>,
    private locationService: LocationService,
  ) {}

  async create(createData: CustomerInterface) {
    try {
      const newCustomer = new this.customerRepo(createData);
      return await newCustomer.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.customerRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.customerRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneById(id: string, updateData: CustomerInterface) {
    try {
      return await this.customerRepo.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async removeOneById(id: string) {
    try {
      return await this.customerRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async AddLocationToCustomer(
    customer_id: string,
    newLocation: LocationInterface,
  ) {
    try {
      const NewLocationObject = this.locationService.createObject(newLocation);
      return await this.customerRepo.findByIdAndUpdate(
        customer_id,
        {
          $push: { locations: NewLocationObject },
        },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async RemoveLocationFromCustomer(customer_id: string, locationId: string) {
    try {
      return await this.customerRepo.findByIdAndUpdate(
        customer_id,
        {
          $pull: { locations: { _id: locationId } },
        },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async AddLocationToCustomerByUserId(
    user_id: string,
    newLocation: LocationInterface,
  ) {
    try {
      const NewLocationObject = this.locationService.createObject(newLocation);
      return await this.customerRepo.findOneAndUpdate(
        { user: user_id },
        {
          $push: { locations: NewLocationObject },
        },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async RemoveLocationFromCustomerByUserId(
    user_id: string,
    locationId: string,
  ) {
    try {
      return await this.customerRepo.findOneAndUpdate(
        { user: user_id },
        {
          $pull: { locations: { _id: locationId } },
        },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }
}
