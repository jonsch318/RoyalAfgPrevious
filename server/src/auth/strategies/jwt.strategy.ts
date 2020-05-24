import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { UserService } from '../../user/services/user/user.service';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';

/**
 * A password strategy to validate whether a user with a jwt token is authenticated or not.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly _userService: UserService
  ) {
    super({
      // extract the token from the http only cookie
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if(req && req.cookies){
          token = req.cookies["SESSIONID"];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Find the user.
   * @param payload The id of the user
   */
  async validate(payload: any): Promise<IUserDoc>{
    // Find the user. When no user exists with the id, the token was invalid
    const user = await this._userService.findById(payload.sub);
    if(!user) throw new UnauthorizedException(`The user with the given id ${payload.sub} was not found`);
    return user;
  }
}
