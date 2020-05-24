import {Strategy} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {AuthService} from '../services/auth/auth.service';

/**
 * Passport Strategy to authenticate the user via username and password.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validate the user
   * @param username The given username
   * @param password The given password
   */
  async validate (username: string, password: string): Promise<any> {
    // validate if the credentials are valid.
    const user = await this.authService.validateUser(username, password);
    if(!user)
    {
      // credentials are invalid
      Logger.error("User is not valid");
      throw new UnauthorizedException();
    }
    // credentials are valid proceed.
    return user;
  }
}
