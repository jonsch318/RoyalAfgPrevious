import {Document} from "mongoose";
import * as bcrypt from "bcryptjs"

/**
 * The interface for the user object which will get stored in the database
 */
export interface IUserDoc extends Document{
  id: string,
  fullname: string,
  username: string,
  hash: string,
  birthdate: Date,
  email,

  setPassword(password: string): Promise<any>;
  validatePassword(password: string): Promise<boolean>;
}
