import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../../dtos/register-dto';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../strategies/local-auth.guard';
import { LoginDto } from '../../dtos/login-dto';

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
  async signin(@Body() dto: LoginDto,@Request() req){
    return this._authService.signin(req.user);
  }
}
