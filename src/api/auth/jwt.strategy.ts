// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ||
        'ae76831415297846409d1509ed97b254794b5a0d23413c0d738928cbb82903d2', // ganti dengan env
    });
  }
  async validate(payload: any) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  }
}
