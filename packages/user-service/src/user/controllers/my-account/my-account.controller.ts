import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';

@Controller('account')
export class MyAccountController {

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req){
    return req.user;
  }
}
