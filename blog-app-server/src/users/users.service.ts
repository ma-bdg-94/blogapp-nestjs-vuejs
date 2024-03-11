import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async findOneByEmail(email: string): Promise<User | any> {
    return this.userModel.findOne({ email })
  }
}
