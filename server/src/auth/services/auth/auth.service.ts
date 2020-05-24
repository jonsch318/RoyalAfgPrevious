import {Model} from "mongoose";
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from '../../dtos/register-dto';
import {JwtService} from "@nestjs/jwt";
import { WalletService } from '../../../wallet/services/wallet/wallet.service';
import { IUserDoc } from '../../../user/interfaces/user-doc.interface';
import { CookieOptions } from '@nestjsplus/cookies/index';
import * as moment from 'moment';
import { IUser } from '../../../user/interfaces/user.interface';

/**
 * Provides methods to register, sign in and validate a user.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly walletService: WalletService,
    @InjectModel("User") private readonly _userModel: Model<IUserDoc>,
  ) {
  }

  /**
   * Creates a new user with the given information
   * @param dto the information which is used to create the user
   * @returns The registered user
   */
  async register(dto: RegisterDto): Promise<IUserDoc>{
    // create a new user
    const user = new this._userModel(dto);
    // hash the password
    await user.setPassword(dto.password);
    // save it in the database
    await user.save();

    // create a wallet for the user
    await this.walletService.create(user);

    Logger.verbose(`User created ${user.username}`);
    return user;
  }

  /**
   * Validates if a user exists and if the password matches.
   * @param username The username for which is searched.
   * @param password The password for which is matched.
   * @returns The result of the search. Only if the password matches.
   */
  async validateUser(username: string, password: string): Promise<IUserDoc>{
    // find user in database
    const user = await this._userModel.findOne({username: username});
    // check if the user is found
    if(!user) throw new UnauthorizedException("A user with the given username and password was not found.");
    // check if the password matches.
    if(!await user.validatePassword(password)){
      Logger.verbose(`User ${username} entered wrong password`);
      throw new UnauthorizedException("A user with the given username and password was not found.");
    }
    return user;
  }

  /**
   * Creates a jwt token which let's the user prove that he has signed in
   * @param user The user for which the jwt token is generated
   * @returns The users jwt token.
   */
  async signin(user: IUserDoc): Promise<any> {
    // The payload of the jwt token
    const payload = {
      username: user.username,
    };
    Logger.verbose(`Created jwt with id ${user.id}`);
    // Create the jwt token and sign it.
    return await this.jwtService.signAsync(payload, {
      subject: user.id,
      expiresIn: "10d",
      issuer: "http://localhost:3000",
      algorithm: 'HS256',
      audience: "http://localhost:3000",
    });
  }

  async createCookie(user: IUserDoc): Promise<any>{
    const token = await this.signin(user);
    const options: CookieOptions = {
      expires: moment().add(10, "days").toDate(),
      signed: false,
      secure: false,
      sameSite: false,
      httpOnly: true,
    };
    return [
      {
        name: "SESSIONID",
        value: token,
        options: options,
      }
    ];
  }

}
