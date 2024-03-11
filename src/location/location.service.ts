import { Injectable } from '@nestjs/common';
import { LocationInterface } from './interface/Location.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './Model/location.model';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationRepo: Model<Location>,
  ) {}
  createObject(locationData: LocationInterface) {
    try {
      return new this.locationRepo(locationData);
    } catch (err) {
      throw err;
    }
  }
}
