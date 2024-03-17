import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './Model/customer.model';
import { Model } from 'mongoose';
import { CustomerInterface } from './interface/Customer.interface';
import { LocationInterface } from 'src/location/interface/Location.interface';
import { LocationService } from 'src/location/location.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerRepo: Model<Customer>,
    private locationService: LocationService,
    private UserService: UsersService,
  ) {}

  async create(createData: CustomerInterface) {
    try {
      if (createData.user) {
        const user = await this.UserService.findOneByid(createData.user);
        if (!user) throw new NotFoundException('Wrong User ID');
      }
      const newCustomer = new this.customerRepo(createData);
      return await newCustomer.save();
    } catch (err) {
      throw err;
    }
  }

  async findAllCustomers() {
    try {
      return await this.customerRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneCustomerById(customer_id: string) {
    try {
      return await this.customerRepo.findById(customer_id).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneCustomerById(
    customer_id: string,
    NewUpdateData: CustomerInterface,
  ) {
    try {
      if (NewUpdateData.user) {
        const user = await this.UserService.findOneByid(NewUpdateData.user);
        if (!user) throw new NotFoundException('Wrong User ID');
      }
      return await this.customerRepo.findByIdAndUpdate(
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

  async removeOneCustomerById(customer_id: string) {
    try {
      return await this.customerRepo.findByIdAndDelete(customer_id);
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
