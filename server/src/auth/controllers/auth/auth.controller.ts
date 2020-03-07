import { Body, Request, Controller, Post, UseGuards, Req, Res, Logger } from '@nestjs/common';
import { RegisterDto } from '../../dtos/register-dto';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../strategies/local-auth.guard';
import { LoginDto } from '../../dtos/login-dto';
import * as moment from "moment";

@Controller('account')
export class AuthController {

  constructor(private readonly _authService: AuthService) {
  }

  @Post("register")
  async register(@Body() dto: RegisterDto): Promise<any>{
    return this._authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  async signin(@Body() dto: LoginDto, @Req() req, @Res() res){

    const token = await this._authService.signin(req.user);
    res.cookie("SESSIONID", token, {
      httpOnly: true,
      signed: true,
      sameSite: 'strict',
      expires: moment.utc().add(10, "days").toDate()
    });
    Logger.debug("Created JWT and Cookie");
    return res;
  }
}
