import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { User } from '../../user/interfaces/user';
import { UserService } from '../../user/services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly _userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if(req && req.cookies){
          Logger.log("Cookies: " + req.cookies["SESSIONID"]);
          token = req.cookies["SESSIONID"];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User>{
    Logger.log(`Jwt Strategy validate called with sub ${payload}`);
    const user = await this._userService.findById(payload.sub);
    if(!user) throw new UnauthorizedException(`The user with the given id ${payload.sub} was not found`);
    return user;
  }
}
