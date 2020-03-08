import { Body, Request, Controller, Post, UseGuards, Req, Res, Logger, HttpCode, Header } from '@nestjs/common';
import { RegisterDto } from '../../dtos/register-dto';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../strategies/local-auth.guard';
import { LoginDto } from '../../dtos/login-dto';
import * as moment from "moment";
import { UserService } from '../../../user/services/user/user.service';
import { Status } from 'tslint/lib/runner';
import { CookieOptions, Cookies, SetCookies } from '@nestjsplus/cookies';

@Controller('account')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {
  }

  @Post("register")
  async register(@Body() dto: RegisterDto): Promise<any>{
    return this._authService.register(dto);
  }

  @SetCookies()
  @UseGuards(LocalAuthGuard)
  @Post("signin")
  async signin(@Body() dto: LoginDto, @Req() req, ){
    const token = await this._authService.signin(req.user);
    const options: CookieOptions = {
      expires: moment().add(10, "days").toDate(),
      signed: false,
      secure: false,
      sameSite: false,
      httpOnly: true,
    };
    req._cookies = [
      {
        name: "SESSIONID",
        value: token,
        options: options,
      }
    ];
    const user = await this._userService.findOne(dto.username);
    Logger.debug("Created JWT and Cookie");
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    };
  }
}
