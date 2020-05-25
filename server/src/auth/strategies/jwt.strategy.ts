import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/services/user/user.service';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['SESSIONID'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: any): Promise<IUserDoc> {
    const user = await this._userService.findById(payload.sub);
    if (!user)
      throw new UnauthorizedException(
        `The user with the given id ${payload.sub} was not found`,
      );
    return user;
  }
}
