import { Injectable, NotFoundException } from '@nestjs/common';
import { Branch } from './Model/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BranchInterface } from './interface/branch.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private readonly branchRepo: Model<Branch>,
    private userService: UsersService,
  ) {}

  async create(createBranchData: BranchInterface): Promise<Branch> {
    try {
      if (createBranchData.manager) {
        const user = await this.userService.findOneByid(
          createBranchData.manager,
        );
        if (!user) throw new NotFoundException('Wrong Manager ID');
      }

      const branch = new this.branchRepo(createBranchData);
      return await branch.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Branch[]> {
    try {
      return await this.branchRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneBranchByID(branch_id: string): Promise<Branch> {
    try {
      return await this.branchRepo.findById(branch_id);
    } catch (err) {
      throw err;
    }
  }

  async IsBranchsAvaliables(branch_id: string[]) {
    try {
      const branchs = await this.branchRepo.find({ _id: branch_id });
      if (branchs.length == branch_id.length) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async updateOneBranchByID(branch_id: string, NewBranchData: BranchInterface) {
    try {
      if (NewBranchData.manager) {
        const user = await this.userService.findOneByid(NewBranchData.manager);
        if (!user) throw new NotFoundException('Wrong Manager Id');
      }
      return await this.branchRepo.findByIdAndUpdate(branch_id, NewBranchData);
    } catch (err) {
      throw err;
    }
  }

  async removeOneBranchById(branch_id: string) {
    try {
      return await this.branchRepo.findByIdAndDelete(branch_id);
    } catch (err) {
      throw err;
    }
  }
}
