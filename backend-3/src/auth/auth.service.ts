import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();

    // ここではパスワードの比較を簡単にしているものの、実際にはハッシュ化して比較するべき。
    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
