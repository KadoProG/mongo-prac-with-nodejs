import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // ユーザー名フィールドを 'email' に設定
  }

  async validate(email: string, password: string): Promise<any> {
    this.logger.log(`Authenticating user with email: ${email}`);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.logger.warn('Authentication failed');
      throw new UnauthorizedException();
    }
    this.logger.log('Authentication successful');
    return user;
  }
}
