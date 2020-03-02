import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { User } from '../../user/interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../../user/services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly _userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User>{
    Logger.log(`Jwt Strategy validate called with sub ${payload.sub}`);
    const user = await this._userService.findById(payload.sub);
    if(!user) throw new UnauthorizedException(`The user with the given id ${payload.sub} was not found`);
    return user;
  }
}
