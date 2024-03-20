import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Model/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/enums/roles.enums';
import { AccountStatus } from './enums/account-status.enums';
import { ChangeUserStatusDTO } from './dto/Change-User-Status.dto';
import { UserInterface } from './interfaces/User.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<User>) {}

  async hashFunction(text: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(text, salt);
    } catch (err) {
      throw err;
    }
  }

  async create(createData: UserInterface): Promise<User> {
    try {
      const user = new this.userRepo(createData);
      user.password = await this.hashFunction(createData.password);
      return await user.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new ConflictException("Can't Save , User Already Exist");
      }
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByid(id: string): Promise<User> {
    try {
      return await this.userRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async createWithGoogle(email: string, name: string) {
    // const stripeCustomer = await this.stripeService.createCustomer(name, email);

    const newUser = await this.userRepo.create({
      email,
      name,
      isRegisteredWithGoogle: true,
      // stripeCustomerId: stripeCustomer.id,
    });
    return await newUser.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepo.findOne({ email }).exec();
    } catch (err) {
      throw err;
    }
  }
  async updateOneByID(id: string, newData: UserInterface): Promise<User> {
    try {
      return await this.userRepo.findByIdAndUpdate(id, newData);
    } catch (err) {
      throw err;
    }
  }

  async updateRefresh(id: string, newRefresh: string): Promise<void> {
    try {
      await this.userRepo.updateOne(
        { _id: id },
        {
          refreshToken: newRefresh,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async DeleteOneUserRefreshByUserID(user_id: string): Promise<void> {
    try {
      await this.userRepo.findByIdAndUpdate(user_id, {
        $unset: {
          refreshToken: 1,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async removeOneUserByID(user_id: string) {
    try {
      return await this.userRepo.findByIdAndDelete(user_id);
    } catch (err) {
      throw err;
    }
  }

  async CompareTextWithHash(
    text: string,
    HashedValue: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(text, HashedValue);
    } catch (err) {
      throw err;
    }
  }

  async AddOneRoleToUser(userid: string, newRole: Roles): Promise<User> {
    try {
      return await this.userRepo.findByIdAndUpdate(
        userid,
        { $push: { roles: newRole } },
        { new: true },
      );
    } catch (err) {
      if (err.status == 409) {
        throw new ConflictException('Role Is Already Exist');
      }
      throw err;
    }
  }

  async UnAssignOneRoleFromUser(
    userid: string,
    RemovedRole: Roles,
  ): Promise<User> {
    try {
      return await this.userRepo.findByIdAndUpdate(
        userid,
        { $pull: { roles: RemovedRole } },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async IsUserHaveOneRole(id: string, role: Roles): Promise<boolean> {
    try {
      const isexist = await this.userRepo.find({
        _id: id,
        roles: { $in: [role] },
      });
      if (isexist.length > 0) return true;
      return false;
    } catch (err) {
      throw err;
    }
  }

  async BlockUser(id: string): Promise<User> {
    try {
      return await this.userRepo.findByIdAndUpdate(id, {
        status: AccountStatus.BLOCK,
      });
    } catch (err) {
      throw err;
    }
  }

  async ChangeUserStatus(
    id: string,
    changeUserStatusDTO: ChangeUserStatusDTO,
  ): Promise<User> {
    try {
      return await this.userRepo.findByIdAndUpdate(id, changeUserStatusDTO);
    } catch (err) {
      throw err;
    }
  }
}
