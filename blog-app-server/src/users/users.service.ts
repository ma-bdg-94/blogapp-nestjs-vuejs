import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | any> {
    return this.userModel.findOne({ email });
  }

  async findOneByResetToken(resetToken: string): Promise<User | any> {
    return this.userModel.findOne({ resetToken });
  }

  async updateResetToken(email: string, token: string): Promise<User | any> {
    return this.userModel.findOneAndUpdate(
      { email },
      {
        resetToken: token,
        resetTokenExpiration: new Date(Date.now() + 7200000),
      },
      { new: true },
    );
  }

  async updatePassword(resetToken: string, password: string): Promise<User | any> {
    return this.userModel.findOneAndUpdate(
      { resetToken },
      {
        password,
        resetToken: '',
        resetTokenExpiration: new Date(),
      },
      { new: true },
    );
  }
}
