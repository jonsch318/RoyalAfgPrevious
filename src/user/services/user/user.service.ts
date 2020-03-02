import { Injectable } from '@nestjs/common';
import { User } from '../../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaName } from '../../models/user-schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private readonly _userModel: Model<User>,
  ) {
  }

  /**
   * Finds the user with the given id.
   * @param id The id for which is queried for.
   * @returns The queried user or if it none was found with the given id null.
   */
  async findById(id: string): Promise<User>{
    const user = await this._userModel.findById(id);
    if(!user)
      return null;
    return user;
  }

  /**
   * Finds the user with the given username.
   * @param username The username for which is queried for.
   * @returns The queried user or if it none was found with the given username null.
   */
  async findOne(username: string): Promise<User>{
    const user = await this._userModel.findOne({username: username});
    if(!user)
      return null;
    return user;
  }

}
