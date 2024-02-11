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
    const branch = new this.branchRepo(createBranchDto);
    return await branch.save();
  }

  async findAll() {
    return await this.branchRepo.find().exec();
  }

  async findOne(id: string) {
    return await this.branchRepo.findById(id);
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  async remove(id: string) {
    return await this.branchRepo.findByIdAndDelete(id);
  }
}
