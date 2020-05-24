import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';

/**
 * Enables the request of user information
 */
@Controller('api/account')
export class MyAccountController {

  /**
   * Route /api/account/getuser. Gets information about the user.
   * @param req The request object, contains the authenticated user.
   */
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
