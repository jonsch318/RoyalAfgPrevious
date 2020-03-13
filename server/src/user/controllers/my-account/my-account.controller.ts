import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';

@Controller('api/account')
export class MyAccountController {

  @UseGuards(JwtAuthGuard)
  @Get("/getUser")
  getProfile(@Req() req){
    Logger.debug("Sending account infos");
    const user = req.user;
    return {
      id: user.id,
      username: user.username,
      birthdate: user.birthdate,
      fullname: user.fullname,
    }
  }
}
