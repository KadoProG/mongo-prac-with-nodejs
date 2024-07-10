import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface'; // パスを確認
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {
    this.logger.log('AuthService initialized');
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.userModel.findOne({ email }).select('+password').exec();
    this.logger.log(`User found: ${user.email}`);
    this.logger.log(`pass: ${user.password}`);
    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        this.logger.log('Password matched');
        return user;
      } else {
        this.logger.warn('Password did not match');
      }
    } else {
      this.logger.warn('User not found or password is undefined');
    }
    return null;
  }

  async validateUserById(userId: string): Promise<any> {
    this.logger.log(`Validating user by ID: ${userId}`);
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      this.logger.warn('User not found');
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
