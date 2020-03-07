import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';

@Controller('api/account')
export class MyAccountController {

  @UseGuards(JwtAuthGuard)
  @Get("/")
  getProfile(@Req() req){
    Logger.debug("Sending account infos");
    return req.user;
  }
}
