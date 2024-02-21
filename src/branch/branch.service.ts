import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './Model/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private readonly branchRepo: Model<Branch>,
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    try {
      const branch = new this.branchRepo(createBranchDto);
      return await branch.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.branchRepo.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOneByID(id: string) {
    try {
      return await this.branchRepo.findById(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    try {
      return this.branchRepo.findByIdAndUpdate(id, updateBranchDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.branchRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
