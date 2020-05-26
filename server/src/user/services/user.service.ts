import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaName } from '../models/user-schema';
import { Model } from 'mongoose';
import { IUserDoc } from '../interfaces/user-doc.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private readonly _userModel: Model<IUserDoc>,
  ) {}

  /**
   * Finds the user with the given id.
   * @param id The id for which is queried for.
   * @returns The queried user or if it none was found with the given id null.
   */
  async findById(id: string): Promise<IUserDoc> {
    const user = await this._userModel.findById(id);
    if (!user) return null;
    return user;
  }

  /**
   * Finds the user with the given username.
   * @param username The username for which is queried for.
   * @returns The queried user or if it none was found with the given username null.
   */
  async findOne(username: string): Promise<IUserDoc> {
    const user = await this._userModel.findOne({ username: username });
    if (!user) return null;
    return user;
  }
}
