import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    const user = new this.userModel({
      email,
      password: hashedPassword,
    });
    return user.save();
  }
}
