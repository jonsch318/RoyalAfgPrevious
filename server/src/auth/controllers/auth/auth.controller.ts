import { Body, Controller, Post, UseGuards, Req, Logger, HttpCode } from '@nestjs/common';
import { RegisterDto } from '../../dtos/register-dto';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../strategies/local-auth.guard';
import { LoginDto } from '../../dtos/login-dto';
import * as moment from "moment";
import { UserService } from '../../../user/services/user/user.service';
import { ClearCookies, CookieOptions, SetCookies } from '@nestjsplus/cookies';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';

/**
 * Controller for the Authentication Processes
 */
@Controller('api/account')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {
  }

  /**
   * Route /account/register. Registers a new user
   * @param dto The required information to register a new user
   * @param req The request object.
   */
  @SetCookies()
  @HttpCode(200)
  @Post("register")
  async register(@Body() dto: RegisterDto, @Req() req): Promise<any>{
    const user = await this._authService.register(dto);
    req._cookies = await this._authService.createCookie(user);

    return {
      error: "",
      data: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
      },
    };

  }

  /**
   * Route /account/signin. Authenticates a user and creates a jwt Token to persist his authentication.
   * @param dto The required information to sign the user in
   * @param req The request object which contains the signed in user
   */
  @SetCookies()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("signin")
  async signin(@Body() dto: LoginDto, @Req() req, ){
    req._cookies = this._authService.createCookie(req.user);
    const user = await this._userService.findOne(dto.username);
    Logger.debug("Created JWT and Cookie");
    return {
      error: "",
      data: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
      },
    };
  }

  /**
   * Signs the user out. Deletes the Authentication Cookie.
   */
  @ClearCookies("SESSIONID")
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post("signout")
  async signout(){
    Logger.warn("Sign out Succeeded");
    return {
      message: "Sign out succeeded"
    }
  }
}
