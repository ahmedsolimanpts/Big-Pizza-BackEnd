import {
  BadRequestException,
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
import { EmpAttendenceDto } from './dto/Attendence-by-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userService: Model<UserDocument>,
  ) {}

  async hashFunction(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(text, salt);
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userService(createUserDto);
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
    return this.userService.find().exec();
  }

  async findOneByid(id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id).exec();
      if (user) {
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userService.findOne({ email }).exec();
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.findByIdAndUpdate(id, updateUserDto);
  }
  async updateRefresh(id: string, updateUserDto: string): Promise<void> {
    await this.userService.updateMany(
      { _id: id },
      {
        refreshToken: updateUserDto,
      },
    );
  }
  async DeleteRefresh(id: string): Promise<void> {
    await this.userService.updateMany(
      { _id: id },
      {
        $unset: {
          refreshToken: 1,
        },
      },
    );
  }
  async remove(id: string) {
    return await this.userService.findByIdAndDelete(id);
  }

  async CompareTextWithHash(
    text: string,
    HashedValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(text, HashedValue);
  }

  async AddRoleToUser(userid: string, newRole: Roles): Promise<User> {
    try {
      const document = await this.userService.findById(userid);
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
      return await this.userService.findByIdAndUpdate(
        userid,
        { $pull: { roles: RemovedRole } },
        { new: true },
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async IsUserHaveRole(id: string, role: Roles) {
    const isexist = await this.userService.find({
      _id: id,
      roles: { $in: [role] },
    });
    if (isexist.length > 0) return true;
    return false;
  }
  async BlockUser(id: string) {
    return await this.userService.findByIdAndUpdate(id, {
      status: AccountStatus.BLOCK,
    });
  }

  async ChangeUserStatus(id: string, changeUserStatusDTO: ChangeUserStatusDTO) {
    return await this.userService.findByIdAndUpdate(id, changeUserStatusDTO);
  }

  async PushtoAttendence(userid: string, attendenceDto: EmpAttendenceDto) {
    try {
      const user = await this.userService.findById(userid);
      if (user) {
        if (!user.attendence) {
          user.attendence = [];
          await user.attendence.push(attendenceDto);
        }
        let canPush = true; // Flag to determine if we can push the new attendenceDto

        // If there's at least one attendence record, compare dates
        if (user.attendence.length > 0) {
          const lastdate = user.attendence[user.attendence.length - 1];

          // Assuming lastdate.date and attendenceDto.date are Date objects or ISO 8601 strings
          const lastDateObj = new Date(lastdate.date);
          const newDateObj = new Date(attendenceDto.date);

          if (lastDateObj >= newDateObj) {
            throw new BadRequestException(
              'New attendance date must be later than the last attendance date.',
            );
            canPush = false; // Do not push if new date is not later
          }
        }

        // Push new attendance if the new date is valid (later than last attendance date)
        if (canPush) {
          user.attendence.push(attendenceDto);
          await user.save();
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async PopFromAttendence(userid: string) {
    const user = await this.userService.findById(userid);
    if (user) {
      user.attendence.pop();
      await user.save();
    }
  }
}
