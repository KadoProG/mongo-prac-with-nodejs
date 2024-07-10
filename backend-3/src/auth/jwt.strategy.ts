import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // 実際には環境変数や外部の秘密管理ツールから取得
    });
  }

  async validate(payload: any) {
    if (!payload?.email) {
      throw new UnauthorizedException();
    }
    return { email: payload.email };
  }
}
