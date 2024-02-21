import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './Model/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/enums/roles.enums';
import { AccountStatus } from './enums/account-status.enums';
import { ChangeUserStatusDTO } from './dto/Change-User-Status.dto';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<UserDocument>,
    private locationService: LocationService,
  ) {}

  async hashFunction(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(text, salt);
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userRepo(createUserDto);
      user.password = await this.hashFunction(createUserDto.password);
      return await user.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new ConflictException("Can't Save , User Already Exist");
      }
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.userRepo.find().exec();
  }

  async findOneByid(id: string): Promise<User> {
    try {
      const user = await this.userRepo.findById(id).exec();
      if (user) {
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email }).exec();
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepo.findByIdAndUpdate(id, updateUserDto);
  }
  async updateRefresh(id: string, updateUserDto: string): Promise<void> {
    await this.userRepo.updateMany(
      { _id: id },
      {
        refreshToken: updateUserDto,
      },
    );
  }
  async DeleteRefresh(id: string): Promise<void> {
    await this.userRepo.updateMany(
      { _id: id },
      {
        $unset: {
          refreshToken: 1,
        },
      },
    );
  }
  async remove(id: string) {
    return await this.userRepo.findByIdAndDelete(id);
  }

  async CompareTextWithHash(
    text: string,
    HashedValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(text, HashedValue);
  }

  async AddRoleToUser(userid: string, newRole: Roles): Promise<User> {
    try {
      const document = await this.userRepo.findById(userid);
      if (!document) throw new NotFoundException();
      if (document.roles.includes(newRole))
        throw new ConflictException('Role Is Already Exist');
      await document.roles.push(newRole);
      return await document.save();
    } catch (err) {
      if (err.status == 409) {
        throw new ConflictException('Role Is Already Exist');
      }
      console.log(err);
    }
  }
  async UnAssignRoleFromUser(
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
      throw new InternalServerErrorException(err);
    }
  }
  async IsUserHaveRole(id: string, role: Roles) {
    const isexist = await this.userRepo.find({
      _id: id,
      roles: { $in: [role] },
    });
    if (isexist.length > 0) return true;
    return false;
  }
  async BlockUser(id: string) {
    return await this.userRepo.findByIdAndUpdate(id, {
      status: AccountStatus.BLOCK,
    });
  }

  async ChangeUserStatus(id: string, changeUserStatusDTO: ChangeUserStatusDTO) {
    return await this.userRepo.findByIdAndUpdate(id, changeUserStatusDTO);
  }

  async AddLocationToUser(
    userid: string,
    createLocationDTO: CreateLocationDto,
  ) {
    try {
      const updatedUser = await this.userRepo
        .findByIdAndUpdate(
          userid,
          { $push: { locations: createLocationDTO } },
          { new: true, runValidators: true },
        )
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`No user found with ID ${userid}`);
      }

      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  async RemoveLocationFromUser(userId: string, locationId: string) {
    try {
      const user = await this.userRepo.findOneAndUpdate(
        { _id: userId, 'locations._id': locationId },
        { $pull: { locations: { _id: locationId } } },
        { new: true }, // Return the updated document
      );

      if (!user) {
        throw new NotFoundException('User or Location not found');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
}
