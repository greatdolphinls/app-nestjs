import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IJwtPayload } from './interfaces/jwtPayload.interface';
import { IUserProfile } from '../users/userProfiles/interfaces/userProfile.interface';
import { IUserIdentity } from '../users/userIdentities/interfaces/userIdentity.interface';

import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUserProfile> {
    const auth: IUserIdentity = await this.usersService.findByIdentityUsername(payload.username);
    if (!auth) {
      throw new UnauthorizedException();
    }

    return auth._user;
  }
}
