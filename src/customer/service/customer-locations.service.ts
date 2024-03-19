import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerLocations } from '../Model/customer-locations.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerService } from './customer.service';
import { CustomerLocationsInterface } from '../interface/Customer-Locations.interface';

@Injectable()
export class CustomerLocationsService {
  constructor(
    @InjectModel(CustomerLocations.name)
    private readonly customerLocationsRepo: Model<CustomerLocations>,
    private customerService: CustomerService,
  ) {}

  async create(createData: CustomerLocationsInterface) {
    try {
      const customer = await this.customerService.findOneCustomerById(
        createData.customer,
      );
      if (!customer) throw new NotFoundException('Customer Not Exist');

      const newCustomerLocation = new this.customerLocationsRepo(createData);
      return await newCustomerLocation.save();
    } catch (err) {
      throw err;
    }
  }

  async findAllLocations() {
    try {
      return await this.customerLocationsRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllSpecificCustomerLocations(customer_id) {
    try {
      return await this.customerLocationsRepo
        .find({ customer: customer_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneCustomerLocationById(customer_location_id: string) {
    try {
      return await this.customerLocationsRepo
        .findById(customer_location_id)
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneCustomerLocationById(
    customer_id: string,
    NewUpdateData: CustomerLocationsInterface,
  ) {
    try {
      return await this.customerLocationsRepo.findByIdAndUpdate(
        customer_id,
        NewUpdateData,
        {
          new: true,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async removeOneCustomerLocationById(customer_location_id: string) {
    try {
      return await this.customerLocationsRepo.findByIdAndDelete(
        customer_location_id,
      );
    } catch (err) {
      throw err;
    }
  }
}
