import { Model } from 'mongoose';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from '../dtos/register-dto';
import { JwtService } from '@nestjs/jwt';
//import { WalletService } from '../../../wallet/services/wallet.service';
import { IUserDoc } from '../../user/interfaces/user-doc.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    //private readonly walletService: WalletService,
    @InjectModel('User') private readonly _userModel: Model<IUserDoc>,
  ) {}

  async register(dto: RegisterDto): Promise<IUserDoc> {
    const user = new this._userModel(dto);
    await user.setPassword(dto.password);
    await user.save();

    //await this.walletService.create(user);

    Logger.verbose(`User created ${user.username}`);
    return user;
  }

  async validateUser(username: string, password: string): Promise<IUserDoc> {
    const user = await this._userModel.findOne({ username: username });
    if (!user)
      throw new UnauthorizedException(
        'A user with the given username and password was not found.',
      );
    if (!(await user.validatePassword(password))) {
      Logger.verbose(`User ${username} entered wrong password`);
      throw new UnauthorizedException(
        'A user with the given username and password was not found.',
      );
    }
    return user;
  }

  /**
   * Creates a jwt token which let's the user prove that he has signed in
   * @param user The user for which the jwt token is generated
   * @returns The users jwt token.
   */
  async signin(user: IUserDoc): Promise<any> {
    const payload = {
      username: user.username,
    };
    Logger.verbose(`Created jwt with id ${user.id}`);
    return await this.jwtService.signAsync(payload, {
      subject: user.id,
      expiresIn: '10d',
      issuer: 'http://localhost:3000',
      algorithm: 'HS256',
      audience: 'http://localhost:3000',
    });
  }
}
