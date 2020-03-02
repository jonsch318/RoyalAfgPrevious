import {Model} from "mongoose";
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../user/interfaces/user';
import { RegisterDto } from '../../dtos/register-dto';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel("User") private readonly _userModel: Model<User>,
  ) {
  }

  async register(dto: RegisterDto): Promise<User>{
    const user = new this._userModel(dto);
      await user.setPassword(dto.password);
      await user.save();
      Logger.verbose(`User created ${user.username}`);
      return user;
  }

  async validateUser(username: string, password: string): Promise<User>{
    const user = await this._userModel.findOne({username: username});
    if(!user) throw new UnauthorizedException("A user with the given username and password was not found.");
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
  async signin(user: User): Promise<any> {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    Logger.verbose(`Created jwt with id ${user.id}`);
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

}
