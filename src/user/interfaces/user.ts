import {Document} from "mongoose";
import * as bcrypt from "bcryptjs"

export interface User extends Document{
  id: string;
  fullname: string,
  username: string,
  hash: string,
  birthdate: Date,
  email,

  setPassword(password: string): Promise<any>;
  validatePassword(password: string): Promise<boolean>;
}
